import { useState, useEffect, useCallback } from 'react';
import { requestsService } from '../services/requests';

export const useRequests = ({ companyName, sellerId } = {}) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    try {
      let data = [];
      if (companyName) {
        data = await requestsService.getByCompany(companyName);
      } else if (sellerId) {
        data = await requestsService.getBySeller(sellerId);
      } else {
        data = await requestsService.getAll();
      }
      setRequests(data || []);
    } catch (err) {
      console.error('Error loading requests:', err);
    } finally {
      setLoading(false);
    }
  }, [companyName, sellerId]);

  useEffect(() => {
    loadRequests();

    const handleUpdate = () => {
      loadRequests();
    };

    window.addEventListener('sellio_requests_updated', handleUpdate);
    return () => window.removeEventListener('sellio_requests_updated', handleUpdate);
  }, [loadRequests]);

  const sendInterest = async (requestData) => {
    const res = await requestsService.create(requestData);
    await loadRequests();
    return res;
  };

  const updateStatus = async (id, status) => {
    const res = await requestsService.updateStatus(id, status);
    await loadRequests();
    return res;
  };

  return {
    requests,
    loading,
    sendInterest,
    updateStatus,
    refetch: loadRequests
  };
};

export default useRequests;
