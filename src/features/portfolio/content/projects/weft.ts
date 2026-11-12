import type { Project } from "../project";

export const weft: Project = {
	slug: "weft",
	title: "Weft",
	description:
		"A Java 25 transactional memory library with snapshot reads, automatic retries, and an optional agent for choosing write-lock timing.",
	resumeHighlights: [
		"Built a Java transactional memory library with consistent snapshots, buffered writes, conflict retries, and optimistic or early-locking execution",
		"Added a bytecode agent to select strategies from read/write call sites and JMH benchmarks to compare both protocols against a lock-based baseline",
	],
	category: "Systems",
	tags: ["Java", "JVM instrumentation", "MVCC"],
	github: "https://github.com/gchape/weft",
	image: "/images/projects/weft-1280.webp",
	imageSrcSet: "/images/projects/weft-640.webp 640w, /images/projects/weft-1280.webp 1280w",
	imageAlt:
		"Weft — transactional memory for Java. Two transactions buffer writes, then validate and commit to shared state.",
};
