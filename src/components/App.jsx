import { useState, useEffect } from 'react';
import { useGdelt, POLL_INTERVAL } from '../hooks/useGdelt.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { fetchWeatherBatch } from '../api/weather.js';
import { CATEGORIES } from '../utils/categories.js';
import { REGIONS } from '../utils/regions.js';
import FilterBar from './FilterBar.jsx';
import CardGrid from './CardGrid.jsx';
import HiddenBanner from './HiddenBanner.jsx';
import '../styles/App.css';

export default function App() {
  const { locations, loading, error, nextUpdateAt } = useGdelt();
  const [weather, setWeather] = useState({});
  const [, setTick] = useState(0);
  const [activeCategories, setActiveCategories] = useLocalStorage(
    'dateline-categories',
    CATEGORIES.map(c => c.id)
  );
  const [activeRegions, setActiveRegions] = useLocalStorage(
    'dateline-regions',
    REGIONS.map(r => r.id)
  );
  const [hiddenIds, setHiddenIds] = useLocalStorage('dateline-hidden', []);
  const [showHidden, setShowHidden] = useState(false);

  // Fetch weather when locations update
  useEffect(() => {
    if (locations.length > 0) {
      fetchWeatherBatch(locations).then(setWeather);
    }
  }, [locations]);

  // Tick every 30s to update countdown when error is shown
  useEffect(() => {
    if (!error) return;
    const id = setInterval(() => setTick(t => t + 1), 30_000);
    return () => clearInterval(id);
  }, [error]);

  const toggleCategory = (categoryId) => {
    setActiveCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleRegion = (regionId) => {
    setActiveRegions(prev =>
      prev.includes(regionId)
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
    );
  };

  const toggleHidden = (locationId) => {
    setHiddenIds(prev =>
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const minsUntilUpdate = nextUpdateAt
    ? Math.max(0, Math.ceil((nextUpdateAt - Date.now()) / 60_000))
    : null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Now</h1>
        <p className="subtitle mono">Global conflict hotspots, real-time</p>
      </header>

      {error && (
        <div className="error-banner">
          <p>Error loading data: {error}</p>
          {minsUntilUpdate !== null && (
            <p className="mono" style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-heading)' }}>
              Next update in {minsUntilUpdate} min
            </p>
          )}
        </div>
      )}

      {loading && locations.length === 0 && (
        <div className="loading-state">Loading hotspots...</div>
      )}

      {!loading && (
        <>
          <FilterBar
            activeCategories={activeCategories}
            activeRegions={activeRegions}
            onToggleCategory={toggleCategory}
            onToggleRegion={toggleRegion}
          />

          <HiddenBanner
            hiddenCount={hiddenIds.length}
            showHidden={showHidden}
            onToggle={() => setShowHidden(!showHidden)}
          />

          <CardGrid
            locations={locations}
            activeCategories={activeCategories}
            activeRegions={activeRegions}
            hiddenIds={hiddenIds}
            showHidden={showHidden}
            weather={weather}
            onHide={toggleHidden}
          />
        </>
      )}

      <footer className="app-footer">
        <p className="mono">
          Data from <a href="https://www.gdeltproject.org/" target="_blank" rel="noopener noreferrer">GDELT Project</a> •
          Weather from <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
        </p>
      </footer>
    </div>
  );
}
