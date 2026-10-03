"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export interface WaterFormData {
  id?: string;
  amount: number; // in oz or ml
  date: string;
}

interface WaterFormProps {
  water?: WaterFormData;
  onSubmit: (data: WaterFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  unit?: string;
}

export default function WaterForm({
  water,
  onSubmit,
  onCancel,
  isLoading = false,
  unit = "oz",
}: WaterFormProps) {
  const [form, setForm] = useState<WaterFormData>({
    amount: water?.amount ?? 0,
    date: water?.date ?? new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.amount <= 0) e.amount = "Amount must be greater than 0";
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
        {water ? "Edit Water Intake" : "Add Water Intake"}
      </h3>

      <div>
        <label htmlFor="water-amount" className="block text-sm font-semibold text-slate-900 mb-2">
          Amount ({unit})
        </label>
        <Input
          id="water-amount"
          type="number"
          min="0"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
          error={errors.amount}
          disabled={isLoading}
        />
        {errors.amount && <p className="mt-1 text-xs text-rose-600">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="water-date" className="block text-sm font-semibold text-slate-900 mb-2">
          Date
        </label>
        <Input
          id="water-date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          error={errors.date}
          disabled={isLoading}
        />
        {errors.date && <p className="mt-1 text-xs text-rose-600">{errors.date}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700"
        >
          {isLoading ? "Saving..." : water ? "Update" : "Add Water"}
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