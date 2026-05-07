import { logger } from '../utils/logger';

export const requireAuth = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      logger.warn('No authentication token provided');
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Verify token (implementation depends on your auth strategy)
    // const decoded = verifyToken(token);
    // request.user = decoded;

    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return response.status(403).json({ error: 'Forbidden' });
  }
};

export const optionalAuth = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      // Verify token
      // const decoded = verifyToken(token);
      // request.user = decoded;
    }

    next();
  } catch (error) {
    logger.warn('Optional auth error:', error);
    next();
  }
};
