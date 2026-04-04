import { api } from './api';

/**
 * Warm up API by checking health endpoint
 * Retry multiple times with exponential backoff
 * Fallback to other endpoints if /health not available
 */
export const warmupApi = async (maxRetries = 5) => {
  console.log('🔥 Warming up API connection...');

  // Try different endpoints in order
  const endpoints = [
    '/health',
    '/api/health',
    '/', // Root endpoint should always exist
  ];

  for (let i = 0; i < maxRetries; i++) {
    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        if (response.ok || response.status === 404) {
          // 404 means server is running but endpoint not found
          // That's still better than connection refused
          console.log(`✅ API connection established via ${endpoint}`);
          return true;
        }
      } catch (error) {
        // Try next endpoint
        continue;
      }
    }

    console.warn(`⚠️  Warmup attempt ${i + 1}/${maxRetries} failed on all endpoints`);

    if (i === maxRetries - 1) {
      console.error('❌ API warmup failed after all retries');
      return false;
    }

    // Exponential backoff: 1s, 2s, 4s, 8s, 16s
    const delay = 1000 * Math.pow(2, i);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return false;
};

/**
 * Enhanced API call with automatic retry on connection refused
 */
export const callApiWithRetry = async (apiFunction, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    retryOnStatuses = [500, 502, 503, 504], // Server errors
    onRetry = null,
  } = options;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await apiFunction();
      return { success: true, data: response.data };
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      const shouldRetry =
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ERR_CONNECTION_REFUSED' ||
        (error.response && retryOnStatuses.includes(error.response.status));

      if (!shouldRetry || isLastAttempt) {
        console.error(`❌ API call failed after ${attempt + 1} attempts:`, error.message);
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'API call failed'
        };
      }

      console.warn(`⚠️  Attempt ${attempt + 1} failed, retrying...`);

      if (onRetry) {
        onRetry(attempt + 1, maxRetries);
      }

      // Wait before retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(1.5, attempt)));
    }
  }
};

/**
 * Preload critical data on app start
 */
export const preloadCriticalData = async () => {
  console.log('📦 Preloading critical data...');

  try {
    // Warm up API first
    const isApiReady = await warmupApi();

    if (!isApiReady) {
      console.warn('⚠️  API warmup failed, app may be slow to load data');
      return false;
    }

    // Preload categories (usually small and needed everywhere)
    await callApiWithRetry(() => api.get('/categories'), {
      maxRetries: 2,
      retryDelay: 500,
    });

    console.log('✅ Critical data preloaded');
    return true;
  } catch (error) {
    console.error('❌ Preload failed:', error);
    return false;
  }
};
