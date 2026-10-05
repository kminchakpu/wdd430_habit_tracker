interface HabitDetailsProps {
  totalRecords: number;
  healthRecords: number;
  financeRecords: number;
}

export default function HabitDetails({
  totalRecords,
  healthRecords,
  financeRecords,
}: HabitDetailsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="font-play text-3xl font-bold text-slate-900">
          Tracker Overview
        </h1>

        <p className="mt-2 text-slate-600">
          Monitor your health and financial progress using the available
          tracking tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-500">
            Total Activity
          </p>

          <p className="text-lg font-semibold text-slate-900">
            {totalRecords}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-500">
            Health Entries
          </p>

          <p className="text-lg font-semibold text-emerald-600">
            {healthRecords}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-500">
            Finance Entries
          </p>

          <p className="text-lg font-semibold text-slate-900">
            {financeRecords}
          </p>
        </div>
      </div>
    </div>
  );
}