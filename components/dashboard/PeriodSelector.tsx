"use client";

import type { ChangeEvent } from "react";

export type DashboardPeriod = "7d" | "30d" | "3m" | "1y";

interface PeriodSelectorProps {
  value: DashboardPeriod;
  onChange: (period: DashboardPeriod) => void;
}

const periodOptions: {
  value: DashboardPeriod;
  label: string;
}[] = [
  {
    value: "7d",
    label: "Last 7 Days",
  },
  {
    value: "30d",
    label: "Last 30 Days",
  },
  {
    value: "3m",
    label: "Last 3 Months",
  },
  {
    value: "1y",
    label: "Last Year",
  },
];

export default function PeriodSelector({
  value,
  onChange,
}: PeriodSelectorProps) {
  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value as DashboardPeriod);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label
        htmlFor="dashboard-period"
        className="text-sm font-medium text-slate-700"
      >
        Period
      </label>

      <select
        id="dashboard-period"
        value={value}
        onChange={handleChange}
        aria-label="Dashboard period"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:w-auto"
      >
        {periodOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}