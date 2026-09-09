import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Edit3, Plus, Trash2, X } from 'lucide-react';
import { SpecialOffer } from '../types';

interface SpecialOffersSectionProps {
  offers: SpecialOffer[];
  onUpdateOffers: (offers: SpecialOffer[]) => void;
  onApplyCoupon: (code: string) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  offers,
  onUpdateOffers,
  onApplyCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOffers, setEditingOffers] = useState<SpecialOffer[]>(offers);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setAppliedToast(`Coupon "${code}" applied to cart!`);
    setTimeout(() => {
      setCopiedCode(null);
      setAppliedToast(null);
    }, 2500);
  };

  const handleSaveOffers = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOffers(editingOffers);
    setIsEditing(false);
  };

  const handleUpdateField = (id: string, field: keyof SpecialOffer, value: string) => {
    setEditingOffers(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handleAddNewOffer = () => {
    const newOffer: SpecialOffer = {
      id: `offer-${Date.now()}`,
      title: 'Store Flash Discount',
      subtitle: 'Special In-Store & Online Deal',
      badge: 'Special Discounts',
      discountText: 'Special Store Offer',
      couponCode: 'TRISHA2026',
      description: 'Exclusive seasonal discount tailored by Trisha Fashion World management.',
      validity: 'Limited Time Offer',
      bgColor: 'from-[#4A0720] to-[#79163E]',
      categoryTag: 'All Items'
    };
    setEditingOffers([...editingOffers, newOffer]);
  };

  const handleDeleteOffer = (id: string) => {
    setEditingOffers(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section id="offers" className="py-14 sm:py-18 bg-gradient-to-b from-[#FAF7F2] via-[#F7F2EC] to-[#FAF7F2] border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-[#ECE3D8] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#5F0E2F]" />
              Exclusive Savings
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
              Style More, Save More
            </h2>
            <p className="text-sm text-stone-600 max-w-2xl">
              Take advantage of our curated promotions including New Customer Offers, Festival Celebrations, Combo Deals, and Seasonal Sales.
            </p>
          </div>

          {/* Store Staff Edit Discounts Button */}
          <button
            id="manage-offers-toggle-btn"
            onClick={() => {
              setEditingOffers(offers);
              setIsEditing(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#FDF9F0] text-stone-700 border border-[#DFC17D] text-xs font-semibold shadow-2xs hover:shadow transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#886725]" />
            <span>Customize Store Offers</span>
          </button>
        </div>

        {/* Applied Toast Alert */}
        {appliedToast && (
          <div className="bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between text-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{appliedToast}</span>
            </div>
            <span className="text-xs text-emerald-200">Discount updated at checkout</span>
          </div>
        )}

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              id={`offer-banner-${offer.id}`}
              className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-[#ECE3D8] flex flex-col justify-between group"
            >
              {/* Top Banner Gradient */}
              <div className={`p-6 bg-gradient-to-br ${offer.bgColor || 'from-[#480922] to-[#79163E]'} text-white relative`}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#C5A059] text-[#300516] text-[10px] font-extrabold uppercase tracking-wider">
                    {offer.badge}
                  </span>
                  <span className="text-[11px] text-stone-300">
                    {offer.categoryTag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FBF4E4] leading-tight">
                  {offer.title}
                </h3>
                <p className="text-xs text-stone-200 mt-1 font-medium">
                  {offer.subtitle}
                </p>

                {/* Main Discount Display */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-baseline justify-between">
                  <span className="text-lg sm:text-xl font-extrabold text-[#DFC17D]">
                    {offer.discountText}
                  </span>
                </div>
              </div>

              {/* Offer Body & Code Clip */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {offer.description}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between bg-[#F7F2EC] border border-dashed border-[#C5A059] p-2.5 rounded-xl">
                    <div>
                      <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Promo Code</span>
                      <span className="font-mono font-bold text-sm text-[#480922] tracking-wider">{offer.couponCode}</span>
                    </div>
                    <button
                      id={`copy-code-btn-${offer.id}`}
                      onClick={() => handleCopyCode(offer.couponCode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedCode === offer.couponCode
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4]'
                      }`}
                    >
                      {copiedCode === offer.couponCode ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#DFC17D]" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center">
                    {offer.validity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Store Manager Offer Editor */}
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#300516]">
                    Customize Special Offers & Discount Banners
                  </h3>
                  <p className="text-xs text-stone-500">
                    Store Owner / Staff portal to update promotional text, coupon codes, and festival deals.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveOffers} className="space-y-6">
                <div className="space-y-4">
                  {editingOffers.map((item, idx) => (
                    <div key={item.id} className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#886725] uppercase tracking-wider">
                          Offer #{idx + 1} • {item.badge}
                        </span>
                        {editingOffers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteOffer(item.id)}
                            className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Offer Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateField(item.id, 'title', e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#5F0E2F]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Badge Tag</label>
                          <select
                            value={item.badge}
                            onChange={(e) => handleUpdateField(item.id, 'badge', e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#5F0E2F]"
                          >
                            <option value="New Customer Offer">New Customer Offer</option>
                            <option value="Festival Offers">Festival Offers</option>
                            <option value="Combo Offers">Combo Offers</option>
                            <option value="Special Discounts">Special Discounts</option>
                            <option value="Seasonal Sale">Seasonal Sale</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Discount Headline</label>
                          <input
                            type="text"
                            value={item.discountText}
                            onChange={(e) => handleUpdateField(item.id, 'discountText', e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#5F0E2F]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Promo / Coupon Code</label>
                          <input
                            type="text"
                            value={item.couponCode}
                            onChange={(e) => handleUpdateField(item.id, 'couponCode', e.target.value.toUpperCase())}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-[#5F0E2F]"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Description</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateField(item.id, 'description', e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#5F0E2F]"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Validity Notes</label>
                          <input
                            type="text"
                            value={item.validity}
                            onChange={(e) => handleUpdateField(item.id, 'validity', e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#5F0E2F]"
                            placeholder="e.g. Valid on orders above ₹999 till Sunday"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={handleAddNewOffer}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#886725] hover:text-[#5F0E2F] px-3 py-2 rounded-lg border border-dashed border-[#C5A059]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Promo Banner</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
