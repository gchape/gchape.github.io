import type { ReactNode } from "react";
import { profile } from "@/content/profile";

export function PageHeading({ title, children }: { title: string; children?: ReactNode }) {
	return (
		<header className="mb-12 sm:mb-16">
			<title>{`${title} — ${profile.name}`}</title>
			<h1 className="text-5xl leading-tight font-medium tracking-tight sm:text-6xl lg:text-7xl">
				{title}
			</h1>
			{children && (
				<div className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>
			)}
		</header>
	);
}
