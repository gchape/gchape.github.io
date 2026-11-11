import type { Project } from "../project";

export const bachelorThesis: Project = {
	slug: "bachelor-thesis",
	title: "MVCC-Based STM in Clojure",
	description:
		"My bachelor's thesis on transaction retries, consistent snapshots, and commit hooks, backed by a formal model and concurrency benchmarks in Clojure.",
	category: "Research",
	tags: ["Clojure", "STM", "MVCC"],
	github: "https://github.com/gchape/bachelor-thesis",
};
