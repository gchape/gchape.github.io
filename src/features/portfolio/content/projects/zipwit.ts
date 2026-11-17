import { zipwitOrganization } from "@/content/experience";
import type { Project } from "../project";

const zipwitShop: Project = {
	slug: "zipwit-shop",
	title: "Zipwit Shop",
	description:
		"A Georgian and English clothing and footwear storefront with catalog search, accounts, carts, and bank-transfer checkout.",
	category: "Ecommerce",
	tags: ["TypeScript", "TanStack Start", "PostgreSQL", "Redis"],
	github: "https://github.com/zipwit/zipwit-shop",
	image: {
		src: "/images/projects/zipwit-offers-1280.webp",
		alt: "Zipwit offers artwork with a purple price tag on a yellow background",
		width: 1280,
		height: 596,
	},
};

export const zipwit: Project = {
	slug: "zipwit",
	title: zipwitOrganization.name,
	description: zipwitOrganization.summary,
	category: "Ecommerce",
	tags: ["Organization", "Ecommerce"],
	resumeHighlights: [
		"Build a bilingual clothing and footwear storefront with catalog search, accounts, carts, and bank-transfer checkout",
		"Keep the live catalog, search, stock, and carts in a Redis Cluster; store orders, checkout drafts, and payment evidence transactionally in PostgreSQL",
	],
	github: zipwitOrganization.github,
	image: {
		src: "/images/projects/zipwit-logo-1280.webp",
		alt: "Zipwit ecommerce organization logo",
		width: 1280,
		height: 578,
	},
	children: [zipwitShop],
};
