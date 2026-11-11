# Maintenance audit — November 11, 2026

## Dependencies and unused code

- Updated Lucide React from 1.70.0 to 1.71.0 and pinned pnpm 12.18.0 in the project and deployment workflow.
- The final registry check found no newer stable direct dependencies.
- Knip found no unused files, exports, or dependencies. The deployment workflow now runs this check.
- Reduced the full dependency audit from nine advisories to one low-severity advisory using targeted overrides for Markdown-it, PostCSS Selector Parser, and Minimatch. Overrides live in `pnpm-workspace.yaml`, as required by [pnpm’s configuration format](https://pnpm.io/settings).
- The production dependency audit is clean. One [unpatched Deepmerge advisory](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) remains in the development-only shadcn CLI. That CLI is not shipped to the browser; its CSS is used by the generated controls. The CLI’s `info` command also passed after the overrides.

## Changes that affect loading

The static build moved an inline JSON-LD script out of React’s root while extracting page metadata. React expected that script during hydration, causing error 418 and rebuilding the page in the browser. The build now preserves that script in the root while moving the metadata elements React hoists into the head. Browser checks confirm the hydration error is gone.

About and Portfolio now load their route code on demand, alongside the existing lazy detail pages. The body and heading fonts are preloaded. Architecture diagrams wait until their figures approach the viewport before downloading Mermaid or rendering, and still follow theme changes.

The promo images now use local WebP files with responsive candidates and explicit dimensions. Detail images also declare their display sizes and high loading priority. Videos remain links and do not download automatically.

| Image       | Original PNG | 640 px WebP | 1280 px WebP |
| ----------- | -----------: | ----------: | -----------: |
| Beauty Code |  1,891,445 B |    31,856 B |     82,278 B |
| Velis       |  1,331,344 B |    11,148 B |     31,236 B |

The originals are the promotional images in the [Beauty Code README](https://github.com/gchape/beautycode#promotional-media) and [Velis README](https://github.com/gchape/velis#demo). Assets are checked into `public/images/projects/`; Sharp was used as a temporary audit tool and was not added to application dependencies.

## Package simplification review

The existing stack already delegates routing to Wouter, theme persistence to next-themes, accessible controls to Base UI, Markdown to react-markdown and remark-gfm, frontmatter to vite-plugin-markdown, validation to Valibot, and sitemap generation to sitemap. The remaining date formatting and pointer effect are small uses of browser APIs. Adding another runtime package would not remove meaningful complexity.

[Mermaid Tiny](https://mermaid.js.org/config/usage.html) was evaluated and not adopted. Its published 12.3.0 package is a browser-global bundle without TypeScript declarations, so replacing the current typed ESM import would introduce custom loading and type workarounds. The full renderer remains an optional, viewport-triggered download. Its large optional chunks still produce a Vite size warning; they are not part of the initial page load.

## Verification

- Biome, TypeScript, post metadata tests, Knip, and the production build passed; all 12 pages were pre-rendered.
- All 12 generated routes were checked at 390 px and 1440 px widths. No browser errors or horizontal page overflow were found; project images loaded successfully.
- Verified category filtering, client navigation to Gym CRM, and light/dark theme switching. All four architecture diagrams rendered successfully.
- Lighthouse 13.6.0 ran against production builds served on localhost with gzip compression, using its default mobile simulation. These are local lab comparisons, not field measurements or deployed-site scores. The baseline includes the Gym CRM and media additions from the preceding change.

| Page      | Performance before → after | LCP before → after | Blocking time before → after |
| --------- | -------------------------: | -----------------: | ---------------------------: |
| Home      |                   93 → 100 |      2.8 s → 0.9 s |               170 ms → 40 ms |
| Portfolio |                   95 → 100 |      2.8 s → 0.9 s |                80 ms → 30 ms |
| Velis     |                    60 → 95 |     12.3 s → 2.9 s |               430 ms → 60 ms |

All three final pages scored 100 for accessibility, best practices, and SEO, with zero measured layout shift.

Audit reports, browser logs, and screenshots were kept under `/tmp/portfolio-*` for this session. Temporary browser and image tools live in `/tmp/portfolio-audit`; they are not project dependencies. Changes have not been deployed.
