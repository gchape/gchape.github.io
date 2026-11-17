import { lazy, Suspense } from "react";
import { PageHeading } from "@/components/page-heading";
import { SocialLinks } from "@/components/social-links";
import { TextLink } from "@/components/text-link";
import { PostList } from "@/features/blog/components/post-list";
import { posts } from "@/features/blog/content/posts";
import { ProjectPreview } from "@/features/portfolio/components/project-preview";

const BrowsePosts = lazy(() => import("./components/browse-posts"));

export function BlogPage() {
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
				</div>
				{posts.length >= 5 ? (
					<Suspense fallback={<PostList posts={posts} />}>
						<BrowsePosts />
					</Suspense>
				) : (
					<PostList posts={posts} />
				)}
				{posts.some((post) => post.sample) && (
					<p className="mt-5 text-xs leading-6 text-muted-foreground">These are sample posts.</p>
				)}
			</section>
		</>
	);
}
