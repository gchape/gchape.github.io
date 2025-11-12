import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    root: "src",
    base: isDev ? "/" : "/assets/",
    build: {
      outDir: "../public/assets",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: "/js/main.js",
          style: "/css/main.css",
        },
        output: {
          entryFileNames: isDev ? "[name].js" : "[name].[hash].js",
          assetFileNames: isDev ? "[name].[ext]" : "[name].[hash].[ext]",
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  };
});
