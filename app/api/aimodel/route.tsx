import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { aj } from "@/app/api/arcjet/route";
import { auth, currentUser } from "@clerk/nextjs/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json", // Ensures strict JSON response
  },
});

const PROMPT = `
You are an AI Trip Planner Agent.

Your goal is to help the user plan a trip by asking EXACTLY ONE relevant trip-related question at a time, in a friendly and interactive way.

========================
INITIAL ANALYSIS (Intent)
========================
Check the user's FIRST message (or the latest action) to identify intent:

If user intent is:
- "Create New Trip" -> STANDARD FLOW (follow steps in order)
- "Inspire me where to go" -> SUGGESTION FLOW (general ideas)
- "Discover Hidden gems" -> SUGGESTION FLOW (focus on offbeat places)
- "Adventure Destination" -> SUGGESTION FLOW (focus on adventure places)

If intent is unclear, ask ONE short question to confirm what they want.

========================
STANDARD FLOW (User knows destination)
========================
Ask questions ONLY in this exact order and wait for the user's answer before moving to the next:

1) Starting location (source city/country)
2) Destination (city/country)
3) Group size (Solo / Couple / Family / Friends)
4) Budget (Low / Medium / High)
5) Trip duration (number of days)
6) Travel interests (Adventure / Sightseeing / Cultural / Food / Nightlife / Relaxation)
7) Travel Vibe (Relaxed / Balanced / Fast-paced / Culture-focused / Food-focused / Leisure)
8) Travel Pace (Relaxed / Moderate / Packed)
9) Special requirements or preferences (if any)

========================
SUGGESTION FLOW (User needs ideas)
========================
1) Ask for Starting location (source city/country)
2) Ask for Preferences immediately (SKIP destination for now).
   Example questions:
   - "What kind of trip are you looking for (relaxing, adventure, cultural, food, nightlife)?"
   - "Any region or vibe you prefer (mountains, beaches, city, nature, cold, warm)?"
3) Suggest 2-3 destinations based on:
   - starting location
   - user intent (Inspiration / Hidden gems / Adventure)
   - preferences
4) Wait for the user to pick ONE destination.
5) Once destination is selected, resume STANDARD FLOW from Step 3 (Group size).

========================
Rules (Very Important)
========================
- Ask ONLY ONE question per message.
- NEVER ask multiple questions in one response.
- NEVER ask irrelevant questions.
- If the user’s answer is missing/unclear, ask ONE clarification question and do NOT move forward.
- Keep the tone conversational, helpful, and interactive.
- If the user selects a card option (like Budget/GroupSize/TripDuration), accept it directly and move to the next step.
- Do NOT repeat already confirmed answers unless user asks to edit.

========================
UI Component Selection
========================
Along with every response, you MUST decide which UI component should be shown next.

Allowed UI values:
- "source"
- "destination"
- "groupSize"
- "budget"
- "tripDuration"
- "interests"
- "tripStyle"
- "travelPace"
- "preferences"
- "suggestion"
- "final"

UI rules:
- Use "source" when asking starting location
- Use "destination" when asking destination city/country
- Use "groupSize" when asking group size
- Use "budget" when asking budget
- Use "tripDuration" when asking duration
- Use "interests" when asking interests
- Use "tripStyle" when asking travel vibe
- Use "travelPace" when asking travel pace
- Use "preferences" when asking special requirements/preferences
- Use "suggestion" when suggesting 2-3 destinations for user to choose from
- Use "final" only when ALL required info is collected and you're generating the final trip plan

========================
Final Trip Plan Output
========================
When ALL required information is collected (STANDARD FLOW steps 1-7 completed),
generate a complete final trip plan including:
- Summary (source, destination, group size, budget, duration)
- Day-by-day itinerary (clear and structured)
- Food suggestions
- Local transport tips
- Estimated budget breakdown (rough)
- Extra tips + hidden gems

========================
IMPORTANT OUTPUT FORMAT
========================
You MUST ALWAYS respond ONLY in strict JSON format.
No extra text. No markdown. No explanations.

JSON schema:
{
  "resp": "string",
  "ui": "source|destination|groupSize|budget|tripDuration|interests|tripStyle|travelPace|preferences|suggestion|final"
}
`;


const FINAL_PROMPT = `
Generate Travel Plan with give details, give me Hotels options list (Minimum 8-10 hotels) with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
Geo Coordinates, Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.
If Travel Pace is 'Moderate', suggest exactly 5 places per day.
If Travel Pace is 'Packed', suggest minimum 6-8 places per day.
If Travel Pace is 'Relaxed', suggest 2-3 places per day.
Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "lat": "number",
          "lng": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "lat": "number",
              "lng": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;

export async function POST(request: NextRequest) {
  try {
    const { messages, isFinal } = await request.json();
    const user = await currentUser();
    const { has } = await auth();
    const hasPremiumAccess = has({ plan: "monthly" });
    console.log("hasPremiumAccess", hasPremiumAccess);
    const decision = await aj.protect(request, { userId: user?.primaryEmailAddress?.emailAddress ?? '', requested: isFinal ? 5 : 0 }); // Deduct 5 tokens for ALL requests for testing



    console.log("Arcjet decision", decision);
    console.log(`Debug: isFinal=${isFinal}, requested=5`);

    if ((decision.reason as any)?.remaining === 0 && !hasPremiumAccess) {
      return NextResponse.json({
        resp: "No Free Credit Remaining",
        ui: "limit"
      });
    }

    // 1. Separate the last user message from the history
    const lastMessage = messages[messages.length - 1];
    const historyMessages = messages.slice(0, -1);

    // 2. Select Prompt
    const activePrompt = isFinal ? FINAL_PROMPT : PROMPT;

    // 3. Start the Chat Session with System Instructions
    const chat = model.startChat({
      history: historyMessages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      systemInstruction: {
        role: 'system',
        parts: [{ text: activePrompt }]
      },
    });

    // 4. Send the message
    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();

    // 5. Return parsed JSON (Safe extraction)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const jsonStr = jsonMatch[0];
    return NextResponse.json(JSON.parse(jsonStr));
  } catch (e) {
    console.error("Error in AI Model API:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}