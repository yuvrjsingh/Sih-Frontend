import React from 'react';
import { Brain, Copy, CheckCircle } from 'lucide-react';

interface AIResponseProps {
  response: string;
}

const AIResponse: React.FC<AIResponseProps> = ({ response }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatResponse = (text: string) => {
    // Split by double newlines to create paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if it's a heading (starts with #, ##, or is all caps)
      if (paragraph.startsWith('#') || paragraph.match(/^[A-Z\s]+:$/)) {
        return (
          <h4 key={index} className="text-emerald-400 font-semibold text-lg mb-3 mt-6 first:mt-0">
            {paragraph.replace(/^#+\s*/, '')}
          </h4>
        );
      }
      
      // Check if it's a bullet point list
      if (paragraph.includes('•') || paragraph.includes('-')) {
        const items = paragraph.split('\n').filter(item => item.trim());
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-gray-300">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="leading-relaxed">
                {item.replace(/^[•\-]\s*/, '')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="w-5 h-5 text-emerald-400 mr-2" />
          <h4 className="text-lg font-semibold text-emerald-400">Recommendation</h4>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Response Content */}
      <div className="bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto custom-scrollbar">
        <div className="prose prose-invert max-w-none">
          {formatResponse(response)}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          AI-generated advice • Always consult local agricultural experts for critical decisions
        </p>
      </div>
    </div>
  );
};

export default AIResponse;