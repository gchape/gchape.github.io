import { Link } from "wouter";
import { PageHeading } from "@/components/page-heading";
import { SocialLinks } from "@/components/social-links";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/content/profile";

export function AboutPage() {
	return (
		<>
			<PageHeading title="About.">
				<p>
					I'm Giorgi Chapidze, a developer who likes understanding how things work and making things
					of my own.
				</p>
			</PageHeading>
			<div className="max-w-2xl space-y-7 text-lg leading-8 text-muted-foreground">
				<p>
					This site is where I keep notes on software, share projects, and write down things I want
					to remember. It's a personal space that will grow as I add to it.
				</p>
				<p>
					You can find my work on{" "}
					<Link
						href="/portfolio"
						className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
					>
						the portfolio page
					</Link>{" "}
					or browse{" "}
					<Link
						href="/"
						className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
					>
						the blog
					</Link>
					.
				</p>
			</div>
			<Separator className="mt-16" />
			<section className="pt-10" aria-labelledby="contact-heading">
				<h2 id="contact-heading" className="text-lg font-medium tracking-tight">
					Get in touch
				</h2>
				<p className="mt-4 text-sm leading-7 text-muted-foreground">
					For questions, ideas, or just to say hello:
				</p>
				<a
					href={`mailto:${profile.email}`}
					className="mt-2 inline-block break-all text-base underline decoration-border underline-offset-4 hover:decoration-primary"
				>
					{profile.email}
				</a>
				<div className="mt-6">
					<SocialLinks />
				</div>
			</section>
		</>
	);
}
