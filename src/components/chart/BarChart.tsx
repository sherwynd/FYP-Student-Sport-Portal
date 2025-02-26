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

export const RechartBarChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="eventCreated" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
