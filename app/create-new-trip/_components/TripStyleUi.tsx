"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TripStyleUiProps = {
    value?: string;
    onSelect: (value: string) => void;
};

const TRIP_STYLES = [
    {
        id: "relaxed",
        title: "Relaxed",
        desc: "Take it easy",
        emoji: "😌",
    },
    {
        id: "balanced",
        title: "Balanced",
        desc: "Sightseeing + Rest",
        emoji: "🎯",
    },
    {
        id: "fast",
        title: "Fast-paced",
        desc: "See everything possible",
        emoji: "⚡",
    },
    {
        id: "culture",
        title: "Culture-focused",
        desc: "History & Art",
        emoji: "🏛️",
    },
    {
        id: "food",
        title: "Food-focused",
        desc: "Culinary journey",
        emoji: "🍜",
    },
    {
        id: "leisure",
        title: "Leisure",
        desc: "Beaches & Spas",
        emoji: "🏖️",
    },
];

export default function TripStyleUi({ value, onSelect }: TripStyleUiProps) {
    return (
        <div className="w-full max-w-xl rounded-2xl border bg-white p-4 shadow-sm">
            <div>
                <h3 className="text-sm font-semibold text-gray-900">Travel vibe</h3>
                <p className="text-xs text-gray-500">What's your travel mood?</p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TRIP_STYLES.map((item) => {
                    const active = value === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={cn(
                                "flex items-start gap-3 rounded-2xl border p-4 text-left transition",
                                "hover:bg-gray-50",
                                active
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                    : "border-gray-200"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-xl text-lg",
                                    active ? "bg-primary/15" : "bg-gray-100"
                                )}
                            >
                                {item.emoji}
                            </div>

                            <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {value && (
                <div className="mt-4 text-xs text-gray-500">
                    Selected: <span className="font-medium text-gray-700">{value}</span>
                </div>
            )}
        </div>
    );
}
