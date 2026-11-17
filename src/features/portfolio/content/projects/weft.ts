import type { Project } from "../project";

export const weft: Project = {
	slug: "weft",
	title: "Weft",
	description:
		"A Java 25 transactional memory library with snapshot reads, automatic retries, and an optional agent for choosing write-lock timing.",
	resumeHighlights: [
		"Built a Java transactional memory library with snapshot reads, buffered writes, and conflict retries",
		"Selected lock timing with a bytecode agent and compared both strategies against a lock baseline in JMH",
	],
	category: "Systems",
	tags: ["Java", "JVM instrumentation", "MVCC"],
	github: "https://github.com/gchape/weft",
	image: {
		src: "/images/projects/weft-1280.webp",
		alt: "Weft — concurrent threads woven together.",
		width: 1280,
		height: 427,
	},
};
