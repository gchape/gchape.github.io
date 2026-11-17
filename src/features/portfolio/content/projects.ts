import { bachelorThesis } from "./projects/bachelor-thesis";
import { beautyCode } from "./projects/beautycode";
import { gymCrm } from "./projects/gym-crm";
import { velis } from "./projects/velis";
import { weft } from "./projects/weft";

import { zipwit } from "./projects/zipwit";

export type { Project } from "./project";

export const projects = [zipwit, velis, beautyCode, gymCrm, weft, bachelorThesis];

export const projectPages = projects.flatMap((project) => [project, ...(project.children ?? [])]);

export const themes = [
	{
		title: "Concurrency and transactions",
		text: "Software transactional memory in Java (Weft) and Clojure (my thesis), with a focus on contention, retries, and measured performance.",
	},
	{
		title: "Systems",
		text: "Velis, a key-value store with TTL expiry, pub/sub, and a binary TCP protocol, built on a single asyncio event loop.",
	},
	{
		title: "Applications and APIs",
		text: "Zipwit ecommerce projects, Beauty Code’s production storefront, and Gym CRM’s Java backend with relational persistence and Kafka-driven workload tracking.",
	},
];

export const otherRepos: { name: string; language: string; note?: string }[] = [
	{
		name: ".emacs.d",
		language: "Emacs Lisp",
		note: "A modular Emacs configuration with completion, navigation, selectable LSP backends, and Clojure/CIDER tooling.",
	},
	{
		name: "flashcards-extension",
		language: "TypeScript",
		note: "A browser-extension prototype with a React interface and bucket-based spaced repetition, adjusting review intervals from answer difficulty.",
	},
	{
		name: "projectile-motion",
		language: "Python",
		note: "A ball-trajectory simulation using Euler integration, gravity, quadratic drag, and target collision detection.",
	},
];
