"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TravelPaceUiProps = {
  value?: string;
  onSelect: (value: string) => void;
};

const PACES = [
  {
    id: "relaxed",
    title: "Relaxed",
    desc: "2–3 places per day",
    emoji: "🐢",
  },
  {
    id: "moderate",
    title: "Moderate",
    desc: "4–5 places per day",
    emoji: "🚶",
  },
  {
    id: "packed",
    title: "Packed",
    desc: "6–8 places per day",
    emoji: "🏃",
  },
];

export default function TravelPaceUi({ value, onSelect }: TravelPaceUiProps) {
  return (
    <div className="w-full max-w-xl rounded-2xl border bg-white dark:bg-gray-900 p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Travel pace</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          How busy do you want your itinerary?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {PACES.map((item) => {
          const active = value === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "rounded-xl border p-3 text-left transition-all",
                "hover:bg-gray-50 dark:hover:bg-gray-800",
                active
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </button>
          );
        })}
      </div>

      {value && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Selected: <span className="font-medium text-gray-700 dark:text-gray-300">{value}</span>
        </div>
      )}
    </div>
  );
}
