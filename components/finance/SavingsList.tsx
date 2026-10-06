"use client";

import Button from "@/components/ui/Button";

interface Savings {
  id: string;
  name: string;
  amount: number;
  goal?: number;
}

interface SavingsListProps {
  savings: Savings[];
  onEdit: (saving: Savings) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function SavingsList({
  savings,
  onEdit,
  onDelete,
  isLoading,
}: SavingsListProps) {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this Saving?")) {
      await onDelete(id);
    }
  };

  if (savings.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
        <p className="text-slate-500 text-sm">
          No savings yet. Add one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {savings.map((saving) => (
        <div
          key={saving.id}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-slate-300 transition-colors"
        >
          <div className="flex-1">
            <h4 className="text-slate-900 font-semibold text-sm mb-1">
              {saving.name}
            </h4>

            <div className="flex items-center gap-3">
              <span className="text-emerald-600 font-semibold">
                $
                {saving.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Button
              onClick={() => onEdit(saving)}
              disabled={isLoading}
              className="px-3 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
            >
              Edit
            </Button>

            <Button
              onClick={() => handleDelete(saving.id)}
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
