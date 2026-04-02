import { create } from 'zustand';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../utils/constants';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: SAMPLE_PRODUCTS,
  loading: false,
  error: null,

  setProducts: (products: Product[]) => {
    set({ products, error: null });
  },

  addProduct: (product: Product) => {
    set((state) => ({ products: [...state.products, product] }));
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }));
  },

  getProductById: (id: string) => {
    return get().products.find((p) => p.id === id);
  },

  getProductsByCategory: (category: string) => {
    return get().products.filter((p) => p.category === category);
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));
