export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  stock: number;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  cartItems: CartItem[];
  total: number;
  stripePaymentIntentId: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface CheckoutSession {
  sessionId: string;
  clientSecret?: string;
  customer: Customer;
  cart: Cart;
  status: 'created' | 'requires_payment_method' | 'succeeded' | 'failed';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
