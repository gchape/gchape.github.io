# Resume design and content

Reviewed on November 12, 2026.

## Sources

- [Beyond Cracking the Coding Interview, preview supplied by the site owner](https://drive.google.com/file/d/10W-Wl8DMISmLe6z1GnTu09sEyuX9dnm6/view), Chapter 6, printed pages 44–51. Primary guidance: make the strongest relevant work easy to skim; use concise bullets, company context, selective projects, and meaningful evidence. Metrics are optional, not something to invent. One page fits this career stage.
- [r/EngineeringResumes wiki](https://www.reddit.com/r/EngineeringResumes/wiki/index/). Supplemental layout guidance: one column, readable black text, clear section separation, short bullets, and no automatic word hyphenation. Its advice primarily targets US/Canadian applications and is not a universal rulebook.
- [Harvard bullet-point resume template](https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2024/07/resume-bullets.pdf). Supplemental writing guidance: lead with actions and describe work and outcomes concretely.

## Decisions

The PDF uses one A4 page, 10.5-point Helvetica body text, white background, restrained rules, and a compact contact block. Experience leads because the live storefront provides concrete evidence of shipped work. Three projects show systems and backend work; education and grouped skills follow. The technical training section retains completed EPAM training and labels TBC training as Ongoing, as confirmed by the owner. Soft-skills training and Ohooq's future plans remain on the website but are omitted from this focused resume.

Resume bullets are maintained alongside the shared experience and project data. Beauty Code claims come from its existing project write-up: transactional catalog saves, stable URLs, deployment, and recovery. The 22,000 Facebook followers describe the business, not an audience created by the developer. Velis throughput comes from the existing project benchmark write-up; the bullet labels it as localhost and retains payload, runtime, and hardware context. It is not a production-performance claim.

Employment dates and graduation month/year still require the owner's confirmation. The thesis year is not treated as a confirmed graduation date. Do not invent dates, revenue, customer counts, improvements, or proficiency rankings.

## Verification

Generate with `pnpm resume`, inspect every PDF page, and check selectable text with `pdftotext`. `pnpm build` type-checks the scripts and regenerates the PDF. A single-column layout and successful text extraction improve reading order; neither guarantees acceptance by every applicant tracking system.
