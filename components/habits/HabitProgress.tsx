interface HabitProgressProps {
  completionRate: number;
  completedDays: number;
  totalDays: number;
}

export default function HabitProgress({
  completionRate,
  completedDays,
  totalDays,
}: HabitProgressProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Progress
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Overall habit completion
      </p>

      <div className="mt-5">
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-slate-500">
            Completion Rate
          </span>

          <span className="font-medium text-slate-900">
            {completionRate}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-600"
            style={{
              width: `${completionRate}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-xs text-slate-500">
            Completed
          </p>

          <p className="mt-1 text-lg font-semibold text-emerald-600">
            {completedDays}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-xs text-slate-500">
            Total Days
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {totalDays}
          </p>
        </div>
      </div>
    </div>
  );
}