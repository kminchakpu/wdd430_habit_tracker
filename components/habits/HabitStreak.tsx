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
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Streak Tracking
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-sm text-slate-500">
            Current Streak
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            🔥 {currentStreak}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4 text-center">
          <p className="text-sm text-slate-500">
            Longest Streak
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            🏆 {longestStreak}
          </p>
        </div>
      </div>
    </div>
  );
}