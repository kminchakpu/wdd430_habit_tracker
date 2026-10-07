"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface HealthChartData {
  date: string;
  calories: number;
  exercise: number;
  water: number;
}

export interface FinanceChartData {
  date: string;
  income: number;
  expenses: number;
  savings: number;
}

interface DashboardChartsProps {
  healthData: HealthChartData[];
  financeData: FinanceChartData[];
}

function formatCurrency(value: number) {
  return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
}

export default function DashboardCharts({
  healthData,
  financeData,
}: DashboardChartsProps) {
  return (
    <section
      aria-label="Dashboard charts"
      className="grid grid-cols-1 gap-6 xl:grid-cols-2"
    >
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Health Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Calories, exercise, and water trends
          </p>
        </div>

        {healthData.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-lg bg-slate-50">
            <p className="text-sm text-slate-500">
              No health data available.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={healthData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={50}
                />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="calories"
                  name="Calories"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="exercise"
                  name="Exercise"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="water"
                  name="Water"
                  stroke="#0891b2"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            Financial Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Income, expenses, and savings trends
          </p>
        </div>

        {financeData.length === 0 ? (
          <div className="flex h-72 items-center justify-center rounded-lg bg-slate-50">
            <p className="text-sm text-slate-500">
              No financial data available.
            </p>
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={financeData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickFormatter={(value: number) =>
                    value >= 1000
                      ? `${Math.round(value / 1000)}k`
                      : `${value}`
                  }
                  tickLine={false}
                  axisLine={false}
                  width={50}
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(Number(value))
                  }
                />

                <Legend />

                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#dc2626"
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="savings"
                  name="Savings"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </article>
    </section>
  );
}