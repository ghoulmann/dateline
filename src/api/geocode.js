const HOTSPOT_TABLE = {
  'Gaza': { lat: 31.5, lon: 34.47, country: 'PS', timezone: 'Asia/Gaza' },
  'Kyiv': { lat: 50.45, lon: 30.52, country: 'UA', timezone: 'Europe/Kyiv' },
  'Khartoum': { lat: 15.55, lon: 32.53, country: 'SD', timezone: 'Africa/Khartoum' },
  'Mogadishu': { lat: 2.05, lon: 45.34, country: 'SO', timezone: 'Africa/Mogadishu' },
  'Kabul': { lat: 34.52, lon: 69.18, country: 'AF', timezone: 'Asia/Kabul' },
  'Yangon': { lat: 16.87, lon: 96.19, country: 'MM', timezone: 'Asia/Yangon' },
  'Beirut': { lat: 33.89, lon: 35.50, country: 'LB', timezone: 'Asia/Beirut' },
  'Damascus': { lat: 33.51, lon: 36.28, country: 'SY', timezone: 'Asia/Damascus' },
  'Baghdad': { lat: 33.31, lon: 44.36, country: 'IQ', timezone: 'Asia/Baghdad' },
  'Sanaa': { lat: 15.36, lon: 48.22, country: 'YE', timezone: 'Asia/Aden' },
  'Port-au-Prince': { lat: 18.97, lon: -72.28, country: 'HT', timezone: 'America/Port-au-Prince' },
  'Kinshasa': { lat: -4.32, lon: 15.31, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Bunia': { lat: 1.58, lon: 30.82, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Kasai': { lat: -5.8, lon: 24.0, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Juba': { lat: 4.85, lon: 31.59, country: 'SS', timezone: 'Africa/Juba' },
  'Bangui': { lat: 4.36, lon: 18.55, country: 'CF', timezone: 'Africa/Bangui' },
  'N\'Djamena': { lat: 12.13, lon: 15.06, country: 'TD', timezone: 'Africa/Ndjamena' },
  'Niamey': { lat: 13.51, lon: 2.13, country: 'NE', timezone: 'Africa/Niamey' },
  'Bamako': { lat: 12.65, lon: -8.0, country: 'ML', timezone: 'Africa/Bamako' },
  'Ouagadougou': { lat: 12.37, lon: -1.52, country: 'BF', timezone: 'Africa/Ouagadougou' },
  'Abuja': { lat: 9.08, lon: 7.53, country: 'NG', timezone: 'Africa/Lagos' },
  'Lagos': { lat: 6.52, lon: 3.36, country: 'NG', timezone: 'Africa/Lagos' },
  'Nairobi': { lat: -1.29, lon: 36.82, country: 'KE', timezone: 'Africa/Nairobi' },
  'Kampala': { lat: 0.35, lon: 32.58, country: 'UG', timezone: 'Africa/Kampala' },
  'Addis Ababa': { lat: 9.03, lon: 38.74, country: 'ET', timezone: 'Africa/Addis_Ababa' },
  'Cairo': { lat: 30.05, lon: 31.24, country: 'EG', timezone: 'Africa/Cairo' },
  'Muscat': { lat: 23.59, lon: 58.38, country: 'OM', timezone: 'Asia/Muscat' },
  'Nicosia': { lat: 35.18, lon: 33.36, country: 'CY', timezone: 'Asia/Nicosia' },
  'Asmara': { lat: 15.33, lon: 38.93, country: 'ER', timezone: 'Africa/Asmara' },
  'Antananarivo': { lat: -18.91, lon: 47.53, country: 'MG', timezone: 'Indian/Antananarivo' },
  'Moroni': { lat: -11.70, lon: 43.25, country: 'KM', timezone: 'Indian/Comoro' },
  'Port Louis': { lat: -20.17, lon: 57.50, country: 'MU', timezone: 'Indian/Mauritius' },
  'Lilongwe': { lat: -13.97, lon: 33.79, country: 'MW', timezone: 'Africa/Blantyre' },
  'Kigali': { lat: -1.95, lon: 30.05, country: 'RW', timezone: 'Africa/Kigali' },
  'Dodoma': { lat: -6.17, lon: 35.74, country: 'TZ', timezone: 'Africa/Dar_es_Salaam' },
  'Gitega': { lat: -3.42, lon: 29.93, country: 'BI', timezone: 'Africa/Bujumbura' },
  'Victoria': { lat: -4.62, lon: 55.45, country: 'SC', timezone: 'Indian/Mahe' },
  'Brazzaville': { lat: -4.27, lon: 15.28, country: 'CG', timezone: 'Africa/Brazzaville' },
  'Ottawa': { lat: 45.42, lon: -75.69, country: 'CA', timezone: 'America/Toronto' },
  'Canberra': { lat: -35.28, lon: 149.13, country: 'AU', timezone: 'Australia/Sydney' },
  'Wellington': { lat: -41.29, lon: 174.78, country: 'NZ', timezone: 'Pacific/Auckland' },
  'Dublin': { lat: 53.35, lon: -6.26, country: 'IE', timezone: 'Europe/Dublin' },
  'Amsterdam': { lat: 52.37, lon: 4.90, country: 'NL', timezone: 'Europe/Amsterdam' },
  'Brussels': { lat: 50.85, lon: 4.35, country: 'BE', timezone: 'Europe/Brussels' },
  'Bern': { lat: 46.95, lon: 7.45, country: 'CH', timezone: 'Europe/Zurich' },
  'Copenhagen': { lat: 55.68, lon: 12.57, country: 'DK', timezone: 'Europe/Copenhagen' },
  'Oslo': { lat: 59.91, lon: 10.75, country: 'NO', timezone: 'Europe/Oslo' },
  'Helsinki': { lat: 60.17, lon: 24.94, country: 'FI', timezone: 'Europe/Helsinki' },
  'Lisbon': { lat: 38.72, lon: -9.14, country: 'PT', timezone: 'Europe/Lisbon' },
  'Athens': { lat: 37.98, lon: 23.72, country: 'GR', timezone: 'Europe/Athens' },
  'Quito': { lat: -0.18, lon: -78.47, country: 'EC', timezone: 'America/Guayaquil' },
  'Asuncion': { lat: -25.30, lon: -57.63, country: 'PY', timezone: 'America/Asuncion' },
  'Montevideo': { lat: -34.90, lon: -56.17, country: 'UY', timezone: 'America/Montevideo' },
  'Port Sudan': { lat: 19.61, lon: 37.22, country: 'SD', timezone: 'Africa/Khartoum' },
  'Goma': { lat: -1.67, lon: 29.22, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Bukavu': { lat: -2.51, lon: 28.84, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Aleppo': { lat: 36.20, lon: 37.16, country: 'SY', timezone: 'Asia/Damascus' },
  'Idlib': { lat: 35.93, lon: 36.66, country: 'SY', timezone: 'Asia/Damascus' },
  'Homs': { lat: 34.73, lon: 36.73, country: 'SY', timezone: 'Asia/Damascus' },
  'Istanbul': { lat: 41.01, lon: 28.98, country: 'TR', timezone: 'Europe/Istanbul' },
  'Ankara': { lat: 39.93, lon: 32.87, country: 'TR', timezone: 'Europe/Istanbul' },
  'Tehran': { lat: 35.69, lon: 51.39, country: 'IR', timezone: 'Asia/Tehran' },
  'Fallujah': { lat: 33.30, lon: 43.77, country: 'IQ', timezone: 'Asia/Baghdad' },
  'Mosul': { lat: 36.34, lon: 43.16, country: 'IQ', timezone: 'Asia/Baghdad' },
  'Jerusalem': { lat: 31.77, lon: 35.23, country: 'IL', timezone: 'Asia/Jerusalem' },
  'Tel Aviv': { lat: 32.09, lon: 34.77, country: 'IL', timezone: 'Asia/Jerusalem' },
  'Ramallah': { lat: 31.90, lon: 35.21, country: 'PS', timezone: 'Asia/Jerusalem' },
  'Quetta': { lat: 30.18, lon: 66.98, country: 'PK', timezone: 'Asia/Karachi' },
  'Islamabad': { lat: 33.68, lon: 73.04, country: 'PK', timezone: 'Asia/Karachi' },
  'Peshawar': { lat: 34.01, lon: 71.57, country: 'PK', timezone: 'Asia/Karachi' },
  'Lahore': { lat: 31.54, lon: 74.35, country: 'PK', timezone: 'Asia/Karachi' },
  'Srinagar': { lat: 34.08, lon: 75.58, country: 'IN', timezone: 'Asia/Kolkata' },
  'Manipur': { lat: 24.66, lon: 93.91, country: 'IN', timezone: 'Asia/Kolkata' },
  'Assam': { lat: 26.2, lon: 92.9, country: 'IN', timezone: 'Asia/Kolkata' },
  'Dhaka': { lat: 23.81, lon: 90.41, country: 'BD', timezone: 'Asia/Dhaka' },
  'Kolkata': { lat: 22.57, lon: 88.36, country: 'IN', timezone: 'Asia/Kolkata' },
  'Ho Chi Minh City': { lat: 10.76, lon: 106.70, country: 'VN', timezone: 'Asia/Ho_Chi_Minh' },
  'Hanoi': { lat: 21.03, lon: 105.84, country: 'VN', timezone: 'Asia/Ho_Chi_Minh' },
  'Bangkok': { lat: 13.74, lon: 100.50, country: 'TH', timezone: 'Asia/Bangkok' },
  'Manila': { lat: 14.60, lon: 120.98, country: 'PH', timezone: 'Asia/Manila' },
  'Jakarta': { lat: -6.21, lon: 106.85, country: 'ID', timezone: 'Asia/Jakarta' },
  'Kuala Lumpur': { lat: 3.14, lon: 101.68, country: 'MY', timezone: 'Asia/Kuala_Lumpur' },
  'Singapore': { lat: 1.35, lon: 103.82, country: 'SG', timezone: 'Asia/Singapore' },
  'Hong Kong': { lat: 22.30, lon: 114.18, country: 'HK', timezone: 'Asia/Hong_Kong' },
  'Taipei': { lat: 25.03, lon: 121.56, country: 'TW', timezone: 'Asia/Taipei' },
  'Tokyo': { lat: 35.68, lon: 139.69, country: 'JP', timezone: 'Asia/Tokyo' },
  'Seoul': { lat: 37.57, lon: 126.98, country: 'KR', timezone: 'Asia/Seoul' },
  'Beijing': { lat: 39.90, lon: 116.41, country: 'CN', timezone: 'Asia/Shanghai' },
  'Shanghai': { lat: 31.23, lon: 121.47, country: 'CN', timezone: 'Asia/Shanghai' },
  'Moscow': { lat: 55.75, lon: 37.62, country: 'RU', timezone: 'Europe/Moscow' },
  'London': { lat: 51.51, lon: -0.13, country: 'GB', timezone: 'Europe/London' },
  'Paris': { lat: 48.86, lon: 2.35, country: 'FR', timezone: 'Europe/Paris' },
  'Berlin': { lat: 52.52, lon: 13.40, country: 'DE', timezone: 'Europe/Berlin' },
  'Rome': { lat: 41.90, lon: 12.50, country: 'IT', timezone: 'Europe/Rome' },
  'Madrid': { lat: 40.42, lon: -3.70, country: 'ES', timezone: 'Europe/Madrid' },
  'Warsaw': { lat: 52.23, lon: 21.01, country: 'PL', timezone: 'Europe/Warsaw' },
  'Budapest': { lat: 47.50, lon: 19.04, country: 'HU', timezone: 'Europe/Budapest' },
  'Prague': { lat: 50.09, lon: 14.42, country: 'CZ', timezone: 'Europe/Prague' },
  'Vienna': { lat: 48.21, lon: 16.37, country: 'AT', timezone: 'Europe/Vienna' },
  'Stockholm': { lat: 59.33, lon: 18.07, country: 'SE', timezone: 'Europe/Stockholm' },
  'Washington': { lat: 38.91, lon: -77.04, country: 'US', timezone: 'America/New_York' },
  'New York': { lat: 40.71, lon: -74.01, country: 'US', timezone: 'America/New_York' },
  'Los Angeles': { lat: 34.05, lon: -118.24, country: 'US', timezone: 'America/Los_Angeles' },
  'Chicago': { lat: 41.88, lon: -87.63, country: 'US', timezone: 'America/Chicago' },
  'Houston': { lat: 29.76, lon: -95.37, country: 'US', timezone: 'America/Chicago' },
  'Phoenix': { lat: 33.45, lon: -112.07, country: 'US', timezone: 'America/Phoenix' },
  'Philadelphia': { lat: 39.95, lon: -75.17, country: 'US', timezone: 'America/New_York' },
  'San Antonio': { lat: 29.42, lon: -98.49, country: 'US', timezone: 'America/Chicago' },
  'San Diego': { lat: 32.72, lon: -117.16, country: 'US', timezone: 'America/Los_Angeles' },
  'Dallas': { lat: 32.78, lon: -96.80, country: 'US', timezone: 'America/Chicago' },
  'San Jose': { lat: 37.34, lon: -121.89, country: 'US', timezone: 'America/Los_Angeles' },
  'Austin': { lat: 30.27, lon: -97.74, country: 'US', timezone: 'America/Chicago' },
  'Jacksonville': { lat: 30.33, lon: -81.66, country: 'US', timezone: 'America/New_York' },
  'Fort Worth': { lat: 32.76, lon: -97.33, country: 'US', timezone: 'America/Chicago' },
  'Columbus': { lat: 39.96, lon: -82.99, country: 'US', timezone: 'America/New_York' },
  'Charlotte': { lat: 35.23, lon: -80.84, country: 'US', timezone: 'America/New_York' },
  'San Francisco': { lat: 37.77, lon: -122.41, country: 'US', timezone: 'America/Los_Angeles' },
  'Indianapolis': { lat: 39.77, lon: -86.16, country: 'US', timezone: 'America/Indiana/Indianapolis' },
  'Denver': { lat: 39.74, lon: -104.99, country: 'US', timezone: 'America/Denver' },
  'Seattle': { lat: 47.61, lon: -122.33, country: 'US', timezone: 'America/Los_Angeles' },
  'Boston': { lat: 42.36, lon: -71.06, country: 'US', timezone: 'America/New_York' },
  'Portland': { lat: 45.52, lon: -122.68, country: 'US', timezone: 'America/Los_Angeles' },
  'Miami': { lat: 25.76, lon: -80.19, country: 'US', timezone: 'America/New_York' },
  'Atlanta': { lat: 33.75, lon: -84.39, country: 'US', timezone: 'America/New_York' },
  'Mexico City': { lat: 19.43, lon: -99.13, country: 'MX', timezone: 'America/Mexico_City' },
  'San Juan': { lat: 18.47, lon: -66.11, country: 'PR', timezone: 'America/Puerto_Rico' },
  'Caracas': { lat: 10.49, lon: -66.86, country: 'VE', timezone: 'America/Caracas' },
  'Bogota': { lat: 4.71, lon: -74.07, country: 'CO', timezone: 'America/Bogota' },
  'Lima': { lat: -12.05, lon: -77.04, country: 'PE', timezone: 'America/Lima' },
  'La Paz': { lat: -16.50, lon: -68.15, country: 'BO', timezone: 'America/La_Paz' },
  'Sao Paulo': { lat: -23.55, lon: -46.63, country: 'BR', timezone: 'America/Sao_Paulo' },
  'Rio de Janeiro': { lat: -22.91, lon: -43.17, country: 'BR', timezone: 'America/Sao_Paulo' },
  'Buenos Aires': { lat: -34.60, lon: -58.38, country: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
  'Santiago': { lat: -33.45, lon: -70.67, country: 'CL', timezone: 'America/Santiago' },
  'Cape Town': { lat: -33.92, lon: 18.42, country: 'ZA', timezone: 'Africa/Johannesburg' },
  'Johannesburg': { lat: -26.20, lon: 28.04, country: 'ZA', timezone: 'Africa/Johannesburg' },
  'Havana': { lat: 23.13, lon: -82.38, country: 'CU', timezone: 'America/Havana' },
  'Tripoli': { lat: 32.90, lon: 13.18, country: 'LY', timezone: 'Africa/Tripoli' },
  'Djibouti': { lat: 11.59, lon: 43.15, country: 'DJ', timezone: 'Africa/Djibouti' },
  'Amman': { lat: 31.96, lon: 35.94, country: 'JO', timezone: 'Asia/Amman' },
  'Riyadh': { lat: 24.69, lon: 46.72, country: 'SA', timezone: 'Asia/Riyadh' },
  'Doha': { lat: 25.29, lon: 51.53, country: 'QA', timezone: 'Asia/Qatar' },
  'Manama': { lat: 26.21, lon: 50.59, country: 'BH', timezone: 'Asia/Bahrain' },
  'Abu Dhabi': { lat: 24.47, lon: 54.37, country: 'AE', timezone: 'Asia/Dubai' },
  'Kuwait City': { lat: 29.37, lon: 47.98, country: 'KW', timezone: 'Asia/Kuwait' },
  'Tunis': { lat: 36.82, lon: 10.17, country: 'TN', timezone: 'Africa/Tunis' },
  'Nouakchott': { lat: 18.08, lon: -15.97, country: 'MR', timezone: 'Africa/Nouakchott' },
  'Yaoundé': { lat: 3.87, lon: 11.52, country: 'CM', timezone: 'Africa/Douala' },
  'Tegucigalpa': { lat: 14.10, lon: -87.21, country: 'HN', timezone: 'America/Tegucigalpa' },
  'San Salvador': { lat: 13.69, lon: -89.19, country: 'SV', timezone: 'America/El_Salvador' },
  'Guatemala City': { lat: 14.64, lon: -90.51, country: 'GT', timezone: 'America/Guatemala' },
  'Panama City': { lat: 8.99, lon: -79.52, country: 'PA', timezone: 'America/Panama' },
  'Maputo': { lat: -25.96, lon: 32.59, country: 'MZ', timezone: 'Africa/Maputo' },
};

const COUNTRY_CAPITALS = {
  'PS': 'Gaza', 'UA': 'Kyiv', 'SD': 'Khartoum', 'SO': 'Mogadishu', 'AF': 'Kabul',
  'MM': 'Yangon', 'LB': 'Beirut', 'SY': 'Damascus', 'IQ': 'Baghdad', 'YE': 'Sanaa',
  'HT': 'Port-au-Prince', 'CD': 'Kinshasa', 'SS': 'Juba', 'CF': 'Bangui', 'TD': 'N\'Djamena',
  'NE': 'Niamey', 'ML': 'Bamako', 'BF': 'Ouagadougou', 'NG': 'Lagos', 'KE': 'Nairobi',
  'UG': 'Kampala', 'ET': 'Addis Ababa', 'EG': 'Cairo', 'TR': 'Ankara', 'IR': 'Tehran',
  'OM': 'Muscat', 'CY': 'Nicosia', 'ER': 'Asmara', 'MG': 'Antananarivo', 'KM': 'Moroni',
  'MU': 'Port Louis', 'MW': 'Lilongwe', 'RW': 'Kigali', 'TZ': 'Dodoma', 'BI': 'Gitega',
  'SC': 'Victoria', 'PK': 'Islamabad', 'IN': 'Kolkata', 'BD': 'Dhaka', 'VN': 'Hanoi', 'TH': 'Bangkok',
  'PH': 'Manila', 'ID': 'Jakarta', 'MY': 'Kuala Lumpur', 'SG': 'Singapore', 'HK': 'Hong Kong',
  'TW': 'Taipei', 'JP': 'Tokyo', 'KR': 'Seoul', 'CN': 'Beijing', 'RU': 'Moscow',
  'GB': 'London', 'FR': 'Paris', 'DE': 'Berlin', 'IT': 'Rome', 'ES': 'Madrid',
  'US': 'Washington', 'MX': 'Mexico City', 'PR': 'San Juan', 'VE': 'Caracas', 'CO': 'Bogota',
  'PE': 'Lima', 'BO': 'La Paz', 'BR': 'Sao Paulo', 'AR': 'Buenos Aires', 'CL': 'Santiago',
  'ZA': 'Cape Town', 'HU': 'Budapest', 'CZ': 'Prague', 'AT': 'Vienna', 'SE': 'Stockholm',
  'PL': 'Warsaw', 'CU': 'Havana', 'LY': 'Tripoli', 'DJ': 'Djibouti', 'JO': 'Amman',
  'SA': 'Riyadh', 'QA': 'Doha', 'BH': 'Manama', 'AE': 'Abu Dhabi', 'KW': 'Kuwait City',
  'TN': 'Tunis', 'MR': 'Nouakchott', 'CM': 'Yaoundé', 'HN': 'Tegucigalpa', 'SV': 'San Salvador',
  'GT': 'Guatemala City', 'PA': 'Panama City', 'MZ': 'Maputo',
  'CA': 'Ottawa', 'AU': 'Canberra', 'NZ': 'Wellington', 'IE': 'Dublin',
  'NL': 'Amsterdam', 'BE': 'Brussels', 'CH': 'Bern', 'DK': 'Copenhagen',
  'NO': 'Oslo', 'FI': 'Helsinki', 'PT': 'Lisbon', 'GR': 'Athens',
  'CG': 'Brazzaville', 'EC': 'Quito', 'PY': 'Asuncion', 'UY': 'Montevideo',
  'IL': 'Jerusalem', 'FJ': 'Pacific',
};

// Simple country name -> ISO code map for title-based detection.
const COUNTRY_NAME_MAP = {
  'iran': 'IR', 'tehran': 'IR', 'israel': 'IL', 'palestine': 'PS', 'gaza': 'PS',
  'ukraine': 'UA', 'russia': 'RU', 'syria': 'SY', 'iraq': 'IQ', 'yemen': 'YE',
  'afghanistan': 'AF', 'china': 'CN', 'russia': 'RU', 'egypt': 'EG', 'libya': 'LY'
};

// Runtime alias maps (can be populated from an ontology JSON)
const CITY_ALIAS_MAP = {}; // aliasLower -> canonicalCity
const COUNTRY_ALIAS_MAP = {}; // aliasLower -> countryCode

export function setAliases({ city_aliases = {}, country_aliases = {} } = {}) {
  for (const [alias, city] of Object.entries(city_aliases)) {
    CITY_ALIAS_MAP[alias.toLowerCase()] = city;
  }
  for (const [alias, code] of Object.entries(country_aliases)) {
    COUNTRY_ALIAS_MAP[alias.toLowerCase()] = code;
  }
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const DATELINE_CITIES = new Set([
  'washington', 'new york'
]);

const DATELINE_VERBS = [
  'reports', 'says', 'announces', 'warns', 'claims', 'states', 'tells',
  'notes', 'confirms', 'adds', 'declares', 'reveals'
];

function isDatelineHeadline(titleLower, cityLower) {
  if (!DATELINE_CITIES.has(cityLower)) return false;
  const cityPattern = `\\b${escapeRegExp(cityLower)}\\b`;
  const verbPattern = `\\b(?:${DATELINE_VERBS.join('|')})\\b`;
  const datelineRegex = new RegExp(`${cityPattern}.*${verbPattern}|${verbPattern}.*${cityPattern}`);
  return datelineRegex.test(titleLower);
}

function hasDatelineSourceCity(titleLower) {
  return [...DATELINE_CITIES].some((cityLower) => isDatelineHeadline(titleLower, cityLower));
}

const COUNTRY_FALLBACKS = {
  US: { id: 'United States', lat: 39.50, lon: -98.35, country: 'US', timezone: 'America/Chicago' },
};

export function resolveLocation(article) {
  const title = article.title || '';
  const countryCode = article.sourcecountry || '';
  const titleLower = title.toLowerCase();

  // check city aliases registered from ontology
  for (const [aliasLower, canonicalCity] of Object.entries(CITY_ALIAS_MAP)) {
    if (titleLower.includes(aliasLower)) {
      if (HOTSPOT_TABLE[canonicalCity]) return { id: canonicalCity, ...HOTSPOT_TABLE[canonicalCity], headline: title };
    }
  }

  for (const [city, coords] of Object.entries(HOTSPOT_TABLE)) {
    const cityLower = city.toLowerCase();
    if (titleLower.includes(cityLower)) {
      if (isDatelineHeadline(titleLower, cityLower)) {
        continue;
      }
      return { id: city, ...coords, headline: title };
    }
  }

  // If the headline mentions a known country name, map to that country's capital/hotspot
  // first allow ontology-provided country aliases: choose the rightmost match (likely the target)
  const countryMatches = [];
  for (const [aliasLower, code] of Object.entries(COUNTRY_ALIAS_MAP)) {
    const idx = titleLower.indexOf(aliasLower);
    if (idx >= 0) countryMatches.push({ alias: aliasLower, code, idx });
  }
  for (const [name, code] of Object.entries(COUNTRY_NAME_MAP)) {
    const idx = titleLower.indexOf(name);
    if (idx >= 0) countryMatches.push({ alias: name, code, idx });
  }

  if (countryMatches.length > 0) {
    // pick the rightmost occurrence (highest index)
    countryMatches.sort((a, b) => b.idx - a.idx);
    const chosen = countryMatches[0];
    const capital = COUNTRY_CAPITALS[chosen.code];
    if (capital && HOTSPOT_TABLE[capital]) return { id: capital, ...HOTSPOT_TABLE[capital], headline: title };
  }

  const capital = COUNTRY_CAPITALS[countryCode];
  if (capital && HOTSPOT_TABLE[capital]) {
    if (countryCode === 'US' && hasDatelineSourceCity(titleLower)) {
      return { ...COUNTRY_FALLBACKS[countryCode], headline: title };
    }

    if (isDatelineHeadline(titleLower, capital.toLowerCase())) {
      if (COUNTRY_FALLBACKS[countryCode]) {
        return { ...COUNTRY_FALLBACKS[countryCode], headline: title };
      }
      return null;
    }
    return { id: capital, ...HOTSPOT_TABLE[capital], headline: title };
  }

  return null;
}

export function getCoordinates(city) {
  return HOTSPOT_TABLE[city] || null;
}
