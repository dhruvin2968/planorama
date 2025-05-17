import React, { useState } from "react";
import { motion } from "framer-motion";

const currencyRates = {
  USD: 1,
  EUR: 0.93,
  INR: 83.2,
  GBP: 0.8,
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
      className="
        min-h-screen
        bg-indigo-100
        dark:bg-gradient-to-br dark:from-indigo-900 dark:via-gray-900 dark:to-black
        flex flex-col justify-center items-center py-10 px-4
        transition-colors duration-500
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h1
        className="
          text-4xl md:text-5xl font-extrabold mb-10
          text-indigo-700 dark:text-indigo-300
          drop-shadow-xl tracking-tight
          text-center
        "
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
      >
        Currency Converter <span className="animate-bounce">💱</span>
      </motion.h1>

      <motion.div
        className="
          bg-gradient-to-br from-indigo-200 via-gray-100 to-white dark:bg-gray-900/95
          border-2 border-indigo-200 dark:border-indigo-800
          rounded-3xl shadow-2xl
          p-8 md:p-10
          max-w-md w-full
          backdrop-blur-lg
          transition-colors duration-500
        "
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, delay: 0.4 }}
      >
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-700 ">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            min="0"
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="
              w-full rounded-xl px-5 py-3
              bg-gray-100 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-800 dark:text-gray-100
              text-xl font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700
              transition-all duration-300
              shadow-inner
            "
            autoFocus
          />
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold mb-2 text-gray-700">
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="
                w-full rounded-xl px-4 py-3
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                text-lg font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700
                transition-all duration-300
                shadow-inner
              "
            >
              {currencies.map((cur) => (
                <option
                  key={cur}
                  value={cur}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {cur}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
              To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="
                w-full rounded-xl px-4 py-3
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-100
                text-lg font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-700
                transition-all duration-300
                shadow-inner
              "
            >
              {currencies.map((cur) => (
                <option
                  key={cur}
                  value={cur}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          className="
            text-2xl md:text-3xl text-center font-bold
            text-indigo-700 
            mt-8 mb-2
            drop-shadow-md
            transition-colors duration-500
            select-none
          "
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", delay: 0.7, stiffness: 70 }}
        >
          {amount} {from} = {convert()} {to}
        </motion.div>
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Rates are static for demo purposes.
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
