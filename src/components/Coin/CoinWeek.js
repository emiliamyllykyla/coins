import ChartLine from "../charts/ChartLine";
import ChartBar from "../charts/ChartBar";
import { useEffect, useState } from "react";
import { formatUsd, capitalize } from "../../functions/utils";
import { getDates, getDateTimes } from "../../functions/charts";

const createChartDataPrices = (dates, times, prices) =>
  dates.map((d, i) => ({
    name: d,
    price: prices[i],
    time: times[i],
  }));

const createChartDataVolumes = (dates, times, volumes) =>
  dates.map((d, i) => ({
    name: d,
    volume: volumes[i],
    time: times[i],
  }));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].payload.time}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`}>
            {capitalize(entry.name)}: {formatUsd(entry.value, 0, 2)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CoinWeek = ({ data }) => {
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 500);

  const updateWidth = () => setIsNarrow(window.innerWidth < 500);

  useEffect(() => {
    window.addEventListener("resize", updateWidth, false);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isNarrow]);

  const msData = data.candleData.prices.map((item) => item[0]);
  const prices = data.candleData.prices.map((item) => item[1]);
  const volumes = data.candleData.total_volumes.map((item) => item[1]);
  const dates = getDates(msData);
  const times = getDateTimes(msData);

  return (
    <div className="week-charts">
      <h2>{data.data.name}/USD Chart</h2>
      <ChartLine
        data={createChartDataPrices(dates, times, prices)}
        tooltipContent={<CustomTooltip />}
        interval={isNarrow ? 47 : 23}
      />
      <ChartBar
        data={createChartDataVolumes(dates, times, volumes)}
        tooltipContent={<CustomTooltip />}
        interval={isNarrow ? 47 : 23}
        bars={["volume"]}
      />
    </div>
  );
};

export default CoinWeek;
