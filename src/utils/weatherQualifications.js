export function getWeatherQualification(temp, weatherDescription) {
  const description = weatherDescription.toLowerCase();

  const tempQual = getTempQualification(temp);
  const condQual = getConditionQualification(description);

  return `${condQual}, ${tempQual}`;
}

function getTempQualification(temp) {
  if (temp < 0) return 'freezing';
  if (temp < 5) return 'very cold';
  if (temp < 10) return 'cold';
  if (temp < 15) return 'cool';
  if (temp < 20) return 'mild';
  if (temp < 25) return 'pleasant';
  if (temp < 30) return 'warm';
  if (temp < 35) return 'hot';
  if (temp < 40) return 'very hot';
  return 'sweltering';
}

function getConditionQualification(description) {
  if (description.includes('clear') || description.includes('sunny')) return 'clear';
  if (description.includes('mainly clear')) return 'mostly clear';
  if (description.includes('partly cloudy')) return 'partly cloudy';
  if (description.includes('cloudy')) return 'overcast';
  if (description.includes('foggy')) return 'foggy';
  if (description.includes('drizzle')) return 'drizzling';
  if (description.includes('light rain')) return 'light rain';
  if (description.includes('rain') || description.includes('showers')) return 'rainy';
  if (description.includes('heavy rain') || description.includes('heavy showers')) return 'heavy rain';
  if (description.includes('light snow')) return 'light snow';
  if (description.includes('snow')) return 'snowy';
  if (description.includes('thunderstorm')) return 'stormy';
  return 'fair';
}
