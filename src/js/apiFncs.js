// Build weather url
function buildWeatherUrl(api_key, location) {
  return `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=10&aqi=no&alerts=no`;
}

// Get weather data
async function getWeatherData(url) {
  const response = await fetch(url, { mod: "cors" });
  const weatherData = await response.json();

  return weatherData;
}

export { buildWeatherUrl, getWeatherData };
