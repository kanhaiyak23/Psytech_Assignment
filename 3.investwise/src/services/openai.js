import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
   // Use environment variable for security
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
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // Ensure you use the correct model version
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: "You are an experienced investment advisor providing concise, practical insights.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return msg.completion || "Unable to generate insights at this time.";
  } catch (error) {
    console.error('Error generating insights:', error);
    return "Unable to generate insights at this time.";
  }
}
