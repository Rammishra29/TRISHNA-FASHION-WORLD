import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Sparkles, Check, ExternalLink, ShieldAlert, MessageSquare } from 'lucide-react';
import { initialStoreInfo, initialContactInfo } from '../data/storeData';

export const StoreLocationSection: React.FC = () => {
  const [directionsOpened, setDirectionsOpened] = useState(false);

  const handleGetDirections = () => {
    // Open Google Maps search for Raj Berhampur Near College Chowk PIN 756058
    const query = encodeURIComponent('Trisha Fashion World, Near College Chowk, Raj Berhampur, 756058, Odisha, India');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="location" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#5F0E2F]" />
            Visit Our Physical Store
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
            Store Location & Directions
          </h2>
          <p className="text-sm text-stone-600">
            Come visit our modern retail store in Raj Berhampur for trial fittings, festive collections, and personalized beauty guidance.
          </p>
        </div>

        {/* Location Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map Placeholder */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#ECE3D8] shadow-md flex flex-col justify-between">
            {/* Map Visual Simulation Canvas */}
            <div className="relative h-80 sm:h-96 w-full bg-[#E5E0D8] overflow-hidden">
              
              {/* Stylized Vector Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#d8d0c4_1px,transparent_1px),linear-gradient(to_bottom,#d8d0c4_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
              
              {/* Simulated Roads & Street Grid */}
              <div className="absolute top-1/2 left-0 right-0 h-8 bg-stone-300 -translate-y-1/2 border-y-2 border-dashed border-stone-400" />
              <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-stone-300 border-x-2 border-dashed border-stone-400" />
              <div className="absolute top-0 bottom-0 left-2/3 w-6 bg-stone-200" />

              {/* Landmark Callouts on Map */}
              <div className="absolute top-8 left-6 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-stone-700 shadow-xs border border-stone-200">
                🏫 College Chowk Junction
              </div>
              <div className="absolute bottom-8 right-6 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-stone-700 shadow-xs border border-stone-200">
                📍 Raj Berhampur Main Road
              </div>

              {/* Main Store Pin on Map */}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-bounce">
                <div className="bg-[#480922] text-[#FBF4E4] px-3.5 py-1.5 rounded-full shadow-2xl border-2 border-[#C5A059] flex items-center gap-1.5 text-xs font-bold whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Trisha Fashion World</span>
                </div>
                <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-8 border-t-[#480922]" />
                <div className="w-4 h-2 bg-black/30 rounded-full blur-[2px] mt-0.5" />
              </div>

              {/* Map Footer Control Ribbon */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md flex items-center justify-between text-xs border border-stone-200">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <MapPin className="w-4 h-4 text-[#5F0E2F]" />
                  <span>GPS: Near College Chowk, PIN 756058</span>
                </div>
                <button
                  id="map-get-directions-btn"
                  onClick={handleGetDirections}
                  className="px-3 py-1.5 rounded-lg bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#DFC17D]" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            {/* In-Store Benefits Banner */}
            <div className="p-4 bg-[#FDF9F0] border-t border-[#ECE3D8] flex flex-wrap items-center justify-around gap-2 text-xs text-stone-700 font-medium">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Air-Conditioned Trial Rooms
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Personal Styling Assistance
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Easy In-Store Pickups & Exchanges
              </span>
            </div>
          </div>

          {/* Right Column: Store Information Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE3D8] shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="border-b border-[#ECE3D8] pb-4 flex items-center gap-4">
                <img 
                  src="/logo.jpg" 
                  alt="Trisha Fashion World" 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C5A059] shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#886725]">
                    Store Details
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#300516] mt-0.5">
                    Trisha Fashion World
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Clothing & Cosmetics Retail Destination
                  </p>
                </div>
              </div>

              {/* Exact Address Details */}
              <div className="space-y-3 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F7F2EC] text-[#5F0E2F] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">Address</h4>
                    <p className="font-semibold text-stone-900 mt-0.5">
                      Trisha Fashion World
                    </p>
                    <p className="text-stone-700">Raj Berhampur, Near College Chowk</p>
                    <p className="text-stone-700 font-medium">PIN: 756058</p>
                    <p className="text-stone-700">Odisha, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F7F2EC] text-[#886725] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">Store Hours</h4>
                    <p className="text-stone-900 font-medium mt-0.5">
                      Monday – Sunday: 10:00 AM – 9:30 PM
                    </p>
                    <p className="text-xs text-stone-500">Open on all 7 days & festival holidays</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F7F2EC] text-[#5F0E2F] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">CEO & Management</h4>
                    <p className="text-stone-900 font-semibold mt-0.5">
                      Prangyashree Acharya
                    </p>
                    <p className="text-xs text-stone-500">Dedicated to high standards of fashion & customer trust</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <button
                id="location-get-directions-btn"
                onClick={handleGetDirections}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Navigation className="w-4 h-4 text-[#DFC17D] group-hover:scale-110 transition-transform" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20I%20am%20visiting%20your%20store%20in%20Raj%20Berhampur."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: 9556793880</span>
                </a>
                <a
                  href="tel:+919556793880"
                  className="py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#ECE3D8] text-[#300516] border border-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5F0E2F]" />
                  <span>Call Store</span>
                </a>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-stone-500">
                  Landmark: College Chowk main junction, Raj Berhampur (PIN 756058)
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
