import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaGlobe,
  FaUsers,
  FaSuitcaseRolling,
  FaCheckCircle,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaImages,
  FaLanguage,
  FaMapSigns,
} from "react-icons/fa";
import { Link } from "react-router-dom";


export const AboutPage = () => {
  const features = [
    {
      icon: FaGlobe,
      iconClass: "text-green-500",
      title: "Explore Destinations 🌍",
      desc: "Filter and discover global locations with regional highlights and emojis.",
      link: "/destination",
    },
    {
      icon: FaCheckCircle,
      iconClass: "text-yellow-500",
      title: "Packing Checklist ✅",
      desc: "Stay organized with category-based, customizable packing lists.",
      link: "/packing",
    },
    {
      icon: FaMoneyBillWave,
      iconClass: "text-pink-500",
      title: "Currency Converter 💱",
      desc: "Convert currencies using fun, mock exchange rates for planning.",
      link: "/currency",
    },
    {
      icon: FaMapMarkedAlt,
      iconClass: "text-blue-500",
      title: "AI Itinerary Generator",
      desc: "Create personalized, intelligent trip plans powered by GROQ AI.",
      link: "/",
    },
    {
      icon: FaUsers,
      iconClass: "text-orange-500",
      title: "Download Your Itineraries",
      desc: "Easily export and access your saved travel plans anytime, anywhere.",
      link: "/mydashboard",
    },
    {
      icon: FaSuitcaseRolling,
      iconClass: "text-pink-600",
      title: "Smart Packing Assistant",
      desc: "Auto-generate packing lists based on destination, duration, and travel style.",
      link: "/planner",
    },
    {
      icon: FaCalendarAlt,
      iconClass: "text-indigo-500",
      title: "Trip Countdown + Planner 📅",
      desc: "Visual countdown with a daily notes planner for your entire trip.",
      link: "/planner",
    },
    {
      icon: FaImages,
      iconClass: "text-purple-500",
      title: "Travel Gallery 📸",
      desc: "Click-to-expand image modals to relive or pre-plan moments.",
      link: "/gallery",
    },
    {
      icon: FaMoneyBillWave,
      iconClass: "text-rose-500",
      title: "Budget Tracker 💸",
      desc: "Track travel expenses, add categories, and auto-calculate totals.",
      link: "/budgettracker",
    },
    {
      icon: FaLanguage,
      iconClass: "text-red-400",
      title: "Phrasebook 🗣️",
      desc: "Generate useful phrases based on destination & travel type.",
      link: "/phrases",
    },
    {
      icon: FaMapMarkedAlt,
      iconClass: "text-cyan-500",
      title: "Interactive Itinerary ✈️",
      desc: "Drag-to-reorder daily plans and visualize your adventure flow.",
      link: "/itinerary",
    },
    {
      icon: FaMapSigns,
      iconClass: "text-orange-500",
      title: "Airport Gate UI 🛫",
      desc: "Mock airport interface with gate filter and boarding visualization.",
      link: "/navigation",
    },
  ];

  return (
    <div className="min-h-screen bg-Bluee px-6 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">
          About Planorama 🚀
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          Planorama is your all-in-one travel companion. From intelligent itinerary generation to detailed planning tools,
          it helps you travel smarter, better, and beautifully.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link to={feature.link || "#"} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all cursor-pointer"
              >
                <Icon className={`${feature.iconClass} text-5xl mb-4`} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
