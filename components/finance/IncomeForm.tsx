"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface Income {
  id?: string;
  description: string;
  amount: number;
  type: "fixed" | "variable";
  startDate?: string;
}

interface IncomeFormProps {
  income?: Income;
  onSubmit: (data: Income) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function IncomeForm({
  income,
  onSubmit,
  onCancel,
  isLoading = false,
}: IncomeFormProps) {
  const [formData, setFormData] = useState<Income>({
    description: income?.description || "",
    amount: income?.amount || 0,
    type: income?.type || "fixed",
    startDate: income?.startDate || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Income, string>>>(
    {},
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Income, string>> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof Income, value: string | number) => {
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
    <form
      onSubmit={handleSubmit}
      className="bg-slate-100 border border-slate-200 rounded-lg p-6 space-y-4"
    >
      <div>
        <label
          htmlFor="description"
          className="block text-slate-900 text-sm font-semibold mb-2"
        >
          Job Description
        </label>
        <Input
          id="description"
          type="text"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="E.g: Freelance development, Main salary"
          error={errors.description}
          disabled={isLoading}
          className="border border-slate-300 focus:border-emerald-600"
        />
        {errors.description && (
          <p className="text-rose-600 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-slate-900 text-sm font-semibold mb-2"
        >
          Monthly Amount
        </label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount", parseFloat(e.target.value))}
          placeholder="0.00"
          step="0.01"
          min="0"
          error={errors.amount}
          disabled={isLoading}
          className="border border-slate-300 focus:border-emerald-600"
        />
        {errors.amount && (
          <p className="text-rose-600 text-xs mt-1">{errors.amount}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-slate-900 text-sm font-semibold mb-2"
        >
          Income Type
        </label>
        <Select
          id="type"
          value={formData.type}
          onChange={(e) =>
            handleChange("type", e.target.value as "fixed" | "variable")
          }
          disabled={isLoading}
          className="border border-slate-300 focus:border-emerald-600"
        >
          <option value="fixed">Fixed</option>
          <option value="variable">Variable</option>
        </Select>
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-slate-900 text-sm font-semibold mb-2"
        >
          Start Date (Optional)
        </label>
        <Input
          id="startDate"
          type="date"
          value={formData.startDate || ""}
          onChange={(e) => handleChange("startDate", e.target.value)}
          disabled={isLoading}
          className="border border-slate-300 focus:border-emerald-600"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {isLoading ? "Saving..." : income ? "Update" : "Add Income"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 border border-slate-300 text-slate-900 hover:bg-slate-200 font-semibold py-2 rounded-lg transition-colors"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
