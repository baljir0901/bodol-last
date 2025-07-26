import axios from 'axios';

// Base URL configuration for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error responses
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      window.location.href = '/authorize';
    }
    return Promise.reject(error);
  }
);

export default api;
