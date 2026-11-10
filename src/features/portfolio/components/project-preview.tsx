import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Item, ItemActions, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { projects } from "@/features/portfolio/content/projects";

export function ProjectPreview() {
	return (
		<aside
			className="rounded-2xl border border-border/70 bg-card/90 p-2 shadow-lg shadow-foreground/3"
			aria-label="Selected projects"
		>
			<div className="px-4 pt-4 pb-2">
				<h2 className="font-sans text-sm font-medium text-muted-foreground">Projects</h2>
			</div>
			<ItemGroup className="gap-0">
				{projects.slice(0, 3).map((project) => (
					<li key={project.slug}>
						<Item
							render={<Link href={`/portfolio/${project.slug}`} />}
							className="gap-3 rounded-xl px-4 py-4 hover:bg-primary/5"
						>
							<ItemContent>
								<ItemTitle className="text-sm font-semibold tracking-normal normal-case">
									{project.title}
								</ItemTitle>
								<span className="mt-1 text-xs text-muted-foreground">
									{project.tags.slice(0, 2).join(" · ")}
								</span>
							</ItemContent>
							<ItemActions>
								<ArrowUpRight aria-hidden="true" className="size-4 text-primary" />
							</ItemActions>
						</Item>
					</li>
				))}
			</ItemGroup>
			<Link
				href="/portfolio"
				className="m-1 mt-2 flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm text-primary underline-offset-4 hover:underline"
			>
				All projects
				<ArrowUpRight aria-hidden="true" className="size-3.5" />
			</Link>
		</aside>
	);
}
