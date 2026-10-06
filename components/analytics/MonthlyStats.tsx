"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
      <Legend />
      <Bar
        dataKey="income"
        name="Income"
        fill="#059669"
        radius={[4, 4, 0, 0]}
      />
      <Bar
        dataKey="expenses"
        name="Expenses"
        fill="#e11d48"
        radius={[4, 4, 0, 0]}
      />
      <Bar
        dataKey="savings"
        name="Savings"
        fill="#2563eb"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  );
}
