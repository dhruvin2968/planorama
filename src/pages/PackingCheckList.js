import React, { useState } from "react";
import { motion } from "framer-motion";

const packingData = [
  {
    category: "Clothing 👕",
    items: ["T-Shirts", "Jeans", "Jackets", "Socks", "Underwear"],
  },
  {
    category: "Toiletries 🧴",
    items: ["Toothbrush", "Toothpaste", "Shampoo", "Deodorant", "Towel"],
  },
  {
    category: "Tech 💻",
    items: ["Charger", "Power Bank", "Headphones", "Laptop", "Camera"],
  },
  {
    category: "Documents 📄",
    items: ["Passport", "Boarding Pass", "Hotel Booking", "ID Card"],
  },
  {
    category: "Misc 🌟",
    items: ["Snacks", "Water Bottle", "Sunglasses", "Book"],
  },
];

export const PackingCheckList = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (itemName) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <motion.div
      className="min-h-screen bg-Bluee from-yellow-50 to-white py-10 px-5 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-yellow-800 mb-10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Packing Checklist ✈️
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packingData.map((section, index) => (
          <motion.div
            key={section.category}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-xl font-semibold text-yellow-700 mb-4">
              {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li
                  key={item}
                  onClick={() => toggleItem(item)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                    checkedItems[item]
                      ? "bg-yellow-100 line-through text-gray-500"
                      : "hover:bg-yellow-50"
                  }`}
                >
                  <span>{item}</span>
                  <input
                    type="checkbox"
                    checked={checkedItems[item] || false}
                    readOnly
                    className="form-checkbox text-yellow-600 h-5 w-5"
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
