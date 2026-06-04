#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';
import { fetchRss } from '../src/api/rss.js';

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

// Try to load repository ontology (optional, curated CAMEO mapping)
let ONTOLOGY = null;
try {
  const ontologyPath = resolve(__dirname, '../resources/ontology.merged.json');
  const ontologyText = await fs.readFile(ontologyPath, 'utf-8');
  ONTOLOGY = JSON.parse(ontologyText);
  console.log('Loaded ontology from resources/ontology.merged.json');

  // If ontology provides alias maps, register them with geocode module
  try {
    const geocodeModule = await import('../src/api/geocode.js');
    const aliases = {};
    if (ONTOLOGY.city_aliases) aliases.city_aliases = ONTOLOGY.city_aliases;
    if (ONTOLOGY.country_aliases) aliases.country_aliases = ONTOLOGY.country_aliases;
    if (Object.keys(aliases).length) {
      geocodeModule.setAliases(aliases);
      console.log('Registered ontology aliases with geocode module');
    }
  } catch (err) {
    // Ignore if running in environment that cannot import src module
  }
} catch (err) {
  // fallback to older curated ontology.json if present
  try {
    const ontologyPath = resolve(__dirname, '../resources/ontology.json');
    const ontologyText = await fs.readFile(ontologyPath, 'utf-8');
    ONTOLOGY = JSON.parse(ontologyText);
    console.log('Loaded ontology from resources/ontology.json');
  } catch (err2) {
    // not fatal; continue with built-in KEYWORD_MAP
  }
}

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

function createArticleEntry(article) {
  const url = article.url || article.link || '';
  let source_domain = article.source_domain || article.domain || '';
  if (!source_domain && url) {
    try {
      source_domain = new URL(url).hostname.replace(/^www\./, '');
    } catch (e) {
      source_domain = '';
    }
  }

  return {
    title: article.title || article.headline || 'Untitled article',
    url,
    seendate: article.seendate || new Date().toISOString(),
    source_domain,
    categories: extractCategories(article.title),
    source_category: article._category || null,
  };
}

function extractCategories(title) {
  if (!title) return ['armed-conflict'];
  const titleLower = title.toLowerCase();
  const matched = new Set();

  // If ontology provides category keywords, consult it first
  if (ONTOLOGY && ONTOLOGY.category_keywords) {
    for (const [category, meta] of Object.entries(ONTOLOGY.category_keywords)) {
      for (const keyword of (meta.keywords || [])) {
        if (titleLower.includes(keyword)) {
          matched.add(category);
          break;
        }
      }
    }
  }

  // Fallback to built-in KEYWORD_MAP
  if (matched.size === 0) {
    for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
      for (const keyword of keywords) {
        if (titleLower.includes(keyword)) {
          matched.add(category);
          break;
        }
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

const DEMO_LOCATIONS = [
  {
    id: 'Gaza',
    name: 'Gaza',
    country: 'PS',
    lat: 31.5,
    lon: 34.47,
    timezone: 'Asia/Gaza',
    headline: 'Airstrike reported amid ongoing conflict in Gaza',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 8,
    categories: ['armed-conflict', 'humanitarian'],
  },
  {
    id: 'Kyiv',
    name: 'Kyiv',
    country: 'UA',
    lat: 50.45,
    lon: 30.52,
    timezone: 'Europe/Kyiv',
    headline: 'Military offensive reported in Ukraine',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 6,
    categories: ['armed-conflict'],
  },
  {
    id: 'Jakarta',
    name: 'Jakarta',
    country: 'ID',
    lat: -6.21,
    lon: 106.85,
    timezone: 'Asia/Jakarta',
    headline: 'Earthquake declared emergency in Indonesia',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 4,
    categories: ['natural-disaster'],
  },
  {
    id: 'Pacific',
    name: 'Pacific Region',
    country: 'FJ',
    lat: -17.71,
    lon: 178.07,
    timezone: 'Pacific/Fiji',
    headline: 'Hottest on record threatens island nations',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 3,
    categories: ['climate-watch'],
  },
  {
    id: 'Yangon',
    name: 'Yangon',
    country: 'MM',
    lat: 16.87,
    lon: 96.19,
    timezone: 'Asia/Yangon',
    headline: 'Political repression and crackdown reported',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 3,
    categories: ['political-repression', 'democracy-crisis'],
  },
  {
    id: 'Istanbul',
    name: 'Istanbul',
    country: 'TR',
    lat: 41.01,
    lon: 28.98,
    timezone: 'Europe/Istanbul',
    headline: 'Election interference concerns amid democratic backsliding',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 2,
    categories: ['democracy-crisis'],
  },
  {
    id: 'Warsaw',
    name: 'Warsaw',
    country: 'PL',
    lat: 52.23,
    lon: 21.01,
    timezone: 'Europe/Warsaw',
    headline: 'Reproductive rights and gender ideology debates escalate',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 2,
    categories: ['culture-wars'],
  },
  {
    id: 'Khartoum',
    name: 'Khartoum',
    country: 'SD',
    lat: 15.55,
    lon: 32.53,
    timezone: 'Africa/Khartoum',
    headline: 'Humanitarian crisis with mass displacement reported',
    headlineUrl: 'https://www.gdeltproject.org/',
    seendate: new Date().toISOString(),
    articleCount: 2,
    categories: ['humanitarian', 'armed-conflict'],
  },
];

async function main() {
  const useStaggered = process.argv.includes('--staggered');
  const forceRssOnly = process.argv.includes('--force-rss-only');

  console.log('Fetching hotspots from GDELT (per-category queries)...');
  if (useStaggered) {
    console.log('  Using staggered requests (6s apart to avoid rate-limiting)');
  }

  const allArticles = [];
  const queries = Object.entries(CATEGORY_QUERIES);

  let results;

  if (useStaggered) {
    // Sequential requests with 6s delay between them (GDELT limit is 1 per 5s)
    results = [];
    for (const [category, query] of queries) {
      const result = await fetchGdelt(query).then(articles => ({ category, articles }));
      results.push({ status: 'fulfilled', value: result });
      if (queries.indexOf([category, query]) < queries.length - 1) {
        await new Promise(r => setTimeout(r, 6000)); // 6s delay
      }
    }
  } else {
    // Parallel requests (default, used in GitHub Actions)
    results = await Promise.allSettled(
      queries.map(([category, query]) =>
        fetchGdelt(query).then(articles => ({ category, articles }))
      )
    );
  }

  // Also fetch Google News RSS for each category as a fallback/no-PAT source
  console.log('Fetching Google News RSS per category...');
  for (const [category, query] of queries) {
    try {
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}`;
      const rssArticles = await fetchRss(rssUrl);
      console.log(`  ${category} (rss): ${rssArticles.length} articles`);
      allArticles.push(...rssArticles.map(a => ({ ...a, _category: category })));
      if (useStaggered) await new Promise(r => setTimeout(r, 6000));
    } catch (err) {
      console.warn(`  RSS failed for ${category}: ${err.message}`);
    }
  }

    // Curated outlet RSS feeds (direct source links)
    const OUTLET_FEEDS = {
      'armed-conflict': [
        'https://www.reutersagency.com/feed/?best-topics=world',
        'https://www.aljazeera.com/xml/rss/all.xml',
        'https://feeds.reuters.com/Reuters/worldNews'
      ],
      'humanitarian': [
        'https://www.reuters.com/rssFeed/humanitarian',
        'https://www.aljazeera.com/xml/rss/all.xml'
      ],
      'natural-disaster': [
        'https://www.reuters.com/rssFeed/environment',
        'https://www.bbc.co.uk/rss/feeds/world.xml'
      ],
      'political-repression': [
        'https://www.reuters.com/rssFeed/politicsNews',
        'https://feeds.bbci.co.uk/news/world/rss.xml'
      ],
      'democracy-crisis': [
        'https://feeds.nytimes.com/nyt/rss/World',
        'https://feeds.bbci.co.uk/news/world/rss.xml'
      ],
      'climate-watch': [
        'https://www.reuters.com/rssFeed/environment',
        'https://feeds.npr.org/100026539/feeds.xml'
      ],
      'culture-wars': [
        'https://feeds.npr.org/1001/rss.xml',
        'https://feeds.foxnews.com/foxnews/entertainment'
      ]
    };

    console.log('Fetching curated outlet RSS feeds...');
    for (const [category, feeds] of Object.entries(OUTLET_FEEDS)) {
      for (const feedUrl of feeds) {
        try {
          const feedItems = await fetchRss(feedUrl);
          console.log(`  ${category} <- ${feedUrl}: ${feedItems.length}`);
          allArticles.push(...feedItems.map(a => ({ ...a, _category: category })));
          if (useStaggered) await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
          console.warn(`  outlet RSS failed ${feedUrl}: ${err.message}`);
        }
      }
    }

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

    const articleEntry = createArticleEntry(article);
    const existing = locationMap.get(loc.id);

    if (!existing) {
      locationMap.set(loc.id, {
        id: loc.id,
        name: loc.id,
        country: loc.country,
        lat: loc.lat,
        lon: loc.lon,
        timezone: loc.timezone,
        headline: articleEntry.title,
        headlineUrl: articleEntry.url,
        seendate: articleEntry.seendate,
        articleCount: 1,
        categories: articleEntry.categories,
        articles: [articleEntry],
      });
    } else {
      existing.articleCount += 1;
      existing.categories = Array.from(new Set([...existing.categories, ...articleEntry.categories]));
      existing.articles.push(articleEntry);
      if (new Date(articleEntry.seendate) > new Date(existing.seendate)) {
        existing.headline = articleEntry.title;
        existing.headlineUrl = articleEntry.url;
        existing.seendate = articleEntry.seendate;
      }
    }
  }

  for (const location of locationMap.values()) {
    if (location.articles) {
      location.articles.sort((a, b) => new Date(b.seendate) - new Date(a.seendate));
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
