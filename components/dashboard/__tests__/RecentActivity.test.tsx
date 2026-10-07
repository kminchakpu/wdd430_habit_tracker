import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecentActivity from "../RecentActivity";

describe("RecentActivity", () => {
  it("renders recent health and finance activities", () => {
    const activities = [
      {
        id: "activity-1",
        type: "meal" as const,
        title: "Breakfast",
        detail: "450 kcal",
        date: "2026-10-07",
      },
      {
        id: "activity-2",
        type: "exercise" as const,
        title: "Morning Walk",
        detail: "30 min",
        date: "2026-10-07",
      },
      {
        id: "activity-3",
        type: "income" as const,
        title: "Monthly Salary",
        detail: "₦300,000",
        date: "2026-10-06",
      },
      {
        id: "activity-4",
        type: "expense" as const,
        title: "Groceries",
        detail: "₦25,000",
        date: "2026-10-05",
      },
    ];

    render(<RecentActivity activities={activities} />);

    expect(
      screen.getByText("Recent Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Breakfast")
    ).toBeInTheDocument();

    expect(
      screen.getByText("450 kcal")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Morning Walk")
    ).toBeInTheDocument();

    expect(
      screen.getByText("30 min")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Monthly Salary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦300,000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Groceries")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦25,000")
    ).toBeInTheDocument();
  });

  it("renders an empty state when there are no activities", () => {
    render(<RecentActivity activities={[]} />);

    expect(
      screen.getByText("No recent activity.")
    ).toBeInTheDocument();
  });
});