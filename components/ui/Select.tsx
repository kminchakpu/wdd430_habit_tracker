import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export default function Select({
  label,
  options,
  error,
  helperText,
  placeholder,
  id,
  required,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <select
        id={id}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          error
            ? `${id}-error`
            : helperText
              ? `${id}-helper`
              : undefined
        }
        className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        } ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${id}-helper`}
          className="mt-1.5 text-sm text-slate-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}