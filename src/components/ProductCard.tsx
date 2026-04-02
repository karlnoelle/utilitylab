import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && <p className="product-description">{product.description}</p>}

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {onAddToCart && (
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
