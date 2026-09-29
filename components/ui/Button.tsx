import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
	children,
	className = "",
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className={`inline-flex items-center justify-center ${className}`}
		>
			{children}
		</button>
	);
}
