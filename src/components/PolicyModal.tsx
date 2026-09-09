import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'return' | null;

interface PolicyModalProps {
  policyType: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: <ShieldCheck className="w-6 h-6 text-[#5F0E2F]" />,
      body: `Trisha Fashion World values your privacy. This policy describes how we collect and safeguard your information when you visit our store website or our retail outlet in Raj Berhampur, Odisha.
      
1. Information We Collect: Name, contact phone numbers, delivery addresses, and email addresses provided during order checkout or customer service requests.
2. How We Use Data: Exclusively to fulfill orders, process payments, coordinate in-store pickups, and share store announcements.
3. Security: We do not sell, rent, or trade your personal information to any third parties. All transactional records are securely handled.`,
    },
    terms: {
      title: 'Terms & Conditions',
      icon: <FileText className="w-6 h-6 text-[#886725]" />,
      body: `Welcome to Trisha Fashion World. By browsing our catalog or placing orders, you agree to the following terms:

1. Product Authenticity: All clothing items (sarees, kurtis, men's wear, kids' wear) and cosmetics listed are authentic and quality-inspected before dispatch or handover at our Raj Berhampur store.
2. Pricing: All prices are in Indian Rupees (₹) and include applicable taxes. We reserve the right to correct any typographical pricing errors.
3. Orders & Cancellation: Orders may be cancelled prior to dispatch by contacting our customer support team.`,
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: <Truck className="w-6 h-6 text-[#5F0E2F]" />,
      body: `Trisha Fashion World ensures safe, reliable packing and prompt transit across India.

1. Free In-Store Pickup: Customers can choose "In-Store Pickup" at checkout to collect orders free of charge from our store near College Chowk, Raj Berhampur (PIN 756058).
2. Standard Home Delivery: Orders are usually processed within 24-48 hours. Delivery takes 2-5 business days across Odisha and 4-7 business days across other states in India.
3. Free Shipping: Orders above ₹1,499 qualify for Free Standard Delivery across India.`,
    },
    return: {
      title: 'Return & Exchange Policy',
      icon: <RotateCcw className="w-6 h-6 text-[#886725]" />,
      body: `We want every family member to love their fit and cosmetic purchase from Trisha Fashion World.

1. Clothing Returns/Exchanges: Clothing items with original tags and packaging can be exchanged or returned within 7 days of receipt either by courier or directly at our Raj Berhampur counter.
2. Cosmetics & Skincare: For hygiene reasons, cosmetics, perfumes, and skincare products are eligible for replacement only if received damaged, defective, or unopened.
3. Trial Rooms: Customers in and around Raj Berhampur are encouraged to utilize our physical store trial rooms for perfect sizing before purchase.`,
    }
  };

  const current = contentMap[policyType];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FAF7F2]">
              {current.icon}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#886725] uppercase tracking-widest">Trisha Fashion World Policy</span>
              <h3 className="font-serif text-xl font-bold text-[#300516]">{current.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto pr-2">
          {current.body}
        </div>

        <div className="pt-3 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#480922] text-[#FBF4E4] text-xs font-semibold hover:bg-[#5F0E2F]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
