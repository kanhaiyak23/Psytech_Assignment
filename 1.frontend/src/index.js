import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Your global CSS file
import { theme } from './theme'; // Custom MUI theme

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Initialize React root element and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
