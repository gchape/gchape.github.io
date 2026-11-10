import { useState } from "react";
import { Link } from "wouter";
import { FilterTabs } from "@/components/filter-tabs";
import { PageHeading } from "@/components/page-heading";
import { PostList } from "@/components/post-list";
import { SearchInput } from "@/components/search-input";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { posts } from "@/content/posts";

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
			<PageHeading title="Notes on software.">
				<p>
					I'm Giorgi. I build things and write about what I learn along the way. This is a home for
					my notes and{" "}
					<Link
						href="/portfolio"
						className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
					>
						projects
					</Link>
					.
				</p>
			</PageHeading>
			<div className="-mt-7 mb-20 sm:mb-24">
				<SocialLinks icons={false} />
			</div>
			<section aria-labelledby="writing-heading">
				<div className="mb-7 flex items-baseline justify-between gap-4">
					<h2 id="writing-heading" className="text-2xl font-medium">
						Writing
					</h2>
					<span className="font-sans text-[11px] text-muted-foreground">
						{posts.length} {posts.length === 1 ? "post" : "posts"}
					</span>
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
					<p className="mt-5 text-xs leading-6 text-muted-foreground">
						Sample posts for now. New writing is on the way.
					</p>
				)}
			</section>
		</>
	);
}
