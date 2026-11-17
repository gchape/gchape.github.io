export type Project = {
	children?: Project[];
	slug: string;
	title: string;
	description: string;
	resumeHighlights?: string[];
	category: string;
	tags: string[];
	image?: { src: string; alt: string; width: number; height: number };
	video?: string;
	url?: string;
	github?: string;
};
