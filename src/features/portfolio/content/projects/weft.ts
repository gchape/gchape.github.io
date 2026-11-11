import type { Project } from "../project";

export const weft: Project = {
	slug: "weft",
	title: "Weft",
	description:
		"A Java 25 transactional memory library with snapshot reads, automatic retries, and an optional agent for choosing write-lock timing.",
	category: "Systems",
	tags: ["Java", "JVM instrumentation", "MVCC"],
	github: "https://github.com/gchape/weft",
	image: "/images/projects/weft-1280.webp",
	imageSrcSet: "/images/projects/weft-640.webp 640w, /images/projects/weft-1280.webp 1280w",
	imageAlt: "Weft woven logo and wordmark: Software transactional memory for Java",
	content: `## Choosing when to take the locks

Weft is a transactional memory library for Java 25. It buffers changes to shared transactional values and commits them together after validation, retrying conflicting attempts automatically.

The library explores when a transaction should check for conflicts optimistically or acquire write locks earlier. Read-heavy and write-heavy workloads can favor different answers. Weft combines both protocols behind \`TVar\` transactional variables and the \`Weft.atomic\`, \`read\`, and \`write\` API.

## From bytecode to a strategy

The core defaults to optimistic execution and runs independently of the agent. An optional Java agent uses the JDK Class-File API to count transactional read and write call sites, resolve counts through nested lambdas, and inject a \`TransactionHints\` argument. These are static code counts; branches and loops can make the executed mix differ.

The selector chooses optimistic execution for at least 80% reads, early write locking for at least 60% writes, and optimistic execution otherwise. That choice is made before the retry loop. Conflicts retry the same selected protocol with adaptive backoff.

The [agent implementation](https://github.com/gchape/weft/tree/main/weft-agent) and [transaction entry point](https://github.com/gchape/weft/blob/main/weft-core/src/main/java/tech/provokedynamic/weft/atomic/Weft.java) show where analysis ends and execution begins.

## Architecture

Optimistic transactions use version histories and buffered writes, then acquire write locks during commit. The pessimistic path attempts locks when writes occur. Both validate recorded reads before applying writes. Read-only transactions return after reading a consistent snapshot, without commit validation. Nested atomic calls share the outer transaction’s buffered changes and retry budget.

Logical clocks track identities and commits, \`ScopedValue\` carries execution state, and [\`CircularVersionHistory\`](https://github.com/gchape/weft/blob/main/weft-core/src/main/java/tech/provokedynamic/weft/mvcc/CircularVersionHistory.java) stores version history behind a \`VersionHistory\` interface. The core, instrumentation agent, and JMH benchmarks are separate modules.

\`\`\`mermaid
flowchart TB
    accTitle: Weft architecture
    accDescr: A Java agent supplies static read and write counts. Those counts select an optimistic or pessimistic strategy once. The transaction runs with that protocol and validates before commit. Conflicts during execution or commit trigger backoff and retry the same selected protocol.
    app("Application transactions") --> agent("Optional Java agent")
    app -->|No hints: optimistic| strategy
    agent --> metrics("Read and write metrics")
    metrics --> strategy{"Select once"}
    strategy -->|Read-heavy or default| optimistic("Optimistic: snapshot reads")
    strategy -->|Write-heavy| pessimistic("Pessimistic: early locks")
    optimistic --> attempt("Run with selected protocol")
    pessimistic --> attempt
    attempt --> commit("Validate and commit")
    commit -->|Committed writes| refs[("TVar and version histories")]
    commit -.-> clock("Logical commit clock")
    commit -->|Conflict| backoff("Adaptive backoff")
    attempt -->|Conflict| backoff
    backoff -->|Retry the same protocol| attempt
\`\`\`

## A small transaction

\`\`\`java
var counter = new TVar<>(0);
Weft.atomic(() -> {
    int current = Weft.read(counter);
    Weft.write(counter, current + 1);
});
\`\`\`

The agent can supply metrics at load time; callers can also provide explicit metrics through the overloaded entry point.

## What the benchmarks compare

The JMH suite compares optimistic transactions, pessimistic write locking, and a lock-based implementation. It covers transfers, concurrent reader/writer groups, configurable access patterns, and instrumentation workloads. Untimed checks verify balances, increments, and agent activation.

### Recorded throughput

The [recorded run](https://github.com/gchape/weft#recorded-results) used Temurin 25.0.5 and JMH 1.37 with four workers, 64 accounts, two accounts per transaction, and uniform access. Each configuration ran three forks, with five 2-second warmup iterations and eight 2-second measurement iterations per fork. The agent and diagnostic counters were disabled.

Results are millions of operations per second; ± gives the JMH 99.9% confidence-interval half-width. Higher is better.

| Workload | Optimistic | Pessimistic | Locked |
| --- | ---: | ---: | ---: |
| Transfer | 8.823 ± 0.339 | 7.476 ± 0.169 | 44.523 ± 0.748 |
| Reader/writer total | 21.220 ± 0.944 | 19.526 ± 1.477 | 60.344 ± 0.991 |
| Reads | 18.521 ± 0.921 | 16.761 ± 1.549 | 47.100 ± 1.034 |
| Writes | 2.699 ± 0.090 | 2.765 ± 0.178 | 13.244 ± 0.793 |

The mixed group uses three readers and one transfer writer. Its total combines different operations. The locked baseline stores primitive balances behind one lock; STM also pays for boxing, tracking, history, and retries. That coarse lock wins this small-transfer workload by about 5× over optimistic STM. Optimistic transfers score about 18% above pessimistic transfers; the mixed-group intervals overlap.

These results compare execution strategies with explicit hints, rather than test automatic selection. Machine details and source revisions were not captured, limiting reproducibility. The [raw JMH JSON](https://github.com/gchape/weft/blob/main/benchmark-results/current.json), [console log](https://github.com/gchape/weft/blob/main/benchmark-results/current.log), and [benchmark guide](https://github.com/gchape/weft/blob/main/weft-benchmark/README.md) provide the measurements, settings, and workload definitions.`,
};
