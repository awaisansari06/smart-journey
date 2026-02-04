const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Read .env.local manually
function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    process.env[key.trim()] = valueParts.join('=').trim();
                }
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn(`Warning: .env.local file not found at ${envPath}. Environment variables might be missing.`);
        } else {
            console.error(`Error reading .env.local: ${error.message}`);
        }
    }
}

loadEnv();

async function testGeminiAPI() {
    try {
        console.log("🔑 Testing Gemini API Key...");
        console.log("API Key:", process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 10)}...` : "NOT FOUND");

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY not found in .env.local");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        console.log("📡 Sending test message...");
        const chat = model.startChat({
            history: [],
            systemInstruction: {
                role: 'system',
                parts: [{ text: 'You are a helpful assistant. Always respond in JSON format with a "message" field.' }]
            }
        });

        const result = await chat.sendMessage("Hello, this is a test");
        const responseText = result.response.text();

        console.log("✅ API Response:", responseText);
        console.log("✅ Gemini API is working correctly!");

    } catch (error) {
        console.error("❌ Error testing Gemini API:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);

        if (error.message.includes("fetch failed")) {
            console.error("\n🔍 Possible causes:");
            console.error("1. Network/Proxy blocking the request");
            console.error("2. Firewall restrictions");
            console.error("3. VPN interference");
            console.error("4. DNS resolution issues");
            console.error("\n💡 Try:");
            console.error("- Disable VPN if active");
            console.error("- Check firewall settings");
            console.error("- Try from a different network");
        } else if (error.message.includes("API key")) {
            console.error("\n🔍 API Key issue - verify your key at:");
            console.error("https://aistudio.google.com/app/apikey");
        }

        process.exit(1);
    }
}

testGeminiAPI();
