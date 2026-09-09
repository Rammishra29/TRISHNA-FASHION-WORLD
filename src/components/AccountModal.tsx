import React, { useState } from 'react';
import { X, User, Package, MapPin, Heart, ShieldCheck, LogIn, Sparkles, Check } from 'lucide-react';
import { OrderDetails } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  wishlistCount,
  onOpenWishlist,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'login'>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: 'Prangya Patra',
    phone: '+91 94371 88920',
    email: 'prangya.customer@gmail.com',
    preferredStore: 'Raj Berhampur, Near College Chowk',
  });

  const [loginForm, setLoginForm] = useState({
    mobileOrEmail: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.mobileOrEmail) return;
    setOtpSent(true);
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab('profile');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#480922] text-[#FBF4E4] flex items-center justify-center font-serif font-bold text-base ring-2 ring-[#C5A059]/40">
              {isLoggedIn ? userInfo.name.charAt(0) : <User className="w-5 h-5 text-[#DFC17D]" />}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#886725] uppercase tracking-widest">
                Trisha Fashion World Customer
              </span>
              <h3 className="font-serif text-xl font-bold text-[#300516]">
                {isLoggedIn ? userInfo.name : 'Customer Login / Register'}
              </h3>
            </div>
          </div>

          <button
            id="close-account-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Nav */}
        <div className="flex border-b border-stone-200 mb-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#5F0E2F] text-[#5F0E2F]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-[#5F0E2F] text-[#5F0E2F]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>My Orders</span>
            <span className="bg-stone-100 px-1.5 py-0.5 rounded-full text-[10px] text-stone-600 font-bold">
              {orders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'border-[#5F0E2F] text-[#5F0E2F]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {isLoggedIn ? 'Switch Account' : 'Sign In'}
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#ECE3D8] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Account Details</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Member
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-500">Full Name:</span>
                  <p className="font-semibold text-stone-900 mt-0.5">{userInfo.name}</p>
                </div>
                <div>
                  <span className="text-stone-500">Phone Number:</span>
                  <p className="font-semibold text-stone-900 mt-0.5 font-mono">{userInfo.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-500">Email Address:</span>
                  <p className="font-semibold text-stone-900 mt-0.5">{userInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div 
                onClick={() => setActiveTab('orders')}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 hover:border-[#C5A059] cursor-pointer transition-all"
              >
                <Package className="w-5 h-5 text-[#5F0E2F] mx-auto mb-1" />
                <span className="text-lg font-serif font-bold text-stone-900">{orders.length}</span>
                <p className="text-[11px] text-stone-500">Orders Placed</p>
              </div>

              <div 
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 hover:border-[#C5A059] cursor-pointer transition-all"
              >
                <Heart className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                <span className="text-lg font-serif font-bold text-stone-900">{wishlistCount}</span>
                <p className="text-[11px] text-stone-500">Saved Wishlist Items</p>
              </div>
            </div>

            {/* Local Store Preference */}
            <div className="p-4 rounded-2xl bg-[#FDF9F0] border border-[#DFC17D]/60 flex items-start gap-3 text-xs text-stone-700">
              <MapPin className="w-4 h-4 text-[#886725] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-stone-900">Your Preferred Store Location:</p>
                <p className="text-stone-600 mt-0.5">Trisha Fashion World, Near College Chowk, Raj Berhampur, PIN 756058, Odisha</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-stone-500 space-y-2">
                <Package className="w-10 h-10 mx-auto text-stone-300" />
                <p className="text-sm font-semibold">No past orders yet</p>
                <p className="text-xs text-stone-400">Your online & in-store orders will show up here.</p>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.orderId} className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                    <div>
                      <span className="font-mono font-bold text-stone-900">{ord.orderId}</span>
                      <span className="text-stone-400 ml-2">• {ord.date}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Confirmed
                    </span>
                  </div>

                  <div className="space-y-1">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex justify-between text-stone-700">
                        <span className="truncate max-w-[240px]">{it.product.name} (x{it.quantity})</span>
                        <span className="font-semibold">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-stone-200 font-bold text-stone-900">
                    <span>Total Paid / Due</span>
                    <span className="text-[#480922]">₹{ord.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Login / Auth Tab */}
        {activeTab === 'login' && (
          <form onSubmit={otpSent ? handleVerifyLogin : handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Mobile Number or Email
              </label>
              <input
                type="text"
                required
                value={loginForm.mobileOrEmail}
                onChange={(e) => setLoginForm({ ...loginForm, mobileOrEmail: e.target.value })}
                placeholder="Enter 10-digit mobile or email"
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#5F0E2F]"
              />
            </div>

            {otpSent && (
              <div className="space-y-1.5 animate-in fade-in duration-200">
                <label className="block text-xs font-semibold text-stone-700">
                  Enter 4-Digit OTP (Demo: 1234)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={loginForm.otp}
                  onChange={(e) => setLoginForm({ ...loginForm, otp: e.target.value })}
                  placeholder="e.g. 1234"
                  className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-center tracking-widest text-stone-900 focus:outline-none focus:border-[#5F0E2F]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {otpSent ? 'Verify & Sign In' : 'Send OTP'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
