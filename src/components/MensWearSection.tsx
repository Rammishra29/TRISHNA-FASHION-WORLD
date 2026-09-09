import React, { useState } from 'react';
import { Sparkles, ArrowUpDown } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { mensSubcategories } from '../data/storeData';

interface MensWearSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export const MensWearSection: React.FC<MensWearSectionProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All Men Wear');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = products
    .filter((p) => p.category === 'men')
    .filter((p) => {
      if (selectedSubcategory === 'All Men Wear') return true;
      if (selectedSubcategory === 'Shirts') {
        return p.subcategory.includes('Shirt') || p.name.includes('Shirt');
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
    <section id="men" className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Men's Showcase Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-[#ECE3D8] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Men's Wardrobe Essentials
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
              Men's Wear Collection
            </h2>
            <p className="text-sm text-stone-600">
              Discover sharp formal shirts, festive silk kurtas & Nehru jackets, stretch denim jeans, chino trousers, and comfortable casual tees.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-500" />
            <select
              id="mens-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-200 text-xs font-medium text-stone-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5F0E2F] cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Subcategory Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {mensSubcategories.map((sub) => {
            const isSelected = selectedSubcategory === sub;
            return (
              <button
                key={sub}
                id={`men-filter-${sub.toLowerCase().replace(/\s+/g, '-')}`}
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

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#ECE3D8] shadow-xs space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#DFC17D]/40 text-[#5F0E2F] flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-[#886725]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-[#300516]">
                No Men's Wear Added Yet
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                Men's shirts, kurtas, jeans, and formal wear collection will be added shortly.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20I%20want%20to%20inquire%20about%20Men's%20Apparel."
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
