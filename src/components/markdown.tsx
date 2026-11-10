import { isValidElement } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@/components/ui/code-block";

const components: Components = {
	pre({ children }) {
		if (!isValidElement<{ children?: string; className?: string }>(children))
			return <pre>{children}</pre>;
		const code = String(children.props.children ?? "").replace(/\n$/, "");
		const language = /language-(\S+)/.exec(children.props.className ?? "")?.[1] ?? "";
		return (
			<CodeBlock className="not-prose my-7">
				<CodeBlockHeader>
					<CodeBlockTitle>{language || "code"}</CodeBlockTitle>
					<CodeBlockActions>
						<CodeBlockCopyButton value={code} />
					</CodeBlockActions>
				</CodeBlockHeader>
				<CodeBlockContent>{code}</CodeBlockContent>
			</CodeBlock>
		);
	},
	a({ href, children }) {
		const external = /^https?:\/\//.test(href ?? "");
		return (
			<a
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
			>
				{children}
			</a>
		);
	},
	table({ children }) {
		return (
			<div className="overflow-x-auto">
				<table>{children}</table>
			</div>
		);
	},
};

export function Markdown({ content }: { content: string }) {
	return (
		<div className="prose max-w-none break-words prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-blockquote:border-border prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-li:text-muted-foreground prose-th:text-foreground prose-td:text-muted-foreground prose-img:max-w-full dark:prose-invert">
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
				{content}
			</ReactMarkdown>
		</div>
	);
}
