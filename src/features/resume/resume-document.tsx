import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { beautyCodeWork, education, training } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { projects } from "@/features/portfolio/content/projects";

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
	page: {
		paddingHorizontal: 38,
		paddingVertical: 32,
		fontFamily: "Helvetica",
		fontSize: 10.5,
		lineHeight: 1.24,
		color: "#151515",
	},
	header: { marginBottom: 3 },
	name: { fontFamily: "Helvetica-Bold", fontSize: 26, lineHeight: 1.15, marginBottom: 4 },
	role: { fontSize: 11, lineHeight: 1.3, marginBottom: 8 },
	contacts: {
		flexDirection: "row",
		flexWrap: "wrap",
		columnGap: 12,
		rowGap: 4,
		fontSize: 10.5,
		lineHeight: 1.3,
	},
	link: { color: "#151515", textDecoration: "none" },
	section: {
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		lineHeight: 1.3,
		marginTop: 12,
		marginBottom: 7,
		paddingBottom: 3,
		borderBottomWidth: 0.5,
		borderBottomColor: "#b9b9b9",
	},
	heading: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		gap: 10,
		marginBottom: 3,
	},
	title: { fontFamily: "Helvetica-Bold", fontSize: 10.5, lineHeight: 1.3 },
	project: { marginBottom: 6 },
	context: { marginBottom: 5 },
	bullet: { flexDirection: "row", gap: 7, marginBottom: 3 },
	bulletText: { flex: 1 },
	training: { marginBottom: 5 },
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
					.filter((project) => project.resumeHighlights)
					.slice(0, 3)
					.map((project) => (
						<View key={project.slug} style={styles.project} wrap={false}>
							<View style={styles.heading}>
								<Text style={styles.title}>
									<Link style={styles.link} src={`${site.url}/portfolio/${project.slug}`}>
										{project.title}
									</Link>
								</Text>
								<Text>{project.tags.join(", ")}</Text>
							</View>
							<Bullets items={project.resumeHighlights ?? []} />
						</View>
					))}
				<Text style={styles.section} minPresenceAhead={50}>
					Education
				</Text>
				<View wrap={false}>
					<Text style={styles.title}>{education.school}</Text>
					<Text>{education.degree}</Text>
					<Text>{education.note}</Text>
				</View>
				<Text style={styles.section} minPresenceAhead={45}>
					Skills
				</Text>
				{profile.skills.map((group) => (
					<Text key={group.label}>
						<Text style={styles.title}>{group.label}: </Text>
						{group.items.join(", ")}
					</Text>
				))}
				<Text style={styles.section} minPresenceAhead={65}>
					Training
				</Text>
				{training
					.filter((item) => item.org !== "EPAM Campus")
					.map((item) => (
						<View key={item.title} style={styles.training} wrap={false}>
							<Text>
								<Text style={styles.title}>{item.org}</Text> — {item.title}
							</Text>
							<Text>{item.status}</Text>
						</View>
					))}
			</Page>
		</Document>
	);
}
