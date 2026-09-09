import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Users, CheckCircle2 } from 'lucide-react';
import { initialStoreInfo } from '../data/storeData';

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#5F0E2F]" />
            Our Heritage & Vision
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
            About Trisha Fashion World
          </h2>
          <p className="text-sm text-stone-600">
            A premier fashion and cosmetics sanctuary rooted in Raj Berhampur, Odisha.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Story, CEO Card & Vision */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Required Introduction Block */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-[#ECE3D8] shadow-xs relative">
              <span className="text-4xl text-[#C5A059] font-serif leading-none absolute top-4 left-4 opacity-40">“</span>
              <p className="text-base sm:text-lg text-stone-800 leading-relaxed font-serif italic pl-4">
                Trisha Fashion World is a clothing and cosmetics store focused on bringing fashionable clothing and beauty products together in one convenient destination. The store aims to provide customers with stylish choices, quality products, and a welcoming shopping experience.
              </p>
            </div>

            {/* CEO Attribution Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#480922] to-[#79163E] text-[#FBF4E4] shadow-md">
              <div className="flex items-center gap-4">
                <img 
                  src="/logo.jpg" 
                  alt="Trisha Fashion World Emblem" 
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-[#DFC17D]/60 shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#DFC17D] font-bold">Store Leadership</span>
                  <h3 className="text-lg font-serif font-bold text-white leading-tight">
                    Prangyashree Acharya
                  </h3>
                  <p className="text-xs text-stone-200">
                    Chief Executive Officer (CEO), Trisha Fashion World
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#DFC17D] shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Retailer</span>
              </div>
            </div>

            {/* Brand Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#886725]" />
                <h4 className="font-bold text-xs text-stone-900">Genuine Quality</h4>
                <p className="text-[11px] text-stone-600">Authentic fabrics, skin-tested cosmetics & zero compromises.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-1">
                <HeartHandshake className="w-5 h-5 text-[#5F0E2F]" />
                <h4 className="font-bold text-xs text-stone-900">Affordable Luxury</h4>
                <p className="text-[11px] text-stone-600">Fair transparent pricing designed for all family budgets.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-1">
                <Users className="w-5 h-5 text-[#886725]" />
                <h4 className="font-bold text-xs text-stone-900">All Generations</h4>
                <p className="text-[11px] text-stone-600">Men, women, teens and kids collections in one place.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Brand Story Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Trisha Fashion World Retail Experience"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold tracking-widest uppercase text-[#DFC17D]">
                  Raj Berhampur, Odisha
                </span>
                <h4 className="font-serif text-xl font-bold text-[#FBF4E4] mt-1">
                  A Welcoming In-Store & Online Experience
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Visit us near College Chowk for personalized fashion trials, color matching & cosmetic consultations.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
