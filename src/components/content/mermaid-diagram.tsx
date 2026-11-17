import { diagramName } from "@/lib/diagram-name";

export function MermaidDiagram({ chart }: { chart: string }) {
	const name = diagramName(chart);
	const title = /^\s*accTitle:[ \t]*(.+)$/m.exec(chart)?.[1] ?? "Architecture diagram";
	const description = /^\s*accDescr:[ \t]*(.+)$/m.exec(chart)?.[1] ?? title;

	if (!name) return <pre>{chart}</pre>;

	const imageClass = "m-0! mx-auto! h-auto w-full min-w-[30rem] sm:min-w-0";

	return (
		<figure className="not-prose my-8 overflow-hidden rounded-2xl border border-border/70 bg-background/70">
			<section
				tabIndex={0}
				aria-label={title}
				className="overflow-x-auto p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
			>
				<img
					src={`/images/diagrams/${name}-light.svg`}
					alt={description}
					loading="lazy"
					decoding="async"
					className={`${imageClass} block dark:hidden`}
				/>
				<img
					src={`/images/diagrams/${name}-dark.svg`}
					alt={description}
					loading="lazy"
					decoding="async"
					className={`${imageClass} hidden dark:block`}
				/>
			</section>
			<figcaption className="border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
				{title}
			</figcaption>
		</figure>
	);
}
