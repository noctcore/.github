<div align="center">

<img src="./assets/banner.png" alt="noctcore" width="100%">

<br/>

**Guardrails and tooling for AI-assisted software development.**

Local-first tools that let teams move fast with autonomous coding agents while keeping structure, review, and safety in human hands.

<br/>

[![npm](https://img.shields.io/badge/npm-%40noctcore-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/org/noctcore)
[![license](https://img.shields.io/badge/license-MIT-4dd0e1)](https://opensource.org/licenses/MIT)
[![built with](https://img.shields.io/badge/built%20with-Rust%20%2B%20TypeScript-8b7cff)](https://github.com/noctcore)

</div>

---

### What we build

noctcore is home to a small family of developer tools built around one idea: autonomy is only useful when it is governed. Agents can write most of the code, but structure, review gates, and safety stay under your control. Everything we ship runs on your machine, keeps your data local, and stays legible so you always know what a tool did and why.

### Projects

| Project | What it is | Status |
| :-- | :-- | :-- |
| **Nightcore** | A local-first, autonomous Claude dev studio: a Rust and Tauri core over a Bun provider sidecar, with governed agents that plan, build, and verify work under a policy you set. | In active development |
| **Nysia** | A terminal-first agentic development environment (Tauri v2 + Rust). Every tab is an agent or shell session, over a headless `nysiad` daemon that owns the PTYs and orchestration state, so the UI can close or crash without interrupting a running agent. Tasks come from GitHub Issues and start in branch-keyed worktrees. | In active development (v0.3) |
| **@noctcore/harness** | A zero-dependency CLI that enforces a repository's structure lock in its own CI. No account, no server, no Nightcore install: a teammate pulls the repo and `npx @noctcore/harness check` reds the build on any violation. | Shipped, on npm |
| **SDK** | A typed toolkit for building on top of the studio and its provider seam. | Planned |
| **ESLint plugins** | Nine focused plugins (`@noctcore/eslint-plugin-*`), a shared utils package, and a catalog of portable lint-meta rules, encoding architecture, contract, data-integrity, and safety conventions you can drop into any project. | Shipped, on npm |

### Packages

Everything below is published, versioned, and live on npm today — each package name links to its source.

| Package | What it does |
| :-- | :-- |
| [`@noctcore/harness`](https://github.com/noctcore/nightcore/tree/main/packages/harness) | Zero-dependency CLI that runs a repo's `.nightcore/harness.json` structure-lock checks in its own CI — no account, no server, no Nightcore install. Also ships a `lint-meta` subcommand for running portable meta-lint rules from a committed registry. |
| [`@noctcore/eslint-plugin-react`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-react) | React architecture + correctness rules — prop-drilling, state colocation, memoized context, effect safety. |
| [`@noctcore/eslint-plugin-architecture`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-architecture) | Folder-per-component and feature-boundary architecture rules. |
| [`@noctcore/eslint-plugin-monorepo`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-monorepo) | Workspace / monorepo package-boundary hygiene. |
| [`@noctcore/eslint-plugin-contracts`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-contracts) | Shared contract, config, and error-handling conventions — zod schema naming, wire discriminants, no-direct-process-env, decimal money. |
| [`@noctcore/eslint-plugin-code-quality`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-code-quality) | Guard clauses, comment/test hygiene, deterministic time. |
| [`@noctcore/eslint-plugin-async-safety`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-async-safety) | Fetch timeouts, `AbortSignal` forwarding, and shared-state / concurrency races. |
| [`@noctcore/eslint-plugin-observability`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-observability) | Structured-logging discipline — context objects over interpolated messages, no sensitive fields in logs, no error-detail loss. |
| [`@noctcore/eslint-plugin-security`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-security) | Injection / path-traversal / SSRF / open-redirect precision — no shell interpolation, fixed-origin fetch and redirect targets, opt-in path containment. |
| [`@noctcore/eslint-plugin-prisma`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-prisma) | Prisma tenancy, data-integrity, and transaction guardrails — unscoped-client and raw-SQL fences, tenant and soft-delete filters, single-writer models, multi-write transactions, audit placement. |
| [`@noctcore/lint-meta-rules`](https://github.com/noctcore/eslint-plugins/tree/main/packages/lint-meta-rules) | Portable, parameterized whole-repo / cross-file invariants ESLint can't reach (package naming, declared workspace deps, file-size ratchets), run by `harness lint-meta`. |
| [`@noctcore/eslint-utils`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-utils) | Shared rule-creator and AST helpers the plugins above are built on. |

The harness needs nothing installed — run it straight from any repo's CI:

```sh
npx @noctcore/harness check
npx @noctcore/harness lint-meta   # portable meta-lint rules, opt-in by presence
```

The ESLint plugins are flat-config only (ESLint 9+), independently versioned, and published with npm provenance from [noctcore/eslint-plugins](https://github.com/noctcore/eslint-plugins). Every rule, its options, and the recommended configs are documented at [noctcore.github.io/eslint-plugins](https://noctcore.github.io/eslint-plugins/):

```sh
bun add -D @noctcore/eslint-plugin-react   # or npm i -D / pnpm add -D
```

```js
// eslint.config.js (flat config)
import react from '@noctcore/eslint-plugin-react';

export default [react.configs.recommended];
```

### Principles

- **Local-first.** Your code and your data stay on your machine. No hosted anything, no phone-home.
- **Governed autonomy.** Agents move fast inside guardrails you define, not around them.
- **Legible by default.** Every action a tool takes is visible and reviewable, never a black box.
- **Downstream-owned.** What we generate, you own. Edit it, extend it, or throw it away.

### Links

- npm: [npmjs.com/org/noctcore](https://www.npmjs.com/org/noctcore)
- ESLint plugin docs: [noctcore.github.io/eslint-plugins](https://noctcore.github.io/eslint-plugins/)
- Web: [shirone.dev](https://shirone.dev)
- Contact: [support@shirone.dev](mailto:support@shirone.dev)

<div align="center">
<br/>
<sub>Built with care by noctcore. Ship fast, stay in control.</sub>
</div>
