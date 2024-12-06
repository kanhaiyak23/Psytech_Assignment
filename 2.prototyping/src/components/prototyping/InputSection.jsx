import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
} from '@mui/material';
import { AttachMoney, TrendingUp } from '@mui/icons-material';




export default function InputSection({ inputs, onChange }) {
  const handleInputChange = (field, value) => {
    onChange({
      ...inputs,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUp /> Financial Inputs
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AttachMoney fontSize="small" /> Core Financials
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Revenue', field: 'revenue' },
                  { label: 'Cost of Goods Sold', field: 'cogs' },
                  { label: 'Operating Expenses', field: 'opex' }
                ].map(({ label, field }) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={label}
                      type="number"
                      value={inputs[field ]}
                      onChange={(e) => handleInputChange(field , e.target.value)}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp fontSize="small" /> Rates & Growth
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: 'Tax Rate', field: 'taxRate' },
                  { label: 'Growth Rate', field: 'growthRate' },
                  { label: 'Discount Rate', field: 'discountRate' }
                ].map(({ label, field }) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={label}
                      type="number"
                      value={inputs[field ]}
                      onChange={(e) => handleInputChange(field , e.target.value)}
                      variant="outlined"
                      InputProps={{
                        endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
