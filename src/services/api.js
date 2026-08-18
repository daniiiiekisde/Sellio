/**
 * API Base Client
 * Centralizes HTTP requests and backend endpoints configuration.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getHeaders() {
    const token = localStorage.getItem('sellio_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    // Future real fetch wrapper
    return { status: 200, data: null, url: url.toString() };
  }

  async post(endpoint, data = {}) {
    return { status: 200, data, endpoint };
  }

  async put(endpoint, data = {}) {
    return { status: 200, data, endpoint };
  }

  async delete(endpoint) {
    return { status: 200, endpoint };
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
