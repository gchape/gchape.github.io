+++
title = "High-performance pub/sub cache store built on Netty"
date = 2026-02-03
github = "https://github.com/gchape/mudis"
tags = ["Java", "Netty", "NIO", "pub/sub"]
+++

Mudis is built on Netty with a custom client/server protocol leveraging NIO channels, boss/worker groups for separating connection acceptance from message handling.

It features an asynchronous pub/sub architecture with backpressure during high latency, implemented via Java's Flow API SubmissionPublisher.

The project is multi-module and loosely coupled, with a shared module for domain objects — making it extensible and straightforward to build on.

Future goals include a caching layer with eviction strategies (LFU, LRU, MRU) and TTL support. Commands follow the Redis API convention: GET, SET, and more.
