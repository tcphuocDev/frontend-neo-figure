import axios from "axios";

export const api = axios.create({
  // baseURL: "http://10.1.56.60:3009",
  baseURL: import.meta.env.VITE_API_URL,
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
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth";
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
