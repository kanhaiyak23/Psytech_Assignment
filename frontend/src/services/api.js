import axios from 'axios';


const ALPHA_VANTAGE_API_KEY = '00VYW2Z8CRR35UZO';
const BASE_URL = 'https://www.alphavantage.co/query';

// Mock data for when API hits rate limit
const MOCK_DATA = {
  'AAPL': {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    price: 173.50,
    peRatio: 28.5,
    eps: 6.08,
    marketCap: 2800000000000,
    dividendYield: 0.0051,
    historicalPrices: generateMockHistoricalPrices(173.50),
    news: generateMockNews('AAPL'),
  },
  'GOOGL': {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc.',
    price: 141.80,
    peRatio: 25.2,
    eps: 5.63,
    marketCap: 1800000000000,
    dividendYield: 0,
    historicalPrices: generateMockHistoricalPrices(141.80),
    news: generateMockNews('GOOGL'),
  },
  'MSFT': {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    price: 417.20,
    peRatio: 35.8,
    eps: 11.65,
    marketCap: 3100000000000,
    dividendYield: 0.0073,
    historicalPrices: generateMockHistoricalPrices(417.20),
    news: generateMockNews('MSFT'),
  },
};

function generateMockHistoricalPrices(currentPrice) {
  const prices = [];
  const volatility = 0.02; // 2% daily volatility
  let price = currentPrice;

  for (let i = 365; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some random walk to the price
    const change = (Math.random() - 0.5) * volatility;
    price = price * (1 + change);
    
    prices.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2)),
    });
  }

  return prices;
}

function generateMockNews(symbol) {
  const sentiments = ['positive', 'negative', 'neutral'];
  return [
    {
      title: `${symbol} Reports Strong Quarterly Results`,
      url: 'https://example.com/news/1',
      sentiment: 'positive',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      title: `Market Analysis: ${symbol} Future Prospects`,
      url: 'https://example.com/news/2',
      sentiment: 'neutral',
      date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    },
    {
      title: `Industry Impact on ${symbol} Performance`,
      url: 'https://example.com/news/3',
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    },
  ];
}

export const fetchStockData = async (symbol) => {
  try {
    // First, try to fetch real data
    const [overview, prices, news] = await Promise.all([
      fetchCompanyOverview(symbol),
      fetchHistoricalPrices(symbol),
      fetchNewsData(symbol),
    ]);

    return {
      symbol,
      companyName: overview.Name,
      price: parseFloat(overview.Price),
      peRatio: parseFloat(overview.PERatio),
      eps: parseFloat(overview.EPS),
      marketCap: parseFloat(overview.MarketCapitalization),
      dividendYield: parseFloat(overview.DividendYield),
      historicalPrices: prices,
      news,
    };
  } catch (error) {
    console.log('API rate limit reached, using mock data');
    
    // If the symbol exists in mock data, return it
    if (symbol in MOCK_DATA) {
      return MOCK_DATA[symbol];
    }

    // If the symbol doesn't exist in mock data, generate new mock data
    const mockPrice = 100 + Math.random() * 900; // Random price between 100 and 1000
    return {
      symbol,
      companyName: `${symbol} Corporation`,
      price: Number(mockPrice.toFixed(2)),
      peRatio: Number((15 + Math.random() * 25).toFixed(2)), // PE between 15 and 40
      eps: Number((mockPrice / (15 + Math.random() * 25)).toFixed(2)),
      marketCap: Math.floor(mockPrice * 1e9), // Billion dollar market cap
      dividendYield: Number((Math.random() * 0.05).toFixed(4)), // 0-5% dividend yield
      historicalPrices: generateMockHistoricalPrices(mockPrice),
      news: generateMockNews(symbol),
    };
  }
};

const fetchCompanyOverview = async (symbol) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'OVERVIEW',
      symbol,
      apikey: ALPHA_VANTAGE_API_KEY,
    },
  });
  return response.data;
};

const fetchHistoricalPrices = async (symbol) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      apikey: ALPHA_VANTAGE_API_KEY,
    },
  });

  const timeSeries = response.data['Time Series (Daily)'];
  return Object.entries(timeSeries)
    .slice(0, 365)
    .map(([date, values]) => ({
      date,
      price: parseFloat(values['4. close']),
    }));
};

const fetchNewsData = async (symbol) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: 'NEWS_SENTIMENT',
      symbol,
      apikey: ALPHA_VANTAGE_API_KEY,
    },
  });

  return response.data.feed.slice(0, 5).map((item) => ({
    title: item.title,
    url: item.url,
    sentiment: item.overall_sentiment_label,
    date: item.time_published,
  }));
};



//
// import axios from 'axios';


// const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart/';
// const NEWS_API = 'https://newsapi.org/v2/everything';
// const NEWS_API_KEY = '315d26492e924a62a3d147aa5850d18f'; // You would need to get a free API key from newsapi.org

// export const fetchStockData = async (symbol) => {
//   try {
//     const [quote, history, news] = await Promise.all([
//       fetchQuote(symbol),
//       fetchHistoricalPrices(symbol),
//       fetchNewsData(symbol),
//     ]);

//     return {
//       symbol,
//       companyName: quote.shortName,
//       price: quote.regularMarketPrice,
//       peRatio: quote.forwardPE || 0,
//       eps: quote.epsTrailingTwelveMonths || 0,
//       marketCap: quote.marketCap,
//       dividendYield: quote.dividendYield || 0,
//       historicalPrices: history,
//       news,
//     };
//   } catch (error) {
//     console.error('Error fetching stock data:', error);
//     throw new Error('Failed to fetch stock data');
//   }
// };

// const fetchQuote = async (symbol) => {
//   const response = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}`, {
//     params: {
//       modules: 'price,defaultKeyStatistics,summaryDetail',
//     },
//   });
  
//   const quoteSummary = response.data.quoteSummary.result[0];
//   return {
//     ...quoteSummary.price,
//     ...quoteSummary.defaultKeyStatistics,
//     ...quoteSummary.summaryDetail,
//   };
// };

// const fetchHistoricalPrices = async (symbol) => {
//   const endDate = Math.floor(Date.now() / 1000);
//   const startDate = endDate - 365 * 24 * 60 * 60; // One year ago

//   const response = await axios.get(`${YAHOO_FINANCE_API}${symbol}`, {
//     params: {
//       period1: startDate,
//       period2: endDate,
//       interval: '1d',
//     },
//   });

//   const { timestamp, indicators } = response.data.chart.result[0];
//   const quotes = indicators.quote[0];

//   return timestamp.map((time, index) => ({
//     date: new Date(time * 1000).toISOString().split('T')[0],
//     price: quotes.close[index],
//   })).filter((item) => item.price !== null);
// };

// // For demonstration, we'll generate mock news data since we don't have a news API key
// const fetchNewsData = async (symbol) => {
//   // In a real application, you would use the NEWS_API with your API key
//   // const response = await axios.get(NEWS_API, {
//   //   params: {
//   //     q: symbol,
//   //     apiKey: NEWS_API_KEY,
//   //     language: 'en',
//   //     sortBy: 'publishedAt',
//   //   },
//   // });

//   // For demo purposes, return mock news data
//   return [
//     {
//       title: `Latest developments for ${symbol}`,
//       url: 'https://example.com/news/1',
//       sentiment: 'positive',
//       date: new Date().toISOString(),
//     },
//     {
//       title: `Market analysis of ${symbol}`,
//       url: 'https://example.com/news/2',
//       sentiment: 'neutral',
//       date: new Date(Date.now() - 86400000).toISOString(),
//     },
//     {
//       title: `Industry impact on ${symbol}`,
//       url: 'https://example.com/news/3',
//       sentiment: 'positive',
//       date: new Date(Date.now() - 172800000).toISOString(),
//     },
//   ];
// };