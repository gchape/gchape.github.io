import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FilterTabs } from "@/components/filter-tabs";
import { PageHeading } from "@/components/page-heading";
import { Panel } from "@/components/panel";
import { ExternalLink } from "@/components/text-link";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { profile } from "@/content/profile";
import { ProjectList } from "@/features/portfolio/components/project-list";
import { otherRepos, projects, themes } from "@/features/portfolio/content/projects";

export function PortfolioPage() {
	const [category, setCategory] = useState("All");
	const categories = ["All", ...new Set(projects.map((project) => project.category))];
	const visibleProjects = projects.filter(
		(project) => category === "All" || project.category === category,
	);
	return (
		<>
			<PageHeading title="Projects.">
				<p>
					Software projects, experiments, and academic work, mostly around concurrency, databases,
					and systems. More code lives on{" "}
					<ExternalLink href={profile.github}>
						GitHub
						<ArrowUpRight aria-hidden="true" size={13} className="ml-1 inline" />
					</ExternalLink>
					.
				</p>
			</PageHeading>
			<ul className="mb-12 grid gap-5 md:grid-cols-3">
				{themes.map((theme) => (
					<li key={theme.title}>
						<Panel className="h-full p-6 sm:p-6">
							<h2 className="font-sans text-base font-semibold">{theme.title}</h2>
							<p className="mt-3 text-sm leading-7 text-muted-foreground">{theme.text}</p>
						</Panel>
					</li>
				))}
			</ul>
			<div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
				<FilterTabs
					options={categories}
					value={category}
					onChange={setCategory}
					label="Filter projects by category"
				/>
				<span className="text-xs text-muted-foreground">
					{visibleProjects.length} of {projects.length} projects
				</span>
			</div>
			<div aria-live="polite">
				<ProjectList projects={visibleProjects} />
				{!visibleProjects.length && (
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No projects yet</EmptyTitle>
							<EmptyDescription>New projects will be added here.</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			</div>
			<section className="mt-16" aria-labelledby="other-heading">
				<h2 id="other-heading" className="mb-5 text-2xl font-medium">
					Other repositories
				</h2>
				<ul className="grid gap-4 sm:grid-cols-2">
					{otherRepos.map((repo) => (
						<li key={repo.name}>
							<a
								href={`${profile.github}/${repo.name}`}
								target="_blank"
								rel="noopener noreferrer"
								className="block h-full rounded-2xl border border-border/70 bg-card/90 p-5 hover:border-primary/25"
							>
								<span className="font-medium">{repo.name}</span>
								<span className="ml-2 text-xs text-muted-foreground">{repo.language}</span>
								{repo.note && (
									<span className="mt-2 block text-sm text-muted-foreground">{repo.note}</span>
								)}
							</a>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
