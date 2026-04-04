import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000, // 15s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Add request interceptor to attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Initialize retry count
    config.retryCount = config.retryCount || 0;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors with retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Check if we should retry
    const shouldRetry =
      !config ||
      !config.retryCount ||
      config.retryCount < MAX_RETRIES;

    const isRetryableError =
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ERR_CONNECTION_REFUSED' ||
      error.code === 'ECONNABORTED' ||
      (error.response && [500, 502, 503, 504].includes(error.response.status));

    // Retry logic
    if (shouldRetry && isRetryableError && config) {
      config.retryCount = (config.retryCount || 0) + 1;

      console.warn(
        `⚠️  API call failed (attempt ${config.retryCount}/${MAX_RETRIES}), retrying...`,
        error.message
      );

      // Wait before retry with exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, RETRY_DELAY * Math.pow(1.5, config.retryCount - 1))
      );

      // Retry the request
      return api(config);
    }

    // Network error or timeout
    if (!error.response) {
      console.error('❌ Network Error:', error.message);
      if (error.code === 'ECONNABORTED') {
        error.message = 'Request timeout. Please check your connection.';
      } else if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        error.message = 'Cannot connect to server. Please check if backend is running.';
      console.error('❌ Access denied');
    } else if (error.response?.status >= 500) {
      console.error('❌ Server error:', error.response.status);
      error.message = 'Server error. Please try again later.';
    }

    return Promise.reject(error);
  }
);

// Products
export const getProducts = (params) => api.get("/products", { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const getRelatedProducts = (id, limit = 6) =>
  api.get(`/products/${id}/related`, { params: { limit } });
export const getFeaturedProducts = (limit = 6) =>
  api.get("/products/featured", { params: { limit } });
export const getHotProducts = (limit = 10) =>
  api.get("/products/hot", { params: { limit } });

// Categories
export const getCategories = () => api.get("/categories");
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const getCategoryBySlug = (slug) => api.get(`/categories/slug/${slug}`);

// Orders
export const createOrder = (orderData) => api.post("/orders", orderData);
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);
