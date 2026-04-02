import { create } from 'zustand';
import { CheckoutSession } from '../types';

interface CheckoutStore {
  session: CheckoutSession | null;
  loading: boolean;
  error: string | null;
  setSession: (session: CheckoutSession) => void;
  clearSession: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  session: null,
  loading: false,
  error: null,

  setSession: (session: CheckoutSession) => {
    set({ session, error: null });
  },

  clearSession: () => {
    set({ session: null, error: null });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));
