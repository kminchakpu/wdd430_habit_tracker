interface HabitStreakProps {
  currentStreak: number;
  longestStreak: number;
}

export default function HabitStreak({
  currentStreak,
  longestStreak,
}: HabitStreakProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-play mb-2 text-xl font-bold text-slate-900">
        Activity Streaks
      </h2>

      <p className="mb-4 text-sm text-slate-500">
        Track your consistency across health and finance activities.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-sm text-slate-500">
            Current Streak
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            🔥 {currentStreak}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Active days in a row
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-sm text-slate-500">
            Best Streak
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            🏆 {longestStreak}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Personal record
          </p>
        </div>
      </div>
    </div>
  );
}
``