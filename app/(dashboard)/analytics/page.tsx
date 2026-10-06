"use client";

import { useState } from "react";
import FinancialChart from "@/components/analytics/FinancialChart";
import HabitStreakChart from "@/components/analytics/HabitStreakChart";
import HealthProgressChart from "@/components/analytics/HealthProgressChart";
import MonthlyStats from "@/components/analytics/MonthlyStats";
import SavingsChart from "@/components/analytics/SavingsChart";
import SpendingChart from "@/components/analytics/SpendingChart";
import TrendSummary from "@/components/analytics/TrendSummary";
import WeeklyStats from "@/components/analytics/WeeklyStats";

type Section = "charts" | "summary";
type ChartTab = "financial" | "spending" | "savings" | "health" | "streaks";
type SummaryTab = "weekly" | "monthly" | "trends";

const financialData = [
  { month: "Apr", income: 3200, expenses: 2250 },
  { month: "May", income: 3400, expenses: 2400 },
  { month: "Jun", income: 3300, expenses: 2180 },
  { month: "Jul", income: 3600, expenses: 2550 },
  { month: "Aug", income: 3500, expenses: 2300 },
  { month: "Sep", income: 3750, expenses: 2420 },
];

const spendingData = [
  { category: "Housing", amount: 1200 },
  { category: "Food", amount: 480 },
  { category: "Transport", amount: 260 },
  { category: "Health", amount: 180 },
  { category: "Other", amount: 300 },
];

const savingsData = [
  { month: "Apr", savings: 450 },
  { month: "May", savings: 520 },
  { month: "Jun", savings: 610 },
  { month: "Jul", savings: 560 },
  { month: "Aug", savings: 700 },
  { month: "Sep", savings: 780 },
];

const healthProgressData = [
  { month: "Apr", progress: 54 },
  { month: "May", progress: 61 },
  { month: "Jun", progress: 58 },
  { month: "Jul", progress: 70 },
  { month: "Aug", progress: 76 },
  { month: "Sep", progress: 82 },
];

const habitStreakData = [
  { month: "Apr", streak: 4 },
  { month: "May", streak: 7 },
  { month: "Jun", streak: 5 },
  { month: "Jul", streak: 9 },
  { month: "Aug", streak: 12 },
  { month: "Sep", streak: 15 },
];

const weeklyData = [
  { week: "Week 1", income: 900, expenses: 580, savings: 150 },
  { week: "Week 2", income: 850, expenses: 620, savings: 120 },
  { week: "Week 3", income: 950, expenses: 540, savings: 200 },
  { week: "Week 4", income: 900, expenses: 680, savings: 160 },
];

const monthlyData = [
  { month: "Apr", income: 3200, expenses: 2250, savings: 450 },
  { month: "May", income: 3400, expenses: 2400, savings: 520 },
  { month: "Jun", income: 3300, expenses: 2180, savings: 610 },
  { month: "Jul", income: 3600, expenses: 2550, savings: 560 },
  { month: "Aug", income: 3500, expenses: 2300, savings: 700 },
  { month: "Sep", income: 3750, expenses: 2420, savings: 780 },
];

const trendData = [
  { month: "Apr", savings: 450, expenses: 2250 },
  { month: "May", savings: 520, expenses: 2400 },
  { month: "Jun", savings: 610, expenses: 2180 },
  { month: "Jul", savings: 560, expenses: 2550 },
  { month: "Aug", savings: 700, expenses: 2300 },
  { month: "Sep", savings: 780, expenses: 2420 },
];

const chartTabs: { id: ChartTab; label: string }[] = [
  { id: "financial", label: "Financial" },
  { id: "spending", label: "Spending" },
  { id: "savings", label: "Savings" },
  { id: "health", label: "Health progress" },
  { id: "streaks", label: "Habit streaks" },
];

const summaryTabs: { id: SummaryTab; label: string }[] = [
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "trends", label: "Trend summary" },
];

const chartTitles: Record<ChartTab, string> = {
  financial: "Income vs. expenses",
  spending: "Spending by category",
  savings: "Savings over time",
  health: "Health progress",
  streaks: "Habit streaks",
};

const summaryTitles: Record<SummaryTab, string> = {
  weekly: "Weekly statistics",
  monthly: "Monthly statistics",
  trends: "Savings and expense trends",
};

function TabButton({
  id,
  label,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      id={`${id}-tab`}
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={`${id}-panel`}
      onClick={onSelect}
      className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
        selected
          ? "border-emerald-600 text-emerald-700"
          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
      }`}
    >
      {label}
    </button>
  );
}

export default function AnalyticsPage() {
  const [activeSection, setActiveSection] = useState<Section>("charts");
  const [activeChart, setActiveChart] = useState<ChartTab>("financial");
  const [activeSummary, setActiveSummary] = useState<SummaryTab>("weekly");

  const chartId = `chart-${activeChart}`;
  const summaryId = `summary-${activeSummary}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Your progress
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Analytics
        </h1>
        <p className="mt-2 text-slate-600">
          Explore your health and financial data one chart or summary at a time.
        </p>
      </header>

      <div className="mb-6 border-b border-slate-200">
        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Analytics sections"
        >
          <TabButton
            id="charts-section"
            label="Charts"
            selected={activeSection === "charts"}
            onSelect={() => setActiveSection("charts")}
          />
          <TabButton
            id="summary-section"
            label="Summary"
            selected={activeSection === "summary"}
            onSelect={() => setActiveSection("summary")}
          />
        </div>
      </div>

      {activeSection === "charts" ? (
        <section
          id="charts-section-panel"
          role="tabpanel"
          aria-labelledby="charts-section-tab"
          className="space-y-6"
        >
          <div className="overflow-x-auto border-b border-slate-200">
            <div
              className="flex min-w-max gap-1"
              role="tablist"
              aria-label="Analytics charts"
            >
              {chartTabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={`chart-${tab.id}`}
                  label={tab.label}
                  selected={activeChart === tab.id}
                  onSelect={() => setActiveChart(tab.id)}
                />
              ))}
            </div>
          </div>

          <div
            id={`${chartId}-panel`}
            role="tabpanel"
            aria-labelledby={`${chartId}-tab`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {chartTitles[activeChart]}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Illustrative sample data · Apr–Sep 2026
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[500px] justify-center">
                {activeChart === "financial" && (
                  <FinancialChart data={financialData} />
                )}
                {activeChart === "spending" && (
                  <SpendingChart data={spendingData} />
                )}
                {activeChart === "savings" && (
                  <SavingsChart data={savingsData} />
                )}
                {activeChart === "health" && (
                  <HealthProgressChart data={healthProgressData} />
                )}
                {activeChart === "streaks" && (
                  <HabitStreakChart data={habitStreakData} />
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          id="summary-section-panel"
          role="tabpanel"
          aria-labelledby="summary-section-tab"
          className="space-y-6"
        >
          <div className="overflow-x-auto border-b border-slate-200">
            <div
              className="flex min-w-max gap-1"
              role="tablist"
              aria-label="Analytics summaries"
            >
              {summaryTabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={`summary-${tab.id}`}
                  label={tab.label}
                  selected={activeSummary === tab.id}
                  onSelect={() => setActiveSummary(tab.id)}
                />
              ))}
            </div>
          </div>

          <div
            id={`${summaryId}-panel`}
            role="tabpanel"
            aria-labelledby={`${summaryId}-tab`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {summaryTitles[activeSummary]}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Illustrative sample data · 2026
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[500px] justify-center">
                {activeSummary === "weekly" && (
                  <WeeklyStats data={weeklyData} />
                )}
                {activeSummary === "monthly" && (
                  <MonthlyStats data={monthlyData} />
                )}
                {activeSummary === "trends" && (
                  <TrendSummary data={trendData} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <p className="mt-6 text-xs text-slate-500">
        These charts currently use sample data
      </p>
    </main>
  );
}
