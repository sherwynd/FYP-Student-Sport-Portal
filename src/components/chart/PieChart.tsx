"use client";
import React from "react";

import { Pie, ResponsiveContainer, PieChart, Tooltip, Legend } from "recharts";

type TData = {
  name: string;
  value: number;
  fill: string;
};

// Create a reusable PieChart component that can handle dynamic data
const RechartPieChart = ({
  value,
  title,
}: {
  value: number;
  title: string;
}) => {
  // Create the dynamic data for the pie chart (e.g., 80 for the filled part, 100 - value for the remaining)
  const data: TData[] = [
    {
      name: title,
      value: value,
      fill: "#75bfec", // Blue for the filled portion
    },
    {
      name: "Remaining",
      value: 100 - value,
      fill: "#d0d0d0", // Gray for the remaining portion
    },
  ];

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart width={100} height={100} data={data}>
        <Legend verticalAlign="top" height={10} />
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          startAngle={90} // Start at the top (12 o'clock)
          endAngle={450} // Full circle
          innerRadius={60}
          outerRadius={80}
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartPieChart;
