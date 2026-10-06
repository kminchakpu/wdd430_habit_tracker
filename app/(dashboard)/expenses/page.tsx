"use client";

import { useMemo, useState } from "react";
import ExpenseCard from "@/components/finance/ExpenseCard";
import ExpenseFilters from "@/components/finance/ExpenseFilters";
import ExpenseForm from "@/components/finance/ExpenseForm";
import ExpenseList from "@/components/finance/ExpenseList";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

type ExpenseFormData = Omit<Expense, "id"> & { id?: string };

interface ExpenseFilterValues {
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

const DEFAULT_CATEGORIES = [
  "Housing",
  "Utilities",
  "Groceries",
  "Transportation",
  "Healthcare",
  "Dining",
  "Entertainment",
  "Shopping",
  "Education",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [formVersion, setFormVersion] = useState(0);
  const [filters, setFilters] = useState<ExpenseFilterValues>({});

  const categories = useMemo(
    () =>
      Array.from(
        new Set([
          ...DEFAULT_CATEGORIES,
          ...expenses.map((expense) => expense.category),
        ]),
      ).sort(),
    [expenses],
  );

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((expense) => {
        if (filters.category && expense.category !== filters.category) {
          return false;
        }
        if (filters.startDate && expense.date < filters.startDate) return false;
        if (filters.endDate && expense.date > filters.endDate) return false;
        if (
          filters.minAmount !== undefined &&
          expense.amount < filters.minAmount
        ) {
          return false;
        }
        if (
          filters.maxAmount !== undefined &&
          expense.amount > filters.maxAmount
        ) {
          return false;
        }
        return true;
      }),
    [expenses, filters],
  );

  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  const currentYear = now.getFullYear().toString();
  const monthlyExpenses = expenses
    .filter((expense) => expense.date.startsWith(currentMonth))
    .reduce((total, expense) => total + expense.amount, 0);
  const yearlyExpenses = expenses
    .filter((expense) => expense.date.startsWith(currentYear))
    .reduce((total, expense) => total + expense.amount, 0);

  const categoryBreakdown = Array.from(
    expenses
      .filter((expense) => expense.date.startsWith(currentYear))
      .reduce((totals, expense) => {
        totals.set(
          expense.category,
          (totals.get(expense.category) ?? 0) + expense.amount,
        );
        return totals;
      }, new Map<string, number>()),
  )
    .map(([name, amount]) => ({
      name,
      amount,
      percentage:
        yearlyExpenses > 0 ? Math.round((amount / yearlyExpenses) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const handleSubmit = async (data: ExpenseFormData) => {
    if (!Number.isFinite(data.amount) || data.amount <= 0) return;

    if (editingExpense) {
      setExpenses((current) =>
        current.map((expense) =>
          expense.id === editingExpense.id
            ? { ...data, id: editingExpense.id }
            : expense,
        ),
      );
      setEditingExpense(undefined);
    } else {
      setExpenses((current) => [
        ...current,
        { ...data, id: crypto.randomUUID() },
      ]);
    }

    setFormVersion((version) => version + 1);
  };

  const handleDelete = async (id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
    if (editingExpense?.id === id) setEditingExpense(undefined);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Expenses
        </h1>
        <p className="mt-2 text-slate-600">
          Track your spending, review category totals, and stay on top of your
          budget.
        </p>
      </header>

      <section aria-label="Expense summary" className="mb-8">
        <ExpenseCard
          totalMonthly={monthlyExpenses}
          totalYearly={yearlyExpenses}
          categoryBreakdown={categoryBreakdown}
        />
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="expense-form-heading"
        >
          <div className="mb-4">
            <h2
              id="expense-form-heading"
              className="text-xl font-semibold text-slate-900"
            >
              {editingExpense ? "Edit expense" : "Add an expense"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Record the amount, category, and date of a purchase.
            </p>
          </div>
          <ExpenseForm
            key={`${editingExpense?.id ?? "new"}-${formVersion}`}
            expense={editingExpense}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => setEditingExpense(undefined)}
          />
        </section>

        <section
          className="space-y-4 lg:col-span-2"
          aria-labelledby="expense-list-heading"
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2
                id="expense-list-heading"
                className="text-xl font-semibold text-slate-900"
              >
                Expense history
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Showing {filteredExpenses.length} of {expenses.length}{" "}
                {expenses.length === 1 ? "expense" : "expenses"}
              </p>
            </div>
          </div>
          <ExpenseFilters
            categories={categories}
            onFilterChange={setFilters}
            onReset={() => setFilters({})}
          />
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={setEditingExpense}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}
