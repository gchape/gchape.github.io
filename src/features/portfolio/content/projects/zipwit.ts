import { zipwitOrganization } from "@/content/experience";
import type { Project } from "../project";

export const zipwitShop: Project = {
	slug: "zipwit-shop",
	title: "Zipwit Shop",
	description:
		"A Georgian and English clothing and footwear storefront with catalog search, accounts, carts, and bank-transfer checkout.",
	category: "Ecommerce",
	tags: ["TypeScript", "TanStack Start", "PostgreSQL", "Redis"],
	github: "https://github.com/zipwit/zipwit-shop",
	image: "/images/projects/zipwit-offers.svg",
	imageAlt: "Zipwit offers artwork with a purple price tag on a yellow background",
};

export const zipwit: Project = {
	slug: "zipwit",
	title: zipwitOrganization.name,
	description: zipwitOrganization.summary,
	category: "Ecommerce",
	tags: ["Organization", "Ecommerce"],
	github: zipwitOrganization.github,
	image: "/images/projects/zipwit-logo.svg",
	imageAlt: "Zipwit ecommerce organization logo",
	children: [zipwitShop],
};
