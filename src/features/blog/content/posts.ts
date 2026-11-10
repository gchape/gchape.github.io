import { type PostMetadata, parsePostMetadata } from "@/features/blog/content/post-metadata";

export type Post = PostMetadata & {
	slug: string;
	minutes: number;
	content: string;
};

type PostSource = {
	attributes: unknown;
	markdown: string;
};

const files = import.meta.glob<PostSource>("./posts/*.md", {
	eager: true,
});

export const posts: Post[] = Object.entries(files)
	.map(([path, { attributes, markdown: content }]) => ({
		...parsePostMetadata(attributes, path),
		slug: path.slice(path.lastIndexOf("/") + 1, -3),
		minutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
		content,
	}))
	.sort((a, b) => b.date.localeCompare(a.date));
