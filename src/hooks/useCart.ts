import { useCartStore } from '../store/cart';

export const useCart = () => {
  const { items, total, addItem, removeItem, updateItemQuantity, clearCart, getItemCount, getTotal } =
    useCartStore();

  return {
    items,
    total,
    itemCount: getItemCount(),
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getItemCount,
    getTotal,
    isEmpty: items.length === 0
  };
};
