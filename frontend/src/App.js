import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { SearchBar } from './components/SearchBar';
import { StockChart } from './components/StockChart';
import { StockMetrics } from './components/StockMetrics';
import { NewsFeed } from './components/NewsFeed';
import { StockPitchGenerator } from './components/StockPitchGenerator';
import { fetchStockData } from './services/api';


function App() {
  const [symbol, setSymbol] = useState('');

  const { data, isLoading, error } = useQuery(
    ['stockData', symbol],
    () => fetchStockData(symbol),
    {
      enabled: !!symbol,
      retry: 1,
    }
  );

  const handleSearch = (newSymbol) => {
    setSymbol(newSymbol);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Stock Pitch Generator
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Enter a stock symbol to generate a comprehensive investment pitch
          </Typography>
          <SearchBar onSearch={handleSearch} />
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box sx={{ py: 8 }}>
            <Alert severity="error">
              Error fetching stock data. Please try again.
            </Alert>
          </Box>
        )}

        {data && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <StockMetrics
              price={data.price}
              peRatio={data.peRatio}
              eps={data.eps}
              marketCap={data.marketCap}
              dividendYield={data.dividendYield}
            />
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 4 }}>
              <StockChart data={data.historicalPrices} />
              <NewsFeed news={data.news} />
            </Box>

            <StockPitchGenerator data={data} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;