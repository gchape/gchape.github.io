import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { Router } from "wouter";
import App from "@/app/App";

export function Application({ ssrPath }: { ssrPath?: string }) {
	return (
		<StrictMode>
			<ThemeProvider
				attribute="class"
				storageKey="giorgi-theme"
				defaultTheme="system"
				disableTransitionOnChange
			>
				<Router ssrPath={ssrPath}>
					<App />
				</Router>
			</ThemeProvider>
		</StrictMode>
	);
}
