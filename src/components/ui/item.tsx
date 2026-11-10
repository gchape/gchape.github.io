import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";

function ItemGroup({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="item-group"
			className={cn(
				"group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"group/item flex w-full flex-wrap items-center rounded-none border text-sm transition-[translate,box-shadow,border-color,background-color] duration-300 ease-smooth motion-reduce:transition-none outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:hover:bg-muted",
	{
		variants: {
			variant: {
				default: "border-transparent",
				outline: "border-border",
				muted: "border-transparent bg-muted/50",
			},
			size: {
				default: "gap-3.5 px-4 py-3.5",
				sm: "gap-3.5 px-3.5 py-3",
				xs: "gap-2.5 px-3 py-2.5 in-data-[slot=dropdown-menu-content]:p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Item({
	className,
	variant = "default",
	size = "default",
	render,
	...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(itemVariants({ variant, size, className })),
			},
			props,
		),
		render,
		state: {
			slot: "item",
			variant,
			size,
		},
	});
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-content"
			className={cn(
				"flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0.5 [&+[data-slot=item-content]]:flex-none",
				className,
			)}
			{...props}
		/>
	);
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-title"
			className={cn(
				"line-clamp-1 flex w-fit items-center gap-2 text-xs leading-snug font-semibold uppercase underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="item-description"
			className={cn(
				"line-clamp-2 text-left text-sm leading-relaxed font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />
	);
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-header"
			className={cn("flex basis-full items-center justify-between gap-2", className)}
			{...props}
		/>
	);
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-footer"
			className={cn("flex basis-full items-center justify-between gap-2", className)}
			{...props}
		/>
	);
}

export {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemTitle,
};
