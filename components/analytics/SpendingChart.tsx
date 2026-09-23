"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

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
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="amount" />
    </BarChart>
  );
}
