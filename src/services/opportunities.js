import api from './api';

export const opportunitiesService = {
  getAll: async (filters = {}) => {
    return api.get('/opportunities', filters);
  },

  getById: async (id) => {
    return api.get(`/opportunities/${id}`);
  },

  create: async (opportunityData) => {
    return api.post('/opportunities', opportunityData);
  },

  update: async (id, opportunityData) => {
    return api.put(`/opportunities/${id}`, opportunityData);
  },

  delete: async (id) => {
    return api.delete(`/opportunities/${id}`);
  }
};

export default opportunitiesService;
