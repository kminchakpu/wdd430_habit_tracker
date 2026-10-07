export type ActivityType =
  | "meal"
  | "exercise"
  | "water"
  | "income"
  | "expense"
  | "savings";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  detail?: string;
  date: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const activityLabels: Record<ActivityType, string> = {
  meal: "Meal",
  exercise: "Exercise",
  water: "Water",
  income: "Income",
  expense: "Expense",
  savings: "Savings",
};

const activityStyles: Record<ActivityType, string> = {
  meal: "bg-orange-100 text-orange-700",
  exercise: "bg-blue-100 text-blue-700",
  water: "bg-cyan-100 text-cyan-700",
  income: "bg-green-100 text-green-700",
  expense: "bg-red-100 text-red-700",
  savings: "bg-emerald-100 text-emerald-700",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  const recentActivities = [...activities]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 6);

  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <h2
          id="recent-activity-heading"
          className="text-lg font-bold text-slate-900"
        >
          Recent Activity
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your latest health and financial activity
        </p>
      </div>

      {recentActivities.length === 0 ? (
        <div className="rounded-lg bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No recent activity.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Your latest activity will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {recentActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${activityStyles[activity.type]}`}
                aria-hidden="true"
              >
                {activityLabels[activity.type].charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {activity.title}
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${activityStyles[activity.type]}`}
                    >
                      {activityLabels[activity.type]}
                    </span>
                  </div>

                  <p className="shrink-0 text-xs text-slate-500">
                    {formatDate(activity.date)}
                  </p>
                </div>

                {activity.detail && (
                  <p className="mt-2 text-sm text-slate-600">
                    {activity.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}