import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey:import.meta.env.VITE_ANTHROPIC_API_KEY, 
  dangerouslyAllowBrowser: true,// Securely use environment variables
});

export async function analyzeDiversification(decisions) {
  // Reduce decisions to holdings
  const holdings = decisions.reduce((acc, decision) => {
    const amount = decision.type === 'buy' ? decision.amount : -decision.amount;
    acc[decision.symbol] = (acc[decision.symbol] || 0) + amount;
    return acc;
  }, {} );

  const prompt = `
    Analyze this portfolio for diversification:
    Holdings: ${JSON.stringify(holdings)}
    
    Consider:
    1. Sector distribution
    2. Risk concentration
    3. Asset allocation
    4. Geographic exposure
    
    Provide specific diversification recommendations in 2-3 sentences.
  `;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // Replace with your available Claude model
      max_tokens: 100,
      messages: [
        {
          role: "system",
          content: "You are a portfolio manager providing actionable diversification advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return msg.completion || "Unable to analyze portfolio diversification at this time.";
  } catch (error) {
    console.error('Error analyzing portfolio diversification:', error);
    return "Unable to analyze portfolio diversification at this time.";
  }
}
