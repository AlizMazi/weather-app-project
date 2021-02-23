
let date = new Date();
let h3 = document.querySelector("h3");

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();

h3.innerHTML = `${day} ${hours}:${minutes}`;



function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

function searchCity(city) {
  let unit= "metric"
  let apiKey = "7f0af20f72ff0311a9e3c0a534f22e07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(currentWeather);
}
function currentWeather(response) {
  let h1 = document.querySelector("#city")
  h1.innerHTML = response.data.name;
  let header = document.querySelector("#temp")
  header.innerHTML = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.weather[0].description;
  let h4 = document.querySelector("#humidity")
  h4.innerHTML = response.data.main.humidity;
  let comfort = document.querySelector("#feels-like")
  comfort.innerHTML = Math.round(response.data.main.feels_like);
  let wind= document.querySelector("#speed")
  wind.innerHTML = Math.round(response.data.wind.speed);
}


  

  function searchPosition(position) {
  let unit="metric";
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let apiKey = "7f0af20f72ff0311a9e3c0a534f22e07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`; 

  axios.get(apiUrl).then(currentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
