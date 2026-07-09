/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ForecastDay } from '../types';
import { getWeatherCondition } from '../utils/weatherHelpers';
import { WeatherIcon } from './WeatherIcon';

interface ForecastSectionProps {
  forecast: ForecastDay[];
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast }) => {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4" id="forecast-section">
      <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
          <WeatherIcon name="Calendar" className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight font-display">
          7-Day Outlook
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5"
        id="forecast-grid"
      >
        {forecast.map((day, idx) => {
          const condition = getWeatherCondition(day.weatherCode, true);
          
          return (
            <motion.div
              key={day.date}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all text-center relative overflow-hidden"
              id={`forecast-card-${idx}`}
            >
              {/* Day Name */}
              <div className="space-y-1">
                <p className={`font-bold text-sm ${idx === 0 ? 'text-blue-600 font-extrabold' : 'text-slate-700'}`}>
                  {day.dayOfWeek}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {day.date.substring(5).replace('-', '/')}
                </p>
              </div>

              {/* Weather Icon and Condition Brief */}
              <div className="my-4 flex flex-col items-center gap-1.5">
                <div className="p-2.5 bg-slate-50 rounded-2xl text-slate-700 hover:scale-105 transition-transform duration-250">
                  <WeatherIcon name={condition.iconName} className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                  {condition.description}
                </p>
              </div>

              {/* Temp Min/Max */}
              <div className="w-full space-y-2">
                <div className="flex justify-center items-baseline gap-1.5">
                  <span className="text-sm font-black text-slate-800" id={`forecast-max-${idx}`}>
                    {Math.round(day.tempMax)}°
                  </span>
                  <span className="text-xs font-semibold text-slate-400" id={`forecast-min-${idx}`}>
                    {Math.round(day.tempMin)}°
                  </span>
                </div>

                {/* Chance of precipitation */}
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  <WeatherIcon 
                    name="Droplets" 
                    className={`w-3 h-3 ${day.precipProb > 30 ? 'text-blue-500' : 'text-slate-300'}`} 
                  />
                  <span className={`text-[10px] font-bold ${day.precipProb > 30 ? 'text-blue-500 font-extrabold' : 'text-slate-400'}`}>
                    {day.precipProb}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ForecastSection;
