import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.1.56.60:3009",
});

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
