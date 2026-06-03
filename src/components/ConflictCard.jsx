import { useClock } from '../hooks/useClock.js';
import { getFlag } from '../utils/flags.js';
import '../styles/ConflictCard.css';

export default function ConflictCard({ location, weather, onHide }) {
  useClock();

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: location.timezone,
  });

  const weekday = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: location.timezone,
  }).format(new Date());

  const day = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: location.timezone,
  }).format(new Date());

  const localTime = formatter.format(new Date());

  return (
    <div className="conflict-card bg-card-industrial">
      <div className="card-header">
        <div>
          <h3>{getFlag(location.country)} {location.name}</h3>
          <p className="mono text-muted">{location.country}</p>
        </div>
        <button className="hide-btn" onClick={() => onHide(location.id)}>×</button>
      </div>

      <div className="card-status">
        <span>{weather.temp}°c</span>
        <span className="dot">·</span>
        <span>{weather.description}</span>
      </div>

      <div className="card-time mono">
        {localTime} • {weekday} {day}
      </div>

      <div className="card-headline">
        <a href={location.headlineUrl} target="_blank" rel="noopener noreferrer">
          {location.headline}
        </a>
      </div>

      <div className="card-tags">
        {location.categories.map(cat => (
          <span key={cat} className="tag">{cat.replace('-', ' ')}</span>
        ))}
      </div>
    </div>
  );
}
