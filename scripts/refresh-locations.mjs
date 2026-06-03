#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import lookup tables from src
const geocodePath = resolve(__dirname, '../src/api/geocode.js');
const geocodeCode = await fs.readFile(geocodePath, 'utf-8');
const hotspotTableMatch = geocodeCode.match(/const HOTSPOT_TABLE = ({[\s\S]*?});/);
const countryCapitalsMatch = geocodeCode.match(/const COUNTRY_CAPITALS = ({[\s\S]*?});/);

if (!hotspotTableMatch || !countryCapitalsMatch) {
  console.error('Failed to extract lookup tables');
  process.exit(1);
}

// Evaluate the table definitions (safe here, they're constants from our own code)
const HOTSPOT_TABLE = eval(`(${hotspotTableMatch[1]})`);
const COUNTRY_CAPITALS = eval(`(${countryCapitalsMatch[1]})`);

const CATEGORY_QUERIES = {
  'armed-conflict': 'airstrike OR "drone strike" OR shelling OR "ground offensive" OR ceasefire OR "war crimes" OR "armed clash" OR siege',
  'humanitarian': 'famine OR "food insecurity" OR "humanitarian access" OR "acute malnutrition" OR "mass displacement" OR "refugee camp"',
  'natural-disaster': 'earthquake OR tsunami OR cyclone OR hurricane OR typhoon OR wildfire OR "flash flood" OR "volcanic eruption"',
  'political-repression': 'crackdown OR "opposition leader arrested" OR "political prisoner" OR "internet shutdown" OR "enforced disappearance"',
  'democracy-crisis': '"election interference" OR "voter suppression" OR "democratic backsliding" OR "court packing" OR "disinformation campaign"',
  'climate-watch': '"hottest on record" OR "sea level rise" OR "coral bleaching" OR "climate migration" OR "extreme heat"',
  'culture-wars': '"gender ideology" OR "anti-gay law" OR "religious nationalism" OR "transgender ban" OR "abortion ban"',
};

const KEYWORD_MAP = {
  'armed-conflict': ['airstrike', 'drone strike', 'shelling', 'ground offensive', 'ceasefire', 'war crimes', 'armed clash', 'siege'],
  'humanitarian': ['famine', 'food insecurity', 'humanitarian access', 'malnutrition', 'displacement', 'refugee', 'aid', 'starvation'],
  'natural-disaster': ['earthquake', 'tsunami', 'cyclone', 'hurricane', 'typhoon', 'wildfire', 'flood', 'eruption'],
  'political-repression': ['crackdown', 'arrested', 'prisoner', 'shutdown', 'disappearance', 'detained', 'imprisoned', 'torture'],
  'democracy-crisis': ['election', 'fraud', 'backsliding', 'court', 'disinformation', 'press freedom', 'coup'],
  'climate-watch': ['hottest', 'sea level', 'coral', 'migration', 'heat', 'heatwave', 'climate', 'tipping'],
  'culture-wars': ['gender', 'gay', 'religious', 'transgender', 'abortion', 'reproductive', 'blasphemy', 'book ban'],
};

function resolveLocation(article) {
  const title = article.title || '';
  const country = article.sourcecountry || '';

  for (const [city, coords] of Object.entries(HOTSPOT_TABLE)) {
    if (title.toLowerCase().includes(city.toLowerCase())) {
      return { id: city, ...coords };
    }
  }

  const capital = COUNTRY_CAPITALS[country];
  if (capital && HOTSPOT_TABLE[capital]) {
    return { id: capital, ...HOTSPOT_TABLE[capital] };
  }

  return null;
}

function extractCategories(title) {
  if (!title) return ['armed-conflict'];
  const titleLower = title.toLowerCase();
  const matched = new Set();

  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    for (const keyword of keywords) {
      if (titleLower.includes(keyword)) {
        matched.add(category);
        break;
      }
    }
  }

  return matched.size > 0 ? Array.from(matched) : ['armed-conflict'];
}

async function fetchGdelt(query, retryCount = 0) {
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&format=json&maxrecords=10&sort=DateDesc`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 429 && retryCount < 2) {
        // Rate limited: wait and retry
        const delay = Math.pow(2, retryCount) * 10000; // 10s, 20s
        console.log(`  Rate limited (429). Waiting ${delay}ms before retry...`);
        await new Promise(r => setTimeout(r, delay));
        return fetchGdelt(query, retryCount + 1);
      }
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.articles || [];
  } catch (err) {
    console.warn(`  GDELT query failed: ${err.message}`);
    return [];
  }
}

async function main() {
  console.log('Fetching hotspots from GDELT (per-category queries)...');

  const allArticles = [];
  const queries = Object.entries(CATEGORY_QUERIES);

  const results = await Promise.allSettled(
    queries.map(([category, query]) =>
      fetchGdelt(query).then(articles => ({ category, articles }))
    )
  );

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const { category, articles } = result.value;
      console.log(`  ${category}: ${articles.length} articles`);
      allArticles.push(...articles.map(a => ({ ...a, _category: category })));
    }
  }

  if (allArticles.length === 0) {
    console.warn('No articles fetched from any category (GDELT may be rate-limited or unavailable)');
    console.warn('Using existing locations.json as fallback');
    return;
  }

  const locationMap = new Map();
  let skipped = 0;

  for (const article of allArticles) {
    const loc = resolveLocation(article);
    if (!loc) {
      skipped++;
      continue;
    }

    const existing = locationMap.get(loc.id);
    const categories = extractCategories(article.title);

    if (!existing) {
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
        articleCount: 1,
        categories: categories,
      });
    } else {
      existing.articleCount += 1;
      existing.categories = Array.from(new Set([...existing.categories, ...categories]));
    }
  }

  let locations = Array.from(locationMap.values())
    .sort((a, b) => b.articleCount - a.articleCount)
    .slice(0, 25);

  // Enforce at least 1 result per category
  const categorySet = new Set();
  for (const loc of locations) {
    for (const cat of loc.categories) {
      categorySet.add(cat);
    }
  }

  const missingCategories = Object.keys(CATEGORY_QUERIES).filter(cat => !categorySet.has(cat));

  if (missingCategories.length > 0) {
    console.warn(`Warning: Missing categories: ${missingCategories.join(', ')}`);
  }

  locations.push({
    refreshedAt: new Date().toISOString(),
  });

  const outputPath = resolve(__dirname, '../public/locations.json');
  await fs.writeFile(outputPath, JSON.stringify(locations, null, 2));

  console.log(`✓ Wrote ${locations.length - 1} locations to ${outputPath}`);
  console.log(`  Skipped ${skipped} articles (unrecognized locations)`);
  console.log(`  Coverage: ${Array.from(categorySet).sort().join(', ')}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
