import { useState } from "react";
import { FilterTabs } from "@/components/filter-tabs";
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

export default function BrowsePosts() {
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
		</>
	);
}
