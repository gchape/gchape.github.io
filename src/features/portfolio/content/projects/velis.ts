import type { Project } from "../project";

export const velis: Project = {
	slug: "velis",
	title: "Velis",
	description:
		"A Python cache and pub/sub server with expiring byte values, bounded queues, and a terminal workspace for exploring a running store.",
	resumeHighlights: [
		"Built a Python cache with key expiry, bounded memory, pub/sub, and a binary TCP protocol",
		"Measured 144,491 vs. 17,025 reads/s on localhost at batch depths 64 and 1 (64-byte values)",
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
