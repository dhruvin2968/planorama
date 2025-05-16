import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  {
    url: "https://source.unsplash.com/800x600/?beach",
    title: "Maldives",
  },
  {
    url: "https://source.unsplash.com/800x600/?mountains",
    title: "Swiss Alps",
  },
  {
    url: "https://source.unsplash.com/800x600/?desert",
    title: "Sahara",
  },
  {
    url: "https://source.unsplash.com/800x600/?city",
    title: "Tokyo",
  },
  {
    url: "https://source.unsplash.com/800x600/?forest",
    title: "Amazon Rainforest",
  },
  {
    url: "https://source.unsplash.com/800x600/?lake",
    title: "Lake Tahoe",
  },
];

export const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
        Travel Gallery 📸
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, idx) => (
          <motion.div
            key={idx}
            className="overflow-hidden rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-60 object-cover"
            />
            <div className="bg-white py-2 text-center font-semibold text-pink-700">
              {img.title}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full p-4 shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.url}
                alt={selectedImg.title}
                className="w-full h-[500px] object-cover rounded-md"
              />
              <div className="text-center mt-4 text-xl font-semibold text-pink-600">
                {selectedImg.title}
              </div>
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-3 right-3 text-white bg-pink-500 hover:bg-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-xl"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

