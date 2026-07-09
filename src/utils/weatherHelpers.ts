/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ForecastDay, WeatherRecommendation } from '../types';

export interface WeatherConditionInfo {
  description: string;
  iconName: string;
  bgGradient: string; // Tailwind gradient classes
  textColor: string;
  iconColor: string;
}

/**
 * Map WMO weather codes to readable descriptions, icons, and styling themes
 */
export function getWeatherCondition(code: number, isDay: boolean = true): WeatherConditionInfo {
  // Clear sky
  if (code === 0) {
    return {
      description: 'Clear sky',
      iconName: isDay ? 'Sun' : 'Moon',
      bgGradient: isDay 
        ? 'from-amber-400 to-orange-500' 
        : 'from-slate-800 to-indigo-950',
      textColor: 'text-white',
      iconColor: 'text-amber-300'
    };
  }
  
  // Mainly clear, partly cloudy, overcast
  if (code === 1) {
    return {
      description: 'Mainly clear',
      iconName: isDay ? 'CloudSun' : 'CloudMoon',
      bgGradient: isDay 
        ? 'from-sky-400 to-blue-500' 
        : 'from-slate-800 to-slate-900',
      textColor: 'text-white',
      iconColor: 'text-sky-100'
    };
  }
  if (code === 2) {
    return {
      description: 'Partly cloudy',
      iconName: isDay ? 'CloudSun' : 'CloudMoon',
      bgGradient: isDay 
        ? 'from-blue-400 to-indigo-500' 
        : 'from-slate-900 to-slate-950',
      textColor: 'text-white',
      iconColor: 'text-blue-100'
    };
  }
  if (code === 3) {
    return {
      description: 'Overcast',
      iconName: 'Cloud',
      bgGradient: 'from-slate-400 to-slate-600',
      textColor: 'text-white',
      iconColor: 'text-slate-200'
    };
  }

  // Fog
  if (code === 45 || code === 48) {
    return {
      description: code === 45 ? 'Foggy' : 'Depositing rime fog',
      iconName: 'CloudFog',
      bgGradient: 'from-zinc-400 to-slate-500',
      textColor: 'text-white',
      iconColor: 'text-zinc-200'
    };
  }

  // Drizzle
  if (code === 51 || code === 53 || code === 55) {
    return {
      description: `Drizzle (${code === 51 ? 'Light' : code === 53 ? 'Moderate' : 'Dense'})`,
      iconName: 'CloudDrizzle',
      bgGradient: 'from-blue-300 to-slate-500',
      textColor: 'text-white',
      iconColor: 'text-blue-200'
    };
  }
  if (code === 56 || code === 57) {
    return {
      description: 'Freezing drizzle',
      iconName: 'CloudSnow',
      bgGradient: 'from-cyan-300 to-blue-500',
      textColor: 'text-white',
      iconColor: 'text-cyan-100'
    };
  }

  // Rain
  if (code === 61 || code === 63 || code === 65) {
    const intensity = code === 61 ? 'Slight' : code === 63 ? 'Moderate' : 'Heavy';
    return {
      description: `${intensity} rain`,
      iconName: code === 65 ? 'CloudRainWind' : 'CloudRain',
      bgGradient: code === 65 
        ? 'from-blue-700 to-indigo-900' 
        : 'from-blue-500 to-indigo-700',
      textColor: 'text-white',
      iconColor: 'text-blue-200'
    };
  }
  if (code === 66 || code === 67) {
    return {
      description: 'Freezing rain',
      iconName: 'CloudSnow',
      bgGradient: 'from-teal-600 to-blue-800',
      textColor: 'text-white',
      iconColor: 'text-cyan-200'
    };
  }

  // Snow
  if (code === 71 || code === 73 || code === 75 || code === 77) {
    const desc = code === 77 ? 'Snow grains' : `Snowfall (${code === 71 ? 'Slight' : code === 73 ? 'Moderate' : 'Heavy'})`;
    return {
      description: desc,
      iconName: 'Snowflake',
      bgGradient: 'from-sky-300 to-blue-400',
      textColor: 'text-slate-800',
      iconColor: 'text-white'
    };
  }

  // Rain showers
  if (code === 80 || code === 81 || code === 82) {
    const desc = code === 82 ? 'Violent rain showers' : 'Rain showers';
    return {
      description: desc,
      iconName: 'CloudRain',
      bgGradient: 'from-cyan-500 to-indigo-600',
      textColor: 'text-white',
      iconColor: 'text-cyan-200'
    };
  }

  // Snow showers
  if (code === 85 || code === 86) {
    return {
      description: 'Snow showers',
      iconName: 'Snowflake',
      bgGradient: 'from-blue-400 to-slate-500',
      textColor: 'text-white',
      iconColor: 'text-blue-100'
    };
  }

  // Thunderstorm
  if (code === 95 || code === 96 || code === 99) {
    return {
      description: 'Thunderstorm',
      iconName: 'CloudLightning',
      bgGradient: 'from-purple-800 to-slate-900',
      textColor: 'text-white',
      iconColor: 'text-amber-400'
    };
  }

  // Fallback
  return {
    description: 'Unknown conditions',
    iconName: 'Cloud',
    bgGradient: 'from-slate-500 to-slate-700',
    textColor: 'text-white',
    iconColor: 'text-slate-300'
  };
}

/**
 * Formats a date string (YYYY-MM-DD) into a short day string (e.g. "Thu", "Today")
 */
export function formatDayName(dateStr: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';

  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Formats a full date representation
 */
export function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Formats API ISO time to human readable update text
 */
export function formatUpdateTime(isoTime: string): string {
  try {
    const date = new Date(isoTime);
    if (isNaN(date.getTime())) return 'Just now';
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } catch {
    return 'Just now';
  }
}

/**
 * Generates planning recommendations based on the current weather and 7-day forecast.
 */
export function generateRecommendations(
  currentTemp: number,
  currentCode: number,
  dailyForecast: ForecastDay[]
): WeatherRecommendation[] {
  const recs: WeatherRecommendation[] = [];

  // Check if heavy rain or storms are expected in the upcoming forecast (or today)
  const isRainySoon = dailyForecast.some(
    (d, idx) => idx < 3 && (d.precipProb > 40 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(d.weatherCode))
  );

  const isSevereWeather = dailyForecast.some(
    (d, idx) => idx < 3 && ([65, 82, 95, 96, 99].includes(d.weatherCode) || (d.windSpeedMax && d.windSpeedMax > 25))
  );

  const maxTempAhead = Math.max(...dailyForecast.map(d => d.tempMax));
  const minTempAhead = Math.min(...dailyForecast.map(d => d.tempMin));
  const highestUV = Math.max(...dailyForecast.map(d => d.uvIndexMax || 0));

  // 1. Rain and Storms
  if (isSevereWeather) {
    recs.push({
      type: 'alert',
      message: 'Severe weather alert: Avoid outdoor plans or travel during times of heavy rain, thunderstorms, or high winds.',
      iconName: 'AlertTriangle'
    });
  } else if (isRainySoon) {
    recs.push({
      type: 'warning',
      message: 'Rain expected: Make sure to carry an umbrella or raincoat when heading outdoors over the next couple of days.',
      iconName: 'Umbrella'
    });
  }

  // 2. High Temperature
  if (maxTempAhead >= 28) {
    recs.push({
      type: 'warning',
      message: 'High temperatures: Dress in light, breathable clothing, apply sunscreen, and stay well hydrated.',
      iconName: 'Sun'
    });
  }

  // 3. Low Temperature
  if (minTempAhead <= 12) {
    recs.push({
      type: 'info',
      message: 'Chilly temperatures ahead: Bring along a warm jacket or layer up, especially during mornings and evenings.',
      iconName: 'Snowflake'
    });
  } else if (minTempAhead <= 5) {
    recs.push({
      type: 'alert',
      message: 'Cold weather: Bundle up in warm thermal coats, gloves, and beanies to stay comfortable outdoors.',
      iconName: 'Thermometer'
    });
  }

  // 4. Outdoor activity recommendation
  // Good day: Max temp between 16 and 27, precipitation chance low (< 20%), weather code is sunny/cloudy (<=3)
  const perfectDays = dailyForecast.filter(
    (d, idx) => idx < 5 && d.tempMax >= 16 && d.tempMax <= 27 && d.precipProb < 20 && d.weatherCode <= 3
  );

  if (perfectDays.length > 0) {
    const dayNames = perfectDays.map(d => d.dayOfWeek === 'Today' ? 'today' : d.dayOfWeek).join(', ');
    recs.push({
      type: 'success',
      message: `Excellent outdoor weather: Perfect days for hiking, sports, or a stroll are forecasted (${perfectDays.map(d => d.dayOfWeek).join(', ')}).`,
      iconName: 'Compass'
    });
  }

  // 5. UV Warning
  if (highestUV >= 6) {
    recs.push({
      type: 'warning',
      message: `High UV radiation levels (index of ${highestUV.toFixed(1)}): UV index is high. Wear sunscreen, sunglasses, and a hat between 11 AM and 4 PM.`,
      iconName: 'ShieldAlert'
    });
  }

  // Fallback if no specific recommendations were generated
  if (recs.length === 0) {
    recs.push({
      type: 'success',
      message: 'Moderate weather: Standard seasonable conditions. No major planning precautions required.',
      iconName: 'CheckCircle'
    });
  }

  return recs;
}
