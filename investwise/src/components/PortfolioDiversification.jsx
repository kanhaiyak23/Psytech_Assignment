import React from 'react';
import { PieChart } from 'lucide-react';



export function PortfolioDiversification({ analysis, status }) {
  if (!status || (!analysis && status !== 'loading')) return null;

  return (
    <div className="bg-purple-50 p-4 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <PieChart className="h-5 w-5 text-purple-600" />
        <h4 className="text-sm font-medium text-purple-800">Portfolio Diversification</h4>
      </div>
      
      {status === 'loading' && (
        <div className="flex items-center space-x-2 text-purple-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-purple-600" />
          <span>Analyzing portfolio diversification...</span>
        </div>
      )}
      
      {status === 'error' && (
        <p className="text-red-600">Unable to analyze portfolio diversification at this time.</p>
      )}
      
      {status === 'success' && analysis && (
        <p className="text-purple-700">{analysis}</p>
      )}
    </div>
  );
}