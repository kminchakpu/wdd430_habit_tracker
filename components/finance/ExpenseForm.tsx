"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface Expense {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseFormProps {
  expense?: Expense;
  categories: string[];
  onSubmit: (data: Expense) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ExpenseForm({
  expense,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<Expense>({
    description: expense?.description || "",
    amount: expense?.amount || 0,
    category: expense?.category || "",
    date: expense?.date || new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Expense, string>>>(
    {},
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Expense, string>> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof Expense, value: string | number) => {
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
          Expense Description
        </label>
        <Input
          id="description"
          type="text"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="E.g: Groceries, Gas, Restaurant"
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
          Amount
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
          htmlFor="category"
          className="block text-slate-900 text-sm font-semibold mb-2"
        >
          Category
        </label>
        <Select
          id="category"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          disabled={isLoading}
          className="border border-slate-300 focus:border-emerald-600"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        {errors.category && (
          <p className="text-rose-600 text-xs mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-slate-900 text-sm font-semibold mb-2"
        >
          Date
        </label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          disabled={isLoading}
          className="border border-slate-300 focus:border-emerald-600"
        />
        {errors.date && (
          <p className="text-rose-600 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {isLoading ? "Saving..." : expense ? "Update" : "Add Expense"}
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
