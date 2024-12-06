import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Timeline } from '@mui/icons-material';
import { LineChart } from '@mui/x-charts';



export default function ProjectionsChart({ projections }) {
  const years = projections.map(p => p.year);
  const revenueData = projections.map(p => p.revenue);
  const ebitdaData = projections.map(p => p.ebitda);
  const netIncomeData = projections.map(p => p.netIncome);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Timeline /> 5-Year Projections
        </Typography>

        <Box sx={{ width: '100%', height: 400 }}>
          <LineChart
            series={[
              {
                data: revenueData,
                label: 'Revenue',
                color: '#1976d2',
              },
              {
                data: ebitdaData,
                label: 'EBITDA',
                color: '#2e7d32',
              },
              {
                data: netIncomeData,
                label: 'Net Income',
                color: '#9c27b0',
              },
            ]}
            xAxis={[{
              data: years,
              label: 'Year',
            }]}
            height={350}
          />
        </Box>
      </CardContent>
    </Card>
  );
}