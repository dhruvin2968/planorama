import React, { useState } from "react";
import BgImg from "./BgImg";
import { TripSurvey } from "./TripSurvey";
import { SurpriseMe } from "./SurpriseMe";

export const ThemeSelector = () => {
  const [showThemes, setShowThemes] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <BgImg />
      {!showThemes && !showSurprise && (
        <div className="absolute flex flex-col items-center justify-center z-10 text-center">
          <h1 className="text-6xl font-black mb-10 text-white">
            What's your mood?
          </h1>
          <div className="space-y-6">
            <button
              onClick={() => setShowThemes(true)}
              className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 shadow-2xl text-black text-4xl font-bold py-4 px-8 rounded-full transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:text-white focus:outline-none focus:ring-4 focus:ring-lime-300"
            >
              Plan a Trip
            </button>
            <button
              onClick={() => setShowSurprise(true)}
              className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 text-black text-4xl font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-110 hover:shadow-2xl hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Surprise me
            </button>
          </div>
        </div>
      )}

      {showThemes && <TripSurvey setShowThemes={setShowThemes} />}
      {showSurprise && (
        <SurpriseMe show={showSurprise} setShow={setShowSurprise} />
      )}
    </div>
  );
};
