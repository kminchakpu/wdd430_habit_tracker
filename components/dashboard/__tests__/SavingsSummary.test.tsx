import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SavingsSummary from "../SavingsSummary";

describe("SavingsSummary", () => {
  it("renders total savings and recent savings records", () => {
    const savings = [
      {
        id: "saving-1",
        amount: 75000,
        note: "Emergency fund",
        date: "2026-10-06",
      },
      {
        id: "saving-2",
        amount: 25000,
        note: "General savings",
        date: "2026-10-01",
      },
    ];

    render(<SavingsSummary savings={savings} />);

    expect(
      screen.getByText("Savings Summary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦100,000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Emergency fund")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦75,000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("General savings")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦25,000")
    ).toBeInTheDocument();
  });
});