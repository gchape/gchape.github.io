import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import { SitemapStream, streamToPromise } from "sitemap";
import { createServer } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "dist");
const template = await readFile(join(output, "index.html"), "utf8");
const server = await createServer({
	root,
	server: { middlewareMode: true, hmr: false, ws: false, watch: null },
	appType: "custom",
});

try {
	const { render, pages, site, getCanonicalUrl } =
		await server.ssrLoadModule("/src/entry-server.tsx");
	for (const page of [...pages, { path: "/404.html" }]) {
		const $ = load(template);
		const app = load(await render(page.path), {}, false);
		if (!app("main h1").length) {
			throw new Error(`Missing visible page content in static output for ${page.path}`);
		}
		const metadata = app("[data-seo]").remove();
		$("head").append(metadata.toArray());
		$("#root").attr("data-prerendered", "true").html(app.html());
		const file =
			page.path === "/404.html"
				? join(output, "404.html")
				: join(output, page.path.slice(1), "index.html");
		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, $.html());
	}

	const sitemap = new SitemapStream({ hostname: site.url });
	const xml = streamToPromise(sitemap);
	for (const page of pages.filter((page) => !page.noindex)) {
		sitemap.write({ url: getCanonicalUrl(page.path), ...(page.date && { lastmod: page.date }) });
	}
	sitemap.end();
	await writeFile(join(output, "sitemap.xml"), await xml);
	await writeFile(
		join(output, "robots.txt"),
		`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
	);
	console.log(`Pre-rendered ${pages.length + 1} pages and generated sitemap.xml and robots.txt.`);
} finally {
	await server.close();
}
