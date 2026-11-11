import { ArrowUpRight, Code, Play } from "lucide-react";
import { useParams } from "wouter";
import { NotFoundPage } from "@/app/not-found-page";
import { BackLink } from "@/components/back-link";
import { Markdown } from "@/components/content/markdown";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/features/portfolio/content/projects";

export function ProjectPage() {
	const { slug } = useParams<{ slug: string }>();
	const project = projects.find((project) => project.slug === slug);
	if (!project) return <NotFoundPage />;
	return (
		<article className="mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card/95 p-6 shadow-sm sm:p-10">
			<BackLink href="/portfolio">All projects</BackLink>
			<PageHeading title={project.title} eyebrow={project.category}>
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
					srcSet={project.imageSrcSet}
					sizes="(min-width: 848px) 686px, (min-width: 640px) calc(100vw - 162px), calc(100vw - 90px)"
					fetchPriority="high"
					decoding="async"
					alt={project.imageAlt ?? project.title}
					className="mb-10 aspect-video w-full rounded border border-border object-contain"
					width={1280}
					height={720}
				/>
			)}
			{(project.url || project.github || project.video) && (
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
					{project.video && (
						<Button
							variant="outline"
							size="sm"
							nativeButton={false}
							render={<a href={project.video} target="_blank" rel="noopener noreferrer" />}
						>
							Watch demo
							<Play aria-hidden="true" />
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
