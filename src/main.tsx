import { createRoot, hydrateRoot } from "react-dom/client";
import { Application } from "@/app/application";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element in index.html");

const legacyPath = window.location.hash.slice(1);
if (legacyPath.startsWith("/") && !legacyPath.startsWith("//")) {
	window.location.replace(legacyPath);
} else if (root.dataset.prerendered === "true") {
	hydrateRoot(root, <Application />);
} else {
	createRoot(root).render(<Application />);
}
