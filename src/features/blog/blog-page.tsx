import { useState } from "react";
import { FilterTabs } from "@/components/filter-tabs";
import { PageHeading } from "@/components/page-heading";
import { SocialLinks } from "@/components/social-links";
import { TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { PostList } from "@/features/blog/components/post-list";
import { SearchInput } from "@/features/blog/components/search-input";
import { posts } from "@/features/blog/content/posts";
import { ProjectPreview } from "@/features/portfolio/components/project-preview";

export function BlogPage() {
	const [category, setCategory] = useState("All");
	const [query, setQuery] = useState("");
	const categories = ["All", ...new Set(posts.map((post) => post.category))];
	const visiblePosts = posts.filter(
		(post) =>
			(category === "All" || post.category === category) &&
			`${post.title} ${post.description} ${post.category}`
				.toLowerCase()
				.includes(query.trim().toLowerCase()),
	);

	return (
		<>
			<div className="mb-16 grid gap-10 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-center lg:gap-14">
				<div>
					<PageHeading title="Notes on software." className="mb-7 sm:mb-7">
						<p>
							I'm Giorgi, a software developer interested in full-stack development, AI automation,
							and agents. I build web apps and concurrent systems, and share what I learn through my
							notes and <TextLink href="/portfolio">projects</TextLink>.
						</p>
					</PageHeading>
					<div>
						<SocialLinks icons={false} />
					</div>
				</div>
				<ProjectPreview />
			</div>
			<section aria-labelledby="writing-heading">
				<div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-5">
					<h2 id="writing-heading" className="text-2xl font-medium">
						Writing
					</h2>
					<Badge variant="secondary" className="font-sans text-xs text-muted-foreground">
						{posts.length} {posts.length === 1 ? "post" : "posts"}
					</Badge>
				</div>
				<div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
					<FilterTabs
						options={categories}
						value={category}
						onChange={setCategory}
						label="Filter posts by category"
					/>
					<SearchInput value={query} onChange={setQuery} />
				</div>
				<div aria-live="polite" aria-atomic="true">
					<span className="sr-only">{visiblePosts.length} posts found</span>
					{visiblePosts.length ? (
						<PostList posts={visiblePosts} />
					) : (
						<Empty>
							<EmptyHeader>
								<EmptyTitle>No posts found</EmptyTitle>
								<EmptyDescription>Try a different search or category.</EmptyDescription>
							</EmptyHeader>
							<EmptyContent>
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										setCategory("All");
										setQuery("");
									}}
								>
									Show all posts
								</Button>
							</EmptyContent>
						</Empty>
					)}
				</div>
				{posts.some((post) => post.sample) && (
					<p className="mt-5 text-xs leading-6 text-muted-foreground">These are sample posts.</p>
				)}
			</section>
		</>
	);
}
