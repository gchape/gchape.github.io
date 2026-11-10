# Blog & portfolio

Giorgi Chapidze's personal site, built with React, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui. Static hosting works without server rewrite rules because wouter uses hash routes.

## Development

```sh
pnpm install
pnpm dev
```

## Checks

```sh
pnpm check       # Biome: formatting, linting, imports; warnings fail the check
pnpm check:fix   # Apply safe fixes
pnpm lint        # Biome lint only
pnpm format     # Format the codebase
pnpm typecheck  # TypeScript
pnpm unused     # Knip: unused files, exports, and dependencies
pnpm build      # TypeScript + production build
pnpm preview    # Preview the production build
```

Biome checks source, configuration, HTML, CSS, SVG, and Markdown. It understands Tailwind directives and Markdown frontmatter. Generated output, dependencies, and the generated lockfile are excluded.

## Structure

```text
src/
  components/   Navigation, post/project lists, filters, Markdown
    ui/         shadcn components generated from the base-sera preset
  content/
    posts/      Markdown blog posts
    posts.ts    Post loading and metadata
    profile.ts  Name and contact links
    projects.ts Project entries and their type
  lib/          Shared utilities and date formatting
  pages/        Blog, portfolio, about, article, project, and 404
  App.tsx       wouter routes and site layout
  index.css     Tailwind import, theme tokens, and base styles
```

UI controls use shadcn's `base-sera` preset with Base UI primitives: Button, InputGroup, ToggleGroup, DropdownMenu, Badge, Item, Empty, Separator, and CodeBlock. All UI icons, including Git, contact, and email symbols for social links, come from the installed Lucide package. `src/index.css` holds the preset's taupe theme tokens. Headings use Playfair Display, and body text uses Source Sans 3. Both variable fonts are served locally through Fontsource. Code, dates, tags, and metadata also use Source Sans 3; there is no separate monospace font. Both themes use shadcn's standard tokens and `.dark` class. `next-themes` handles persistence, cross-tab sync, and system preferences; the menu supports Light, Dark, and System.

Page entrances, staggered lists, and hover motion use `tw-animate-css` and Tailwind utilities with a shared easing curve. The page entrance starts after lazy content is ready; stagger delays are capped for long lists. Hover transitions include Tailwind's independent `translate` property. Motion respects reduced-motion preferences.

Add components using the existing preset:

```sh
pnpm exec shadcn add component-name
```

`components.json` is the preset configuration. Keep shared component styling in `src/components/ui/` rather than reimplementing controls in individual pages.

## Add a post

Create a Markdown file in `src/content/posts/`. The filename becomes its URL slug. Posts are automatically sorted by date; categories become filter options.

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

`vite-plugin-markdown` extracts YAML frontmatter and article text at build time. No custom build plugin or browser-side parser is needed.

## Add a project

Add or update entries in `src/content/projects.ts`:

```typescript
{
  slug: "my-project",
  title: "My project",
  description: "What it does.",
  category: "Web apps",
  tags: ["React", "TypeScript"],
  content: "## Overview\n\nThe story behind this project.",
  url: "https://example.com",             // optional
  github: "https://github.com/me/project", // optional
  image: "/images/my-project.webp",        // optional; put images in public/images/
  imageAlt: "Screenshot of my project",    // optional
}
```

wouter handles routes, URL parameters, and internal links. Each project gets a detail page. Live-site and repository links appear when supplied.

## Personalize

- Contact links: `src/content/profile.ts`.
- Introduction and About copy: `src/pages/blog-page.tsx` and `src/pages/about-page.tsx`.
- Light and dark colors: `src/index.css`.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `main`. It installs the pinned pnpm version on Node.js 26, runs Biome and the production build, and publishes `dist/` only after both succeed. You can also run it manually from the Actions tab.

In the repository's [Settings → Pages](https://github.com/gchape/gchape.github.io/settings/pages), set **Build and deployment → Source** to **GitHub Actions** once. This is the [publishing source required for a custom workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). The workflow uses GitHub's built-in token; no custom deployment secret is needed.

The site will be available at <https://gchape.github.io/>. Vite's default `/` base and the existing hash routes work for this repository without extra routing configuration.
