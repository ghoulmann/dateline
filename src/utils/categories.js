export const CATEGORIES = [
  { id: 'armed-conflict',       label: 'Armed conflict / War' },
  { id: 'humanitarian',         label: 'Humanitarian crisis' },
  { id: 'natural-disaster',     label: 'Natural disaster' },
  { id: 'political-repression', label: 'Political repression' },
  { id: 'democracy-crisis',     label: 'Democracy health' },
  { id: 'press-freedom',        label: 'Press freedom' },
  { id: 'climate-watch',        label: 'Climate watch' },
  { id: 'culture-wars',         label: 'Culture wars' },
  { id: 'labor',                label: 'Labor' },
  { id: 'public-health',        label: 'Public health' },
  { id: 'social-health',        label: 'Social health' },
];

// Keywords sourced from IDEA Democracy Tracker controlled vocabulary
// (https://www.idea.int/democracytracker/searchable-archive) and
// GDELT v2 Doc API headline corpus patterns.
const KEYWORD_MAP = {
  'armed-conflict': [
    'airstrike', 'drone strike', 'shelling', 'ground offensive', 'ceasefire', 'war crimes',
    'armed clash', 'siege', 'military offensive', 'artillery bombardment', 'missile attack',
    'troops advance', 'occupation forces', 'killed in fighting', 'rebel forces',
    'ethnic cleansing', 'massacre', 'genocide', 'intrastate war', 'interstate war',
    'armed violence', 'military junta', 'peace agreement', 'peace process',
    'military strike', 'air attack', 'rocket attack', 'mortar attack', 'bomb attack',
    'bombed', 'fired missiles', 'launched attack', 'cross-border attack',
    'killed in strike', 'killed in attack', 'naval attack', 'ballistic missile',
    'us strikes', 'us military', 'us troops', 'american forces',
    'israel strikes', 'israel military', 'israeli forces', 'idf', 'israeli defense',
    'troops deployed', 'military operation', 'forces killed', 'soldiers killed', 'forces attacked'
  ],
  'humanitarian': [
    'famine', 'food insecurity', 'humanitarian access', 'acute malnutrition', 'mass displacement',
    'refugee camp', 'idp camp', 'starvation', 'civilians trapped', 'humanitarian corridor',
    'displaced persons', 'aid blocked', 'cholera outbreak', 'internally displaced', 'flee fighting',
    'forced displacement', 'missing migrants', 'asylum seekers', 'human trafficking',
    'humanitarian aid', 'refugee crisis', 'stateless'
  ],
  'natural-disaster': [
    'earthquake', 'tsunami', 'cyclone', 'hurricane', 'typhoon', 'wildfire', 'flash flood',
    'volcanic eruption', 'landslide', 'heat dome', 'declared state of emergency', 'drought emergency',
    'storm surge', 'disaster relief', 'magnitude',
    'natural disaster'
  ],
  'political-repression': [
    'crackdown', 'opposition leader arrested', 'political prisoner', 'internet shutdown',
    'enforced disappearance', 'arbitrary detention', 'protest ban',
    'detained', 'jailed for', 'torture', 'human rights defender', 'suppressed', 'silenced', 'exile',
    'ice raid', 'ice agents', 'deportation', 'deportations', 'deported', 'immigration raid',
    'immigration enforcement', 'national guard deployed', 'national guard mobilized',
    'migrant roundup', 'mass deportation', 'migrant detention', 'migrant arrests',
    'extrajudicial killing', 'police violence', 'assassination', 'abducted activist',
    'state of emergency', 'curfew imposed', 'morality police', 'political asylum denied',
    'surveillance state', 'mass surveillance', 'impunity', 'human rights abuses'
  ],
  'democracy-crisis': [
    'election interference', 'voter suppression', 'democratic backsliding', 'court packing',
    'disinformation campaign', 'rigged election', 'constitutional coup',
    'emergency powers', 'judicial independence', 'state media',
    'electoral fraud', 'autocratization', 'coup', 'attempted coup',
    'foreign agent law', 'martial law', 'term limits extended', 'impeachment',
    'no confidence vote', 'electoral violence', 'disenfranchisement',
    'deepening authoritarianism', 'democratic contraction', 'polarization crisis',
    'corruption', 'corruption probe', 'corruption charges', 'anti-corruption',
    'bribery', 'bribery scandal', 'embezzlement', 'nepotism', 'kleptocracy',
    'graft', 'kickbacks', 'money laundering', 'illicit enrichment',
    'absence of corruption', 'corrupt official', 'corrupt government'
  ],
  'press-freedom': [
    'press freedom', 'journalist killed', 'journalist arrested', 'journalist detained',
    'reporter killed', 'reporter arrested', 'media shutdown', 'newspaper shut', 'news outlet shut',
    'media crackdown', 'journalist jailed', 'blogger arrested', 'media banned',
    'censored journalist', 'journalists targeted', 'freedom of the press',
    'reporters without borders', 'committee to protect journalists',
    'violence against journalists', 'internet freedom', 'media censorship',
    'news censored', 'broadcaster banned', 'press censorship', 'journalist missing'
  ],
  'climate-watch': [
    'hottest on record', 'sea level rise', 'coral bleaching', 'climate migration', 'extreme heat',
    'heatwave', 'climate tipping point', 'arctic ice', 'climate disaster', 'climate record',
    'carbon emissions', 'net zero', 'ipcc', 'tipping point', 'fossil fuel',
    'climate justice', 'environmental activism', 'environmental protection'
  ],
  'culture-wars': [
    'gender ideology', 'anti-gay law', 'religious nationalism', 'transgender ban', 'abortion ban',
    'reproductive rights', 'blasphemy law', 'book ban', 'theocracy', 'same-sex marriage ban',
    'lgbtq rights', 'lgbtqia', 'drag ban', 'sharia law', 'secularism', 'religious freedom',
    'femicide', 'gender-based violence', 'hate crime', 'indigenous rights',
    'women\'s rights', 'racial discrimination', 'ethnic discrimination',
    'abortion', 'transgender', 'lgbtq', 'same-sex marriage', 'gender rights'
  ],
  'labor': [
    'workers strike', 'general strike', 'labor strike', 'strike action', 'dock strike',
    'transit strike', 'miners strike', 'teachers strike', 'walkout', 'picket line',
    'trade union', 'labor union', 'union busting', 'labor dispute', 'collective bargaining',
    'labor rights', 'workers protest', 'wage theft', 'worker killed', 'workers demand',
    'forced labour', 'labour rights', 'labour union', 'migrant workers',
    'on strike', 'rail strike', 'bus strike', 'port strike', 'nurses strike',
    'industrial action'
  ],
  'public-health': [
    'ebola', 'marburg', 'mpox', 'monkeypox', 'disease outbreak', 'epidemic', 'pandemic',
    'health emergency', 'public health emergency', 'outbreak declared', 'cases confirmed',
    'dengue outbreak', 'yellow fever', 'measles outbreak', 'polio', 'health alert',
    'infectious disease', 'quarantine imposed', 'pathogen', 'virus spreading',
    'cholera epidemic', 'typhoid outbreak', 'meningitis outbreak',
    'virus outbreak', 'health crisis'
  ],
  'social-health': [
    'opioid crisis', 'opioid epidemic', 'fentanyl overdose', 'drug overdose', 'overdose deaths',
    'overdose surge', 'addiction crisis', 'drug epidemic', 'mental health crisis',
    'suicide epidemic', 'hospital closure', 'healthcare collapse', 'medical debt crisis',
    'healthcare access', 'insurance denied', 'mental health emergency',
    'domestic violence', 'gang violence', 'war on drugs', 'organized crime surge',
    'opioid', 'fentanyl', 'overdose', 'mental health', 'addiction'
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
