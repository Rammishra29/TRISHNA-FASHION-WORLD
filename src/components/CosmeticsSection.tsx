import React, { useState } from 'react';
import { Sparkles, ArrowUpDown, Droplet, Flower2, Heart, Award } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { cosmeticsSubcategories } from '../data/storeData';

interface CosmeticsSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export const CosmeticsSection: React.FC<CosmeticsSectionProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All Beauty Products');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = products
    .filter((p) => p.category === 'cosmetics')
    .filter((p) => {
      if (selectedSubcategory === 'All Beauty Products') return true;
      return p.subcategory.toLowerCase().includes(selectedSubcategory.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section id="cosmetics" className="py-14 sm:py-18 bg-[#FCFAF7] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Beauty Luxe Promotional Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#300516] via-[#480922] to-[#79163E] text-white p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-10">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#DFC17D]/40 text-xs font-semibold text-[#F7E7C4] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC17D]" />
                Ayurvedic Glow & Modern Glamour
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FBF4E4] leading-tight">
                Cosmetics & Beauty Sanctuary
              </h2>
              <p className="text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed">
                Nourishing saffron oils, 24-hour waterproof herbal kajal, velvet transfer-proof liquid lipsticks, artisanal rose & oud perfumes, and pro brushes.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#F7E7C4]">
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                  <Droplet className="w-4 h-4 text-[#DFC17D]" />
                  <span>Cruelty-Free & Pure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
                  <Flower2 className="w-4 h-4 text-[#DFC17D]" />
                  <span>Ayurvedic Actives</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg col-span-2 sm:col-span-1">
                  <Award className="w-4 h-4 text-[#DFC17D]" />
                  <span>Dermat Tested</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DFC17D]/40 max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                  alt="Cosmetics and Skincare Showcase"
                  className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs text-stone-200">Enriched with botanical oils & saffron extract</p>
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
                Beauty & Care ({filteredProducts.length} Items)
              </h3>
              <p className="text-xs text-stone-500">
                Makeup, Skincare, Luxury Fragrances, Beauty Accessories & Daily Glamour
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ArrowUpDown className="w-4 h-4 text-stone-500" />
              <select
                id="cosmetics-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 text-xs font-medium text-stone-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5F0E2F] cursor-pointer"
              >
                <option value="featured">Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Subcategory Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {cosmeticsSubcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  id={`cosmetics-filter-${sub.toLowerCase().replace(/\s+/g, '-')}`}
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
                No Cosmetics Added Yet
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                Lipsticks, Foundations, Creams, Skincare, and Fragrance products will appear here once added to the catalog.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20I%20want%20to%20inquire%20about%20Cosmetics%20and%20Beauty%20Products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#300516] border border-[#DFC17D]/60 text-xs font-semibold transition-colors"
              >
                <span>Inquire on WhatsApp: 9556793880</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
