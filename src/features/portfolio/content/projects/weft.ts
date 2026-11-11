import type { Project } from "../project";

export const weft: Project = {
	slug: "weft",
	title: "Weft",
	description:
		"A Java 25 transactional memory library with snapshot reads, automatic retries, and an optional agent for choosing write-lock timing.",
	category: "Systems",
	tags: ["Java", "JVM instrumentation", "MVCC"],
	github: "https://github.com/gchape/weft",
	image: "/images/projects/weft-1280.webp",
	imageSrcSet: "/images/projects/weft-640.webp 640w, /images/projects/weft-1280.webp 1280w",
	imageAlt:
		"Weft — transactional memory for Java. Two transactions buffer writes, then validate and commit to shared state.",
};
