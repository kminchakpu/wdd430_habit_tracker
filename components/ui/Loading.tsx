interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export default function Loading({
  message = "Loading...",
  size = "md",
  fullScreen = false,
}: LoadingProps) {
  const sizeStyles = {
    sm: "size-5 border-2",
    md: "size-8 border-4",
    lg: "size-12 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen
          ? "min-h-screen"
          : "min-h-40"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={`${sizeStyles[size]} animate-spin rounded-full border-slate-200 border-t-blue-600`}
          aria-hidden="true"
        />

        {message && (
          <p className="text-sm font-medium text-slate-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}