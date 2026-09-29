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
    <div className="space-y-8">
      {/* Page Header */}
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          Habit Tracker
        </h1>

        <p className="mt-2 text-slate-600">
          Build healthy routines, track streaks, and measure
          your progress over time.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-6 md:grid-cols-2">
        <HabitStreak />
        <HabitProgress />
      </section>

      {/* Add Habit */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Create New Habit
        </h2>

        <HabitForm />
      </section>

      {/* Habit List */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            My Habits
          </h2>

          <p className="text-slate-600">
            Track your daily, weekly, and long-term goals.
          </p>
        </div>

        <HabitList />
      </section>
    </div>
  );
}
