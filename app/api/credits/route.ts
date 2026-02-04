import { NextRequest, NextResponse } from "next/server";
import { ajFree, ajPremium } from "@/app/api/arcjet/route";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        // No longer using Clerk's "has" for premium check
        // const { has } = await auth();
        // const hasPremiumAccess = has({ plan: "monthly" });

        if (!user) {
            return NextResponse.json({
                isAuthenticated: false,
                isPremium: false,
                remaining: 0,
                capacity: 2,
                resetInfo: null
            });
        }

        const email = user.primaryEmailAddress?.emailAddress;
        let hasPremiumAccess = false;

        // Check Clerk for Premium Status (Source of Truth for Payment)
        const { has } = await auth();
        const clerkSaysPremium = has({ plan: "monthly" }) || has({ plan: "annually" });

        if (email) {
            // Fetch user from Convex
            try {
                const convexUser = await convex.query(api.user.GetUser, { email });

                // Check Convex Status
                const convexSaysPremium = convexUser?.subscription === "monthly" || convexUser?.subscription === "annually";

                // AUTO-SYNC: If Clerk says Premium but DB says Free -> Update DB
                if (clerkSaysPremium && !convexSaysPremium) {
                    console.log("🔄 Auto-Syncing Subscription: Clerk (Premium) -> Convex (Free)");
                    await convex.mutation(api.user.CreateNewUser, {
                        name: user.fullName ?? "User",
                        email: email,
                        imageUrl: user.imageUrl,
                        subscription: "monthly"
                    });
                    hasPremiumAccess = true;
                }
                // Sync: If Clerk says Free but DB says Premium -> Trust DB (or optional: downgrade? stick to DB for manual overrides)
                else if (convexSaysPremium) {
                    console.log("✅ User is Premium (Convex DB)");
                    hasPremiumAccess = true;
                } else {
                    console.log("ℹ️ User is Free Tier");
                }

            } catch (err) {
                console.error("Failed to query/sync Convex user:", err);
            }
        }

        // Select the appropriate Arcjet instance based on user type
        const arcjetInstance = hasPremiumAccess ? ajPremium : ajFree;
        const capacity = hasPremiumAccess ? 100 : 2;

        // Check current credit status without deducting
        const decision = await arcjetInstance.protect(request, {
            userId: email ?? '',
            requested: 0 // Don't deduct, just check
        });

        const remaining = (decision.reason as any)?.remaining ?? capacity;

        // Calculate reset time (24 hours from now)
        const resetTime = new Date();
        resetTime.setHours(resetTime.getHours() + 24);

        return NextResponse.json({
            isAuthenticated: true,
            isPremium: hasPremiumAccess,
            remaining: remaining,
            capacity: capacity,
            resetInfo: {
                resetAt: resetTime.toISOString(),
                hoursUntilReset: 24
            }
        });
    } catch (error) {
        console.error("Error fetching credit info:", error);
        return NextResponse.json(
            { error: "Failed to fetch credit information" },
            { status: 500 }
        );
    }
}
