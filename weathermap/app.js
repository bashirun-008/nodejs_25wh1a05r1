// OpenWeatherMap API Key
const API_KEY = "17a7e1cc3e0a9e0f9304bd814e97e23a";

// DOM Elements
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const messageBox = document.getElementById("message");

let weatherChart = null; // Hold Chart.js instance to reset on new queries

// ES6 Arrow Function used as an Event Listener Callback
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    messageBox.textContent = "Please type a city name first.";
    return;
  }

  messageBox.textContent = "Loading forecast data...";
  getWeatherData(city);
});

// ES6 Async/Await function utilizing Promises under the hood
const getWeatherData = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

    // fetch returns a Promise, resolved using 'await'
    const response = await fetch(url);
    const data = await response.json();

    // API returns String "200" for success status
    if (data.cod !== "200") {
      messageBox.textContent = `Error: ${data.message || "City not found."}`;
      return;
    }

    messageBox.textContent = ""; // Clear loading message

    // ES6 Array method .map() with Arrow Functions to format data points
    const times = data.list.map((entry) => entry.dt_txt.slice(5, 16)); // Format: "MM-DD HH:mm"
    const temps = data.list.map((entry) => entry.main.temp);

    drawGraph(times, temps, data.city.name);
  } catch (error) {
    console.error("Fetch Error:", error);
    messageBox.textContent = "Unable to retrieve weather data. Check network or API key.";
  }
};

// Function to render Chart.js Line Graph
const drawGraph = (labels, temperatures, cityName) => {
  const ctx = document.getElementById("weatherChart").getContext("2d");

  // Destroy previous Chart instance to avoid overlapping render bugs
  if (weatherChart !== null) {
    weatherChart.destroy();
  }

  weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Temperature in ${cityName} (°C)`,
          data: temperatures,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: "Date / Time (3-Hour Intervals)" },
        },
        y: {
          title: { display: true, text: "Temperature (°C)" },
        },
      },
    },
  });
};
