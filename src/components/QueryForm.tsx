import React from 'react';
import { MapPin, MessageSquare, Send } from 'lucide-react';

interface QueryFormProps {
  location: string;
  query: string;
  isLoading: boolean;
  onLocationChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const QueryForm: React.FC<QueryFormProps> = ({
  location,
  query,
  isLoading,
  onLocationChange,
  onQueryChange,
  onSubmit
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Location Input */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Your Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g., Jaipur, India"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
            required
          />
        </div>

        {/* Query Textarea */}
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Your Agricultural Question
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="e.g., What is the best crop to plant now considering the upcoming monsoon?"
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
            disabled={isLoading}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !location.trim() || !query.trim()}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Getting Advice...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Get Agricultural Advice</span>
            </>
          )}
        </button>
      </form>

      {/* Form Tips */}
      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h4 className="text-sm font-medium text-emerald-400 mb-2">💡 Tips for better advice:</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• Be specific about your location (include city and state/country)</li>
          <li>• Mention your current crops or what you're planning to grow</li>
          <li>• Include any specific concerns (pests, soil issues, timing)</li>
          <li>• Ask about seasonal considerations and weather-related advice</li>
        </ul>
      </div>
    </div>
  );
};

export default QueryForm;