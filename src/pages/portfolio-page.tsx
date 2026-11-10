import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { FilterTabs } from "@/components/filter-tabs";
import { PageHeading } from "@/components/page-heading";
import { ProjectList } from "@/components/project-list";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

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
					Software projects, experiments, and academic work. More code lives on{" "}
					<a
						href={profile.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
					>
						GitHub
						<ArrowUpRight aria-hidden="true" size={13} className="ml-1 inline" />
					</a>
					.
				</p>
			</PageHeading>
			<div className="mb-8">
				<FilterTabs
					options={categories}
					value={category}
					onChange={setCategory}
					label="Filter projects by category"
				/>
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
		</>
	);
}
