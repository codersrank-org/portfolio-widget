export const formatData = (portfolioData = [], maxItems) => {
  let portfolio = portfolioData || [];
  if (maxItems) {
    portfolio = portfolioData.slice(0, maxItems);
  }
  return portfolio;
};
