"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activities = [
    "Aasiya just planned a trip to Bali ✈️",
    "Awais generated a Dubai itinerary 🏙️",
    "Maryam saved a 5-day Tokyo plan 🍜",
    "Hardik explored hidden gems in Rome 🏛️",
    "Pratham is planning a Swiss adventure 🏔️",
];

export default function ActivityTicker() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setIndex((prev) => (prev + 1) % activities.length);
        }, 5000);

        return () => clearInterval(t);
    }, []);

    return (
        <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg px-4 py-2 rounded-full text-xs text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        {activities[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}
