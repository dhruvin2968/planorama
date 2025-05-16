import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const FeaturedEvent = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-Bluee/10 to-orange-500/10">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80"
          alt="Featured event"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-Bluee mb-4">
            <span className="px-3 py-1 rounded-full bg-Bluee/20 text-md font-semibold">
              Featured Event
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-4">Rivera Cultural Festival</h3>
          <p className="text-gray-300 mb-6 font-medium max-w-2xl">
            Join us at Rivera for an exciting showcase of innovative tech demonstrations. 
            Experience our cutting-edge projects and participate in interactive workshops 
            focused on AI-powered systems and cobot integration.
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>February 20-23, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>VIT Vellore Campus</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>200+ Attendees</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <button className="bg-gradient-to-r from-Bluee to-orange-500 text-white px-8 py-3 rounded-lg hover:from-Bluee hover:to-orange-600 transition-all transform hover:scale-105">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;