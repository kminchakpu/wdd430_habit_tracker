import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
      <div className="max-w-md">
        {icon && (
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-600">
            {icon}
          </div>
        )}

        <h3 className="text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        {action && (
          <div className="mt-5 flex justify-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}