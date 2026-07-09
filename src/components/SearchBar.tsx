/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WeatherIcon } from './WeatherIcon';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  isLoading: boolean;
  error?: string | null;
}

const POPULAR_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, error }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  const handlePopularCityClick = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4" id="search-section">
      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <WeatherIcon name="Search" className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="Enter city name..."
            className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm disabled:bg-slate-50 disabled:text-slate-400 font-medium"
            id="city-search-input"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 min-w-[120px]"
          id="search-submit-btn"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Search</span>
              <WeatherIcon name="ChevronRight" className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div 
          className="mt-3.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-sm rounded-xl flex items-center gap-2.5 animate-fadeIn"
          id="search-error-msg"
        >
          <WeatherIcon name="AlertTriangle" className="w-4 h-4 text-rose-500 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Popular Cities Quick Links */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500 justify-center sm:justify-start">
        <span className="font-medium text-xs uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
          <WeatherIcon name="Compass" className="w-3.5 h-3.5" />
          Popular:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handlePopularCityClick(city)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-white border border-slate-100 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 disabled:opacity-50"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
