import ChartPie from "../charts/ChartPie";
import { Columns } from "../../functions/table";
import { sortArr, formatUsd } from "../../functions/utils";

const chartData = (table, total) => {
  return table.map((row) => {
    const symbol = row[Columns.COIN][1];
    const displaySymbol = row[Columns.COIN][4] ? symbol + " (EARNING)" : symbol;
    return {
      name: displaySymbol,
      value: Math.round(row[Columns.MARKET_VALUE] * 100) / 100,
      percent: row[Columns.MARKET_VALUE] / total,
    };
  });
};

const renderLabel = (entry) =>
  `${entry.name}: ${Math.round(entry.percent * 10000) / 100}%`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].name}</p>
        <p>{formatUsd(payload[0].value, 0, 2)}</p>
        <p>{Math.round(payload[0].payload.percent * 10000) / 100}%</p>
      </div>
    );
  }
  return null;
};

const AssetAllocation = ({ data }) => {
  const table = sortArr(data.table, Columns.MARKET_VALUE, false);

  return (
    <div className="chart-container">
      <h2>Asset allocation</h2>
      <ChartPie
        data={chartData(table, data.total)}
        renderLabel={renderLabel}
        tooltipContent={<CustomTooltip/>}
      />
    </div>
  );
};

export default AssetAllocation;
