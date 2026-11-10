import { lazy, Suspense, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "wouter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AboutPage } from "@/pages/about-page";
import { BlogPage } from "@/pages/blog-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { PortfolioPage } from "@/pages/portfolio-page";

const ArticlePage = lazy(() =>
	import("@/pages/article-page").then(({ ArticlePage }) => ({ default: ArticlePage })),
);
const ProjectPage = lazy(() =>
	import("@/pages/project-page").then(({ ProjectPage }) => ({ default: ProjectPage })),
);

export default function App() {
	const [location] = useLocation();
	const main = useRef<HTMLElement>(null);
	const previousLocation = useRef(location);
	useEffect(() => {
		if (previousLocation.current === location) return;
		previousLocation.current = location;
		window.scrollTo({ top: 0, behavior: "instant" });
		main.current?.focus({ preventScroll: true });
	}, [location]);

	return (
		<div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6 sm:px-10 lg:px-12">
			<Button
				type="button"
				className="fixed top-4 left-4 z-50 -translate-y-24 focus:translate-y-0"
				onClick={() => {
					main.current?.focus();
					main.current?.scrollIntoView();
				}}
			>
				Skip to content
			</Button>
			<SiteHeader />
			<Separator />
			<main
				id="main-content"
				ref={main}
				tabIndex={-1}
				className="flex-1 pt-16 pb-24 outline-none sm:pt-24 sm:pb-32"
				key={location}
			>
				<Suspense
					fallback={
						<p role="status" className="py-10 text-sm text-muted-foreground">
							Loading…
						</p>
					}
				>
					<div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-both motion-safe:duration-500 motion-safe:ease-smooth">
						<Switch>
							<Route path="/" component={BlogPage} />
							<Route path="/portfolio" component={PortfolioPage} />
							<Route path="/about" component={AboutPage} />
							<Route path="/blog/:slug" component={ArticlePage} />
							<Route path="/portfolio/:slug" component={ProjectPage} />
							<Route component={NotFoundPage} />
						</Switch>
					</div>
				</Suspense>
			</main>
			<Separator />
			<SiteFooter />
		</div>
	);
}
