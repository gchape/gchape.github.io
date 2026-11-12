# Blog & portfolio

Giorgi Chapidze's personal site, built with React, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui. Wouter uses normal browser URLs. The production build pre-renders every page to its own HTML file, so GitHub Pages can serve deep links without server rewrite rules.

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Use Node.js 26 and the pnpm version pinned in `package.json`.

## Checks

```sh
pnpm check
pnpm check:fix
pnpm lint
pnpm format
pnpm typecheck
pnpm test
pnpm unused
pnpm build
pnpm preview
```

Biome checks source, configuration, HTML, CSS, SVG, and Markdown. It understands Tailwind directives and Markdown frontmatter. Generated output, dependencies, and the generated lockfile are excluded.

## Structure

```text
src/
  app/
    App.tsx
    application.tsx
    metadata.ts
    seo.tsx
    not-found-page.tsx
  features/
    about/
      components/
      about-page.tsx
    blog/
      components/
      content/
        posts/
      article-page.tsx
      blog-page.tsx
    portfolio/
      components/
      content/
        projects/
      portfolio-page.tsx
      project-page.tsx
  components/
    content/
    layout/
    ui/
  content/
  lib/
  entry-server.tsx
  main.tsx
  index.css
```

`src/app/` owns routing, providers, SEO, and the fallback page. Each feature owns its pages, components, and content. Shared components live in `src/components/`; profile, experience, and site settings live in `src/content/`. Post metadata tests sit beside the blog's metadata parser.

UI controls use shadcn's `base-sera` preset with Base UI primitives and Lucide icons. Keep shared control styling in `src/components/ui/`. `src/index.css` defines the mint and charcoal themes. Fontsource serves Playfair Display for headings, Source Sans 3 for body text, and JetBrains Mono for code. `next-themes` provides Light, Dark, and System modes with persistence and cross-tab sync.

Page entrances, staggered lists, and hover motion use `tw-animate-css` and Tailwind utilities. Motion respects reduced-motion preferences.

`SiteBackground` adds a dotted grid and pointer glow using animation frames without React rerenders. The pointer effect hides on touch devices and with reduced motion. The homepage project preview uses the shared project data.

Add components using the existing preset:

```sh
pnpm exec shadcn add component-name
```

`components.json` stores the preset configuration.

## Add a post

Create a Markdown file in `src/features/blog/content/posts/`. The filename becomes its URL slug. Posts are automatically sorted by date; categories become filter options.

````md
---
title: A useful thing I learned
description: A short description shown in the post list.
date: 2026-11-10
category: Development
sample: false
---

The opening paragraph.

## A section

Some text with **emphasis**, `inline code`, or a [link](https://example.com).

```typescript
const message = "Hello";
```
````

Posts use `react-markdown` with `remark-gfm`: CommonMark, tables, nested lists, task lists, links, images, blockquotes, and fenced code blocks. Raw HTML is disabled and unsafe link protocols are filtered by the renderer. Code blocks and their copy buttons come from shadcn. Tailwind Typography handles article styling.

Valibot validates post metadata. Title, description, date, and category are required; `sample` defaults to `false`. Quoted dates and YAML date timestamps are accepted, while missing or impossible dates fail with the source filename and field. There is no fallback publication date.

Fenced `mermaid` blocks render as SVG diagrams in posts and project descriptions. Mermaid loads when a diagram approaches the viewport, follows the light/dark theme, and uses Source Sans 3. Diagrams scroll horizontally on narrow screens and support keyboard focus. Include `accTitle:` and `accDescr:` in each chart for accessible labels and descriptions.

`vite-plugin-markdown` extracts YAML frontmatter and article text at build time. No custom build plugin or browser-side parser is needed.

## Add a project

Create a project module in `src/features/portfolio/content/projects/`:

```typescript
import type { Project } from "../project";

export const myProject: Project = {
	slug: "my-project",
	title: "My project",
	description: "What it does.",
	category: "Web apps",
	tags: ["React", "TypeScript"],
	content: "## Overview\n\nThe story behind this project.",
	url: "https://example.com",
	github: "https://github.com/me/project",
	image: "/images/my-project.webp",
	imageAlt: "Screenshot of my project",
	imageSrcSet: "/images/my-project-small.webp 640w, /images/my-project.webp 1280w",
	video: "https://example.com/demo",
};
```

Import the project into `src/features/portfolio/content/projects.ts` and add it to the `projects` array. Each project gets a detail page. Live-site, repository, and demo-video links appear when supplied.

Project promo images live in `public/images/projects/` as responsive WebP files. The Beauty Code and Velis images come from their repositories’ READMEs; video links point to the original GitHub attachments. Keep original image proportions and provide alt text.

## Personalize

- Contact links: `src/content/profile.ts`.
- Education, training, Ohooq plans, and Beauty Code role: `src/content/experience.ts`.
- Introduction and About copy: `src/features/blog/blog-page.tsx` and `src/features/about/about-page.tsx`.
- Light and dark colors: `src/index.css`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `main`. It installs the pinned pnpm version on Node.js 26, runs Biome, unused-code checks, metadata tests, and the production build, then publishes `dist/`. You can also run it manually from the Actions tab.

In the repository's [Settings → Pages](https://github.com/gchape/gchape.github.io/settings/pages), set **Build and deployment → Source** to **GitHub Actions** once. This is the [publishing source required for a custom workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). The workflow uses GitHub's built-in token; no custom deployment secret is needed.

The site will be available at <https://gchape.github.io/>. Vite's default `/` base and the generated page directories work for this repository without extra routing configuration. Old `#/...` links redirect to their normal URLs.

## SEO and sitemap

`src/content/site.ts` defines the public site URL and default metadata. `src/app/metadata.ts` defines page metadata, and `src/app/seo.tsx` renders titles, descriptions, canonical URLs, Open Graph and Twitter tags, and JSON-LD. The same metadata is included in the pre-rendered HTML, alongside the page content, before JavaScript runs.

`pnpm build` runs `scripts/prerender.mjs` after Vite. It generates each page's `index.html`, a real `404.html`, `sitemap.xml`, and `robots.txt` in `dist/`. The sitemap includes the homepage, About, Portfolio, projects, and published posts. Sample posts (`sample: true`) and the 404 page use `noindex` and are excluded from the sitemap. Set `sample: false` when publishing a real post.

The deployed sitemap is <https://gchape.github.io/sitemap.xml>. It is also advertised in <https://gchape.github.io/robots.txt> and can be submitted in Google Search Console. Updating posts or projects automatically updates the generated pages and sitemap on the next build. If the domain changes, update `site.url` before building.

## Maintenance and performance

See [the maintenance audit](docs/maintenance-audit.md) for the latest dependency review, browser checks, and measured loading changes. `pnpm-workspace.yaml` contains targeted security overrides for transitive build dependencies; remove each override when its parent dependency adopts the patched version.

The initial pages use pre-rendered HTML, with JSON-LD kept in the React tree to preserve hydration. About, Portfolio, and detail pages load their own route code on demand. Body and heading fonts are preloaded; other font subsets load only when their characters are used. Diagram rendering waits until the figure approaches the viewport.

## Generated resume

`pnpm build` generates `dist/resume.pdf` with `@react-pdf/renderer`. The About page links to this download. The PDF reuses profile, experience, education, training, and project content; edit those shared files to update both outputs. Its layout lives in `src/features/resume/resume-document.tsx`.

Run `pnpm resume` to regenerate the PDF alone. To try the download locally, run `pnpm build` followed by `pnpm preview`; the generated PDF is a build artifact and is not served by `pnpm dev`. PDF generation runs only at build time and adds no PDF library to the website's browser bundle.
