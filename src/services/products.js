import api from './api';

export const productsService = {
  getAll: async (filters = {}) => {
    return api.get('/products', filters);
  },

  getById: async (id) => {
    return api.get(`/products/${id}`);
  },

  create: async (productData) => {
    return api.post('/products', productData);
  },

  update: async (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  delete: async (id) => {
    return api.delete(`/products/${id}`);
  }
};
