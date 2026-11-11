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

The [benchmark guide](https://github.com/gchape/weft/blob/main/weft-benchmark/README.md) documents workload semantics and profiling commands. [Recorded results](https://github.com/gchape/weft#recorded-results) include raw measurements and run settings; they compare specific workloads rather than establish the accuracy of automatic protocol selection.`,
};
