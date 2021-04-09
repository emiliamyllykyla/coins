import ChartBar from "../charts/ChartBar";
import { Columns } from "../../functions/table";
import { getDates } from "../../functions/charts";
import { sortArr, formatUsd } from "../../functions/utils";

const getTotals = (table) => {
  return table.map((row) =>
    row[Columns.LAST_WEEK_CANDLES].slice(0, -1).map((day) => {
      const symbol = row[Columns.COIN][1];
      const displaySymbol = row[Columns.COIN][4]
        ? symbol + " (EARNING)"
        : symbol;
      return {
        symbol: displaySymbol,
        total: day.price * row[Columns.BALANCE],
      };
    })
  );
};

const createChartData = (dates, totals) =>
  dates.map((d, i) => {
    const bar = { name: d };
    totals.map((coin) => (bar[coin[i].symbol] = coin[i].total));
    return bar;
  });

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${formatUsd(entry.value, 0, 2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AssetWorthByCoin = ({ data }) => {
  const table = sortArr(data.table, Columns.MARKET_VALUE, false);
  const msData = table
    .map((row) => row[Columns.LAST_WEEK_CANDLES])
    .filter((row) => row.find((item) => item.time !== null) !== undefined)
    .slice(0, 1) // choose just one result
    .flat()
    .map((item) => item.time)
    .slice(0, -1); // ignore current day
  const dates = getDates(msData);
  const totals = getTotals(table);
  const chartData = createChartData(dates, totals)
  // Stacked bars
  // Get property names (symbols), remove first one ("name")
  const bars = Object.keys(chartData[0] || {}).slice(1); 

  return (
    <div className="chart-container">
      <h2>Worth by Asset </h2>
      <ChartBar
        data={chartData}
        bars={bars}
        tooltipContent={<CustomTooltip/>}
      />
    </div>
  );
};

export default AssetWorthByCoin;
