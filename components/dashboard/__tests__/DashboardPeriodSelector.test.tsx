import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DashboardPeriodSelector from "../DashboardPeriodSelector";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
  useSearchParams: () => new URLSearchParams("period=7d"),
}));

describe("DashboardPeriodSelector", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("renders the current dashboard period", () => {
    render(<DashboardPeriodSelector value="7d" />);

    expect(
      screen.getByRole("combobox", {
        name: /dashboard period/i,
      })
    ).toHaveValue("7d");
  });

  it("updates the dashboard URL when the period changes", () => {
    render(<DashboardPeriodSelector value="7d" />);

    fireEvent.change(
      screen.getByRole("combobox", {
        name: /dashboard period/i,
      }),
      {
        target: {
          value: "30d",
        },
      }
    );

    expect(push).toHaveBeenCalledWith(
      "/dashboard?period=30d"
    );
  });
});