"use client";

interface CategoryBreakdown {
  name: string;
  amount: number;
  percentage: number;
}

interface ExpenseCardProps {
  totalMonthly: number;
  totalYearly: number;
  categoryBreakdown: CategoryBreakdown[];
  currency?: string;
}

export default function ExpenseCard({
  totalMonthly,
  totalYearly,
  categoryBreakdown,
  currency = "$",
}: ExpenseCardProps) {
  const formatCurrency = (value: number): string => {
    return `${currency}${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-slate-900 font-semibold text-lg mb-6">
        Expense Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-slate-200">
          <span className="text-slate-500 text-sm font-medium">
            Monthly Total
          </span>
          <span className="text-rose-600 font-semibold text-lg">
            {formatCurrency(totalMonthly)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3">
          <span className="text-slate-500 text-sm font-medium">
            Yearly Total
          </span>
          <span className="text-rose-600 font-semibold text-lg">
            {formatCurrency(totalYearly)}
          </span>
        </div>
      </div>

      {categoryBreakdown.length > 0 && (
        <div className="pt-4 border-t border-slate-200">
          <p className="text-slate-900 font-semibold text-sm mb-4">
            By Category
          </p>
          <div className="space-y-2">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-slate-500 text-xs font-medium truncate">
                    {cat.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <div className="w-24 bg-slate-300 rounded-full h-2">
                    <div
                      className="bg-rose-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <span className="text-slate-500 text-xs font-medium w-12 text-right">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
