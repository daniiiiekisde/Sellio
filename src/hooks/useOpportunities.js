import { useState, useEffect, useCallback } from 'react';
import { opportunitiesService } from '../services/opportunities';

export const useOpportunities = (initialFilters = {}) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOpportunities = useCallback(async (filters = initialFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await opportunitiesService.getAll(filters);
      setOpportunities(data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar oportunidades');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(initialFilters)]);

  const addOpportunity = async (oppData) => {
    try {
      const newOpp = await opportunitiesService.create(oppData);
      setOpportunities(prev => [newOpp, ...prev]);
      return newOpp;
    } catch (err) {
      setError(err.message || 'Error al crear oportunidad');
      throw err;
    }
  };

  const updateOpportunity = async (id, oppData) => {
    try {
      const updated = await opportunitiesService.update(id, oppData);
      setOpportunities(prev => prev.map(o => (o.id === id ? updated : o)));
      return updated;
    } catch (err) {
      setError(err.message || 'Error al actualizar oportunidad');
      throw err;
    }
  };

  const removeOpportunity = async (id) => {
    try {
      await opportunitiesService.delete(id);
      setOpportunities(prev => prev.filter(o => o.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Error al eliminar oportunidad');
      throw err;
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  return {
    opportunities,
    loading,
    error,
    refetch: fetchOpportunities,
    addOpportunity,
    updateOpportunity,
    removeOpportunity
  };
};

export default useOpportunities;
