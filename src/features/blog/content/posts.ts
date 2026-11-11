import { type PostMetadata, parsePostMetadata } from "@/features/blog/content/post-metadata";

export type Post = PostMetadata & {
	slug: string;
	minutes: number;
};

type PostSource = {
	attributes: unknown;
	minutes: number;
};

const files = import.meta.glob<PostSource>("./posts/*.md", {
	eager: true,
	query: "?metadata",
	import: "default",
});

export const posts: Post[] = Object.entries(files)
	.map(([path, { attributes, minutes }]) => ({
		...parsePostMetadata(attributes, path),
		slug: path.slice(path.lastIndexOf("/") + 1, -3),
		minutes,
	}))
	.sort((a, b) => b.date.localeCompare(a.date));
