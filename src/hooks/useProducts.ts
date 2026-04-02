import { useEffect, useState } from 'react';
import { useProductStore } from '../store/products';
import { Product } from '../types';

export const useProducts = () => {
  const { products, loading, error, setLoading, setError } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const filterByCategory = (category: string) => {
    setFilteredProducts(products.filter((p) => p.category === category));
  };

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    setFilteredProducts(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowercaseQuery) ||
          p.description?.toLowerCase().includes(lowercaseQuery)
      )
    );
  };

  const resetFilters = () => {
    setFilteredProducts(products);
  };

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    setLoading,
    setError,
    filterByCategory,
    searchProducts,
    resetFilters
  };
};
