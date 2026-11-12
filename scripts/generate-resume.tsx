import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { renderToFile } from "@react-pdf/renderer";
import { createElement } from "react";
import { ResumeDocument } from "../src/features/resume/resume-document";

const output = new URL("../dist/", import.meta.url);
await mkdir(output, { recursive: true });
await renderToFile(createElement(ResumeDocument), fileURLToPath(new URL("resume.pdf", output)));
console.log("Generated dist/resume.pdf from shared website content.");
