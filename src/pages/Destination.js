import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Heart } from 'lucide-react';

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
  image: "https://content.r9cdn.net/rimg/dimg/e1/6e/f59cbe52-city-1557-1661ba47712.jpg?width=1366&height=768&xhint=2066&yhint=1423&crop=true",
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
}

];

const regions = ["All", "Asia", "Europe", "Africa", "America"];

export const Destination=()=>{
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [favorites, setFavorites] = useState(new Set());

  const filteredDestinations = selectedRegion === "All"
    ? destinations
    : destinations.filter(dest => dest.region === selectedRegion);

  const toggleFavorite = (name) => {
    setFavorites(prev => {
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
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-indigo-100 dark:bg-black from-blue-50 via-blue-100 to-indigo-100 dark:bg-black py-12 px-4 sm:px-6 lg:px-20 overflow-x-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-indigo-200/30 rounded-full blur-3xl z-0"
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
          <Globe size={46} className="text-blue-600 dark:text-blue-400 drop-shadow-lg" />
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
          Discover breathtaking places, iconic landmarks, and hidden gems from around the world. <br />
          <span className="font-semibold text-blue-500 dark:text-blue-300">Where will your next adventure take you?</span>
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
              ${selectedRegion === region
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-2 border-blue-600 shadow-lg"
                : "bg-white/90 backdrop-blur-sm text-blue-700 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08)" 
            }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: i * 0.05 + 0.4, 
              type: "spring", 
              stiffness: 80 
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
              boxShadow: "0 20px 30px -5px rgba(0,0,0,0.13), 0 10px 10px -5px rgba(0,0,0,0.07)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition-all"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              
              {/* Favorite button */}
              <motion.button
                className={`absolute top-3 right-3 p-2 pr-4 rounded-full shadow-lg transition-all ${
                  favorites.has(destination.name) ? 'bg-red-100/80' : 'bg-white/70'
                }`}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(destination.name)}
              >
                <Heart 
                  size={20} 
                  className={favorites.has(destination.name) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
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
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{destination.name}</h2>
              <p className="text-gray-600 mb-4 italic">{destination.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="inline-block text-xs px-3 py-1 bg-blue-100 dark:bg-indigo-200 text-blue-700 rounded-full font-semibold">
                  {destination.region}
                </span>
                
                <motion.button
                  className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore <span>→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call-to-action */}
      <motion.div
        className="relative z-10 mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <p className="text-lg text-blue-700 dark:text-blue-300 font-semibold">
          🌏 Ready to add a new pin to your map? <span className="font-bold">Start planning your journey today!</span>
        </p>
      </motion.div>
    </div>
  );
};
