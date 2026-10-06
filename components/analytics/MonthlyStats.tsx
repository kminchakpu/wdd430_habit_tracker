"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;

}

interface MonthlyChartProps {
  data: MonthlyData[];
}

export default function MonthlyStats({ data }: MonthlyChartProps) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="income" />
      <Bar dataKey="expenses" />
      <Bar dataKey="savings" />      
    </BarChart>
  );
}
