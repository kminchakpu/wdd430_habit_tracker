"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Savings {
  id?: string;
  name: string;
  amount: number;
  goal?: number;
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
    name: saving?.name || "",
    amount: saving?.amount || 0,
    goal: saving?.goal ?? undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Savings, string>>>(
    {},
  );
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Savings, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Savings name is required";
    }

    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (formData.goal !== undefined && formData.goal <= 0) {
      newErrors.goal = "Goal must be greater than 0";
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
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-slate-900 font-semibold text-lg mb-6">Add Savings</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="savings-name"
            className="block text-slate-900 text-sm font-medium mb-2"
          >
            Savings Name
          </label>

          <Input
            id="savings-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Emergency Fund"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="savings-amount"
            className="block text-slate-900 text-sm font-medium mb-2"
          >
            Amount
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              {currency}
            </span>

            <Input
              id="savings-amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                handleChange("amount", parseFloat(e.target.value))
              }
              min="0"
              step="0.01"
              placeholder="0.00"
              required
              className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-4 py-2.5 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="savings-goal"
            className="block text-slate-900 text-sm font-medium mb-2"
          >
            Goal <span className="text-slate-500">(Optional)</span>
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              {currency}
            </span>

            <Input
              id="savings-goal"
              name="goal"
              type="number"
              value={formData.goal ?? ""}
              onChange={(e) =>
                handleChange(
                  "goal",
                  e.target.value === ""
                    ? undefined
                    : parseFloat(e.target.value),
                )
              }
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 bg-white pl-8 pr-4 py-2.5 text-slate-900 placeholder-slate-500 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
          {isLoading ? "Saving..." : saving ? "Update" : "Add Savings"}
        </Button>
      </form>
    </div>
  );
}
