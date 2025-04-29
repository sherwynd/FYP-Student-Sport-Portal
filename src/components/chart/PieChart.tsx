"use client";
import React from "react";
import { Pie, ResponsiveContainer, PieChart, Tooltip, Legend } from "recharts";

type TData = {
  name: string;
  value: number;
  fill: string;
};

// Reusable PieChart component
const RechartPieChart = ({
  value,
  title,
}: {
  value: number;
  title: string;
}) => {
  // Define data for the pie chart
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

  // Custom label function for the pie chart
  const renderCustomLabel = ({
    value,
    fill,
  }: {
    name: string;
    value: number;
    fill: string;
  }) => {
    // Show the label only for the blue portion
    if (fill === "#75bfec") {
      return `${value}`; // Show the value for the blue portion
    }
    return null; // Hide label for the gray portion
  };

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart>
        <Legend verticalAlign="top" height={10} />
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          startAngle={90} // Start at 12 o'clock
          endAngle={450} // Full circle
          innerRadius={60}
          outerRadius={80}
          label={renderCustomLabel} // Use the custom label function
          labelLine={false} // Remove lines connecting labels to slices
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartPieChart;
