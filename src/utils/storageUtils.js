import { STORAGE_KEYS } from './constants/appConstants';

/**
 * Safe localStorage wrapper with error handling
 */

export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};

// User storage helpers
export const userStorage = {
  setUser: (user) => storage.set(STORAGE_KEYS.USER, user),
  getUser: () => storage.get(STORAGE_KEYS.USER),
  clearUser: () => storage.remove(STORAGE_KEYS.USER),
};

// Cart storage helpers
export const cartStorage = {
  setCart: (cart) => storage.set(STORAGE_KEYS.CART, cart),
  getCart: () => storage.get(STORAGE_KEYS.CART, []),
  clearCart: () => storage.remove(STORAGE_KEYS.CART),
};

// Theme storage helpers
export const themeStorage = {
  setTheme: (theme) => storage.set(STORAGE_KEYS.THEME, theme),
  getTheme: () => storage.get(STORAGE_KEYS.THEME, 'light'),
};
