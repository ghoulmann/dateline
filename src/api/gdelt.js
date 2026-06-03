import { resolveLocation } from './geocode.js';
import { extractCategories } from '../utils/categories.js';

async function fetchLocationsFallback() {
  try {
    const res = await fetch('/dateline/locations.json');
    if (!res.ok) throw new Error('Fallback fetch failed');
    return res.json();
  } catch (err) {
    console.warn('Fallback locations.json failed:', err);
    return [];
  }
}

export async function fetchHotspots() {
  const query = 'conflict OR war OR crisis OR protest OR disaster OR humanitarian OR earthquake OR flood OR deportation OR migrant OR crackdown OR strike OR outbreak OR epidemic OR journalist OR opioid OR union OR corruption OR coup OR assassination OR femicide OR Iran OR Israel OR Ukraine';
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&format=json&maxrecords=50&sort=DateDesc`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`GDELT returned ${contentType || 'non-JSON'} instead of JSON (likely rate-limited)`);
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error(`GDELT JSON parse failed: ${err.message}`);
  }
  const articles = data.articles || [];

  const locationMap = new Map();
  for (const article of articles) {
    const loc = resolveLocation(article);
    if (!loc) continue;

    const existing = locationMap.get(loc.id);
    if (!existing || new Date(article.seendate) > new Date(existing.seendate)) {
      locationMap.set(loc.id, {
        id: loc.id,
        name: loc.id,
        country: loc.country,
        lat: loc.lat,
        lon: loc.lon,
        timezone: loc.timezone,
        headline: article.title,
        headlineUrl: article.url,
        seendate: article.seendate,
        articleCount: (existing?.articleCount || 0) + 1,
        categories: extractCategories(article.title),
      });
    } else if (existing) {
      existing.articleCount += 1;
    }
  }

  const locations = Array.from(locationMap.values())
    .sort((a, b) => b.articleCount - a.articleCount)
    .slice(0, 25);

  if (locations.length === 0) {
    console.warn('GDELT returned no recognized locations, falling back to seed data');
    return fetchLocationsFallback();
  }

  return locations;
}
