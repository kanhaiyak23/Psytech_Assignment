import React from 'react';
import { TrendingUp, DollarSign, PieChart, Percent } from 'lucide-react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';


export const StockMetrics = ({
  price,
  peRatio,
  eps,
  marketCap,
  dividendYield,
}) => {
  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <Grid container spacing={2}>
      <MetricCard
        icon={<DollarSign />}
        title="Price"
        value={`$${price.toFixed(2)}`}
      />
      <MetricCard
        icon={<TrendingUp />}
        title="P/E Ratio"
        value={peRatio.toFixed(2)}
      />
      <MetricCard
        icon={<DollarSign />}
        title="EPS"
        value={`$${eps.toFixed(2)}`}
      />
      <MetricCard
        icon={<PieChart />}
        title="Market Cap"
        value={formatMarketCap(marketCap)}
      />
      <MetricCard
        icon={<Percent />}
        title="Dividend Yield"
        value={`${(dividendYield * 100).toFixed(2)}%`}
      />
    </Grid>
  );
};

const MetricCard = ({ icon, title, value }) => (
  <Grid item xs={12} sm={6} md={2.4}>
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          {React.cloneElement(icon , { size: 20 })}
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h6" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);