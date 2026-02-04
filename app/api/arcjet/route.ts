import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

// Free users: 2 credits
export const ajFree = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 1, // No automatic refills
      interval: 86400, // 24 hours
      capacity: 2, // 2 trips for free users
    }),
  ],
});

// Premium users: 100 credits
export const ajPremium = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 1, // No automatic refills
      interval: 86400, // 24 hours
      capacity: 100, // 100 trips for premium users
    }),
  ],
});

// Legacy export for backward compatibility (defaults to free)
export const aj = ajFree;

export async function GET(req: Request) {
  const userId = "user123";
  const decision = await ajFree.protect(req, { userId, requested: 5 });

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  return NextResponse.json({ message: "Hello world" });
}