import type { Project } from "../project";

export const gymCrm: Project = {
	slug: "gym-crm",
	title: "Gym CRM",
	description:
		"A Java backend for gym members, trainers, and training sessions, with JWT authentication and monthly workload tracking through Kafka and MongoDB.",
	resumeHighlights: [
		"Extended an EPAM internship backend to publish committed training sessions through Kafka and maintain monthly trainer totals in MongoDB",
		"Verified JWT workflows, PostgreSQL migrations, and Kafka-to-MongoDB processing with Testcontainers integration tests",
	],
	category: "Backend",
	tags: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "MongoDB"],
	github: "https://github.com/gchape/gym-crm",
};
