import { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductCard } from '../components/ProductCard';
import './ProductsPage.css';

export const ProductsPage = () => {
  const { products, searchProducts, filterByCategory, resetFilters } = useProducts();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Shop - Products';
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort();

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      resetFilters();
    } else {
      setSelectedCategory(category);
      filterByCategory(category);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      searchProducts(searchQuery);
    } else {
      resetFilters();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    resetFilters();
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <div className="products-container">
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>Search</h3>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          <div className="filter-group">
            <h3>Categories</h3>
            <div className="categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            {selectedCategory && (
              <button onClick={handleClearSearch} className="clear-filters">
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => addItem(product, 1)}
              />
            ))
          ) : (
            <p className="no-products">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};
