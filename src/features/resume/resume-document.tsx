import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { beautyCodeWork, education, training } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { projectPages, projects } from "@/features/portfolio/content/projects";
import { gymCrm } from "@/features/portfolio/content/projects/gym-crm";

export const resumeFontFamily = "Source Sans 3";

Font.registerHyphenationCallback((word) => [word]);

const ink = "#111111";
const muted = "#444444";
const resumeProjects = new Set(["zipwit", "velis", "weft"]);
const internship = training.find(({ org }) => org === "EPAM Lab");
const ongoingTraining = training.filter(({ status }) => status === "Ongoing");
const styles = StyleSheet.create({
	page: {
		paddingHorizontal: 44,
		paddingVertical: 40,
		fontFamily: resumeFontFamily,
		fontSize: 10.5,
		lineHeight: 1.27,
		color: ink,
	},
	name: {
		fontWeight: 600,
		fontSize: 33,
		lineHeight: 1.06,
		letterSpacing: -0.7,
		marginBottom: 3,
	},
	role: { fontSize: 11, color: muted, lineHeight: 1.3, marginBottom: 4 },
	contacts: { fontSize: 10, lineHeight: 1.32 },
	link: { color: ink, textDecoration: "none" },
	section: {
		fontWeight: 600,
		fontSize: 10,
		letterSpacing: 0.6,
		textTransform: "uppercase",
		lineHeight: 1.3,
		marginTop: 14,
		marginBottom: 7,
		paddingBottom: 4,
		borderBottomWidth: 0.5,
		borderBottomColor: "#9b9b9b",
	},
	heading: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		gap: 10,
		marginBottom: 3,
	},
	title: { fontWeight: 600, fontSize: 10.5, lineHeight: 1.3 },
	metadata: { color: muted, fontSize: 10 },
	project: { marginBottom: 4 },
	internship: { marginTop: 8 },
	education: { marginBottom: 6 },
	context: { color: muted, marginBottom: 5 },
	bullet: { flexDirection: "row", gap: 7, marginBottom: 3 },
	bulletText: { flex: 1 },
	skill: { fontSize: 10.5, lineHeight: 1.27, marginBottom: 4 },
	skillLabel: { fontWeight: 600 },
	credential: { flex: 1 },
	date: { color: muted, fontSize: 10, width: 104, textAlign: "right" },
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
				<View>
					<Text style={styles.name}>{profile.name}</Text>
					<Text style={styles.role}>Software Developer</Text>
					<Text style={styles.contacts}>
						<Link style={styles.link} src={`mailto:${profile.email}`}>
							{profile.email}
						</Link>
						{"  ·  "}
						<Link style={styles.link} src={site.url}>
							{new URL(site.url).host}
						</Link>
						{"  ·  "}
						<Link style={styles.link} src={profile.github}>
							{new URL(profile.github).host}
							{new URL(profile.github).pathname}
						</Link>
					</Text>
				</View>
				<Text style={styles.section} minPresenceAhead={55}>
					Experience
				</Text>
				<View wrap={false}>
					<View style={styles.heading}>
						<Text style={styles.title}>
							<Link style={styles.link} src="https://beautycode.com.ge">
								Beauty Code
							</Link>
							{` — ${beautyCodeWork.role}`}
						</Text>
						<Text style={styles.metadata}>{beautyCodeWork.dateRange}</Text>
					</View>
					<Text style={styles.context}>{beautyCodeWork.context}</Text>
					<Bullets items={beautyCodeWork.resumeHighlights} />
				</View>
				{internship && (
					<View style={styles.internship} wrap={false}>
						<View style={styles.heading}>
							<Text style={styles.title}>
								{internship.org} — {internship.title}
							</Text>
							<Text style={styles.metadata}>{internship.dateRange ?? internship.status}</Text>
						</View>
						<Text style={styles.context}>
							<Link style={styles.link} src={`${site.url}/portfolio/${gymCrm.slug}`}>
								{gymCrm.title}
							</Link>
							{` · ${gymCrm.tags.join(", ")}`}
						</Text>
						<Bullets items={gymCrm.resumeHighlights ?? []} />
					</View>
				)}
				<Text style={styles.section} minPresenceAhead={55}>
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
				<Text style={styles.section} minPresenceAhead={40}>
					Education and training
				</Text>
				<View style={styles.education} wrap={false}>
					<Text>
						<Text style={styles.title}>{education.school}</Text> — {education.degree}
					</Text>
					<Text style={styles.metadata}>
						<Link style={styles.link} src={`${site.url}/portfolio/bachelor-thesis`}>
							{education.note}
						</Link>
					</Text>
				</View>
				{ongoingTraining.map((item) => (
					<View key={item.title} style={styles.heading} wrap={false}>
						<Text style={styles.credential}>
							<Text style={styles.title}>{item.org}</Text> — {item.title}
						</Text>
						<Text style={styles.date}>{item.dateRange ?? item.status}</Text>
					</View>
				))}
				<Text style={styles.section} minPresenceAhead={28}>
					Skills
				</Text>
				{profile.skills.map(({ label, items }) => (
					<Text key={label} style={styles.skill} wrap={false}>
						<Text style={styles.skillLabel}>
							{label === "AI and automation" ? "AI tools (learning)" : label}
							{": "}
						</Text>
						{items.join(", ")}
					</Text>
				))}
				<Link style={[styles.link, styles.metadata]} src={`${site.url}/certifications`}>
					Certifications at {new URL(site.url).host}/certifications
				</Link>
			</Page>
		</Document>
	);
}
