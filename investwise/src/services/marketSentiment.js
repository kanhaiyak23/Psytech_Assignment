import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeMarketSentiment(symbol) {
  const prompt = `
    Analyze the current market sentiment for ${symbol} considering:
    1. General market conditions
    2. Industry trends
    3. Recent market events
    4. Key market indicators
    
    Provide a brief, data-driven sentiment analysis in 2-3 sentences.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a market analyst providing concise sentiment analysis based on current market conditions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0]?.message?.content || "Unable to analyze market sentiment at this time.";
  } catch (error) {
    console.error('Error analyzing market sentiment:', error);
    return "Unable to analyze market sentiment at this time.";
  }
}