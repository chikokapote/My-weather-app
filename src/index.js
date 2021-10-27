let now = new Date();
console.log(now);
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = now.getDate();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${day} ${currentDate}, ${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#new-city");
  cityElement.innerHTML = `${response.data.name}`;
  let updateWeather = document.querySelector("h1");
  updateWeather.innerHTML = `${temperature}°C ${response.data.weather[0].description}`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  console.log(searchInput.value);
  let cityName = document.querySelector("#new-city");
  cityName.innerHTML = `${searchInput.value}`;
  let city = searchInput.value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "710c90fd333e25fd5830a625b5818d02";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let Form = document.querySelector("#search-form");
Form.addEventListener("submit", searchCity);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "710c90fd333e25fd5830a625b5818d02";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoLocation = document.querySelector("#current-location-button");
geoLocation.addEventListener("click", currentLocation);
