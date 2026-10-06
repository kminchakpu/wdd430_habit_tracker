interface WaterSummaryProps {
  total: number;
  goal: number;
  unit?: string;
}

export default function WaterSummary({
  total,
  goal,
  unit = "oz",
}: WaterSummaryProps) {
  const progress = goal > 0 ? Math.min((total / goal) * 100, 100) : 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-100 p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Water Intake
      </h3>

      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-emerald-600">{total}</span>
        <span className="text-sm text-slate-500">
          / {goal} {unit}
        </span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-slate-300">
        <div
          className="h-2.5 rounded-full bg-emerald-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {progress.toFixed(0)}% of daily goal
      </p>
    </div>
  );
}