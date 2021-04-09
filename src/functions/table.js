import {
  getCoinData,
  getMarketChartDaily,
  lookupCoinId,
  lookupCoinName,
} from "./coingecko";

export const Columns = {
  COIN: 0,
  BALANCE: 1,
  MARKET_VALUE: 2,
  PRICE: 3,
  LAST_WEEK_CANDLES: 9,
};

export const makeTable = async (walletData, priceData, coinList) => {
  // Remove letters "LD" from the symbol string of the coins that are
  // currently lent in order to successfully fetch data of that coin.
  // Add "true" if coin is lent, "false" if it isn't.
  walletData = walletData.map((item) => {
    if (item[0].startsWith("LD")) return [item[0].slice(2), item[1], true];
    else return [item[0], item[1], false];
  });

  // Coingecko
  const allCoinData = Promise.all(
    walletData.map(([symbol]) => getCoinData(lookupCoinId(coinList, symbol)))
  );

  // Coingecko
  const allWeekPrices = Promise.all(
    walletData.map(async ([symbol]) => {
      const marketChart = await getMarketChartDaily(
        lookupCoinId(coinList, symbol)
      );
      const prices = marketChart.prices;

      // This data contains only the opening price for each day.
      // Last item of prices array is current price,
      // and the second-to-last is today's opening price.

      // Last item, which represents the current time and price,
      // is sliced off before returning the array.

      return prices
        .map((item) => {
          return { time: item[0], price: item[1] };
        })
        .slice(0, -1);
    })
  );

  const data = await allCoinData;
  const weekPrices = await allWeekPrices;

  const coins = walletData.map(([sym, _, lent], i) => [
    lookupCoinId(coinList, sym),
    sym,
    lookupCoinName(coinList, sym),
    data[i].image.small,
    lent,
  ]);

  const balances = walletData.map(([_, { available }]) => Number(available));
  const prices = data.map((item) => item.market_data.current_price.usd);

  const marketvalues = walletData.map(([sym, { available }], index) => {
    let price = priceData[sym + "USDT"];
    // If NaN, get current price from Coingecko instead
    if (isNaN(price)) price = prices[index];
    return Number(available) * Number(sym === "USDT" ? 1 : price);
  });

  const priceChanges = data.map(
    (item) => item.market_data.price_change_percentage_24h
  );
  const high24 = data.map((item) => item.market_data.high_24h.usd);
  const low24 = data.map((item) => item.market_data.low_24h.usd);
  const volumes = data.map((item) => item.market_data.total_volume.usd);
  const marketCaps = data.map((item) => item.market_data.market_cap.usd);

  const columns = [
    coins, // COINGECKO [id, symbol, name, image, lent]
    balances, // BINANCE
    marketvalues, // BINANCE
    prices, // COINGECKO
    priceChanges, // COINGECKO
    high24, // COINGECKO
    low24, // COINGECKO
    volumes, // COINGECKO
    marketCaps, // COINGECKO
    weekPrices, // BINANCE
  ];
  return walletData.map((_, i) => columns.map((col) => col[i]));
};
