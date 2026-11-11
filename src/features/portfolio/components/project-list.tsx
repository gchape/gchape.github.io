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
import type { Project } from "@/features/portfolio/content/projects";

export function ProjectList({ projects }: { projects: Project[] }) {
	return (
		<ItemGroup className="block columns-1 gap-5 md:columns-2">
			{projects.map((project, index) => (
				<li
					key={project.slug}
					style={{ animationDelay: `${Math.min(index, 6) * 55}ms` }}
					className="mb-5 break-inside-avoid motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-650 motion-safe:ease-smooth"
				>
					<Item
						variant="outline"
						render={<Link href={`/portfolio/${project.slug}`} />}
						className="gap-6 overflow-hidden p-6 hover:border-primary/25 hover:shadow-md hover:shadow-foreground/5 motion-safe:duration-400 motion-safe:hover:-translate-y-0.5 sm:p-8"
					>
						<ItemHeader className="text-xs font-medium text-primary">{project.category}</ItemHeader>
						{project.image && (
							<ItemHeader className="overflow-hidden rounded-xl">
								<img
									src={project.image}
									srcSet={project.imageSrcSet}
									sizes="(min-width: 768px) 480px, 100vw"
									alt={project.imageAlt ?? project.title}
									loading="lazy"
									decoding="async"
									width={1280}
									height={720}
									className="aspect-video w-full object-contain motion-safe:transition-transform motion-safe:duration-650 motion-safe:ease-smooth motion-safe:group-hover/item:scale-[1.02]"
								/>
							</ItemHeader>
						)}
						<ItemContent>
							<ItemTitle className="line-clamp-none text-xl leading-snug font-medium tracking-tight normal-case sm:text-2xl">
								<h2>{project.title}</h2>
							</ItemTitle>
							<ItemDescription className="mt-3 line-clamp-none text-base leading-7">
								{project.description}
							</ItemDescription>
						</ItemContent>
						<ItemActions className="self-start rounded-full bg-muted/70 p-2 text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary">
							<ArrowUpRight
								aria-hidden="true"
								className="size-4 motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-smooth motion-safe:group-hover/item:-translate-y-0.5 motion-safe:group-hover/item:translate-x-0.5"
							/>
						</ItemActions>
						<ItemFooter className="mt-auto flex-wrap gap-y-4 pt-1">
							<div className="flex flex-wrap gap-2">
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
