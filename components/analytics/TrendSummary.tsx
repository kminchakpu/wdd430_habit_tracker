"use client";

import { LineChart, Line, XAxis, YAxis } from "recharts";

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
      <XAxis dataKey="month" />
      <YAxis />
      <Line dataKey="savings" />
      <Line dataKey="expenses" />

    </LineChart>
  );
}
