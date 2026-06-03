import { resolveLocation } from './geocode.js';
import { extractCategories } from '../utils/categories.js';

export async function fetchHotspots() {
  try {
    const query = 'conflict OR war OR crisis OR protest OR disaster OR humanitarian OR earthquake OR flood';
    const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&format=json&maxrecords=50&sort=DateDesc`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
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

    return locations;
  } catch (error) {
    console.error('GDELT fetch error:', error);
    return [];
  }
}
