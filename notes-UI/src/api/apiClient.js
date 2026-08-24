// API Client — sets up axios to make HTTP requests to the backend server
// Every request automatically includes the user's login token

import axios from 'axios';

// Create an axios instance with the backend server URL from .env file
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Example: http://localhost:3000/api
});

// Interceptor — runs before every request to attach the auth token
// This way we don't have to manually add the token to every API call
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Get saved token from browser
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to request header
  }
  return config;
});

export default apiClient;
