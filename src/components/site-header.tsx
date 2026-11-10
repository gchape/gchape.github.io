import { Link, useLocation } from "wouter";
import { ThemeMenu } from "@/components/theme-menu";
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
		<header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 py-7 sm:py-10">
			<Link
				href="/"
				aria-label="Giorgi Chapidze home"
				className="font-heading text-lg font-semibold tracking-tight sm:text-xl"
			>
				{profile.name}.
			</Link>
			<div className="flex items-center gap-2 sm:gap-4">
				<nav aria-label="Main navigation" className="flex items-center gap-1">
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
