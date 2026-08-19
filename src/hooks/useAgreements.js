import { useState, useEffect, useCallback } from 'react';
import { agreementsService } from '../services/agreements';
import { normalizeError } from '../utils/errorHandler';

/**
 * Hook reactivo para gestión de acuerdos
 */
export const useAgreements = (filters = {}) => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgreements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await agreementsService.getAll(filters);
      setAgreements(data || []);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchAgreements();
  }, [fetchAgreements]);

  const updateAgreementStatus = async (id, status) => {
    try {
      await agreementsService.updateStatus(id, status);
      await fetchAgreements();
      return { success: true };
    } catch (err) {
      const normalized = normalizeError(err);
      return { success: false, error: normalized.message };
    }
  };

  const createAgreement = async (data) => {
    try {
      const created = await agreementsService.create(data);
      await fetchAgreements();
      return { success: true, data: created };
    } catch (err) {
      const normalized = normalizeError(err);
      return { success: false, error: normalized.message };
    }
  };

  return {
    agreements,
    loading,
    error,
    refresh: fetchAgreements,
    updateAgreementStatus,
    createAgreement
  };
};

export default useAgreements;
