"use client";

import { useState } from "react";
import SavingsCard from "@/components/finance/SavingsCard";
import SavingsForm from "@/components/finance/SavingsForm";
import SavingsList from "@/components/finance/SavingsList";

interface Saving {
  id: string;
  amount: number;
  note?: string;
  date: string;
}

type SavingsFormData = Omit<Saving, "id"> & {
  id?: string;
};

export default function SavingsPage() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [editingSaving, setEditingSaving] = useState<
    Saving | undefined
  >();
  const [formVersion, setFormVersion] = useState(0);

  const totalSavings = savings.reduce(
    (total, saving) => total + saving.amount,
    0,
  );

  const handleSubmit = async (data: SavingsFormData) => {
    if (!Number.isFinite(data.amount) || data.amount <= 0) {
      return;
    }

    if (!data.date) {
      return;
    }

    if (editingSaving) {
      setSavings((current) =>
        current.map((saving) =>
          saving.id === editingSaving.id
            ? {
                ...data,
                id: editingSaving.id,
              }
            : saving,
        ),
      );

      setEditingSaving(undefined);
    } else {
      setSavings((current) => [
        ...current,
        {
          ...data,
          id: crypto.randomUUID(),
        },
      ]);
    }

    setFormVersion((version) => version + 1);
  };

  const handleDelete = async (id: string) => {
    setSavings((current) =>
      current.filter((saving) => saving.id !== id),
    );

    if (editingSaving?.id === id) {
      setEditingSaving(undefined);
    }
  };

  const handleCancel = () => {
    setEditingSaving(undefined);
    setFormVersion((version) => version + 1);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Savings
        </h1>

        <p className="mt-2 text-slate-600">
          Track the money you set aside and monitor your total savings.
        </p>
      </header>

      <section
        aria-label="Savings overview"
        className="mb-8"
      >
        <SavingsCard
          name="Total saved"
          savings={totalSavings}
        />
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="savings-form-heading"
        >
          <div className="mb-4">
            <h2
              id="savings-form-heading"
              className="text-xl font-semibold text-slate-900"
            >
              {editingSaving
                ? "Edit savings"
                : "Add a savings record"}
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Record an amount you have added to your savings.
            </p>
          </div>

          <SavingsForm
            key={`${editingSaving?.id ?? "new"}-${formVersion}`}
            saving={editingSaving}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </section>

        <section
          className="lg:col-span-2"
          aria-labelledby="savings-list-heading"
        >
          <div className="mb-4">
            <h2
              id="savings-list-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Savings records
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {savings.length}{" "}
              {savings.length === 1
                ? "record"
                : "records"}{" "}
              tracked
            </p>
          </div>

          <SavingsList
            savings={savings}
            onEdit={setEditingSaving}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}