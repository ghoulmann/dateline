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
  'armed-conflict': [
    'airstrike', 'drone strike', 'shelling', 'ground offensive', 'ceasefire', 'war crimes',
    'armed clash', 'siege', 'military offensive', 'artillery bombardment', 'missile attack',
    'troops advance', 'occupation forces', 'killed in fighting', 'rebel forces'
  ],
  'humanitarian': [
    'famine', 'food insecurity', 'humanitarian access', 'acute malnutrition', 'mass displacement',
    'refugee camp', 'idp camp', 'starvation', 'civilians trapped', 'humanitarian corridor',
    'displaced persons', 'aid blocked', 'cholera outbreak', 'internally displaced', 'flee fighting'
  ],
  'natural-disaster': [
    'earthquake', 'tsunami', 'cyclone', 'hurricane', 'typhoon', 'wildfire', 'flash flood',
    'volcanic eruption', 'landslide', 'heat dome', 'declared state of emergency', 'drought emergency',
    'storm surge', 'disaster relief', 'magnitude'
  ],
  'political-repression': [
    'crackdown', 'opposition leader arrested', 'political prisoner', 'internet shutdown',
    'enforced disappearance', 'imprisoned journalist', 'arbitrary detention', 'protest ban',
    'detained', 'jailed for', 'torture', 'human rights defender', 'suppressed', 'silenced', 'exile'
  ],
  'democracy-crisis': [
    'election interference', 'voter suppression', 'democratic backsliding', 'court packing',
    'disinformation campaign', 'press freedom', 'rigged election', 'constitutional coup',
    'emergency powers', 'judicial independence', 'media crackdown', 'state media',
    'electoral fraud', 'autocratization', 'coup'
  ],
  'climate-watch': [
    'hottest on record', 'sea level rise', 'coral bleaching', 'climate migration', 'extreme heat',
    'heatwave', 'climate tipping point', 'arctic ice', 'climate disaster', 'climate record',
    'carbon emissions', 'net zero', 'ipcc', 'tipping point', 'fossil fuel'
  ],
  'culture-wars': [
    'gender ideology', 'anti-gay law', 'religious nationalism', 'transgender ban', 'abortion ban',
    'reproductive rights', 'blasphemy law', 'book ban', 'theocracy', 'same-sex marriage ban',
    'lgbtq rights', 'drag ban', 'sharia law', 'secularism', 'religious freedom'
  ],
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
