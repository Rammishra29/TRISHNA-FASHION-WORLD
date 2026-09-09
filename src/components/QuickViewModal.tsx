import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw, Check, MessageSquare } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Standard', hex: '#333333' });
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8">
        
        {/* Close Button */}
        <button
          id="close-quick-view-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 shadow-md transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-[#FAF7F2] flex flex-col justify-between space-y-4">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-stone-100 border border-[#ECE3D8]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.discountPercentage && (
                <span className="absolute top-3 left-3 bg-[#480922] text-[#FBF4E4] text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#5F0E2F] ring-2 ring-[#5F0E2F]/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              {/* Category and Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#886725]">
                  {product.category} • {product.subcategory}
                </span>
                <div className="flex items-center gap-1 text-amber-600 font-semibold text-xs bg-amber-50 px-2.5 py-1 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#300516] leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 py-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#480922]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 py-2 border-y border-stone-100">
                  <span className="text-xs font-bold text-stone-800">Highlights & Craftsmanship:</span>
                  <ul className="text-xs text-stone-600 space-y-1">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-800">Select Size:</span>
                    <span className="text-[#886725] font-semibold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'border-[#5F0E2F] bg-[#5F0E2F] text-white shadow-xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-800">Select Color:</span>
                    <span className="text-[#886725] font-semibold">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((clr) => (
                      <button
                        key={clr.name}
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-medium cursor-pointer transition-all ${
                          selectedColor.name === clr.name
                            ? 'border-[#5F0E2F] ring-1 ring-[#5F0E2F] bg-[#FAF7F2]'
                            : 'border-stone-200 bg-white text-stone-600'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs" style={{ backgroundColor: clr.hex }} />
                        <span>{clr.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-800">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold text-stone-600 hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-stone-900 bg-white min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold text-stone-600 hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-[#FAF7F2] hover:bg-[#ECE3D8] text-[#480922] border-[#DFD2C3]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#886725]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 rounded-2xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#DFC17D]" />
                  <span>Buy Now • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </button>
              </div>

              {/* WhatsApp direct order inquiry */}
              <a
                href={`https://wa.me/919556793880?text=${encodeURIComponent(
                  `Hello Trisha Fashion World! I want to order/inquire about:\n- Product: ${product.name}\n- Price: ₹${product.price}\n- Size: ${selectedSize}\n${selectedColor ? `- Color: ${selectedColor.name}\n` : ''}- Quantity: ${quantity}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp: +91 9556793880</span>
              </a>

              {/* Wishlist Toggle Button */}
              <button
                id="modal-toggle-wishlist-btn"
                onClick={() => onToggleWishlist(product)}
                className="w-full py-2 text-xs font-semibold text-stone-600 hover:text-rose-600 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                <span>{isWishlisted ? 'Saved in your Wishlist' : 'Add to Wishlist for later'}</span>
              </button>

              {/* Delivery info & store pickup badge */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#480922]">
                  <Truck className="w-3.5 h-3.5 text-[#886725]" />
                  <span>Available for In-Store Pickup in Raj Berhampur or Pan-India Delivery</span>
                </div>
                <p className="text-stone-500">Free store pickup at Near College Chowk PIN 756058.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
