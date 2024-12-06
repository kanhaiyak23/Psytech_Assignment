import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeDiversification(decisions) {
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
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0]?.message?.content || "Unable to analyze portfolio diversification at this time.";
  } catch (error) {
    console.error('Error analyzing portfolio diversification:', error);
    return "Unable to analyze portfolio diversification at this time.";
  }
}