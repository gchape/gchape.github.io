import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

let renderQueue = Promise.resolve();

export function MermaidDiagram({ chart }: { chart: string }) {
	const { resolvedTheme } = useTheme();
	const id = `diagram-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
	const container = useRef<HTMLDivElement>(null);
	const figure = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
	const title = /^\s*accTitle:\s*(.+)$/m.exec(chart)?.[1] ?? "Architecture diagram";

	useEffect(() => {
		if (!figure.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				setVisible(true);
				observer.disconnect();
			},
			{ rootMargin: "300px" },
		);
		observer.observe(figure.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!visible) return;
		let active = true;
		setStatus("loading");
		renderQueue = renderQueue
			.then(async () => {
				if (!active) return;
				const { default: mermaid } = await import("mermaid");
				await document.fonts.ready;
				if (!active) return;
				const dark = resolvedTheme === "dark";
				mermaid.initialize({
					startOnLoad: false,
					securityLevel: "strict",
					suppressErrorRendering: true,
					theme: "base",
					look: "classic",
					layout: "dagre",
					htmlLabels: false,
					fontFamily: '"Source Sans 3 Variable", sans-serif',
					flowchart: { curve: "basis", useMaxWidth: true },
					themeVariables: {
						darkMode: dark,
						fontSize: "14px",
						primaryColor: dark ? "#20382e" : "#eaf4ee",
						primaryTextColor: dark ? "#e5efe9" : "#20372c",
						primaryBorderColor: dark ? "#527461" : "#9ab6a6",
						lineColor: dark ? "#8bbba0" : "#47795f",
						secondaryColor: dark ? "#243b32" : "#edf5f0",
						tertiaryColor: dark ? "#17241f" : "#f6faf7",
						tertiaryTextColor: dark ? "#e5efe9" : "#20372c",
						edgeLabelBackground: dark ? "#17241f" : "#f6faf7",
					},
				});
				const { svg } = await mermaid.render(id, chart);
				if (!active || !container.current) return;
				container.current.innerHTML = svg;
				setStatus("ready");
			})
			.catch(() => {
				if (active) setStatus("error");
			});
		return () => {
			active = false;
		};
	}, [chart, id, resolvedTheme, visible]);

	return (
		<figure
			ref={figure}
			className="not-prose my-8 overflow-hidden rounded-2xl border border-border/70 bg-background/70"
		>
			<section
				tabIndex={0}
				aria-label={title}
				aria-busy={status === "loading"}
				className="overflow-x-auto p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
			>
				{status === "loading" && (
					<p role="status" className="py-10 text-center text-sm text-muted-foreground">
						Loading diagram…
					</p>
				)}
				<div
					ref={container}
					hidden={status !== "ready"}
					className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:min-w-[30rem] sm:[&_svg]:min-w-0"
				/>
				{status === "error" && (
					<div className="text-sm text-muted-foreground">
						<p role="status">The diagram could not load. Its source is shown below.</p>
						<pre className="mt-4 whitespace-pre-wrap">{chart}</pre>
					</div>
				)}
			</section>
			<figcaption className="border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
				{title}
			</figcaption>
		</figure>
	);
}
