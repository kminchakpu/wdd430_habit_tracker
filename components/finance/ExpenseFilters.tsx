"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface ExpenseFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterValues) => void;
  onReset: () => void;
}

interface FilterValues {
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export default function ExpenseFilters({
  categories,
  onFilterChange,
  onReset,
}: ExpenseFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({});

  const handleChange = (field: keyof FilterValues, value: string | number) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 space-y-4">
      <h4 className="text-slate-900 font-semibold text-sm">Filters</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-slate-500 text-xs font-medium mb-1">
            Category
          </label>
          <Select
            value={filters.category || ""}
            onChange={(e) => handleChange("category", e.target.value)}
            className="border border-slate-300 focus:border-emerald-600"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-slate-500 text-xs font-medium mb-1">
            Start Date
          </label>
          <Input
            type="date"
            value={filters.startDate || ""}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="border border-slate-300 focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="block text-slate-500 text-xs font-medium mb-1">
            End Date
          </label>
          <Input
            type="date"
            value={filters.endDate || ""}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="border border-slate-300 focus:border-emerald-600"
          />
        </div>

        <div className="flex gap-2 items-end">
          <Button
            onClick={handleReset}
            className="flex-1 border border-slate-300 text-slate-900 hover:bg-slate-200 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-500 text-xs font-medium mb-1">
            Min Amount
          </label>
          <Input
            type="number"
            value={filters.minAmount || ""}
            onChange={(e) =>
              handleChange("minAmount", parseFloat(e.target.value) || 0)
            }
            placeholder="0.00"
            step="0.01"
            min="0"
            className="border border-slate-300 focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="block text-slate-500 text-xs font-medium mb-1">
            Max Amount
          </label>
          <Input
            type="number"
            value={filters.maxAmount || ""}
            onChange={(e) =>
              handleChange("maxAmount", parseFloat(e.target.value) || 0)
            }
            placeholder="999999.99"
            step="0.01"
            min="0"
            className="border border-slate-300 focus:border-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
