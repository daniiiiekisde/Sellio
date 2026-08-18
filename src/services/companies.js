import api from './api';

export const companiesService = {
  getAll: async (filters = {}) => {
    return api.get('/companies', filters);
  },

  getById: async (id) => {
    return api.get(`/companies/${id}`);
  },

  create: async (companyData) => {
    return api.post('/companies', companyData);
  },

  update: async (id, companyData) => {
    return api.put(`/companies/${id}`, companyData);
  }
};
