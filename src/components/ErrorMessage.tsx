import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-start space-x-3 animate-slideIn">
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1">
        <h4 className="text-red-300 font-medium mb-1">Error</h4>
        <p className="text-red-200 text-sm">{message}</p>
      </div>
      
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-300 transition-colors duration-200"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ErrorMessage;