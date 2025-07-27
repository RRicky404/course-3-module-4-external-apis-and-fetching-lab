const API_KEY = "800e03b83653cd447c4d6f78402e9725";

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
    return data; 
  } catch (error) {
    displayError(error.message);
    throw error;
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather-display");
  if (!weatherDiv) return;

  const tempCelsius = Math.round(data.main.temp - 273.15); 

  weatherDiv.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p><strong>Temperature:</strong> ${tempCelsius}°C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
  `;

  const errorDiv = document.getElementById("error-message");
  if (errorDiv) errorDiv.classList.add("hidden");
}

function displayError(message) {
  const errorDiv = document.getElementById("error-message");
  if (!errorDiv) return;

  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("fetch-weather");
  if (button) {
    button.addEventListener("click", () => {
      const city = document.getElementById("city-input").value.trim();
      if (city) {
        fetchWeatherData(city);
      } else {
        displayError("Please enter a city name.");
      }
    });
  }
});


module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError,
};
