"use client";

import {
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendSummaryData {
  month: string;
  savings: number;
  expenses: number;
}

interface TrendSummaryProps {
  data: TrendSummaryData[];
}

export default function TrendSummary({ data }: TrendSummaryProps) {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
      <Legend />
      <Line
        dataKey="savings"
        name="Savings"
        type="monotone"
        stroke="#059669"
        strokeWidth={3}
        dot={{ r: 4, fill: "#059669", strokeWidth: 0 }}
        activeDot={{ r: 6 }}
      />
      <Line
        dataKey="expenses"
        name="Expenses"
        type="monotone"
        stroke="#e11d48"
        strokeWidth={3}
        dot={{ r: 4, fill: "#e11d48", strokeWidth: 0 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}
