import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/format-date";

export function PostList({ posts }: { posts: Post[] }) {
	return (
		<ItemGroup className="gap-5">
			{posts.map((post, index) => (
				<li
					key={post.slug}
					style={{ animationDelay: `${Math.min(index, 6) * 55}ms` }}
					className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-650 motion-safe:ease-smooth"
				>
					<Item
						variant="outline"
						render={<Link href={`/blog/${post.slug}`} />}
						className="gap-6 p-6 sm:p-8 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 motion-safe:duration-400 motion-safe:hover:-translate-y-0.5"
					>
						<ItemContent>
							<time dateTime={post.date} className="mb-4 font-sans text-xs text-muted-foreground">
								{formatDate(post.date)}
							</time>
							<ItemTitle className="line-clamp-none text-2xl leading-snug font-medium normal-case sm:text-3xl">
								<h3>{post.title}</h3>
							</ItemTitle>
							<ItemDescription className="mt-3 max-w-2xl line-clamp-none text-base leading-7">
								{post.description}
							</ItemDescription>
							<div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
								<span>{post.category}</span>
								<span aria-hidden="true">/</span>
								<span>{post.minutes} min read</span>
								{post.sample && <Badge variant="secondary">Sample post</Badge>}
							</div>
						</ItemContent>
						<ItemActions>
							<ArrowUpRight
								aria-hidden="true"
								className="size-5 text-muted-foreground motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-smooth motion-safe:group-hover/item:-translate-y-0.5 motion-safe:group-hover/item:translate-x-0.5"
							/>
						</ItemActions>
					</Item>
				</li>
			))}
		</ItemGroup>
	);
}
