import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  {
    url: "https://www.authenticindiatours.com/app/uploads/2022/04/Maldives-Islands-Ocean-Tropical-Beach-940x585-c-default.jpg",
    title: "Maldives",
    phrase: "Paradise found! 🏝️",
    desc: "Crystal-clear waters, white sands, and endless relaxation.",
  },
  {
    url: "https://media.cntraveller.com/photos/611be76bd5b6f5a4a3deeb8a/16:9/w_2992,h_1683,c_limit/engadin_giangiovanoli.jpg",
    title: "Swiss Alps",
    phrase: "Breathtaking peaks await! 🏔️",
    desc: "Hike, ski, or simply marvel at the majesty of nature.",
  },
  {
    url: "https://staticimg.amarujala.com/assets/images/2018/05/23/sahara-desert_1527047897.jpeg?q=80&w=480&dpr=2.6",
    title: "Sahara",
    phrase: "Feel the vastness. 🏜️",
    desc: "Golden dunes and starry nights in the world’s largest desert.",
  },
  {
    url: "https://img.freepik.com/free-photo/aerial-view-tokyo-cityscape-with-fuji-mountain-japan_335224-148.jpg?semt=ais_hybrid&w=740",
    title: "Tokyo",
    phrase: "City lights & sushi nights! 🗼",
    desc: "A vibrant blend of tradition and innovation.",
  },
  {
    url: "https://i.pinimg.com/originals/10/cb/84/10cb84b2ea26a2e87bc532550b98ebc6.jpg",
    title: "Amazon Rainforest",
    phrase: "Heartbeat of the Nature. 🌳",
    desc: "Lush greenery and incredible biodiversity.",
  },
  {
    url: "https://travel.usnews.com/dims4/USNEWS/a9e4109/2147483647/resize/600x400%5E%3E/crop/600x400/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FMain_Image-Davis_Ladd-Getty_J0wJWFA.jpg",
    title: "Lake Tahoe",
    phrase: "Serenity by the water. 🚣",
    desc: "Majestic mountains meet crystal-clear lakes.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, type: "spring", stiffness: 60 },
  }),
};

export const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <motion.div
      className="relative min-h-screen bg-indigo-100 dark:bg-black from-indigo-50 via-blue-50 to-white p-10 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text dark:text-indigo-100 text-indigo-800 mb-12 drop-shadow-lg relative z-10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Travel Gallery{" "}
        <span role="img" aria-label="camera">
          📸
        </span>
      </motion.h1>

      <motion.div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {galleryImages.map((img, idx) => (
          <motion.div
            key={img.title}
            className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer bg-white/80 backdrop-blur-sm border-2 border-indigo-100"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={idx}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 12px 24px -6px rgba(236,72,153,0.18)",
            }}
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-indigo-700/60 via-transparent to-transparent flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={false}
            >
              <div className="p-4">
                <div className="text-white text-lg font-bold mb-1">
                  {img.title}
                </div>
                <div className="text-indigo-100 text-sm mb-2">{img.phrase}</div>
                <motion.button
                  className="bg-white/80 text-indigo-700 font-semibold rounded-full px-5 py-1 shadow hover:bg-indigo-100 transition"
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImg(img);
                  }}
                >
                  View
                </motion.button>
              </div>
            </motion.div>
            {/* Title bar */}
            <div className="bg-white/90 py-3 text-center font-bold text-indigo-700 text-lg border-t border-indigo-100">
              {img.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full p-6 shadow-2xl border-4 border-indigo-100"
              initial={{ scale: 0.85, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 60 }}
              transition={{ type: "spring", stiffness: 90 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.url}
                alt={selectedImg.title}
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="text-center mt-6 text-2xl font-extrabold text-indigo-600">
                {selectedImg.title}
              </div>
              <div className="text-center text-indigo-500 text-lg mt-2 italic">
                {selectedImg.phrase}
              </div>
              <div className="text-center text-gray-500 mt-2 mb-4">
                {selectedImg.desc}
              </div>
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 text-indigo-600 bg-white hover:bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow"
                aria-label="Close"
              >
                <X size={26} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer phrase */}
      <motion.div
        className="relative z-10 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <p className="text-lg text-indigo-600 font-semibold">
          ✨ Click any photo to see it in full glory and get inspired for your
          next adventure!
        </p>
      </motion.div>
    </motion.div>
  );
};
