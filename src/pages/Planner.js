import React, { useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export const Planner = () => {
  const [startDate, setStartDate] = useState("");
  const [tripLength, setTripLength] = useState(3);
  const [notes, setNotes] = useState({});

  const handleNoteChange = (day, value) => {
    setNotes((prev) => ({ ...prev, [day]: value }));
  };

  const today = dayjs();
  const countdown = startDate ? dayjs(startDate).diff(today, "day") : null;

  const generateDays = () => {
    const days = [];
    for (let i = 1; i <= tripLength; i++) {
      days.push(
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-indigo-100 from-teal-50 to-indigo-50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-teal-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Day {i}
          </h3>
          <textarea
            className="w-full h-32 p-4 rounded-lg border-2 border-teal-100 focus:outline-none focus:ring-4 focus:ring-teal-300/50 resize-none bg-white/50 backdrop-blur-sm"
            placeholder={`✈️ Plan for Day ${i}...`}
            value={notes[i] || ""} 
            onChange={(e) => handleNoteChange(i, e.target.value)}
          />
        </motion.div>
      );
    }
    return days;
  };

  return (
    <motion.div
      className="min-h-screen bg-indigo-100 dark:bg-black from-indigo-50 via-teal-50 to-blue-50 px-8 md:px-24 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-5xl font-extrabold text-center bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-12 drop-shadow-lg"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        ✈️ Travel Planner
      </motion.h1>

      <motion.div
        className="bg-white/80 dark:bg-indigo-100 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto mb-14 border-2 border-teal-100/50"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="mb-6">
          <label className="block font-semibold text-teal-700 mb-3 text-lg">
            📅 Trip Start Date:
          </label>
          <input
            type="date"
            className="w-full border-2 border-teal-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-300/30 transition-all"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold text-teal-700 mb-3 text-lg">
            ⏳ Trip Duration (Days):
          </label>
          <input
            type="number"
            min="1"
            className="w-full border-2 border-teal-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-300/30 transition-all"
            value={tripLength}
            onChange={(e) => setTripLength(Number(e.target.value))}
          />
        </div>
      </motion.div>

      {startDate && (
        <motion.div
          className="text-center mb-16"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <p className="text-2xl font-semibold bg-gradient-to-r dark:bg-indigo-100 from-teal-600 to-indigo-600 bg-clip-text dark:text-white text-teal-900">
            ⏰ Countdown:{" "}
            <span className="font-black text-3xl ">
              {countdown >= 0 ? countdown : 0}
            </span>{" "}
            day{countdown === 1 ? "" : "s"} left!
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {generateDays()}
      </div>
    </motion.div>
  );
};
