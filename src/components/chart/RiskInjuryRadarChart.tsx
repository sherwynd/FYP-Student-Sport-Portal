"use client";
import React from "react";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Accept data as props
type RiskInjuryRadarChartProps = {
  data: { subject: string; value: number; fullMark: number }[];
};

const RiskInjuryRadarChart = ({ data }: RiskInjuryRadarChartProps) => {
  return (
    <ResponsiveContainer width={500} height={300}>
      <RadarChart outerRadius={90} width={730} height={300} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Score Index"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RiskInjuryRadarChart;
