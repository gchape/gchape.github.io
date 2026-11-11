export type Project = {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	image?: string;
	imageSrcSet?: string;
	imageAlt?: string;
	video?: string;
	content: string;
	url?: string;
	github?: string;
};
