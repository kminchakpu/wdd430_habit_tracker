"use client";

import {
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface HabitStreakData {
  month: string;
  streak: number;
}

interface HabitStreakChartProps {
  data: HabitStreakData[];
}

export default function HabitStreakChart({ data }: HabitStreakChartProps) {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
      <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0" }} />
      <Line
        dataKey="streak"
        name="Days in a row"
        type="monotone"
        stroke="#7c3aed"
        strokeWidth={3}
        dot={{ r: 4, fill: "#7c3aed", strokeWidth: 0 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  );
}
