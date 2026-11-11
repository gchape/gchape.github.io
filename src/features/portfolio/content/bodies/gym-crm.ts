export default `## From training sessions to monthly workload

Gym CRM began during my EPAM Java Lab internship. I later modernized it as a portfolio project, adding a reproducible multi-module build, documented REST APIs, and database and messaging integration tests.

Members and trainers can register, manage profiles, and maintain assignments. Trainers schedule and cancel sessions; participants can retrieve their sessions and search by date, training type, or participant with bounded pagination. Swagger UI provides an interactive entry point to the API.

## Two services, two data models

The CRM API stores accounts, assignments, and sessions in PostgreSQL, with Flyway migrations managing the schema. After a session transaction commits, it publishes a workload event to Kafka. A separate service consumes those events and maintains monthly trainer totals in MongoDB.

Events use the trainer username as their Kafka key to preserve per-trainer partition ordering. Transient processing failures are retried, while exhausted or business-invalid events go to a dead-letter topic for inspection and replay. MongoDB optimistic locking protects concurrent workload updates.

\`\`\`mermaid
flowchart TB
    accTitle: Gym CRM architecture
    accDescr: REST clients access the CRM API, which stores accounts, assignments, and training sessions in PostgreSQL. After a database transaction commits, the API publishes trainer-keyed workload events to Kafka. A separate workload service consumes them and updates monthly trainer totals in MongoDB. Transient processing failures are retried; exhausted or business-invalid events go to a dead-letter topic. An optional Config Server supplies configuration to both services.
    client("REST client / Swagger UI") --> api("Gym CRM API")
    api --> sql[("PostgreSQL: accounts and sessions")]
    api -->|After database commit| kafka("Kafka: trainer workload events")
    kafka --> workload("Workload service")
    workload --> mongo[("MongoDB: monthly trainer totals")]
    workload -->|Exhausted retries or invalid events| dlt("Kafka: dead-letter topic")
    config("Optional Config Server") -.-> api
    config -.-> workload
\`\`\`

The [architecture documentation](https://github.com/gchape/gym-crm/blob/main/docs/architecture.md) explains the service boundaries and design decisions.

## Authentication and API behavior

RSA-signed JWTs authenticate requests, and BCrypt protects stored passwords. The training API checks participant ownership: only the assigned trainer can create or cancel a session, and only its trainer or trainee can retrieve it. Validation failures use structured problem details, while transaction IDs connect HTTP requests to logs and workload events.

## Running and verifying the system

The project provides REST services rather than a browser frontend. It requires JDK 25. The standalone API uses an in-memory H2 database for a quick local demonstration; its data resets on shutdown and workload publishing is disabled. Docker Compose runs the full PostgreSQL, MongoDB, and Kafka stack. The Maven reactor builds the API, workload service, shared contracts, and optional configuration server together.

Tests exercise the HTTP workflow with real JWTs, PostgreSQL migrations and queries, and Kafka-to-MongoDB workload processing. Testcontainers supplies infrastructure for integration tests, and Cucumber covers application workflows.

See the [README](https://github.com/gchape/gym-crm#quick-start-standalone-api) for startup commands and API examples.

## Delivery tradeoffs

Publishing after the database commit leaves a failure window between persistence and messaging. A transactional outbox and idempotent consumers remain follow-up work: redelivery can currently double-count workload events. Dead-letter recovery currently handles decoded events; malformed JSON still needs a deserialization recovery policy. Legacy profile and workload endpoints also need a more complete authorization model, and issued JWTs remain valid until expiry after password changes or account deactivation.

The project models date-based sessions; timeslot conflicts, attendance, memberships, and billing are outside its current scope.`;
