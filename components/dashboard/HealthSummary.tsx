"use client";

import { useEffect, useState } from "react";

interface Meal {
  calories: number;
}

interface Exercise {
  duration: number;
  calories: number;
}

interface Water {
  amount: number;
  date: string;
}

export default function HealthSummary() {
  const [loading, setLoading] = useState(true);

  const [mealCount, setMealCount] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);

  const [exerciseMinutes, setExerciseMinutes] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const [waterIntake, setWaterIntake] = useState(0);

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
        const waterData = await waterRes.json();

        const meals = mealData.meals ?? [];
        const exercises = exerciseData.exercises ?? [];
        const waterLogs = waterData.waterLogs ?? [];

        const today = new Date()
          .toISOString()
          .split("T")[0];

        const todayMeals = meals.filter(
          (meal: { date: string }) =>
            new Date(meal.date)
              .toISOString()
              .split("T")[0] === today
        );

        const todayExercises = exercises.filter(
          (exercise: { date: string }) =>
            new Date(exercise.date)
              .toISOString()
              .split("T")[0] === today
        );

        const todayWater = waterLogs.filter(
          (water: { date: string }) =>
            new Date(water.date)
              .toISOString()
              .split("T")[0] === today
        );

        setMealCount(todayMeals.length);

        setCaloriesConsumed(
          todayMeals.reduce(
            (sum: number, meal: Meal) =>
              sum + meal.calories,
            0
          )
        );

        setExerciseMinutes(
          todayExercises.reduce(
            (sum: number, exercise: Exercise) =>
              sum + exercise.duration,
            0
          )
        );

        setCaloriesBurned(
          todayExercises.reduce(
            (sum: number, exercise: Exercise) =>
              sum + exercise.calories,
            0
          )
        );

        setWaterIntake(
          todayWater.reduce(
            (sum: number, water: Water) =>
              sum + water.amount,
            0
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  const WATER_GOAL = 2000;
  const EXERCISE_GOAL = 30;
  const MEAL_GOAL = 3;

  const healthScore = Math.round(
    Math.min(waterIntake / WATER_GOAL, 1) * 40 +
      Math.min(exerciseMinutes / EXERCISE_GOAL, 1) * 30 +
      Math.min(mealCount / MEAL_GOAL, 1) * 30
  );

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        Loading health summary...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Health Summary
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
            Meals Logged
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
            {mealCount}
            </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
            Water Intake
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
            {waterIntake}
            </p>

            <p className="text-xs text-slate-500">
            ml
            </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
            Exercise
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
            {exerciseMinutes}
            </p>

            <p className="text-xs text-slate-500">
            minutes
            </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">
            Calories Burned
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
            {caloriesBurned}
            </p>
        </div>
        </div>

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-700">
            Overall Health Score
        </p>

        <p className="mt-1 text-5xl font-bold text-slate-900">
            {healthScore}%
        </p>

        <p className="mt-2 text-sm text-slate-600">
            {healthScore >= 80
            ? "Excellent progress today"
            : healthScore >= 60
            ? "Good progress today"
            : healthScore >= 40
            ? "Keep building momentum"
            : "Log more healthy activities today"}
        </p>

        <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-700">
            <span>
            Calories Consumed: <strong>{caloriesConsumed}</strong>
            </span>

            <span>
            Water Goal:{" "}
            <strong>
                {Math.round(
                (waterIntake / WATER_GOAL) * 100
                )}
                %
            </strong>
            </span>
        </div>
    </div>
  </div>
);
}