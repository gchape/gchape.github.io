import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemTitle,
} from "@/components/ui/item";
import type { Project } from "@/content/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
	return (
		<ItemGroup className="grid gap-6 md:grid-cols-2">
			{projects.map((project, index) => (
				<li
					key={project.slug}
					style={{ animationDelay: `${Math.min(index, 6) * 55}ms` }}
					className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-650 motion-safe:ease-smooth"
				>
					<Item
						variant="outline"
						render={<Link href={`/portfolio/${project.slug}`} />}
						className="h-full gap-6 p-6 sm:p-8 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 motion-safe:duration-400 motion-safe:hover:-translate-y-0.5"
					>
						{project.image && (
							<ItemHeader className="overflow-hidden">
								<img
									src={project.image}
									alt={project.imageAlt ?? project.title}
									loading="lazy"
									className="aspect-video w-full object-cover motion-safe:transition-transform motion-safe:duration-650 motion-safe:ease-smooth motion-safe:group-hover/item:scale-[1.02]"
								/>
							</ItemHeader>
						)}
						<ItemContent>
							<ItemTitle className="line-clamp-none text-2xl leading-snug font-medium normal-case sm:text-3xl">
								<h2>{project.title}</h2>
							</ItemTitle>
							<ItemDescription className="mt-3 line-clamp-none text-base leading-7">
								{project.description}
							</ItemDescription>
						</ItemContent>
						<ItemActions>
							<ArrowUpRight
								aria-hidden="true"
								className="size-5 text-muted-foreground motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-smooth motion-safe:group-hover/item:-translate-y-0.5 motion-safe:group-hover/item:translate-x-0.5"
							/>
						</ItemActions>
						<ItemFooter className="mt-4 flex-wrap gap-y-4">
							<div className="flex flex-wrap gap-3">
								{project.tags.map((tag) => (
									<Badge key={tag} variant="secondary">
										{tag}
									</Badge>
								))}
							</div>
						</ItemFooter>
					</Item>
				</li>
			))}
		</ItemGroup>
	);
}
