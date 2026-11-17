import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { posts } from "@/features/blog/content/posts";
import { projectPages } from "@/features/portfolio/content/projects";

type PageMetadata = {
	path: string;
	title: string;
	description: string;
	schemaType: string;
	noindex?: boolean;
	date?: string;
	repository?: string;
};

export const pages: PageMetadata[] = [
	{
		path: "/",
		title: site.title,
		description: site.description,
		schemaType: "Blog",
	},
	{
		path: "/portfolio",
		title: `Projects — ${profile.name}`,
		description:
			"Explore Giorgi Chapidze's software projects: Zipwit, Velis, Beauty Code, Gym CRM, Weft, and research into software transactional memory in Clojure.",
		schemaType: "CollectionPage",
	},
	{
		path: "/about",
		title: `About ${profile.name}, Software Developer`,
		description:
			"Giorgi Chapidze is a software developer interested in how systems work, with a focus on maintainable architecture, databases, networking, clean interfaces, and AI automation.",
		schemaType: "ProfilePage",
	},
	{
		path: "/certifications",
		title: `Certifications — ${profile.name}`,
		description:
			"Giorgi Chapidze’s certificates in Java, Hibernate, Python, TypeScript, JavaScript, and Redis, with links to completed courses and credentials.",
		schemaType: "CollectionPage",
	},
	...posts.map((post) => ({
		path: `/blog/${post.slug}`,
		title: `${post.title} — ${profile.name}`,
		description: post.description,
		schemaType: "BlogPosting",
		date: post.date,
		noindex: post.sample,
	})),
	...projectPages.map((project) => ({
		path: `/portfolio/${project.slug}`,
		title: `${project.title} — ${profile.name}`,
		description: project.description,
		schemaType: project.children
			? "CollectionPage"
			: project.category === "Research"
				? "CreativeWork"
				: "SoftwareSourceCode",
		repository: project.github,
	})),
];

export function getPageMetadata(path: string): PageMetadata {
	const normalized = path.replace(/\/+$/, "") || "/";
	return (
		pages.find((page) => page.path === normalized) ?? {
			path: "/404.html",
			title: `Page not found — ${profile.name}`,
			description: "This page could not be found. Browse Giorgi Chapidze's blog and portfolio.",
			schemaType: "WebPage",
			noindex: true,
		}
	);
}

export function getCanonicalUrl(path: string) {
	const canonicalPath =
		path === "/" || path.endsWith(".html") ? path : `${path.replace(/\/+$/, "")}/`;
	return new URL(canonicalPath, site.url).href;
}
