import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export function DecisionForm() {
  const addDecision = usePortfolioStore((state) => state.addDecision);
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'buy',
    amount: '',
    reasoning: '',
    expectations: '',
    downsideRisk: '',
    reactionToDrop: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDecision({
      id: Date.now().toString(),
      ...formData,
      amount: Number(formData.amount),
      timestamp: new Date().toISOString(),
    });
    setFormData({
      symbol: '',
      type: 'buy',
      amount: '',
      reasoning: '',
      expectations: '',
      downsideRisk: '',
      reactionToDrop: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900">Log Investment Decision</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Symbol</label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Decision Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value  })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Investment Reasoning</label>
        <textarea
          value={formData.reasoning}
          onChange={(e) => setFormData({ ...formData, reasoning: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Investment Expectations</label>
        <textarea
          value={formData.expectations}
          onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={2}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Downside Risk Assessment</label>
        <textarea
          value={formData.downsideRisk}
          onChange={(e) => setFormData({ ...formData, downsideRisk: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={2}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reaction to 20% Drop</label>
        <textarea
          value={formData.reactionToDrop}
          onChange={(e) => setFormData({ ...formData, reactionToDrop: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={2}
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Log Decision
      </button>
    </form>
  );
}