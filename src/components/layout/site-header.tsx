import { cn } from "cn";
import { Link, useLocation } from "wouter";
import { ThemeMenu } from "@/components/layout/theme-menu";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

const navigation = [
	{ label: "Blog", href: "/", path: "/" },
	{ label: "Portfolio", href: "/portfolio", path: "/portfolio" },
	{ label: "About", href: "/about", path: "/about" },
];

export function SiteHeader() {
	const [route] = useLocation();
	return (
		<header className="sticky top-0 z-30 -mx-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-b border-border/80 bg-background/85 px-5 py-4 backdrop-blur-xl sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12">
			<Link
				href="/"
				aria-label="Giorgi Chapidze home"
				className="rounded-md font-heading text-xl font-medium tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				{profile.name}
			</Link>
			<div className="flex items-center gap-2 sm:gap-3">
				<nav
					aria-label="Main navigation"
					className="flex items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 shadow-sm"
				>
					{navigation.map((item) => {
						const active =
							item.path === "/"
								? route === "/" || route.startsWith("/blog/")
								: route === item.path || route.startsWith(`${item.path}/`);
						return (
							<Button
								key={item.path}
								nativeButton={false}
								render={<Link href={item.href} />}
								aria-current={active ? "page" : undefined}
								variant={active ? "secondary" : "ghost"}
								size="xs"
								className={cn(
									"h-8 px-3.5 text-sm font-medium",
									active && "bg-primary/10 text-primary",
								)}
							>
								{item.label}
							</Button>
						);
					})}
				</nav>
				<ThemeMenu />
			</div>
		</header>
	);
}
