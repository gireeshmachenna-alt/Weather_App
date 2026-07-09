# Weather Forecast

A beautiful, responsive, and modern Weather Forecast web application powered by the public, keyless [Open-Meteo API](https://open-meteo.com/).

This application enables users to search for any city globally to receive current weather conditions, an interactive 7-day outlook, data-driven charts, and smart planning recommendations.

## 🌟 Key Features

* **Instant Search & Autocomplete**: Search any global city name instantly. The application is also preloaded with popular destinations (New York, London, Tokyo, Paris, Sydney) for quick reference.
* **Current Weather Metrics**: View temperatures, felt/apparent temperatures, wind speed, relative humidity, and automatic day/night theme states.
* **7-Day Forecast Cards**: Responsive layout featuring day-of-the-week outlooks, weather condition icons, max/min temperature spans, and rain/precipitation probabilities.
* **Interactive Trend Charts**: Clean visual area charts representing temperature shifts (Max/Min) and custom bar charts outlining the precipitation probabilities over the coming week.
* **Tailored Outdoor Tips & recommendations**: Dynamic rule-based planning guides indicating severe weather alerts, rain safety warnings, UV protection reminders, cold/warm layer advice, and highlighting the best days for outdoor recreation.
* **Error Resilience**: Robust handling of empty inputs, invalid city queries, network connectivity problems, or partial data responses.

## 🛠️ Technology Stack

* **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build System**: [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Motion](https://motion.dev/) (from `motion/react`)
* **Interactive Data Charts**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)

## 📡 API Architecture

The application connects sequentially to two Open-Meteo services without requiring any API keys:

1. **Geocoding API**: 
   `https://geocoding-api.open-meteo.com/v1/search?name={query}&count=5&language=en&format=json`
   Translates a user's text query (e.g. "Tokyo") into exact geographical coordinates (Latitude & Longitude).

2. **Forecast API**:
   `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&daily=...&timezone=auto`
   Fetches current conditions alongside granular 7-day outlook telemetry (temperature minimums/maximums, precipitation chances, wind speed caps, and maximum UV levels).
