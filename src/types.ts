/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  country_code?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeatherData {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max?: number[];
  uv_index_max?: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeatherData;
  daily: DailyWeatherData;
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
}

export interface ForecastDay {
  date: string;
  dayOfWeek: string;
  tempMin: number;
  tempMax: number;
  weatherCode: number;
  precipProb: number;
  windSpeedMax?: number;
  uvIndexMax?: number;
}

export interface WeatherRecommendation {
  type: 'info' | 'warning' | 'success' | 'alert';
  message: string;
  iconName: string;
}

export interface WeatherDataMerged {
  city: string;
  country?: string;
  admin1?: string;
  current: CurrentWeatherData;
  daily: ForecastDay[];
  units: {
    temp: string;
    humidity: string;
    windSpeed: string;
  };
  rawResponse: WeatherResponse;
}
