import Link from "next/link";
import { redirect } from "next/navigation";

import DashboardCharts from "@/components/dashboard/DashboardCharts";
import DashboardPeriodSelector from "@/components/dashboard/DashboardPeriodSelector";
import DashboardStats from "@/components/dashboard/DashboardStats";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import HealthSummary from "@/components/dashboard/HealthSummary";
import RecentActivity from "@/components/dashboard/RecentActivity";
import SavingsSummary from "@/components/dashboard/SavingsSummary";
import { getAuthenticatedUserId } from "@/lib/auth";
import {
  buildDashboardChartData,
  buildRecentActivities,
  calculateDashboardSummary,
  getDashboardPeriodStart,
  type DashboardPeriod,
  type DashboardRecords,
} from "@/lib/dashboard";
import { prisma } from "@/lib/prisma";

interface DashboardPageProps {
  searchParams: Promise<{
    period?: string;
  }>;
}

const validPeriods: DashboardPeriod[] = [
  "7d",
  "30d",
  "3m",
  "1y",
];

function isDashboardPeriod(
  value: string | undefined
): value is DashboardPeriod {
  return validPeriods.includes(value as DashboardPeriod);
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/login");
  }

  const params = await searchParams;

  const period: DashboardPeriod = isDashboardPeriod(
    params.period
  )
    ? params.period
    : "30d";

  const periodStart = getDashboardPeriodStart(period);

  const [
    user,
    meals,
    exercises,
    water,
    incomeRecords,
    expenseRecords,
    savingsRecords,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
      },
    }),
    prisma.meal.findMany({
      where: {
        userId,
        date: {
          gte: periodStart,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.exercise.findMany({
      where: {
        userId,
        date: {
          gte: periodStart,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.water.findMany({
      where: {
        userId,
        date: {
          gte: periodStart,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.incomeRecord.findMany({
      where: {
        userId,
        date: {
          gte: periodStart,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.expenseRecord.findMany({
      where: {
        userId,
        date: {
          gte: periodStart,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.savingsRecord.findMany({
      where: {
        userId,
        date: {
          gte: periodStart,
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  const records: DashboardRecords = {
    meals: meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
      calories: meal.calories,
      date: meal.date,
      notes: meal.notes,
    })),
    exercises: exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      duration: exercise.duration,
      calories: exercise.calories,
      date: exercise.date,
      notes: exercise.notes,
    })),
    water: water.map((record) => ({
      id: record.id,
      amount: record.amount,
      date: record.date,
    })),
    income: incomeRecords.map((income) => ({
      id: income.id,
      amount: Number(income.amount),
      source: income.source,
      type: income.type,
      date: income.date,
    })),
    expenses: expenseRecords.map((expense) => ({
      id: expense.id,
      amount: Number(expense.amount),
      category: expense.category,
      note: expense.note,
      date: expense.date,
    })),
    savings: savingsRecords.map((saving) => ({
      id: saving.id,
      amount: Number(saving.amount),
      note: saving.note,
      date: saving.date,
    })),
  };

  const summary = calculateDashboardSummary(records);
  const activities = buildRecentActivities(records);

  const { healthData, financeData } =
    buildDashboardChartData(records);

  const firstName = user.name.trim().split(/\s+/)[0];

  const savings = records.savings.map((saving) => ({
    id: saving.id,
    amount: saving.amount,
    note: saving.note ?? undefined,
    date: saving.date.toISOString().split("T")[0],
  }));

  const stats = [
    {
      label: "Calories",
      value: `${summary.calories.toLocaleString()} kcal`,
      description: "Calories recorded",
    },
    {
      label: "Exercise",
      value: `${summary.exerciseDuration} min`,
      description: `${summary.exerciseCalories.toLocaleString()} kcal burned`,
    },
    {
      label: "Water",
      value: `${summary.water.toLocaleString()} ml`,
      description: "Water recorded",
    },
    {
      label: "Income",
      value: formatCurrency(summary.income),
      description: "Total income",
    },
    {
      label: "Expenses",
      value: formatCurrency(summary.expenses),
      description: "Total expenses",
    },
    {
      label: "Savings",
      value: formatCurrency(summary.savings),
      description: "Total savings",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Your Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              Welcome, {firstName}!
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Track your daily habits and stay on top of your
              health and finances from one place.
            </p>
          </div>

          <DashboardPeriodSelector value={period} />
        </div>

        <DashboardStats stats={stats} />

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <HealthSummary
            calories={{
              current: summary.calories,
              goal: 2000,
            }}
            exercise={{
              duration: summary.exerciseDuration,
              caloriesBurned: summary.exerciseCalories,
            }}
            water={{
              current: summary.water,
              goal: 2000,
            }}
          />

          <FinancialSummary
            income={summary.income}
            expenses={summary.expenses}
          />
        </div>

        <div className="mt-8">
          <DashboardCharts
            healthData={healthData}
            financeData={financeData}
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <SavingsSummary savings={savings} />

          <RecentActivity activities={activities} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-green-700">
              HEALTH
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Health Tracking
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <DashboardLink href="/meals">
                Track Meals
              </DashboardLink>

              <DashboardLink href="/exercise">
                Track Exercise
              </DashboardLink>

              <DashboardLink href="/water">
                Track Water
              </DashboardLink>
            </div>

            <Link
              href="/health"
              className="mt-5 inline-flex font-semibold text-green-700 transition hover:text-green-800 hover:underline"
            >
              View health overview
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-700">
              FINANCE
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Finance Tracking
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <DashboardLink href="/income">
                Track Income
              </DashboardLink>

              <DashboardLink href="/expenses">
                Track Expenses
              </DashboardLink>

              <DashboardLink href="/savings">
                Track Savings
              </DashboardLink>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#1d2939] px-6 py-7 text-white">
          <h2 className="text-xl font-bold">
            Small habits create meaningful progress.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Keep your records up to date so you can better
            understand your health and financial habits over time.
          </p>
        </div>
      </div>
    </section>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function DashboardLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-blue-400 hover:bg-slate-50"
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}