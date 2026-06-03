import { CATEGORIES } from '../utils/categories.js';
import { REGIONS } from '../utils/regions.js';
import '../styles/FilterBar.css';

export default function FilterBar({
  activeCategories,
  activeRegions,
  onToggleCategory,
  onToggleRegion,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <p className="filter-label mono">Category:</p>
        <div className="filter-buttons">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategories.includes(cat.id) ? 'active' : ''}`}
              onClick={() => onToggleCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label mono">Region:</p>
        <div className="filter-buttons">
          {REGIONS.map(region => (
            <button
              key={region.id}
              className={`filter-btn ${activeRegions.includes(region.id) ? 'active' : ''}`}
              onClick={() => onToggleRegion(region.id)}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
