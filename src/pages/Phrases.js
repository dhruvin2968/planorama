import React, { useState } from "react";
import { motion } from "framer-motion";

const travelTypes = ["Adventure", "Business", "Romantic", "Cultural", "Family"];

const phrasesByType = {
  Adventure: [
    { phrase: "Where can I rent a bike?", emoji: "🚲" },
    { phrase: "Is this trail safe?", emoji: "🧗‍♂️" },
    { phrase: "Do I need a guide?", emoji: "🧭" },
  ],
  Business: [
    { phrase: "Where is the nearest Wi-Fi?", emoji: "💼" },
    { phrase: "Can we schedule a meeting?", emoji: "📅" },
    { phrase: "Is there a co-working space?", emoji: "🏢" },
  ],
  Romantic: [
    { phrase: "This place is beautiful!", emoji: "❤️" },
    { phrase: "Can you take a picture of us?", emoji: "📸" },
    { phrase: "Where’s a good place for dinner?", emoji: "🍷" },
  ],
  Cultural: [
    { phrase: "Is there a local market?", emoji: "🧺" },
    { phrase: "Where’s the museum?", emoji: "🏛️" },
    { phrase: "Tell me about this tradition.", emoji: "🗿" },
  ],
  Family: [
    { phrase: "Where’s the kids’ area?", emoji: "🧒" },
    { phrase: "Can I get a family discount?", emoji: "🎟️" },
    { phrase: "Do you have a high chair?", emoji: "🪑" },
  ],
};

export const Phrases = () => {
  const [type, setType] = useState("Adventure");

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-blue-700 mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🗣️ Language Cheat Sheet
      </motion.h1>

      <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
        Select your travel type to get handy local phrases to help you vibe
        better with the locals.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {travelTypes.map((travelType) => (
          <button
            key={travelType}
            onClick={() => setType(travelType)}
            className={`px-4 py-2 rounded-full font-medium shadow-md transition ${
              type === travelType
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-300"
            } hover:scale-105`}
          >
            {travelType}
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {phrasesByType[type].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 text-center border border-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-3">{item.emoji}</div>
            <p className="text-gray-700 font-semibold">{item.phrase}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

