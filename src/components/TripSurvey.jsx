import React, { useState,useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import format from "date-fns/format";

import { getAuth, onAuthStateChanged } from "firebase/auth";
export const TripSurvey = ({ setShowThemes }) => {
  const [formData, setFormData] = useState({ location: "", dates: "", theme: "" });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [userId, setUserId] = useState(null);
useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
       
      } else {
        setUserId(null);
        
      } 
    });
  }, []);
  const handleDateChange = (value) => {
    setDateRange(value);
    setFormData((prev) => ({ ...prev, dates: `${format(value[0], "yyyy-MM-dd")} to ${format(value[1], "yyyy-MM-dd")}` }));
    setShowCalendar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateItinerary = async () => {
    setError("");
    setItinerary(null);
    const { location, dates, theme } = formData;
    if(!userId)
    {
      setError("Login To Start Generating Itineraries.");
      return;
    }
    if (!location || !dates || !theme) {
      setError("Please provide all required fields.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("https://shreyanshknayak-itinerarygenerator.hf.space/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: location, dates, theme }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setItinerary(data.itinerary);
        await addDoc(collection(db, "posts"), {
          title: data.itinerary.title,
          days: data.itinerary.days,
          author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
      } else {
        setError("Failed to generate itinerary.");
      }
    } catch (err) {
      setError("Login to save this itinerary in your profile."); 
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" z-30 relative flex items-center justify-center bg-gradient-to-br rounded-2xl from-blue-100 via-white to-green-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl relative transition-all duration-300 hover:shadow-3xl">
        <button 
          onClick={() => setShowThemes(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Plan Your Dream Trip</h1>
        <p className="text-gray-600 text-center mb-8 text-lg">Tell us about your trip, and we'll craft the perfect itinerary for you!</p>
        <form className="space-y-6">
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="Destination" 
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
          <div className="relative">
            <input 
              type="text" 
              name="dates" 
              value={formData.dates} 
              readOnly 
              placeholder="Select Dates" 
              onClick={() => setShowCalendar(!showCalendar)} 
              className="w-full p-4 border-2 border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:border-blue-500 transition-colors duration-200"
            />
            {showCalendar && (
              <div className="absolute mt-2 z-50 shadow-lg rounded-lg overflow-hidden">
                <Calendar 
                  onChange={handleDateChange} 
                  selectRange={true} 
                  value={dateRange}
                />
              </div>
            )}
          </div>
          <input 
            type="text" 
            name="theme" 
            value={formData.theme} 
            onChange={handleChange} 
            placeholder="Theme (e.g., Family Vacation)" 
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
          <button 
            type="button" 
            onClick={handleGenerateItinerary} 
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold text-xl rounded-lg transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Generate Itinerary
          </button>
        </form>
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
        {itinerary && (
          <div className="mt-10 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 shadow-inner">
            <h2 className="text-4xl font-extrabold text-green-700 border-b-2 border-green-300 pb-2 mb-6">Your Itinerary</h2>
            <p className="text-gray-700 text-lg mt-4 font-medium">{itinerary.introduction}</p>
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Daily Plans</h3>
              {itinerary.days.split("*").map((line, index) => (
                <div key={index} className="mb-2">
                  {(line.startsWith("Day") || line.startsWith("Morning") || line.startsWith("Afternoon") || line.startsWith("Evening") || line.startsWith("Optional") || line.startsWith("Notes")) && <div className="mt-4"></div>}
                  {line.startsWith("Day") || line.startsWith("Theme") || line.startsWith("Overall Vibe") || line.startsWith("##") || line.startsWith("Morning") || line.startsWith("Afternoon") || line.startsWith("Evening") || line.startsWith("Optional") || line.startsWith("Notes") ? (
                    <p className="text-blue-700 text-xl font-bold font-serif">{line}</p>
                  ) : (
                    <p className="text-gray-700 text-lg font-serif">{line}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">Final Notes:</h3>
              <p className="mt-4 text-gray-600 text-lg">{itinerary.final_notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};  