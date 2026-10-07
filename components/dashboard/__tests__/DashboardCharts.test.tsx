import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardCharts from "../DashboardCharts";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
  BarChart: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
  LineChart: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
  Bar: () => <div />,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));

describe("DashboardCharts", () => {
  it("renders health and finance chart sections", () => {
    const healthData = [
      {
        date: "Oct 5",
        calories: 1800,
        exercise: 30,
        water: 1500,
      },
      {
        date: "Oct 6",
        calories: 1950,
        exercise: 45,
        water: 1800,
      },
      {
        date: "Oct 7",
        calories: 1850,
        exercise: 40,
        water: 2000,
      },
    ];

    const financeData = [
      {
        date: "Oct 5",
        income: 300000,
        expenses: 25000,
        savings: 50000,
      },
      {
        date: "Oct 6",
        income: 0,
        expenses: 15000,
        savings: 25000,
      },
      {
        date: "Oct 7",
        income: 50000,
        expenses: 10000,
        savings: 10000,
      },
    ];

    render(
      <DashboardCharts
        healthData={healthData}
        financeData={financeData}
      />
    );

    expect(
      screen.getByText("Health Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Financial Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Calories, exercise, and water trends"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Income, expenses, and savings trends"
      )
    ).toBeInTheDocument();
  });
});