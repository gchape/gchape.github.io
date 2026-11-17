import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { load } from "cheerio";
import { diagramName } from "../src/lib/diagram-name.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "public/images/diagrams");
const folders = ["src/features/blog/content/posts", "src/features/portfolio/content/bodies"];
const charts = new Map();
for (const folder of folders) {
	for (const file of await readdir(join(root, folder))) {
		if (!/\.(md|ts)$/.test(file)) continue;
		const source = (await readFile(join(root, folder, file), "utf8")).replaceAll("\\`", "`");
		for (const [, chart] of source.matchAll(/^```mermaid\s*\n([\s\S]*?)^```\s*$/gm)) {
			const name = diagramName(chart);
			if (!name || charts.has(name))
				throw new Error(`Invalid or duplicate diagram title in ${file}`);
			charts.set(name, chart.trim());
		}
	}
}

const temp = await mkdtemp(join(tmpdir(), "portfolio-diagrams-"));
let browser;
try {
	const page = join(temp, "render.html");
	await writeFile(
		page,
		`<!doctype html><meta charset="utf-8"><body><script type="module">
		import mermaid from ${JSON.stringify(new URL("mermaid.esm.min.mjs", import.meta.resolve("mermaid")).href)};
		for (const [name, chart] of ${JSON.stringify([...charts]).replaceAll("<", "\\u003c")}) {
			for (const theme of ["light", "dark"]) {
				mermaid.initialize({
					startOnLoad: false,
					securityLevel: "strict",
					deterministicIds: true,
					theme: theme === "dark" ? "dark" : "neutral",
					htmlLabels: false,
					fontFamily: "Arial, sans-serif",
					flowchart: { htmlLabels: false },
				});
				const id = name + "-" + theme;
				const result = document.createElement("div");
				result.dataset.diagram = id;
				result.innerHTML = (await mermaid.render(id, chart)).svg;
				document.body.append(result);
			}
		}
	</script></body>`,
	);
	browser = spawn(
		process.env.CHROMIUM_BIN || "chromium",
		[
			"--headless",
			"--disable-gpu",
			"--allow-file-access-from-files",
			"--remote-debugging-port=0",
			`--user-data-dir=${join(temp, "profile")}`,
			pathToFileURL(page).href,
		],
		{ stdio: "ignore" },
	);
	let launchError;
	browser.on("error", (error) => {
		launchError = error;
	});
	let port;
	for (let attempt = 0; attempt < 50 && !port; attempt++) {
		if (launchError) throw launchError;
		if (browser.exitCode !== null) throw new Error("Chromium exited before opening its debugger");
		port = (
			await readFile(join(temp, "profile", "DevToolsActivePort"), "utf8").catch(() => "")
		).split("\n")[0];
		if (!port) await delay(100);
	}
	if (!port) throw new Error("Chromium debugger did not start");
	const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
	const tab = tabs.find(({ type }) => type === "page");
	const socket = new WebSocket(tab.webSocketDebuggerUrl);
	let html = "";
	try {
		await new Promise((resolve, reject) => {
			socket.addEventListener("open", resolve, { once: true });
			socket.addEventListener("error", reject, { once: true });
		});
		for (let attempt = 0; attempt < 100 && !html; attempt++) {
			html = await new Promise((resolve) => {
				socket.addEventListener(
					"message",
					({ data }) => {
						resolve(JSON.parse(data).result?.result?.value ?? "");
					},
					{ once: true },
				);
				socket.send(
					JSON.stringify({
						id: attempt + 1,
						method: "Runtime.evaluate",
						params: {
							expression: `document.querySelectorAll('[data-diagram] > svg').length === ${charts.size * 2} ? document.body.outerHTML : ""`,
							returnByValue: true,
						},
					}),
				);
			});
			if (!html) await delay(150);
		}
	} finally {
		socket.close();
	}
	const $ = load(html);
	const rendered = $("[data-diagram] > svg");
	if (rendered.length !== charts.size * 2 || !charts.size) {
		throw new Error(`Expected ${charts.size * 2} SVG diagrams, received ${rendered.length}`);
	}
	await mkdir(output, { recursive: true });
	for (const svg of rendered) {
		const name = $(svg).parent().attr("data-diagram");
		await writeFile(join(output, `${name}.svg`), `${$.xml(svg)}\n`);
	}
	console.log(`Generated ${rendered.length} SVGs for ${charts.size} diagrams.`);
} finally {
	browser?.kill();
	await rm(temp, { recursive: true, force: true, maxRetries: 5 });
}
