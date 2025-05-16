import React, { useState } from "react";
import { motion } from "framer-motion";

const currencyRates = {
  USD: 1,
  EUR: 0.93,
  INR: 83.2,
  GBP: 0.80,
  JPY: 155.45,
  AUD: 1.5,
  CAD: 1.35,
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const convert = () => {
    const inUSD = amount / currencyRates[from];
    return (inUSD * currencyRates[to]).toFixed(2);
  };

  const currencies = Object.keys(currencyRates);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center items-center py-10 px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-indigo-700 mb-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Currency Converter 💱
      </motion.h1>

      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            min="0"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1 font-medium">
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-600 mb-1 font-medium">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          className="text-xl text-center text-indigo-800 font-semibold mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {amount} {from} = {convert()} {to}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

