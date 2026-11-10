import { cn } from "cn";
import type { ReactNode } from "react";

export function PageHeading({
	title,
	eyebrow,
	children,
	className,
}: {
	title: string;
	eyebrow?: string;
	children?: ReactNode;
	className?: string;
}) {
	return (
		<header className={cn("mb-12 sm:mb-16", className)}>
			{eyebrow && <p className="mb-4 text-sm font-medium text-primary">{eyebrow}</p>}
			<h1 className="text-4xl leading-[1.12] font-medium tracking-tight sm:text-5xl lg:text-6xl">
				{title}
			</h1>
			{children && (
				<div className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>
			)}
		</header>
	);
}
