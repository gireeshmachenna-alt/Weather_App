/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { WeatherDataMerged } from '../types';
import { getWeatherCondition, formatFullDate, formatUpdateTime } from '../utils/weatherHelpers';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherDataMerged;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { city, country, admin1, current, units } = data;
  const condition = getWeatherCondition(current.weather_code, current.is_day === 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br ${condition.bgGradient} ${condition.textColor} mb-8 border border-white/10`}
      id="current-weather-card"
    >
      <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
          <WeatherIcon name={condition.iconName} size={280} className="stroke-1" />
        </div>

        {/* City and Condition Info */}
        <div className="space-y-4 z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WeatherIcon name="MapPin" className="w-5 h-5 opacity-80" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display" id="city-title">
                {city}
              </h2>
            </div>
            {(admin1 || country) && (
              <p className="text-sm opacity-80 font-medium pl-7">
                {admin1 ? `${admin1}, ` : ''}{country || ''}
              </p>
            )}
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/10" id="weather-badge">
              {formatFullDate(current.time.split('T')[0])}
            </span>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <div className="p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/10">
              <WeatherIcon name={condition.iconName} className={`w-12 h-12 ${condition.iconColor}`} />
            </div>
            <div>
              <p className="text-xl font-bold tracking-wide" id="weather-desc">
                {condition.description}
              </p>
              <p className="text-xs opacity-75 font-medium">
                Updated at {formatUpdateTime(current.time)}
              </p>
            </div>
          </div>
        </div>

        {/* Temperature Block */}
        <div className="flex flex-col items-end md:items-end w-full md:w-auto z-10 border-t border-white/10 md:border-t-0 pt-6 md:pt-0">
          <div className="flex items-start">
            <span className="text-7xl sm:text-8xl font-black tracking-tighter font-display leading-none" id="current-temp">
              {Math.round(current.temperature_2m)}
            </span>
            <span className="text-2xl sm:text-3xl font-bold pt-1">°C</span>
          </div>
          
          <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold opacity-90 bg-white/10 px-3 py-1 rounded-xl backdrop-blur-xs border border-white/5" id="feels-like-container">
            <WeatherIcon name="Thermometer" className="w-4 h-4 opacity-80" />
            <span>Feels like: {Math.round(current.apparent_temperature)}°C</span>
          </div>
        </div>
      </div>

      {/* Grid of Weather Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 bg-black/10 backdrop-blur-md border-t border-white/10 divide-x divide-y divide-white/5 sm:divide-y-0 text-center">
        <div className="p-5 flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1.5 opacity-80 text-sm font-medium">
            <WeatherIcon name="Droplets" className="w-4 h-4" />
            <span>Humidity</span>
          </div>
          <span className="text-lg font-bold font-display" id="metric-humidity">
            {current.relative_humidity_2m}%
          </span>
        </div>

        <div className="p-5 flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1.5 opacity-80 text-sm font-medium">
            <WeatherIcon name="Wind" className="w-4 h-4" />
            <span>Wind Speed</span>
          </div>
          <span className="text-lg font-bold font-display" id="metric-wind">
            {current.wind_speed_10m} {units.windSpeed}
          </span>
        </div>

        <div className="p-5 col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-1 border-t sm:border-t-0">
          <div className="flex items-center gap-1.5 opacity-80 text-sm font-medium">
            <WeatherIcon name="Compass" className="w-4 h-4" />
            <span>Day / Night</span>
          </div>
          <span className="text-lg font-bold font-display" id="metric-daynight">
            {current.is_day === 1 ? 'Daylight' : 'Night'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
