"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function InputGroup({ className, ...props }: React.ComponentProps<"fieldset">) {
	return (
		<fieldset
			data-slot="input-group"
			className={cn(
				"group/input-group relative flex h-10 w-full min-w-0 items-center rounded-xl border border-input bg-transparent px-3 transition-[color,border-color] duration-200 ease-smooth motion-reduce:transition-none outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-none has-data-[align=block-start]:rounded-none has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot][aria-invalid=true]]:border-b-destructive has-[textarea]:rounded-none has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:border-b-destructive/50 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3",
				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"flex h-auto cursor-text items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-none **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
	{
		variants: {
			align: {
				"inline-start": "order-first",
				"inline-end": "order-last",
				"block-start":
					"order-first w-full justify-start pt-3 group-has-[>input]/input-group:pt-3.5 [.border-b]:pb-3.5",
				"block-end":
					"order-last w-full justify-start pb-3 group-has-[>input]/input-group:pb-3.5 [.border-t]:pt-3.5",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	},
);

function InputGroupAddon({
	className,
	align = "inline-start",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		<div
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onPointerDown={(e) => {
				if ((e.target as HTMLElement).closest("button")) {
					return;
				}
				e.preventDefault();
				e.currentTarget.parentElement?.querySelector("input")?.focus();
			}}
			{...props}
		/>
	);
}

const inputGroupButtonVariants = cva("flex items-center gap-2 rounded-full text-sm shadow-none", {
	variants: {
		size: {
			xs: "h-6 gap-1 rounded-full px-1.5 text-xs [&>svg:not([class*='size-'])]:size-3.5",
			sm: "",
			"icon-xs": "size-6 p-0 text-xs has-[>svg]:p-0",
			"icon-sm": "size-8 p-0 has-[>svg]:p-0",
		},
	},
	defaultVariants: {
		size: "xs",
	},
});

function InputGroupButton({
	className,
	type = "button",
	variant = "ghost",
	size = "xs",
	...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
	VariantProps<typeof inputGroupButtonVariants> & {
		type?: "button" | "submit" | "reset";
	}) {
	return (
		<Button
			type={type}
			data-size={size}
			variant={variant}
			className={cn(inputGroupButtonVariants({ size }), className)}
			{...props}
		/>
	);
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
	return (
		<Input
			data-slot="input-group-control"
			className={cn(
				"flex-1 border-0 bg-transparent ring-0 group-has-[>[data-align=inline-end]]/input-group:pr-2 group-has-[>[data-align=inline-start]]/input-group:pl-2 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput };
