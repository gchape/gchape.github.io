export type Project = {
	slug: string;
	title: string;
	description: string;
	category: string;
	tags: string[];
	image?: string;
	imageAlt?: string;
	content: string;
	url?: string;
	github?: string;
};

// Add a live-site URL and/or a GitHub repository to show project links.
export const projects: Project[] = [
	{
		slug: "velis",
		title: "Velis",
		description:
			"An in-memory key-value store with TTL expiration, publish-subscribe messaging, and a binary TCP protocol, built on Python's asyncio.",
		category: "Systems",
		tags: ["Python", "asyncio", "TCP"],
		github: "https://github.com/gchape/velis",
		content: `## Overview

Velis is a lightweight store for byte values, with key expiration and publish-subscribe messaging. A single asyncio event loop owns the store, keeping its in-memory operations independent of locks.

## Design

The network layer depends on a separate core containing the command engine, store, and subscription broker. Typed commands and replies connect those layers, while a fixed binary protocol handles communication over TCP.

- Heap-based expiration tracking with monotonic deadlines and bounded background sweeps.
- Capacity limits and interchangeable LRU, LFU, and S3-FIFO eviction policies.
- An asynchronous client with ordered pipelining and batched commands.
- A terminal interface for browsing keys, running commands, and inspecting session activity.

The README documents the wire protocol, request lifecycle, configuration, and design limitations.`,
	},
	{
		slug: "beautycode",
		title: "Beauty Code",
		description:
			"A Georgian product storefront with a searchable catalog and an admin interface for managing products, categories, and images.",
		category: "Web apps",
		tags: ["React", "TanStack Start", "SQLite", "Tailwind CSS"],
		url: "https://beautycode.com.ge",
		github: "https://github.com/gchape/beautycode",
		content: `## Overview

Beauty Code combines a public product catalog with an administration interface. Customers can browse products and contact the shop through chat, while the catalog owner manages products, categories, images, and availability.

## Application

The app uses React and TanStack Start, with SQLite for catalog data and full-text search. Product updates, gallery references, and audit entries are saved transactionally. Public queries expose published products in active categories.

Product images are stored and delivered through Cloudinary. The administration tools also support database snapshots and recovery.

## Deployment

The repository includes Docker Compose and nginx configuration, Terraform infrastructure for AWS, and S3 database backups. The live storefront is linked above.`,
	},
	{
		slug: "iastm",
		title: "IASTM",
		description:
			"A Java software transactional memory library that uses bytecode instrumentation to choose optimistic or pessimistic concurrency strategies.",
		category: "Systems",
		tags: ["Java", "JVM instrumentation", "MVCC"],
		github: "https://github.com/gchape/iastm#architecture",
		content: `## Overview

IASTM stands for Instrumented Adaptive Software Transactional Memory. A Java agent analyzes transactional code at class-load time and injects read/write metrics. The library uses those metrics to select a concurrency strategy before executing a transaction.

## Architecture

Optimistic transactions read versioned snapshots and buffer writes until commit. Pessimistic transactions acquire write locks earlier. Both paths use transactional variables, read-set validation, and adaptive backoff when an attempt must be retried.

The implementation uses a ring buffer for version history, logical clocks for commits, and ScopedValue for transaction state. Its modules separate the transaction core, instrumentation agent, and JMH benchmarks.

[Read the architecture](https://github.com/gchape/iastm#architecture) for the component diagram and implementation details.`,
	},
	{
		slug: "bachelor-thesis",
		title: "MVCC-Based STM in Clojure",
		description:
			"My bachelor's thesis on software transactional memory in Clojure, combining multiversion concurrency control with commit and rollback hooks.",
		category: "Research",
		tags: ["Clojure", "STM", "MVCC"],
		github: "https://github.com/gchape/bachelor-thesis",
		content: `## Bachelor's thesis

*Design and Evaluation of an MVCC-Based STM in Clojure*, completed at Kutaisi International University in 2026.

## Problem

Transactions can retry after a conflict, repeating side effects such as logging or notifications. This thesis explores coordinating those effects with transaction outcomes through an STM implemented in Clojure, without modifying the Clojure runtime.

## Design

The system combines a variant of the TL2 algorithm with multiversion concurrency control and bounded version histories. Its transactional event system provides \`on-commit\` and \`on-rollback\` hooks for deferring side effects to transaction boundaries.

The thesis develops a formal model and a proof of opacity: even transactions that eventually abort observe a consistent state.

## Evaluation

Benchmarks examine contention, bank transfers, read-heavy and write-heavy workloads, version history sizes, and latency. Read-only transactions avoid the commit lock and scale well, while a global commit lock limits write-heavy throughput. The conclusion discusses lock striping, adaptive history sizing, and additional lifecycle hooks as future work.`,
	},
];
