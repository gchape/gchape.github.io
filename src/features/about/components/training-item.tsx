import { ExternalLink } from "@/components/text-link";
import type { Training } from "@/content/experience";

export function TrainingItem({ item }: { item: Training }) {
	return (
		<li>
			<p className="text-base font-medium">
				{item.url ? <ExternalLink href={item.url}>{item.title}</ExternalLink> : item.title}
			</p>
			<p className="text-sm text-muted-foreground">
				{item.org} · {item.status}
			</p>
			<p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
			{item.topics.length > 0 && (
				<ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
					{item.topics.map((topic) => (
						<li key={topic}>{topic}</li>
					))}
				</ul>
			)}
		</li>
	);
}
