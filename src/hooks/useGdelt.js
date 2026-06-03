import { useState, useEffect } from 'react';
import { fetchHotspots } from '../api/gdelt.js';

export const POLL_INTERVAL = import.meta.env.DEV ? 5 * 60 * 1000 : 10 * 60 * 1000;

async function fetchFallbackLocations() {
  try {
    const res = await fetch('/dateline/locations.json');
    if (!res.ok) throw new Error('Fallback fetch failed');
    return res.json();
  } catch (err) {
    console.error('Fallback locations.json failed:', err);
    return [];
  }
}

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
      console.error('useGdelt error:', err);
      setError(err.message);
      const fallback = await fetchFallbackLocations();
      setLocations(fallback);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const nextUpdateAt = lastUpdated ? new Date(lastUpdated.getTime() + POLL_INTERVAL) : null;

  return { locations, loading, error, lastUpdated, nextUpdateAt };
}
