import { formatUsd } from "../../functions/utils";

const CoinInfoRow = ({ data }) => {
  const propertyName = Object.keys(data)[0];
  const str = propertyName.replace(/([A-Z]|\d+)/g, " $1");
  const result = str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <tr>
      <th>{result}</th>
      {result.startsWith("Price Change") ? (
        <td className={`${data[propertyName] > 0 ? "positive" : "negative"}`}>
          {Math.round(data[propertyName] * 100) / 100} %
        </td>
      ) : result.endsWith("Rank") ? (
        <td>#{data[propertyName]}</td>
      ) : result === "Current Price" ? (
        <td style={{ fontWeight: "bold" }}>{formatUsd(data[propertyName])}</td>
      ) : (
        <td>{formatUsd(data[propertyName])}</td>
      )}
    </tr>
  );
};

export default CoinInfoRow;
