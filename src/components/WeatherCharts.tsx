/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ForecastDay } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface WeatherChartsProps {
  forecast: ForecastDay[];
}

export const WeatherCharts: React.FC<WeatherChartsProps> = ({ forecast }) => {
  const [activeTab, setActiveTab] = useState<'temperature' | 'precipitation'>('temperature');

  // Format data for Recharts
  const data = forecast.map((day) => ({
    name: day.dayOfWeek,
    'Max Temp': Math.round(day.tempMax),
    'Min Temp': Math.round(day.tempMin),
    'Precipitation Chance': day.precipProb,
    dateLabel: day.date,
  }));

  // Custom tooltips for premium styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 border border-slate-100 rounded-xl shadow-lg text-xs space-y-1">
          <p className="font-bold text-slate-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-semibold flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}: {entry.value}{entry.name.includes('Temp') ? '°C' : '%'}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="w-full max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm mb-8"
      id="weather-charts-card"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <WeatherIcon name="BarChart2" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 tracking-tight font-display">
              Interactive Forecast Trends
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              A 7-day visualization of forecast projections
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('temperature')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'temperature'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <WeatherIcon name="Thermometer" className="w-3.5 h-3.5" />
            <span>Temperature</span>
          </button>
          <button
            onClick={() => setActiveTab('precipitation')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'precipitation'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <WeatherIcon name="Droplets" className="w-3.5 h-3.5" />
            <span>Precipitation</span>
          </button>
        </div>
      </div>

      {/* Chart container */}
      <div className="w-full h-72 sm:h-80" id="chart-viewport">
        {activeTab === 'temperature' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="maxTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="minTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
                unit="°"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
              <Area
                type="monotone"
                dataKey="Max Temp"
                stroke="#f97316"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#maxTempGrad)"
                name="Max Temp"
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="Min Temp"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#minTempGrad)"
                name="Min Temp"
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
                unit="%"
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
              <Bar
                dataKey="Precipitation Chance"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                name="Precipitation Chance"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default WeatherCharts;
