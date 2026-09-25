interface HabitDetailsProps {
  name: string;
  description: string;
  category: string;
  frequency: string;
  goal: string;
}

export default function HabitDetails({
  name,
  description,
  category,
  frequency,
  goal,
}: HabitDetailsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
                {name}
            </h1>

            <p className="mt-2 text-slate-600">
                {description}
            </p>
        </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-500">
            Category
          </p>

          <p className="font-medium">
            {category}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-500">
            Frequency
          </p>

          <p className="font-medium">
            {frequency}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-500">
            Goal
          </p>

          <p className="font-medium">
            {goal}
          </p>
        </div>
      </div>
    </div>
  );
}