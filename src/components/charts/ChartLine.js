import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../../constants/colors";

const ChartLine = ({ data, tooltipContent, interval }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={interval}/>
        <YAxis type="number" domain={['auto', 'auto']}/>
        <Tooltip content={tooltipContent}/>
        <Legend />
        <Line
          type="linear"
          dataKey="price"
          stroke={COLORS[0]}
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartLine;
