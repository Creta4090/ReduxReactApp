import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Using jsonplaceholder for demo
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Could dispatch logout action here, but for simplicity, just remove token
    }
    return Promise.reject(error);
  }
);

export default api;