import type { ReactNode } from "react";

export interface DashboardStat {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
}

interface DashboardStatsProps {
  stats: DashboardStat[];
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  return (
    <section
      aria-label="Dashboard statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500">
                {stat.label}
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </p>

              {stat.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {stat.description}
                </p>
              )}
            </div>

            {stat.icon && (
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                aria-hidden="true"
              >
                {stat.icon}
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}