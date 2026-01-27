"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PopularCityList() {
    return (
        <div className="w-full py-20 bg-linear-to-b from-white via-orange-50/40 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Popular destinations
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Handpicked places you can explore with one click
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((city, index) => (
                        <Link
                            key={index}
                            href={`/create-new-trip?query=Trip to ${city.category}`}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Background Image */}
                            <Image
                                src={city.src}
                                alt={city.category}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Extra Gradient for Readability */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent pointer-events-none" />

                            {/* Glass Overlay Card */}
                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-lg text-white group-hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 drop-shadow-md">{city.category}</h3>
                                        <p className="text-xs text-gray-100 line-clamp-2 opacity-90 font-medium drop-shadow-sm">
                                            {city.title}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0 border border-white/30">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Hover Message */}
                                <div className="mt-3 overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
                                    <p className="text-xs font-semibold text-center bg-white/20 backdrop-blur-md rounded-full py-1 px-3 border border-white/20">
                                        Plan this trip →
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

const data = [
    {
        category: "Paris, France",
        title: "Explore the City of Lights - Eiffel Tower, Louvre & more",
        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    },
    {
        category: "New York, USA",
        title: "Experience NYC - Times Square, Central Park, Broadway",
        src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        category: "Tokyo, Japan",
        title: "Discover Tokyo - Shibuya, Cherry Blossoms, Temples",
        src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        category: "Rome, Italy",
        title: "Walk through History - Colosseum, Vatican, Roman Forum",
        src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        category: "Dubai, UAE",
        title: "Luxury and Innovation - Burj Khalifa, Desert Safari",
        src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        category: "Sydney, Australia",
        title: "Harbour Views - Opera House, Bondi Beach & Wildlife",
        src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];
