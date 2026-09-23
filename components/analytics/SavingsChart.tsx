"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

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
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="savings" />
    </BarChart>
  );
}
