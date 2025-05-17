import { Headset } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const CustomerSupport = () => (
  <motion.div
    className="mx-auto my-12 max-w-xl w-full bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border-2 border-indigo-100 backdrop-blur-lg p-8 flex flex-col items-center text-center overflow-auto"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <div className="mb-4">
      <span className="inline-flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-pink-500 rounded-full p-4 shadow-lg">
        <Headset size={36} className="text-white" />
      </span>
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">
      Customer Support
    </h2>
    <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg mb-2">
      Our Customer Support Team is dedicated to guiding you every step of the
      way. Whether you have questions about our tours, booking procedures, or
      travel tips, we're here to help.
    </p>
    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
      Experience seamless journeys and memorable adventures with Planorama.
      Reach out now for all your travel-related queries!
    </p>
    <Link
      to="/contact"
      className="inline-block mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow hover:scale-105 transition"
    >
      Contact Us
    </Link>
  </motion.div>
);
