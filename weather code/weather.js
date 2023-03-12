// Get DOM elements
const form = document.getElementById("location-form");
const locationInput = document.getElementById("location");
const weatherInfo = document.getElementById("weather-info");

// Set API key and base URL
const apiKey = "e432b5c6b62bfa8b79ec326359d97ec0";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Add event listener to the form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent page reload

  // Get location from input
  const location = locationInput.value.trim();
  if (!location) {
    weatherInfo.innerText = "Please enter a location";
    return;
  }

  // Send API request
  const url = `${baseUrl}?q=${location}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Parse response data
      const { name, main, weather } = data;
      const temperature = main.temp;
      const description = weather[0].description;

      // Update UI with weather info
      weatherInfo.innerHTML = `
        <p>Location: ${name}</p>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description}</p>
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherInfo.innerText = "Error fetching weather data";
    });
});

