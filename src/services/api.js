import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000, // 15s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error or timeout
    if (!error.response) {
      console.error('❌ Network Error:', error.message);
      if (error.code === 'ECONNABORTED') {
        error.message = 'Request timeout. Please check your connection.';
      } else if (error.code === 'ERR_NETWORK') {
        error.message = 'Cannot connect to server. Please try again later.';
      }
    }

    // Handle specific status codes
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth";
    } else if (error.response?.status === 403) {
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
