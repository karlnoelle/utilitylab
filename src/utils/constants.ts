export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'electronics',
    stock: 25,
    sku: 'WH-001'
  },
  {
    id: '2',
    name: 'Stainless Steel Water Bottle',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7711605dc575?w=500&h=500&fit=crop',
    description: 'Eco-friendly insulated water bottle keeps drinks cold for 24 hours',
    category: 'lifestyle',
    stock: 50,
    sku: 'WB-002'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    description: 'Comfortable 100% organic cotton t-shirt',
    category: 'apparel',
    stock: 100,
    sku: 'TS-003'
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
    description: 'Modern LED desk lamp with adjustable brightness',
    category: 'home',
    stock: 15,
    sku: 'DL-004'
  },
  {
    id: '5',
    name: 'Portable Phone Charger',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    description: '20000mAh portable power bank with fast charging',
    category: 'electronics',
    stock: 40,
    sku: 'PC-005'
  }
];

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  CHECKOUT: '/api/checkout',
  PAYMENT_INTENT: '/api/payment-intent',
  PAYMENT_CONFIRM: '/api/payment/confirm'
};

export const STRIPE_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder',
  CURRENCY: 'usd',
  LOCALE: 'auto'
};

export const CART_STORAGE_KEY = 'ecommerce_cart';
export const SESSION_STORAGE_KEY = 'checkout_session';
