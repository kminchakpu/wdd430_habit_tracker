"use client";
import { useEffect, useState } from "react";
import ExerciseForm, { ExerciseFormData } from "@/components/health/ExerciseForm";
import ExerciseList from "@/components/health/ExerciseList";
interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string;
}
interface ExerciseApiRecord {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string | null;
}
interface ExerciseApiResponse {
  exercises?: ExerciseApiRecord[];
  message?: string;
}
export default function ExercisePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseFormData | undefined>();
  const [error, setError] = useState("");
  const fetchExercises = async () => {
    try {
      const response = await fetch("/api/exercise");
      const data: ExerciseApiResponse = await response.json();
      if (response.ok) {
        const exerciseRecords = data.exercises ?? [];
        setExercises(
          exerciseRecords.map((exercise) => ({
            id: exercise.id,
            name: exercise.name,
            duration: exercise.duration,
            calories: exercise.calories,
            date: new Date(exercise.date).toISOString().split("T")[0],
            notes: exercise.notes ?? undefined,
          })),
        );
      } else {
        setError(data.message || "Failed to fetch exercises");
      }
    } catch {
      setError("Failed to fetch exercises");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let ignore = false;
    const loadExercises = async () => {
      try {
        const response = await fetch("/api/exercise");
        const data: ExerciseApiResponse = await response.json();
        if (ignore) return;
        if (response.ok) {
          const exerciseRecords = data.exercises ?? [];
          setExercises(
            exerciseRecords.map((exercise) => ({
              id: exercise.id,
              name: exercise.name,
              duration: exercise.duration,
              calories: exercise.calories,
              date: new Date(exercise.date).toISOString().split("T")[0],
              notes: exercise.notes ?? undefined,
            })),
          );
        } else {
          setError(data.message || "Failed to fetch exercises");
        }
      } catch {
        if (!ignore) {
          setError("Failed to fetch exercises");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    void loadExercises();
    return () => {
      ignore = true;
    };
  }, []);
  const handleSubmit = async (data: ExerciseFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const url = data.id ? `/api/exercise/${data.id}` : "/api/exercise";
      const method = data.id ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result: { message?: string } = await response.json();
      if (response.ok) {
        setShowForm(false);
        setEditingExercise(undefined);
        await fetchExercises();
      } else {
        setError(result.message || "Failed to save exercise");
      }
    } catch {
      setError("Failed to save exercise");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = (id: string) => {
    const exercise = exercises.find((item) => item.id === id);
    if (exercise) {
      setEditingExercise(exercise);
      setShowForm(true);
    }
  };
  const handleDelete = async (id: string) => {
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
        setError(data.message || "Failed to delete exercise");
      }
    } catch {
      setError("Failed to delete exercise");
    }
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditingExercise(undefined);
  };
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading exercises...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Exercise</h1>
            <p className="mt-1 text-slate-400">
              Track your workouts and physical activities
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
            >
              Add Exercise
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
            <ExerciseForm
              exercise={editingExercise}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </div>
        )}
        <ExerciseList
          exercises={exercises}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}