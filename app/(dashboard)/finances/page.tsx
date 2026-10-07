import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function FinancesPage() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/login");
  }

  const [incomeRecords, expenseRecords, savingsRecords] =
    await Promise.all([
      prisma.incomeRecord.findMany({
        where: {
          userId,
        },
        orderBy: [
          {
            date: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),
      prisma.expenseRecord.findMany({
        where: {
          userId,
        },
        orderBy: [
          {
            date: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),
      prisma.savingsRecord.findMany({
        where: {
          userId,
        },
        orderBy: [
          {
            date: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),
    ]);

  const totalIncome = incomeRecords.reduce(
    (total, record) => total + Number(record.amount),
    0
  );

  const totalExpenses = expenseRecords.reduce(
    (total, record) => total + Number(record.amount),
    0
  );

  const totalSavings = savingsRecords.reduce(
    (total, record) => total + Number(record.amount),
    0
  );

  const availableBalance =
    totalIncome - totalExpenses - totalSavings;

  const activities = [
    ...incomeRecords.map((record) => ({
      id: record.id,
      type: "Income" as const,
      title: record.source,
      amount: Number(record.amount),
      date: record.date ?? record.createdAt,
    })),
    ...expenseRecords.map((record) => ({
      id: record.id,
      type: "Expense" as const,
      title: record.note || record.category,
      amount: Number(record.amount),
      date: record.date,
    })),
    ...savingsRecords.map((record) => ({
      id: record.id,
      type: "Savings" as const,
      title: record.note || "Savings",
      amount: Number(record.amount),
      date: record.date,
    })),
  ]
    .sort(
      (a, b) =>
        b.date.getTime() - a.date.getTime()
    )
    .slice(0, 6);

  return (
    <section className="min-h-screen bg-[#344054]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
              Financial Overview
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-50 sm:text-4xl">
              Finances
            </h1>
            <p className="mt-3 max-w-2xl text-slate-50">
              Track your income, expenses, savings,
              and overall financial position.
            </p>
          </div>
          <Link
            href="/analytics"
            className="inline-flex w-fit items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Analytics
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Income"
            value={formatCurrency(totalIncome)}
            description={`${incomeRecords.length} income ${
              incomeRecords.length === 1
                ? "record"
                : "records"
            }`}
          />
          <SummaryCard
            label="Total Expenses"
            value={formatCurrency(totalExpenses)}
            description={`${expenseRecords.length} expense ${
              expenseRecords.length === 1
                ? "record"
                : "records"
            }`}
          />
          <SummaryCard
            label="Total Savings"
            value={formatCurrency(totalSavings)}
            description={`${savingsRecords.length} savings ${
              savingsRecords.length === 1
                ? "record"
                : "records"
            }`}
          />
          <SummaryCard
            label="Available Balance"
            value={formatCurrency(availableBalance)}
            description="Income minus expenses and savings"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <FinanceLinkCard
            title="Income"
            description="Record and manage the money you receive from your different income sources."
            href="/income"
            linkLabel="Manage Income"
          />
          <FinanceLinkCard
            title="Expenses"
            description="Track your spending and organize expenses by category."
            href="/expenses"
            linkLabel="Manage Expenses"
          />
          <FinanceLinkCard
            title="Savings"
            description="Keep track of money you have set aside and monitor your savings progress."
            href="/savings"
            linkLabel="Manage Savings"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Financial Activity
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Your most recent income, expense,
                  and savings records.
                </p>
              </div>
              <Link
                href="/analytics"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View financial trends
              </Link>
            </div>
          </div>

          {activities.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No financial activity yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Add an income, expense, or savings
                record to begin tracking your finances.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {activities.map((activity) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <ActivityIcon
                      type={activity.type}
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {activity.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <span>
                          {activity.type}
                        </span>
                        <span aria-hidden="true">
                          •
                        </span>
                        <span>
                          {formatDate(
                            activity.date
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${
                      activity.type === "Income"
                        ? "text-emerald-700"
                        : activity.type ===
                            "Expense"
                          ? "text-red-600"
                          : "text-blue-700"
                    }`}
                  >
                    {activity.type === "Income"
                      ? "+"
                      : activity.type ===
                          "Expense"
                        ? "-"
                        : ""}
                    {formatCurrency(
                      activity.amount
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  description: string;
}

function SummaryCard({
  label,
  value,
  description,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

interface FinanceLinkCardProps {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

function FinanceLinkCard({
  title,
  description,
  href,
  linkLabel,
}: FinanceLinkCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex w-fit items-center font-semibold text-blue-600 transition hover:text-blue-700"
      >
        {linkLabel}
        <span
          aria-hidden="true"
          className="ml-2"
        >
          →
        </span>
      </Link>
    </div>
  );
}

interface ActivityIconProps {
  type: "Income" | "Expense" | "Savings";
}

function ActivityIcon({
  type,
}: ActivityIconProps) {
  const styles = {
    Income:
      "bg-emerald-100 text-emerald-700",
    Expense:
      "bg-red-100 text-red-700",
    Savings:
      "bg-blue-100 text-blue-700",
  };

  const symbols = {
    Income: "+",
    Expense: "−",
    Savings: "S",
  };

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${styles[type]}`}
      aria-hidden="true"
    >
      {symbols[type]}
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}