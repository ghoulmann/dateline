export const CATEGORIES = [
  { id: 'armed-conflict', label: 'Armed conflict / War' },
  { id: 'humanitarian', label: 'Humanitarian crisis' },
  { id: 'natural-disaster', label: 'Natural disaster' },
  { id: 'political-repression', label: 'Political repression' },
  { id: 'democracy-crisis', label: 'Crisis of democracy' },
  { id: 'climate-watch', label: 'Climate watch' },
  { id: 'culture-wars', label: 'Culture wars' },
];

const KEYWORD_MAP = {
  'armed-conflict': ['war', 'airstrike', 'shelling', 'troops', 'military', 'fighting', 'offensive', 'ceasefire', 'bombardment', 'conflict', 'attack', 'assault', 'battle'],
  'humanitarian': ['famine', 'refugee', 'displacement', 'aid', 'cholera', 'starvation', 'humanitarian', 'starvation', 'displaced', 'food crisis'],
  'natural-disaster': ['earthquake', 'flood', 'cyclone', 'tsunami', 'wildfire', 'eruption', 'drought', 'hurricane', 'storm', 'disaster'],
  'political-repression': ['crackdown', 'detained', 'arrested', 'protest', 'dissidents', 'censorship', 'imprisoned', 'opposition', 'unrest'],
  'democracy-crisis': ['election', 'coup', 'junta', 'rigged', 'fraud', 'parliament', 'constitutional', 'democratic'],
  'climate-watch': ['climate', 'temperature record', 'heatwave', 'glacier', 'emissions', 'sea level', 'warming', 'carbon'],
  'culture-wars': ['lgbtq', 'abortion', 'blasphemy', 'book ban', 'religious freedom', 'secularism', 'cultural'],
};

export function extractCategories(title) {
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
