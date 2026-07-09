/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { WeatherRecommendation } from '../types';
import { WeatherIcon } from './WeatherIcon';

interface RecommendationsProps {
  recommendations: WeatherRecommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  // Map recommendation severity to Tailwind styling
  const getStyle = (type: WeatherRecommendation['type']) => {
    switch (type) {
      case 'alert':
        return {
          wrapper: 'bg-rose-50/70 border-rose-100 text-rose-800',
          iconBg: 'bg-rose-100 text-rose-600',
          indicator: 'bg-rose-500'
        };
      case 'warning':
        return {
          wrapper: 'bg-amber-50/70 border-amber-100 text-amber-800',
          iconBg: 'bg-amber-100 text-amber-600',
          indicator: 'bg-amber-500'
        };
      case 'success':
        return {
          wrapper: 'bg-emerald-50/70 border-emerald-100 text-emerald-800',
          iconBg: 'bg-emerald-100 text-emerald-600',
          indicator: 'bg-emerald-500'
        };
      case 'info':
      default:
        return {
          wrapper: 'bg-sky-50/70 border-sky-100 text-sky-800',
          iconBg: 'bg-sky-100 text-sky-600',
          indicator: 'bg-sky-500'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm mb-12"
      id="recommendations-card"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
          <WeatherIcon name="Compass" className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight font-display">
            Outdoor & Planning Tips
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Smart suggestions based on current and upcoming forecasts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="recs-list">
        {recommendations.map((rec, index) => {
          const style = getStyle(rec.type);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex gap-4 p-4 rounded-2xl border ${style.wrapper} transition-shadow hover:shadow-xs relative overflow-hidden`}
              id={`rec-item-${index}`}
            >
              {/* Left severity indicator line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.indicator}`} />

              <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${style.iconBg}`}>
                <WeatherIcon name={rec.iconName} className="w-5 h-5" />
              </div>

              <div className="space-y-1 self-center">
                <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                  {rec.type === 'alert' ? 'Immediate Notice' : rec.type === 'warning' ? 'Heads Up' : rec.type === 'success' ? 'Ideal Conditions' : 'Activity advice'}
                </p>
                <p className="text-sm font-semibold leading-relaxed">
                  {rec.message}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Recommendations;
