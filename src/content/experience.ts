export const zipwitOrganization = {
	name: "Zipwit",
	github: "https://github.com/zipwit",
	summary:
		"Zipwit is my ecommerce organization: a shared home for projects that connect product discovery, shopping, and commerce operations.",
};

export const beautyCodeWork = {
	role: "CTO / technical lead",
	dateRange: "Jan 2026 – Present",
	resumeHighlights: [
		"Build and maintain a React storefront and admin tools for the product catalog",
		"Keep catalog edits and audit records consistent with SQLite transactions. Preserve URLs on rename",
		"Deploy on EC2 with Docker and Nginx and verify restores from S3 database snapshots",
	],
	context:
		"Online store with about GEL 10,000 in monthly revenue and 25,000+ social media followers.",
	summary:
		"I handle the store's technical work: building and maintaining the storefront, catalog tools, image delivery, and deployment, and solving technical problems as they come up.",
};

export const education = {
	school: "Kutaisi International University",
	degree: "Bachelor's degree in Computer Science",
	note: "Thesis: Design and Evaluation of an MVCC-Based STM in Clojure (2026).",
};

export type Training = {
	title: string;
	org: string;
	status: string;
	dateRange?: string;
	summary: string;
	topics: string[];
	url?: string;
};

export const training: Training[] = [
	{
		title: "Java Internship (Specialization)",
		org: "EPAM Lab",
		status: "Completed · 22 weeks",
		dateRange: "Apr – Sep 2026",
		summary:
			"A 22-week Java program covering engineering practice and architecture, with hands-on work in containers, data stores, and messaging.",
		topics: [
			"Agile, code quality, QA, and secure SDLC",
			"Layered architecture, CQRS, Event Sourcing, and microservices",
			"Docker and cloud fundamentals",
			"NoSQL (MongoDB, Redis) and messaging (RabbitMQ)",
			"AI fundamentals, prompt engineering, and GitHub Copilot",
		],
	},
	{
		title: "Soft Skills Foundations for Campus Students",
		org: "EPAM Campus",
		status: "Completed · 15 weeks",
		summary:
			"A facilitated program on working in a professional IT environment, including AI-assisted practice for self-presentation and mock project interviews.",
		topics: [
			"Business communication and self-presentation",
			"Cross-cultural communication in hybrid teams",
			"Teamwork, ownership, and accountability",
			"Adaptability and continuous learning",
		],
	},
	{
		title: "Quality Engineering & Test Automation",
		org: "TBC IT Academy",
		status: "Ongoing",
		dateRange: "Nov 2026 – Present",
		url: "https://tbcbank.ge/en/tbc-education/it-academy/test-automation",
		summary:
			"A 120-hour program delivered online through 60 lectures on Microsoft Teams. The curriculum covers manual and automated testing, defect prevention, and software quality across the development lifecycle.",
		topics: [
			"Java, OOP, and Git for test automation",
			"Web testing with Selenium, Selenide, and Playwright",
			"REST and SOAP API testing with Rest Assured",
			"Test scenarios in Zephyr Scale and automation framework design",
			"Performance testing with JMeter and k6",
			"CI/CD integration with Jenkins",
			"Android testing with Espresso and iOS testing with XCUITest",
		],
	},
];
