import React, { useState } from 'react';
import { useEffect } from "react";
export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
  {
    question: "What is Planorama?",
    answer: "Planorama is your ultimate travel toolkit—packed with powerful planning tools to help you travel smarter, better, and beautifully."
  },
  {
    question: "How can I explore destinations?",
    answer: "Use the 'Explore Destinations 🌍' tool to filter and discover global locations with regional highlights, images, and fun emojis."
  },
  {
    question: "What is the AI Itinerary Generator?",
    answer: "It's an intelligent tool powered by GROQ AI that creates customized, day-wise travel plans based on your preferences."
  },
  {
    question: "How does the chatbot work?",
    answer: "Our Live Chatbot 🤖 assists you instantly with travel suggestions, itinerary updates, and any trip-related help you need—24/7."
  },
  {
    question: "Can I track my trip progress?",
    answer: "Yes! The Trip Countdown + Planner 📅 gives you a visual countdown and lets you jot daily notes to keep everything organized."
  },
  {
    question: "How can I manage my travel budget?",
    answer: "With the Budget Tracker 💸, you can log expenses, assign categories, and view real-time spending summaries."
  },
  {
    question: "Is there help with language while traveling?",
    answer: "Absolutely! Use the Phrasebook 🗣️ to generate useful phrases tailored to your destination and travel style."
  },
  {
    question: "Can I switch between light and dark mode?",
    answer: "Absolutely! Planorama supports both light and dark themes. You can toggle it anytime from the header."
  }
];


  useEffect(() => {
    document.title = `Faqs - Planorama`;
  });
  return (
    <div className="min-h-screen bg-Blue text-gray-800">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-teal-900 dark:text-white">FAQs</h1>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left bg-white dark:bg-indigo-100 p-4 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-teal-300"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-teal-800">{faq.question}</span>
                  
                </div>
              </button>
              {openIndex === index && (
                <div className="mt-2 bg-gray-50 dark:bg-indigo-50 p-4 rounded-lg text-gray-600 shadow-inner">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

