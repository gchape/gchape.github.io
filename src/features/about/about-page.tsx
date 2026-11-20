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
					I design UIs, shape software architecture, and deploy what I build. I favor simple,
					composable components and choose languages and tools to fit the problem.
				</p>
				<p className="mt-4">
					I enjoy reading about advanced programming concepts and lesser-known language features.
					Books from the Martin Fowler Signature Series are among my favorites.
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
						I’m interested in digital marketing and web analytics, especially where a storefront’s
						traffic comes from and how customers move through the site. I’m learning how SEO and GEO
						can help people find a storefront in search results and AI-generated answers.
					</p>
					<p>
						I was skeptical of AI at first. Now I use it in development and explore what it can
						automate. I’m studying retrieval-augmented generation (RAG) and learning to build agent
						workflows with LangChain and LangGraph.
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
						My systems projects give me a way to explore how software behaves in practice. In{" "}
						<TextLink href="/portfolio/velis">Velis</TextLink>, I work on the details of a Python
						cache: expiration, eviction, a TCP protocol, and a terminal client that makes the server
						easier to explore.
					</p>
					<p>
						<TextLink href="/portfolio/weft">Weft</TextLink> compares optimistic transactions with
						early write locking in Java. My{" "}
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
					<p>Feel free to reach out about software projects or automation ideas.</p>
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
