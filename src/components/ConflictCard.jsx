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

  const primaryArticle = location.articles?.[0] ?? {
    title: location.headline,
    url: location.headlineUrl,
    seendate: location.seendate,
    source_domain: location.source_domain,
  };

  const extraArticles = location.articles?.slice(1) ?? [];
  const articleCount = location.articleCount ?? location.articles?.length ?? 1;

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
        {weather.qualification && (
          <>
            <span className="dot">·</span>
            <span className="qualification">{weather.qualification}</span>
          </>
        )}
      </div>

      <div className="card-time mono">
        {localTime} • {weekday} {day}
      </div>

      <div className="card-headline">
        {primaryArticle.url && primaryArticle.url !== 'https://www.gdeltproject.org/' ? (
          <a href={primaryArticle.url} target="_blank" rel="noopener noreferrer">
            {primaryArticle.title}
          </a>
        ) : (
          <span>{primaryArticle.title}</span>
        )}
      </div>

      <div className="card-meta mono">
        {primaryArticle.source_domain && <span>{primaryArticle.source_domain}</span>}
        {articleCount > 1 && (
          <span className="article-count"> • {articleCount} articles</span>
        )}
      </div>

      {extraArticles.length > 0 && (
        <details className="article-details">
          <summary>{extraArticles.length} more article{extraArticles.length === 1 ? '' : 's'}</summary>
          <ul>
            {extraArticles.map((article, index) => (
              <li key={`${article.url || article.title}-${index}`}>
                {article.url ? (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                ) : (
                  <span>{article.title}</span>
                )}
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="card-tags">
        {location.categories.map(cat => (
          <span key={cat} className="tag">{cat.replace('-', ' ')}</span>
        ))}
      </div>
    </div>
  );
}
