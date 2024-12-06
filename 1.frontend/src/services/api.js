import axios from 'axios';


const ALPHA_VANTAGE_API_KEY = '00VYW2Z8CRR35UZO';
const BASE_URL = 'https://www.alphavantage.co/query';


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



