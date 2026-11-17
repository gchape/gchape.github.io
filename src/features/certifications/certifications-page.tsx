import { PageHeading } from "@/components/page-heading";
import { ExternalLink } from "@/components/text-link";
import { certifications } from "./content";

export function CertificationsPage() {
	return (
		<>
			<PageHeading title="Certifications." eyebrow="Professional development">
				<p>
					Certificates in Java, persistence, Python, TypeScript, JavaScript, and Redis. Open any
					certificate to view the full-size image.
				</p>
			</PageHeading>
			<ul className="grid gap-6 md:grid-cols-2">
				{certifications.map((certificate) => (
					<li
						key={certificate.image}
						className="overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-sm"
					>
						<a
							href={certificate.image}
							target="_blank"
							rel="noopener noreferrer"
							className="block border-b border-border/70 bg-white p-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
							aria-label={`View ${certificate.title} certificate (opens in a new tab)`}
						>
							<img
								src={certificate.thumbnail}
								srcSet={`${certificate.thumbnail} 640w, ${certificate.image} ${certificate.width}w`}
								sizes="(min-width: 768px) 480px, 100vw"
								alt={`${certificate.title} certificate awarded to Giorgi Chapidze by ${certificate.issuer}`}
								width={certificate.width}
								height={certificate.height}
								loading="lazy"
								decoding="async"
								className="aspect-[4/3] w-full object-contain"
							/>
						</a>
						<div className="space-y-3 p-6">
							<p className="text-sm text-muted-foreground">{certificate.issuer}</p>
							<h2 className="text-xl font-medium">{certificate.title}</h2>
							<time dateTime={certificate.date} className="block text-sm text-muted-foreground">
								{certificate.dateLabel}
							</time>
							<p className="text-sm leading-7 text-muted-foreground">{certificate.summary}</p>
							{certificate.credentialId && (
								<p className="break-all font-mono text-xs text-muted-foreground">
									Credential ID: {certificate.credentialId}
								</p>
							)}
							<div className="flex flex-wrap gap-4 text-sm">
								<ExternalLink href={certificate.image}>View certificate</ExternalLink>
								{certificate.verificationUrl && (
									<ExternalLink href={certificate.verificationUrl}>Verify credential</ExternalLink>
								)}
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
