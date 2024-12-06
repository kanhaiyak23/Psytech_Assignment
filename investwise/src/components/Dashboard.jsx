import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export function Dashboard() {
  const decisions = usePortfolioStore((state) => state.getDecisions());

  const totalInvestment = decisions.reduce((sum, decision) => {
    return decision.type === 'buy' ? sum + decision.amount : sum - decision.amount;
  }, 0);

  const buyDecisions = decisions.filter((d) => d.type === 'buy').length;
  const sellDecisions = decisions.filter((d) => d.type === 'sell').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Total Investment</h3>
          <TrendingUp className="h-6 w-6 text-blue-500" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          ${totalInvestment.toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Buy Decisions</h3>
          <BarChart3 className="h-6 w-6 text-green-500" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">{buyDecisions}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Sell Decisions</h3>
          <PieChart className="h-6 w-6 text-red-500" />
        </div>
        <p className="mt-2 text-3xl font-bold text-gray-900">{sellDecisions}</p>
      </div>
    </div>
  );
}