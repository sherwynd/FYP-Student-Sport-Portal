"use client";

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

const data = [
  { value: 12, label: "time 1" },
  { value: 15, label: "time 2" },
  { value: 16, label: "time 3" },
  { value: 18, label: "time 4" },
];

export default function TestChart() {
  return (
    <>
      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
