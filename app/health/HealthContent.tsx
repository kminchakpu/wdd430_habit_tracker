"use client";
import { useEffect, useState } from "react";
import MealForm from "@/components/health/MealForm";
import MealList from "@/components/health/MealList";
import ExerciseForm, { ExerciseFormData } from "@/components/health/ExerciseForm";
import ExerciseList from "@/components/health/ExerciseList";
import WaterForm, { WaterFormData } from "@/components/health/WaterForm";
import WaterList from "@/components/health/WaterList";
import WaterSummary from "@/components/health/WaterSummary";
import { MealFormData } from "@/types/health";
interface Meal {
  id: string;
  name: string;
  calories: number;
  date: string;
  notes?: string;
}
interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string;
}
interface Water {
  id: string;
  amount: number;
  date: string;
}
interface MealApiRecord {
  id: string;
  name: string;
  calories: number;
  date: string;
  notes?: string | null;
}
interface ExerciseApiRecord {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string | null;
}
interface WaterApiRecord {
  id: string;
  amount: number;
  date: string;
}
interface MealApiResponse {
  meals?: MealApiRecord[];
  message?: string;
}
interface ExerciseApiResponse {
  exercises?: ExerciseApiRecord[];
  message?: string;
}
interface WaterApiResponse {
  waterLogs?: WaterApiRecord[];
  message?: string;
}
export default function HealthContent() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [isSubmittingMeal, setIsSubmittingMeal] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealFormData | undefined>();
  const [mealError, setMealError] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoadingExercises, setIsLoadingExercises] = useState(true);
  const [isSubmittingExercise, setIsSubmittingExercise] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseFormData | undefined>();
  const [exerciseError, setExerciseError] = useState("");
  const [waterLogs, setWaterLogs] = useState<Water[]>([]);
  const [isLoadingWater, setIsLoadingWater] = useState(true);
  const [isSubmittingWater, setIsSubmittingWater] = useState(false);
  const [showWaterForm, setShowWaterForm] = useState(false);
  const [editingWater, setEditingWater] = useState<WaterFormData | undefined>();
  const [waterError, setWaterError] = useState("");
  const dailyGoal = 2000;
  const fetchMeals = async () => {
    try {
      const response = await fetch("/api/meals");
      const data: MealApiResponse = await response.json();
      if (response.ok) {
        const records = data.meals ?? [];
        setMeals(
          records.map((meal) => ({
            id: meal.id,
            name: meal.name,
            calories: meal.calories,
            date: new Date(meal.date).toISOString().split("T")[0],
            notes: meal.notes ?? undefined,
          })),
        );
      } else {
        setMealError(data.message || "Failed to fetch meals");
      }
    } catch {
      setMealError("Failed to fetch meals");
    } finally {
      setIsLoadingMeals(false);
    }
  };
  const fetchExercises = async () => {
    try {
      const response = await fetch("/api/exercise");
      const data: ExerciseApiResponse = await response.json();
      if (response.ok) {
        const records = data.exercises ?? [];
        setExercises(
          records.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            duration: exercise.duration,
            calories: exercise.calories,
            date: new Date(exercise.date).toISOString().split("T")[0],
            notes: exercise.notes ?? undefined,
          })),
        );
      } else {
        setExerciseError(data.message || "Failed to fetch exercises");
      }
    } catch {
      setExerciseError("Failed to fetch exercises");
    } finally {
      setIsLoadingExercises(false);
    }
  };
  const fetchWaterLogs = async () => {
    try {
      const response = await fetch("/api/water");
      const data: WaterApiResponse = await response.json();
      if (response.ok) {
        const records = data.waterLogs ?? [];
        setWaterLogs(
          records.map((log) => ({
            id: log.id,
            amount: log.amount,
            date: new Date(log.date).toISOString().split("T")[0],
          })),
        );
      } else {
        setWaterError(data.message || "Failed to fetch water logs");
      }
    } catch {
      setWaterError("Failed to fetch water logs");
    } finally {
      setIsLoadingWater(false);
    }
  };
  useEffect(() => {
    let ignore = false;
    const loadHealthData = async () => {
      const [mealsResult, exercisesResult, waterResult] =
        await Promise.allSettled([
          fetch("/api/meals"),
          fetch("/api/exercise"),
          fetch("/api/water"),
        ]);
      if (ignore) return;
      if (mealsResult.status === "fulfilled") {
        try {
          const data: MealApiResponse = await mealsResult.value.json();
          if (!ignore) {
            if (mealsResult.value.ok) {
              const records = data.meals ?? [];
              setMeals(
                records.map((meal) => ({
                  id: meal.id,
                  name: meal.name,
                  calories: meal.calories,
                  date: new Date(meal.date).toISOString().split("T")[0],
                  notes: meal.notes ?? undefined,
                })),
              );
            } else {
              setMealError(data.message || "Failed to fetch meals");
            }
          }
        } catch {
          if (!ignore) {
            setMealError("Failed to fetch meals");
          }
        }
      } else {
        setMealError("Failed to fetch meals");
      }
      if (exercisesResult.status === "fulfilled") {
        try {
          const data: ExerciseApiResponse =
            await exercisesResult.value.json();
          if (!ignore) {
            if (exercisesResult.value.ok) {
              const records = data.exercises ?? [];
              setExercises(
                records.map((exercise) => ({
                  id: exercise.id,
                  name: exercise.name,
                  duration: exercise.duration,
                  calories: exercise.calories,
                  date: new Date(exercise.date)
                    .toISOString()
                    .split("T")[0],
                  notes: exercise.notes ?? undefined,
                })),
              );
            } else {
              setExerciseError(
                data.message || "Failed to fetch exercises",
              );
            }
          }
        } catch {
          if (!ignore) {
            setExerciseError("Failed to fetch exercises");
          }
        }
      } else {
        setExerciseError("Failed to fetch exercises");
      }
      if (waterResult.status === "fulfilled") {
        try {
          const data: WaterApiResponse = await waterResult.value.json();
          if (!ignore) {
            if (waterResult.value.ok) {
              const records = data.waterLogs ?? [];
              setWaterLogs(
                records.map((log) => ({
                  id: log.id,
                  amount: log.amount,
                  date: new Date(log.date).toISOString().split("T")[0],
                })),
              );
            } else {
              setWaterError(
                data.message || "Failed to fetch water logs",
              );
            }
          }
        } catch {
          if (!ignore) {
            setWaterError("Failed to fetch water logs");
          }
        }
      } else {
        setWaterError("Failed to fetch water logs");
      }
      if (!ignore) {
        setIsLoadingMeals(false);
        setIsLoadingExercises(false);
        setIsLoadingWater(false);
      }
    };
    void loadHealthData();
    return () => {
      ignore = true;
    };
  }, []);
  const handleMealSubmit = async (data: MealFormData) => {
    setIsSubmittingMeal(true);
    setMealError("");
    try {
      const url = data.id ? `/api/meals/${data.id}` : "/api/meals";
      const method = data.id ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { message?: string } = await response.json();
      if (response.ok) {
        setShowMealForm(false);
        setEditingMeal(undefined);
        await fetchMeals();
      } else {
        setMealError(result.message || "Failed to save meal");
      }
    } catch {
      setMealError("Failed to save meal");
    } finally {
      setIsSubmittingMeal(false);
    }
  };
  const handleMealEdit = (id: string) => {
    const meal = meals.find((item) => item.id === id);
    if (meal) {
      setEditingMeal(meal);
      setShowMealForm(true);
    }
  };
  const handleMealDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) return;
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchMeals();
      } else {
        const data: { message?: string } = await response.json();
        setMealError(data.message || "Failed to delete meal");
      }
    } catch {
      setMealError("Failed to delete meal");
    }
  };
  const handleExerciseSubmit = async (data: ExerciseFormData) => {
    setIsSubmittingExercise(true);
    setExerciseError("");
    try {
      const url = data.id
        ? `/api/exercise/${data.id}`
        : "/api/exercise";
      const method = data.id ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { message?: string } = await response.json();
      if (response.ok) {
        setShowExerciseForm(false);
        setEditingExercise(undefined);
        await fetchExercises();
      } else {
        setExerciseError(
          result.message || "Failed to save exercise",
        );
      }
    } catch {
      setExerciseError("Failed to save exercise");
    } finally {
      setIsSubmittingExercise(false);
    }
  };
  const handleExerciseEdit = (id: string) => {
    const exercise = exercises.find((item) => item.id === id);
    if (exercise) {
      setEditingExercise(exercise);
      setShowExerciseForm(true);
    }
  };
  const handleExerciseDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exercise?")) {
      return;
    }
    try {
      const response = await fetch(`/api/exercise/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchExercises();
      } else {
        const data: { message?: string } = await response.json();
        setExerciseError(
          data.message || "Failed to delete exercise",
        );
      }
    } catch {
      setExerciseError("Failed to delete exercise");
    }
  };
  const handleWaterSubmit = async (data: WaterFormData) => {
    setIsSubmittingWater(true);
    setWaterError("");
    try {
      const url = data.id
        ? `/api/water/${data.id}`
        : "/api/water";
      const method = data.id ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { message?: string } = await response.json();
      if (response.ok) {
        setShowWaterForm(false);
        setEditingWater(undefined);
        await fetchWaterLogs();
      } else {
        setWaterError(
          result.message || "Failed to save water log",
        );
      }
    } catch {
      setWaterError("Failed to save water log");
    } finally {
      setIsSubmittingWater(false);
    }
  };
  const handleWaterEdit = (id: string) => {
    const water = waterLogs.find((item) => item.id === id);
    if (water) {
      setEditingWater(water);
      setShowWaterForm(true);
    }
  };
  const handleWaterDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this water log?")) {
      return;
    }
    try {
      const response = await fetch(`/api/water/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchWaterLogs();
      } else {
        const data: { message?: string } = await response.json();
        setWaterError(
          data.message || "Failed to delete water log",
        );
      }
    } catch {
      setWaterError("Failed to delete water log");
    }
  };
  const today = new Date().toISOString().split("T")[0];
  const todayTotal = waterLogs
    .filter((log) => log.date === today)
    .reduce((sum, log) => sum + log.amount, 0);
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Health Tracking
          </h1>
          <p className="mt-2 text-slate-400">
            Track your meals, exercise, and water intake
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                🍽️ Meals
              </h2>
              {!showMealForm && (
                <button
                  onClick={() => setShowMealForm(true)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
                >
                  Add Meal
                </button>
              )}
            </div>
            {mealError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {mealError}
              </div>
            )}
            {showMealForm && (
              <div className="mb-4">
                <MealForm
                  meal={editingMeal}
                  onSubmit={handleMealSubmit}
                  onCancel={() => {
                    setShowMealForm(false);
                    setEditingMeal(undefined);
                  }}
                  isLoading={isSubmittingMeal}
                />
              </div>
            )}
            {isLoadingMeals ? (
              <p className="text-slate-400">Loading meals...</p>
            ) : (
              <MealList
                meals={meals}
                onEdit={handleMealEdit}
                onDelete={handleMealDelete}
              />
            )}
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                💪 Exercise
              </h2>
              {!showExerciseForm && (
                <button
                  onClick={() => setShowExerciseForm(true)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
                >
                  Add Exercise
                </button>
              )}
            </div>
            {exerciseError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {exerciseError}
              </div>
            )}
            {showExerciseForm && (
              <div className="mb-4">
                <ExerciseForm
                  exercise={editingExercise}
                  onSubmit={handleExerciseSubmit}
                  onCancel={() => {
                    setShowExerciseForm(false);
                    setEditingExercise(undefined);
                  }}
                  isLoading={isSubmittingExercise}
                />
              </div>
            )}
            {isLoadingExercises ? (
              <p className="text-slate-400">
                Loading exercises...
              </p>
            ) : (
              <ExerciseList
                exercises={exercises}
                onEdit={handleExerciseEdit}
                onDelete={handleExerciseDelete}
              />
            )}
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                💧 Water Intake
              </h2>
              {!showWaterForm && (
                <button
                  onClick={() => setShowWaterForm(true)}
                  className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
                >
                  Add Water
                </button>
              )}
            </div>
            {waterError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {waterError}
              </div>
            )}
            <div className="mb-4">
              <WaterSummary
                total={todayTotal}
                goal={dailyGoal}
                unit="ml"
              />
            </div>
            {showWaterForm && (
              <div className="mb-4">
                <WaterForm
                  water={editingWater}
                  onSubmit={handleWaterSubmit}
                  onCancel={() => {
                    setShowWaterForm(false);
                    setEditingWater(undefined);
                  }}
                  isLoading={isSubmittingWater}
                  unit="ml"
                />
              </div>
            )}
            {isLoadingWater ? (
              <p className="text-slate-400">
                Loading water logs...
              </p>
            ) : (
              <WaterList
                waterLogs={waterLogs}
                onEdit={handleWaterEdit}
                onDelete={handleWaterDelete}
                unit="ml"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}