import HabitCard from "./HabitCard";

const trackers = [
  {
    id: "exercise",
    name: "Exercise",
    category: "Health",
    href: "/exercise",
    description: "description"
  },
  {
    id: "water",
    name: "Water Intake",
    category: "Health",
    href: "/water",
    description: "description"
  },
  {
    id: "meals",
    name: "Meals",
    category: "Nutrition",
    href: "/meals",
    description: "description"
  },
  {
    id: "income",
    name: "Income",
    category: "Finance",
    href: "/income",
    description: "description"
  },
  {
    id: "expenses",
    name: "Expenses",
    category: "Finance",
    href: "/expenses",
    description: "description"
  },
  {
    id: "savings",
    name: "Savings",
    category: "Finance",
    href: "/savings",
    description: "description"
  },
];

export default function HabitList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {trackers.map((tracker) => (
        <HabitCard
          key={tracker.id}
          name={tracker.name}
          category={tracker.category}
          href={tracker.href}
          description={tracker.description}
        />
      ))}
    </div>
  );
}