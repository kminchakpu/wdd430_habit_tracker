import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import HabitStreak from "@/components/habits/HabitStreak";
import HabitProgress from "@/components/habits/HabitProgress";

export const metadata = {
  title: "Habits | Habit Tracker",
  description: "Track habits, build streaks, and improve consistency.",
};

export default function HabitsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <section className="rounded-2xl border border-slate-700 bg-[#344054] px-8 py-12 text-center shadow-sm">
        <h1 className="font-play text-4xl font-bold text-slate-50 sm:text-5xl">
          Habit Tracker
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-cyan-100">
          Build healthy routines, track streaks, and measure your
          progress over time.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-emerald-600 p-6 text-white">
        <p className="text-sm text-white/80">
            📚 Active Habits
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            3
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-white">
          <p className="text-sm text-white/80">
            🔥 Current Streak
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            5 Days
          </h3>
        </div>

        <div className="rounded-2xl bg-rose-600 p-6 text-white">
          <p className="text-sm text-white/80">
            ✅ Completion Rate
          </p>
          <h3 className="mt-2 text-3xl font-bold">
            80%
          </h3>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
            <HabitStreak
              currentStreak={5}
              longestStreak={10}
            />

            <HabitProgress
              completionRate={80}
              completedDays={24}
              totalDays={30}
            />
      </section>

      {/* Add Habit */}
      <section>
        <HabitForm mode="create" />
      </section>

      {/* Habit List */}
      <section className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-play text-3xl font-bold text-slate-900">
            My Habits
          </h2>

          <p className="text-slate-600">
            Track your daily, weekly, and long-term goals.
          </p>
        </div>

        <div className="mt-6">
          <HabitList />
        </div>
      </section>
    </div>
  );
}
