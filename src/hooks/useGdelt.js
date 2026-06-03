import { useState, useEffect } from 'react';
import { fetchHotspots } from '../api/gdelt.js';

export function useGdelt() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchHotspots();
      setLocations(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('useGdelt error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10 * 60 * 1000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  return { locations, loading, error, lastUpdated };
}
