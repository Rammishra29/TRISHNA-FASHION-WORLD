import React from 'react';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  onExploreAll: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onExploreAll,
}) => {
  const newArrivals = products.filter((p) => p.isNewArrival || p.isFeatured).slice(0, 8);

  return (
    <section id="new-arrivals" className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#ECE3D8] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#5F0E2F]" />
              Fresh In Store & Online
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
              New Arrivals
            </h2>
            <p className="text-sm text-stone-600">
              The latest clothing styles & cosmetic innovations just added to the Trisha Fashion World catalog.
            </p>
          </div>

          <button
            id="view-all-new-arrivals-btn"
            onClick={onExploreAll}
            className="flex items-center gap-2 text-xs font-bold text-[#480922] hover:text-[#5F0E2F] bg-white px-4 py-2.5 rounded-full border border-stone-200 shadow-2xs hover:shadow transition-all cursor-pointer group"
          >
            <span>Explore All Styles</span>
            <ArrowRight className="w-4 h-4 text-[#886725] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid or Clean Empty State */}
        {newArrivals.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#ECE3D8] shadow-xs space-y-4 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#DFC17D]/40 text-[#5F0E2F] flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-[#886725]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#300516]">
                New Catalog Coming Soon
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                No products have been published yet. Real clothing & cosmetic arrivals will be cataloged here shortly.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20Please%20share%20your%20new%20arrivals%20catalog."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold shadow-xs transition-colors"
              >
                <span>WhatsApp Catalog Inquiries: 9556793880</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
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
