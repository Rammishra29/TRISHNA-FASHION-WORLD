import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Zap, Star, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Standard', hex: '#333333' });
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-[#ECE3D8] hover:border-[#C5A059] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-3/4 w-full bg-stone-100 overflow-hidden">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
        />

        {/* Badges & Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && (
            <span className="bg-[#480922] text-[#FBF4E4] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.tag && (
            <span className="bg-[#886725] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
              {product.tag}
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#5F0E2F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/85 text-stone-700 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex gap-2">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md hover:bg-[#300516] text-[#300516] hover:text-[#FBF4E4] text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-[#886725] capitalize">{product.subcategory}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-medium text-sm text-stone-900 line-clamp-2 hover:text-[#5F0E2F] cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-[#480922]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-[11px] font-semibold text-emerald-700">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Interactive Available Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>Size: <strong className="text-stone-800 font-semibold">{selectedSize}</strong></span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'border-[#5F0E2F] bg-[#5F0E2F] text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Available Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>Color: <strong className="text-stone-800 font-semibold">{selectedColor.name}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              {product.colors.map((clr) => (
                <button
                  key={clr.name}
                  onClick={() => setSelectedColor(clr)}
                  title={clr.name}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-transform cursor-pointer ${
                    selectedColor.name === clr.name ? 'ring-2 ring-[#5F0E2F] ring-offset-1 scale-110' : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: clr.hex }}
                >
                  {selectedColor.name === clr.name && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-[#F7F2EC] hover:bg-[#ECE3D8] text-[#480922] border-[#DFD2C3]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#886725]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            id={`buy-now-btn-${product.id}`}
            onClick={handleBuyNow}
            className="py-2 px-2.5 rounded-xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#DFC17D]" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
