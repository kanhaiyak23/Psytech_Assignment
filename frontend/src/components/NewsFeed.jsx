import React from 'react';
import { format } from 'date-fns';
import { Newspaper } from 'lucide-react';
import { Card, CardContent, Typography, Box, Chip, Link } from '@mui/material';

export const NewsFeed = ({ news }) => {
  // Safety check to ensure 'news' is an array
  if (!Array.isArray(news)) {
    return <Typography variant="body1">No news available</Typography>;
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (date) => {
    // Ensure the date is valid before formatting
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return 'Unknown Date'; // Return fallback if date is invalid
    }
    return format(parsedDate, 'MMM d, yyyy'); // Format if date is valid
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Newspaper size={20} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Latest News
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {news.length === 0 ? (
            <Typography variant="body2">No articles found</Typography>
          ) : (
            news.map((item, index) => (
              <Box
                key={index}
                sx={{
                  pb: 2,
                  borderBottom: index < news.length - 1 ? 1 : 0,
                  borderColor: 'divider',
                }}
              >
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="inherit"
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(item.date)} {/* Use the new formatDate function */}
                    </Typography>
                    <Chip
                      label={item.sentiment}
                      size="small"
                      color={getSentimentColor(item.sentiment)}
                      variant="outlined"
                    />
                  </Box>
                </Link>
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
