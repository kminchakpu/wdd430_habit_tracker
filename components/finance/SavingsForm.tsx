"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Savings {
  id?: string;
  amount: number;
  note?: string;
  date: string;
}

interface SavingsFormProps {
  saving?: Savings;
  onSubmit: (data: Savings) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  currency?: string;
}

export default function SavingsForm({
  saving,
  onSubmit,
  onCancel,
  isLoading,
  currency = "$",
}: SavingsFormProps) {
  const [formData, setFormData] = useState<Savings>({
    amount: saving?.amount || 0,
    note: saving?.note || "",
    date: saving?.date || new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof Savings, string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Savings, string>> = {};

    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof Savings,
    value: string | number | undefined,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting savings form:", error);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        {saving ? "Edit Savings" : "Add Savings"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="savings-amount"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Amount
          </label>

          <div className="relative">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">
              {currency}
            </span>

            <Input
              id="savings-amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                handleChange(
                  "amount",
                  e.target.value === ""
                    ? 0
                    : parseFloat(e.target.value),
                )
              }
              min="0.01"
              step="0.01"
              placeholder="0.00"
              required
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-4 pl-8 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
            />
          </div>

          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.amount}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="savings-date"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Date
          </label>

          <Input
            id="savings-date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(e) =>
              handleChange("date", e.target.value)
            }
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
          />

          {errors.date && (
            <p className="mt-1 text-sm text-red-600">
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="savings-note"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Note{" "}
            <span className="text-slate-500">
              (Optional)
            </span>
          </label>

          <Input
            id="savings-note"
            name="note"
            type="text"
            value={formData.note || ""}
            onChange={(e) =>
              handleChange("note", e.target.value)
            }
            placeholder="e.g. Monthly savings"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:outline-none"
          >
            {isLoading
              ? "Saving..."
              : saving
                ? "Update"
                : "Add Savings"}
          </Button>
        </div>
      </form>
    </div>
  );
}