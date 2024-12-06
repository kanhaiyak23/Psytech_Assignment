import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: "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",
  dangerouslyAllowBrowser: true, // Ensure you use the correct environment variable
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
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // Model name, ensure it's the right version
      max_tokens: 100,
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
    });

    return msg.completion || "Unable to analyze market sentiment at this time.";
  } catch (error) {
    console.error('Error analyzing market sentiment:', error);
    return "Unable to analyze market sentiment at this time.";
  }
}
