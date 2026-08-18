import api from './api';

export const sellersService = {
  getAll: async (filters = {}) => {
    return api.get('/sellers', filters);
  },

  getById: async (id) => {
    return api.get(`/sellers/${id}`);
  },

  updateProfile: async (id, sellerData) => {
    return api.put(`/sellers/${id}`, sellerData);
  }
};
