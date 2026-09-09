import { SpecialOffer, ContactInfo, StoreLocationInfo } from '../types';

export const initialStoreInfo: StoreLocationInfo = {
  storeName: 'Trisha Fashion World',
  ceoName: 'Prangyashree Acharya',
  addressLine1: 'Trisha Fashion World, Near College Chowk',
  landmark: 'Near College Chowk',
  cityStatePin: 'Raj Berhampur, PIN 756058, Odisha, India',
  fullAddress: 'Trisha Fashion World, Near College Chowk, Raj Berhampur, PIN: 756058, Odisha, India',
};

export const initialContactInfo: ContactInfo = {
  phone: '+91 9556793880',
  whatsapp: '+91 9556793880',
  phonePlaceholder: '+91 9556793880',
  whatsappPlaceholder: '+91 9556793880',
  emailPlaceholder: 'trishafashionworld@gmail.com',
  instagramPlaceholder: '@trishafashionworld_official',
  facebookPlaceholder: 'facebook.com/trishafashionworld',
  storeTimings: 'Monday – Sunday: 10:00 AM – 9:30 PM',
};

export const initialSpecialOffers: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'New Customer Welcome',
    subtitle: 'First Time Shopper Delight',
    badge: 'New Customer Offer',
    discountText: 'Flat 15% OFF on 1st Order',
    couponCode: 'WELCOME15',
    description: 'Special welcome bonus for all first-time visitors shopping online or in our Raj Berhampur store.',
    validity: 'Valid on orders above ₹999',
    bgColor: 'from-[#4A0720] to-[#79163E]',
    categoryTag: 'All Collections'
  },
  {
    id: 'offer-2',
    title: 'Grand Festive Celebration',
    subtitle: 'Traditional & Ethnic Wear Special',
    badge: 'Festival Offers',
    discountText: 'Up to 40% OFF',
    couponCode: 'FESTIVE40',
    description: 'Celebrate Indian festivities with handloom silk sarees, chikankari kurtis, and designer sherwani kurtas.',
    validity: 'Limited Time Festive Season',
    bgColor: 'from-[#2A0515] to-[#500F29]',
    categoryTag: 'Ethnic Wear'
  },
  {
    id: 'offer-3',
    title: 'Family Fashion Combo',
    subtitle: 'Buy For The Whole Family',
    badge: 'Combo Offers',
    discountText: 'Buy 3 Get 10% Extra OFF',
    couponCode: 'FAMILYCOMBO',
    description: 'Mix & match across Men’s, Ladies’ and Kids’ wear to unlock tier savings for your family shopping bag.',
    validity: 'Valid across clothing & kids collections',
    bgColor: 'from-[#1A1A1E] to-[#3B1224]',
    categoryTag: 'Family Bundle'
  },
  {
    id: 'offer-4',
    title: 'Cosmetics & Beauty Glamour Week',
    subtitle: 'Radiance & Skincare Special',
    badge: 'Special Discounts',
    discountText: 'Flat 20% OFF on Beauty Kits',
    couponCode: 'GLOW20',
    description: 'Ayurvedic saffron serums, long-stay lipsticks, kajals, and luxury EDP fragrances at premier prices.',
    validity: 'Applicable on ₹1499+ cosmetics cart',
    bgColor: 'from-[#4D0D26] to-[#8C1E4E]',
    categoryTag: 'Cosmetics & Skincare'
  },
  {
    id: 'offer-5',
    title: 'End of Season Wardrobe Refresh',
    subtitle: 'Casuals, Denims & Tops',
    badge: 'Seasonal Sale',
    discountText: 'Flat 30% to 50% OFF',
    couponCode: 'SEASONCLEAN',
    description: 'Seasonal refresh on daily wear shirts, western dresses, cotton kurtis, and denim jeans.',
    validity: 'Till stocks last',
    bgColor: 'from-[#18181B] to-[#451428]',
    categoryTag: 'Casual & Western'
  }
];

export const categoryCardsData = [
  {
    id: 'ladies',
    title: "Ladies' Fashion",
    subtitle: 'Kurtis, Sarees, Dresses, Salwar Suits & Ethnic Glamour',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    itemCount: '85+ Curated Styles',
    description: 'From royal Banarasi silks to breezy daily chikankari kurtis and party wear gowns, find every silhouette for your grace.',
    linkCategory: 'ladies'
  },
  {
    id: 'men',
    title: "Men's Fashion",
    subtitle: 'Traditional Kurtas, Formal Shirts, Denims & Chinos',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=80',
    itemCount: '60+ Modern Fits',
    description: 'Sharp formal shirts, tailored linen casuals, festive Nehru jackets, and durable stretch jeans for every gentleman.',
    linkCategory: 'men'
  },
  {
    id: 'kids',
    title: "Kids' Fashion",
    subtitle: 'Playful Colors, Festive Lehengas & Pure Cotton Comfort',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=900&q=80',
    itemCount: '45+ Joyful Outfits',
    description: 'Skin-friendly, itch-free celebration wear, birthday tulle dresses, and durable casuals for boys and girls.',
    linkCategory: 'kids'
  },
  {
    id: 'cosmetics',
    title: 'Cosmetics & Beauty',
    subtitle: 'Ayurvedic Skincare, Long-Wear Makeup & Luxury Fragrances',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    itemCount: '50+ Beauty Secrets',
    description: 'Enriched with saffron serums, waterproof kohl, velvet lipsticks, and exotic oud perfumes for effortless everyday allure.',
    linkCategory: 'cosmetics'
  }
];

export const ladiesSubcategories = [
  'All Ladies Wear',
  'Sarees',
  'Kurtis',
  'Salwar Suits',
  'Dresses',
  'Tops',
  'Leggings',
  'Ethnic Wear',
  'Casual Wear',
  'Party Wear'
];

export const mensSubcategories = [
  'All Men Wear',
  'Traditional Wear',
  'Formal Wear',
  'Casual Wear',
  'Shirts',
  'T-Shirts',
  'Jeans',
  'Trousers'
];

export const kidsSubcategories = [
  'All Kids Wear',
  "Boys' Clothing",
  "Girls' Clothing",
  'Traditional Wear',
  'Party Wear',
  'Dresses',
  'T-Shirts',
  'Casual Wear',
  'Jeans'
];

export const cosmeticsSubcategories = [
  'All Beauty Products',
  'Lipsticks',
  'Foundations',
  'Creams',
  'Skincare',
  'Makeup',
  'Fragrances',
  'Beauty Accessories',
  'Everyday Beauty Products'
];
