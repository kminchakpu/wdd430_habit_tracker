"use client";

import { LineChart, Line, XAxis, YAxis } from "recharts";

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
      <XAxis dataKey="month" />
      <YAxis />
      <Line dataKey="streak" />
    </LineChart>
  );
}
