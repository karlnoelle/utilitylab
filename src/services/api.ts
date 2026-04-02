import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, Order, CheckoutSession, Product } from '../types';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Product[]>>('/api/products');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`);
      if (!response.data.data) throw new Error('Product not found');
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw error;
    }
  },

  // Checkout
  createCheckoutSession: async (
    cartItems: Array<{ productId: string; quantity: number }>,
    customer: { email: string; name: string }
  ): Promise<CheckoutSession> => {
    try {
      const response = await apiClient.post<ApiResponse<CheckoutSession>>('/api/checkout', {
        cartItems,
        customer
      });
      if (!response.data.data) throw new Error('Failed to create checkout session');
      return response.data.data;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      throw error;
    }
  },

  // Payment
  createPaymentIntent: async (
    amount: number,
    currency: string = 'usd'
  ): Promise<{ clientSecret: string; paymentIntentId: string }> => {
    try {
      const response = await apiClient.post<
        ApiResponse<{ clientSecret: string; paymentIntentId: string }>
      >('/api/payment-intent', {
        amount,
        currency
      });
      if (!response.data.data) throw new Error('Failed to create payment intent');
      return response.data.data;
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      throw error;
    }
  },

  confirmPayment: async (
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; orderId: string }> => {
    try {
      const response = await apiClient.post<
        ApiResponse<{ success: boolean; orderId: string }>
      >('/api/payment/confirm', {
        paymentIntentId,
        paymentMethodId
      });
      if (!response.data.data) throw new Error('Failed to confirm payment');
      return response.data.data;
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw error;
    }
  },

  // Orders
  getOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await apiClient.get<ApiResponse<Order>>(`/api/orders/${orderId}`);
      if (!response.data.data) throw new Error('Order not found');
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch order ${orderId}:`, error);
      throw error;
    }
  },

  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Order[]>>('/api/orders');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  }
};

export default apiService;
