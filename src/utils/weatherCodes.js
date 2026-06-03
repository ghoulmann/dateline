const WMO_CODES = {
  0: 'clear sky',
  1: 'mainly clear',
  2: 'partly cloudy',
  3: 'cloudy',
  45: 'foggy',
  48: 'foggy',
  51: 'drizzle',
  53: 'drizzle',
  55: 'heavy drizzle',
  61: 'light rain',
  63: 'rain',
  65: 'heavy rain',
  71: 'light snow',
  73: 'snow',
  75: 'heavy snow',
  77: 'snow grains',
  80: 'light showers',
  81: 'showers',
  82: 'heavy showers',
  85: 'snow showers',
  86: 'heavy snow showers',
  95: 'thunderstorm',
  96: 'thunderstorm with hail',
  99: 'thunderstorm with hail',
};

export function getWeatherDescription(code) {
  return WMO_CODES[code] || 'unknown';
}
