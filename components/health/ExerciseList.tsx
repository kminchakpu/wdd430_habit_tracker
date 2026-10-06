import ExerciseCard from "./ExerciseCard";

interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ExerciseList({
  exercises,
  onEdit,
  onDelete,
}: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-100 p-8 text-center">
        <p className="text-sm text-slate-500">
          No exercise recorded yet. Add your first activity to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          {...ex}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}