/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudLightning,
  Thermometer,
  Umbrella,
  Compass,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Droplets,
  Wind,
  Navigation,
  Search,
  MapPin,
  TrendingUp,
  BarChart2,
  Info,
  Calendar,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = '', size }) => {
  const iconProps = { className, size };

  switch (name) {
    case 'Sun':
      return <Sun {...iconProps} />;
    case 'Moon':
      return <Moon {...iconProps} />;
    case 'CloudSun':
      return <CloudSun {...iconProps} />;
    case 'CloudMoon':
      return <CloudMoon {...iconProps} />;
    case 'Cloud':
      return <Cloud {...iconProps} />;
    case 'CloudFog':
      return <CloudFog {...iconProps} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} />;
    case 'CloudRainWind':
      return <CloudRainWind {...iconProps} />;
    case 'Snowflake':
      return <Snowflake {...iconProps} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} />;
    case 'Thermometer':
      return <Thermometer {...iconProps} />;
    case 'Umbrella':
      return <Umbrella {...iconProps} />;
    case 'Compass':
      return <Compass {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    case 'AlertTriangle':
      return <AlertTriangle {...iconProps} />;
    case 'CheckCircle':
      return <CheckCircle {...iconProps} />;
    case 'Droplets':
      return <Droplets {...iconProps} />;
    case 'Wind':
      return <Wind {...iconProps} />;
    case 'Navigation':
      return <Navigation {...iconProps} />;
    case 'Search':
      return <Search {...iconProps} />;
    case 'MapPin':
      return <MapPin {...iconProps} />;
    case 'TrendingUp':
      return <TrendingUp {...iconProps} />;
    case 'BarChart2':
      return <BarChart2 {...iconProps} />;
    case 'Info':
      return <Info {...iconProps} />;
    case 'Calendar':
      return <Calendar {...iconProps} />;
    case 'ChevronRight':
      return <ChevronRight {...iconProps} />;
    case 'ArrowRightLeft':
      return <ArrowRightLeft {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

export default WeatherIcon;
