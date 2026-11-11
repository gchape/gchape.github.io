import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { Mode, plugin as markdown } from "vite-plugin-markdown";

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
	plugins: [markdown({ mode: [Mode.MARKDOWN] }), react(), tailwindcss(), preloadFonts()],
	resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
