import { useState, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import { logger } from '../utils/logger';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(url, options);
        setData(response.data);
        setError(null);
      } catch (err) {
        logger.error('Fetch error:', { url, error: err.message });
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};
