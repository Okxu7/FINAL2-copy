  function FormatData(timestamp) {
let data = new Date(timestamp);
let hours = data.getHours();
if (hours < 10) {
 hours = `0${hours}`;   
}
let minutes = data.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = data.getDay(); 
return `${day}  ${hours}:${minutes}`;
  }  

  function formatDay(timestamp) {
   let data = new Date(timestamp * 1000); 
   let day =  data.getDay();
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   return days[day];
  } 




  function displayForecast(response) {  
     console.log(response.data.daily); 
     let forecast =  response.data.daily; 
    let forecastElement = document.querySelector("#forecast");
   
    let forecastHTML = `<div class="row">`;
   
      forecast.forEach(function(forecastDay, index) {
        if (index < 5) {     
          
          forecastHTML =
            forecastHTML +
            `        
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="90"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
                </div>
              </div> 
      `;} 
      });
  forecastHTML = forecastHTML + `</div>`;  
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


function getForecast(coordinates) {
   console.log(coordinates);
let apiKey = "f6738bc1f8964130a4c224735222809";
   let apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name}`;
   //https://api.weatherapi.com/v1/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=&units=metric
   //https://api.openweathermap.org/
   console.log(apiUrl);
   axios.get(apiUrl).then(displayForecast); 
  }
  
  function showTemperature(response) {
    console.log(response.data);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.location.name;

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.current.temp_c);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.current.condition[0];
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.current.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.current.wind_kph);

    celsiusTemperature = response.data.current.temp_с;

    let dataElement = document.querySelector("#data");
    dataElement.innerHTML = FormatData(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://www.weatherapi.com/docs/weather_conditions.csv`
    );
    // https://www.weatherapi.com/docs/conditions.json

    iconElement.setAttribute("alt", response.data.location);
    getForecast(response.data.coord);
  }
//api.weatherapi.com/v1

https: function search(city) {
  let apiKey = "f6738bc1f8964130a4c224735222809";
  let apiUrl = ` http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=07112&days=5`;
  axios.get(apiUrl).then(showTemperature);
}
 
  function  handleSubmit(event) {
event.preventDefault();
let cityInput = document.querySelector("#city-input"); 
search(cityInput.value);
  }     

   function displayFahrenheiTemperature(event) { 
   let temperatureElement = document.querySelector("#temperature"); 
   let fahrenheiTemperature =  celsiusTemperature * 9 / 5 + 32;
   console.log(fahrenheiTemperature);
   temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
   }

   function displayCelsiusTemperature(event) {
   let temperatureElement = document.querySelector("#temperature");  
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
   console.log(celsiusTemperature);
   }
 
let  celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);   
 
let fahrenheiLink = document.querySelector("#fahrenhei-link");
fahrenheiLink.addEventListener("click", displayFahrenheiTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
displayFahrenheiTemperature(77);

  //displayForecast();

/*----function displayForecast(response) {
   So to get current weather for London: JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}
 
To get 7 day weather for US Zipcode 07112: JSON: http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7-*/