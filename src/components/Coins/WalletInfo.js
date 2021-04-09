import { calcChange, calcPnlYesterday } from "../../functions/calc";
import { formatUsd } from "../../functions/utils";
import "../../styles/WalletInfo.css";

const WalletInfo = ({ data }) => {
  const pnlYesterday = calcPnlYesterday(data.table);
  const change = calcChange(data.table);

  return (
    <div className="wallet-info">
      <div>
        <h3>Total Balance</h3>
        <span
          className={`wallet-info-number ${
            data.total > 0 ? "positive" : "negative"
          }`}
        >
          {formatUsd(data.total, 0, 2)}
        </span>
      </div>

      <div>
        <h3>Change from yesterday</h3>
        <span
          className={`wallet-info-number ${
            change > 0 ? "positive" : "negative"
          }`}
        >
          {change > 0 && "+"}
          {formatUsd(change, 0, 2)}
        </span>
      </div>

      <div>
        <h3>Yesterday's PNL</h3>
        <span
          className={`wallet-info-number ${
            pnlYesterday > 0 ? "positive" : "negative"
          }`}
        >
          {pnlYesterday > 0 && "+"}
          {formatUsd(pnlYesterday, 0, 2)}
        </span>
      </div>
    </div>
  );
};

export default WalletInfo;
