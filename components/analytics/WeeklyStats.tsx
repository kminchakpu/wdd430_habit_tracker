"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface WeeklyData {
  week: string;
  income: number;
  expenses: number;
  savings: number;
}

interface WeeklyChartProps {
  data: WeeklyData[];
}

export default function WeeklyStats({ data }: WeeklyChartProps) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="week" />
      <YAxis />
      <Bar dataKey="income" />
      <Bar dataKey="expenses" />
      <Bar dataKey="savings" />
    </BarChart>
  );
}
