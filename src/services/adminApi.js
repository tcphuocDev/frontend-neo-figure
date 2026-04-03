import { api } from './api';

// Admin API endpoints
const adminApi = {
  // Products
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),

  // Categories
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),

  // Orders
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}`, { status }),
  deleteOrder: (id) => api.delete(`/orders/${id}`),

  // Users
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),

  // Upload
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Crawler
  runCrawler: (pages) => api.get(`/crawler/run?pages=${pages}`),
  crawlAll: () => api.get('/crawler/danfigure'),

  // Reports
  getDashboardStats: () => api.get('/reports/dashboard'),
  getRevenue: (period = '7d') => api.get(`/reports/revenue?period=${period}`),
  getOrdersStats: (period = '7d') => api.get(`/reports/orders-stats?period=${period}`),
  getTopProducts: (limit = 10) => api.get(`/reports/top-products?limit=${limit}`),
};

// Agent API endpoints
const agentApi = {
  // Shopping Assistant
  chat: (sessionId, message, userId) =>
    api
      .post('/agents/shopping-assistant/chat', {
        sessionId,
        message,
        userId,
      })
      .then((res) => res.data),

  getConversation: (sessionId) =>
    api.get(`/agents/shopping-assistant/conversation/${sessionId}`).then((res) => res.data),

  clearConversation: (sessionId) =>
    api.post(`/agents/shopping-assistant/conversation/${sessionId}/clear`).then((res) => res.data),

  getFAQ: () => api.get('/agents/shopping-assistant/faq').then((res) => res.data),

  // Product Discovery
  intelligentSearch: (query, limit = 12) =>
    api.post('/agents/product-discovery/search', { query, limit }).then((res) => res.data),

  autocomplete: (query, limit = 5) =>
    api
      .get(`/agents/product-discovery/autocomplete?q=${query}&limit=${limit}`)
      .then((res) => res.data),

  getTrendingSearches: () => api.get('/agents/product-discovery/trending').then((res) => res.data),

  getSimilarSearches: (productId) =>
    api.get(`/agents/product-discovery/similar/${productId}`).then((res) => res.data),

  // Data Enrichment
  enrichProduct: (productId) =>
    api.post(`/agents/data-enrichment/enrich/${productId}`).then((res) => res.data),

  applyEnrichment: (productId, changes) =>
    api
      .post(`/agents/data-enrichment/enrich/${productId}/apply`, { changes })
      .then((res) => res.data),

  batchEnrich: (limit = 50) =>
    api.post('/agents/data-enrichment/batch', { limit }).then((res) => res.data),

  validateProduct: (productId) =>
    api.get(`/agents/data-enrichment/validate/${productId}`).then((res) => res.data),

  // Content Generation
  generateContent: (productId, type) => {
    const endpoints = {
      description: `/agents/content-generation/description/${productId}`,
      'short-description': `/agents/content-generation/short-description/${productId}`,
      seo: `/agents/content-generation/seo/${productId}`,
      email: `/agents/content-generation/email/${productId}`,
    };

    const endpoint = endpoints[type] || endpoints.description;
    return api.post(endpoint).then((res) => res.data);
  },

  generateSocialContent: (productId, platform) =>
    api
      .post(`/agents/content-generation/social/${productId}`, { platform })
      .then((res) => res.data),
};

export { adminApi, agentApi };
