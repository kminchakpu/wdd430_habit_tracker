import HabitCard from "./HabitCard";

const habits = [
  {
    id: 1,
    name: "Exercise",
    category: "Health",
    frequency: "Daily",
    currentStreak: 5,
    longestStreak: 10,
    completionRate: 80,
  },
  {
    id: 2,
    name: "Drink Water",
    category: "Health",
    frequency: "Daily",
    currentStreak: 3,
    longestStreak: 7,
    completionRate: 60,
  },
  {
    id: 3,
    name: "Save Money",
    category: "Finance",
    frequency: "Weekly",
    currentStreak: 2,
    longestStreak: 5,
    completionRate: 40,
  },
];

export default function HabitList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          name={habit.name}
          category={habit.category}
          frequency={habit.frequency}
          currentStreak={habit.currentStreak}
          longestStreak={habit.longestStreak}
          completionRate={habit.completionRate}
        />
      ))}
    </div>
  );
}