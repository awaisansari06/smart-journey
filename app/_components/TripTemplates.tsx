"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


import Link from "next/link";
import Image from "next/image";

const templates = [
    {
        title: "Beach Weekend",
        emoji: "🏖️",
        image: "/beach.jpg",
        prompt: "Plan a relaxing beach weekend trip",
        bgClass: "bg-cyan-50/40 dark:bg-cyan-900/10",
        borderClass: "hover:border-cyan-200 dark:hover:border-cyan-800",
        shadowClass: "hover:shadow-cyan-100 dark:hover:shadow-cyan-900/20"
    },
    {
        title: "Food Tour",
        emoji: "🍜",
        image: "/food.jpg",
        prompt: "Plan a food tour trip",
        bgClass: "bg-orange-50/40 dark:bg-orange-900/10",
        borderClass: "hover:border-orange-200 dark:hover:border-orange-800",
        shadowClass: "hover:shadow-orange-100 dark:hover:shadow-orange-900/20"
    },
    {
        title: "Mountain Escape",
        emoji: "🏔️",
        image: "/mountains.jpg",
        prompt: "Plan a mountain escape trip",
        bgClass: "bg-green-50/40 dark:bg-green-900/10",
        borderClass: "hover:border-green-200 dark:hover:border-green-800",
        shadowClass: "hover:shadow-green-100 dark:hover:shadow-green-900/20"
    },
];

export default function TripTemplates() {
    const router = useRouter();

    const handleSelect = (prompt: string) => {
        router.push(`/create-new-trip?query=${encodeURIComponent(prompt)}`);
    };

    return (
        <section className="py-20 bg-transparent">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Start with a template</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Kickstart your planning with curated ideas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {templates.map((t) => (
                        <button
                            key={t.title}
                            onClick={() => handleSelect(t.prompt)}
                            className={`group relative p-4 rounded-3xl border border-white/50 dark:border-gray-800 ${t.bgClass} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.borderClass} ${t.shadowClass} text-left overflow-hidden w-full`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Thumbnail Image */}
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={t.image}
                                        alt={t.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                        {t.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                                        Use template <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
