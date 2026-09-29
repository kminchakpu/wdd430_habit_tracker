import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
	children,
	className = "",
	...props
}: SelectProps) {
	return (
		<select
			{...props}
			className={`w-full rounded-lg bg-white px-3 py-2 text-slate-900 outline-none transition-colors ${className}`}
		>
			{children}
		</select>
	);
}
