import React, { useState } from 'react';
import { Sparkles, ArrowUpDown, Smile, Heart } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { kidsSubcategories } from '../data/storeData';

interface KidsWearSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export const KidsWearSection: React.FC<KidsWearSectionProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All Kids Wear');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = products
    .filter((p) => p.category === 'kids')
    .filter((p) => {
      if (selectedSubcategory === 'All Kids Wear') return true;
      if (selectedSubcategory === "Boys' Clothing") {
        return p.name.toLowerCase().includes('boys') || p.subcategory.includes('Boys');
      }
      if (selectedSubcategory === "Girls' Clothing") {
        return p.name.toLowerCase().includes('girls') || p.subcategory.includes('Girls');
      }
      return p.subcategory.toLowerCase().includes(selectedSubcategory.toLowerCase()) ||
             p.name.toLowerCase().includes(selectedSubcategory.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section id="kids" className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Kids Promotional Highlight Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FFF6E5] via-[#FFF0F4] to-[#F3F9FF] border border-[#DFC17D]/50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DFC17D] text-xs font-bold text-[#886725] uppercase tracking-wider">
              <Smile className="w-3.5 h-3.5 text-[#5F0E2F]" />
              Joyful, Soft & Skin-Safe
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#300516]">
              Kids' Wear — Little Wonders Collection
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              100% breathable pure cotton linings, non-scratchy festive lehengas & sherwanis, birthday tulle frocks, and play-proof casuals.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-stone-700 shrink-0">
            <span className="flex items-center gap-1 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Itch-Free Fabrics
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Festive & Daily Fits
            </span>
          </div>
        </div>

        {/* Subcategory Navigation & Sort Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ECE3D8] pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#300516]">
                Kids' Apparel ({filteredProducts.length} Items)
              </h3>
              <p className="text-xs text-stone-500">
                Boys' & Girls' Clothing, T-Shirts, Dresses, Jeans, Traditional & Party Outfits
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ArrowUpDown className="w-4 h-4 text-stone-500" />
              <select
                id="kids-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 text-xs font-medium text-stone-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5F0E2F] cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Subcategory Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {kidsSubcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  id={`kids-filter-${sub.toLowerCase().replace(/\s+/g, '-')}`}
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
                No Kids' Wear Added Yet
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                Boys' and girls' party outfits, casual wear, and traditional sets will be available once cataloged.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20I%20want%20to%20inquire%20about%20Kids%20Collection."
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
