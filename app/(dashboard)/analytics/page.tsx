import FinancialChart from "@/components/analytics/FinancialChart";
import HabitStreakChart from "@/components/analytics/HabitStreakChart";
import HealthProgressChart from "@/components/analytics/HealthProgressChart";
import MonthlyStats from "@/components/analytics/MonthlyStats";
import SavingsChart from "@/components/analytics/SavingsChart";
import SpendingChart from "@/components/analytics/SpendingChart";
import TrendSummary from "@/components/analytics/TrendSummary";
import WeeklyStats from "@/components/analytics/WeeklyStats";
import { getAuthenticatedUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  return new Date(`${key}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

function aggregateByMonth<T extends { date: Date }>(
  records: T[],
  months: string[],
  getAmount: (record: T) => number,
) {
  const totals = new Map<string, number>();
  for (const record of records) {
    const key = monthKey(record.date);
    totals.set(key, (totals.get(key) ?? 0) + getAmount(record));
  }
  return months.map((month) => totals.get(month) ?? 0);
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; chart?: string; summary?: string }>;
}) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return null;
  const params = await searchParams;
  const activeSection = params.section === "summary" ? "summary" : "charts";
  const activeChart = [
    "financial",
    "spending",
    "savings",
    "health",
    "streaks",
  ].includes(params.chart ?? "")
    ? params.chart!
    : "financial";
  const activeSummary = ["weekly", "monthly", "trends"].includes(
    params.summary ?? "",
  )
    ? params.summary!
    : "weekly";

  const now = new Date();
  const monthKeys = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return monthKey(month);
  });
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const [incomes, expenses, savings, meals, exercises, water] =
    await Promise.all([
      prisma.incomeRecord.findMany({
        where: { userId, date: { gte: start, not: null } },
      }),
      prisma.expenseRecord.findMany({
        where: { userId, date: { gte: start } },
      }),
      prisma.savingsRecord.findMany({
        where: { userId, date: { gte: start } },
      }),
      prisma.meal.findMany({ where: { userId, date: { gte: start } } }),
      prisma.exercise.findMany({ where: { userId, date: { gte: start } } }),
      prisma.water.findMany({ where: { userId, date: { gte: start } } }),
    ]);

  const datedIncomes = incomes.filter(
    (record) => record.date !== null,
  ) as Array<(typeof incomes)[number] & { date: Date }>;
  const monthlyIncome = aggregateByMonth(datedIncomes, monthKeys, (record) =>
    Number(record.amount),
  );
  const monthlyExpenses = aggregateByMonth(expenses, monthKeys, (record) =>
    Number(record.amount),
  );
  const monthlySavings = aggregateByMonth(savings, monthKeys, (record) =>
    Number(record.amount),
  );
  const labels = monthKeys.map(monthLabel);
  const financialData = monthKeys.map((month, index) => ({
    month: labels[index],
    income: monthlyIncome[index],
    expenses: monthlyExpenses[index],
  }));
  const savingsData = monthKeys.map((month, index) => ({
    month: labels[index],
    savings: monthlySavings[index],
  }));
  const monthlyData = monthKeys.map((month, index) => ({
    month: labels[index],
    income: monthlyIncome[index],
    expenses: monthlyExpenses[index],
    savings: monthlySavings[index],
  }));
  const trendData = monthKeys.map((month, index) => ({
    month: labels[index],
    savings: monthlySavings[index],
    expenses: monthlyExpenses[index],
  }));

  const currentMonthExpenses = expenses.filter(
    (record) => monthKey(record.date) === monthKey(now),
  );
  const spendingTotals = currentMonthExpenses.reduce((totals, record) => {
    totals.set(
      record.category,
      (totals.get(record.category) ?? 0) + Number(record.amount),
    );
    return totals;
  }, new Map<string, number>());
  const spendingData = Array.from(spendingTotals, ([category, amount]) => ({
    category,
    amount,
  })).sort((a, b) => b.amount - a.amount);

  const weekStarts = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - (3 - index) * 7,
    );
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const weeklyData = weekStarts.map((weekStart, index) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const sumInRange = (records: Array<{ date: Date; amount: unknown }>) =>
      records.reduce(
        (total, record) =>
          record.date >= weekStart && record.date < weekEnd
            ? total + Number(record.amount)
            : total,
        0,
      );
    return {
      week: `Week ${index + 1}`,
      income: sumInRange(
        incomes.filter((record) => record.date !== null) as Array<
          (typeof incomes)[number] & { date: Date }
        >,
      ),
      expenses: sumInRange(expenses),
      savings: sumInRange(savings),
    };
  });

  const healthProgressData = monthKeys.map((month, index) => {
    const mealsInMonth = meals.filter(
      (record) => monthKey(record.date) === month,
    ).length;
    const exerciseInMonth = exercises.filter(
      (record) => monthKey(record.date) === month,
    ).length;
    const waterInMonth = water.filter(
      (record) => monthKey(record.date) === month,
    ).length;
    return {
      month: labels[index],
      progress: mealsInMonth + exerciseInMonth + waterInMonth,
    };
  });

  const chartTabs = [
    ["financial", "Financial"],
    ["spending", "Spending"],
    ["savings", "Savings"],
    ["health", "Health progress"],
    ["streaks", "Habit streaks"],
  ];
  const summaryTabs = [
    ["weekly", "Weekly"],
    ["monthly", "Monthly"],
    ["trends", "Trend summary"],
  ];
  const chartTitles: Record<string, string> = {
    financial: "Income vs. expenses",
    spending: "Spending by category",
    savings: "Savings over time",
    health: "Health activity",
    streaks: "Habit streaks",
  };
  const summaryTitles: Record<string, string> = {
    weekly: "Weekly statistics",
    monthly: "Monthly statistics",
    trends: "Savings and expense trends",
  };
  const linkClass = (selected: boolean) =>
    `whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${selected ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Your progress
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Analytics
        </h1>
        <p className="mt-2 text-slate-600">
          Explore your health and financial data one chart or summary at a time.
        </p>
      </header>
      <nav
        className="mb-6 flex gap-2 border-b border-slate-200"
        aria-label="Analytics sections"
      >
        <a
          className={linkClass(activeSection === "charts")}
          href="/analytics?section=charts"
        >
          Charts
        </a>
        <a
          className={linkClass(activeSection === "summary")}
          href="/analytics?section=summary"
        >
          Summary
        </a>
      </nav>

      {activeSection === "charts" ? (
        <section className="space-y-6">
          <nav
            className="flex gap-1 overflow-x-auto border-b border-slate-200"
            aria-label="Analytics charts"
          >
            {chartTabs.map(([id, label]) => (
              <a
                key={id}
                className={linkClass(activeChart === id)}
                href={`/analytics?section=charts&chart=${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {chartTitles[activeChart]}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your recorded data · {labels[0]}–{labels[5]}
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[500px] justify-center">
                {activeChart === "financial" && (
                  <FinancialChart data={financialData} />
                )}
                {activeChart === "spending" && (
                  <SpendingChart data={spendingData} />
                )}
                {activeChart === "savings" && (
                  <SavingsChart data={savingsData} />
                )}
                {activeChart === "health" && (
                  <HealthProgressChart data={healthProgressData} />
                )}
                {activeChart === "streaks" && <HabitStreakChart data={[]} />}
              </div>
            </div>
            {activeChart === "streaks" && (
              <p className="mt-4 text-xs text-slate-500">
                Habit streak data is not available in the current database
                schema.
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          <nav
            className="flex gap-1 overflow-x-auto border-b border-slate-200"
            aria-label="Analytics summaries"
          >
            {summaryTabs.map(([id, label]) => (
              <a
                key={id}
                className={linkClass(activeSummary === id)}
                href={`/analytics?section=summary&summary=${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {summaryTitles[activeSummary]}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your recorded data · {labels[0]}–{labels[5]}
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[500px] justify-center">
                {activeSummary === "weekly" && (
                  <WeeklyStats data={weeklyData} />
                )}
                {activeSummary === "monthly" && (
                  <MonthlyStats data={monthlyData} />
                )}
                {activeSummary === "trends" && (
                  <TrendSummary data={trendData} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
