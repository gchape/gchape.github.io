import { lazy, Suspense, useEffect, useRef } from "react";
import { Route, Switch, useLocation } from "wouter";
import { NotFoundPage } from "@/app/not-found-page";
import { Seo } from "@/app/seo";
import { SiteBackground } from "@/components/layout/site-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BlogPage } from "@/features/blog/blog-page";

const AboutPage = lazy(() =>
	import("@/features/about/about-page").then(({ AboutPage }) => ({ default: AboutPage })),
);
const PortfolioPage = lazy(() =>
	import("@/features/portfolio/portfolio-page").then(({ PortfolioPage }) => ({
		default: PortfolioPage,
	})),
);
const ArticlePage = lazy(() =>
	import("@/features/blog/article-page").then(({ ArticlePage }) => ({ default: ArticlePage })),
);
const ProjectPage = lazy(() =>
	import("@/features/portfolio/project-page").then(({ ProjectPage }) => ({ default: ProjectPage })),
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
		<div className="relative isolate min-h-dvh">
			<Seo />
			<SiteBackground />
			<div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 sm:px-10 lg:px-12">
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
				<main
					id="main-content"
					ref={main}
					tabIndex={-1}
					className="flex-1 pt-14 pb-20 outline-none sm:pt-20 sm:pb-28"
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
		</div>
	);
}
