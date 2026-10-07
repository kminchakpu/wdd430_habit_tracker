import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HealthSummary from "../HealthSummary";

describe("HealthSummary", () => {
  it("renders calories, exercise, and water progress", () => {
    render(
      <HealthSummary
        calories={{
          current: 1850,
          goal: 2000,
        }}
        exercise={{
          duration: 45,
          caloriesBurned: 320,
        }}
        water={{
          current: 1500,
          goal: 2000,
        }}
      />
    );

    expect(
      screen.getByText("Health Summary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("1,850 / 2,000 kcal")
    ).toBeInTheDocument();

    expect(
      screen.getByText("45 min")
    ).toBeInTheDocument();

    expect(
      screen.getByText("320 kcal burned")
    ).toBeInTheDocument();

    expect(
      screen.getByText("1,500 / 2,000 ml")
    ).toBeInTheDocument();
  });
});