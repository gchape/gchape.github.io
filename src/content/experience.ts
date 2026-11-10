export const ohooq = {
	name: "Ohooq",
	github: "https://github.com/ohooq",
	summary:
		"I created Ohooq as a GitHub organization to develop AI and software solutions that help businesses digitize their processes and automate routine work.",
	plans: ["AI chat agents", "Live chat widgets", "Financial dashboards"],
};

export const beautyCodeWork = {
	role: "CTO / technical lead",
	context: "Beauty Code is an online store with around 22,000 followers on Facebook.",
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
	summary: string;
	topics: string[];
	url?: string;
};

export const training: Training[] = [
	{
		title: "Java Internship (Specialization)",
		org: "EPAM Lab",
		status: "Completed · 22 weeks",
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
		status: "Accepted",
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
