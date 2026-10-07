import Link from "next/link";
import SavingsCard from "@/components/finance/SavingsCard";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function monthKey(date: Date) {
  return date.toISOString().slice(0, 7);
}

export default async function FinancePage() {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;

  const [savingsRecords, expenseRecords] = await Promise.all([
    prisma.savingsRecord.findMany({
      where: { userId },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    }),
    prisma.expenseRecord.findMany({
      where: { userId },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const savings = savingsRecords.map((record) => ({
    id: record.id,
    amount: Number(record.amount),
    note: record.note ?? undefined,
    date: record.date.toISOString().slice(0, 10),
  }));
  const expenses = expenseRecords.map((record) => ({
    id: record.id,
    amount: Number(record.amount),
    category: String(record.category),
    date: record.date.toISOString().slice(0, 10),
  }));

  const currentMonth = monthKey(new Date());
  const totalSavings = savings.reduce((total, item) => total + item.amount, 0);
  const totalExpenses = expenses.reduce(
    (total, item) => total + item.amount,
    0,
  );
  const monthSavings = savings
    .filter((item) => item.date.startsWith(currentMonth))
    .reduce((total, item) => total + item.amount, 0);
  const monthExpenses = expenses
    .filter((item) => item.date.startsWith(currentMonth))
    .reduce((total, item) => total + item.amount, 0);
  const monthBalance = monthSavings - monthExpenses;

  const categoryTotals = Object.entries(
    expenses.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + item.amount;
      return acc;
    }, {}),
  )
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  const topCategoryTotal = categoryTotals[0]?.total ?? 0;

  const recentActivity = [
    ...savings.map((item) => ({
      id: `saving-${item.id}`,
      label: item.note || "Savings deposit",
      amount: item.amount,
      date: item.date,
      type: "saving" as const,
    })),
    ...expenses.map((item) => ({
      id: `expense-${item.id}`,
      label: item.category,
      amount: item.amount,
      date: item.date,
      type: "expense" as const,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Personal finances
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Finance overview
        </h1>
        <p className="mt-2 text-slate-600">
          A general look at your savings, spending and monthly balance.
        </p>
      </header>

      <section
        aria-label="Finance overview"
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <SavingsCard name="Total saved" savings={totalSavings} />
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Total spent</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {currency.format(totalExpenses)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Spent this month</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {currency.format(monthExpenses)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Saved {currency.format(monthSavings)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Monthly balance</p>
          <p
            className={`mt-2 text-3xl font-bold ${
              monthBalance >= 0 ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {currency.format(monthBalance)}
          </p>
          <p className="mt-1 text-sm text-slate-500">Savings minus expenses</p>
        </div>
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-3">
        <section
          className="lg:col-span-1"
          aria-labelledby="finance-categories-heading"
        >
          <div className="mb-4">
            <h2
              id="finance-categories-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Top spending categories
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Where most of your money goes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {categoryTotals.length === 0 ? (
              <p className="text-sm text-slate-500">
                No expenses recorded yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {categoryTotals.map((item) => (
                  <li key={item.category}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-900">
                        {item.category}
                      </span>
                      <span className="text-slate-600">
                        {currency.format(item.total)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-600"
                        style={{
                          width: `${(item.total / topCategoryTotal) * 100}%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              href="/savings"
              className="rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Manage savings
            </Link>
            <Link
              href="/income"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Manage income
            </Link>
            <Link
              href="/expenses"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Manage expenses
            </Link>
          </div>
        </section>

        <section
          className="lg:col-span-2"
          aria-labelledby="finance-activity-heading"
        >
          <div className="mb-4">
            <h2
              id="finance-activity-heading"
              className="text-xl font-semibold text-slate-900"
            >
              Recent activity
            </h2>
            <p className="m-1 text-sm text-slate-600">
              Your latest savings and expenses.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {recentActivity.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">
                No activity yet. Add a savings record or an expense to get
                started.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {recentActivity.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.type === "saving"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.type === "saving" ? "Saving" : "Expense"}
                      </span>
                      <span
                        className={`font-semibold ${
                          item.type === "saving"
                            ? "text-emerald-700"
                            : "text-slate-900"
                        }`}
                      >
                        {item.type === "saving" ? "+" : "-"}
                        {currency.format(item.amount)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
