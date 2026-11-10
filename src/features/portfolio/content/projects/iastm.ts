import type { Project } from "../project";

export const iastm: Project = {
	slug: "iastm",
	title: "IASTM",
	description:
		"An experimental Java STM that analyzes transactional bytecode and chooses optimistic execution or early write locking before a transaction begins.",
	category: "Systems",
	tags: ["Java", "JVM instrumentation", "MVCC"],
	github: "https://github.com/gchape/iastm",
	content: `## Choosing when to take the locks

IASTM stands for Instrumented Adaptive Software Transactional Memory. It explores a practical concurrency question: should a transaction do its work optimistically and check for conflicts at commit, or acquire write locks earlier?

Read-heavy and write-heavy workloads can favor different answers. IASTM combines both protocols behind \`TVar\` transactional variables and the \`IASTM.start\`, \`read\`, and \`write\` API.

## From bytecode to a strategy

A Java agent uses the JDK Class-File API to count transactional read and write call sites, resolve counts through nested lambdas, and inject a \`TxMetrics\` argument. These are static code counts; branches and loops can make the executed mix differ.

The selector chooses optimistic execution for at least 80% reads, early write locking for at least 60% writes, and optimistic execution otherwise. That choice is made before the retry loop. Conflicts retry the same selected protocol with adaptive backoff.

The [agent implementation](https://github.com/gchape/iastm/blob/main/iastm-agent/src/main/java/tech/provokedynamic/iastm/agent/IASTMTransformer.java) and [transaction entry point](https://github.com/gchape/iastm/blob/main/iastm-core/src/main/java/tech/provokedynamic/iastm/atomic/IASTM.java) show where analysis ends and execution begins.

## Architecture

Optimistic transactions use version histories and buffered writes, then acquire write locks during commit. The pessimistic path attempts locks when writes occur. Both validate recorded reads before applying writes.

Logical clocks track identities and commits, \`ScopedValue\` carries execution state, and [\`CircularArray\`](https://github.com/gchape/iastm/blob/main/iastm-core/src/main/java/tech/provokedynamic/iastm/mvcc/CircularArray.java) stores version history behind an \`AdaptiveHistory\` interface. The core, instrumentation agent, and JMH benchmarks are separate modules.

\`\`\`mermaid
flowchart TB
    accTitle: IASTM architecture
    accDescr: A Java agent supplies static read and write counts. Those counts select an optimistic or pessimistic strategy once. The transaction runs with that protocol and validates before commit. Conflicts during execution or commit trigger backoff and retry the same selected protocol.
    app("Application transactions") --> agent("Java agent at class load")
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
IASTM.start(() -> {
    int current = IASTM.read(counter);
    IASTM.write(counter, current + 1);
});
\`\`\`

The agent can supply metrics at load time; callers can also provide explicit metrics through the overloaded entry point.

## What the benchmarks compare

The published JMH suite uses 64 shared accounts and compares both protocols with the same transfer workload. At eight threads, the README reports about 5.67 million transfers/s for optimistic execution and 7.40 million for early write locking on a Ryzen 5 7535HS with JDK 25.0.3.

Those are results from the [documented benchmark run](https://github.com/gchape/iastm#benchmarks), with workload-specific error ranges. The benchmark explicitly supplies protocol-selection metrics, so these numbers compare execution protocols rather than establish the accuracy of automatic selection.`,
};
