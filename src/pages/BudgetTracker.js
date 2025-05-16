import React, { useState } from "react";
import { motion } from "framer-motion";

export const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([
    { name: "Flights", amount: 0 },
    { name: "Hotel", amount: 0 },
    { name: "Food", amount: 0 },
  ]);
  const [newItem, setNewItem] = useState({ name: "", amount: "" });

  const handleChange = (index, value) => {
    const updated = [...expenses];
    updated[index].amount = parseFloat(value) || 0;
    setExpenses(updated);
  };

  const handleAdd = () => {
    if (newItem.name.trim() && newItem.amount) {
      setExpenses([
        ...expenses,
        { name: newItem.name, amount: parseFloat(newItem.amount) },
      ]);
      setNewItem({ name: "", amount: "" });
    }
  };

  const total = expenses.reduce((acc, item) => acc + item.amount, 0);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-12 px-4 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-yellow-700 mb-8"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Vacation Budget Tracker 💸
      </motion.h1>

      <div className="w-full max-w-2xl space-y-4">
        {expenses.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center bg-white shadow-md rounded-xl px-4 py-3"
            whileHover={{ scale: 1.01 }}
          >
            <span className="font-medium text-gray-700">{item.name}</span>
            <input
              type="number"
              value={item.amount}
              min="0"
              onChange={(e) => handleChange(index, e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-24 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </motion.div>
        ))}

        <motion.div
          className="bg-white rounded-xl shadow-lg p-4 mt-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-yellow-700">
            Add New Expense
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Category"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newItem.amount}
              onChange={(e) =>
                setNewItem({ ...newItem, amount: e.target.value })
              }
              className="w-32 border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button
              onClick={handleAdd}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2 font-semibold transition"
            >
              Add
            </button>
          </div>
        </motion.div>

        <motion.div
          className="text-center text-2xl font-bold text-yellow-800 mt-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          Total: ₹{total.toFixed(2)}
        </motion.div>
      </div>
    </motion.div>
  );
};

