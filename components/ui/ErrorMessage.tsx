import type { ReactNode } from "react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: ReactNode;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message,
  action,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <div className="flex gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700"
          aria-hidden="true"
        >
          !
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-red-800">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-red-700">
            {message}
          </p>

          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}