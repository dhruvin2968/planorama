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
      answer: "Planorama is an AI-powered travel planner that helps you generate personalized itineraries, manage trips, and get real-time travel insights through an interactive chatbot."
    },
    {
      question: "How do I create a travel itinerary?",
      answer: "Simply enter your destination, travel dates, and preferences, and Planorama will generate a customized itinerary for you."
    },
    {
      question: "Can I save and access my itineraries later?",
      answer: "Yes, your itineraries are stored in your account, allowing you to view and manage them anytime."
    },
    {
      question: "Does Planorama have a chatbot?",
      answer: "Yes! Planorama includes a smart chatbot that provides travel recommendations and answers your trip-related questions."
    },
    {
      question: "Is my data safe with Planorama?",
      answer: "Absolutely! We prioritize user privacy and security, ensuring your travel data remains protected."
    },
    {
      question: "Can I customize my itinerary?",
      answer: "Yes, you can edit and personalize your itinerary based on your preferences."
    },
    {
      question: "Does Planorama work on mobile devices?",
      answer: "Yes, Planorama is a fully responsive web application that works seamlessly on both desktop and mobile browsers."
    },
    {
      question: "Does Planorama support multiple languages?",
      answer: "Currently, Planorama is available in English. We plan to introduce multi-language support in the future."
    },
    {
      question: "Are there any hidden charges?",
      answer: "No, Planorama is completely free to use with no hidden fees."
    },
    {
      question: "Does Planorama support group travel planning?",
      answer: "Currently, Planorama is designed for individual travelers. Group planning features may be added in future updates."
    }
];


  useEffect(() => {
    document.title = `Faqs - Planorama`;
  });
  return (
    <div className="min-h-screen bg-Blue text-gray-800">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-teal-900">FAQs</h1>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left bg-white p-4 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-teal-300"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-teal-800">{faq.question}</span>
                  
                </div>
              </button>
              {openIndex === index && (
                <div className="mt-2 bg-gray-50 p-4 rounded-lg text-gray-600 shadow-inner">
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

