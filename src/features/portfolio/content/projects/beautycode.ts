import { beautyCodeWork } from "@/content/experience";
import type { Project } from "../project";

export const beautyCode: Project = {
	slug: "beautycode",
	title: "Beauty Code",
	description:
		"A live Georgian storefront that connects product discovery to shop conversations, with catalog administration, full-text search, and image delivery.",
	category: "Web apps",
	tags: ["React", "TanStack Start", "SQLite", "Tailwind CSS"],
	url: "https://beautycode.com.ge",
	github: "https://github.com/gchape/beautycode",
	image: "/images/projects/beautycode-1280.webp",
	imageSrcSet:
		"/images/projects/beautycode-640.webp 640w, /images/projects/beautycode-1280.webp 1280w",
	imageAlt:
		"Beauty Code storefront promotional image with Georgian captions and captured Lighthouse scores",
	video: "https://github.com/user-attachments/assets/a44e55ab-4551-4b4e-b235-a11089eb43df",
	content: `## From a product to a conversation

Beauty Code serves two audiences: customers browsing a Georgian product catalog, and the shop owner keeping that catalog current. Visitors can search products, compare current and discounted prices, explore galleries, and ask the shop about a specific item.

Product chat actions pass the item's name, price, and page URL into Crisp, giving the conversation context. General contact actions open a conversation with the shop. The catalog is built around browsing products and starting a conversation.

## My role

I serve as Beauty Code's CTO and technical lead. ${beautyCodeWork.summary}

${beautyCodeWork.context}

## Keeping the catalog consistent

The admin interface manages products, categories, availability, and ordered image galleries. Publishing state and stock state are separate: drafts stay private, preorders remain visible, and an out-of-stock item keeps its page while its order action is disabled.

A product save updates its fields, gallery references, and audit record in one SQLite transaction. Full-text search indexes follow database changes through triggers. Renaming a product preserves its existing slug, so links continue to work.

## Architecture

React and TanStack Start provide the pages and server endpoints. Public catalog reads and authenticated writes share SQLite; image uploads and database snapshots have dedicated services.

\`\`\`mermaid
flowchart TB
    accTitle: Beauty Code application architecture
    accDescr: TanStack Start routes separate public catalog reads from authenticated admin operations. Both use SQLite. Admin operations also handle Cloudinary image uploads and database snapshots backed up to S3.
    routes("TanStack Start routes") --> public("Storefront queries")
    routes --> admin("Authenticated admin API")
    public --> reads("Published catalog reads")
    admin --> writes("Transactional writes and audit")
    reads --> db[("SQLite: catalog and search")]
    writes --> db
    admin --> uploads("Cloudinary image uploads")
    admin --> snapshots("Database snapshots")
    snapshots --> s3[("S3 backups")]
\`\`\`

The [application documentation](https://github.com/gchape/beautycode#application-architecture) explains these boundaries and the catalog's visibility rules.

## Images and recovery

Uploads are checked for file size and signature before the original goes to Cloudinary. Product cards and galleries request responsive image sizes with automatic format and quality selection.

Database snapshots preserve the catalog, search data, galleries, and audit history. Restore checks integrity, foreign keys, and schema compatibility, then keeps a safety copy before replacing an existing database. Cloudinary image assets have a separate lifecycle: a database snapshot preserves their URLs, not the image files.

## Operating the storefront

The deployment uses Docker Compose and nginx on one EC2 host. Terraform defines the network, instance, role, Elastic IP, and S3 backup bucket. nginx handles HTTPS and admin authentication, while the application stays on the private container network.

This keeps the operational model small, with a clear recovery tradeoff: replacing the host requires restoring the catalog, and the setup has no automatic failover. The [deployment and recovery guide](https://github.com/gchape/beautycode#production-deployment) covers releases, backups, and restoration. Tests cover catalog behavior, authorization, search, backups, and SEO.`,
};
