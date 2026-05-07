import axios from 'axios';
import { logger } from './logger';

const API_TIMEOUT = 30000;

const apiClient = axios.create({
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    logger.debug('API Request:', { method: config.method, url: config.url });
    return config;
  },
  (error) => {
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    logger.debug('API Response:', { status: response.status, url: response.config.url });
    return response;
  },
  (error) => {
    if (error.response) {
      logger.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
      });

      // Handle specific error codes
      if (error.response.status === 401) {
        // Unauthorized - redirect to login
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Forbidden
        logger.warn('Access forbidden');
      }
    } else if (error.request) {
      logger.error('No API response received:', error.message);
    } else {
      logger.error('API Client error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
