import { ArrowUpRight, Code } from "lucide-react";
import { useParams } from "wouter";
import { BackLink } from "@/components/back-link";
import { Markdown } from "@/components/markdown";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { NotFoundPage } from "@/pages/not-found-page";

export function ProjectPage() {
	const { slug } = useParams<{ slug: string }>();
	const project = projects.find((project) => project.slug === slug);
	if (!project) return <NotFoundPage />;
	return (
		<article className="mx-auto max-w-3xl">
			<BackLink href="/portfolio">All projects</BackLink>
			<PageHeading title={project.title}>
				<p>{project.description}</p>
			</PageHeading>
			<div className="-mt-5 mb-8 flex flex-wrap gap-x-4 gap-y-2 font-sans text-xs text-muted-foreground">
				{project.tags.map((tag) => (
					<Badge key={tag} variant="secondary">
						{tag}
					</Badge>
				))}
			</div>
			{project.image && (
				<img
					src={project.image}
					alt={project.imageAlt ?? project.title}
					className="mb-10 aspect-video w-full rounded border border-border object-cover"
				/>
			)}
			{(project.url || project.github) && (
				<div className="mb-10 flex flex-wrap gap-5 text-sm">
					{project.url && (
						<Button
							variant="outline"
							size="sm"
							nativeButton={false}
							render={<a href={project.url} target="_blank" rel="noopener noreferrer" />}
						>
							Visit site
							<ArrowUpRight aria-hidden="true" />
						</Button>
					)}
					{project.github && (
						<Button
							variant="outline"
							size="sm"
							nativeButton={false}
							render={<a href={project.github} target="_blank" rel="noopener noreferrer" />}
						>
							View repository
							<Code aria-hidden="true" />
						</Button>
					)}
				</div>
			)}
			<Markdown content={project.content} />
		</article>
	);
}
