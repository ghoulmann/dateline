import ConflictCard from './ConflictCard.jsx';
import '../styles/CardGrid.css';

export default function CardGrid({ locations, activeCategories, hiddenIds, showHidden, weather, onHide }) {
  const filtered = locations.filter(loc => {
    const isHidden = hiddenIds.includes(loc.id);
    if (isHidden && !showHidden) return false;

    const hasMatchingCategory = loc.categories.some(cat => activeCategories.includes(cat));
    return hasMatchingCategory;
  });

  if (filtered.length === 0) {
    return <div className="empty-state">No hotspots match your filters.</div>;
  }

  return (
    <div className="card-grid">
      {filtered.map(loc => (
        <div
          key={loc.id}
          className={`grid-item ${hiddenIds.includes(loc.id) ? 'hidden-card' : ''}`}
        >
          <ConflictCard
            location={loc}
            weather={weather[loc.id] || { temp: '—', description: 'loading' }}
            onHide={onHide}
          />
        </div>
      ))}
    </div>
  );
}
