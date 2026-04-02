import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Header.css';

export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Shop</span>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};
