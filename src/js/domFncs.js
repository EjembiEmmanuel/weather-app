// Create daily forecast card
function createDailyForecastCard(
  day,
  imgSrc,
  high_temp,
  low_temp,
  description
) {
  var dailyForecastCard = document.createElement("div");
  dailyForecastCard.setAttribute("class", "daily-card");

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

export { createDailyForecastCard };
