import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Heart, X } from "lucide-react";

const destinations = [
  {
    name: "Paris",
    country: "France",
    region: "Europe",
    emoji: "🏙️",
    description: "The City of Light and Love.",
    image: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg",
  },
  {
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    emoji: "🏯",
    description: "Historic temples and cherry blossoms.",
    image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    emoji: "🌄",
    description: "Mountains, beaches, and wildlife.",
    image: "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg",
  },
  {
    name: "New York",
    country: "USA",
    region: "America",
    emoji: "🗽",
    description: "Skyscrapers and city buzz.",
    image: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg",
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "America",
    emoji: "🎉",
    description: "Beaches and carnivals.",
    image: "https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg",
  },
  {
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    emoji: "🏖️",
    description: "White houses and ocean views.",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
  },
  {
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    emoji: "🌴",
    description: "Tropical paradise with serene beaches and temples.",
    image: "https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg",
  },
  {
    name: "Venice",
    country: "Italy",
    region: "Europe",
    emoji: "🚤",
    description: "Romantic canals and timeless architecture.",
    image: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg",
  },
  {
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    emoji: "🕌",
    description: "Vibrant markets and desert vibes.",
    image: "https://images.pexels.com/photos/6175286/pexels-photo-6175286.jpeg",
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    region: "America",
    emoji: "💃",
    description: "Tango, steak, and Latin passion.",
    image: "https://images.pexels.com/photos/3779149/pexels-photo-3779149.jpeg",
  },
  {
    name: "Sydney",
    country: "Australia",
    region: "Asia",
    emoji: "🌉",
    description: "Iconic opera house and coastal vibes.",
    image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg",
  },
  {
    name: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    emoji: "❄️",
    description: "Northern lights and geothermal spas.",
    image: "https://images.pexels.com/photos/347141/pexels-photo-347141.jpeg",
  },
  {
    name: "Petra",
    country: "Jordan",
    region: "Asia",
    emoji: "🏜️",
    description: "Ancient rock-cut architecture in the desert.",
    image: "https://images.pexels.com/photos/1619316/pexels-photo-1619316.jpeg",
  },
  {
    name: "Banff",
    country: "Canada",
    region: "America",
    emoji: "🏔️",
    description: "Turquoise lakes and snow-capped peaks.",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  },
  {
    name: "Prague",
    country: "Czech Republic",
    region: "Europe",
    emoji: "🕍",
    description: "Fairy-tale city with gothic charm.",
    image: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg",
  },
  {
    name: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    emoji: "🏝️",
    description: "Exotic spice island with pristine beaches.",
    image:
      "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg?width=1366&height=768&xhint=2066&yhint=1423&crop=true",
  },
  {
    name: "Hoi An",
    country: "Vietnam",
    region: "Asia",
    emoji: "🏮",
    description: "Lantern-lit nights and riverside charm.",
    image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg",
  },
  {
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    emoji: "🚋",
    description: "Colorful streets, coastal beauty, and rich history.",
    image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
  },
];

const regions = ["All", "Asia", "Europe", "Africa", "America"];

export const Destination = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [favorites, setFavorites] = useState(new Set());

  const filteredDestinations =
    selectedRegion === "All"
      ? destinations
      : destinations.filter((dest) => dest.region === selectedRegion);

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(name)) {
        newFavorites.delete(name);
      } else {
        newFavorites.add(name);
      }
      return newFavorites;
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    },
  };
  const [modal, setModal] = useState(null);
  return (
    <div className="relative min-h-screen bg-ingigo-100  from-blue-50 via-indigo-100 to-blue-200 dark:bg-black py-12 px-4 sm:px-6 lg:px-20 overflow-x-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-indigo-300/30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], rotate: [180, 360] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <header className="relative z-10 text-center mb-12">
        <motion.div
          className="mb-4 inline-flex items-center justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Globe
            size={46}
            className="text-blue-600 dark:text-blue-400 drop-shadow-lg"
          />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-transparent bg-clip-text drop-shadow-lg dark:text-blue-400"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Explore Destinations
        </motion.h1>

        <motion.p
          className="text-blue-700 dark:text-blue-400 text-lg max-w-2xl mx-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover breathtaking places, iconic landmarks, and hidden gems from
          around the world. <br />
          <span className="font-semibold text-blue-500 dark:text-blue-300">
            Where will your next adventure take you?
          </span>
        </motion.p>
      </header>

      {/* Region selector */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {regions.map((region, i) => (
          <motion.button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300
              ${
                selectedRegion === region
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-2 border-blue-600 shadow-lg"
                  : "bg-white/90 backdrop-blur-sm text-blue-700 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            whileHover={{
              scale: 1.08,
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08)",
            }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.05 + 0.4,
              type: "spring",
              stiffness: 80,
            }}
          >
            <span>
              {region === "Europe" && "🗺️"}
              {region === "Asia" && "🏯"}
              {region === "Americas" && "🌎"}
              {region === "Africa" && "🦁"}
              {region === "Oceania" && "🏝️"}
            </span>
            {region}
          </motion.button>
        ))}
      </motion.div>

      {/* Destinations grid */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredDestinations.map((destination, index) => (
          <motion.div
            key={destination.name}
            className="rounded-2xl overflow-hidden bg-white/90 dark:bg-indigo-100 shadow-xl border-2 border-blue-50 relative group transition-all"
            variants={item}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 30px -5px rgba(0,0,0,0.13), 0 10px 10px -5px rgba(0,0,0,0.07)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="relative h-64 overflow-hidden cursor-pointer"
              onClick={() => setModal(destination)}
            >
              <motion.img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-all"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />

              {/* Overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none group-hover:opacity-80 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Favorite button */}
              <motion.button
                className={`absolute top-3 right-3 p-2 pr-4 rounded-full shadow-lg transition-all z-20 ${
                  favorites.has(destination.name)
                    ? "bg-red-100/80"
                    : "bg-white/70"
                }`}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(destination.name);
                }}
              >
                <Heart
                  size={20}
                  className={
                    favorites.has(destination.name)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }
                />
              </motion.button>

              {/* Emoji badge (floating animation) */}
              <motion.div
                className="absolute bottom-3 left-3 text-3xl drop-shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {destination.emoji}
              </motion.div>

              {/* Country badge */}
              <div className="absolute bottom-3 right-3 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm flex items-center shadow">
                <MapPin size={14} className="mr-1" />
                {destination.country}
              </div>
              {/* Hover overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 rounded-b-2xl">
                  <div className="text-white text-lg font-bold mb-1">
                    {destination.phrase}
                  </div>
                  <div className="text-blue-200 text-xs font-medium">
                    {destination.highlights}
                  </div>
                  <div className="mt-2">
                    <button
                      className="bg-white/90 text-blue-700 font-semibold rounded-full px-4 py-1 text-sm shadow hover:bg-blue-100 transition pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal(destination);
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {destination.name}
              </h2>
              <p className="text-gray-600 mb-4 italic">
                {destination.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="inline-block text-xs px-3 py-1 bg-blue-100 dark:bg-indigo-200 text-blue-700 rounded-full font-semibold">
                  {destination.region}
                </span>

                <motion.button
                  className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setModal(destination)}
                >
                  Explore <span>→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Destination Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
          >
            <motion.div
              className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full p-8 shadow-2xl border-4 border-blue-100"
              initial={{ scale: 0.85, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 60 }}
              transition={{ type: "spring", stiffness: 90 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modal.image}
                alt={modal.name}
                className="w-full h-[350px] object-cover rounded-xl"
              />
              <div className="text-center mt-6 text-2xl font-extrabold text-blue-700">
                {modal.name} <span className="text-3xl">{modal.emoji}</span>
              </div>
              <div className="text-center text-blue-500 text-lg mt-2 italic">
                {modal.phrase}
              </div>
              <div className="text-center text-gray-500 mt-2 mb-2">
                {modal.description}
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div className="bg-blue-50 px-4 py-2 rounded-xl text-blue-700 font-semibold text-sm shadow">
                  <span className="font-bold">Highlights:</span>{" "}
                  {modal.highlights}
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-semibold text-sm shadow">
                  <span className="font-bold">Best Time:</span> {modal.bestTime}
                </div>
              </div>
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-blue-600 bg-white hover:bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow"
                aria-label="Close"
              >
                <X size={26} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call-to-action */}
      <motion.div
        className="relative z-10 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <p className="text-lg text-blue-700 dark:text-blue-300 font-semibold">
          🌏 Ready to add a new pin to your map?{" "}
          <span className="font-bold">Start planning your journey today!</span>
        </p>
      </motion.div>
    </div>
  );
};
