import React from 'react';
import { Brain } from 'lucide-react';


export function AIInsights({ insights, status }) {
  if (!status || (!insights && status !== 'loading')) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <Brain className="h-5 w-5 text-blue-600" />
        <h4 className="text-sm font-medium text-blue-800">AI Insights</h4>
      </div>
      
      {status === 'loading' && (
        <div className="flex items-center space-x-2 text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-blue-600" />
          <span>Generating insights...</span>
        </div>
      )}
      
      {status === 'error' && (
        <p className="text-red-600">Unable to generate insights at this time.</p>
      )}
      
      {status === 'success' && insights && (
        <p className="text-blue-700">{insights}</p>
      )}
    </div>
  );
}