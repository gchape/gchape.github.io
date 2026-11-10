export type Project = {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	image?: string;
	imageAlt?: string;
	content: string;
	url?: string;
	github?: string;
};
