"use client";

import { useState, useEffect } from "react";
import MealForm from "@/components/health/MealForm";
import MealList from "@/components/health/MealList";
import { MealFormData } from "@/types/health";

interface Meal {
  id: string;
  name: string;
  calories: number;
  date: string;
  notes?: string;
}

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealFormData | undefined>();
  const [error, setError] = useState("");

  const fetchMeals = async () => {
    try {
      const response = await fetch("/api/meals");
      const data = await response.json();

      if (response.ok) {
        setMeals(
          data.meals.map((meal: any) => ({
            ...meal,
            date: new Date(meal.date).toISOString().split("T")[0],
          }))
        );
      } else {
        setError(data.message || "Failed to fetch meals");
      }
    } catch (err) {
      setError("Failed to fetch meals");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSubmit = async (data: MealFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const url = data.id ? `/api/meals/${data.id}` : "/api/meals";
      const method = data.id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setShowForm(false);
        setEditingMeal(undefined);
        await fetchMeals();
      } else {
        setError(result.message || "Failed to save meal");
      }
    } catch (err) {
      setError("Failed to save meal");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const meal = meals.find((m) => m.id === id);
    if (meal) {
      setEditingMeal(meal);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal?")) {
      return;
    }

    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchMeals();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete meal");
      }
    } catch (err) {
      setError("Failed to delete meal");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMeal(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Meals</h1>
            <p className="mt-1 text-slate-400">Track your daily meals and calories</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
            >
              Add Meal
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-6">
            <MealForm
              meal={editingMeal}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </div>
        )}

        <MealList meals={meals} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
