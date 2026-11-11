import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { defineConfig, type Plugin } from "vite";

function preloadFonts(): Plugin {
	const fonts = /(source-sans-3|playfair-display)-latin-wght-normal.*\.woff2$/;

	return {
		name: "preload-fonts",
		transformIndexHtml: {
			order: "post",
			handler(_html, ctx) {
				if (!ctx.bundle) return;
				return Object.keys(ctx.bundle)
					.filter((file) => fonts.test(file))
					.map((file) => ({
						tag: "link",
						injectTo: "head" as const,
						attrs: {
							rel: "preload",
							href: `/${file}`,
							as: "font",
							type: "font/woff2",
							crossorigin: "",
						},
					}));
			},
		},
	};
}

export default defineConfig({
	plugins: [markdownContent(), react(), tailwindcss(), preloadFonts()],
	resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});

function markdownContent(): Plugin {
	return {
		name: "markdown-content",
		transform(source, id) {
			const [path, query] = id.split("?");
			if (!path.endsWith(".md") || (query && query !== "metadata")) return;
			const { data, content } = matter(source);
			if (query === "metadata") {
				return `export default ${JSON.stringify({ attributes: data, minutes: Math.max(1, Math.ceil(readingTime(content).minutes)) })}`;
			}
			return `export default ${JSON.stringify(content)}`;
		},
	};
}
