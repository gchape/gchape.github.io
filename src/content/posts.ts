export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	category: string;
	sample: boolean;
	minutes: number;
	content: string;
};

type PostSource = {
	attributes: Partial<Pick<Post, "title" | "description" | "date" | "category" | "sample">>;
	markdown: string;
};

const files = import.meta.glob<PostSource>("./posts/*.md", {
	eager: true,
});

export const posts: Post[] = Object.entries(files)
	.map(([path, { attributes: data, markdown: content }]) => {
		return {
			slug: path.slice(path.lastIndexOf("/") + 1, -3),
			title: String(data.title ?? "Untitled note"),
			description: String(data.description ?? ""),
			date: String(data.date ?? "2026-11-10").slice(0, 10),
			category: String(data.category ?? "Personal"),
			sample: data.sample === true,
			minutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
			content,
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date));
