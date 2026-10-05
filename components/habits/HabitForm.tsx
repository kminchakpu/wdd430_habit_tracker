import Link from "next/link";

export default function HabitForm() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-play mb-2 text-3xl font-bold text-slate-900">
        Track Your Progress
      </h2>

      <p className="mb-6 text-slate-600">
        Choose a category to log your progress.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/exercise"
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 transition hover:border-emerald-600 hover:bg-emerald-50"
        >
          Exercise
        </Link>
        
        <Link
          href="/water"
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 transition hover:border-emerald-600 hover:bg-emerald-50"
        >
          Water Intake
        </Link>
        
        <Link
          href="/meals"
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 transition hover:border-emerald-600 hover:bg-emerald-50"
        >
          Meals
        </Link>
        <Link
          href="/income"
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 transition hover:border-emerald-600 hover:bg-emerald-50"   
        >
          Income
        </Link>
        <Link
          href="/expenses"
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 transition hover:border-emerald-600 hover:bg-emerald-50"
        >
          Expenses
        </Link>
        <Link
          href="/savings"
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 transition hover:border-emerald-600 hover:bg-emerald-50"
        >
          Savings
        </Link>
      </div>
    </div>
  );
}