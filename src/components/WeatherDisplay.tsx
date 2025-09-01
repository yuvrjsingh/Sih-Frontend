import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain,
  Cloud,
  Snowflake
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
}

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="w-6 h-6 text-blue-400" />;
    } else if (lowerCondition.includes('snow')) {
      return <Snowflake className="w-6 h-6 text-blue-200" />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud className="w-6 h-6 text-gray-400" />;
    } else {
      return <Sun className="w-6 h-6 text-yellow-400" />;
    }
  };

  const weatherMetrics = [
    {
      icon: <Thermometer className="w-5 h-5 text-red-400" />,
      label: 'Temperature',
      value: `${weather.temperature}°C`,
      subtitle: `Feels like ${weather.feelsLike}°C`
    },
    {
      icon: <Droplets className="w-5 h-5 text-blue-400" />,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      subtitle: 'Relative humidity'
    },
    {
      icon: <Wind className="w-5 h-5 text-gray-400" />,
      label: 'Wind Speed',
      value: `${weather.windSpeed} kph`,
      subtitle: 'Current wind'
    },
    {
      icon: <Sun className="w-5 h-5 text-yellow-400" />,
      label: 'UV Index',
      value: weather.uvIndex.toString(),
      subtitle: 'Sun exposure level'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 h-full">
      <h4 className="text-lg font-semibold text-emerald-400 mb-4">Current Weather</h4>
      
      {/* Main Weather Info */}
      <div className="text-center mb-6 p-4 bg-gray-700 rounded-lg">
        <div className="flex items-center justify-center mb-2">
          {getWeatherIcon(weather.condition)}
          <span className="ml-2 text-2xl font-bold text-white">
            {weather.temperature}°C
          </span>
        </div>
        <p className="text-gray-300 font-medium">{weather.condition}</p>
        <p className="text-gray-400 text-sm">Feels like {weather.feelsLike}°C</p>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {weatherMetrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors duration-200"
          >
            <div className="flex items-center mb-2">
              {metric.icon}
              <span className="ml-2 text-sm text-gray-300">{metric.label}</span>
            </div>
            <p className="text-white font-semibold text-lg">{metric.value}</p>
            <p className="text-gray-400 text-xs">{metric.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Weather Impact Notice */}
      <div className="mt-4 p-3 bg-emerald-900/30 border border-emerald-700 rounded-lg">
        <p className="text-emerald-300 text-sm">
          ℹ️ Weather conditions are factored into your agricultural recommendations
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;