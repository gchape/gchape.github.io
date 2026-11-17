export type Certification = {
	title: string;
	issuer: string;
	date: string;
	dateLabel: string;
	summary: string;
	image: string;
	thumbnail: string;
	width: number;
	height: number;
	verificationUrl?: string;
	credentialId?: string;
};

export const certifications: Certification[] = [
	{
		title: "Introduction to Python Course",
		issuer: "Boot.dev",
		date: "2026-11-01",
		dateLabel: "November 1, 2026",
		summary:
			"Programming fundamentals, functions and scope, testing and debugging, collections, and error handling.",
		image: "/images/certifications/bootdev-introduction-python.webp",
		thumbnail: "/images/certifications/bootdev-introduction-python-640.webp",
		width: 900,
		height: 550,
		credentialId: "6bda2b26-ed9a-4100-9c7b-17d0605d2b2d",
	},
	{
		title: "Learn Object Oriented Programming in Python",
		issuer: "Boot.dev",
		date: "2026-11-01",
		dateLabel: "November 1, 2026",
		summary:
			"Clean code principles, classes, encapsulation, abstraction, inheritance, and polymorphism.",
		image: "/images/certifications/bootdev-oop-python.webp",
		thumbnail: "/images/certifications/bootdev-oop-python-640.webp",
		width: 900,
		height: 550,
		credentialId: "662d83db-c909-48f1-a2fa-4073a83dd2a6",
	},
	{
		title: "Learn TypeScript",
		issuer: "Boot.dev",
		date: "2026-09-24",
		dateLabel: "September 24, 2026",
		summary:
			"Static typing, type aliases and interfaces, union and intersection types, narrowing, generics, and utility types.",
		image: "/images/certifications/bootdev-typescript.webp",
		thumbnail: "/images/certifications/bootdev-typescript-640.webp",
		width: 900,
		height: 550,
		credentialId: "9ddad905-b41e-41a2-bff4-4c29ba96c5b8",
	},
	{
		title: "Learn JavaScript",
		issuer: "Boot.dev",
		date: "2026-09-23",
		dateLabel: "September 23, 2026",
		summary:
			"Functions, objects and prototypes, classes, collections, asynchronous programming, and the event loop.",
		image: "/images/certifications/bootdev-javascript.webp",
		thumbnail: "/images/certifications/bootdev-javascript-640.webp",
		width: 900,
		height: 550,
		credentialId: "26f51de8-e58c-47d1-b697-3ca8b948efed",
	},
	{
		title: "Master and Apply Redis for Scalable Systems",
		issuer: "EDUCBA · Coursera",
		date: "2026-10-04",
		dateLabel: "October 4, 2026",
		summary:
			"Three-course specialization covering Redis data structures, messaging, persistence, replication, and server operations.",
		image: "/images/certifications/redis-scalable-systems.webp",
		thumbnail: "/images/certifications/redis-scalable-systems-640.webp",
		width: 1599,
		height: 1275,
		verificationUrl: "https://coursera.org/verify/specialization/2ZUMUYIBBRQR",
	},
	{
		title: "Advanced JavaScript",
		issuer: "Scrimba",
		date: "2026-09-25",
		dateLabel: "September 25, 2026",
		summary: "Completed 207 lessons across 9.8 hours of advanced JavaScript coursework.",
		image: "/images/certifications/advanced-javascript.webp",
		thumbnail: "/images/certifications/advanced-javascript-640.webp",
		width: 1487,
		height: 1925,
	},
	{
		title: "Hibernate Performance Tuning",
		issuer: "Thorben Janssen · Persistence Hub",
		date: "2025-09-16",
		dateLabel: "September 16, 2025",
		summary:
			"Performance diagnosis, efficient mappings, caching, read and write optimization, and concurrency management.",
		image: "/images/certifications/hibernate-performance-tuning.webp",
		thumbnail: "/images/certifications/hibernate-performance-tuning-640.webp",
		width: 1925,
		height: 1487,
	},
	{
		title: "Advanced Hibernate Training",
		issuer: "Thorben Janssen · Thoughts on Java",
		date: "2025-09-06",
		dateLabel: "September 6, 2025",
		summary:
			"Advanced mappings, Criteria API queries, domain inheritance, events, custom types, and multi-tenancy.",
		image: "/images/certifications/advanced-hibernate.webp",
		thumbnail: "/images/certifications/advanced-hibernate-640.webp",
		width: 1925,
		height: 1487,
	},
	{
		title: "Data Structures in Java",
		issuer: "JavaSpecialists",
		date: "2025-07-14",
		dateLabel: "July 14, 2025",
		summary: "Certificate of graduation.",
		image: "/images/certifications/data-structures-java.webp",
		thumbnail: "/images/certifications/data-structures-java-640.webp",
		width: 939,
		height: 736,
	},
	{
		title: "Threading Essentials",
		issuer: "JavaSpecialists",
		date: "2025-07-14",
		dateLabel: "July 14, 2025",
		summary: "Certificate of graduation.",
		image: "/images/certifications/threading-essentials.webp",
		thumbnail: "/images/certifications/threading-essentials-640.webp",
		width: 939,
		height: 736,
	},
].sort((a, b) => b.date.localeCompare(a.date));
