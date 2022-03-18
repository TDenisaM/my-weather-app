function formatSunrise(timestamp) {
  let sunrise = new Date(timestamp);
  let hours = String(sunrise.getHours()).padStart(2, "0");
  let minutes = String(sunrise.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let todayDayAndTime = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[todayDayAndTime.getDay()];
  let hours = String(todayDayAndTime.getHours()).padStart(2, "0");
  let minutes = String(todayDayAndTime.getMinutes()).padStart(2, "0");
  return `${day}, ${hours}:${minutes}`;
}

function formatForecastDays(timestamp) {
  let forecastDays = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[forecastDays.getDay()];
  return `${day}`;
}
function formatHourlyTime(timestamp) {
  let hoursDay = new Date(timestamp * 1000);
  let hours = String(hoursDay.getHours()).padStart(2, "0");
  let minutes = String(hoursDay.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function displayHourly(response) {
  let hourly = response.data.hourly;

  let hourlyElement = document.querySelector("#hourly");

  let hourlyHTML = `<div class="row">`;
  hourly.forEach(function (todaysHours, index) {
    if (index < 7 && index > 0) {
      hourlyHTML =
        hourlyHTML +
        `<div class="col-2 now">
            <div>${formatHourlyTime(todaysHours.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              todaysHours.weather[0].icon
            }@2x.png" />
            <div>${Math.round(todaysHours.temp)}°</div>
          </div>`;
    }
  });
  hourlyHTML = hourlyHTML + `</div>`;
  hourlyElement.innerHTML = hourlyHTML;
}

function getHourlyWeather(coordinates) {
  let units = "metric";
  let apiKey = "c263b408beea5a53bf5cae8b844890fd";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiUrl = `${apiEndPoint}lat=${coordinates.lat}&lon=-${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayHourly);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 tue">
            <div>${formatForecastDays(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" />
            <div class="temperature">
              <span class="temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "c263b408beea5a53bf5cae8b844890fd";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiUrl = `${apiEndPoint}lat=${coordinates.lat}&lon=-${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherConditions(response) {
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt
  );

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    "#wind-value"
  ).innerHTML = `${response.data.wind.speed}m/s`;

  document.querySelector(
    "#humidity-value"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#sunrise-value").innerHTML = formatSunrise(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#current-country").innerHTML =
    response.data.sys.country;
  document.querySelector("#current-city").innerHTML = response.data.name;
  let todaysIcon = document.querySelector("#todays-icon");
  todaysIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  todaysIcon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  getHourlyWeather(response.data.coord);
  getForecast(response.data.coord);
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "c263b408beea5a53bf5cae8b844890fd";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c263b408beea5a53bf5cae8b844890fd";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentPositionButton = document.querySelector("#current-location-button");
currentPositionButton.addEventListener("click", getCurrentPosition);

searchCity("Oslo");
