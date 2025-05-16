import React, {useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import Swal from 'sweetalert2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import format from 'date-fns/format';

import { getAuth, onAuthStateChanged } from "firebase/auth";
export const SurpriseMe = () => {
  const [formData, setFormData] = useState({
    location: "",
    dates: "",
  });
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
  const [load, setLoad] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [showload, setShowload] = useState(false);
   const [userId, setUserId] = useState(null);
      
  const handleDateChange = (value) => {
    setDateRange(value);
    const formattedDates = `${format(value[0], "yyyy-MM-dd")} to ${format(value[1], "yyyy-MM-dd")}`;
    setFormData((prev) => ({ ...prev, dates: formattedDates }));
    setShowCalendar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateItinerary = async () => {
    setError("");
    setItinerary(null);
    if(!userId)
      {
        setError("Login To Start Generating Itineraries.");
        return;
      }
    const { location, dates } = formData;

    if (!location || !dates) {
      setError("Please provide all required fields.");
      return;
    }

    try {
      setLoad("Generating Your Itinerary");
      setShowload(true);
      const response = await fetch(
        "https://shreyanshknayak-itinerarygenerator.hf.space/surprise-me",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: location,
            dates: dates
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoad(null);
        setShowload(false);
        setItinerary(data.itinerary);
        const document = {
          title: data.itinerary.title,
          days: data.itinerary.days,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
        };

        try {
          await addDoc(collection(db, "posts"), document);
        } catch (error) {
          console.error("Error creating post:", error);
          Swal.fire({
            title: "Itinerary Generation Failed!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonText: 'Okay',
          });
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Something went wrong.");
      }
    } catch (err) {
      setError("Login to save this itinerary in your profile.");
    }
  };

  return (
    <div className=" z-30 rounded-3xl relative bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center p-4">
    <div className="bg-white shadow-2xl  rounded-3xl p-10 w-full max-w-2xl transition-all duration-300 hover:shadow-3xl">
    <h1 className="text-4xl font-extrabold text-blue-800 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Embark on a Mysterious Adventure</h1>
<p className="text-gray-600 text-center mb-8 text-lg">Let us whisk you away to an unexpected destination filled with wonder and excitement!</p>

      <form className="space-y-6">
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Country"
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
        
        <button
          type="button"
          onClick={handleGenerateItinerary}
          className="w-full p-0 loading-container text-xl md:font-semibold font-medium rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Itinerary
        </button>
      </form>
      {showload &&
        <div className="flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-lg text-gray-700">
            {load}<span className="animate-pulse">...</span>
          </span>
        </div>
      }
      {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
      {itinerary && (
        <div className="mt-10 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 shadow-inner">
          <h1 className="text-4xl font-extrabold text-green-700 border-b-2 border-green-300 pb-2 mb-6">Your Itinerary</h1>
          <p className="text-gray-700 text-lg mt-4 font-medium">{itinerary.introduction}</p>
          <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Daily Plans</h2>
            {itinerary.days.split("*").map((line, index) => (
              <div key={index} className="mb-2">
                {(line.startsWith("Day") || line.startsWith("Morning") || line.startsWith("Afternoon") || line.startsWith("Evening") || line.startsWith("Optional") || line.startsWith("Notes")) && <div className="mt-4"></div>}
                {line.startsWith("Day") || line.startsWith("Theme") || line.startsWith("Overall Vibe") || line.startsWith("##") || line.startsWith("Morning") || line.startsWith("Afternoon") || line.startsWith("Evening") || line.startsWith("Optional") || line.startsWith("Notes") ? (
                  <p className="text-blue-700 text-xl font-bold">{line}</p>
                ) : (
                  <p className="text-gray-700 text-lg font-serif">{line}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Final Notes:</h2>
            <p className="mt-4 text-gray-600 text-lg">{itinerary.final_notes}</p>
          </div>
        </div>
      )}
    </div>
  </div>);
};  