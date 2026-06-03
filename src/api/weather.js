import { getWeatherDescription } from '../utils/weatherCodes.js';
import { getWeatherQualification } from '../utils/weatherQualifications.js';

export async function fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const current = data.current;
    const temp = Math.round(current.temperature_2m);
    const description = getWeatherDescription(current.weather_code);

    return {
      temp,
      description,
      qualification: getWeatherQualification(temp, description),
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return { temp: '—', description: 'unavailable', qualification: 'unknown' };
  }
}

export async function fetchWeatherBatch(locations) {
  const promises = locations.map(loc =>
    fetchWeather(loc.lat, loc.lon).then(weather => ({ id: loc.id, weather }))
  );

  const results = await Promise.allSettled(promises);
  const weatherMap = {};

  for (const result of results) {
    if (result.status === 'fulfilled') {
      weatherMap[result.value.id] = result.value.weather;
    }
  }

  return weatherMap;
}
