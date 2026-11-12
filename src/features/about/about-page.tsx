import { PageHeading } from "@/components/page-heading";
import { Panel } from "@/components/panel";
import { SocialLinks } from "@/components/social-links";
import { ExternalLink, linkClass, TextLink } from "@/components/text-link";
import { beautyCodeWork, education, ohooq, training } from "@/content/experience";
import { profile } from "@/content/profile";

import { AboutSection } from "./components/about-section";
import { TrainingItem } from "./components/training-item";

export function AboutPage() {
	return (
		<>
			<PageHeading title="About.">
				<p>
					I'm Giorgi Chapidze, a software developer and Computer Science graduate interested in
					full-stack development, AI automation, and agents, alongside concurrency, databases, and
					systems programming.
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
						I want to build practical tools that help businesses spend less time on repetitive work
						and bring their processes into one place. That connects my interest in full-stack
						software with AI automation and agents.
					</p>
					<p>
						I'm especially interested in digital commerce. I believe the future of online shopping
						will connect product discovery, customer conversations, and business operations more
						closely. My work with Beauty Code and my plans for Ohooq explore that direction.
					</p>
				</Panel>
				<AboutSection id="ohooq" title={ohooq.name} subtitle="GitHub organization">
					<p>{ohooq.summary}</p>
					<p>I'm planning a shared space for tools such as:</p>
					<ul className="list-disc space-y-1 pl-5">
						{ohooq.plans.map((plan) => (
							<li key={plan}>{plan}</li>
						))}
					</ul>
					<p>
						<ExternalLink href={ohooq.github}>Ohooq on GitHub</ExternalLink>
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
