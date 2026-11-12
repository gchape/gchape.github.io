import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { beautyCodeWork, education, ohooq, training } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { projects } from "@/features/portfolio/content/projects";

const styles = StyleSheet.create({
	page: { padding: 36, fontFamily: "Helvetica", fontSize: 9, lineHeight: 1.35, color: "#202b29" },
	name: { fontSize: 24, fontFamily: "Helvetica-Bold" },
	role: { fontSize: 12, marginBottom: 8 },
	contacts: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
	link: { color: "#246052", textDecoration: "none" },
	section: {
		fontSize: 11,
		fontFamily: "Helvetica-Bold",
		marginTop: 12,
		marginBottom: 6,
		borderBottomWidth: 0.5,
		borderBottomColor: "#b4c7c0",
		paddingBottom: 3,
	},
	item: { marginBottom: 6 },
	title: { fontFamily: "Helvetica-Bold" },
	muted: { color: "#52605c", fontSize: 8 },
});

export function ResumeDocument() {
	return (
		<Document title={`${profile.name} — Resume`} author={profile.name} language="en">
			<Page size="A4" style={styles.page}>
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
						GitHub
					</Link>
					<Link style={styles.link} src={profile.linkedin}>
						LinkedIn
					</Link>
				</View>
				<Text style={styles.section}>Skills & interests</Text>
				<Text>{profile.knowsAbout.join(" · ")}</Text>
				<Text style={styles.section}>Experience & initiatives</Text>
				<View style={styles.item} wrap={false}>
					<Text style={styles.title}>Beauty Code — {beautyCodeWork.role}</Text>
					<Text>{beautyCodeWork.summary}</Text>
				</View>
				<View style={styles.item} wrap={false}>
					<Text style={styles.title}>{ohooq.name} — GitHub organization</Text>
					<Text>{ohooq.summary}</Text>
				</View>
				<Text style={styles.section}>Projects</Text>
				{projects.map((project) => (
					<View key={project.slug} style={styles.item} wrap={false}>
						<Text style={styles.title}>
							<Link style={styles.link} src={`${site.url}/portfolio/${project.slug}`}>
								{project.title}
							</Link>
						</Text>
						<Text>{project.description}</Text>
						<Text style={styles.muted}>{project.tags.join(" · ")}</Text>
					</View>
				))}
				<Text style={styles.section}>Education</Text>
				<View wrap={false}>
					<Text style={styles.title}>
						{education.degree} — {education.school}
					</Text>
					<Text>{education.note}</Text>
				</View>
				<Text style={styles.section}>Training</Text>
				{training.map((item) => (
					<View key={item.title} style={styles.item} wrap={false}>
						<Text style={styles.title}>
							{item.title} — {item.org}
						</Text>
						<Text style={styles.muted}>{item.status}</Text>
					</View>
				))}
			</Page>
		</Document>
	);
}
