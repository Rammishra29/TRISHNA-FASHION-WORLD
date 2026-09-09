import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Truck, Store, CreditCard, ShieldCheck, Sparkles, Printer, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  appliedDiscount: number;
  onOrderSuccess: (order: OrderDetails) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  appliedDiscount,
  onOrderSuccess,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'store_pickup'>('home');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: 'Near College Chowk, Raj Berhampur',
    pincode: '756058',
    city: 'Raj Berhampur, Odisha',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const shipping = deliveryMethod === 'store_pickup' ? 0 : (subtotal >= 1499 ? 0 : 99);
  const total = Math.max(0, subtotal - appliedDiscount + shipping);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: OrderDetails = {
      orderId: `TFW-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerInfo.name || 'Shopper',
      phone: customerInfo.phone,
      email: customerInfo.email,
      address: deliveryMethod === 'store_pickup' 
        ? 'In-Store Pickup @ Trisha Fashion World, Near College Chowk, Raj Berhampur, PIN 756058'
        : `${customerInfo.address}, ${customerInfo.city} - ${customerInfo.pincode}`,
      pincode: customerInfo.pincode,
      deliveryMethod,
      paymentMethod,
      items: [...cartItems],
      subtotal,
      discount: appliedDiscount,
      shipping,
      total,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
    onClearCart();

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-bold text-[#886725] uppercase tracking-widest">
              Trisha Fashion World Checkout
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#300516]">
              {confirmedOrder ? 'Order Confirmation' : 'Complete Your Order'}
            </h3>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed View */}
        {confirmedOrder ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Order Placed Successfully!
              </span>
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                Thank You, {confirmedOrder.customerName}!
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Order ID: <strong className="font-mono text-stone-800">{confirmedOrder.orderId}</strong> • {confirmedOrder.date}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#ECE3D8] text-left text-xs space-y-3">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="font-bold text-stone-700">Fulfillment Mode:</span>
                <span className="font-semibold text-[#480922]">
                  {confirmedOrder.deliveryMethod === 'store_pickup' 
                    ? '🏢 Self-Pickup at Raj Berhampur Store' 
                    : '🚚 Express Doorstep Delivery'}
                </span>
              </div>

              <div>
                <span className="text-stone-500 block">Delivery / Pickup Address:</span>
                <p className="font-medium text-stone-900 mt-0.5">{confirmedOrder.address}</p>
              </div>

              <div className="flex justify-between items-center border-t border-stone-200 pt-2 text-sm font-bold text-stone-900">
                <span>Total Amount to Pay:</span>
                <span className="text-[#480922] font-serif text-lg">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {confirmedOrder.deliveryMethod === 'store_pickup' && (
              <div className="p-3.5 rounded-xl bg-[#FDF9F0] border border-[#DFC17D] text-xs text-stone-700 text-left">
                <p className="font-bold text-[#300516]">Store Pickup Instructions:</p>
                <p className="mt-1">
                  Visit <strong>Trisha Fashion World, Near College Chowk, Raj Berhampur (PIN 756058)</strong> and show your Order ID <strong>{confirmedOrder.orderId}</strong> at the billing counter to collect your packed items.
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              <a
                href={`https://wa.me/919556793880?text=${encodeURIComponent(
                  `Namaste Trisha Fashion World! I have placed an order:\n- Order ID: ${confirmedOrder.orderId}\n- Customer: ${confirmedOrder.customerName}\n- Phone: ${confirmedOrder.phone}\n- Mode: ${confirmedOrder.deliveryMethod === 'store_pickup' ? 'Store Pickup (Raj Berhampur)' : 'Home Delivery'}\n- Total: ₹${confirmedOrder.total}\n\nPlease confirm my order. Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp: 9556793880</span>
              </a>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                id="finish-order-btn"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#480922] text-[#FBF4E4] text-xs font-semibold hover:bg-[#5F0E2F] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Delivery Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Select Fulfillment Method:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setDeliveryMethod('home')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                    deliveryMethod === 'home'
                      ? 'border-[#5F0E2F] bg-[#FAF7F2]'
                      : 'border-stone-200 bg-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#5F0E2F] shrink-0" />
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">Home Delivery</h5>
                    <p className="text-[11px] text-stone-500">Shipped anywhere in Odisha & India</p>
                  </div>
                </div>

                <div
                  onClick={() => setDeliveryMethod('store_pickup')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                    deliveryMethod === 'store_pickup'
                      ? 'border-[#886725] bg-[#FDF9F0]'
                      : 'border-stone-200 bg-white opacity-80 hover:opacity-100'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#886725] shrink-0" />
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">In-Store Pickup (Free)</h5>
                    <p className="text-[11px] text-stone-500">Collect at Raj Berhampur Store</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information Form */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Customer & Contact Details
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="e.g. Ramesh Acharya"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                {deliveryMethod === 'home' && (
                  <>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        placeholder="House No, Street, Landmark"
                        className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.pincode}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                        placeholder="e.g. 756058"
                        className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">City / State *</label>
                      <input
                        type="text"
                        required
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        placeholder="Raj Berhampur, Odisha"
                        className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                Payment Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#5F0E2F] bg-[#5F0E2F] text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  Cash on Delivery
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#5F0E2F] bg-[#5F0E2F] text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  UPI (GPay/PhonePe)
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#5F0E2F] bg-[#5F0E2F] text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  Cards / NetBanking
                </button>
              </div>
            </div>

            {/* Order Price Breakdown */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE3D8] text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Discount</span>
                  <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Delivery Charge</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Final Payable Amount</span>
                <span className="text-[#480922] font-serif text-base">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="confirm-place-order-btn"
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Confirm & Place Order • ₹{total.toLocaleString('en-IN')}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
