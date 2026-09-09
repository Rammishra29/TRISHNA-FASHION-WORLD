import React from 'react';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product, size: string, color: ProductColor) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#300516]">My Wishlist</h3>
              <p className="text-xs text-stone-500">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            id="close-wishlist-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-rose-300 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-800">Your wishlist is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart icon on any saree, kurti, shirt, or cosmetic product to save your favorites!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#480922] text-[#FBF4E4] text-xs font-semibold hover:bg-[#5F0E2F] transition-all cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-3.5">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => onQuickView(product)}
                  className="w-20 h-24 object-cover object-top rounded-xl border border-stone-200 bg-stone-50 cursor-pointer shrink-0 hover:opacity-90"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 
                        onClick={() => onQuickView(product)}
                        className="text-xs font-semibold text-stone-900 truncate hover:text-[#5F0E2F] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#886725] font-medium capitalize mt-0.5">
                      {product.category} • {product.subcategory}
                    </p>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs font-bold text-[#480922]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-stone-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onMoveToCart(
                        product, 
                        product.sizes[0] || 'Free Size', 
                        product.colors[0] || { name: 'Standard', hex: '#333333' }
                      );
                      onRemoveFromWishlist(product.id);
                    }}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#DFC17D]" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-[#FAF7F2]">
            <p className="text-center text-xs text-stone-500">
              Items saved in your wishlist remain stored on your device.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
