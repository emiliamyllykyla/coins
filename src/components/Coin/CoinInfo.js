import CoinInfoRow from "./CoinInfoRow";

const makeList = (marketData) => {
  const currentPrice = marketData.current_price.usd;
  const marketCap = marketData.market_cap.usd;
  const marketCapRank = marketData.market_cap_rank;
  const volume = marketData.total_volume.usd;
  const low24h = marketData.low_24h.usd;
  const high24h = marketData.high_24h.usd;
  const priceChange24h = marketData.price_change_percentage_24h;
  const priceChange7d = marketData.price_change_percentage_7d;
  const priceChange30d = marketData.price_change_percentage_30d;
  const priceChange1y = marketData.price_change_percentage_1y;

  return [
    { currentPrice },
    { marketCap },
    { marketCapRank },
    { volume },
    { low24h },
    { high24h },
    { priceChange24h },
    { priceChange7d },
    { priceChange30d },
    { priceChange1y },
  ];
};

const CoinInfo = ({ data }) => {
  const list = makeList(data.data.market_data);

  return (
    <div className="coin-info">
      <h2>Price & Market Stats</h2>
      <table className="coin-table">
        <tbody>
          {list.map((item, index) => (
            <CoinInfoRow key={index} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinInfo;
