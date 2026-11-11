import { lazy } from "react";
import { Markdown } from "@/components/content/markdown";

// Create once at module scope so React preserves lazy component identities.
export function lazyMarkdown(loaders: Record<string, () => Promise<string>>) {
	return Object.fromEntries(
		Object.entries(loaders).map(([path, load]) => [
			path
				.split("/")
				.pop()
				?.replace(/\.(md|ts)$/, ""),
			lazy(async () => {
				const content = await load();
				return { default: () => <Markdown content={content} /> };
			}),
		]),
	);
}
