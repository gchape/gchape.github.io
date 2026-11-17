import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Font, renderToFile } from "@react-pdf/renderer";
import { createElement } from "react";
import { ResumeDocument, resumeFontFamily } from "../src/features/resume/resume-document";

Font.register({
	family: resumeFontFamily,
	fonts: [
		{
			src: fileURLToPath(
				new URL("../src/features/resume/fonts/SourceSans3-Regular.ttf", import.meta.url),
			),
			fontWeight: 400,
		},
		{
			src: fileURLToPath(
				new URL("../src/features/resume/fonts/SourceSans3-Semibold.ttf", import.meta.url),
			),
			fontWeight: 600,
		},
	],
});

const output = new URL("../dist/", import.meta.url);
await mkdir(output, { recursive: true });
await renderToFile(createElement(ResumeDocument), fileURLToPath(new URL("resume.pdf", output)));
console.log("Generated dist/resume.pdf from shared website content.");
