"use client";
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

const data = [
  { value: 12, label: "time 1" },
  { value: 15, label: "time 2" },
  { value: 16, label: "time 3" },
  { value: 18, label: "time 4" },
];

export const RechartBarChart = () => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
