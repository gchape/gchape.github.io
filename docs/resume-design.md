# Resume design and content

Reviewed on November 18, 2026.

## Sources

- [Beyond Cracking the Coding Interview, preview supplied by the site owner](https://drive.google.com/file/d/10W-Wl8DMISmLe6z1GnTu09sEyuX9dnm6/view), Chapter 6, printed pages 44–51. Primary guidance: make the strongest relevant work easy to skim; use concise bullets, company context, selective projects, and meaningful evidence. Metrics are optional, not something to invent. One page fits this career stage.
- [MIT CAPD 2026 resume guidance](https://capd.mit.edu/blog/2026/06/23/interphase-2026-resume-resources/) recommends a focused one-page resume for early-career applicants, readable type, and room between sections.
- [Harvard College resume guide](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/) recommends specific, factual bullets and the most recent experience first.
- [Interviewing.io’s resume guidance](https://interviewing.io/blog/stop-trying-to-make-recruiters-think-or-why-your-resume-is-bad-and-how-to-fix-it) emphasizes quick scanning and a line of context for employers a recruiter may not recognize.

## Decisions

The PDF uses A4 pages, 10.5-point Source Sans 3 body text, monochrome type, and thin gray section rules. Wider margins and more space between sections improve readability. Experience leads with Beauty Code and the EPAM Lab internship, followed by three independent projects, including Weft for Java concurrency and JVM instrumentation. Education and ongoing training follow the projects. The current content fits on one page without a forced break. Skills come from the website, with current AI study marked as learning. The PDF links to the full certifications page. TBC training is labeled Ongoing, as confirmed by the owner.

Resume bullets are maintained alongside the shared experience and project data. Beauty Code claims come from its existing project write-up: transactional catalog saves, stable URLs, deployment, and recovery. The owner supplied the revenue and social media follower figures as context about the business. Velis throughput comes from the existing project benchmark write-up; the bullet labels it as localhost and retains payload and batch depth. Runtime and hardware details are available on the linked project page. It is not a production-performance claim.

The owner supplied date ranges for Beauty Code, EPAM Lab, and TBC IT Academy. The graduation month and year still require confirmation. The thesis year is not treated as a confirmed graduation date. Do not invent dates, revenue, customer counts, improvements, or proficiency rankings.

The PDF embeds the Regular and Semibold TrueType fonts from [Adobe Source Sans 3, release 3.052R](https://github.com/adobe-fonts/source-sans/releases/tag/3.052R). The font files and SIL Open Font License are stored beside the resume source.

## Verification

Generate with `pnpm resume`, inspect every PDF page, and check selectable text with `pdftotext`. `pnpm build` type-checks the scripts and regenerates the PDF. A single-column layout and successful text extraction improve reading order; neither guarantees acceptance by every applicant tracking system.
