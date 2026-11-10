import { useParams } from "wouter";
import { BackLink } from "@/components/back-link";
import { Markdown } from "@/components/markdown";
import { PostList } from "@/components/post-list";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { formatDate } from "@/lib/format-date";
import { NotFoundPage } from "@/pages/not-found-page";

export function ArticlePage() {
	const { slug } = useParams<{ slug: string }>();
	const post = posts.find((post) => post.slug === slug);
	if (!post) return <NotFoundPage />;
	const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
	return (
		<article className="mx-auto max-w-3xl">
			<title>{`${post.title} — ${profile.name}`}</title>
			<BackLink href="/">All posts</BackLink>
			<header className="pb-8">
				<div className="mb-4 flex flex-wrap items-center gap-3 font-sans text-[11px] text-muted-foreground">
					<span>{post.category}</span>
					<span aria-hidden="true">/</span>
					<time dateTime={post.date}>{formatDate(post.date)}</time>
					<span aria-hidden="true">/</span>
					<span>{post.minutes} min read</span>
				</div>
				<h1 className="max-w-2xl text-5xl leading-tight font-medium tracking-tight sm:text-6xl">
					{post.title}
				</h1>
				<p className="mt-5 text-base leading-8 text-muted-foreground">{post.description}</p>
				{post.sample && (
					<Badge variant="secondary" className="mt-4">
						Sample post
					</Badge>
				)}
			</header>
			<Separator className="mb-10" />
			<Markdown content={post.content} />
			<Separator className="mt-12" />
			<div className="pt-6 text-sm text-muted-foreground">
				Have a thought on this?{" "}
				<a
					href={`mailto:${profile.email}?subject=${encodeURIComponent(post.title)}`}
					className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
				>
					Send me an email.
				</a>
			</div>
			{related.length > 0 && (
				<section className="mt-16" aria-labelledby="related-heading">
					<h2 id="related-heading" className="mb-5 text-sm font-medium">
						More writing
					</h2>
					<PostList posts={related} />
				</section>
			)}
		</article>
	);
}
