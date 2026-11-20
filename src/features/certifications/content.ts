export type Certification = {
	title: string;
	issuer: string;
	date: string;
	dateLabel: string;
	href: string;
	badge?: string;
};

export const bootDevProfile = "https://www.boot.dev/u/gchape";

export const certifications: Certification[] = [
	{
		title: "Google Analytics Certification (2026)",
		issuer: "Google Skillshop",
		date: "2026-11-20",
		dateLabel: "November 20, 2026",
		href: "/images/certifications/google-analytics-2026.webp",
		badge: "/images/certifications/google-analytics-2026-badge.webp",
	},
	{
		title: "Certified in Ahrefs’ Marketing Platform",
		issuer: "Ahrefs Academy",
		date: "2026-11-19",
		dateLabel: "November 19, 2026",
		href: "https://ahrefs.com/academy/certificate/500c567982954c14904a25d6ea5275c9",
	},
	{
		title: "Master and Apply Redis for Scalable Systems",
		issuer: "EDUCBA · Coursera",
		date: "2026-10-04",
		dateLabel: "October 4, 2026",
		href: "/images/certifications/redis-scalable-systems.webp",
	},
	{
		title: "Advanced JavaScript",
		issuer: "Scrimba",
		date: "2026-09-25",
		dateLabel: "September 25, 2026",
		href: "https://scrimba.com/@gchape:certs;cert2ffentAFPrdwqtGyN3ZZYoS7VNF445TqwBSZD6WLXGRG2n",
	},
	{
		title: "JavaScript Interview Challenges",
		issuer: "Scrimba",
		date: "2026-09-24",
		dateLabel: "September 24, 2026",
		href: "https://scrimba.com/@gchape:certs;cert2JbLs3qgC1goAweRR2tEPSmeqHBe4TXh36djBK",
	},
	{
		title: "The Tricky Parts of JavaScript",
		issuer: "Scrimba",
		date: "2026-09-23",
		dateLabel: "September 23, 2026",
		href: "https://scrimba.com/@gchape:certs;cert24zAwPPowc3g1SXEEbrknjCx5LR8dRJTHy632",
	},
	{
		title: "Hibernate Performance Tuning",
		issuer: "Thorben Janssen · Persistence Hub",
		date: "2025-09-16",
		dateLabel: "September 16, 2025",
		href: "/images/certifications/hibernate-performance-tuning.webp",
	},
	{
		title: "Advanced Hibernate Training",
		issuer: "Thorben Janssen · Thoughts on Java",
		date: "2025-09-06",
		dateLabel: "September 6, 2025",
		href: "/images/certifications/advanced-hibernate.webp",
	},
	{
		title: "Data Structures in Java",
		issuer: "JavaSpecialists",
		date: "2025-07-14",
		dateLabel: "July 14, 2025",
		href: "/images/certifications/data-structures-java.webp",
	},
	{
		title: "Threading Essentials",
		issuer: "JavaSpecialists",
		date: "2025-07-14",
		dateLabel: "July 14, 2025",
		href: "/images/certifications/threading-essentials.webp",
	},
].sort((a, b) => b.date.localeCompare(a.date));
