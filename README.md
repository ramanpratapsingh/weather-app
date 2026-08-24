# Skyline Weather ⛅

A simple weather lookup website built as a college front-end project — search any city and get live temperature, wind speed, and humidity.

**Live demo:** https://ramanpratapsingh.github.io/weather-app/

## Features

- Search weather for any city in the world
- Shows temperature, weather condition (with icon), wind speed, and humidity
- Background color changes based on the temperature
- Recent searches saved and shown as quick-access chips
- Multi-page site: Home, Weather, About, Contact (with a working contact form)

## Tech Stack

Plain **HTML, CSS, and JavaScript** — no frameworks, no build tools, no backend server.

Weather data comes from the free [Open-Meteo API](https://open-meteo.com/) — no API key or sign-up required. Recent searches are saved in the browser's `localStorage`.

## Running Locally

No installation needed — just open `index.html` in a browser.

For the API calls to work smoothly, it's better to serve it with a simple local server instead of opening the file directly:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project Structure

```
WeatherApp/
├── index.html      # Home page
├── weather.html     # Weather search page
├── about.html
├── contact.html
├── contact.js
├── script.js         # Weather fetching + search history logic
└── style.css
```
