"use client";

import { useState } from "react";
import IncomeCard from "@/components/finance/IncomeCard";
import IncomeForm from "@/components/finance/IncomeForm";
import IncomeList from "@/components/finance/IncomeList";

interface Income {
  id: string;
  description: string;
  amount: number;
  type: "fixed" | "variable";
  startDate?: string;
}

type IncomeFormData = Omit<Income, "id"> & { id?: string };

export default function IncomePage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [editingIncome, setEditingIncome] = useState<Income | undefined>();
  const [formVersion, setFormVersion] = useState(0);

  const monthlyIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0,
  );

  const handleSubmit = async (data: IncomeFormData) => {
    if (!Number.isFinite(data.amount) || data.amount <= 0) return;

    if (editingIncome) {
      setIncomes((current) =>
        current.map((income) =>
          income.id === editingIncome.id
            ? { ...data, id: editingIncome.id }
            : income,
        ),
      );
      setEditingIncome(undefined);
    } else {
      setIncomes((current) => [
        ...current,
        { ...data, id: crypto.randomUUID() },
      ]);
    }

    setFormVersion((version) => version + 1);
  };

  const handleDelete = async (id: string) => {
    setIncomes((current) => current.filter((income) => income.id !== id));
    if (editingIncome?.id === id) setEditingIncome(undefined);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Income
        </h1>
        <p className="mt-2 text-slate-600">
          Track your income sources and keep an eye on your monthly earnings.
        </p>
      </header>

      <section aria-label="Income summary" className="mb-8">
        <IncomeCard
          weeklyIncome={(monthlyIncome * 12) / 52}
          monthlyIncome={monthlyIncome}
          yearlyIncome={monthlyIncome * 12}
        />
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="income-form-heading"
        >
          <div className="mb-4">
            <h2
              id="income-form-heading"
              className="text-xl font-semibold text-slate-900"
            >
              {editingIncome ? "Edit income source" : "Add an income source"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Enter the monthly amount you receive.
            </p>
          </div>
          <IncomeForm
            key={`${editingIncome?.id ?? "new"}-${formVersion}`}
            income={editingIncome}
            onSubmit={handleSubmit}
            onCancel={() => setEditingIncome(undefined)}
          />
        </section>

        <section
          className="lg:col-span-2"
          aria-labelledby="income-list-heading"
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2
                id="income-list-heading"
                className="text-xl font-semibold text-slate-900"
              >
                Income sources
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {incomes.length} {incomes.length === 1 ? "source" : "sources"}{" "}
                tracked
              </p>
            </div>
          </div>
          <IncomeList
            incomes={incomes}
            onEdit={setEditingIncome}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}
