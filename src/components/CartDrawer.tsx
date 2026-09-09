import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  couponCode: string;
  onApplyCoupon: (code: string) => void;
  appliedDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  couponCode,
  onApplyCoupon,
  appliedDiscount,
}) => {
  if (!isOpen) return null;

  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1499;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - appliedDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    onApplyCoupon(inputCoupon.trim());
    setCouponMsg(`Promo code "${inputCoupon.toUpperCase()}" processed`);
    setTimeout(() => setCouponMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#480922] text-[#FBF4E4] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#DFC17D]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#300516]">Shopping Bag</h3>
              <p className="text-xs text-stone-500">{cartItems.length} unique item{cartItems.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#FDF9F0] border-b border-[#DFC17D]/40 text-xs">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>You unlocked FREE Home Delivery & Express Packing!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-stone-700 font-medium">
                <span>Add <strong>₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for Free Shipping</span>
                <span>{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#886725] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item Lines */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-stone-300 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our festive sarees, shirts, kidswear, and herbal cosmetics to begin styling!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#480922] text-[#FBF4E4] text-xs font-semibold hover:bg-[#5F0E2F] transition-all cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-18 h-22 object-cover object-top rounded-xl border border-stone-200 bg-stone-50 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-stone-900 truncate leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                        Size: {item.selectedSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold text-stone-900 bg-white min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#480922]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF7F2] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter Coupon (e.g. WELCOME15)"
                  className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs uppercase font-mono text-stone-900 placeholder:normal-case focus:outline-none focus:border-[#5F0E2F]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p className="text-[11px] text-emerald-700 font-medium -mt-2">{couponMsg}</p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Discount</span>
                  <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-700 uppercase font-bold text-[10px]">Free</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="text-[#480922] font-serif text-lg font-bold">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#DFC17D] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>In-Store Pickup Available at Raj Berhampur or Pan-India Delivery</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
