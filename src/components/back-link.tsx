import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function BackLink({ href, children }: { href: string; children: string }) {
	return (
		<Button
			variant="link"
			size="sm"
			nativeButton={false}
			render={<Link href={href} />}
			className="mb-10 px-0 text-muted-foreground"
		>
			<ArrowLeft aria-hidden="true" />
			{children}
		</Button>
	);
}
