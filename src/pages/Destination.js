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
    <div className="min-h-screen bg-gradient-to-b dark:bg-black  py-12 px-4 sm:px-6 lg:px-20">
      <header className="text-center mb-12">
        <motion.div 
          className="mb-4 inline-flex items-center justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Globe size={46} className="text-blue-600  dark:text-blue-400" />
        </motion.div>
        
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r dark:text-blue-400 from-blue-900 via-blue-700 to-blue-900 text-transparent bg-clip-text"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Explore Destinations
        </motion.h1>
        
        <motion.p 
          className="text-blue-600 dark:text-blue-500 text-lg max-w-2xl mx-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Discover amazing places from around the world and plan your next adventure
        </motion.p>
      </header>

      <motion.div 
        className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {regions.map((region, i) => (
          <motion.button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300
              ${selectedRegion === region
                ? "bg-blue-600 text-white border-2 border-blue-600 shadow-lg"
                : "bg-white text-blue-600 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50"
              }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: i * 0.05 + 0.4, 
              type: "spring", 
              stiffness: 80 
            }}
          >
            {region}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredDestinations.map((destination, index) => (
          <motion.div 
            key={destination.name}
            className="rounded-xl overflow-hidden bg-white shadow-md relative group"
            variants={item}
            whileHover={{ 
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-60 overflow-hidden">
              <motion.img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <motion.button
                className={`absolute top-3 right-3 p-2 pr-4 rounded-full ${
                  favorites.has(destination.name) ? 'bg-red-50/80' : 'bg-white/60'
                }`}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(destination.name)}
              >
                <Heart 
                  size={20} 
                  className={favorites.has(destination.name) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                />
              </motion.button>
              
              <div className="absolute bottom-3 left-3 text-2xl">{destination.emoji}</div>
              
              <div className="absolute bottom-3 right-3 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <MapPin size={14} className="mr-1" />
                {destination.country}
              </div>
            </div>
            
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h2>
              <p className="text-gray-600 mb-3">{destination.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="inline-block text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {destination.region}
                </span>
                
                <motion.button
                  className="text-blue-600 font-medium text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore <span className="ml-1">→</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
