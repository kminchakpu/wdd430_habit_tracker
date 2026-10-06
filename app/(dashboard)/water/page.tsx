"use client";
import { useEffect, useState } from "react";
import WaterForm, { WaterFormData } from "@/components/health/WaterForm";
import WaterList from "@/components/health/WaterList";
import WaterSummary from "@/components/health/WaterSummary";
interface Water {
  id: string;
  amount: number;
  date: string;
}
interface WaterApiRecord {
  id: string;
  amount: number;
  date: string;
}
interface WaterApiResponse {
  waterLogs?: WaterApiRecord[];
  message?: string;
}
export default function WaterPage() {
  const [waterLogs, setWaterLogs] = useState<Water[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingWater, setEditingWater] = useState<WaterFormData | undefined>();
  const [error, setError] = useState("");
  const dailyGoal = 2000;
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
        setError(data.message || "Failed to fetch water logs");
      }
    } catch {
      setError("Failed to fetch water logs");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let ignore = false;
    const loadWaterLogs = async () => {
      try {
        const response = await fetch("/api/water");
        const data: WaterApiResponse = await response.json();
        if (ignore) return;
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
          setError(data.message || "Failed to fetch water logs");
        }
      } catch {
        if (!ignore) {
          setError("Failed to fetch water logs");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    void loadWaterLogs();
    return () => {
      ignore = true;
    };
  }, []);
  const handleSubmit = async (data: WaterFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const url = data.id ? `/api/water/${data.id}` : "/api/water";
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
        setEditingWater(undefined);
        await fetchWaterLogs();
      } else {
        setError(result.message || "Failed to save water log");
      }
    } catch {
      setError("Failed to save water log");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = (id: string) => {
    const water = waterLogs.find((item) => item.id === id);
    if (water) {
      setEditingWater(water);
      setShowForm(true);
    }
  };
  const handleDelete = async (id: string) => {
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
        setError(data.message || "Failed to delete water log");
      }
    } catch {
      setError("Failed to delete water log");
    }
  };
  const handleCancel = () => {
    setShowForm(false);
    setEditingWater(undefined);
  };
  const today = new Date().toISOString().split("T")[0];
  const todayTotal = waterLogs
    .filter((log) => log.date === today)
    .reduce((sum, log) => sum + log.amount, 0);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading water logs...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Water Intake
            </h1>
            <p className="mt-1 text-slate-400">
              Track your daily water consumption
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
            >
              Add Water
            </button>
          )}
        </div>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="mb-6">
          <WaterSummary
            total={todayTotal}
            goal={dailyGoal}
            unit="ml"
          />
        </div>
        {showForm && (
          <div className="mb-6">
            <WaterForm
              water={editingWater}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
              unit="ml"
            />
          </div>
        )}
        <WaterList
          waterLogs={waterLogs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          unit="ml"
        />
      </div>
    </div>
  );
}