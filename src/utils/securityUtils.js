/**
 * Security Utilities
 * Provides XSS protection, CSRF tokens, and other security functions
 */

// Sanitize user input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Sanitize HTML content
export const sanitizeHTML = (html) => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

// Check if a URL is safe
export const isSafeURL = (url) => {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin === window.location.origin || 
           parsed.protocol === 'http:' || 
           parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Generate CSRF token
export const generateCSRFToken = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Store CSRF token
export const setCSRFToken = (token) => {
  sessionStorage.setItem('csrf_token', token);
};

// Get CSRF token
export const getCSRFToken = () => {
  return sessionStorage.getItem('csrf_token');
};

// Validate CSRF token
export const validateCSRFToken = (token) => {
  return token === getCSRFToken();
};

// Rate limit helper
export const createRateLimiter = (maxAttempts = 5, windowMs = 60000) => {
  const attempts = new Map();

  return (key) => {
    const now = Date.now();
    const userAttempts = attempts.get(key) || [];
    const recentAttempts = userAttempts.filter(t => now - t < windowMs);

    if (recentAttempts.length >= maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    attempts.set(key, recentAttempts);
    return true;
  };
};
