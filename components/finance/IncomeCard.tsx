"use client";

import { useState } from "react";

interface IncomeCardProps {
  weeklyIncome: number;
  monthlyIncome: number;
  yearlyIncome: number;
  currency?: string;
}

export default function IncomeCard({
  weeklyIncome,
  monthlyIncome,
  yearlyIncome,
  currency = "$",
}: IncomeCardProps) {
  const [monthlyTarget, setMonthlyTarget] = useState(10000);

  const formatCurrency = (value: number): string => {
    return `${currency}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const progress = Math.min((monthlyIncome / monthlyTarget) * 100, 100);

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-100 p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        Income Summary
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 py-3">
          <span className="text-sm font-medium text-slate-500">Weekly</span>
          <span className="text-lg font-semibold text-emerald-600">
            {formatCurrency(weeklyIncome)}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 py-3">
          <span className="text-sm font-medium text-slate-500">Monthly</span>
          <span className="text-lg font-semibold text-emerald-600">
            {formatCurrency(monthlyIncome)}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-sm font-medium text-slate-500">Yearly</span>
          <span className="text-lg font-semibold text-emerald-600">
            {formatCurrency(yearlyIncome)}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <label
          htmlFor="monthly-target"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Monthly income goal
        </label>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {currency}
          </span>

          <input
            id="monthly-target"
            type="number"
            min="0"
            value={monthlyTarget}
            onChange={(event) => setMonthlyTarget(Number(event.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="mt-4">
          <div className="h-2.5 w-full rounded-full bg-slate-300">
            <div
              className="h-2.5 rounded-full bg-emerald-600 transition-all duration-300"
              style={{
                width: `${Number.isFinite(progress) ? progress : 0}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs">
            <span className="text-slate-500">
              {formatCurrency(monthlyIncome)}
            </span>

            <span className="text-slate-500">
              Goal: {formatCurrency(monthlyTarget)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
