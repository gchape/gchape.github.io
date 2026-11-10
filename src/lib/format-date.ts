export function formatDate(date: string) {
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(`${date}T12:00:00`));
}
