import { getWeatherData, buildWeatherUrl } from "./js/apiFncs";
import { createForecastCard, createHourlyForecastCard } from "./js/domFncs";
import { format } from "date-fns";

import "./style.css";

// Initialize default unit
var unit = "C";

// Initialize API key
const API_KEY = "6f8bd4e81e984328bd5121300232106";

// Select elements
var loader = document.querySelector(".loader");
var search = document.querySelector("#search");
var summary = document.querySelector("#summary");
var daily = document.querySelector("#daily-forecast");
var hourly = document.querySelector("#hourly-forecast");
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
var hourlyGrid = document.querySelector("#hourly-grid");

// Get and display weather info
async function displayWeatherInfo(city, unit, initialLoad = false) {
  // Show loader when execution starts
  loader.style.display = "block";
  loader.classList.add("spin");

  // Initialize default city when the page loads for the fist time
  if (initialLoad) {
    city = "Kaduna";
  }

  // Build url for api call
  var url = buildWeatherUrl(API_KEY, city);

  try {
    // Get weather data
    let weatherData = await getWeatherData(url);

    // Throw errors if there are any
    if (weatherData.error) {
      let err = weatherData.error.message;
      throw new Error(err);
    }

    // Show elements
    search.style.display = "block";
    summary.style.display = "flex";
    daily.style.display = "flex";
    hourly.style.display = "flex";

    // Render weather data on respective elements
    renderData(weatherData, unit);

    // Hide loader when execution has completed
    loader.style.display = "none";
  } catch (err) {
    loader.style.display = "none";
    alert(err);
  }
}

// Display weather data based on search input query
var searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener("click", async function () {
  var city = document.querySelector("#input").value;
  displayWeatherInfo(city, unit, false);
});

var searchBox = document.querySelector("#input");
searchBox.addEventListener("keydown", async function (e) {
  var city = document.querySelector("#input").value;
  if (e.key === "Enter") {
    displayWeatherInfo(city, unit, false);
  }
});

// Display current city weather data in Farenheit
farenheit.addEventListener("click", async function () {
  var city = location.textContent;
  unit = "F";
  displayWeatherInfo(city, unit, false);
});

// Display current city weather data in Celsius
celsius.addEventListener("click", async function () {
  var city = location.textContent;
  unit = "C";
  displayWeatherInfo(city, unit, false);
});

function renderData(data, unit) {
  var forecastData = data.forecast.forecastday;

  dailyGrid.replaceChildren();
  hourlyGrid.replaceChildren();

  location.textContent = data.location.name;
  weatherImg.src = data.current.condition.icon;
  weatherDesc.textContent = data.current.condition.text;
  lastUpdated.textContent = `Last updated ${format(
    new Date(data.current.last_updated),
    "h:mm a"
  )}`;

  if (unit === "C") {
    temp.textContent = `${data.current.temp_c}°`;
    feelsLike.textContent = `Feels like ${data.current.feelslike_c}°`;
    wind.textContent = `Wind ${data.current.wind_kph} km/h`;
    windDirection.textContent = `Wind direction ${data.current.wind_dir}`;
    visiblity.textContent = `Visibility ${data.current.vis_km} km`;
    barometer.textContent = `Barometer ${data.current.pressure_mb} mb`;
    humidity.textContent = `Humidity ${data.current.humidity}%`;

    units.style.cssText = "flex-direction: column";
    celsius.classList.add("active");
    farenheit.classList.remove("active");

    for (let dailyForecast of forecastData) {
      let day = format(new Date(dailyForecast.date), "E dd");
      let imgSrc = dailyForecast.day.condition.icon;
      let high_temp = dailyForecast.day.maxtemp_c;
      let low_temp = dailyForecast.day.mintemp_c;
      let description = dailyForecast.day.condition.text;

      let dailyForecastCard = createForecastCard(
        day,
        imgSrc,
        high_temp,
        low_temp,
        description
      );
      dailyGrid.appendChild(dailyForecastCard);
    }

    for (let hourlyForecast of forecastData[0].hour) {
      let time = format(new Date(hourlyForecast.time), "h:mm a");
      let imgSrc = hourlyForecast.condition.icon;
      let temp = hourlyForecast.temp_c;
      let description = hourlyForecast.condition.text;

      let hourlyForecastCard = createHourlyForecastCard(
        time,
        imgSrc,
        temp,
        description
      );
      hourlyGrid.appendChild(hourlyForecastCard);
    }
  } else if (unit === "F") {
    temp.textContent = `${data.current.temp_f}°`;
    feelsLike.textContent = `Feels like ${data.current.feelslike_f}°`;
    wind.textContent = `Wind ${data.current.wind_mph} mph`;
    windDirection.textContent = `Wind direction ${data.current.wind_dir}`;
    visiblity.textContent = `Visibility ${data.current.vis_miles} mi`;
    barometer.textContent = `Barometer ${data.current.pressure_in} in`;
    humidity.textContent = `Humidity ${data.current.humidity}%`;

    units.style.cssText = "flex-direction: column-reverse";
    celsius.classList.remove("active");
    farenheit.classList.add("active");

    for (let forecast of forecastData) {
      let day = format(new Date(forecast.date), "E dd");
      let imgSrc = forecast.day.condition.icon;
      let high_temp = forecast.day.maxtemp_f;
      let low_temp = forecast.day.mintemp_f;
      let description = forecast.day.condition.text;

      let dailyForecastCard = createForecastCard(
        day,
        imgSrc,
        high_temp,
        low_temp,
        description
      );
      dailyGrid.appendChild(dailyForecastCard);
    }

    for (let hourlyForecast of forecastData[0].hour) {
      let time = format(new Date(hourlyForecast.time), "h:mm a");
      let imgSrc = hourlyForecast.condition.icon;
      let temp = hourlyForecast.temp_f;
      let description = hourlyForecast.condition.text;

      let hourlyForecastCard = createHourlyForecastCard(
        time,
        imgSrc,
        temp,
        description
      );
      hourlyGrid.appendChild(hourlyForecastCard);
    }
  }
}

// Display default city weather data on page load
window.onload = async function () {
  displayWeatherInfo("", unit, true);
};
