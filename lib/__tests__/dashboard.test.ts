import { describe, expect, it } from "vitest";
import {
  buildDashboardChartData,
  buildRecentActivities,
  calculateDashboardSummary,
  getDashboardPeriodStart,
  type DashboardPeriod,
  type DashboardRecords,
} from "../dashboard";

describe("dashboard transformations", () => {
  it("calculates health and financial totals from dashboard records", () => {
    const records: DashboardRecords = {
      meals: [
        {
          id: "meal-1",
          name: "Breakfast",
          calories: 450,
          date: new Date("2026-10-07T08:00:00Z"),
          notes: null,
        },
        {
          id: "meal-2",
          name: "Lunch",
          calories: 650,
          date: new Date("2026-10-07T13:00:00Z"),
          notes: null,
        },
      ],
      exercises: [
        {
          id: "exercise-1",
          name: "Morning Walk",
          duration: 30,
          calories: 200,
          date: new Date("2026-10-07T07:00:00Z"),
          notes: null,
        },
      ],
      water: [
        {
          id: "water-1",
          amount: 500,
          date: new Date("2026-10-07T09:00:00Z"),
        },
        {
          id: "water-2",
          amount: 750,
          date: new Date("2026-10-07T12:00:00Z"),
        },
      ],
      income: [
        {
          id: "income-1",
          amount: 300000,
          source: "Salary",
          type: "fixed",
          date: new Date("2026-10-01T00:00:00Z"),
        },
      ],
      expenses: [
        {
          id: "expense-1",
          amount: 125000,
          category: "Living Expenses",
          note: null,
          date: new Date("2026-10-05T00:00:00Z"),
        },
      ],
      savings: [
        {
          id: "saving-1",
          amount: 75000,
          note: "Emergency fund",
          date: new Date("2026-10-06T00:00:00Z"),
        },
      ],
    };

    const result = calculateDashboardSummary(records);

    expect(result.calories).toBe(1100);
    expect(result.exerciseDuration).toBe(30);
    expect(result.exerciseCalories).toBe(200);
    expect(result.water).toBe(1250);
    expect(result.income).toBe(300000);
    expect(result.expenses).toBe(125000);
    expect(result.balance).toBe(175000);
    expect(result.savings).toBe(75000);
  });

  it("builds recent activities from health and finance records", () => {
    const records: DashboardRecords = {
      meals: [
        {
          id: "meal-1",
          name: "Breakfast",
          calories: 450,
          date: new Date("2026-10-07T08:00:00Z"),
          notes: null,
        },
      ],
      exercises: [
        {
          id: "exercise-1",
          name: "Morning Walk",
          duration: 30,
          calories: 200,
          date: new Date("2026-10-07T07:00:00Z"),
          notes: null,
        },
      ],
      water: [
        {
          id: "water-1",
          amount: 500,
          date: new Date("2026-10-06T09:00:00Z"),
        },
      ],
      income: [
        {
          id: "income-1",
          amount: 300000,
          source: "Salary",
          type: "fixed",
          date: new Date("2026-10-05T00:00:00Z"),
        },
      ],
      expenses: [
        {
          id: "expense-1",
          amount: 25000,
          category: "Groceries",
          note: null,
          date: new Date("2026-10-04T00:00:00Z"),
        },
      ],
      savings: [
        {
          id: "saving-1",
          amount: 50000,
          note: "Emergency fund",
          date: new Date("2026-10-03T00:00:00Z"),
        },
      ],
    };

    const activities = buildRecentActivities(records);

    expect(activities).toHaveLength(6);

    expect(activities[0]).toMatchObject({
      id: "meal-meal-1",
      type: "meal",
      title: "Breakfast",
      detail: "450 kcal",
    });

    expect(activities[1]).toMatchObject({
      id: "exercise-exercise-1",
      type: "exercise",
      title: "Morning Walk",
      detail: "30 min",
    });

    expect(activities[2]).toMatchObject({
      id: "water-water-1",
      type: "water",
      title: "Water Intake",
      detail: "500 ml",
    });

    expect(activities[3]).toMatchObject({
      id: "income-income-1",
      type: "income",
      title: "Salary",
      detail: "₦300,000",
    });

    expect(activities[4]).toMatchObject({
      id: "expense-expense-1",
      type: "expense",
      title: "Groceries",
      detail: "₦25,000",
    });

    expect(activities[5]).toMatchObject({
      id: "savings-saving-1",
      type: "savings",
      title: "Emergency fund",
      detail: "₦50,000",
    });
  });

  it("builds chart data grouped by date", () => {
    const records: DashboardRecords = {
      meals: [
        {
          id: "meal-1",
          name: "Breakfast",
          calories: 400,
          date: new Date("2026-10-06T08:00:00Z"),
          notes: null,
        },
        {
          id: "meal-2",
          name: "Lunch",
          calories: 600,
          date: new Date("2026-10-06T13:00:00Z"),
          notes: null,
        },
      ],
      exercises: [
        {
          id: "exercise-1",
          name: "Walking",
          duration: 30,
          calories: 150,
          date: new Date("2026-10-06T07:00:00Z"),
          notes: null,
        },
      ],
      water: [
        {
          id: "water-1",
          amount: 500,
          date: new Date("2026-10-06T09:00:00Z"),
        },
        {
          id: "water-2",
          amount: 750,
          date: new Date("2026-10-07T09:00:00Z"),
        },
      ],
      income: [
        {
          id: "income-1",
          amount: 300000,
          source: "Salary",
          type: "fixed",
          date: new Date("2026-10-06T00:00:00Z"),
        },
      ],
      expenses: [
        {
          id: "expense-1",
          amount: 25000,
          category: "Groceries",
          note: null,
          date: new Date("2026-10-06T00:00:00Z"),
        },
        {
          id: "expense-2",
          amount: 10000,
          category: "Transport",
          note: null,
          date: new Date("2026-10-07T00:00:00Z"),
        },
      ],
      savings: [
        {
          id: "saving-1",
          amount: 50000,
          note: "Emergency fund",
          date: new Date("2026-10-07T00:00:00Z"),
        },
      ],
    };

    const result = buildDashboardChartData(records);

    expect(result.healthData).toEqual([
      {
        date: "Oct 6",
        calories: 1000,
        exercise: 30,
        water: 500,
      },
      {
        date: "Oct 7",
        calories: 0,
        exercise: 0,
        water: 750,
      },
    ]);

    expect(result.financeData).toEqual([
      {
        date: "Oct 6",
        income: 300000,
        expenses: 25000,
        savings: 0,
      },
      {
        date: "Oct 7",
        income: 0,
        expenses: 10000,
        savings: 50000,
      },
    ]);
  });

  it("calculates the start date for each dashboard period", () => {
    const now = new Date("2026-10-07T12:00:00Z");

    const periods: {
      period: DashboardPeriod;
      expected: string;
    }[] = [
      {
        period: "7d",
        expected: "2026-10-01T00:00:00.000Z",
      },
      {
        period: "30d",
        expected: "2026-09-08T00:00:00.000Z",
      },
      {
        period: "3m",
        expected: "2026-07-07T00:00:00.000Z",
      },
      {
        period: "1y",
        expected: "2025-10-07T00:00:00.000Z",
      },
    ];

    periods.forEach(({ period, expected }) => {
      expect(
        getDashboardPeriodStart(period, now).toISOString()
      ).toBe(expected);
    });
  });
});
