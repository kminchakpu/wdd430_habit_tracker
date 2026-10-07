import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

interface AnalyticsDateRange {
  startDate: Date;
  endDate: Date;
  endExclusive: Date;
}

interface MonthlyAnalytics {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  meals: number;
  exercises: number;
  water: number;
}

interface SpendingAnalytics {
  category: string;
  amount: number;
}

function parseDate(value: string | null): Date | null {
  if (!value || !DATE_PATTERN.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfTodayUtc() {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
}

function getDateRange(request: Request): AnalyticsDateRange | null {
  const { searchParams } = new URL(request.url);
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  if (Boolean(startDateParam) !== Boolean(endDateParam)) {
    return null;
  }

  const startDate = startDateParam
    ? parseDate(startDateParam)
    : startOfTodayUtc();
  const endDate = endDateParam ? parseDate(endDateParam) : startOfTodayUtc();

  if (!startDate || !endDate) {
    return null;
  }

  if (startDate > endDate) {
    return null;
  }

  const endExclusive = new Date(endDate);
  endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);

  return { startDate, endDate, endExclusive };
}

function monthKey(date: Date) {
  return date.toISOString().slice(0, 7);
}

function monthLabel(month: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T00:00:00.000Z`));
}

function buildMonthlyData(
  startDate: Date,
  endDate: Date,
  incomeRecords: Array<{ date: Date | null; amount: unknown }>,
  expenseRecords: Array<{ date: Date; amount: unknown }>,
  savingsRecords: Array<{ date: Date; amount: unknown }>,
  meals: Array<{ date: Date }>,
  exercises: Array<{ date: Date }>,
  water: Array<{ date: Date }>,
): MonthlyAnalytics[] {
  const months = new Map<string, MonthlyAnalytics>();
  const cursor = new Date(
    Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), 1),
  );

  while (cursor <= endDate) {
    const key = monthKey(cursor);
    months.set(key, {
      month: monthLabel(key),
      income: 0,
      expenses: 0,
      savings: 0,
      meals: 0,
      exercises: 0,
      water: 0,
    });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  for (const record of incomeRecords) {
    if (!record.date) {
      for (const month of months.values()) {
        month.income += Number(record.amount);
      }
      continue;
    }
    const month = months.get(monthKey(record.date));
    if (month) month.income += Number(record.amount);
  }

  for (const record of expenseRecords) {
    const month = months.get(monthKey(record.date));
    if (month) month.expenses += Number(record.amount);
  }

  for (const record of savingsRecords) {
    const month = months.get(monthKey(record.date));
    if (month) month.savings += Number(record.amount);
  }

  for (const record of meals) {
    const month = months.get(monthKey(record.date));
    if (month) month.meals += 1;
  }

  for (const record of exercises) {
    const month = months.get(monthKey(record.date));
    if (month) month.exercises += 1;
  }

  for (const record of water) {
    const month = months.get(monthKey(record.date));
    if (month) month.water += 1;
  }

  return Array.from(months.values());
}

function buildSpendingData(
  expenseRecords: Array<{ date: Date; amount: unknown; category: string }>,
): SpendingAnalytics[] {
  const totals = new Map<string, number>();

  for (const record of expenseRecords) {
    totals.set(
      record.category,
      (totals.get(record.category) ?? 0) + Number(record.amount),
    );
  }

  return Array.from(totals, ([category, amount]) => ({
    category,
    amount,
  })).sort((a, b) => b.amount - a.amount);
}

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const range = getDateRange(request);
    if (!range) {
      return NextResponse.json(
        {
          message:
            "Provide valid startDate and endDate values in YYYY-MM-DD format, with startDate before or equal to endDate.",
          field: "dateRange",
        },
        { status: 400 },
      );
    }

    const { startDate, endDate, endExclusive } = range;
    const dateFilter = {
      gte: startDate,
      lt: endExclusive,
    };

    const [
      incomeRecords,
      expenseRecords,
      savingsRecords,
      meals,
      exercises,
      water,
    ] = await Promise.all([
      prisma.incomeRecord.findMany({
        where: { userId, OR: [{ date: dateFilter }, { date: null }] },
      }),
      prisma.expenseRecord.findMany({
        where: { userId, date: dateFilter },
      }),
      prisma.savingsRecord.findMany({
        where: { userId, date: dateFilter },
      }),
      prisma.meal.findMany({
        where: { userId, date: dateFilter },
      }),
      prisma.exercise.findMany({
        where: { userId, date: dateFilter },
      }),
      prisma.water.findMany({
        where: { userId, date: dateFilter },
      }),
    ]);

    const monthly = buildMonthlyData(
      startDate,
      endDate,
      incomeRecords,
      expenseRecords,
      savingsRecords,
      meals,
      exercises,
      water,
    );
    const spending = buildSpendingData(expenseRecords);
    const totals = monthly.reduce(
      (summary, month) => ({
        income: summary.income + month.income,
        expenses: summary.expenses + month.expenses,
        savings: summary.savings + month.savings,
        meals: summary.meals + month.meals,
        exercises: summary.exercises + month.exercises,
        water: summary.water + month.water,
      }),
      {
        income: 0,
        expenses: 0,
        savings: 0,
        meals: 0,
        exercises: 0,
        water: 0,
      },
    );

    return NextResponse.json({
      period: {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      },
      financial: {
        income: totals.income,
        expenses: totals.expenses,
        savings: totals.savings,
        balance: totals.income - totals.expenses,
      },
      spending,
      health: {
        meals: totals.meals,
        exercises: totals.exercises,
        water: totals.water,
      },
      monthly,
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json(
      { message: "Unable to retrieve analytics." },
      { status: 500 },
    );
  }
}
