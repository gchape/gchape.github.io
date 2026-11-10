import { cn } from "cn";
import { ContactRound, GitBranch, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

const links = [
	{ label: "GitHub", href: profile.github, external: true, icon: GitBranch },
	{ label: "LinkedIn", href: profile.linkedin, external: true, icon: ContactRound },
	{ label: "Email", href: `mailto:${profile.email}`, external: false, icon: Mail },
];

export function SocialLinks({
	compact = false,
	icons = true,
}: {
	compact?: boolean;
	icons?: boolean;
}) {
	const iconSize = compact ? "icon-sm" : "icon";
	return (
		<ul
			className={cn("flex flex-wrap items-center gap-2", !icons && "gap-x-6")}
			aria-label="Social links"
		>
			{links.map(({ label, href, external, icon: Icon }) => (
				<li key={label}>
					<Button
						variant={icons ? "ghost" : "link"}
						size={icons ? iconSize : "sm"}
						nativeButton={false}
						render={
							<a
								href={href}
								target={external ? "_blank" : undefined}
								rel={external ? "noopener noreferrer" : undefined}
								title={label}
								aria-label={external ? `${label} (opens in a new tab)` : `Email ${profile.email}`}
							/>
						}
						className={cn(
							"text-muted-foreground hover:text-primary motion-safe:hover:-translate-y-0.5",
							!icons && "px-0",
						)}
					>
						{icons ? <Icon aria-hidden="true" className="size-4" /> : label}
					</Button>
				</li>
			))}
		</ul>
	);
}
