import { PageHeading } from "@/components/page-heading";
import { ExternalLink } from "@/components/text-link";
import { bootDevProfile, certifications } from "./content";

export function CertificationsPage() {
	return (
		<>
			<PageHeading title="Certifications." eyebrow="Professional development" />
			<ul className="mx-auto divide-y divide-border overflow-hidden rounded-2xl border border-border/70 bg-card/95">
				<li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4">
					<div>
						<h2 className="text-base font-semibold">Boot.dev</h2>
						<p className="text-sm text-muted-foreground">Python, TypeScript, and JavaScript</p>
					</div>
					<ExternalLink href={bootDevProfile} className="text-sm">
						View Boot.dev profile
					</ExternalLink>
				</li>
				{certifications.map(({ title, issuer, date, dateLabel, href, badge }) => (
					<li
						key={`${issuer}-${title}`}
						className="flex items-center justify-between gap-3 px-5 py-4"
					>
						<div>
							<h2 className="text-base font-semibold">
								<ExternalLink href={href}>{title}</ExternalLink>
							</h2>
							<p className="text-sm text-muted-foreground">
								{issuer} · <time dateTime={date}>{dateLabel}</time>
							</p>
						</div>
						{badge && (
							<img src={badge} alt="" width={48} height={48} className="size-12 shrink-0" />
						)}
					</li>
				))}
			</ul>
		</>
	);
}
