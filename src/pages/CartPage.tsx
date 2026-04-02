import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './CartPage.css';

export const CartPage = () => {
  const { items, total, updateItemQuantity, removeItem, isEmpty } = useCart();

  useEffect(() => {
    document.title = 'Shop - Cart';
  }, []);

  if (isEmpty) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="item-image" />

              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p className="item-price">${item.product.price.toFixed(2)}</p>
              </div>

              <div className="item-quantity">
                <button onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}>
                  −
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItemQuantity(item.product.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="item-total">
                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.product.id)}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>

          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
};
