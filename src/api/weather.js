import { getWeatherDescription } from '../utils/weatherCodes.js';

export async function fetchWeather(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const current = data.current;

    return {
      temp: Math.round(current.temperature_2m),
      description: getWeatherDescription(current.weather_code),
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return { temp: '—', description: 'unavailable' };
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
