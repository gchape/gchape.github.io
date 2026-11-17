import { PageHeading } from "@/components/page-heading";
import { Panel } from "@/components/panel";
import { SocialLinks } from "@/components/social-links";
import { ExternalLink, linkClass, TextLink } from "@/components/text-link";
import { Badge } from "@/components/ui/badge";
import { beautyCodeWork, education, training, zipwitOrganization } from "@/content/experience";
import { profile } from "@/content/profile";

import { AboutSection } from "./components/about-section";
import { TrainingItem } from "./components/training-item";

export function AboutPage() {
	return (
		<>
			<PageHeading title="About.">
				<p>
					I am Giorgi Chapidze, a software developer and Computer Science graduate interested in the
					design and behavior of software systems.
				</p>
				<p className="mt-4">
					<a href="/resume.pdf" download className={linkClass}>
						Download resume (PDF)
					</a>
				</p>
			</PageHeading>
			<div className="max-w-3xl space-y-10">
				<Panel className="space-y-7 text-lg leading-8 text-muted-foreground">
					<p>
						My interests include databases, backend systems, networking, and interface design. In my
						work, I value simplicity, architectural robustness, and maintainability. I pay close
						attention to implementation details and follow tasks through to completion.
					</p>
					<p>
						My initial skepticism toward AI has developed into an interest in its applications to
						automation. I am currently studying retrieval-augmented generation (RAG), agent
						workflows, and system integrations using LangChain and LangGraph.
					</p>
				</Panel>
				<AboutSection
					id="skills"
					title="Skills & tools"
					subtitle="Technologies I use across my projects."
				>
					<dl className="space-y-5">
						{profile.skills.map((group) => (
							<div key={group.label} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-4">
								<dt className="font-medium text-foreground">{group.label}</dt>
								<dd>
									<ul className="flex flex-wrap gap-2" aria-label={group.label}>
										{group.items.map((skill) => (
											<li key={skill}>
												<Badge variant="secondary" className="text-xs">
													{skill}
												</Badge>
											</li>
										))}
									</ul>
								</dd>
							</div>
						))}
					</dl>
					<p>
						<TextLink href="/portfolio">See these tools in my projects</TextLink>
					</p>
				</AboutSection>
				<AboutSection id="zipwit" title={zipwitOrganization.name} subtitle="Ecommerce organization">
					<p>{zipwitOrganization.summary}</p>
					<p>
						<TextLink href="/portfolio/zipwit">Explore Zipwit projects</TextLink>
					</p>
					<p>
						<ExternalLink href={zipwitOrganization.github}>Zipwit on GitHub</ExternalLink>
					</p>
				</AboutSection>
				<AboutSection id="beautycode" title="Beauty Code" subtitle={beautyCodeWork.role}>
					<p>{beautyCodeWork.context}</p>
					<p>{beautyCodeWork.summary}</p>
					<p>
						<TextLink href="/portfolio/beautycode">Read about the storefront</TextLink>
					</p>
				</AboutSection>
				<AboutSection id="systems" title="Systems and research">
					<p>
						I also enjoy understanding the systems underneath an application. In{" "}
						<TextLink href="/portfolio/velis">Velis</TextLink>, I work on the details of a Python
						cache: expiration, eviction, a TCP protocol, and a terminal client that makes the server
						easier to explore.
					</p>
					<p>
						<TextLink href="/portfolio/weft">Weft</TextLink> explores choosing between optimistic
						transactions and early write locking in Java. My{" "}
						<TextLink href="/portfolio/bachelor-thesis">Clojure STM thesis</TextLink> studies
						consistent snapshots and coordinating side effects with transaction outcomes. Both
						projects connect implementation choices to concurrency benchmarks.
					</p>
				</AboutSection>
				<AboutSection id="education" title="Education">
					<div>
						<p className="text-base font-medium text-foreground">{education.degree}</p>
						<p>{education.school}</p>
					</div>
					<p>{education.note}</p>
				</AboutSection>
				<AboutSection id="training" title="Training">
					<p>
						<TextLink href="/certifications">View certifications and training</TextLink>
					</p>
					<ul className="space-y-8">
						{training.map((item) => (
							<TrainingItem key={item.title} item={item} />
						))}
					</ul>
				</AboutSection>
				<AboutSection id="contact" title="Get in touch">
					<p>For software projects, automation ideas, or a conversation:</p>
					<a
						href={`mailto:${profile.email}`}
						className={`${linkClass} inline-block break-all text-base`}
					>
						{profile.email}
					</a>
					<SocialLinks />
				</AboutSection>
			</div>
		</>
	);
}
