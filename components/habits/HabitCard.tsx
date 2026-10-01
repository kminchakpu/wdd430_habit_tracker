interface HabitCardProps {
  name: string;
  category: string;
  frequency: string;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}

export default function HabitCard({
  name,
  category,
  frequency,
  currentStreak,
  longestStreak,
  completionRate,
}: HabitCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {category}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {frequency}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-slate-100 p-3">
          <p className="text-xs text-slate-500">
            Current
          </p>

          <p className="mt-1 text-lg font-semibold text-emerald-600">
            🔥 {currentStreak}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-3">
          <p className="text-xs text-slate-500">
            Best
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            🏆 {longestStreak}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-3">
          <p className="text-xs text-slate-500">
            Success
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {completionRate}%
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-500">
            Completion
          </span>

          <span className="font-medium text-slate-700">
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

      <div className="mt-5 flex flex-wrap gap-2">
        <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
          Check In
        </button>

        <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
          Edit
        </button>

        <button className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700">
          Delete
        </button>
      </div>
    </div>
  );
}