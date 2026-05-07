/**
 * Utility Functions Collection
 * Common helper functions used across the application
 */

// Format currency
export const formatCurrency = (amount, currency = 'ZMW') => {
  return new Intl.NumberFormat('en-ZM', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format date
export const formatDate = (date, format = 'short') => {
  const dateObj = new Date(date);
  const formats = {
    short: () => dateObj.toLocaleDateString('en-ZM'),
    long: () => dateObj.toLocaleDateString('en-ZM', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    time: () => dateObj.toLocaleTimeString('en-ZM'),
    full: () => dateObj.toLocaleString('en-ZM'),
  };
  return formats[format]?.() || dateObj.toString();
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Debounce function
export const debounce = (func, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = (func, delay = 300) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Group array items
export const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
};

// Sort array by property
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') return a[key] > b[key] ? 1 : -1;
    return a[key] < b[key] ? 1 : -1;
  });
};

// Filter array by multiple conditions
export const filterBy = (array, conditions) => {
  return array.filter(item =>
    Object.entries(conditions).every(([key, value]) => item[key] === value)
  );
};

// Map array to select specific keys
export const selectKeys = (array, keys) => {
  return array.map(item => {
    const result = {};
    keys.forEach(key => {
      result[key] = item[key];
    });
    return result;
  });
};

// Calculate total from array of objects
export const calculateTotal = (array, key) => {
  return array.reduce((sum, item) => sum + (item[key] || 0), 0);
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Retry function with exponential backoff
export const retryAsync = async (fn, maxAttempts = 3, delay = 1000) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};
