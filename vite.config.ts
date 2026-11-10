import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { Mode, plugin as markdown } from "vite-plugin-markdown";

export default defineConfig({
	plugins: [markdown({ mode: [Mode.MARKDOWN] }), react(), tailwindcss()],
	resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
