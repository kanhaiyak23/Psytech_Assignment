import React from 'react';
import { TrendingUp } from 'lucide-react';



export function MarketSentiment({ sentiment, status }) {
  if (!status || (!sentiment && status !== 'loading')) return null;

  return (
    <div className="bg-green-50 p-4 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <TrendingUp className="h-5 w-5 text-green-600" />
        <h4 className="text-sm font-medium text-green-800">Market Sentiment</h4>
      </div>
      
      {status === 'loading' && (
        <div className="flex items-center space-x-2 text-green-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-green-600" />
          <span>Analyzing market sentiment...</span>
        </div>
      )}
      
      {status === 'error' && (
        <p className="text-red-600">Unable to analyze market sentiment at this time.</p>
      )}
      
      {status === 'success' && sentiment && (
        <p className="text-green-700">{sentiment}</p>
      )}
    </div>
  );
}