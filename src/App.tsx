import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { productsData } from './data/products';
import { initialSpecialOffers, initialContactInfo } from './data/storeData';
import { Product, CartItem, ProductColor, SpecialOffer, ContactInfo, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryCards } from './components/CategoryCards';
import { LadiesWearSection } from './components/LadiesWearSection';
import { MensWearSection } from './components/MensWearSection';
import { KidsWearSection } from './components/KidsWearSection';
import { CosmeticsSection } from './components/CosmeticsSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { AboutUsSection } from './components/AboutUsSection';
import { StoreLocationSection } from './components/StoreLocationSection';
import { ContactSection } from './components/ContactSection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Storage states with initial data
  const [products] = useState<Product[]>(productsData);
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() => {
    const saved = localStorage.getItem('tfw_special_offers');
    return saved ? JSON.parse(saved) : initialSpecialOffers;
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('tfw_contact_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.phonePlaceholder && parsed.phonePlaceholder.includes('Insert')) {
          return initialContactInfo;
        }
        return { ...initialContactInfo, ...parsed };
      } catch {
        return initialContactInfo;
      }
    }
    return initialContactInfo;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tfw_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tfw_wishlist');
    return saved ? JSON.parse(saved) : ['lad-01', 'cos-01'];
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    const saved = localStorage.getItem('tfw_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal / Drawer visibility states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [policyType, setPolicyType] = useState<PolicyType>(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('tfw_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tfw_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tfw_special_offers', JSON.stringify(specialOffers));
  }, [specialOffers]);

  useEffect(() => {
    localStorage.setItem('tfw_contact_info', JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem('tfw_orders', JSON.stringify(orders));
  }, [orders]);

  // Subtotals & Discounts
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (!appliedCoupon) {
      setDiscountAmount(0);
      return;
    }
    const code = appliedCoupon.toUpperCase();
    if (code === 'WELCOME15') {
      setDiscountAmount(Math.round(cartSubtotal * 0.15));
    } else if (code === 'FESTIVE40') {
      setDiscountAmount(Math.min(800, Math.round(cartSubtotal * 0.25)));
    } else if (code === 'FAMILYCOMBO') {
      setDiscountAmount(Math.round(cartSubtotal * 0.10));
    } else if (code === 'GLOW20') {
      setDiscountAmount(Math.round(cartSubtotal * 0.20));
    } else {
      setDiscountAmount(Math.round(cartSubtotal * 0.10)); // Default 10% for custom valid codes
    }
  }, [appliedCoupon, cartSubtotal]);

  // Cart actions
  const handleAddToCart = (product: Product, size: string, color: ProductColor, quantity: number = 1) => {
    const lineId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === lineId);
      if (existing) {
        return prev.map((item) =>
          item.id === lineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: lineId, product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const handleBuyNow = (product: Product, size: string, color: ProductColor, quantity: number = 1) => {
    handleAddToCart(product, size, color, quantity);
    if (quickViewProduct) setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    setAppliedCoupon('');
    setDiscountAmount(0);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Apply Coupon code
  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
  };

  // Select product for QuickView
  const handleSelectProduct = (product: Product) => {
    setQuickViewProduct(product);
  };

  // Category navigation jumper
  const handleSelectCategory = (categoryId: string) => {
    setActiveTab(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Order submission
  const handleOrderSuccess = (newOrder: OrderDetails) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B1D]">
      
      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItemCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allProducts={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onShopNow={() => handleSelectCategory('ladies')}
          onExploreCollections={() => handleSelectCategory('categories')}
        />

        {/* 2. Shop by Category */}
        <CategoryCards onSelectCategory={handleSelectCategory} />

        {/* 3. New Arrivals */}
        <NewArrivalsSection
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
          onQuickView={handleSelectProduct}
          onExploreAll={() => handleSelectCategory('ladies')}
        />

        {/* 4. Special Offers: "Style More, Save More" */}
        <SpecialOffersSection
          offers={specialOffers}
          onUpdateOffers={setSpecialOffers}
          onApplyCoupon={handleApplyCoupon}
        />

        {/* 5. Ladies' Wear Section */}
        <LadiesWearSection
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
          onQuickView={handleSelectProduct}
        />

        {/* 6. Men's Wear Section */}
        <MensWearSection
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
          onQuickView={handleSelectProduct}
        />

        {/* 7. Kids' Wear Section */}
        <KidsWearSection
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
          onQuickView={handleSelectProduct}
        />

        {/* 8. Cosmetics & Beauty Section */}
        <CosmeticsSection
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist}
          onQuickView={handleSelectProduct}
        />

        {/* 9. About Us Section (with CEO Prangyashree Acharya) */}
        <AboutUsSection />

        {/* 10. Store Location Section (Raj Berhampur, Near College Chowk) */}
        <StoreLocationSection />

        {/* 11. Contact Section (Form & Editable Placeholders) */}
        <ContactSection
          contactInfo={contactInfo}
          onUpdateContactInfo={setContactInfo}
        />
      </main>

      {/* Footer */}
      <Footer
        contactInfo={contactInfo}
        onNavigate={handleSelectCategory}
        onOpenPolicy={(type) => setPolicyType(type)}
      />

      {/* Modals & Slide-out Drawers */}
      
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      {/* Shopping Bag Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        couponCode={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        appliedDiscount={discountAmount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        subtotal={cartSubtotal}
        appliedDiscount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveWishlist}
        onMoveToCart={handleAddToCart}
        onQuickView={handleSelectProduct}
      />

      {/* Account / Login Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        orders={orders}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <aside aria-label="Quick Store Contact Support" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group">
        <a
          href="tel:+919556793880"
          id="floating-call-btn"
          aria-label="Call Trisha Fashion World at 9556793880"
          className="hidden sm:flex w-12 h-12 rounded-full bg-[#480922] text-[#FBF4E4] border-2 border-white items-center justify-center shadow-xl hover:bg-[#5F0E2F] hover:scale-105 transition-all cursor-pointer"
          title="Call: 9556793880"
        >
          <Phone className="w-5 h-5 text-[#DFC17D]" />
        </a>
        <a
          href="https://wa.me/919556793880?text=Hello%20Trisha%20Fashion%20World!%20I%20have%20an%20inquiry%20regarding%20products."
          id="floating-whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Trisha Fashion World at 9556793880"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all font-semibold text-xs sm:text-sm border-2 border-white cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
          <span className="hidden md:inline">WhatsApp: 9556793880</span>
          <span className="md:hidden">WhatsApp</span>
        </a>
      </aside>

      {/* Policy Modal */}
      <PolicyModal
        policyType={policyType}
        onClose={() => setPolicyType(null)}
      />

    </div>
  );
}
