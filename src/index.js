let now = new Date();

let date = document.querySelector("#date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let todaysDate = now.getDate();
let year = now.getFullYear();

date.innerHTML = `${day}, ${todaysDate} ${month} ${year} | ${hours}:${minutes}`;

function degreesCelsius(event) {
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = "11º";
}
function degreesFahrenheit(event) {
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = "77º";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", degreesCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", degreesFahrenheit);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "3499ef150985eccadd080ff408a018df";

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showCurrentWeather);
}
function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature}°C`;
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = response.data.name;
}
let weatherForm = document.querySelector("#city-search");
weatherForm.addEventListener("submit", search);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(exactLocation);
}

function exactLocation(position) {
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentLocation);
