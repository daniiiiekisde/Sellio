import { useState, useEffect, useCallback } from 'react';
import { salesService } from '../services/sales';
import { normalizeError } from '../utils/errorHandler';

/**
 * Hook reactivo para gestión de ventas y congelación de snapshots
 */
export const useSales = (filters = {}) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await salesService.getAll(filters);
      setSales(data || []);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const recordSale = async (saleData) => {
    try {
      const created = await salesService.createAndConfirmSale(saleData);
      await fetchSales();
      return { success: true, data: created };
    } catch (err) {
      const normalized = normalizeError(err);
      return { success: false, error: normalized.message };
    }
  };

  const updateSaleStatus = async (id, status) => {
    try {
      await salesService.updateStatus(id, status);
      await fetchSales();
      return { success: true };
    } catch (err) {
      const normalized = normalizeError(err);
      return { success: false, error: normalized.message };
    }
  };

  return {
    sales,
    loading,
    error,
    refresh: fetchSales,
    recordSale,
    updateSaleStatus
  };
};

export default useSales;
