"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Textarea } from "@/components/ui/textarea";

const suggestions = [
    {
        title: "Create New Trip",
        icon: <Globe2 className="h-5 w-5 text-blue-400" />,
    },
    {
        title: "Inspire me where to go",
        icon: <Plane className="h-5 w-5 text-green-500" />,
    },
    {
        title: "Discover Hidden gems",
        icon: <Landmark className="h-5 w-5 text-orange-500" />,
    },
    {
        title: "Adventure Destination",
        icon: <Globe2 className="h-5 w-5 text-yellow-600" />,
    },
];

function Hero() {

    const { user } = useUser();
    //const { openSignIn } = useClerk();
    const router = useRouter();

    const onSend = () => {
        if (!user) {
            //openSignIn();
            router.push('/sign-in');
            return;
        }
        //Navigate to Create Trip Planner Web Page
        router.push('/create-new-trip');
    }

    return (
        <div className="flex justify-center bg-linear-to-b from-blue-50 via-white to-white pt-24 pb-12">
            {/* Content */}
            <div className="flex w-full max-w-3xl flex-col items-center space-y-6 text-center">
                <h1 className="text-xl font-bold md:text-5xl">
                    Hey, I'm your personal
                    <span className="text-primary"> Trip Planner</span>
                </h1>
                <p className="text-lg">
                    Tell me what you want, and I'll handle the rest: Flights, Hotels, Trip
                    Planner - all in seconds
                </p>

                {/* Input Box */}
                <div className="w-full">
                    <div className="relative rounded-2xl border p-4">
                        <Textarea
                            placeholder="Create a trip for Paris from New York"
                            className="h-28 w-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0"
                        />
                        <Button size={"icon"} className="absolute bottom-6 right-6" onClick={() => onSend()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Suggestion list */}
                <div className="flex gap-5">
                    {suggestions.map((item, index) => (
                        <div
                            key={index}
                            className="flex cursor-pointer items-center gap-2 rounded-full border p-2 hover:bg-primary hover:text-white"
                        >
                            {item.icon}
                            <h2 className="text-sm">{item.title}</h2>
                        </div>
                    ))}
                </div>

                {/* Trust / Stats */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600 md:gap-12 md:text-base">
                    <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span>10K+ Trips</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span>Smart Budget Planner</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span>Local Hidden Gems</span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center mt-16">
                    <div className="text-center mb-10 space-y-2">
                        <h3 className="text-2xl font-bold md:text-3xl text-gray-800 dark:text-gray-100">
                            See your trip plan in seconds
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your itinerary, bookings, and maps — all in one place.
                        </p>
                    </div>

                    {/* Video Section */}
                    <div className="p-4 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl border shadow-xl">
                        <HeroVideoDialog
                            className="block dark:hidden"
                            animationStyle="from-center"
                            videoSrc="https://www.example.com/dummy-video"
                            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                            thumbnailAlt="Dummy Video Thumbnail"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;