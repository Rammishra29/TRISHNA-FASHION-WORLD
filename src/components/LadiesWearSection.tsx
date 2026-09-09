import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { ladiesSubcategories } from '../data/storeData';

interface LadiesWearSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export const LadiesWearSection: React.FC<LadiesWearSectionProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All Ladies Wear');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = products
    .filter((p) => p.category === 'ladies')
    .filter((p) => {
      if (selectedSubcategory === 'All Ladies Wear') return true;
      if (selectedSubcategory === 'Ethnic Wear') {
        return ['Sarees', 'Kurtis', 'Salwar Suits', 'Ethnic Wear'].includes(p.subcategory);
      }
      if (selectedSubcategory === 'Casual Wear') {
        return ['Tops', 'Dresses', 'Leggings', 'Kurtis', 'Casual Wear'].includes(p.subcategory);
      }
      return p.subcategory.toLowerCase().includes(selectedSubcategory.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section id="ladies" className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Large Promotional Banner for Ladies' Wear */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#480922] via-[#651234] to-[#250410] text-white">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#DFC17D_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 p-6 sm:p-10 lg:p-12 gap-8">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#DFC17D]/40 text-xs font-semibold text-[#F7E7C4] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC17D]" />
                Ladies' Haute Couture & Daily Grace
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FBF4E4] leading-tight">
                Elegance in Every Drape & Stitch
              </h2>
              <p className="text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed">
                Explore handloom Banarasi silk sarees, Lucknowi chikankari anarkalis, festive salwar suits, chic dresses, tops, and comfortable leggings.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs text-[#F7E7C4]">
                <span className="bg-white/10 px-3 py-1 rounded-md">Pure Zari Sarees</span>
                <span className="bg-white/10 px-3 py-1 rounded-md">Chikankari Kurtis</span>
                <span className="bg-white/10 px-3 py-1 rounded-md">Velvet Suit Sets</span>
                <span className="bg-white/10 px-3 py-1 rounded-md">Party Gowns</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A059]/50">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                  alt="Ladies Fashion Showcase"
                  className="w-full h-64 sm:h-72 object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#DFC17D]">Trisha Fashion World</p>
                  <p className="text-sm font-serif font-semibold text-white">Festive & Bridal Collection 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategory Navigation & Sort Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECE3D8] pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#300516]">
                Ladies' Collection ({filteredProducts.length} Styles)
              </h3>
              <p className="text-xs text-stone-500">
                Sarees, Kurtis, Salwar Suits, Dresses, Tops, Leggings & Party Wear
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ArrowUpDown className="w-4 h-4 text-stone-500" />
              <select
                id="ladies-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 text-xs font-medium text-stone-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5F0E2F] cursor-pointer"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Subcategory Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ladiesSubcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  id={`ladies-filter-${sub.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#480922] text-[#FBF4E4] shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-[#FDF9F0]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#ECE3D8] shadow-xs space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#DFC17D]/40 text-[#5F0E2F] flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-[#886725]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#300516]">
                No Ladies' Wear Added Yet
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                The ladies' clothing catalog (Sarees, Kurtis, Suits, Dresses) is currently being set up. Real products will be updated soon.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20I%20want%20to%20inquire%20about%20Ladies%20Ethnic%20and%20Party%20Wear."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#300516] border border-[#DFC17D]/60 text-xs font-semibold transition-colors"
              >
                <span>Inquire on WhatsApp: 9556793880</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
