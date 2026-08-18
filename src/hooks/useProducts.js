import { useState, useEffect, useCallback } from 'react';
import { productsService } from '../services/products';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsService.getAll(filters);
      setProducts(data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(initialFilters)]);

  const addProduct = async (productData) => {
    try {
      const newProd = await productsService.create(productData);
      setProducts(prev => [newProd, ...prev]);
      return newProd;
    } catch (err) {
      setError(err.message || 'Error al crear producto');
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const updated = await productsService.update(id, productData);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      setError(err.message || 'Error al actualizar producto');
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await productsService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Error al eliminar producto');
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    addProduct,
    updateProduct,
    removeProduct
  };
};

export default useProducts;
