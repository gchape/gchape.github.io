import { bachelorThesis } from "./projects/bachelor-thesis";
import { beautyCode } from "./projects/beautycode";
import { gymCrm } from "./projects/gym-crm";
import { weft } from "./projects/weft";
import { velis } from "./projects/velis";

export type { Project } from "./project";

export const projects = [velis, beautyCode, gymCrm, weft, bachelorThesis];

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
		text: "Beauty Code, a production storefront, and Gym CRM, a Java backend with relational persistence and Kafka-driven workload tracking.",
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
		note: "A flashcard extension, with interface previews in the repository.",
	},
	{
		name: "projectile-motion",
		language: "Python",
		note: "A ball-trajectory simulation using Euler integration, gravity, quadratic drag, and target collision detection.",
	},
];
