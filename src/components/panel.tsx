import { cn } from "cn";
import type { ComponentProps } from "react";

export function Panel({ className, ...props }: ComponentProps<"section">) {
	return (
		<section
			className={cn("rounded-2xl border border-border/70 bg-card/90 p-6 sm:p-8", className)}
			{...props}
		/>
	);
}
