import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { ShowChart, Assessment } from '@mui/icons-material';



export default function MetricsDisplay({ metrics }) {
  const formatCurrency = (value) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const formatPercent = (value) =>
    `${value.toFixed(2)}%`;

  const metrics_data = [
    { label: 'Gross Profit', value: formatCurrency(metrics.grossProfit), icon: <ShowChart /> },
    { label: 'EBITDA', value: formatCurrency(metrics.ebitda), icon: <ShowChart /> },
    { label: 'Net Income', value: formatCurrency(metrics.netIncome), icon: <ShowChart /> },
    { label: 'Profit Margin', value: formatPercent(metrics.profitMargin), icon: <Assessment /> },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assessment /> Key Metrics
        </Typography>

        <Grid container spacing={2}>
          {metrics_data.map(({ label, value, icon }) => (
            <Grid item xs={12} sm={6} md={3} key={label}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {icon}
                  <Typography color="text.secondary" variant="body2">
                    {label}
                  </Typography>
                </Box>
                <Typography variant="h6" component="p" fontWeight="bold">
                  {value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}