import { create } from 'zustand';

import { generateInvestmentInsights } from '../services/openai';
import { analyzeMarketSentiment } from '../services/marketSentiment';
import { analyzeDiversification } from '../services/portfolioAnalysis';



export const usePortfolioStore = create((set, get) => ({
  portfolio: {
    decisions: [],
  },
  addDecision: async (decision) => {
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        decisions: [
          ...state.portfolio.decisions,
          {
            ...decision,
            insightsStatus: 'loading',
            sentimentStatus: 'loading',
            diversificationStatus: 'loading',
          },
        ],
      },
    }));

    try {
      const [insights, sentiment, diversification] = await Promise.all([
        generateInvestmentInsights(decision),
        analyzeMarketSentiment(decision.symbol),
        analyzeDiversification([...get().portfolio.decisions, decision]),
      ]);

      set((state) => ({
        portfolio: {
          ...state.portfolio,
          decisions: state.portfolio.decisions.map((d) =>
            d.id === decision.id
              ? {
                  ...d,
                  aiInsights: insights,
                  marketSentiment: sentiment,
                  diversificationAnalysis: diversification,
                  insightsStatus: 'success',
                  sentimentStatus: 'success',
                  diversificationStatus: 'success',
                }
              : d
          ),
        },
      }));
    } catch (error) {
      set((state) => ({
        portfolio: {
          ...state.portfolio,
          decisions: state.portfolio.decisions.map((d) =>
            d.id === decision.id
              ? {
                  ...d,
                  insightsStatus: 'error',
                  sentimentStatus: 'error',
                  diversificationStatus: 'error',
                }
              : d
          ),
        },
      }));
    }
  },
  updateDecisionInsights: (id, insights) =>
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        decisions: state.portfolio.decisions.map((d) =>
          d.id === id ? { ...d, aiInsights: insights } : d
        ),
      },
    })),
  getDecisions: () => get().portfolio.decisions,
}));