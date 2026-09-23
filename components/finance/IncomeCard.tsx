"use client";

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
  const formatCurrency = (value: number): string => {
    return `${currency}${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-slate-900 font-semibold text-lg mb-6">
        Income Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-slate-200">
          <span className="text-slate-500 text-sm font-medium">Weekly</span>
          <span className="text-emerald-600 font-semibold text-lg">
            {formatCurrency(weeklyIncome)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-slate-200">
          <span className="text-slate-500 text-sm font-medium">Monthly</span>
          <span className="text-emerald-600 font-semibold text-lg">
            {formatCurrency(monthlyIncome)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3">
          <span className="text-slate-500 text-sm font-medium">Yearly</span>
          <span className="text-emerald-600 font-semibold text-lg">
            {formatCurrency(yearlyIncome)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="w-full bg-slate-300 rounded-full h-2.5">
          <div
            className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min((monthlyIncome / 10000) * 100, 100)}%`,
            }}
          />
        </div>
        <p className="text-slate-500 text-xs mt-2">
          Income progress based on $10,000 monthly target
        </p>
      </div>
    </div>
  );
}
