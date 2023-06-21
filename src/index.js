import { getWeatherData, buildWeatherUrl } from "./js/apiFncs";
import { createDailyForecastCard } from "./js/domFncs";
import { format } from "date-fns";

import "./style.css";

// Initialize default location and API key
var defaultLocation = "Kaduna";
const API_KEY = "6f8bd4e81e984328bd5121300232106";

// Initialize current city
var currentCity = defaultLocation;

// Build default url
var defaultWeatherUrl = buildWeatherUrl(API_KEY, defaultLocation);

// Select elements
var location = document.querySelector("#location");
var weatherImg = document.querySelector("#img").firstElementChild;
var temp = document.querySelector("#value");
var weatherDesc = document.querySelector("#weather-description");
var lastUpdated = document.querySelector("#last-updated");
var feelsLike = document.querySelector("#feels-like");
var wind = document.querySelector("#wind");
var windDirection = document.querySelector("#wind-direction");
var visiblity = document.querySelector("#visibility");
var barometer = document.querySelector("#barometer");
var humidity = document.querySelector("#humidity");
var units = document.querySelector("#units");
var celsius = document.querySelector("#celsius");
var farenheit = document.querySelector("#farenheit");
var dailyGrid = document.querySelector("#daily-grid");

// Display weather data based on search input query
var searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener("click", async function () {
  var input = document.querySelector("#input").value;
  currentCity = input;

  var url = buildWeatherUrl(API_KEY, input);

  var weatherData = await getWeatherData(url);
  renderCelsiusData(weatherData);
});

// Display current city weather data in Farenheit
farenheit.addEventListener("click", async function () {
  var url = buildWeatherUrl(API_KEY, currentCity);

  var weatherData = await getWeatherData(url);
  renderFarenheitData(weatherData);
});

// Display current city weather data in Celsius
celsius.addEventListener("click", async function () {
  var url = buildWeatherUrl(API_KEY, currentCity);

  var weatherData = await getWeatherData(url);
  renderCelsiusData(weatherData);
});

function renderCelsiusData(data) {
  location.textContent = data.location.name;
  weatherImg.src = data.current.condition.icon;
  temp.textContent = `${data.current.temp_c}°`;
  weatherDesc.textContent = data.current.condition.text;
  lastUpdated.textContent = `Last updated ${format(
    new Date(data.current.last_updated),
    "hh:mm a"
  )}`;
  feelsLike.textContent = `Feels like ${data.current.feelslike_c}°`;
  wind.textContent = `Wind ${data.current.wind_kph} km/h`;
  windDirection.textContent = `Wind direction ${data.current.wind_dir}`;
  visiblity.textContent = `Visibility ${data.current.vis_km} km`;
  barometer.textContent = `Barometer ${data.current.pressure_mb} mb`;
  humidity.textContent = `Humidity ${data.current.humidity}%`;

  units.style.cssText = "flex-direction: column";
  celsius.classList.add("active");
  farenheit.classList.remove("active");

  var forecastData = data.forecast.forecastday;

  dailyGrid.replaceChildren();

  for (let forecast of forecastData) {
    let day = format(new Date(forecast.date), "E dd");
    let imgSrc = forecast.day.condition.icon;
    let high_temp = forecast.day.maxtemp_c;
    let low_temp = forecast.day.mintemp_c;
    let description = forecast.day.condition.text;

    let dailyForecastCard = createDailyForecastCard(
      day,
      imgSrc,
      high_temp,
      low_temp,
      description
    );
    dailyGrid.appendChild(dailyForecastCard);
  }
}

function renderFarenheitData(data) {
  location.textContent = data.location.name;
  weatherImg.src = data.current.condition.icon;
  temp.textContent = `${data.current.temp_f}°`;
  weatherDesc.textContent = data.current.condition.text;
  lastUpdated.textContent = `Last updated ${format(
    new Date(data.current.last_updated),
    "hh:mm a"
  )}`;
  feelsLike.textContent = `Feels like ${data.current.feelslike_f}°`;
  wind.textContent = `Wind ${data.current.wind_mph} mph`;
  windDirection.textContent = `Wind direction ${data.current.wind_dir}`;
  visiblity.textContent = `Visibility ${data.current.vis_miles} mi`;
  barometer.textContent = `Barometer ${data.current.pressure_in} in`;
  humidity.textContent = `Humidity ${data.current.humidity}%`;

  units.style.cssText = "flex-direction: column-reverse";
  celsius.classList.remove("active");
  farenheit.classList.add("active");

  var forecastData = data.forecast.forecastday;

  dailyGrid.replaceChildren();

  for (let forecast of forecastData) {
    let day = format(new Date(forecast.date), "E dd");
    let imgSrc = forecast.day.condition.icon;
    let high_temp = forecast.day.maxtemp_f;
    let low_temp = forecast.day.mintemp_f;
    let description = forecast.day.condition.text;

    let dailyForecastCard = createDailyForecastCard(
      day,
      imgSrc,
      high_temp,
      low_temp,
      description
    );
    dailyGrid.appendChild(dailyForecastCard);
  }
}

// Display default city weather data on page load
window.onload = async function () {
  var weatherData = await getWeatherData(defaultWeatherUrl);

  renderCelsiusData(weatherData);
};
