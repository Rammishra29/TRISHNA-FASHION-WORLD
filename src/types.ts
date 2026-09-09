export type CategoryId = 'all' | 'ladies' | 'men' | 'kids' | 'cosmetics' | 'new-arrivals' | 'offers';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string; // Product Name
  category: 'ladies' | 'men' | 'kids' | 'cosmetics'; // Specific section category
  mainCategory?: 'clothing' | 'cosmetics'; // High-level category: Clothing vs Cosmetics
  subcategory: string; // Specific type: Sarees, Kurtis, Shirts, Lipstick, Foundation, Cream, etc.
  price: number; // Current selling price in INR (₹)
  originalPrice: number; // MRP before discount
  discountPercentage?: number; // Calculated discount %
  rating: number; // Star rating out of 5
  reviewCount: number; // Number of customer ratings
  imageUrl?: string; // Single primary image URL
  images: string[]; // High-resolution product images array
  sizes: string[]; // Available sizes (e.g., S, M, L, XL, XXL for clothes; volume/weights for cosmetics)
  colors: ProductColor[]; // Available color/shade variations
  description: string; // Detailed product description
  features: string[]; // Key highlights / bullet points
  inStock: boolean; // Availability status
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  tag?: string;
}

export interface CartItem {
  id: string; // unique item line id (productId + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountText: string;
  couponCode: string;
  description: string;
  validity: string;
  bgColor: string;
  categoryTag: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  phonePlaceholder: string;
  whatsappPlaceholder: string;
  emailPlaceholder: string;
  instagramPlaceholder: string;
  facebookPlaceholder: string;
  storeTimings: string;
}

export interface StoreLocationInfo {
  storeName: string;
  ceoName: string;
  addressLine1: string;
  landmark: string;
  cityStatePin: string;
  fullAddress: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  deliveryMethod: 'home' | 'store_pickup';
  paymentMethod: 'cod' | 'upi' | 'card';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
}
