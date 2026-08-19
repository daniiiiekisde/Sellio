import { useState, useEffect, useCallback } from 'react';
import { commissionService } from '../services/commissionService';
import { normalizeError } from '../utils/errorHandler';

/**
 * Hook reactivo para comisiones de Comercial o Empresa
 */
export const useCommissions = (userId, role = 'seller') => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCommissions = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      let data;
      if (role === 'company') {
        data = await commissionService.getCompanySummary(userId);
      } else {
        data = await commissionService.getSellerSummary(userId);
      }
      setSummary(data);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }, [userId, role]);

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions]);

  const updateCommissionStatus = async (transactionId, newStatus) => {
    try {
      await commissionService.updateStatus(transactionId, newStatus);
      await fetchCommissions();
      return { success: true };
    } catch (err) {
      const normalized = normalizeError(err);
      return { success: false, error: normalized.message };
    }
  };

  return {
    summary,
    transactions: summary?.transactions || [],
    loading,
    error,
    refresh: fetchCommissions,
    updateCommissionStatus
  };
};

export default useCommissions;
