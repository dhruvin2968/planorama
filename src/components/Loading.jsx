import React from "react";
import { motion } from "framer-motion";

export const Loading = () => (
  <motion.div
    className="
      min-h-[40vh] flex flex-col items-center justify-center
      
      transition-colors duration-500
      rounded-2xl shadow-lg
      p-8
    "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Spinner */}
    <motion.div
      className="mb-6"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    >
      <svg
        className="w-12 h-12 text-indigo-500 dark:text-indigo-300 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </motion.div>
    <motion.div
      className="text-xl font-semibold text-indigo-700 dark:text-indigo-200 tracking-wide"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
    >
      Loading your itineraries<span className="animate-pulse">...</span>
    </motion.div>
  </motion.div>
);
