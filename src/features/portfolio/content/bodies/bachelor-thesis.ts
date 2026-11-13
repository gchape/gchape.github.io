export default `## Bachelor's thesis

*Design and Evaluation of an MVCC-Based STM in Clojure*, completed at **Kutaisi International University** in 2026.

## The problem with retrying a side effect

Imagine a bank-transfer transaction that also sends a notification. If a conflict makes the transaction retry, code inside its body can run again, including that notification. Updating shared state atomically does not by itself coordinate the external effect.

The thesis develops a Clojure STM with **transaction lifecycle hooks**. An application can register work for a successful commit or an aborted attempt, placing the effect at the corresponding boundary.

## A model and an implementation

The implementation combines a variant of Transactional Locking II with multiversion concurrency control. Each reference keeps bounded version history, so a reader can look up a value at its transaction's snapshot. Writers claim ownership as they write, then validate and publish under a global commit lock.

The [formal-model chapter](https://github.com/gchape/bachelor-thesis/blob/main/chapters/methodology.tex) defines the transaction states and presents an opacity proof. Opacity requires consistent observations *even for transactions that eventually abort*; checking only successful commits would leave that case uncovered.

## Transaction lifecycle

Read-only transactions bypass the global commit lock. Write transactions validate their read set and publish versioned writes while holding it. \`on-commit\` handlers run after success; \`on-rollback\` handlers run for an aborted attempt before retrying.

\`\`\`mermaid
flowchart TB
    accTitle: Clojure STM transaction lifecycle
    accDescr: A dosync transaction reads versioned snapshots and buffers writes. Read-only transactions commit without the global lock. Writers acquire the commit lock, validate reads, and publish writes with a new version. Successful commits run on-commit handlers; aborted attempts run on-rollback handlers before backing off and retrying.
    body("dosync transaction body") --> reads("Snapshot reads and buffered writes")
    history[("Bounded version histories")] --> reads
    reads --> kind{"Any writes?"}
    kind -->|No| committed("Mark committed")
    kind -->|Yes| lock("Global commit lock")
    lock --> validate("Validate reads and publish writes")
    validate -->|Success| committed
    validate -->|New versions| history
    committed --> hooks("on-commit handlers")
    reads -->|Conflict| rollback("on-rollback handlers")
    validate -->|Conflict| rollback
    rollback --> backoff("Backoff and retry")
    backoff --> body
\`\`\`

The [implementation chapter](https://github.com/gchape/bachelor-thesis/blob/main/chapters/implementation.tex) follows the reference layout, ownership protocol, retry loop, and hook dispatch.

## Reading the research

The repository contains the LaTeX thesis, formal argument, implementation listings, and recorded evaluation. It is a research artifact, rather than a packaged application with a quick-start API. The opacity argument concerns the model presented in the thesis; it should not be read as independent verification of every implementation detail.

Lifecycle hooks coordinate effects with transaction outcomes inside the process. They do not, by themselves, provide durable delivery of notifications or other external effects across a process crash.

## What the experiments found

The experiments ran with Clojure 1.12.4 and OpenJDK 25.0.2 on a six-core Ryzen 5 7535HS. The contrasting read/write workloads make the design's main tradeoff visible:

| Workload | 4 threads | 12 threads |
| --- | ---: | ---: |
| Read-heavy: 10% writes | 533,885 transactions/s | 1,969,463 transactions/s |
| Write-heavy: 90% writes | 637,709 transactions/s | 257,574 transactions/s |

The read-heavy workload benefits from transactions bypassing the commit lock. Profiling attributes the write-heavy bottleneck to that shared lock. In a separate single-threaded transfer benchmark, adding one commit hook changed mean execution time from 1.59 μs to 1.81 μs, about 14% overhead.

These are the thesis's [recorded experiments](https://github.com/gchape/bachelor-thesis/blob/main/chapters/results.tex), rather than general throughput guarantees. The [conclusion](https://github.com/gchape/bachelor-thesis/blob/main/chapters/conclusion.tex) proposes lock striping, adaptive version-history sizing, and more lifecycle hooks as follow-up work.`;
