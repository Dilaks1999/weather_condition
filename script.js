// script.js
const apiKey = 'a44b2d42b49f0fdd5fee4c3dbe1a2e1d'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const forecastContainer = document.getElementById('forecast-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Fetch Weather Data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod === 200) {
      updateCurrentWeather(data);
    } else {
      alert('City not found!');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Update Weather Info
function updateCurrentWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${data.main.temp} °C`;
  weatherDescription.textContent = data.weather[0].description;
}

// Fetch and Update Forecast
async function fetchForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod === '200') {
      updateForecast(data.list);
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
  }
}

// Update Weekly Forecast
function updateForecast(forecastList) {
  forecastContainer.innerHTML = ''; // Clear previous forecast
  forecastList.slice(0, 5).forEach((forecast, index) => {
    const card = document.createElement('div');
    card.className = 'forecast-card';

    // Calculate the forecast date
    const forecastDate = new Date();
    forecastDate.setDate(forecastDate.getDate() + index);

    const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
    const dateString = forecastDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

    card.innerHTML = `
      <p>${dayName}, ${dateString}</p>
      <p>${forecast.main.temp} °C</p>
      <p>${forecast.weather[0].description}</p>
    `;
    forecastContainer.appendChild(card);
  });
}

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Event Listeners
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
  }
});
