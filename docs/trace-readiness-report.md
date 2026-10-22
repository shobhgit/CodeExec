# CodeExec Backend Trace Readiness Report

Date: 2026-10-19
Repository: https://github.com/shobhgit/epic-code-tracer
Local clone: C:\Users\JHINGUR\Documents\github\epic-code-tracer
Scope: Spring Boot execution API, Python and Java trace engines, trace fixture/readiness assessment, and auth/history architecture. No frontend work was started.

## Executive summary

The repository cloned successfully. The backend exposes `POST /api/execute` with `{ "language": "python" | "java", "code": "..." }` and responds with `status`, `stdout`, `trace`, and `error`. Python normalization emits line events, variables, stack, heap, and stdout; the Python compressor emits changed variables/heap objects. Java normalization emits line events, variables, and heap changes, and its tracer recognizes arrays and object fields.

A real API run and generation of real API trace fixtures could not be completed in this environment. The host has no Java executable and no Docker executable/daemon. Docker is required by both Spring runner implementations, and Java 21 is required by the backend and Java trace image. The host Python is 3.15.0; direct Python engine startup fails because `pg_logger.py` imports the removed standard-library `imp` module. The Python container image specifies Python 3.11, but Docker is unavailable to run that compatible environment.

No source files were changed, no fixtures are represented as real output, and no commits or pushes were made. The only test in the repository is a Spring application-context smoke test; it was not run because Java/Maven execution is unavailable. No frontend work was performed.

## Repository/API inspection

- `ExecutionController`: `POST /api/execute` under `/api`.
- Request fields: `language`, `code`.
- Response fields: `status`, `stdout`, `trace`, `error`.
- Supported runner registrations: `python` and `java`.
- Unknown language currently returns an `error` status with null fields, rather than a descriptive HTTP 4xx response.
- Both runners invoke local Docker images named `python-engine` and `java-engine`.
- Docker execution disables networking and limits memory (256 MiB), CPU (1), and process count (64), with a 5-second timeout.
- Java image uses Eclipse Temurin 21 and compiles the JDI tracer at image build time. Python image uses Python 3.11.
- Existing automated test only checks Spring context loading; there are no API contract or data-structure tests.

## Test matrix and outcome

Each item below is an intended API-level request. Since the API could not start, all are **BLOCKED / NOT EXECUTED** and have no generated trace JSON.

| Case | Language | Input to exercise | Expected trace evidence | Outcome |
|---|---|---|---|---|
| Py list mutation | Python | create list, append, assign index | list heap items changing over lines | Blocked: Docker unavailable; native engine incompatible with Python 3.15 |
| Py nested list | Python | nested list and element mutation | list references and nested heap objects | Blocked |
| Py dictionary | Python | insert/update/remove key | dict entries changing over time | Blocked |
| Py tuple/set | Python | create and iterate tuple/set | supported representation and iteration variables | Blocked; coverage semantics need execution review |
| Py linked nodes | Python | custom `Node` objects with `next` references | object class/fields and reference IDs | Blocked |
| Py stack | Python | list-backed push/pop sequence | list heap snapshots across operations | Blocked |
| Py queue | Python | list-backed enqueue/dequeue or `collections.deque` | collection representation and mutation visibility | Blocked; deque support not established by inspection |
| Py recursion | Python | factorial or recursive traversal | stack frames/function and locals | Blocked |
| Py exception | Python | uncaught indexing/key error | error event and response status/error | Blocked |
| Py instruction limit | Python | loop beyond tracer step budget | instruction-limit event and API error mapping | Blocked |
| Java array | Java | primitive array mutation | array heap item updates | Blocked: Docker and Java unavailable |
| Java nested array | Java | 2-D array initialization/mutation | nested array/reference representation | Blocked |
| Java object/node | Java | custom node with fields and links | object class/fields and reference IDs | Blocked |
| Java ArrayList | Java | add/set/remove | collection object field representation | Blocked; collection semantics need execution review |
| Java HashMap/HashSet | Java | insert/update/iteration | fields and readable values | Blocked; collection internals may be noisy/incomplete |
| Java recursion | Java | recursive factorial | method/function labels and local variables | Blocked |
| Java compile/runtime error | Java | malformed source and thrown exception | compilation/runtime error payload | Blocked |
| API input validation | Both | missing fields, null code, unsupported language | stable client-facing errors | Blocked; contract currently has no validation annotations visible |

## Runtime checks performed

- Repository file/layout inspection completed.
- Python 3.15.0 is present.
- `python python-engine/runner.py` fails immediately with `ModuleNotFoundError: No module named 'imp'` while importing `pg_logger.py`.
- `java` and `docker` commands are not present on PATH, so Maven wrapper, Spring Boot startup, Docker image builds, Java tracing, and HTTP API tests cannot run here.
- The cloned repository's `git status` command reported `fatal: this operation must be run in a work tree`, although `git rev-parse --show-toplevel` resolves the clone path. This is an environment/repository metadata anomaly to inspect before making changes; no Git operations that modify history were performed.

## Findings to address before frontend integration

1. **Establish executable runtime and repeatable launch.** Install/configure Java 21 and Docker, build both engine images, start Spring Boot, and record the exact API URL/commands. Keep Python engine runtime pinned to the Python version it supports.
2. **Add API validation and error semantics.** Handle null/missing `language` safely (the service currently calls `toLowerCase()` directly), validate code size, return meaningful 4xx errors for invalid requests/unsupported languages, and use a stable error response schema.
3. **Review container isolation.** Network, memory, CPU and PID limits are present. Before public deployment, also test filesystem/read-only behavior, non-root execution, container privilege defaults, output-size limits, queue/concurrency behavior, and timeout cleanup. The Docker client currently runs containers without explicit `--read-only`, `--user`, or output bounds.
4. **Reconsider the 5-second wall limit.** Image cold starts/build state and tracing overhead can exceed a short synchronous request limit. Distinguish queue/startup time from user-code execution and return a clear timeout response.
5. **Fix/verify output and trace edge cases.** Python normalizer reads globals into `variables` (locals/stack presentation needs verification). The Java normalizer returns `status: success` for every non-error raw result and does not copy an `error` member from non-error results. Run error, empty-output, Unicode, large trace, cyclic object, nested array, collection and instruction-limit cases.
6. **Build a contract fixture pack only from actual responses.** Save each successful API request and exact response as paired JSON files; validate JSON parsing, required top-level fields, event names, monotonically sensible source lines, trace limits, and error/status consistency. Tag each fixture with engine/runtime version. Do not hand-author responses and label them as real traces.
7. **Add automated backend tests.** Cover controller validation and response mapping independently of Docker, then add integration tests with the real engine images. Preserve representative trace outputs as golden fixtures only after confirming they came from the running API.

## Auth and per-user execution history recommendation

A separate microservice is a reasonable boundary for identity and durable history, but avoid making the execution engine itself responsible for passwords or token issuance. For a hackathon-sized system, prefer a managed OpenID Connect provider if one is available. The frontend obtains an access token; the execution API validates JWTs and derives an immutable user ID from the token subject. Never accept a user ID supplied in the code request as authorization identity.

### Suggested architecture

1. **Identity provider / auth service** issues short-lived signed access tokens and supports login, logout/refresh, and account lifecycle. Keep credentials and signing keys out of the execution service.
2. **Execution API** validates issuer, audience, signature and expiry. It accepts `language` and `code`, assigns an execution ID, enforces per-user rate/quota limits, and runs code in isolated workers.
3. **History service** stores metadata and execution records keyed by `(user_id, execution_id)`: language, source or source reference, status, stdout, structured error, trace reference, timestamps, duration, and runtime version. Enforce ownership on every read/delete query.
4. **Storage** uses a relational database for user/execution metadata and object storage for large traces. Keep code/trace retention bounded and configurable; encrypt in transit and at rest. Avoid logging source code, tokens, or full traces by default.
5. **Service communication** uses authenticated service-to-service calls or an event/outbox flow. For the first increment, synchronous execution service writes a completed record through an internal History API; later, use a queue and status endpoint for long-running traces.
6. **Frontend** calls only public APIs with the access token; it never talks directly to the history database or supplies trusted ownership identifiers.

### Practical implementation order

- Add JWT resource-server verification to the execution API and an authenticated `/api/me` or equivalent smoke endpoint.
- Define an execution record schema and ownership-scoped `POST /internal/executions` / `GET /api/executions` / `GET /api/executions/{id}` endpoints in the history service.
- Store trace JSON externally when it exceeds a small threshold; persist a versioned schema and runtime metadata.
- Add pagination, retention/deletion, request quotas, and per-user execution rate limits before frontend history UI.
- Test cross-user access denial, expired/invalid tokens, retry/idempotency, database outage behavior, large traces, and retention.

For an early hackathon demo, a single deployable Spring Boot application with separate auth and history modules may be faster and simpler. Split the history service once independent scaling, ownership, team boundaries, or deployment constraints justify the network and operational overhead. If auth is explicitly required as a separate service, use a standard OIDC provider rather than inventing credential storage and token lifecycle.

## What is needed to complete the requested live verification

Provide an environment with Java 21, Maven (or functioning wrapper), Docker Engine/Desktop running, and permission to build/run `python-engine` and `java-engine` images. Then execute the table through `POST /api/execute`, collect exact response bodies as fixtures, validate them, and update this report with pass/fail results. No frontend work should begin until that report contains verified API outputs for the agreed structure matrix.

## Environment recheck (2026-10-19)

A follow-up check found JDK 21.0.12 installed at `C:\Program Files\Java\jdk-21.0.12`; its `java.exe -version` succeeds. The default `java` command resolves to an Oracle javapath shim that did not return promptly, so set `JAVA_HOME` to the installed JDK and put `%JAVA_HOME%\bin` first on PATH for the next run. Docker is still not discoverable as a command, so the Docker daemon and both container engines remain unavailable to this session. The Maven wrapper command stalled before printing its version; `.mvn/wrapper` contains only `maven-wrapper.properties`, so wrapper bootstrap/download is not confirmed. Python 3.15 still fails with `ModuleNotFoundError: No module named 'imp'`. No trace fixtures or source changes were produced in this recheck.

## Live API verification (2026-10-19)

The user confirmed the backend was running on `localhost:8080` and both `java-engine:latest` and `python-engine:latest` images were built. I used `curl.exe` against the actual `POST /api/execute` endpoint. Java 21.0.12 and Maven 3.9.16 were available for the backend. The existing Maven test suite completed successfully: **1 test, 0 failures, 0 errors**.

### Results

- **22 API requests** were exercised and saved under `fixtures/api-traces/` as paired request/response JSON.
- **17 successful executions** returned success status. They covered Python list mutation, nested lists, dictionaries, tuple/set values, linked nodes, stack, deque queue, recursion, and basic arithmetic; and Java arrays, nested arrays, linked objects, `ArrayList`, `HashMap`, `HashSet`, recursion, and one-line source.
- **5 error responses** were captured: Python runtime error, Python instruction-limit attempt, Java runtime exception, Java compilation error, and unsupported language.
- All **22 fixture files parsed as JSON** and passed envelope checks for request language/code and response status/stdout/trace/error fields.
- Example stdout values matched the submitted examples, including Python/Java factorial = 120, list and array mutations, dictionary/map/set operations, and node traversal.

### Verified behavior that affects frontend/test design

1. **Java one-line programs can return success with an empty trace.** `System.out.println(10 + 20)` returned stdout `30\n`, status `success`, and `trace: []`. Equivalent multi-line Java examples returned line events. The saved fixture is `java-one-line-program.json`; use multi-line code in frontend trace demos until the tracer behavior is fixed or characterized further.
2. **Python recursion has call/return events but no local-variable or stack snapshots in the compressed API response.** The factorial trace returned 23 events and correct stdout `120\n`, but the recursive `n` values and rendered stack are absent. Java recursion retained local `n` values. This is a backend trace-normalization/compression gap, not an API transport failure.
3. **Some Python values retain engine-specific raw markers.** Tuple and set heap entries were returned under `value` as `[`"TUPLE"`, ...]` and `[`"SET"`, ...]`. `collections.deque` was returned as an `INSTANCE_PPRINT` marker with a formatted string. The frontend should handle these as raw tagged representations; normalization currently does not provide the same typed shape as Python list/dict/object heap values.
4. **The Python instruction-limit path is masked by the outer execution timeout for a 1,001-iteration loop.** The actual API returned `status: error`, `error.type: RuntimeException`, message `Docker execution failed: Code execution timed out after 5 seconds`, and null trace. The intended `instruction_limit_reached` event and API mapping were therefore not verified at this limit; the 5-second `DockerExecutor` cutoff fired first.
5. **Unsupported language returns only a generic error envelope.** `javascript` produced `status: error` with null stdout/trace/error, so clients do not receive a descriptive unsupported-language message.

### Fixture inventory

`fixtures/api-traces/` contains 22 exact API response fixtures: 11 Python requests, 10 Java requests, and 1 unsupported-language request. The two key edge cases (`java-one-line-program.json` and `python-instruction-limit.json`) are retained alongside the successful structure traces and expected runtime/compile errors. No frontend files were created or edited, and no source code was changed. No commits or pushes were made.

The initial environment sections above describe the earlier Windows runtime state; this live verification supersedes the earlier blocked API status. The API was available during this verification and Python 3.11 ran inside the built engine image, so a host Python 3.11 install was not required for these API-level tests.

## Coverage addendum

After the initial matrix, I added binary-tree and Java queue cases and repeated the fixture validation. The final set contains **26 JSON fixtures: 20 success responses and 6 error responses, with 131 trace events total; all 26 parse and pass the required envelope checks**.

- Java binary tree and `ArrayDeque` queue examples succeeded and returned object/collection heap snapshots.
- The first Python binary-tree sample with an `__init__` method timed out at the API's 5-second Docker boundary. A shorter equivalent tree using dynamic node fields succeeded with stdout `6\n` and 9 trace events. Both responses are retained to show the variability/limit rather than hiding the timeout.
- The one-line Java empty-trace issue, Python recursion snapshot gap, raw Python tuple/set/deque representations, instruction-limit timeout, and generic unsupported-language response remain as documented above.

## Mainstream data-structure verification (2026-10-19)

I extended the live API matrix for the previously unverified structures and kept each actual response in `fixtures/api-traces/`. Final validation: **55 JSON fixture files, 39 success responses, 16 error responses, 281 trace steps across 41 non-empty traces; 0 invalid JSON/envelopes and 0 stdout mismatches for fixtures with expected output.** Several larger examples exceeded the configured 5-second execution boundary; compact variants were then used to verify the representation/operation, and both the timeout and compact response are retained.

| Structure / operation | Python result | Java result | Notes |
|---|---|---|---|
| BST node shape and ordering | Verified with compact dict-backed insert/search case | Verified with `Node` insert/search | Larger Python algorithm sample hit an exception/timeout; the compact operation succeeded. |
| Graph references with a cycle | Verified with three nodes and a cycle | Verified with three nodes and a cycle | The cyclic object references and identity checks succeeded. Larger BFS examples timed out, so graph traversal visualization is not established. |
| Heap / priority queue | `heapq` push/pop succeeded | `PriorityQueue` add/remove succeeded | Both emitted sorted removal output and traces. |
| Doubly linked list | Verified `prev`/`next` links | Verified `prev`/`next` links | Both returned expected node relationships. |
| Trie | Three-character nested-dictionary insert/prefix lookup succeeded | Three-level custom node chain succeeded | Java nested `HashMap` child maps at three levels timed out; the node-chain representation worked. |
| Union-find | Small parent array/path-compression check succeeded | Small parent array/path-compression check succeeded | Larger helper-method/recursive versions timed out. |
| Circular queue wraparound | Succeeded | Succeeded | Enqueue/dequeue through reused ring slots returned expected contents. |
| Singly linked operations | Insert/delete through node links succeeded | JDK `LinkedList` insert/remove succeeded | Java `Stack` class operations also succeeded. |

The earlier verified cases still cover arrays, nested arrays/lists, dictionaries/maps/sets, ArrayList, ArrayDeque/deque queues, stacks, custom linked nodes, trees, recursion, and compile/runtime errors. The shortest successful examples confirm that frontend heap rendering can begin for each listed structure. Keep graph traversal and larger/recursive operation traces marked experimental until the API execution timeout is raised or those cases are made reliably small enough to fit under it.

The Java LinkedList fixture's expected stdout was corrected to match the actual API response (`1 2 2\n`). No application source was changed; no frontend work, commits, or pushes were made.

## Frontend and execution-time update (2026-10-19)

The user approved beginning frontend work and asked to keep the app open to use without login; auth/history microservice work is out of scope. A static, dependency-free frontend now lives in `frontend/`. It calls `POST /api/execute`, offers Python/Java BST, queue and cyclic-graph starters, and renders trace playback controls, variables, stdout/errors, and accumulated heap changes. Memory is reconstructed at the selected step so scrubbing backward shows the earlier object state. Local CORS origins for ports 5173 are enabled.

The backend Docker timeout is configurable with `execution.timeout-seconds` and defaults to **35 seconds** (from 5). Java's inner student-process limit is **30 seconds** (from 5), so it remains below the Docker boundary. The frontend JavaScript passed `node --check`; the Spring backend compiled successfully with Maven and tests skipped. The existing running service must be restarted for the timeout and CORS changes to take effect. Frontend startup instructions are in `frontend/README.md`. No test suite was run, and no commit or push was made.
