"use client";

import { LineChart, Line, XAxis, YAxis } from "recharts";

interface HealthProgressData {
  month: string;
  progress: number;
}

interface HealthProgressChartProps {
  data: HealthProgressData[];
}

export default function HealthProgressChart({ data }: HealthProgressChartProps) {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Line dataKey="progress" />
    </LineChart>
  );
}
