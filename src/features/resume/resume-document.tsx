import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { beautyCodeWork, education, training } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { certifications } from "@/features/certifications/content";
import { projectPages, projects } from "@/features/portfolio/content/projects";

Font.registerHyphenationCallback((word) => [word]);

const ink = "#18221e";
const muted = "#465650";
const accent = "#245644";
const resumeProjects = new Set(["zipwit", "velis", "gym-crm"]);
const resumeSkills = new Set([
	"Java",
	"Clojure",
	"Python",
	"TypeScript",
	"React",
	"Spring Boot",
	"PostgreSQL",
	"SQLite",
	"MongoDB",
	"Redis / Valkey",
	"Kafka",
	"API design",
	"Concurrency",
	"Docker",
	"AWS",
	"Nginx",
	"Integration testing",
	"Testcontainers",
]);

const styles = StyleSheet.create({
	page: {
		paddingHorizontal: 38,
		paddingVertical: 38,
		fontFamily: "Helvetica",
		fontSize: 10.5,
		lineHeight: 1.24,
		color: ink,
	},
	header: { marginBottom: 9 },
	name: { fontFamily: "Helvetica-Bold", fontSize: 29, lineHeight: 1.12, marginBottom: 4 },
	role: { fontSize: 11.5, color: muted, lineHeight: 1.3, marginBottom: 8 },
	contacts: {
		flexDirection: "row",
		flexWrap: "wrap",
		columnGap: 12,
		rowGap: 4,
		fontSize: 10.5,
		lineHeight: 1.3,
	},
	link: { color: accent, textDecoration: "none" },
	section: {
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		color: accent,
		lineHeight: 1.3,
		marginTop: 12,
		marginBottom: 7,
		paddingBottom: 3,
		borderBottomWidth: 0.5,
		borderBottomColor: "#aebfb5",
	},
	heading: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		gap: 10,
		marginBottom: 3,
	},
	title: { fontFamily: "Helvetica-Bold", fontSize: 10.5, lineHeight: 1.3 },
	metadata: { color: muted, fontSize: 9.5 },
	project: { marginBottom: 9 },
	context: { color: muted, marginBottom: 5 },
	bullet: { flexDirection: "row", gap: 7, marginBottom: 3 },
	bulletText: { flex: 1 },
	skill: { marginBottom: 4 },
	credential: { flex: 1 },
	date: { color: muted, fontSize: 9.5, width: 104, textAlign: "right" },
});

function Bullets({ items }: { items: string[] }) {
	return items.map((item) => (
		<View key={item} style={styles.bullet}>
			<Text>•</Text>
			<Text style={styles.bulletText}>{item}</Text>
		</View>
	));
}

export function ResumeDocument() {
	return (
		<Document title={`${profile.name} — Resume`} author={profile.name} language="en">
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.name}>{profile.name}</Text>
					<Text style={styles.role}>{profile.jobTitle}</Text>
					<View style={styles.contacts}>
						<Link style={styles.link} src={`mailto:${profile.email}`}>
							{profile.email}
						</Link>
						<Link style={styles.link} src={site.url}>
							{new URL(site.url).host}
						</Link>
						<Link style={styles.link} src={profile.github}>
							{new URL(profile.github).host}
							{new URL(profile.github).pathname}
						</Link>
					</View>
				</View>
				<Text style={styles.section} minPresenceAhead={80}>
					Experience
				</Text>
				<View wrap={false}>
					<View style={styles.heading}>
						<Text style={styles.title}>Beauty Code — {beautyCodeWork.role}</Text>
						<Link style={styles.link} src="https://beautycode.com.ge">
							beautycode.com.ge
						</Link>
					</View>
					<Text style={styles.context}>{beautyCodeWork.context}</Text>
					<Bullets items={beautyCodeWork.resumeHighlights} />
				</View>
				<Text style={styles.section} minPresenceAhead={80}>
					Projects
				</Text>
				{projects
					.filter((project) => resumeProjects.has(project.slug))
					.map((project) => (
						<View key={project.slug} style={styles.project} wrap={false}>
							<View style={styles.heading}>
								<Text style={styles.title}>
									<Link style={styles.link} src={`${site.url}/portfolio/${project.slug}`}>
										{project.title}
									</Link>
								</Text>
								<Text style={styles.metadata}>
									{(project.slug === "zipwit"
										? (projectPages.find(({ slug }) => slug === "zipwit-shop")?.tags ??
											project.tags)
										: project.tags
									).join(", ")}
								</Text>
							</View>
							<Bullets items={project.resumeHighlights ?? []} />
						</View>
					))}
				<Text style={styles.section} minPresenceAhead={50} break>
					Education
				</Text>
				<View wrap={false}>
					<Text style={styles.title}>{education.school}</Text>
					<Text>{education.degree}</Text>
					<Text style={styles.metadata}>{education.note}</Text>
				</View>
				<Text style={styles.section} minPresenceAhead={45}>
					Skills
				</Text>
				{profile.skills
					.map(({ label, items }) => ({
						label,
						items: items.filter((item) => resumeSkills.has(item)),
					}))
					.filter(({ items }) => items.length > 0)
					.map(({ label, items }) => (
						<Text key={label} style={styles.skill} wrap={false}>
							<Text style={styles.title}>{label}: </Text>
							{items.join(", ")}
						</Text>
					))}
				<Text style={styles.section} minPresenceAhead={65}>
					Training
				</Text>
				{training
					.filter((item) => item.org !== "EPAM Campus")
					.map((item) => (
						<View key={item.title} style={styles.heading} wrap={false}>
							<Text style={styles.credential}>
								<Text style={styles.title}>{item.org}</Text> — {item.title}
							</Text>
							<Text style={styles.date}>{item.status}</Text>
						</View>
					))}
				<Text style={styles.section} minPresenceAhead={55}>
					Selected certifications
				</Text>
				{certifications
					.filter((certification) => certification.featured)
					.map((certification) => (
						<View key={certification.title} style={styles.heading} wrap={false}>
							<Text style={styles.credential}>
								<Text style={styles.title}>{certification.title}</Text>
								{` — ${certification.issuer}`}
							</Text>
							<Text style={styles.date}>{certification.dateLabel}</Text>
						</View>
					))}
				<Link style={styles.link} src={`${site.url}/certifications`}>
					View all certifications
				</Link>
			</Page>
		</Document>
	);
}
