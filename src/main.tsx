import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element in index.html");
createRoot(root).render(
	<StrictMode>
		<ThemeProvider
			attribute="class"
			storageKey="giorgi-theme"
			defaultTheme="system"
			disableTransitionOnChange
		>
			<Router hook={useHashLocation}>
				<App />
			</Router>
		</ThemeProvider>
	</StrictMode>,
);
