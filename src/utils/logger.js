// Production-grade logging utility
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const getTimestamp = () => new Date().toISOString();

const formatLog = (level, message, data) => {
  return {
    timestamp: getTimestamp(),
    level,
    message,
    data,
    env: process.env.NODE_ENV,
  };
};

export const logger = {
  error: (message, data = {}) => {
    const log = formatLog(LOG_LEVELS.ERROR, message, data);
    console.error(`[${log.timestamp}] ERROR:`, message, data);
    // Send to error tracking service (e.g., Sentry, LogRocket)
    if (window.__LOG_SERVICE__) {
      window.__LOG_SERVICE__.captureException(new Error(message), { extra: data });
    }
  },

  warn: (message, data = {}) => {
    const log = formatLog(LOG_LEVELS.WARN, message, data);
    console.warn(`[${log.timestamp}] WARN:`, message, data);
  },

  info: (message, data = {}) => {
    const log = formatLog(LOG_LEVELS.INFO, message, data);
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[${log.timestamp}] INFO:`, message, data);
    }
  },

  debug: (message, data = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      const log = formatLog(LOG_LEVELS.DEBUG, message, data);
      console.debug(`[${log.timestamp}] DEBUG:`, message, data);
    }
  },
};
