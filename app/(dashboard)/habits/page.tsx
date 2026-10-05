import HabitForm from "@/components/habits/HabitForm";
import HabitList from "@/components/habits/HabitList";
import HabitStreak from "@/components/habits/HabitStreak";
import HabitProgress from "@/components/habits/HabitProgress";
import HabitDetails from "@/components/habits/HabitDetails";
import HabitCalendar from "@/components/habits/HabitCalendar";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Trackers | Habit Tracker",
  description:
    "Monitor health and financial activity, track progress, and build consistency.",
};

export default async function HabitsPage() {
  const exerciseCount =
    await prisma.exerciseRecord.count();

  const waterCount =
    await prisma.waterIntakeRecord.count();

  const mealCount =
    await prisma.mealRecord.count();

  const incomeCount =
    await prisma.incomeRecord.count();

  const expenseCount =
    await prisma.expenseRecord.count();

  const savingsCount =
    await prisma.savingsRecord.count();

  const healthRecords =
    exerciseCount +
    waterCount +
    mealCount;

  const financeRecords =
    incomeCount +
    expenseCount +
    savingsCount;

  const totalRecords =
    healthRecords +
    financeRecords;
  
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <section className="rounded-2xl border border-slate-700 bg-[#344054] px-8 py-12 text-center shadow-sm">
        <h1 className="font-play text-4xl font-bold text-slate-50 sm:text-5xl">
          Habit Tracker
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-cyan-100">
          Monitor health and financial activities, build consistency,
            and track your long-term progress.
        </p>
      </section>

      <section>
        <HabitDetails
          totalRecords={totalRecords}
          healthRecords={healthRecords}
          financeRecords={financeRecords}
        />
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

      <section>
        <HabitCalendar completedDays={[1, 2, 3, 5, 8, 13, 21]} />
      </section>  

      {/* Add Habit */}
      <section>
        <HabitForm/>
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
