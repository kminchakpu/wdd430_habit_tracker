"use client";

import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface SavingsData {
  month: string;
  savings: number;
}

interface SavingsChartProps {
  data: SavingsData[];
}

export default function SavingsChart({ data }: SavingsChartProps) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
      <Bar
        dataKey="savings"
        name="Savings"
        fill="#059669"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  );
}
