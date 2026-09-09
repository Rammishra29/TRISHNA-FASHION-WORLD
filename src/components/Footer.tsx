import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Heart, Sparkles, ShieldCheck, MessageSquare } from 'lucide-react';
import { ContactInfo } from '../types';
import { PolicyType } from './PolicyModal';

interface FooterProps {
  contactInfo: ContactInfo;
  onNavigate: (tabId: string) => void;
  onOpenPolicy: (type: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  onNavigate,
  onOpenPolicy,
}) => {
  return (
    <footer id="footer" className="bg-[#2A0515] text-stone-300 pt-14 pb-8 border-t border-[#4A0720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Trisha Fashion World Logo" 
                className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#C5A059]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-[#FBF4E4]">
                  Trisha Fashion World
                </h3>
                <p className="text-[10px] text-[#DFC17D] uppercase tracking-widest font-semibold">
                  Clothing & Cosmetics Store
                </p>
              </div>
            </div>

            <p className="text-sm font-serif italic text-stone-300 leading-relaxed max-w-sm">
              "Fashion and beauty for every style and every generation."
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              From handloom Banarasi silk sarees and designer kurtis to modern menswear, joyful kidswear, and Ayurvedic cosmetics — all curated with love.
            </p>

            {/* CEO Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#DFC17D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CEO: <strong>Prangyashree Acharya</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FBF4E4] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#DFC17D] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('new-arrivals')} className="hover:text-[#DFC17D] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-[#DFC17D] transition-colors">
                  Style More, Save More
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#DFC17D] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-[#DFC17D] transition-colors">
                  Store Location
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#DFC17D] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Shopping Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FBF4E4] uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('ladies')} className="hover:text-[#DFC17D] transition-colors">
                  Ladies' Wear (Sarees & Kurtis)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('men')} className="hover:text-[#DFC17D] transition-colors">
                  Men's Wear (Shirts & Traditional)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kids')} className="hover:text-[#DFC17D] transition-colors">
                  Kids' Wear (Boys & Girls)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cosmetics')} className="hover:text-[#DFC17D] transition-colors">
                  Cosmetics & Skincare
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ladies')} className="hover:text-[#DFC17D] transition-colors">
                  Party Wear & Gowns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cosmetics')} className="hover:text-[#DFC17D] transition-colors">
                  Luxury EDP Fragrances
                </button>
              </li>
            </ul>
          </div>

          {/* Store Address & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#FBF4E4] uppercase tracking-wider">
              Store Address
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFC17D] shrink-0 mt-0.5" />
                <span>
                  Trisha Fashion World<br />
                  Raj Berhampur, Near College Chowk<br />
                  PIN: 756058, Odisha, India
                </span>
              </div>

              <div className="space-y-1.5 pt-1 text-stone-300">
                <a 
                  href={`tel:${(contactInfo.phone || contactInfo.phonePlaceholder || '9556793880').replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 text-stone-300 hover:text-[#DFC17D] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DFC17D] shrink-0" />
                  <span className="font-mono text-xs font-medium">{contactInfo.phone || contactInfo.phonePlaceholder || '+91 9556793880'}</span>
                </a>

                <a 
                  href={`https://wa.me/${(contactInfo.whatsapp || contactInfo.whatsappPlaceholder || '9556793880').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Trisha Fashion World!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#1EBE5D] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] font-semibold">WhatsApp: +91 9556793880</span>
                </a>

                <div className="flex items-center gap-2 text-stone-400">
                  <Mail className="w-3.5 h-3.5 text-[#DFC17D] shrink-0" />
                  <span className="font-mono text-[11px] truncate">{contactInfo.emailPlaceholder}</span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href={`https://wa.me/${(contactInfo.whatsapp || contactInfo.whatsappPlaceholder || '9556793880').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Trisha Fashion World!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                  title="WhatsApp Support"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={`https://${contactInfo.instagramPlaceholder.replace('@', 'instagram.com/')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#300516] flex items-center justify-center transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://${contactInfo.facebookPlaceholder}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#300516] flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Policies Row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#DFC17D] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#DFC17D] transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-[#DFC17D] transition-colors"
            >
              Shipping Policy
            </button>
            <button
              onClick={() => onOpenPolicy('return')}
              className="hover:text-[#DFC17D] transition-colors"
            >
              Return Policy
            </button>
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-400">
            © {new Date().getFullYear()} Trisha Fashion World • Raj Berhampur, Odisha • All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
