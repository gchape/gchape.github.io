import * as v from "valibot";

const text = v.pipe(v.string(), v.trim(), v.nonEmpty());
const date = v.pipe(
	v.union([v.pipe(v.string(), v.isoDate()), v.pipe(v.string(), v.isoTimestamp())]),
	v.transform((value) => value.slice(0, 10)),
	v.check((value) => {
		const timestamp = Date.parse(value);
		return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === value;
	}, "Expected a real calendar date"),
);

const postMetadata = v.object({
	title: text,
	description: text,
	date,
	category: text,
	sample: v.optional(v.boolean(), false),
});

export type PostMetadata = v.InferOutput<typeof postMetadata>;

export function parsePostMetadata(input: unknown, path: string): PostMetadata {
	const result = v.safeParse(postMetadata, input);
	if (!result.success)
		throw new Error(`Invalid metadata in ${path}:\n${v.summarize(result.issues)}`);
	return result.output;
}
