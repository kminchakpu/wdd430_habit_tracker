"use client";

import Button from "@/components/ui/Button";

interface Income {
  id: string;
  description: string;
  amount: number;
  type: "fixed" | "variable";
  startDate?: string;
}

interface IncomeListProps {
  incomes: Income[];
  onEdit: (income: Income) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function IncomeList({
  incomes,
  onEdit,
  onDelete,
  isLoading = false,
}: IncomeListProps) {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this income source?")) {
      await onDelete(id);
    }
  };

  if (incomes.length === 0) {
    return (
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-8 text-center">
        <p className="text-slate-500 text-sm">
          No income sources yet. Add one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {incomes.map((income) => (
        <div
          key={income.id}
          className="bg-slate-100 border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:border-slate-300 transition-colors"
        >
          <div className="flex-1">
            <h4 className="text-slate-900 font-semibold text-sm mb-1">
              {income.description}
            </h4>
            <div className="flex items-center gap-3">
              <span className="text-emerald-600 font-semibold">
                $
                {income.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-slate-500 text-xs px-2 py-1 bg-slate-200 rounded">
                {income.type === "fixed" ? "Fixed" : "Variable"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              onClick={() => onEdit(income)}
              disabled={isLoading}
              className="px-3 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(income.id)}
              disabled={isLoading}
              className="px-3 py-2 text-sm border border-rose-600 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
