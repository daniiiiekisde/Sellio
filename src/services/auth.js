import api from './api';

export const authService = {
  login: async (credentials) => {
    // Prepared for future endpoint: api.post('/auth/login', credentials)
    return { success: true, user: { ...credentials, role: credentials.role || 'company' } };
  },

  register: async (userData) => {
    // Prepared for future endpoint: api.post('/auth/register', userData)
    return { success: true, user: userData };
  },

  logout: async () => {
    // Prepared for future endpoint: api.post('/auth/logout')
    localStorage.removeItem('sellio_token');
    return { success: true };
  },

  getCurrentUser: async () => {
    // Prepared for future endpoint: api.get('/auth/me')
    return null;
  }
};
