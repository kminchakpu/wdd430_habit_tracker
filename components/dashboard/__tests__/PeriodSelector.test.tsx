import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PeriodSelector from "../PeriodSelector";

describe("PeriodSelector", () => {
  it("renders the available periods", () => {
    render(
      <PeriodSelector
        value="7d"
        onChange={() => {}}
      />
    );

    expect(
      screen.getByRole("option", { name: "Last 7 Days" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Last 30 Days" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Last 3 Months" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Last Year" })
    ).toBeInTheDocument();
  });

  it("calls onChange when the selected period changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <PeriodSelector
        value="7d"
        onChange={handleChange}
      />
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "Dashboard period",
      }),
      "30d"
    );

    expect(handleChange).toHaveBeenCalledWith("30d");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});