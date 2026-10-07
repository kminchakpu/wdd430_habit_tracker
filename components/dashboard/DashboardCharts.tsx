"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#059669", // emerald-600
  "#344054", // site blue-gray
];

export default function DashboardCharts() {
  const [waterData, setWaterData] = useState([
    { name: "Consumed", value: 0 },
    { name: "Remaining", value: 2000 },
  ]);

  type CalorieData = {
    name: string;
    calories: number;
    fill: string;
    };

    const [calorieData, setCalorieData] = useState<CalorieData[]>([
    {
        name: "Consumed",
        calories: 0,
        fill: "#059669",
    },
    {
        name: "Burned",
        calories: 0,
        fill: "#344054",
    },
    ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mealRes, exerciseRes, waterRes] =
          await Promise.all([
            fetch("/api/meals"),
            fetch("/api/exercise"),
            fetch("/api/water"),
          ]);

        const mealData = await mealRes.json();
        const exerciseData = await exerciseRes.json();
        const waterDataResponse =
          await waterRes.json();

        const meals = mealData.meals ?? [];
        const exercises =
          exerciseData.exercises ?? [];
        const waterLogs =
          waterDataResponse.waterLogs ?? [];

        const today = new Date()
          .toISOString()
          .split("T")[0];

        const caloriesConsumed = meals
          .filter(
            (meal: { date: string }) =>
              new Date(meal.date)
                .toISOString()
                .split("T")[0] === today
          )
          .reduce(
            (
              sum: number,
              meal: { calories: number }
            ) => sum + meal.calories,
            0
          );

        const caloriesBurned = exercises
          .filter(
            (exercise: { date: string }) =>
              new Date(exercise.date)
                .toISOString()
                .split("T")[0] === today
          )
          .reduce(
            (
              sum: number,
              exercise: { calories: number }
            ) => sum + exercise.calories,
            0
          );

        const waterConsumed = waterLogs
          .filter(
            (water: { date: string }) =>
              new Date(water.date)
                .toISOString()
                .split("T")[0] === today
          )
          .reduce(
            (
              sum: number,
              water: { amount: number }
            ) => sum + water.amount,
            0
          );

        setCalorieData([
            {
                name: "Consumed",
                calories: caloriesConsumed,
                fill: "#059669",
            },
            {
                name: "Burned",
                calories: caloriesBurned,
                fill: "#344054",
            },
            ]);

        setWaterData([
          {
            name: "Consumed",
            value: waterConsumed,
          },
          {
            name: "Remaining",
            value: Math.max(
              2000 - waterConsumed,
              0
            ),
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    void loadData();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-slate-900">
            Daily Water Goal
            </h2>

            <p className="mb-4 text-sm text-slate-500">
                Progress toward today&apos;s 2,000ml goal
            </p>

        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={waterData}
                dataKey="value"
                outerRadius={100}
              >
                {waterData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-slate-900">
            Calories In vs Out
            </h2>

            <p className="mb-4 text-sm text-slate-500">
                Today&apos;s calories consumed compared to calories burned
            </p>

        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={calorieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories">
                {calorieData.map((entry, index) => (
                    <Cell
                    key={index}
                    fill={entry.fill}
                    />
                ))}
                </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}