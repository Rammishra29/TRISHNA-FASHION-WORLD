import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, MapPin, Tag } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreCollections: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExploreCollections,
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] pt-4 pb-12 sm:pb-16 lg:pb-20">
      {/* Subtle Background Accent Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5F0E2F]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Brand Logo & Pill Tag */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <img 
                src="/logo.jpg" 
                alt="Trisha Fashion World Brand Emblem" 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md ring-2 ring-[#C5A059] shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 shadow-xs text-left">
                <Sparkles className="w-4 h-4 text-[#886725] shrink-0" />
                <span className="text-xs font-bold text-[#480922] uppercase tracking-wider">
                  Clothing & Cosmetics Destination • Odisha
                </span>
              </div>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#300516] tracking-tight leading-[1.15]">
              Discover Your Style at <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5F0E2F] via-[#961E4F] to-[#886725]">
                Trisha Fashion World
              </span>
            </h1>

            {/* Hero Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Fashion, beauty and everyday style for the whole family — all under one roof.
            </p>

            {/* Store & Value Proposition Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-stone-700 font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
                <Tag className="w-3.5 h-3.5 text-[#5F0E2F]" />
                Affordable Luxury
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
                <HeartHandshake className="w-3.5 h-3.5 text-[#886725]" />
                Men, Women, Teens & Kids
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#5F0E2F]" />
                Raj Berhampur Store
              </span>
            </div>

            {/* Two Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                id="hero-shop-now-btn"
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-[#DFC17D] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-collections-btn"
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#FBF4E4] text-[#480922] border-2 border-[#C5A059] font-semibold text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Collections</span>
              </button>
            </div>

            {/* Physical Store Badge */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Physical Retail Store Open at College Chowk • In-Store Fitting & Online Delivery</span>
            </div>
          </div>

          {/* Right Column: Fashion & Beauty Showcase Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Fashion Feature Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                  alt="Trisha Fashion World Indian Ethnic Wear"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#886725] text-white text-[11px] font-bold tracking-wider uppercase mb-1 w-fit">
                    Festive & Everyday Glamour
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF4E4]">
                    Handcrafted Sarees & Modern Fits
                  </h3>
                  <p className="text-xs text-stone-200 mt-1">
                    Premium fabrics, festive zari weaves, and fresh arrivals every week.
                  </p>
                </div>
              </div>

              {/* Floating Beauty & Cosmetics Highlight Pill */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200 max-w-[240px] sm:max-w-[270px]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80"
                    alt="Cosmetics & Beauty"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#C5A059]/40 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#886725] uppercase tracking-wider">Beauty Counter</span>
                    <h4 className="font-bold text-xs text-stone-900 leading-tight">Cosmetics & Skincare</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">Saffron serums & long-wear matte shades</p>
                  </div>
                </div>
              </div>

              {/* Floating Quality Guarantee Seal */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#480922] text-[#FBF4E4] rounded-2xl p-3.5 shadow-xl border border-[#C5A059] flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#DFC17D] shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#DFC17D]">Guaranteed</p>
                  <p className="text-xs font-bold leading-tight">100% Quality Assurance</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Pillars Strip */}
        <div className="mt-14 pt-8 border-t border-[#ECE3D8] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/80">
            <div className="w-10 h-10 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 flex items-center justify-center shrink-0">
              <span className="font-serif font-bold text-[#480922] text-sm">01</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Complete Family Store</h4>
              <p className="text-[11px] text-stone-500">Men, Women, Teens & Kids</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/80">
            <div className="w-10 h-10 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 flex items-center justify-center shrink-0">
              <span className="font-serif font-bold text-[#480922] text-sm">02</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Beauty & Cosmetics</h4>
              <p className="text-[11px] text-stone-500">Skincare, Makeup & Fragrances</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/80">
            <div className="w-10 h-10 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 flex items-center justify-center shrink-0">
              <span className="font-serif font-bold text-[#480922] text-sm">03</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Affordable Pricing</h4>
              <p className="text-[11px] text-stone-500">Direct Value & Honest Quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/80">
            <div className="w-10 h-10 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 flex items-center justify-center shrink-0">
              <span className="font-serif font-bold text-[#480922] text-sm">04</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Raj Berhampur Store</h4>
              <p className="text-[11px] text-stone-500">Near College Chowk, 756058</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
