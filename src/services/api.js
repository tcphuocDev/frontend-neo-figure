import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000, // Tăng lên 30s cho VPS chậm
  headers: {
    'Content-Type': 'application/json',
  },
  // Thêm config để giữ connection alive
  httpAgent: {
    keepAlive: true,
    keepAliveMsecs: 30000, // 30s
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

// Retry configuration
const MAX_RETRIES = 5; // Tăng lên 5 lần
const RETRY_DELAY = 2000; // Tăng lên 2 giây
const RETRY_DELAY_MAX = 10000; // Max 10 giây

// Circuit Breaker để tránh spam request khi backend down
let circuitBreakerState = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
let failureCount = 0;
let lastFailureTime = null;
const FAILURE_THRESHOLD = 5;
const RECOVERY_TIMEOUT = 30000; // 30s

function checkCircuitBreaker() {
  if (circuitBreakerState === 'OPEN') {
    if (Date.now() - lastFailureTime > RECOVERY_TIMEOUT) {
      console.log('🔄 Circuit breaker HALF_OPEN - trying again...');
      circuitBreakerState = 'HALF_OPEN';
      failureCount = 0;
    } else {
      throw new Error('Service temporarily unavailable. Please try again later.');
    }
  }
}

function recordSuccess() {
  if (circuitBreakerState === 'HALF_OPEN') {
    console.log('✅ Circuit breaker CLOSED - service recovered');
    circuitBreakerState = 'CLOSED';
  }
  failureCount = 0;
}

function recordFailure() {
  failureCount++;
  lastFailureTime = Date.now();

  if (failureCount >= FAILURE_THRESHOLD && circuitBreakerState !== 'OPEN') {
    console.error('⛔ Circuit breaker OPEN - too many failures');
    circuitBreakerState = 'OPEN';
  }
}

// Add request interceptor to attach token to all requests
api.interceptors.request.use(
  (config) => {
    // Check circuit breaker before making request
    try {
      checkCircuitBreaker();
    } catch (error) {
      return Promise.reject(error);
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Initialize retry count
    config.retryCount = config.retryCount || 0;
    config.startTime = Date.now(); // Để track request time

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors with retry
api.interceptors.response.use(
  (response) => {
    // Request thành công - reset circuit breaker
    recordSuccess();

    // Log slow requests
    const duration = Date.now() - (response.config.startTime || Date.now());
    if (duration > 5000) {
      console.warn(`⚠️  Slow request: ${response.config.url} took ${duration}ms`);
    }

    return response;
  },
  async (error) => {
    const config = error.config;

    // Không retry nếu circuit breaker OPEN
    if (circuitBreakerState === 'OPEN') {
      return Promise.reject(new Error('Service temporarily unavailable'));
    }

    // Check if we should retry
    const shouldRetry =
      config &&
      config.retryCount < MAX_RETRIES;

    const isRetryableError =
      error.code === 'ERR_NETWORK' ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ERR_CONNECTION_REFUSED' ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ERR_BAD_RESPONSE' || // Empty response
      !error.response || // No response at all
      (error.response && [408, 500, 502, 503, 504].includes(error.response.status));

    // Retry logic
    if (shouldRetry && isRetryableError) {
      config.retryCount = (config.retryCount || 0) + 1;

      // Calculate delay với exponential backoff + jitter
      const exponentialDelay = Math.min(
        RETRY_DELAY * Math.pow(2, config.retryCount - 1),
        RETRY_DELAY_MAX
      );
      const jitter = Math.random() * 1000; // Random 0-1s
      const delay = exponentialDelay + jitter;

      console.warn(
        `⚠️  API call failed (${error.code || 'NO_RESPONSE'}) - attempt ${config.retryCount}/${MAX_RETRIES}`,
        `\n   URL: ${config.url}`,
        `\n   Retrying in ${Math.round(delay)}ms...`
      );

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));

      // Retry the request
      return api(config);
    }

    // Record failure cho circuit breaker
    if (isRetryableError) {
      recordFailure();
    }

    // Network error or timeout
    if (!error.response) {
      console.error('❌ Network Error:', error.message);
      if (error.code === 'ECONNABORTED') {
        error.message = 'Request timeout (30s). Server might be overloaded.';
      } else if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        error.message = 'Cannot connect to server. Backend might be down.';
      } else if (error.code === 'ERR_BAD_RESPONSE') {
        error.message = 'Server sent empty response. Backend might be restarting.';
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
    } else if (error.response?.status === 408) {
      error.message = 'Request timeout. Please try again.';
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
