import MealCard from "./MealCard";

interface Meal {
  id: string;
  name: string;
  calories: number;
  date: string;
  notes?: string;
}

interface MealListProps {
  meals: Meal[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MealList({ meals, onEdit, onDelete }: MealListProps) {
  if (meals.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-100 p-8 text-center">
        <p className="text-sm text-slate-500">
          No meals recorded yet. Add your first meal to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          {...meal}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}