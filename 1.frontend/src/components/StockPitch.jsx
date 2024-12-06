import React from 'react';
import { StockData } from '../types/stock';
import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';



export const StockPitchGenerator = ({ data }) => {
  const generatePitch = () => {
    const sentiment = data.news.reduce(
      (acc, item) => {
        acc[item.sentiment]++;
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );

    const marketSentiment =
      sentiment.positive > sentiment.negative
        ? 'positive'
        : sentiment.negative > sentiment.positive
        ? 'negative'
        : 'neutral';

    const yearlyPriceChange =
      ((data.historicalPrices[0].price - data.historicalPrices[data.historicalPrices.length - 1].price) /
        data.historicalPrices[data.historicalPrices.length - 1].price) *
      100;

    return {
      analysis: `${data.companyName} (${data.symbol}) presents ${
        marketSentiment === 'positive' ? 'an attractive' : marketSentiment === 'negative' ? 'a concerning' : 'a neutral'
      } investment opportunity. The stock currently trades at $${data.price.toFixed(2)} with a P/E ratio of ${
        data.peRatio
      }. Over the past year, the stock has ${
        yearlyPriceChange >= 0 ? 'gained' : 'lost'
      } ${Math.abs(yearlyPriceChange).toFixed(2)}%. With a market cap of $${(data.marketCap / 1e9).toFixed(
        2
      )}B and earnings per share of $${data.eps.toFixed(2)}, the company shows ${
        data.eps > 0 ? 'positive' : 'negative'
      } profitability.`,
      risks: [
        data.peRatio > 25 ? 'High P/E ratio indicates potential overvaluation' : 'P/E ratio within reasonable range',
        yearlyPriceChange < -10 ? 'Significant price decline over the past year' : 'Price movement within normal range',
        sentiment.negative > sentiment.positive ? 'Recent negative news sentiment' : 'Stable news sentiment',
      ],
      recommendation: marketSentiment === 'positive' ? 'buy' : marketSentiment === 'negative' ? 'sell' : 'hold',
    };
  };

  const pitch = generatePitch();

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'buy':
        return 'success';
      case 'sell':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Stock Pitch Analysis
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {pitch.analysis}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Key Risks
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {pitch.risks.map((risk, index) => (
              <Typography
                key={index}
                component="li"
                variant="body1"
                color="text.secondary"
                gutterBottom
              >
                {risk}
              </Typography>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recommendation
          </Typography>
          <Chip
            label={pitch.recommendation.toUpperCase()}
            color={getRecommendationColor(pitch.recommendation)}
            sx={{ fontSize: '1rem', py: 2, px: 3 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};