import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemHeader,
	ItemTitle,
} from "@/components/ui/item";
import type { Post } from "@/features/blog/content/posts";
import { formatDate } from "@/lib/format-date";

export function PostList({ posts }: { posts: Post[] }) {
	return (
		<ItemGroup className="gap-4">
			{posts.map((post, index) => (
				<li
					key={post.slug}
					style={{ animationDelay: `${Math.min(index, 6) * 55}ms` }}
					className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-650 motion-safe:ease-smooth"
				>
					<Item
						variant="outline"
						render={<Link href={`/blog/${post.slug}`} />}
						className="gap-5 p-6 hover:border-primary/25 hover:shadow-md hover:shadow-foreground/5 motion-safe:duration-400 motion-safe:hover:-translate-y-0.5 sm:p-7"
					>
						<ItemHeader>
							<time dateTime={post.date} className="font-sans text-xs text-muted-foreground">
								{formatDate(post.date)}
							</time>
							<Badge variant="secondary" className="text-primary">
								{post.category}
							</Badge>
						</ItemHeader>
						<ItemContent>
							<ItemTitle className="line-clamp-none text-xl leading-snug font-medium tracking-tight normal-case sm:text-2xl">
								<h3>{post.title}</h3>
							</ItemTitle>
							<ItemDescription className="mt-3 max-w-2xl line-clamp-none text-base leading-7">
								{post.description}
							</ItemDescription>
							<div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
								<span>{post.minutes} min read</span>
								{post.sample && <Badge variant="secondary">Sample post</Badge>}
							</div>
						</ItemContent>
						<ItemActions className="rounded-full bg-muted/70 p-2 text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary">
							<ArrowUpRight
								aria-hidden="true"
								className="size-4 motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-smooth motion-safe:group-hover/item:-translate-y-0.5 motion-safe:group-hover/item:translate-x-0.5"
							/>
						</ItemActions>
					</Item>
				</li>
			))}
		</ItemGroup>
	);
}
