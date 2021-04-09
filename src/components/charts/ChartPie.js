import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from "../../constants/colors";

const ChartPie = ({ data, renderLabel, tooltipContent }) => {
  return (
    <ResponsiveContainer minWidth={570} height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          startAngle={450}
          endAngle={90}
          outerRadius={80}
          fill="green"
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={tooltipContent}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPie;
