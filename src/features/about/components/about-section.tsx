import type { ReactNode } from "react";
import { Panel } from "@/components/panel";

export function AboutSection({
	id,
	title,
	subtitle,
	children,
}: {
	id: string;
	title: string;
	subtitle?: string;
	children: ReactNode;
}) {
	const headingId = `${id}-heading`;
	return (
		<Panel id={id} aria-labelledby={headingId}>
			<h2 id={headingId} className="font-sans text-base font-semibold">
				{title}
			</h2>
			{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
			<div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">{children}</div>
		</Panel>
	);
}
