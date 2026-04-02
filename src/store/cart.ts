import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product } from '../types';
import { CART_STORAGE_KEY } from '../utils/constants';

interface CartStore extends Cart {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  getItems: () => CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product: Product, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);

          let updatedItems: CartItem[];
          if (existingItem) {
            updatedItems = state.items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
          } else {
            updatedItems = [...state.items, { product, quantity }];
          }

          const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: updatedItems, total };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.product.id !== productId);
          const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: updatedItems, total };
        });
      },

      updateItemQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          const total = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          return { items: updatedItems, total };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getItems: () => {
        return get().items;
      }
    }),
    {
      name: CART_STORAGE_KEY
    }
  )
);
