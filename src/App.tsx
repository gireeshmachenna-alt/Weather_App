/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastSection } from './components/ForecastSection';
import { WeatherCharts } from './components/WeatherCharts';
import { Recommendations } from './components/Recommendations';
import { WeatherIcon } from './components/WeatherIcon';
import { WeatherDataMerged, GeocodingResponse, WeatherResponse, ForecastDay } from './types';
import { generateRecommendations, formatDayName } from './utils/weatherHelpers';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataMerged | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fetch weather data for a city
  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a valid city name.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Geocoding API lookup
      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`;
      const geocodeRes = await fetch(geocodeUrl);
      
      if (!geocodeRes.ok) {
        throw new Error('Could not connect to location services. Please check your network.');
      }

      const geocodeData: GeocodingResponse = await geocodeRes.json();
      
      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error(`We couldn't find "${cityName}". Please double-check spelling or try another city.`);
      }

      // Extract the best match location (first element)
      const location = geocodeData.results[0];
      const { latitude, longitude, name: matchedCity, country, admin1 } = location;

      // 2. Weather Forecast API lookup
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=auto`;
      const forecastRes = await fetch(forecastUrl);

      if (!forecastRes.ok) {
        throw new Error('Weather service is currently unavailable. Please try again later.');
      }

      const forecastData: WeatherResponse = await forecastRes.json();

      if (!forecastData.current || !forecastData.daily) {
        throw new Error('Weather data is currently incomplete or unavailable for this location.');
      }

      // 3. Format and merge details
      const dailyForecasts: ForecastDay[] = forecastData.daily.time.map((time, idx) => ({
        date: time,
        dayOfWeek: formatDayName(time, idx),
        tempMin: forecastData.daily.temperature_2m_min[idx],
        tempMax: forecastData.daily.temperature_2m_max[idx],
        weatherCode: forecastData.daily.weather_code[idx],
        precipProb: forecastData.daily.precipitation_probability_max[idx],
        windSpeedMax: forecastData.daily.wind_speed_10m_max ? forecastData.daily.wind_speed_10m_max[idx] : undefined,
        uvIndexMax: forecastData.daily.uv_index_max ? forecastData.daily.uv_index_max[idx] : undefined,
      }));

      const mergedData: WeatherDataMerged = {
        city: matchedCity,
        country: country,
        admin1: admin1,
        current: forecastData.current,
        daily: dailyForecasts,
        units: {
          temp: '°C',
          humidity: '%',
          windSpeed: forecastData.current_units?.wind_speed_10m || 'km/h',
        },
        rawResponse: forecastData,
      };

      setWeatherData(mergedData);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching weather data.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Perform a default initial load of London to make the app immediate and alive
  useEffect(() => {
    fetchWeather('London');
  }, []);

  // Automatically scroll to the weather results after a successful search
  useEffect(() => {
    if (weatherData && resultsRef.current) {
      // Delay slightly to let the rendering finish so scroll target calculations are accurate
      const timer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [weatherData]);

  // Compute planning recommendations
  const recommendations = weatherData
    ? generateRecommendations(
        weatherData.current.temperature_2m,
        weatherData.current.weather_code,
        weatherData.daily
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500/10 selection:text-blue-600">
      {/* Decorative subtle background glows */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-100/30 via-slate-50 to-transparent pointer-events-none" />

      {/* Header Container */}
      <header className="w-full max-w-4xl mx-auto pt-10 pb-6 px-4 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-50/80 border border-blue-100 rounded-full text-blue-600 text-xs font-black uppercase tracking-wider mb-4"
        >
          <WeatherIcon name="Compass" className="w-4 h-4 animate-spin-slow" />
          <span>Open-Meteo Enabled</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 font-display mb-2.5"
          id="app-title"
        >
          Weather <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Forecast</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-500 text-sm sm:text-base max-w-md mx-auto font-semibold"
          id="app-subtitle"
        >
          Enter any global city to retrieve instant weather metrics, a 7-day forecast, interactive trend charts, and tailored outdoor planning tips.
        </motion.p>
      </header>

      {/* Main Layout Area */}
      <main className="flex-1 w-full pb-16 z-10 relative">
        {/* Search Panel */}
        <SearchBar onSearch={fetchWeather} isLoading={isLoading} error={error} />

        {/* Loading Spinner Skeleton */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4"
              id="loading-spinner-container"
            >
              <div className="relative">
                {/* Visual pulsating ripple */}
                <span className="absolute -inset-2 rounded-full bg-blue-500/10 animate-ping" />
                <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin relative z-10" />
              </div>
              <p className="text-slate-500 text-sm font-semibold tracking-wide animate-pulse">
                Fetching weather telemetry...
              </p>
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="results"
              ref={resultsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="px-4"
              id="results-viewport"
            >
              {/* 1. Current Conditions */}
              <CurrentWeather data={weatherData} />

              {/* 2. Planning Tips / Recommendations */}
              <Recommendations recommendations={recommendations} />

              {/* 3. 7-Day Forecast Grid */}
              <ForecastSection forecast={weatherData.daily} />

              {/* 4. Weather Analytics Charts */}
              <WeatherCharts forecast={weatherData.daily} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-4xl mx-auto px-4 py-12 text-center"
              id="empty-state-view"
            >
              <div className="p-6 max-w-xs mx-auto bg-slate-100/50 border border-slate-100 rounded-3xl text-slate-400 flex flex-col items-center gap-3">
                <WeatherIcon name="Compass" size={48} className="text-slate-300 stroke-1" />
                <p className="text-sm font-semibold">
                  Search for a city above to get started
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Simple, Humble Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-100 bg-white/50 text-xs text-slate-400 font-semibold z-10 relative">
        <p>© 2026 Weather Forecast. Data courtesy of Open-Meteo (No API keys required).</p>
      </footer>
    </div>
  );
}
