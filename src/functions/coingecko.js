export const coingecko = (path) =>
  fetch(`https://api.coingecko.com/api/v3${path}`).then((r) => r.json());

export const getCoinData = (coinId) => coingecko(`/coins/${coinId}`);

export const getCoinList = () => coingecko("/coins/list");

export const getMarketChart = (coinId, path) =>
  coingecko(`/coins/${coinId}/market_chart?vs_currency=usd&days=8${path}`);

export const getMarketChartDaily = (coinId) => 
  getMarketChart(coinId, `&interval=daily`)

export const lookupCoinId = (list, symbol) =>
  list.find((item) => item.symbol === symbol.toLowerCase())?.id;

export const lookupCoinName = (list, symbol) =>
  list.find((item) => item.symbol === symbol.toLowerCase())?.name;
