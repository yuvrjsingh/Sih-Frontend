import React from 'react';
import MapDisplay from './MapDisplay';
import WeatherDisplay from './WeatherDisplay';
import AIResponse from './AIResponse';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface QueryResult {
  response: string;
  weather: WeatherData;
  coordinates: Coordinates;
  location: string;
}

interface ResultDisplayProps {
  result: QueryResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Results Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Agricultural Advice for {result.location}
        </h3>
        <p className="text-gray-400">
          Based on current weather conditions and expert analysis
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Display */}
        <div className="lg:col-span-1">
          <MapDisplay 
            coordinates={result.coordinates} 
            location={result.location}
          />
        </div>

        {/* Weather Display */}
        <div className="lg:col-span-1">
          <WeatherDisplay weather={result.weather} />
        </div>

        {/* AI Response */}
        <div className="lg:col-span-1">
          <AIResponse response={result.response} />
        </div>
      </div>

      {/* Full AI Response for larger screens */}
      <div className="lg:hidden">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-emerald-400 mb-4">
            Complete Recommendation
          </h4>
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: result.response.replace(/\n/g, '<br/>') 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;