/**
 * Helper function to handle API calls with better error handling
 */
export const handleApiCall = async (apiFunction, errorMessage = 'An error occurred') => {
  try {
    const response = await apiFunction();
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`❌ ${errorMessage}:`, error);

    let message = errorMessage;

    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      message = 'Cannot connect to server. Please check your internet connection.';
    } else if (error.response) {
      // Server responded with error
      message = error.response.data?.message || error.response.data?.error || message;
    } else if (error.request) {
      // Request made but no response
      message = 'No response from server. Please try again later.';
    }

    return { success: false, error: message };
  }
};

/**
 * Retry API call with exponential backoff
 */
export const retryApiCall = async (apiFunction, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await apiFunction();
      return { success: true, data: response.data };
    } catch (error) {
      console.warn(`⚠️  Attempt ${i + 1} failed:`, error.message);

      if (i === maxRetries - 1) {
        return { success: false, error: error.message };
      }

      // Exponential backoff: 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

/**
 * Check if API is reachable
 */
export const checkApiHealth = async (baseURL) => {
  try {
    const response = await fetch(`${baseURL}`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5s timeout
    });
    return response.ok;
  } catch (error) {
    console.error('❌ API health check failed:', error);
    return false;
  }
};
