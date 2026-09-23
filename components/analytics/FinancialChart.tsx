"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
}

interface FinancialChartProps {
  data: FinancialData[];
}

export default function FinancialChart({ data }: FinancialChartProps) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="income" />
      <Bar dataKey="expenses" />
    </BarChart>
  );
}
