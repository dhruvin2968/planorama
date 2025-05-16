import React, { useState } from 'react';
import { motion } from 'framer-motion';

const destinations = [
  {
    name: "Paris",
    country: "France",
    region: "Europe",
    emoji: "🏙️",
    description: "The City of Light and Love.",
    image: "https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg",
  },
  {
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    emoji: "🏯",
    description: "Historic temples and cherry blossoms.",
    image: "https://handluggageonly.co.uk/wp-content/uploads/2017/05/iStock-509472000.jpg",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    emoji: "🌄",
    description: "Mountains, beaches, and wildlife.",
    image: "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/05/shutterstock_47182726-e1525069554812.jpg",
  },
  {
    name: "New York",
    country: "USA",
    region: "America",
    emoji: "🗽",
    description: "Skyscrapers and city buzz.",
    image: "https://1.bp.blogspot.com/-klHXHFbBkcg/Vh_oH8aFeyI/AAAAAAAADkI/WvdVpR4LWTc/s1600/CORT-NYC-StudyUSA07.jpg",
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "America",
    emoji: "🎉",
    description: "Beaches and carnivals.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/960px-Cidade_Maravilhosa.jpg",
  },
  {
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    emoji: "🏖️",
    description: "White houses and ocean views.",
    image: "https://www.moon.com/wp-content/uploads/2020/03/Santorini.png",
  },
  {
  name: "Bali",
  country: "Indonesia",
  region: "Asia",
  emoji: "🌴",
  description: "Tropical paradise with serene beaches and temples.",
  image: "https://media-api.xogrp.com/images/0108e30b-f23f-4d5b-bacb-c13df8215c94~rs_768.h",
},
{
  name: "Venice",
  country: "Italy",
  region: "Europe",
  emoji: "🚤",
  description: "Romantic canals and timeless architecture.",
  image: "https://cdn.britannica.com/62/153462-050-3D4F41AF/Grand-Canal-Venice.jpg",
},
{
  name: "Marrakech",
  country: "Morocco",
  region: "Africa",
  emoji: "🕌",
  description: "Vibrant markets and desert vibes.",
  image: "https://www.vjv.com/media/thjldkr1/jamaa-el-fna-market-square-marrakesh-morocco_shutterstock-685174879.jpg",
},
{
  name: "Buenos Aires",
  country: "Argentina",
  region: "America",
  emoji: "💃",
  description: "Tango, steak, and Latin passion.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Puerto_Madero%2C_Buenos_Aires_%2840689219792%29_%28cropped%29.jpg/960px-Puerto_Madero%2C_Buenos_Aires_%2840689219792%29_%28cropped%29.jpg",
},
{
  name: "Sydney",
  country: "Australia",
  region: "Asia", 
  emoji: "🌉",
  description: "Iconic opera house and coastal vibes.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/330px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
},
{
  name: "Reykjavik",
  country: "Iceland",
  region: "Europe",
  emoji: "❄️",
  description: "Northern lights and geothermal spas.",
  image: "https://cdn.britannica.com/71/73371-050-9DFAEC1E/Reykjavik-Iceland.jpg",
},

];

const regions = ["All", "Asia", "Europe", "Africa", "America"];

export const Destination = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredDestinations =
    selectedRegion === "All"
      ? destinations
      : destinations.filter((dest) => dest.region === selectedRegion);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-5 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center text-blue-900 mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, delay: 0.2 }}
      >
        Explore Destinations 🌍
      </motion.h1>

      {/* Region Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {regions.map((region, i) => (
          <motion.button
            key={region}
            onClick={() => setSelectedRegion(region)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full border-2 font-medium transition-all duration-300
              ${selectedRegion === region
                ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {region}
          </motion.button>
        ))}
      </div>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest, index) => (
          <motion.div
            key={index}
            className="bg-Bluee rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 60 }}
          >
            <img
              src={`${dest.image}?sig=${index}`}
              alt={dest.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {dest.name}, {dest.country}
                </h2>
                <span className="text-2xl">{dest.emoji}</span>
              </div>
              <p className="text-gray-600 mb-3">{dest.description}</p>
              <span className="inline-block text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {dest.region}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

