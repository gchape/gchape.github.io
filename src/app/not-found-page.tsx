import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

export function NotFoundPage() {
	return (
		<Empty>
			<EmptyHeader>
				<p className="font-sans text-xs text-muted-foreground">404</p>
				<EmptyTitle>
					<h1>Page not found.</h1>
				</EmptyTitle>
				<EmptyDescription>The page you're looking for doesn't exist or has moved.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button nativeButton={false} render={<Link href="/" />} variant="outline">
					Back to the blog
				</Button>
			</EmptyContent>
		</Empty>
	);
}
