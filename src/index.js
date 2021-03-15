
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day = days[date.getDay()];
  return `${day} ${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours=`0${hours}`;
  }
  let minutes= date.getMinutes();
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;

}
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

function todaysTemperature(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML= null;
let forecast= null;


for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `
<div class="col-2">
          <div class="degree"> ${Math.round(forecast.main.temp)}°</div>
          <img id="icons"
            src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
            <br />
             ${formatTime(forecast.dt * 1000)}
        </div>`;
}
}
function searchCity(city) {
  let unit= "metric"
  let apiKey = "7f0af20f72ff0311a9e3c0a534f22e07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(todaysTemperature);
}
function currentWeather(response) {
  let h1 = document.querySelector("#city")
  h1.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  let header = document.querySelector("#temp")
  
  header.innerHTML = Math.round(celsiusTemperature);
  let h2 = document.querySelector("h2");
 
  h2.innerHTML = response.data.weather[0].description;
  let h3 = document.querySelector("h3");
 
  h3.innerHTML = formatDate(response.data.dt * 1000);
  let h4 = document.querySelector("#humidity")
  
  h4.innerHTML = response.data.main.humidity;
  let comfort = document.querySelector("#feels-like")
  
  comfort.innerHTML = Math.round(response.data.main.feels_like);
  let maxTemp = document.querySelector("#maxTemp");
 
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let minTemp = document.querySelector("#minTemp");
  
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let wind= document.querySelector("#speed")
  
  wind.innerHTML = Math.round(response.data.wind.speed *3.6);
  let icon = document.querySelector("#icons")
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt",response.data.weather[0].description);
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function celsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
   let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

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

let fahrenheitLink = document.querySelector("#tempF");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#tempC");
celsiusLink.addEventListener("click", celsiusTemp);

searchCity("Amsterdam");