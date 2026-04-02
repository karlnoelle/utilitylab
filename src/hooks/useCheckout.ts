import { useCheckoutStore } from '../store/checkout';
import { useCart } from './useCart';
import { apiService } from '../services/api';

export const useCheckout = () => {
  const { session, loading, error, setSession, clearSession, setLoading, setError } =
    useCheckoutStore();
  const { items, total, clearCart } = useCart();

  const initializeCheckout = async (customer: { email: string; name: string }) => {
    if (items.length === 0) {
      setError('Cart is empty');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const cartItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      const checkoutSession = await apiService.createCheckoutSession(cartItems, customer);
      setSession(checkoutSession);
      return checkoutSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create checkout session';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const completeCheckout = async () => {
    try {
      clearCart();
      clearSession();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete checkout';
      setError(errorMessage);
      return false;
    }
  };

  return {
    session,
    loading,
    error,
    total,
    itemCount: items.length,
    initializeCheckout,
    completeCheckout,
    clearSession,
    setError
  };
};
