import { useState, useEffect } from 'react';
import { useGdelt } from '../hooks/useGdelt.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { fetchWeatherBatch } from '../api/weather.js';
import { CATEGORIES } from '../utils/categories.js';
import FilterBar from './FilterBar.jsx';
import CardGrid from './CardGrid.jsx';
import HiddenBanner from './HiddenBanner.jsx';
import '../styles/App.css';

export default function App() {
  const { locations, loading, error } = useGdelt();
  const [weather, setWeather] = useState({});
  const [activeCategories, setActiveCategories] = useLocalStorage(
    'dateline-categories',
    CATEGORIES.map(c => c.id)
  );
  const [hiddenIds, setHiddenIds] = useLocalStorage('dateline-hidden', []);
  const [showHidden, setShowHidden] = useState(false);

  // Fetch weather when locations update
  useEffect(() => {
    if (locations.length > 0) {
      fetchWeatherBatch(locations).then(setWeather);
    }
  }, [locations]);

  const toggleCategory = (categoryId) => {
    setActiveCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleHidden = (locationId) => {
    setHiddenIds(prev =>
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Dateline</h1>
        <p className="subtitle mono">Global conflict hotspots, real-time</p>
      </header>

      {error && (
        <div className="error-banner">
          <p>Error loading data: {error}</p>
        </div>
      )}

      {loading && locations.length === 0 && (
        <div className="loading-state">Loading hotspots...</div>
      )}

      {!loading && (
        <>
          <FilterBar
            activeCategories={activeCategories}
            onToggle={toggleCategory}
          />

          <HiddenBanner
            hiddenCount={hiddenIds.length}
            showHidden={showHidden}
            onToggle={() => setShowHidden(!showHidden)}
          />

          <CardGrid
            locations={locations}
            activeCategories={activeCategories}
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
