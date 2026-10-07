import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FinancialSummary from "../FinancialSummary";

describe("FinancialSummary", () => {
  it("renders income, expenses, and calculated balance", () => {
    render(
      <FinancialSummary
        income={300000}
        expenses={125000}
      />
    );

    expect(
      screen.getByText("Financial Summary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Income")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦300,000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Expenses")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦125,000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Balance")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₦175,000")
    ).toBeInTheDocument();
  });
});