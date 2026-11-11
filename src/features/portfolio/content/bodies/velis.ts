export default `## A cache you can explore

Velis brings together an in-memory store, channel subscriptions, a TCP server, an asynchronous Python client, and an interactive terminal. You can give a value a lifetime, watch it expire, or send a message to connected subscribers.

The terminal keeps keys, value previews, and recent activity in separate panes. It supports key discovery, local filtering, command completion, read-only sessions, and statistics for the current session. Selecting a key leaves the server untouched until you explicitly read it.

## Keeping work bounded

A single asyncio event loop owns the store and subscription broker. Core operations run synchronously, while connections handle I/O and flow control. Memory mutations happen on one thread.

- **Expiration:** monotonic deadlines keep lifetimes independent of wall-clock changes. Reads discard expired values, and background sweeps reclaim them in bounded batches.
- **Capacity:** key and byte budgets work with interchangeable S3-FIFO, LRU, and LFU eviction policies.
- **Slow consumers:** bounded pending requests and message buffers keep one connection from accumulating unlimited work.

## Architecture

The network layer turns binary frames into typed commands. The engine dispatches them to a core that can be tested without sockets or real-time waits.

\`\`\`mermaid
flowchart TB
    accTitle: Velis architecture
    accDescr: A Python client uses a TCP session to exchange frames with a server connection. The connection dispatches typed commands to the engine, which uses the store and subscription broker. The broker delivers publication pushes through connections.
    client("Python client") --> session("TCP session")
    server("TCP server") -->|creates| connection("asyncio connection")
    session <-->|TCP frames| connection
    session -.-> wire("Wire codecs")
    connection -.-> wire
    subgraph core["Core: no socket dependencies"]
        engine("Command engine") --> store("Store: TTL and eviction")
        engine --> broker("Subscription broker")
    end
    connection --> engine
    broker -->|Publication pushes| connection
\`\`\`

See the [architecture and ownership boundaries](https://github.com/gchape/velis/blob/main/docs/architecture.md).

## Working with the client

After starting the server with \`uv run velis\`, a client can write a value and give it a five-second lifetime:

\`\`\`python
import asyncio

from velis.net.client import Client

async def example():
    async with await Client.connect("127.0.0.1", 9000) as client:
        await client.write("greeting", b"hello")
        await client.lifetime("greeting", 5_000)
        print(await client.read("greeting"))

asyncio.run(example())
\`\`\`

## Running and checking it

The [setup guide](https://github.com/gchape/velis#installation) requires Python 3.15.2 or newer. Run \`uv sync\` in the checkout, start the server with \`uv run velis\`, and open the terminal workspace separately with \`uv run python -m velis.tui\`. The application has no runtime package dependencies.

Tests use unittest and Hypothesis, including generated cache-operation sequences checked against an independent LRU model. Coverage includes eviction policies, expiry, protocol handling, client lifecycle, TCP integration, and terminal behavior. Ruff, ty, and Pyright provide additional static checks; the [development section](https://github.com/gchape/velis#development) lists the commands.

## What batching changes

The repository's November 10, 2026 localhost run used one connection, 64-byte values, and three measured repeats. Median throughput through \`Client.batch()\` changed substantially when the submitted depth increased:

| Operation | Depth 1 | Depth 64 |
| --- | ---: | ---: |
| Write an existing key | 16,085 ops/s | 123,681 ops/s |
| Read an existing key | 17,025 ops/s | 144,491 ops/s |

Those measurements used CPython 3.15.2 on a Ryzen 5 7535HS. They show the effect of amortizing request overhead in that setup; they do not measure production tail latency or subscriber fan-out. The [benchmark section](https://github.com/gchape/velis#benchmarks) includes sample ranges and reproduction commands.

## Tradeoffs

Values and deadlines live in process memory. Pub/sub delivers to connected subscribers at most once. Batches preserve reply order but are not transactions, and cancelling a sent request does not undo its server-side effects. Authentication and TLS are outside the current implementation.`;
