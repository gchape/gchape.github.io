import type { Project } from "../project";

export const gymCrm: Project = {
	slug: "gym-crm",
	title: "Gym CRM",
	description:
		"A Java backend for gym members, trainers, and training sessions, with JWT authentication and monthly workload tracking through Kafka and MongoDB.",
	resumeHighlights: [
		"Published committed sessions to Kafka and tracked monthly trainer totals in MongoDB",
		"Tested JWT workflows, database migrations, and Kafka-to-MongoDB processing with Testcontainers",
	],
	category: "Backend",
	tags: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "MongoDB"],
	github: "https://github.com/gchape/gym-crm",
};
