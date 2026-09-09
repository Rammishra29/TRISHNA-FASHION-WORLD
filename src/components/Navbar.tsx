import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  searchQuery,
  setSearchQuery,
  allProducts,
  onSelectProduct
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'ladies', label: "Ladies' Wear" },
    { id: 'men', label: "Men's Wear" },
    { id: 'kids', label: "Kids' Wear" },
    { id: 'cosmetics', label: 'Cosmetics' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'offers', label: 'Offers' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Scroll to corresponding section if not home
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Announcement Bar */}
      <div id="top-announcement-bar" className="bg-[#480922] text-[#F7E7C4] text-xs py-2 px-4 border-b border-[#5F0E2F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#C5A059] text-[#300516] font-bold text-[10px] uppercase tracking-wider">
              Visit Store
            </span>
            <span className="flex items-center gap-1.5 text-stone-200">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] inline shrink-0" />
              Raj Berhampur, Near College Chowk, PIN 756058, Odisha
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-stone-300">
            <a
              href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-[#5ce992] font-semibold transition-colors"
            >
              <span>WhatsApp / Call: 9556793880</span>
            </a>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              CEO: Prangyashree Acharya
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled ? 'border-stone-300/80 shadow-md py-2.5' : 'border-[#ECE3D8] py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#480922] hover:bg-[#ECE3D8] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Tagline */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-3 group select-none"
          >
            <img 
              src="/logo.jpg" 
              alt="Trisha Fashion World Logo" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm ring-2 ring-[#C5A059] group-hover:scale-105 transition-transform duration-200"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-2xl tracking-tight text-[#480922] group-hover:text-[#5F0E2F] transition-colors leading-tight">
                Trisha Fashion World
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#886725] font-semibold hidden sm:block leading-tight mt-0.5">
                Fashion & Cosmetics • Raj Berhampur
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <input
                id="desktop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sarees, kurtis, shirts, perfumes, makeup..."
                className="w-full bg-[#F7F2EC] border border-[#DFD2C3] focus:border-[#5F0E2F] focus:ring-2 focus:ring-[#5F0E2F]/15 rounded-full py-2 pl-10 pr-10 text-sm text-stone-900 placeholder:text-stone-500 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  id="clear-search-query-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 bg-stone-200/80 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Autocomplete Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2 py-1 flex justify-between items-center">
                  <span>Search Results ({searchResults.length})</span>
                  <span className="text-[11px] text-[#5F0E2F] lowercase">press escape to close</span>
                </div>
                {searchResults.length === 0 ? (
                  <div className="py-6 text-center text-sm text-stone-500">
                    No products found for "{searchQuery}". Try searching for <span className="font-semibold text-stone-700">saree</span>, <span className="font-semibold text-stone-700">kurti</span>, <span className="font-semibold text-stone-700">serum</span>, or <span className="font-semibold text-stone-700">shirt</span>.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-[#FDF9F0] rounded-xl cursor-pointer transition-colors"
                      >
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-stone-900 truncate">{prod.name}</p>
                          <p className="text-xs text-stone-500 capitalize">{prod.category} • {prod.subcategory}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-[#5F0E2F]">₹{prod.price.toLocaleString('en-IN')}</span>
                          {prod.originalPrice > prod.price && (
                            <span className="block text-[11px] text-stone-400 line-through">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 rounded-full text-stone-700 hover:bg-[#ECE3D8] transition-colors"
              aria-label="Search items"
            >
              <Search className="w-5 h-5 text-[#480922]" />
            </button>

            {/* Account Profile */}
            <button
              id="user-account-btn"
              onClick={onOpenAccount}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full text-stone-700 hover:bg-[#ECE3D8] hover:text-[#480922] transition-colors"
              title="Customer Account"
            >
              <User className="w-5 h-5 text-[#480922]" />
              <span className="hidden md:inline text-xs font-semibold text-stone-800">Account</span>
            </button>

            {/* Wishlist */}
            <button
              id="wishlist-drawer-btn"
              onClick={onOpenWishlist}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full text-stone-700 hover:bg-[#ECE3D8] hover:text-[#480922] transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 text-[#480922]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-1 sm:right-1 bg-[#886725] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden md:inline text-xs font-semibold text-stone-800 ml-1">Wishlist</span>
            </button>

            {/* Shopping Cart */}
            <button
              id="cart-drawer-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#480922] hover:bg-[#5F0E2F] text-[#FBF4E4] px-3.5 py-2 rounded-full shadow-sm hover:shadow transition-all duration-200 group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#DFC17D] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C5A059] text-[#300516] text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-[#480922]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-wide">
                {cartTotal > 0 ? `₹${cartTotal.toLocaleString('en-IN')}` : 'Cart'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Input */}
        {searchOpen && (
          <div className="lg:hidden px-4 pt-2 pb-1 border-t border-stone-200 mt-2 bg-[#F7F2EC]">
            <div className="relative">
              <input
                id="mobile-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sarees, kurtis, beauty products..."
                className="w-full bg-white border border-stone-300 rounded-full py-2 pl-9 pr-8 text-sm focus:outline-none focus:border-[#5F0E2F]"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Autocomplete Results */}
            {searchQuery.trim() !== '' && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-stone-200 p-2 max-h-60 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="p-3 text-center text-xs text-stone-500">
                    No products found for "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-2 p-2 hover:bg-stone-50 rounded-lg text-left"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-9 h-9 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-stone-900 truncate">{prod.name}</p>
                        <p className="text-[10px] text-stone-500 capitalize">{prod.subcategory}</p>
                      </div>
                      <span className="text-xs font-bold text-[#5F0E2F]">₹{prod.price}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden lg:block border-t border-[#ECE3D8]/80 mt-3 pt-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center gap-8 text-sm font-medium text-[#2C2427]">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <li key={link.id}>
                    <button
                      id={`nav-link-${link.id}`}
                      onClick={() => handleNavClick(link.id)}
                      className={`relative py-1 transition-colors hover:text-[#5F0E2F] ${
                        isActive ? 'text-[#5F0E2F] font-bold' : 'text-stone-700'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5F0E2F] to-[#C5A059] rounded-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo.jpg" 
                    alt="Trisha Fashion World Logo" 
                    className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-[#C5A059]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-[#480922] text-base leading-tight">Trisha Fashion World</h3>
                    <p className="text-[10px] text-[#886725] font-semibold">Raj Berhampur, Odisha</p>
                  </div>
                </div>
                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-stone-500 hover:bg-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-240px)]">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                      activeTab === link.id 
                        ? 'bg-[#5F0E2F] text-[#FBF4E4] shadow-sm' 
                        : 'text-stone-800 hover:bg-[#ECE3D8]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-4 border-t border-stone-200 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2 text-[#480922] font-medium">
                <MapPin className="w-4 h-4 text-[#886725]" />
                <span>Raj Berhampur, Near College Chowk, 756058</span>
              </div>
              <p className="text-[11px] text-stone-500">Store Timings: Mon-Sun 10:00 AM - 9:30 PM</p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
