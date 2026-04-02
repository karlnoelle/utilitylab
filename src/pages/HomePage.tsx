import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductCard } from '../components/ProductCard';
import './HomePage.css';

export const HomePage = () => {
  const { allProducts } = useProducts();
  const { addItem } = useCart();

  useEffect(() => {
    document.title = 'Shop - Home';
  }, []);

  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Shop</h1>
          <p>Discover our curated collection of premium products</p>
          <a href="/products" className="cta-button">
            Shop Now
          </a>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(product) => addItem(product, 1)}
            />
          ))}
        </div>
      </section>

      <section className="benefits">
        <div className="benefit-item">
          <span className="benefit-icon">🚚</span>
          <h3>Fast Shipping</h3>
          <p>Quick and reliable delivery</p>
        </div>
        <div className="benefit-item">
          <span className="benefit-icon">🔒</span>
          <h3>Secure Payment</h3>
          <p>Powered by Stripe</p>
        </div>
        <div className="benefit-item">
          <span className="benefit-icon">↩️</span>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </section>
    </div>
  );
};
