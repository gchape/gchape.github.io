import assert from "node:assert/strict";
import { test } from "node:test";
import { parsePostMetadata } from "./post-metadata.ts";

const metadata = {
	title: "A useful note",
	description: "Something I learned.",
	date: "2026-11-10",
	category: "Development",
};

test("accepts quoted dates and normalizes YAML timestamps", () => {
	assert.equal(parsePostMetadata(metadata, "note.md").date, "2026-11-10");
	assert.equal(
		parsePostMetadata({ ...metadata, date: "2026-11-10T00:00:00.000Z" }, "note.md").date,
		"2026-11-10",
	);
});

test("rejects missing dates instead of inventing a publication date", () => {
	const { date: _date, ...withoutDate } = metadata;
	assert.throws(() => parsePostMetadata(withoutDate, "missing-date.md"), /missing-date\.md/);
});

test("rejects impossible calendar dates and accepts leap days", () => {
	for (const date of ["2026-02-29", "2026-04-31", "not-a-date"]) {
		assert.throws(() => parsePostMetadata({ ...metadata, date }, "bad-date.md"), /bad-date\.md/);
	}
	assert.equal(
		parsePostMetadata({ ...metadata, date: "2028-02-29" }, "leap.md").date,
		"2028-02-29",
	);
});

test("rejects blank titles and reports the source file and field", () => {
	assert.throws(
		() => parsePostMetadata({ ...metadata, title: "   " }, "empty-title.md"),
		(error) =>
			error instanceof Error &&
			error.message.includes("empty-title.md") &&
			error.message.includes("title"),
	);
});

test("defaults the sample flag and rejects incorrectly typed flags", () => {
	assert.equal(parsePostMetadata(metadata, "published.md").sample, false);
	assert.equal(parsePostMetadata({ ...metadata, sample: true }, "sample.md").sample, true);
	assert.throws(() => parsePostMetadata({ ...metadata, sample: "false" }, "bad-flag.md"));
});
