import { Product } from '../types';

/**
 * =========================================================================
 * Master Product Catalog for Trisha Fashion World
 * =========================================================================
 * 
 * Instructions for adding your real products:
 * Add your product objects to the `productsData` array below.
 * 
 * Example Clothing Item Template:
 * --------------------------------
 * {
 *   id: 'prod-01',
 *   name: 'Pure Banarasi Silk Saree',
 *   category: 'ladies', // 'ladies' | 'men' | 'kids' | 'cosmetics'
 *   mainCategory: 'clothing', // 'clothing' | 'cosmetics'
 *   subcategory: 'Sarees', // e.g. 'Sarees', 'Kurtis', 'Salwar Suits', 'Shirts', 'Jeans', etc.
 *   price: 2499,
 *   originalPrice: 3999,
 *   discountPercentage: 38,
 *   rating: 4.9,
 *   reviewCount: 24,
 *   imageUrl: 'https://your-image-url.jpg',
 *   images: ['https://your-image-url.jpg'],
 *   sizes: ['Free Size', 'S', 'M', 'L', 'XL', 'XXL'],
 *   colors: [
 *     { name: 'Red', hex: '#E53E3E' },
 *     { name: 'Gold', hex: '#D69E2E' }
 *   ],
 *   description: 'Product details, fabric info, wash care, etc.',
 *   features: ['100% Pure Fabric', 'Premium Handwork', 'Comfortable Fit'],
 *   inStock: true,
 *   isNewArrival: true,
 *   isFeatured: true,
 *   tag: 'New'
 * }
 * 
 * Example Cosmetics Item Template:
 * --------------------------------
 * {
 *   id: 'cos-01',
 *   name: 'Matte Liquid Lipstick',
 *   category: 'cosmetics',
 *   mainCategory: 'cosmetics',
 *   subcategory: 'Lipsticks', // e.g. 'Lipsticks', 'Foundations', 'Creams', 'Skincare', 'Makeup'
 *   price: 499,
 *   originalPrice: 799,
 *   discountPercentage: 37,
 *   rating: 4.8,
 *   reviewCount: 18,
 *   imageUrl: 'https://your-cosmetic-image-url.jpg',
 *   images: ['https://your-cosmetic-image-url.jpg'],
 *   sizes: ['6ml Wand', '15ml', '30g', '50g'],
 *   colors: [
 *     { name: 'Ruby Red', hex: '#9B111E' },
 *     { name: 'Nude Peach', hex: '#D48C70' }
 *   ],
 *   description: '12-hour long stay matte lipstick enriched with Vitamin E.',
 *   features: ['Smudge-Proof & Transfer-Proof', 'Enriched with Vitamin E', 'Dermatologically Tested'],
 *   inStock: true,
 *   isNewArrival: true,
 *   isFeatured: true,
 *   tag: 'Best Seller'
 * }
 */

export const productsData: Product[] = [];

// Alias export for flexibility
export const products: Product[] = productsData;
