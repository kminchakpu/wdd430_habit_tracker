interface ExerciseCardProps {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ExerciseCard({
  id,
  name,
  duration,
  calories,
  date,
  notes,
  onEdit,
  onDelete,
}: ExerciseCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-100 p-4">
      <div>
        <h4 className="font-semibold text-slate-900">{name}</h4>
        <p className="text-sm text-slate-500">
          {duration} min • {calories} cal • {new Date(date).toLocaleDateString()}
        </p>
        {notes && <p className="mt-1 text-xs text-slate-500">{notes}</p>}
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(id)}
            className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="rounded-lg border border-rose-600 px-3 py-1 text-sm text-rose-600 hover:bg-rose-50"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}