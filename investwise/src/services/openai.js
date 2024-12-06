import OpenAI from 'openai';

// apiKey: import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateInvestmentInsights(decision) {
  const prompt = `
    Analyze this investment decision:
    Symbol: ${decision.symbol}
    Type: ${decision.type}
    Amount: $${decision.amount}
    Reasoning: ${decision.reasoning}
    Expectations: ${decision.expectations}
    Downside Risk: ${decision.downsideRisk}
    
    Please provide a concise analysis including:
    1. Key risks and opportunities
    2. Market context considerations
    3. Suggestions for risk management
    4. Potential alternative strategies
    Limit the response to 3-4 sentences.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an experienced investment advisor providing concise, practical insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0]?.message?.content || "Unable to generate insights at this time.";
  } catch (error) {
    console.error('Error generating insights:', error);
    return "Unable to generate insights at this time.";
  }
}