function ShowCurrentTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

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
    "December"
  ];

  let year = now.getFullYear();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let today = `${day} ${month} ${date} ${year} ${hours}:${minutes}`;
  return today;
}
let currentTime = document.querySelector(".todaysDate");
currentTime.innerHTML = ShowCurrentTime();

//City Temperature

function getForecast(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].description;

  console.log(response.data.weather[0].description);
  console.log(Math.round(response.data.main.temp));

  let temperatureElement = document.querySelector("#current-temperature");
  let currentCity = document.querySelector("#city");
  let currentDescription = document.querySelector(".temperatureDescription");

  currentCity.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  currentDescription.innerHTML = weatherDescription;
}

function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");

  currentCity.innerHTML = input.value;

  let apiKey = "3b84ea0ac292fdb123e51ed8486c395a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getForecast);
}
let formInput = document.querySelector("#search-city");
formInput.addEventListener("submit", showCity);

function cityCoordinates(position) {
  let apiKey = "3b84ea0ac292fdb123e51ed8486c395a";
  let lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getForecast);
}

//Current Location Co-ordinates

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityCoordinates);
}

let currentWeather = document.querySelector("#current-location");
currentWeather.addEventListener("click", showCurrent);

//Change Temperature - Celsius/Fahrenheit

function changeCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temperature");
  celsiusTemp.innerHTML = 24;
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#current-temperature");
  fahrenheitTemp.innerHTML = 75;
}

let cTemp = document.querySelector("#celsius-temperature");
cTemp.addEventListener("click", changeCelsius);

let fTemp = document.querySelector("#fahrenheit-temperature");
fTemp.addEventListener("click", changeFahrenheit);
