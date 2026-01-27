"use client";

import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import HowItWorks from "./_components/HowItWorks";
import FeaturesGrid from "./_components/FeaturesGrid";
import FooterCallToAction from "./_components/FooterCallToAction";
import Footer from "./_components/Footer";
import ActivityTicker from "@/components/ui/activity-ticker";
import TripTemplates from "./_components/TripTemplates";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-40 left-20 h-[420px] w-[420px] rounded-full bg-pink-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-[520px] right-10 h-[480px] w-[480px] rounded-full bg-purple-500/10 blur-[150px]" />

      {/* Your actual page content */}
      <div className="relative z-10">
        <Hero />

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <TripTemplates />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24"
        >
          <HowItWorks />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <FeaturesGrid />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <PopularCityList />
        </motion.section>

        <FooterCallToAction />
        <Footer />
        <ActivityTicker />
      </div>
    </div>
  );
}

