import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography } from '@mui/material';
import { theme } from '../theme/theme';
import InputSection from './components/prototyping/InputSection';
import MetricsDisplay from './components/prototyping/MetricsDisplay';
import ProjectionsChart from './components/prototyping/ProjectionsChart';
import { calculateFinancialMetrics, generateProjections } from '../utils/calculations';


const initialInputs = {
  revenue: 1000000,
  cogs: 600000,
  opex: 200000,
  taxRate: 25,
  growthRate: 10,
  discountRate: 8
};

function App() {
  const [inputs, setInputs] = useState(initialInputs);

  const metrics = useMemo(() => calculateFinancialMetrics(inputs), [inputs]);
  const projections = useMemo(() => generateProjections(inputs), [inputs]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Financial Modeling Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Interactive financial analysis and projections
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <InputSection inputs={inputs} onChange={setInputs} />
            <MetricsDisplay metrics={metrics} />
            <ProjectionsChart projections={projections} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;