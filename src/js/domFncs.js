// Create forecast card
function createForecastCard(day, imgSrc, high_temp, low_temp, description) {
  var dailyForecastCard = document.createElement("div");
  dailyForecastCard.setAttribute("class", "forecast-card");

  var forecastDay = document.createElement("h3");
  forecastDay.setAttribute("class", "day");
  forecastDay.textContent = day;
  dailyForecastCard.appendChild(forecastDay);

  var forecastImg = document.createElement("img");
  forecastImg.setAttribute("class", "img");
  forecastImg.src = imgSrc;
  dailyForecastCard.appendChild(forecastImg);

  var temp = document.createElement("div");
  temp.setAttribute("class", "temp");

  var highForecastTemp = document.createElement("h3");
  highForecastTemp.setAttribute("class", "high");
  highForecastTemp.textContent = `${high_temp}°`;
  temp.appendChild(highForecastTemp);

  var lowForecastTemp = document.createElement("h3");
  lowForecastTemp.setAttribute("class", "low");
  lowForecastTemp.textContent = `${low_temp}°`;
  temp.appendChild(lowForecastTemp);

  dailyForecastCard.appendChild(temp);

  var forecastDescription = document.createElement("p");
  forecastDescription.setAttribute("class", "desc");
  forecastDescription.textContent = description;
  dailyForecastCard.appendChild(forecastDescription);

  return dailyForecastCard;
}

function createHourlyForecastCard(time, imgSrc, temp, description) {
  var hourlyForecastCard = document.createElement("div");
  hourlyForecastCard.setAttribute("class", "hourly-card");

  var forecastTime = document.createElement("h3");
  forecastTime.setAttribute("class", "time");
  forecastTime.textContent = time;
  hourlyForecastCard.appendChild(forecastTime);

  var forecastImg = document.createElement("img");
  forecastImg.setAttribute("class", "img");
  forecastImg.src = imgSrc;
  hourlyForecastCard.appendChild(forecastImg);

  var forecastTemp = document.createElement("h3");
  forecastTemp.setAttribute("class", "temp");
  forecastTemp.textContent = `${temp}°`;
  hourlyForecastCard.appendChild(forecastTemp);

  var forecastDescription = document.createElement("p");
  forecastDescription.setAttribute("class", "desc");
  forecastDescription.textContent = description;
  hourlyForecastCard.appendChild(forecastDescription);

  return hourlyForecastCard;
}

export { createForecastCard, createHourlyForecastCard };
