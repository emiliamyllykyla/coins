import { formatUsd } from "../../functions/utils";
import "../../styles/CoinHeader.css";


const CoinHeader = ({ data }) => {
  return (
    <div className="coin-header">
      <div>
        <img
          className="coin-header-icon"
          src={data.data.image.small}
          alt={`${data.data.name} icon`}
        />
        <h1>
          {data.data.name} ({data.data.symbol.toUpperCase()})
        </h1>
      </div>
      <h2>{formatUsd(data.data.market_data.current_price.usd)}</h2>
    </div>
  );
};

export default CoinHeader;
