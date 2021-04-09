import { formatUsd } from "../../functions/utils";
import { useHistory } from "react-router-dom";

const TableBody = ({ data }) => {
  const history = useHistory();
  const handleRowClick = (id) => {
    history.push(`/coins/${id}`);
  };

  return (
    <tbody>
      {data.table.map(
        ([
          [id, sym, name, img, lent],
          balance,
          value,
          price,
          change,
          high,
          low,
          volume,
          marketCap,
        ]) => (
          <tr
            className="coin-row"
            onClick={() => handleRowClick(id)}
            key={lent ? sym + " (EARNING)" : sym}
          >
            <td className="coin">
              <img className="coin-icon" src={img} alt={`${name} icon`} />
              <div>
                {lent ? sym + " (EARNING)" : sym}
                <div className="coin-name">{name}</div>
              </div>
            </td>
            <td>{balance}</td>
            <td>{formatUsd(value, 0, 2)}</td>
            <td>{formatUsd(price)}</td>
            <td className={`${change > 0 ? "positive" : "negative"}`}>
              {change > 0 && "+"}
              {Math.round(change * 100) / 100} %
            </td>
            <td>{formatUsd(high)}</td>
            <td>{formatUsd(low)}</td>
            <td>{formatUsd(volume)}</td>
            <td>{marketCap === 0 ? "?" : formatUsd(marketCap)}</td>
          </tr>
        )
      )}
    </tbody>
  );
};

export default TableBody;
