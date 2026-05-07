export const APP_NAME = 'Rapid Stores';
export const APP_VERSION = '1.0.0';

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  ORDERS: '/api/orders',
  USERS: '/api/users',
  PAYMENTS: '/api/payments',
};

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin-dashboard',
  MANUFACTURING: '/manufacturing',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  MANAGER: 'manager',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const CURRENCY = {
  CODE: 'ZMW',
  SYMBOL: 'K',
  LOCALE: 'en-ZM',
};

export const STORAGE_KEYS = {
  USER: 'rapid_user',
  CART: 'rapid_cart',
  THEME: 'rapid_theme',
  PREFERENCES: 'rapid_preferences',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
};
