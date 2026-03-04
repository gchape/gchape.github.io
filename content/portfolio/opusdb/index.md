+++
title = "An Experimental Relational Database for Academic Research in Clojure"
date = 2025-12-04
github = "https://github.com/gchape/opusdb"
tags = ["Clojure", "STM", "Concurrency", "Database Internals"]
+++

OpusDB is an academic deep-dive into relational database internals and concurrency mechanisms, implemented in Clojure. The goal is to build a minimal but fully functional database model using a practical mix of functional paradigms and object orientation — leveraging Clojure's strong isolation semantics throughout.

The current implementation covers paging, a file manager, buffer pools, buffer management, and LRU/MRU eviction strategies backed by splay trees and dynamic state binding.

Transaction management is handled by a custom semi-eager STM implementation with eager conflict resolution, based on Tim Harris's paper "Language Support for Lightweight Transactions."

Future goals include indexing support, bitmap indexes, and further query execution primitives.
