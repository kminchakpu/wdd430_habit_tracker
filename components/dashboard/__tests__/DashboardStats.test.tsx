import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DashboardStats from "../DashboardStats";

describe("DashboardStats", () => {
  it("renders the supplied dashboard statistics", () => {
    const stats = [
      {
        label: "Calories Today",
        value: "1,850",
        description: "of 2,000 kcal",
      },
      {
        label: "Exercise",
        value: "45 min",
        description: "Today",
      },
      {
        label: "Water",
        value: "1,500 ml",
        description: "of 2,000 ml",
      },
      {
        label: "Monthly Income",
        value: "₦300,000",
        description: "This month",
      },
    ];

    render(<DashboardStats stats={stats} />);

    expect(
      screen.getByText("Calories Today")
    ).toBeInTheDocument();

    expect(
      screen.getByText("1,850")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Exercise")
    ).toBeInTheDocument();

    expect(
      screen.getByText("45 min")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Water")
    ).toBeInTheDocument();

    expect(
      screen.getByText("1,500 ml")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Monthly Income")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦300,000")
    ).toBeInTheDocument();
  });
});