"use client";

import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface SpendingData {
  category: string;
  amount: number;
}

interface SpendingChartProps {
  data: SpendingData[];
}

export default function SpendingChart({ data }: SpendingChartProps) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
      <XAxis dataKey="category" tick={{ fill: "#64748b", fontSize: 12 }} />
      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
      <Bar
        dataKey="amount"
        name="Amount"
        fill="#f97316"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  );
}
