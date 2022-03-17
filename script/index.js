let todayDayAndTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[todayDayAndTime.getDay()];
let currentHours = String(todayDayAndTime.getHours()).padStart(2, "0");
let currentMinutes = String(todayDayAndTime.getMinutes()).padStart(2, "0");
let todayDay = document.querySelector("#current-day");
let todayTime = document.querySelector("#current-time");
todayDay.innerHTML = `${currentDay}`;
todayTime.innerHTML = `${currentHours}:${currentMinutes}`;

function displayWeatherConditions(response) {
  //console.log(response);
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    "#wind-value"
  ).innerHTML = `${response.data.wind.speed}km/h`;

  document.querySelector(
    "#humidity-value"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#sunrise-value").innerHTML =
    response.data.sys.sunrise;
  document.querySelector("#current-country").innerHTML =
    response.data.sys.country;
  document.querySelector("#current-city").innerHTML = response.data.name;
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
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);
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
