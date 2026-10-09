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

  const currentMonth = getMonthKey(new Date());

  const monthlyIncome = incomeRecords
    .filter((record) => {
      const date = record.date ?? record.createdAt;
      return getMonthKey(date) === currentMonth;
    })
    .reduce(
      (total, record) =>
        total + Number(record.amount),
      0
    );

  const monthlyExpenses = expenseRecords
    .filter(
      (record) =>
        getMonthKey(record.date) === currentMonth
    )
    .reduce(
      (total, record) =>
        total + Number(record.amount),
      0
    );

  const monthlySavings = savingsRecords
    .filter(
      (record) =>
        getMonthKey(record.date) === currentMonth
    )
    .reduce(
      (total, record) =>
        total + Number(record.amount),
      0
    );

  const monthlyBalance =
    monthlyIncome -
    monthlyExpenses -
    monthlySavings;

  const categoryTotals = Object.entries(
    expenseRecords.reduce<Record<string, number>>(
      (totals, record) => {
        totals[record.category] =
          (totals[record.category] ?? 0) +
          Number(record.amount);

        return totals;
      },
      {}
    )
  )
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const highestCategoryAmount =
    categoryTotals[0]?.total ?? 0;

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
    .slice(0, 8);

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

        <section
          className="mt-8"
          aria-labelledby="monthly-summary-heading"
        >
          <div className="mb-4">
            <h2
              id="monthly-summary-heading"
              className="text-xl font-bold text-white"
            >
              This Month
            </h2>

            <p className="mt-1 text-sm text-slate-200">
              Your financial activity for the current
              month.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Income This Month"
              value={formatCurrency(monthlyIncome)}
              description="Income received this month"
            />

            <SummaryCard
              label="Expenses This Month"
              value={formatCurrency(monthlyExpenses)}
              description="Money spent this month"
            />

            <SummaryCard
              label="Savings This Month"
              value={formatCurrency(monthlySavings)}
              description="Money set aside this month"
            />

            <SummaryCard
              label="Monthly Balance"
              value={formatCurrency(monthlyBalance)}
              description="Income minus expenses and savings"
            />
          </div>
        </section>

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

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section
            aria-labelledby="spending-categories-heading"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2
              id="spending-categories-heading"
              className="text-xl font-bold text-slate-900"
            >
              Top Spending Categories
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Where most of your money has been spent.
            </p>

            {categoryTotals.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-slate-500">
                  No expenses recorded yet.
                </p>
              </div>
            ) : (
              <ul className="mt-6 space-y-5">
                {categoryTotals.map((item) => {
                  const percentage =
                    highestCategoryAmount > 0
                      ? (item.total /
                          highestCategoryAmount) *
                        100
                      : 0;

                  return (
                    <li key={item.category}>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <span className="font-medium text-slate-900">
                          {item.category}
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          {formatCurrency(
                            item.total
                          )}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-600"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section
            aria-labelledby="recent-financial-activity-heading"
            className="rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2
                    id="recent-financial-activity-heading"
                    className="text-xl font-bold text-slate-900"
                  >
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
          </section>
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

function getMonthKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
  ].join("-");
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