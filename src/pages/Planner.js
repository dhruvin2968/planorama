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
          className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <h3 className="text-lg font-semibold text-teal-700 mb-2">Day {i}</h3>
          <textarea
            className="w-full h-24 p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            placeholder={`Plan for Day ${i}...`}
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
      className="min-h-screen bg-gradient-to-tr from-teal-50 to-white px-6 md:px-20 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-teal-700 mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Trip Countdown & Planner 🗓️
      </motion.h1>

      <motion.div
        className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto mb-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">
            Trip Start Date:
          </label>
          <input
            type="date"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-teal-400"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Trip Duration (Days):
          </label>
          <input
            type="number"
            min="1"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-teal-400"
            value={tripLength}
            onChange={(e) => setTripLength(Number(e.target.value))}
          />
        </div>
      </motion.div>

      {startDate && (
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <p className="text-xl font-medium text-teal-800">
            ✈️ Countdown:{" "}
            <span className="font-bold text-2xl">
              {countdown >= 0 ? countdown : 0}
            </span>{" "}
            day{countdown === 1 ? "" : "s"} left!
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {generateDays()}
      </div>
    </motion.div>
  );
};
