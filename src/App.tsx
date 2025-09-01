import React, { useState } from 'react';
import { Sprout, Loader2 } from 'lucide-react';
import QueryForm from './components/QueryForm';
import ResultDisplay from './components/ResultDisplay';
import ErrorMessage from './components/ErrorMessage';
import axios from 'axios';

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

function App() {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim() || !query.trim()) {
      setError('Please fill in both location and query fields.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    // --- THIS IS THE FIX ---

// Assuming you use Vite (React/Vue)
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/ask`;

    try {
    const response = await axios.post(apiUrl, { // Use the new apiUrl variable here
        location: location.trim(),
        query: query.trim()
    }, {
        timeout: 30000 // 30 second timeout
    });
// --- END OF FIX ---

      setResult(response.data);
    } catch (err: any) {
      console.error('Error submitting query:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === 'ECONNREFUSED') {
        setError('Unable to connect to server. Please make sure the backend is running.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Agri-Advisor</h1>
              <p className="text-gray-300">Smart farming guidance powered by AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get Expert <span className="text-emerald-400">Agricultural Advice</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Receive personalized farming recommendations based on your location's current weather conditions and expert AI analysis.
          </p>
        </div>

        {/* Query Form */}
        <div className="mb-8">
          <QueryForm
            location={location}
            query={query}
            isLoading={isLoading}
            onLocationChange={setLocation}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Analyzing your query and weather conditions...</p>
              <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && !isLoading && (
          <ResultDisplay result={result} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Agri-Advisor. Empowering farmers with intelligent agricultural guidance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;