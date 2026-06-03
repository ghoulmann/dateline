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
  'Sana\'a': { lat: 15.36, lon: 48.22, country: 'YE', timezone: 'Asia/Aden' },
  'Port Sudan': { lat: 19.61, lon: 37.22, country: 'SD', timezone: 'Africa/Khartoum' },
  'Goma': { lat: -1.67, lon: 29.22, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Bukavu': { lat: -2.51, lon: 28.84, country: 'CD', timezone: 'Africa/Kinshasa' },
  'Aleppo': { lat: 36.20, lon: 37.16, country: 'SY', timezone: 'Asia/Damascus' },
  'Idlib': { lat: 35.93, lon: 36.66, country: 'SY', timezone: 'Asia/Damascus' },
  'Homs': { lat: 34.73, lon: 36.73, country: 'SY', timezone: 'Asia/Damascus' },
  'Istanbul': { lat: 41.01, lon: 28.98, country: 'TR', timezone: 'Europe/Istanbul' },
  'Ankara': { lat: 39.93, lon: 32.87, country: 'TR', timezone: 'Europe/Istanbul' },
  'Tehran': { lat: 35.69, lon: 51.39, country: 'IR', timezone: 'Asia/Tehran' },
  'Baghdad': { lat: 33.31, lon: 44.36, country: 'IQ', timezone: 'Asia/Baghdad' },
  'Fallujah': { lat: 33.30, lon: 43.77, country: 'IQ', timezone: 'Asia/Baghdad' },
  'Mosul': { lat: 36.34, lon: 43.16, country: 'IQ', timezone: 'Asia/Baghdad' },
  'Jerusalem': { lat: 31.77, lon: 35.23, country: 'IL', timezone: 'Asia/Jerusalem' },
  'Tel Aviv': { lat: 32.09, lon: 34.77, country: 'IL', timezone: 'Asia/Jerusalem' },
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
  'Washington': { lat: 38.91, lon: -77.04, country: 'US', timezone: 'America/New_York' },
  'New York': { lat: 40.71, lon: -74.01, country: 'US', timezone: 'America/New_York' },
  'Los Angeles': { lat: 34.05, lon: -118.24, country: 'US', timezone: 'America/Los_Angeles' },
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
};

const COUNTRY_CAPITALS = {
  'PS': 'Gaza', 'UA': 'Kyiv', 'SD': 'Khartoum', 'SO': 'Mogadishu', 'AF': 'Kabul',
  'MM': 'Yangon', 'LB': 'Beirut', 'SY': 'Damascus', 'IQ': 'Baghdad', 'YE': 'Sanaa',
  'HT': 'Port-au-Prince', 'CD': 'Kinshasa', 'SS': 'Juba', 'CF': 'Bangui', 'TD': 'N\'Djamena',
  'NE': 'Niamey', 'ML': 'Bamako', 'BF': 'Ouagadougou', 'NG': 'Lagos', 'KE': 'Nairobi',
  'UG': 'Kampala', 'ET': 'Addis Ababa', 'EG': 'Cairo', 'TR': 'Istanbul', 'IR': 'Tehran',
  'PK': 'Islamabad', 'IN': 'Kolkata', 'BD': 'Dhaka', 'VN': 'Hanoi', 'TH': 'Bangkok',
  'PH': 'Manila', 'ID': 'Jakarta', 'MY': 'Kuala Lumpur', 'SG': 'Singapore', 'HK': 'Hong Kong',
  'TW': 'Taipei', 'JP': 'Tokyo', 'KR': 'Seoul', 'CN': 'Beijing', 'RU': 'Moscow',
  'GB': 'London', 'FR': 'Paris', 'DE': 'Berlin', 'IT': 'Rome', 'ES': 'Madrid',
  'US': 'Washington', 'MX': 'Mexico City', 'PR': 'San Juan', 'VE': 'Caracas', 'CO': 'Bogota',
  'PE': 'Lima', 'BO': 'La Paz', 'BR': 'Sao Paulo', 'AR': 'Buenos Aires', 'CL': 'Santiago',
  'ZA': 'Cape Town',
};

export function resolveLocation(article) {
  const title = article.title || '';
  const countryCode = article.sourcecountry || '';

  for (const [city, coords] of Object.entries(HOTSPOT_TABLE)) {
    if (title.toLowerCase().includes(city.toLowerCase())) {
      return { id: city, ...coords, headline: title };
    }
  }

  const capital = COUNTRY_CAPITALS[countryCode];
  if (capital && HOTSPOT_TABLE[capital]) {
    return { id: capital, ...HOTSPOT_TABLE[capital], headline: title };
  }

  return null;
}

export function getCoordinates(city) {
  return HOTSPOT_TABLE[city] || null;
}
