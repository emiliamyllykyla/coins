import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../../constants/colors";
import { tickFormatter } from "../../functions/charts";

const ChartBar = ({ data, tooltipContent, interval, bars }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={interval}/>
        <YAxis tickFormatter={tickFormatter}/>
        <Tooltip content={tooltipContent} />
        <Legend />
        {bars.map((item, index) => {
          return (
            <Bar
              key={index}
              dataKey={item}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartBar;
