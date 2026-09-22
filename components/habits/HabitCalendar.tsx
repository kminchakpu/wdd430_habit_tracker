interface HabitCalendarProps {
  completedDays: number[];
}

export default function HabitCalendar({
  completedDays,
}: HabitCalendarProps) {
  const days = Array.from(
    { length: 30 },
    (_, index) => index + 1
  );

  return (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-slate-900">
      Habit Calendar
    </h2>

    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const completed =
          completedDays.includes(day);

        return (
          <div
            key={day}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
              completed
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {day}
          </div>
        );
      })}
    </div>

    <div className="mt-5 border-t border-slate-200 pt-4">
      <div className="flex gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-emerald-600" />
          <span>Completed</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded border border-slate-300 bg-slate-100" />
          <span>Missed</span>
        </div>
      </div>
    </div>
  </div>
);
}