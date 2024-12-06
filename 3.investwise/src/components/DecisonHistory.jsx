import React from 'react';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { AIInsights } from './Allinsights';
import { MarketSentiment } from './MarketSentiment';
import { PortfolioDiversification } from './PortfolioDiversification';

export function DecisionHistory() {
  const decisions = usePortfolioStore((state) => state.getDecisions());

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Decision History</h2>
      
      <div className="space-y-6">
        {decisions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No decisions logged yet</p>
        ) : (
          decisions.map((decision) => (
            <div key={decision.id} className="border-l-4 border-blue-500 pl-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {decision.type === 'buy' ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {decision.symbol} - ${decision.amount.toLocaleString()}
                  </h3>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(decision.timestamp), 'PPp')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Reasoning</h4>
                  <p className="text-gray-600">{decision.reasoning}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Expectations</h4>
                  <p className="text-gray-600">{decision.expectations}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Downside Risk</h4>
                  <p className="text-gray-600">{decision.downsideRisk}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Reaction to Drop</h4>
                  <p className="text-gray-600">{decision.reactionToDrop}</p>
                </div>
              </div>

              <div className="space-y-4">
                <AIInsights 
                  insights={decision.aiInsights} 
                  status={decision.insightsStatus} 
                />
                <MarketSentiment 
                  sentiment={decision.marketSentiment} 
                  status={decision.sentimentStatus} 
                />
                <PortfolioDiversification 
                  analysis={decision.diversificationAnalysis} 
                  status={decision.diversificationStatus} 
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}