export const calculateFinancialMetrics = (inputs) => {
    const grossProfit = inputs.revenue - inputs.cogs;
    const ebitda = grossProfit - inputs.opex;
    const taxAmount = ebitda * (inputs.taxRate / 100);
    const netIncome = ebitda - taxAmount;
    const profitMargin = (netIncome / inputs.revenue) * 100;
  
    return {
      grossProfit,
      ebitda,
      netIncome,
      profitMargin
    };
  };
  
  export const generateProjections = (
    inputs,
    years = 5
  ) => {
    const projections = [];
    let currentRevenue = inputs.revenue;
  
    for (let year = 1; year <= years; year++) {
      currentRevenue *= (1 + inputs.growthRate / 100);
      const yearInputs = {
        ...inputs,
        revenue: currentRevenue
      };
      const metrics = calculateFinancialMetrics(yearInputs);
  
      projections.push({
        year,
        revenue: currentRevenue,
        ebitda: metrics.ebitda,
        netIncome: metrics.netIncome
      });
    }
  
    return projections;
  };