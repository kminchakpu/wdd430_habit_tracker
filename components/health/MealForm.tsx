"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export interface MealFormData {
  id?: string;
  name: string;
  calories: number;
  date: string;
  notes?: string;
}

interface MealFormProps {
  meal?: MealFormData;
  onSubmit: (data: MealFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function MealForm({
  meal,
  onSubmit,
  onCancel,
  isLoading = false,
}: MealFormProps) {
  const [form, setForm] = useState<MealFormData>({
    name: meal?.name ?? "",
    calories: meal?.calories ?? 0,
    date: meal?.date ?? new Date().toISOString().split("T")[0],
    notes: meal?.notes ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Meal name is required";
    if (form.calories <= 0) e.calories = "Calories must be greater than 0";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-slate-200 bg-slate-100 p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900">
        {meal ? "Edit Meal" : "Add Meal"}
      </h3>

      <div>
        <label htmlFor="meal-name" className="block text-sm font-semibold text-slate-900 mb-2">
          Meal Name
        </label>
        <Input
          id="meal-name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          disabled={isLoading}
        />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="meal-calories" className="block text-sm font-semibold text-slate-900 mb-2">
          Calories
        </label>
        <Input
          id="meal-calories"
          type="number"
          min="0"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: Number(e.target.value) })}
          error={errors.calories}
          disabled={isLoading}
        />
        {errors.calories && <p className="mt-1 text-xs text-rose-600">{errors.calories}</p>}
      </div>

      <div>
        <label htmlFor="meal-date" className="block text-sm font-semibold text-slate-900 mb-2">
          Date
        </label>
        <Input
          id="meal-date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          error={errors.date}
          disabled={isLoading}
        />
        {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="meal-notes" className="block text-sm font-semibold text-slate-900 mb-2">
          Notes (optional)
        </label>
        <Input
          id="meal-notes"
          value={form.notes ?? ""}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700"
        >
          {isLoading ? "Saving..." : meal ? "Update" : "Add Meal"}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-slate-300 py-2 font-semibold text-slate-900 hover:bg-slate-200"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}