import type { Project } from "../project";

export const velis: Project = {
	slug: "velis",
	title: "Velis",
	description:
		"A Python cache and pub/sub server with expiring byte values, bounded queues, and a terminal workspace for exploring a running store.",
	resumeHighlights: [
		"Built a Python cache with expiring keys, pub/sub, a binary TCP protocol, and a terminal client; bounded memory with byte budgets and eviction policies",
		"Measured 144,491 reads/s at batch depth 64 versus 17,025 at depth 1 in a localhost benchmark (64-byte values, CPython 3.15.2, Ryzen 5 7535HS)",
	],
	category: "Systems",
	tags: ["Python", "asyncio", "TCP"],
	github: "https://github.com/gchape/velis",
	image: {
		src: "/images/projects/velis-1280.webp",
		alt: "Velis promotional image showing the terminal workspace",
		width: 1280,
		height: 720,
	},
	video: "https://github.com/user-attachments/assets/3e8a388c-35b3-4814-bc9e-466efc932780",
};
