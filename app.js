// CONSTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit : "celsius"
}

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    // API key from https://openweathermap.org/
    const key = "213bf144a1518d9c6575e714e3c0b156";
    // Const language set as "cz" to show the description and city name in czech language
    const language = "cz";

    // The temperature output from openweathermap.org is in degrees of Kelvin, thus I have to deduct 273 to get the temperature in degrees of Celsius
    const KELVIN = 273;

    let api = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=${language}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="img/whiteicons/${weather.iconId}.svg"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}`;

    //---------------------------------------------------------------------------//

    // SHOWING BACKGROUND PICTURES BASED ON THE WEATHER
    var temperature = weather.temperature.value;
    
    function showImage() {
      let today = new Date(),
      hour = today.getHours();

      const mainPage = document.getElementById('main-page');

      if (temperature <= 6 && hour < 12)  {
        mainPage.style.backgroundImage = "url(img/below0-morning.jpg)";
      } else if (temperature <= 6 && hour >= 12 && hour < 18) {
        mainPage.style.backgroundImage = "url(img/below0-day.jpg)";
      } else if (temperature <= 6 && hour >= 18) {
        mainPage.style.backgroundImage = "url(img/below0-night.jpg)";
      } else if (temperature > 6 && temperature <= 15 && hour < 12) {
        mainPage.style.backgroundImage = "url(img/above0-morning.jpg)";
      } else if (temperature > 6 && temperature <= 15 && hour >= 12 && hour < 18) {
        mainPage.style.backgroundImage = "url(img/above0-day.jpg)";
      } else if (temperature > 6 && temperature <= 15 && hour >= 18) {
        mainPage.style.backgroundImage = "url(img/above0-night.jpg)";
      } else if (temperature > 15 && hour < 12) {
        mainPage.style.backgroundImage = "url(img/above15-morning.jpg)";
      } else if (temperature > 15 && temperature <= 15 && hour >= 12 && hour < 18) {
        mainPage.style.backgroundImage = "url(img/above15-day.jpg)";
      } else if (temperature > 15 && hour >= 18) {
        mainPage.style.backgroundImage = "url(img/above15-night.jpg)";
      } else {
        mainPage.style.backgroundImage = "url(img/default.jpg)";
      }
    }

    showImage();
}

//------------------------------------------------------------------------------------------------------------------------------//

// TIME SECTION

const time = document.getElementById('time');

// Function for showing the time
function showTime() {
  // Get the current time
  var today = new Date();
  
  // Get the current hour and minute
  hour = today.getHours(),
  min = today.getMinutes();

  // Overwrite the time in HTML
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}`;

  setTimeout(showTime, 1000);
}

// Run the function for showing the time
showTime();

// Function for adding zero, when the number of minutes is less than 10
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//------------------------------------------------------------------------------------------------------------------------------//

// CHANGING BACKGROUND SECTION

// Set Background and Greeting
const greeting = document.getElementById('greeting');
console.log(greeting.textContent);

function greet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 12) {
    // Morning  
    greeting.textContent = 'Dobré ráno!';
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = 'Dobré odpoledne!';
  } else {
    // Evening
    greeting.textContent = 'Dobrý večer!';
  }
}

greet();



