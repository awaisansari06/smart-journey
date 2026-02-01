"use client";

import { PricingTable, useUser } from "@clerk/nextjs";
import React from "react";
import { Globe } from "lucide-react";

export default function Pricing() {
  const { user } = useUser();

  return (
    <main className="relative min-h-screen pb-20">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 -z-10" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-bold tracking-tight leading-tight text-[clamp(2.5rem,5vw,3.5rem)] text-gray-900">
            AI-Powered Trip Planning
            <span className="block mt-2 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Pick Your Perfect Plan
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start for free. Upgrade when you’re ready for{" "}
            <span className="text-orange-600 font-medium">unlimited trips</span>,
            smarter itineraries, and premium travel insights.
          </p>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <Globe className="w-4 h-4 text-gray-400" />
            Trusted by 10,000+ travelers worldwide 🌍
          </div>
        </div>
      </section>

      {/* ===== CLERK PRICING TABLE ===== */}
      <section className="relative px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <PricingTable />
        </div>
      </section>
    </main>
  );
}
