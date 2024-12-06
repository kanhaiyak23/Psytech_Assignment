import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';



export const SearchBar = ({ onSearch }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.toUpperCase());
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
      <Paper
        elevation={2}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '24px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <Search size={20} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
    </Box>
  );
};