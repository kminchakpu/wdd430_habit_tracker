"use client";

import {
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HealthProgressData {
  month: string;
  progress: number;
}

interface HealthProgressChartProps {
  data: HealthProgressData[];
}

export default function HealthProgressChart({
  data,
}: HealthProgressChartProps) {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
      <Line
        dataKey="progress"
        name="Progress"
        type="monotone"
        stroke="#0891b2"
        strokeWidth={3}
        dot={{ r: 4, fill: "#0891b2", strokeWidth: 0 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}
