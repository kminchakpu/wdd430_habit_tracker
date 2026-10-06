"use client";

interface SavingsCardProps {
  name: string;
  savings: number;
  currency?: string;
}

export default function SavingsCard({ name, savings, currency = "$"}: SavingsCardProps) {
  const formatCurrency = (value: number): string => {
    return `${currency}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-slate-900 font-semibold text-lg mb-6">Savings</h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-slate-200">
          <span className="text-slate-500 text-sm font-medium">{name}</span>

          <span className="text-emerald-600 font-semibold text-lg">
            {formatCurrency(savings)}
          </span>
        </div>
      </div>
    </div>
  );
}
