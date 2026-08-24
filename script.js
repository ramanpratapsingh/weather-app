var cityInput = document.getElementById("cityInput");
var result = document.getElementById("result");

// weather code -> [description, icon]
var weatherCodes = {
  0: ["Clear Sky", "☀️"],
  1: ["Mainly Clear", "🌤️"],
  2: ["Partly Cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Fog", "🌫️"],
  51: ["Light Drizzle", "🌦️"],
  61: ["Rain", "🌧️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy Rain", "🌧️"],
  71: ["Snow", "❄️"],
  80: ["Rain Showers", "🌦️"],
  95: ["Thunderstorm", "⛈️"]
};

// background pairs [top, bottom] by temperature range
var themes = {
  cold: ["#24344d", "#0f1626"],
  mild: ["#1c2a45", "#0f1626"],
  hot: ["#4a2f1c", "#241407"]
};

cityInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  var city = cityInput.value.trim();

  if (city === "") {
    result.innerHTML = "<p class='placeholder'>Please enter a city name</p>";
    return;
  }

  result.innerHTML = "<p class='placeholder'>Loading...</p>";

  var geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city);

  fetch(geoUrl)
    .then(function (response) { return response.json(); })
    .then(function (geoData) {
      if (!geoData.results) {
        result.innerHTML = "<p class='placeholder'>City not found</p>";
        return;
      }

      var place = geoData.results[0];
      var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
        "&longitude=" + place.longitude +
        "&current_weather=true&hourly=relativehumidity_2m&timezone=auto";

      fetch(weatherUrl)
        .then(function (response) { return response.json(); })
        .then(function (weatherData) {
          showWeather(place, weatherData);
          saveToHistory(place.name);
        });
    })
    .catch(function () {
      result.innerHTML = "<p class='placeholder'>Something went wrong</p>";
    });
}

function showWeather(place, weatherData) {
  var current = weatherData.current_weather;
  var info = weatherCodes[current.weathercode] || ["Unknown", "🌡️"];

  var humidity = "-";
  var currentHour = current.time.slice(0, 14) + "00";
  var index = weatherData.hourly.time.indexOf(currentHour);
  if (index !== -1) {
    humidity = weatherData.hourly.relativehumidity_2m[index] + "%";
  }

  result.innerHTML =
    "<div class='icon'>" + info[1] + "</div>" +
    "<p class='place'>" + place.name + ", " + place.country + "</p>" +
    "<div class='temp'>" + Math.round(current.temperature) + "&deg;</div>" +
    "<p class='desc'>" + info[0] + "</p>" +
    "<div class='statRow'>" +
    "<div>Wind<b>" + current.windspeed + " km/h</b></div>" +
    "<div>Humidity<b>" + humidity + "</b></div>" +
    "</div>";

  changeBackground(current.temperature);
}

function changeBackground(temp) {
  var pair = themes.mild;

  if (temp <= 10) {
    pair = themes.cold;
  } else if (temp > 25) {
    pair = themes.hot;
  }

  document.body.style.background =
    "radial-gradient(circle at 20% 20%, " + pair[0] + ", " + pair[1] + " 60%)";
}

function saveToHistory(cityName) {
  var history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

  history = history.filter(function (name) { return name !== cityName; });
  history.unshift(cityName);
  history = history.slice(0, 5);

  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  var history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
  var list = document.getElementById("historyList");
  list.innerHTML = "";

  for (var i = 0; i < history.length; i++) {
    var li = document.createElement("li");
    li.textContent = history[i];
    li.onclick = (function (name) {
      return function () {
        cityInput.value = name;
        getWeather();
      };
    })(history[i]);
    list.appendChild(li);
  }
}

renderHistory();
