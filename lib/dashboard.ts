export interface DashboardMeal {
  id: string;
  name: string;
  calories: number;
  date: Date;
  notes: string | null;
}

export interface DashboardExercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: Date;
  notes: string | null;
}

export interface DashboardWater {
  id: string;
  amount: number;
  date: Date;
}

export interface DashboardIncome {
  id: string;
  amount: number;
  source: string;
  type: string;
  date: Date | null;
}

export interface DashboardExpense {
  id: string;
  amount: number;
  category: string;
  note: string | null;
  date: Date;
}

export interface DashboardSaving {
  id: string;
  amount: number;
  note: string | null;
  date: Date;
}

export interface DashboardRecords {
  meals: DashboardMeal[];
  exercises: DashboardExercise[];
  water: DashboardWater[];
  income: DashboardIncome[];
  expenses: DashboardExpense[];
  savings: DashboardSaving[];
}

export interface DashboardSummary {
  calories: number;
  exerciseDuration: number;
  exerciseCalories: number;
  water: number;
  income: number;
  expenses: number;
  balance: number;
  savings: number;
}

export function calculateDashboardSummary(
  records: DashboardRecords
): DashboardSummary {
  const calories = records.meals.reduce(
    (total, meal) => total + meal.calories,
    0
  );

  const exerciseDuration = records.exercises.reduce(
    (total, exercise) => total + exercise.duration,
    0
  );

  const exerciseCalories = records.exercises.reduce(
    (total, exercise) => total + exercise.calories,
    0
  );

  const water = records.water.reduce(
    (total, record) => total + record.amount,
    0
  );

  const income = records.income.reduce(
    (total, record) => total + record.amount,
    0
  );

  const expenses = records.expenses.reduce(
    (total, record) => total + record.amount,
    0
  );

  const savings = records.savings.reduce(
    (total, record) => total + record.amount,
    0
  );

  return {
    calories,
    exerciseDuration,
    exerciseCalories,
    water,
    income,
    expenses,
    balance: income - expenses,
    savings,
  };
}

export type DashboardActivityType =
  | "meal"
  | "exercise"
  | "water"
  | "income"
  | "expense"
  | "savings";

export interface DashboardActivity {
  id: string;
  type: DashboardActivityType;
  title: string;
  detail?: string;
  date: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatActivityDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function buildRecentActivities(
  records: DashboardRecords
): DashboardActivity[] {
  const mealActivities: DashboardActivity[] =
    records.meals.map((meal) => ({
      id: `meal-${meal.id}`,
      type: "meal",
      title: meal.name,
      detail: `${meal.calories} kcal`,
      date: formatActivityDate(meal.date),
    }));

  const exerciseActivities: DashboardActivity[] =
    records.exercises.map((exercise) => ({
      id: `exercise-${exercise.id}`,
      type: "exercise",
      title: exercise.name,
      detail: `${exercise.duration} min`,
      date: formatActivityDate(exercise.date),
    }));

  const waterActivities: DashboardActivity[] =
    records.water.map((water) => ({
      id: `water-${water.id}`,
      type: "water",
      title: "Water Intake",
      detail: `${water.amount} ml`,
      date: formatActivityDate(water.date),
    }));

  const incomeActivities: DashboardActivity[] =
    records.income
      .filter(
        (
          income
        ): income is DashboardIncome & {
          date: Date;
        } => income.date !== null
      )
      .map((income) => ({
        id: `income-${income.id}`,
        type: "income",
        title: income.source,
        detail: formatCurrency(income.amount),
        date: formatActivityDate(income.date),
      }));

  const expenseActivities: DashboardActivity[] =
    records.expenses.map((expense) => ({
      id: `expense-${expense.id}`,
      type: "expense",
      title: expense.category,
      detail: formatCurrency(expense.amount),
      date: formatActivityDate(expense.date),
    }));

  const savingsActivities: DashboardActivity[] =
    records.savings.map((saving) => ({
      id: `savings-${saving.id}`,
      type: "savings",
      title: saving.note?.trim() || "Savings deposit",
      detail: formatCurrency(saving.amount),
      date: formatActivityDate(saving.date),
    }));

  return [
    ...mealActivities,
    ...exerciseActivities,
    ...waterActivities,
    ...incomeActivities,
    ...expenseActivities,
    ...savingsActivities,
  ].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}

export interface DashboardHealthChartData {
  date: string;
  calories: number;
  exercise: number;
  water: number;
}

export interface DashboardFinanceChartData {
  date: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface DashboardChartData {
  healthData: DashboardHealthChartData[];
  financeData: DashboardFinanceChartData[];
}

function getDateKey(date: Date) {
  return date.toISOString().split("T")[0];
}

function formatChartDate(dateKey: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateKey}T00:00:00Z`));
}

export function buildDashboardChartData(
  records: DashboardRecords
): DashboardChartData {
  const healthByDate = new Map<
    string,
    {
      calories: number;
      exercise: number;
      water: number;
    }
  >();

  const financeByDate = new Map<
    string,
    {
      income: number;
      expenses: number;
      savings: number;
    }
  >();

  function getHealthEntry(date: Date) {
    const dateKey = getDateKey(date);

    const existing = healthByDate.get(dateKey);

    if (existing) {
      return existing;
    }

    const entry = {
      calories: 0,
      exercise: 0,
      water: 0,
    };

    healthByDate.set(dateKey, entry);

    return entry;
  }

  function getFinanceEntry(date: Date) {
    const dateKey = getDateKey(date);

    const existing = financeByDate.get(dateKey);

    if (existing) {
      return existing;
    }

    const entry = {
      income: 0,
      expenses: 0,
      savings: 0,
    };

    financeByDate.set(dateKey, entry);

    return entry;
  }

  records.meals.forEach((meal) => {
    const entry = getHealthEntry(meal.date);
    entry.calories += meal.calories;
  });

  records.exercises.forEach((exercise) => {
    const entry = getHealthEntry(exercise.date);
    entry.exercise += exercise.duration;
  });

  records.water.forEach((water) => {
    const entry = getHealthEntry(water.date);
    entry.water += water.amount;
  });

  records.income.forEach((income) => {
    if (!income.date) {
      return;
    }

    const entry = getFinanceEntry(income.date);
    entry.income += income.amount;
  });

  records.expenses.forEach((expense) => {
    const entry = getFinanceEntry(expense.date);
    entry.expenses += expense.amount;
  });

  records.savings.forEach((saving) => {
    const entry = getFinanceEntry(saving.date);
    entry.savings += saving.amount;
  });

  const healthData = [...healthByDate.entries()]
    .sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    )
    .map(([date, values]) => ({
      date: formatChartDate(date),
      ...values,
    }));

  const financeData = [...financeByDate.entries()]
    .sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    )
    .map(([date, values]) => ({
      date: formatChartDate(date),
      ...values,
    }));

  return {
    healthData,
    financeData,
  };
}

export type DashboardPeriod =
  | "7d"
  | "30d"
  | "3m"
  | "1y";

export function getDashboardPeriodStart(
  period: DashboardPeriod,
  now = new Date()
): Date {
  const start = new Date(now);

  start.setUTCHours(0, 0, 0, 0);

  switch (period) {
    case "7d":
      start.setUTCDate(start.getUTCDate() - 6);
      break;

    case "30d":
      start.setUTCDate(start.getUTCDate() - 29);
      break;

    case "3m":
      start.setUTCMonth(start.getUTCMonth() - 3);
      break;

    case "1y":
      start.setUTCFullYear(start.getUTCFullYear() - 1);
      break;
  }

  return start;
}