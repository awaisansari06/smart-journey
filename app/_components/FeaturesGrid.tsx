import React from 'react';
import { Hotel, Map, Wallet, Sparkles, Users, Bookmark } from 'lucide-react';

function FeaturesGrid() {
  const features = [
    {
      icon: <Hotel className="w-6 h-6 text-blue-600" />,
      title: "Hotel recommendations",
      desc: "Get curated hotel stays based on your budget and style."
    },
    {
      icon: <Map className="w-6 h-6 text-green-600" />,
      title: "Smart itinerary builder",
      desc: "Day-by-day plans optimized for travel time and enjoyment."
    },
    {
      icon: <Wallet className="w-6 h-6 text-orange-600" />,
      title: "Budget planning",
      desc: "Estimate daily costs to keep your trip pocket-friendly."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      title: "Hidden gems suggestions",
      desc: "Discover off-the-beaten-path spots that locals love."
    },
    {
      icon: <Users className="w-6 h-6 text-pink-600" />,
      title: "Group trip planning",
      desc: "Easily plan specifically for solo, couples, or large groups."
    },
    {
      icon: <Bookmark className="w-6 h-6 text-indigo-600" />,
      title: "Save and view trips later",
      desc: "Access your saved itineraries anytime from your dashboard."
    }
  ];

  return (
    <section className="py-20 bg-muted/30 dark:bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From inspiration to detailed daily plans, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 glass hover:shadow-xl hover:-translate-y-1 hover:bg-white/75 transition-all duration-300 group flex flex-col h-full border border-white/40">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform text-primary/80 group-hover:text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 grow">
                {feature.desc}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-1 text-sm font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Learn more <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
