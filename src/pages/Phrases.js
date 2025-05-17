import React, { useState } from "react";
import { motion } from "framer-motion";

const travelTypes = ["Adventure", "Business", "Romantic", "Cultural", "Family", "Solo", "Luxury"];

const phrasesByType = {
  Adventure: [
    { phrase: "Where can I rent a bike?", emoji: "🚲", tip: "Look for bike-sharing stations" },
    { phrase: "Is this trail safe?", emoji: "🧗‍♂️", tip: "Check local hiking forums" },
    { phrase: "Do I need a guide?", emoji: "🧭", tip: "Recommended for remote areas" },
    { phrase: "Best spot for sunrise?", emoji: "🌄", tip: "Ask local photographers" },
  ],
  Business: [
    { phrase: "Where is the nearest Wi-Fi?", emoji: "💼", tip: "Coffee shops often have free WiFi" },
    { phrase: "Can we schedule a meeting?", emoji: "📅", tip: "Confirm time zones first" },
    { phrase: "Is there a co-working space?", emoji: "🏢", tip: "Check coworker.com listings" },
    { phrase: "Where's the business center?", emoji: "💻", tip: "Most hotels have one" },
  ],
  Romantic: [
    { phrase: "This place is beautiful!", emoji: "❤️", tip: "Perfect for proposals!" },
    { phrase: "Can you take a picture of us?", emoji: "📸", tip: "Offer to take theirs first" },
    { phrase: "Where’s a romantic dinner spot?", emoji: "🍷", tip: "Rooftop restaurants recommended" },
    { phrase: "Best couple's activity?", emoji: "💑", tip: "Try a cooking class together" },
  ],
  Cultural: [
    { phrase: "Is there a local market?", emoji: "🧺", tip: "Go early for fresh produce" },
    { phrase: "Where’s the museum?", emoji: "🏛️", tip: "Free days often available" },
    { phrase: "Tell me about this tradition.", emoji: "🗿", tip: "Locals love sharing stories" },
    { phrase: "Traditional dish to try?", emoji: "🍲", tip: "Ask for street food recommendations" },
  ],
  Family: [
    { phrase: "Where’s the kids’ area?", emoji: "🧒", tip: "Look for playground symbols" },
    { phrase: "Can I get a family discount?", emoji: "🎟️", tip: "Always ask about deals" },
    { phrase: "Do you have a high chair?", emoji: "🪑", tip: "Call restaurants ahead" },
    { phrase: "Child-friendly activities?", emoji: "🎠", tip: "Zoos and aquariums are great" },
  ],
  Solo: [
    { phrase: "Safe areas to explore?", emoji: "🛡️", tip: "Talk to hostel staff" },
    { phrase: "Best way to meet people?", emoji: "👋", tip: "Join free walking tours" },
    { phrase: "Affordable single rooms?", emoji: "🚪", tip: "Check guesthouse reviews" },
    { phrase: "Good selfie spots?", emoji: "🤳", tip: "Look for iconic landmarks" },
  ],
  Luxury: [
    { phrase: "Champagne service available?", emoji: "🍾", tip: "5-star hotels best bet" },
    { phrase: "Private tour options?", emoji: "👑", tip: "Concierge can arrange" },
    { phrase: "Luxury spa services?", emoji: "💆", tip: "Book treatments in advance" },
    { phrase: "VIP airport transfer?", emoji: "✈️", tip: "Arrange through your hotel" },
  ],
};

export const Phrases = () => {
  const [type, setType] = useState("Adventure");

  return (
    <motion.div
      className="min-h-screen dark:bg-black bg-indigo-100 from-blue-100 via-purple-50 to-teal-50 py-16 px-6 flex flex-col items-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-32 -left-32 w-64 h-64 bg-blue-200/30 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-72 h-72 bg-teal-200/30 rounded-full blur-xl"
        animate={{ scale: [1, 1.3, 1], rotate: [180, 360] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.h1
        className="text-5xl font-extrabold text-center bg-transparent bg-clip-text dark:text-gray-100 text-indigo-800 mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
       Travel Phrasebook 🌍
        <p className="text-lg font-medium text-gray-600 dark:text-gray-100 mt-4 max-w-2xl mx-auto">
          Never get stuck abroad! Essential phrases for every traveler, with local tips and cultural notes.
        </p>
      </motion.h1>

      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {travelTypes.map((travelType) => (
          <motion.button
            key={travelType}
            onClick={() => setType(travelType)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full font-semibold shadow-lg transition-all ${
              type === travelType
                ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white"
                : "bg-gray-100  text-blue-600 border-2 border-blue-100 hover:border-blue-200"
            }`}
          >
            {type === travelType && "🌟 "}
            {travelType}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {phrasesByType[type].map((item, idx) => (
          <motion.div
            key={idx}
            className="dark:bg-indigo-100 bg-gray-50  backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-50 hover:border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="text-5xl mb-4 cursor-grab active:cursor-grabbing"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.emoji}
            </motion.div>
            <p className="text-lg font-semibold text-gray-800 mb-3">{item.phrase}</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-teal-400"/>
            <div className="mt-4 p-3 bg-blue-50/50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">💡 {item.tip}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center dark:text-gray-100 text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🎉 Pro Tip: Practice these phrases before your trip and watch locals light up!
      </motion.div>
    </motion.div>
  );
};