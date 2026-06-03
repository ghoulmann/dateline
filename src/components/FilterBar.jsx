import { CATEGORIES } from '../utils/categories.js';
import '../styles/FilterBar.css';

export default function FilterBar({ activeCategories, onToggle }) {
  return (
    <div className="filter-bar">
      <p className="filter-label mono">Filter by category:</p>
      <div className="filter-buttons">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategories.includes(cat.id) ? 'active' : ''}`}
            onClick={() => onToggle(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
