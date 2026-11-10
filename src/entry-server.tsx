import { prerender } from "react-dom/static";
import { Application } from "@/app/application";

export { getCanonicalUrl, pages } from "@/app/metadata";
export { site } from "@/content/site";

export async function render(path: string) {
	let renderError: unknown;
	const { prelude, postponed } = await prerender(<Application ssrPath={path} />, {
		progressiveChunkSize: Number.MAX_SAFE_INTEGER,
		onError(error) {
			renderError = error;
		},
	});
	if (renderError) throw renderError;
	if (postponed) throw new Error(`Static rendering did not finish for ${path}`);
	return new Response(prelude).text();
}
