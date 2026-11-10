import { SocialLinks } from "@/components/social-links";
import { profile } from "@/content/profile";

export function SiteFooter() {
	return (
		<footer className="flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-muted-foreground">
			<p>
				© {new Date().getFullYear()} {profile.name}
			</p>
			<SocialLinks compact />
		</footer>
	);
}
