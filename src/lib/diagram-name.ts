export function diagramName(chart: string) {
	return /^\s*accTitle:[ \t]*(.+)$/m
		.exec(chart)?.[1]
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}
