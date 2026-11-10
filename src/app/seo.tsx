import { useLocation } from "wouter";
import { getCanonicalUrl, getPageMetadata } from "@/app/metadata";
import { education } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { projects } from "@/features/portfolio/content/projects";

export function Seo() {
	const [location] = useLocation();
	const page = getPageMetadata(location);
	const url = getCanonicalUrl(page.path);
	const personId = `${site.url}/#person`;
	const websiteId = `${site.url}/#website`;
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": personId,
				name: profile.name,
				jobTitle: profile.jobTitle,
				url: `${site.url}/about/`,
				sameAs: [profile.github, profile.linkedin],
				alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
				knowsAbout: profile.knowsAbout,
			},
			{
				"@type": "WebSite",
				"@id": websiteId,
				url: `${site.url}/`,
				name: site.title,
				description: site.description,
				inLanguage: "en",
				publisher: { "@id": personId },
			},
			{
				"@type": page.schemaType,
				"@id": `${url}#content`,
				url,
				name: page.title,
				headline: page.title,
				description: page.description,
				inLanguage: "en",
				isPartOf: { "@id": websiteId },
				author: { "@id": personId },
				...(page.date && { datePublished: page.date }),
				...(page.schemaType === "SoftwareSourceCode" && { codeRepository: page.repository }),
				...(page.schemaType === "ProfilePage" && { mainEntity: { "@id": personId } }),
			},
			...(page.path === "/portfolio"
				? [
						{
							"@type": "ItemList",
							itemListElement: projects.map((project, index) => ({
								"@type": "ListItem",
								position: index + 1,
								name: project.title,
								url: getCanonicalUrl(`/portfolio/${project.slug}`),
							})),
						},
					]
				: []),
		],
	};

	return (
		<>
			<title data-seo="true">{page.title}</title>
			<meta data-seo="true" name="description" content={page.description} />
			<meta data-seo="true" name="author" content={profile.name} />
			<meta
				data-seo="true"
				name="robots"
				content={page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}
			/>
			<link data-seo="true" rel="canonical" href={url} />
			<meta data-seo="true" property="og:site_name" content={site.title} />
			<meta data-seo="true" property="og:title" content={page.title} />
			<meta data-seo="true" property="og:description" content={page.description} />
			<meta data-seo="true" property="og:url" content={url} />
			<meta
				data-seo="true"
				property="og:type"
				content={page.schemaType === "BlogPosting" ? "article" : "website"}
			/>
			<meta data-seo="true" name="twitter:card" content="summary" />
			<meta data-seo="true" name="twitter:title" content={page.title} />
			<meta data-seo="true" name="twitter:description" content={page.description} />
			<script data-seo="true" type="application/ld+json">
				{JSON.stringify(structuredData).replace(/</g, "\\u003c")}
			</script>
		</>
	);
}
