import "./style.css";

var location = "Kaduna";
const API_KEY = "b8d3446e80544a75995185952231206";

function buildWeatherLocationUrl(api_key, location) {
  return `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;
}

async function getWeatherData() {
  let url = buildWeatherLocationUrl(API_KEY, location);
  const response = await fetch(url, { mod: "cors" });
  const weatherData = await response.json();
  return weatherData;
}

getWeatherData();
