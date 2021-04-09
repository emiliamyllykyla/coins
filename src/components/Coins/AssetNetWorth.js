import ChartArea from "../charts/ChartArea";
import { Columns } from "../../functions/table";
import { getDates } from "../../functions/charts";
import { formatUsd, zipWith } from "../../functions/utils";

const getTotals = (table) => {
  return table.reduce(
    (totals, row) =>
      zipWith(
        (n, m) => n + m,
        totals,
        row[Columns.LAST_WEEK_CANDLES]
          .slice(0, -1) // ignore today
          .map((day) => day.price * row[Columns.BALANCE])
      ),
    Array(7).fill(0)
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`}>{formatUsd(entry.value, 0, 2)}</p>
        ))}
      </div>
    );
  }
  return null;
};

const AssetNetWorth = ({ data }) => {
  const msData = data.table
    .map((row) => row[Columns.LAST_WEEK_CANDLES])
    .filter((row) => row.find((item) => item.time !== null) !== undefined)
    .slice(0, 1) // choose just one result
    .flat()
    .map((item) => item.time)
    .slice(0, -1); // ignore current day;

  const dates = getDates(msData);
  const totals = getTotals(data.table);
  const chartData = dates.map((d, i) => ({ name: d, total: totals[i] }));

  return (
    <div className="chart-container">
      <h2>Asset Net Worth</h2>
      <ChartArea data={chartData} tooltipContent={<CustomTooltip />} />
    </div>
  );
};

export default AssetNetWorth;
