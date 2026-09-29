import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export default function Input({
	className = "",
	error,
	...props
}: InputProps) {
	return (
		<input
			{...props}
			aria-invalid={error ? true : props["aria-invalid"]}
			className={`w-full rounded-lg bg-white px-3 py-2 text-slate-900 outline-none transition-colors ${
				error
					? "border border-rose-500 focus:border-rose-600"
					: "border border-slate-300 focus:border-emerald-600"
			} ${className}`}
		/>
	);
}
