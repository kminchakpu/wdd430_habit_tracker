"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export interface ExerciseFormData {
  id?: string;
  name: string;
  duration: number; // minutes
  calories: number;
  date: string;
  notes?: string;
}

interface ExerciseFormProps {
  exercise?: ExerciseFormData;
  onSubmit: (data: ExerciseFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ExerciseForm({
  exercise,
  onSubmit,
  onCancel,
  isLoading = false,
}: ExerciseFormProps) {
  const [form, setForm] = useState<ExerciseFormData>({
    id: exercise?.id,
    name: exercise?.name ?? "",
    duration: exercise?.duration ?? 0,
    calories: exercise?.calories ?? 0,
    date: exercise?.date ?? new Date().toISOString().split("T")[0],
    notes: exercise?.notes ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Exercise name is required";
    if (form.duration <= 0) e.duration = "Duration must be greater than 0";
    if (form.calories < 0) e.calories = "Calories cannot be negative";
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
        {exercise ? "Edit Exercise" : "Add Exercise"}
      </h3>

      <div>
        <label htmlFor="ex-name" className="block text-sm font-semibold text-slate-900 mb-2">
          Exercise Name
        </label>
        <Input
          id="ex-name"
          placeholder="e.g. Running, Yoga"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          disabled={isLoading}
        />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="ex-duration" className="block text-sm font-semibold text-slate-900 mb-2">
          Duration (minutes)
        </label>
        <Input
          id="ex-duration"
          type="number"
          min="0"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
          error={errors.duration}
          disabled={isLoading}
        />
        {errors.duration && <p className="mt-1 text-xs text-rose-600">{errors.duration}</p>}
      </div>

      <div>
        <label htmlFor="ex-calories" className="block text-sm font-semibold text-slate-900 mb-2">
          Calories Burned
        </label>
        <Input
          id="ex-calories"
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
        <label htmlFor="ex-date" className="block text-sm font-semibold text-slate-900 mb-2">
          Date
        </label>
        <Input
          id="ex-date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          error={errors.date}
          disabled={isLoading}
        />
        {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="ex-notes" className="block text-sm font-semibold text-slate-900 mb-2">
          Notes (optional)
        </label>
        <Input
          id="ex-notes"
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
          {isLoading ? "Saving..." : exercise ? "Update" : "Add Exercise"}
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