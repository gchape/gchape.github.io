# Project content verification — November 12, 2026

Compared portfolio metadata, descriptions, diagrams, examples, and published benchmark figures with fresh shallow clones from GitHub. The web index exposed an older Gym CRM revision, so the check uses fetched repository HEADs instead.

| Repository           | Reviewed revision                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| velis                | [b342055d42ec](https://github.com/gchape/velis/tree/b342055d42ecd66a82fa5dd44adbd356b288294c)                |
| weft                 | [0d6bd653c7b8](https://github.com/gchape/weft/tree/0d6bd653c7b864eb08ddaa08bf270220eb43f8b0)                 |
| gym-crm              | [520349c5275c](https://github.com/gchape/gym-crm/tree/520349c5275cc6f4eb5b2c26541571b60b6f5f63)              |
| beautycode           | [e168441ae1c3](https://github.com/gchape/beautycode/tree/e168441ae1c391d5832dda6edc4357f9412a19f0)           |
| bachelor-thesis      | [d6a214ef4218](https://github.com/gchape/bachelor-thesis/tree/d6a214ef4218d00f179937653c5e264480e334f4)      |
| .emacs.d             | [f55a142e74cf](https://github.com/gchape/.emacs.d/tree/f55a142e74cf758f1942798bbb8252ea8dc393ba)             |
| flashcards-extension | [d9b4d9f8154f](https://github.com/gchape/flashcards-extension/tree/d9b4d9f8154f9e7ae6e85f81c7a469a95ad5aca4) |
| projectile-motion    | [7ce28b9253ed](https://github.com/gchape/projectile-motion/tree/7ce28b9253ed1ef7ffda046d1fd3595a9c6dbbf0)    |

## Evidence and changes

- **Velis:** README installation, client examples, architecture, development checks, and November 10 benchmark table; architecture documentation describes terminal and network tests. Published numbers match. Added Python requirement, startup commands, dependency scope, and verification context.
- **Weft:** README protocol, history, nesting, thread scope, agent, build, and benchmark sections; `Weft.java` confirms selector thresholds and retry budget. Published benchmark numbers match. Added side-effect and mutable-value constraints, bounded retries, history behavior, thread ownership, and build verification guidance.
- **Gym CRM:** README and architecture documentation; `WorkloadEventPublisher.java` confirms after-commit publishing, `KafkaErrorConfig.java` confirms retries and decoded-event dead-letter handling, and `TrainerWorkloadDocument.java` confirms optimistic locking. Added REST-only scope, JDK requirement, standalone reset/publishing behavior, and malformed-event limitation. Internship origin is stated in the repository README.
- **Beauty Code:** README architecture, storefront loading, deployment, recovery, and image-storage sections; image-upload source confirms signature validation. Added documented query reuse, draft preservation, font/chat loading, and measurement limits. Personal role and follower-count statements are profile claims, not independently established by repository code. No fresh production performance or conversion measurements were made.
- **Bachelor's thesis:** `main.tex` confirms institution and year. Methodology and implementation chapters describe the opacity argument and lifecycle hooks. Results chapter matches runtime versions, throughput values, and hook overhead. Clarified research-artifact scope and distinction between an in-process hook and durable external delivery. This review does not independently prove the model or validate the experiments.
- **Other repositories:** Emacs README matches the modular completion/navigation/LSP/CIDER summary. Flashcards manifest and `src/logic/algorithm.ts` establish extension-prototype scope and bucket-based review scheduling; expanded its previously vague description. Projectile-motion README matches Euler integration, gravity, quadratic drag, and target detection.

## Scope

This is a source/documentation consistency review, not a security audit or rerun of the upstream test and benchmark suites. Existing limitations and benchmark caveats remain visible. Content links point to upstream documentation for full operational instructions.
