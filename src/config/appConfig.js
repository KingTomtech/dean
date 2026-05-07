/**
 * Configuration file for application settings
 * Environment-specific values should be in .env files
 */

export const appConfig = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Rapid Stores',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_APP_ENV || 'development',
  },

  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },

  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  },

  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    errorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
  },

  social: {
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '260776885851',
    facebookUrl: import.meta.env.VITE_FACEBOOK_URL,
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL,
  },

  payment: {
    provider: import.meta.env.VITE_PAYMENT_PROVIDER || 'mtn-momo',
  },

  storage: {
    bucketName: import.meta.env.VITE_STORAGE_BUCKET_NAME || 'uploads',
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '5242880'),
  },

  debug: {
    mode: import.meta.env.VITE_DEBUG_MODE === 'true',
  },

  isDevelopment: import.meta.env.VITE_APP_ENV === 'development',
  isProduction: import.meta.env.VITE_APP_ENV === 'production',
};

export default appConfig;
