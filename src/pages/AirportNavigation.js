import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample data for gates and flights
const GATES = ["A1", "A2", "B1", "B2", "C1", "C2"];
const FLIGHTS = [
  {
    id: 1,
    flight: "AI 202",
    destination: "New Delhi",
    gate: "A1",
    time: "10:30",
    status: "On Time",
  },
  {
    id: 2,
    flight: "BA 101",
    destination: "London",
    gate: "A2",
    time: "11:15",
    status: "Delayed",
  },
  {
    id: 3,
    flight: "LH 303",
    destination: "Frankfurt",
    gate: "B1",
    time: "12:00",
    status: "Boarding",
  },
  {
    id: 4,
    flight: "UA 404",
    destination: "San Francisco",
    gate: "B2",
    time: "12:45",
    status: "On Time",
  },
  {
    id: 5,
    flight: "SQ 505",
    destination: "Singapore",
    gate: "C1",
    time: "13:30",
    status: "On Time",
  },
  {
    id: 6,
    flight: "EK 606",
    destination: "Dubai",
    gate: "C2",
    time: "14:10",
    status: "Cancelled",
  },
];

const statusColors = {
  "On Time": "text-green-600",
  Delayed: "text-yellow-600",
  Boarding: "text-blue-600",
  Cancelled: "text-red-600",
};

export const AirportNavigation = () => {
  const [selectedGate, setSelectedGate] = useState("All");

  const filteredFlights =
    selectedGate === "All"
      ? FLIGHTS
      : FLIGHTS.filter((f) => f.gate === selectedGate);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight">
        ✈️ Airport Navigation
      </h1>

      {/* Gate Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedGate("All")}
          className={`px-5 py-2 rounded-full font-semibold transition 
            ${
              selectedGate === "All"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100"
            }
          `}
        >
          All Gates
        </button>
        {GATES.map((gate) => (
          <button
            key={gate}
            onClick={() => setSelectedGate(gate)}
            className={`px-5 py-2 rounded-full font-semibold transition 
              ${
                selectedGate === gate
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100"
              }
            `}
          >
            Gate {gate}
          </button>
        ))}
      </div>

      {/* Flight Board */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-5 gap-2 px-6 py-3 bg-indigo-50 font-semibold text-indigo-700 text-lg">
          <div>Flight</div>
          <div>Destination</div>
          <div>Gate</div>
          <div>Time</div>
          <div>Status</div>
        </div>
        <AnimatePresence>
          {filteredFlights.length === 0 ? (
            <motion.div
              key="no-flights"
              className="text-center text-gray-500 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No flights at this gate.
            </motion.div>
          ) : (
            filteredFlights.map((flight) => (
              <motion.div
                key={flight.id}
                className="grid grid-cols-5 gap-2 px-6 py-4 border-b last:border-b-0 items-center hover:bg-indigo-50 transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                layout
              >
                <div className="font-bold text-indigo-900">{flight.flight}</div>
                <div className="text-indigo-700">{flight.destination}</div>
                <div>
                  <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                    {flight.gate}
                  </span>
                </div>
                <div className="text-indigo-700">{flight.time}</div>
                <div className={`font-bold ${statusColors[flight.status]}`}>
                  {flight.status}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
