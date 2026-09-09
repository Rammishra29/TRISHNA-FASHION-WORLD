import React, { useState } from 'react';
import { Phone, Mail, Instagram, Facebook, Send, CheckCircle2, MessageSquare, Edit3, X, Sparkles } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onUpdateContactInfo: (info: ContactInfo) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  onUpdateContactInfo,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editingInfo, setEditingInfo] = useState<ContactInfo>(contactInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ContactInfo = {
      ...editingInfo,
      phone: editingInfo.phonePlaceholder || editingInfo.phone || '+91 9556793880',
      whatsapp: editingInfo.whatsappPlaceholder || editingInfo.whatsapp || '+91 9556793880',
      phonePlaceholder: editingInfo.phonePlaceholder || '+91 9556793880',
      whatsappPlaceholder: editingInfo.whatsappPlaceholder || '+91 9556793880',
    };
    onUpdateContactInfo(updated);
    setIsEditingContact(false);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white border-t border-[#ECE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF4E4] border border-[#DFC17D]/60 text-xs font-bold text-[#886725] uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-[#5F0E2F]" />
            Get in Touch
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#300516] tracking-tight">
            Contact Trisha Fashion World
          </h2>
          <p className="text-sm text-stone-600">
            Have questions about sizes, bulk orders, festive bookings, or cosmetic consultations? Reach out to our store team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Editable Placeholders & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#300516]">
                Store Contact Directory
              </h3>
              <button
                id="edit-contact-placeholders-btn"
                onClick={() => {
                  setEditingInfo(contactInfo);
                  setIsEditingContact(true);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#886725] hover:text-[#5F0E2F] bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#DFC17D] shadow-2xs transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Contact Details</span>
              </button>
            </div>

            {/* Contact Placeholders Cards */}
            <div className="space-y-4">
              
              {/* Phone / WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE3D8] hover:border-[#C5A059] transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Phone / WhatsApp Number</h4>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Official Contact
                    </span>
                  </div>
                  <p className="text-base font-bold text-stone-900 mt-1 font-mono tracking-tight">
                    {contactInfo.phone || contactInfo.phonePlaceholder || '+91 9556793880'}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Direct Store Support & WhatsApp Orders
                  </p>
                  
                  {/* Direct Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a
                      href={`https://wa.me/${(contactInfo.whatsapp || contactInfo.whatsappPlaceholder || '9556793880').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Trisha Fashion World! I want to inquire about your clothing and cosmetics products.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${(contactInfo.phone || contactInfo.phonePlaceholder || '9556793880').replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#DFC17D]" />
                      <span>Call: 9556793880</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE3D8] hover:border-[#C5A059] transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F2EC] text-[#886725] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Email Address</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5 font-mono">
                    {contactInfo.emailPlaceholder}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">For customer inquiries & wholesale tie-ups</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE3D8] hover:border-[#C5A059] transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F2EC] text-[#B73268] flex items-center justify-center shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Instagram Handle</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5 font-mono">
                    {contactInfo.instagramPlaceholder}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Tag us in your festive fits to get featured</p>
                </div>
              </div>

              {/* Facebook */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE3D8] hover:border-[#C5A059] transition-colors flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F2EC] text-[#162947] flex items-center justify-center shrink-0 mt-0.5">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Facebook Page</h4>
                  <p className="text-sm font-semibold text-stone-900 mt-0.5 font-mono">
                    {contactInfo.facebookPlaceholder}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">Follow for daily store updates and festival drops</p>
                </div>
              </div>

            </div>

            {/* Note regarding placeholder customization */}
            <div className="p-3.5 rounded-xl bg-[#FDF9F0] border border-[#DFC17D]/60 text-[11px] text-stone-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#886725] shrink-0" />
              <span>Contact placeholders are kept editable for the store management. Click "Edit Contact Details" to configure your official phone/social URLs.</span>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#ECE3D8] shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#300516] mb-1">
              Send a Message to Store Team
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Fill in your details below and we will respond to your query promptly.
            </p>

            {submitted ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-emerald-200 shadow-sm space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Thank You, {formData.name || 'Shopper'}!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Your message has been received by Trisha Fashion World customer support team. We will get back to you via phone or email shortly.
                </p>
                <button
                  id="send-another-message-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#480922] text-[#FBF4E4] text-xs font-semibold cursor-pointer hover:bg-[#5F0E2F] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Mishra"
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#5F0E2F] focus:ring-2 focus:ring-[#5F0E2F]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#5F0E2F] focus:ring-2 focus:ring-[#5F0E2F]/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@example.com"
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#5F0E2F] focus:ring-2 focus:ring-[#5F0E2F]/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Message / Inquiry <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the clothing sizes, cosmetics requirements, festive orders, or visit inquiries..."
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#5F0E2F] focus:ring-2 focus:ring-[#5F0E2F]/15 transition-all resize-none"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Submit Message</span>
                  <Send className="w-4 h-4 text-[#DFC17D] group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Store Staff Edit Contact Modal */}
        {isEditingContact && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#300516]">
                    Configure Store Contact Info
                  </h3>
                  <p className="text-xs text-stone-500">
                    Update phone, WhatsApp, email, and social media handles.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingContact(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveContactInfo} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone / Call Number</label>
                  <input
                    type="text"
                    value={editingInfo.phonePlaceholder}
                    onChange={(e) => setEditingInfo({ ...editingInfo, phonePlaceholder: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp Support Number</label>
                  <input
                    type="text"
                    value={editingInfo.whatsappPlaceholder}
                    onChange={(e) => setEditingInfo({ ...editingInfo, whatsappPlaceholder: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Store Email Address</label>
                  <input
                    type="text"
                    value={editingInfo.emailPlaceholder}
                    onChange={(e) => setEditingInfo({ ...editingInfo, emailPlaceholder: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Instagram Handle / URL</label>
                  <input
                    type="text"
                    value={editingInfo.instagramPlaceholder}
                    onChange={(e) => setEditingInfo({ ...editingInfo, instagramPlaceholder: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Facebook Page / URL</label>
                  <input
                    type="text"
                    value={editingInfo.facebookPlaceholder}
                    onChange={(e) => setEditingInfo({ ...editingInfo, facebookPlaceholder: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#5F0E2F]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingContact(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] text-xs font-semibold shadow-sm"
                  >
                    Save Contact Info
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
