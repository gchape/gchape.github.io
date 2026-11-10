import { cn } from "cn";
import type { ComponentProps } from "react";
import { Link } from "wouter";

export const linkClass =
	"text-foreground underline decoration-border underline-offset-4 hover:decoration-primary";

export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
	return <Link className={cn(linkClass, className)} {...props} />;
}

export function ExternalLink({ className, children, ...props }: ComponentProps<"a">) {
	return (
		<a target="_blank" rel="noopener noreferrer" className={cn(linkClass, className)} {...props}>
			{children}
		</a>
	);
}
