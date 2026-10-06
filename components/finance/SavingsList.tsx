"use client";

import Button from "@/components/ui/Button";

interface Savings {
  id: string;
  amount: number;
  note?: string;
  date: string;
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
    if (
      window.confirm(
        "Are you sure you want to delete this savings record?",
      )
    ) {
      await onDelete(id);
    }
  };

  if (savings.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm text-slate-500">
          No savings records yet. Add one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {savings.map((saving) => (
        <div
          key={saving.id}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
        >
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-3">
              <span className="font-semibold text-emerald-600">
                $
                {saving.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <p className="text-sm text-slate-600">
              {new Date(saving.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </p>

            {saving.note && (
              <p className="mt-1 text-sm text-slate-500">
                {saving.note}
              </p>
            )}
          </div>

          <div className="ml-4 flex gap-2">
            <Button
              type="button"
              onClick={() => onEdit(saving)}
              disabled={isLoading}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Edit
            </Button>

            <Button
              type="button"
              onClick={() => handleDelete(saving.id)}
              disabled={isLoading}
              className="rounded-lg border border-rose-600 px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}