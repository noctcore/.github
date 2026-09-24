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

| Project | What it is | Status | Get it |
| :-- | :-- | :-- | :-- |
| [**Nightcore**](https://github.com/noctcore/nightcore) | A local-first, autonomous Claude dev studio: a Rust and Tauri core over a Bun provider sidecar, with governed agents that plan, build, and verify work under a policy you set. | In active development | [Download the latest release](https://github.com/noctcore/nightcore/releases/latest) (macOS, Windows) |
| [**Nysia**](https://github.com/noctcore/nysia) | A terminal-first agentic development environment (Tauri v2 + Rust). Every tab is an agent or shell session over a headless `nysiad` daemon that owns the terminals and orchestration state, so the UI can close or crash without interrupting a running agent. Tasks come from GitHub Issues and start in branch-keyed worktrees. | In active development (v0.3) | [Build from source](https://github.com/noctcore/nysia) |
| [**Harness**](https://github.com/noctcore/nightcore/tree/main/packages/harness) | A zero-dependency CLI that enforces a repository's structure lock in that repo's own CI. No account, no server, no Nightcore install: a teammate clones the repo and `npx @noctcore/harness check` fails the build on any violation. | Shipped, on npm | `npx @noctcore/harness check` |
| [**ESLint plugins**](https://github.com/noctcore/eslint-plugins) | Eleven focused plugins, a shared utils package, and a catalog of whole-repo lint-meta rules. They catch architecture, contract, data-integrity, and safety problems that generic linters can't see. | Shipped, on npm | [Docs](https://noctcore.github.io/eslint-plugins/) · [Where to start](https://github.com/noctcore/eslint-plugins#where-to-start) |
| **SDK** | A typed toolkit for building on top of the studio and its provider layer. | Planned | |

### Packages

Everything below is published on npm with provenance through npm trusted publishing. Each name links to its source; the docs links go to the rule reference.

| Package | npm | What it does | Docs |
| :-- | :-- | :-- | :-- |
| [`@noctcore/harness`](https://github.com/noctcore/nightcore/tree/main/packages/harness) | [![npm](https://img.shields.io/npm/v/@noctcore/harness?label=)](https://www.npmjs.com/package/@noctcore/harness) | Runs a repo's structure-lock checks (`.nightcore/harness.json`) in its own CI, plus a `lint-meta` subcommand for whole-repo rules from a committed registry. | |
| [`@noctcore/eslint-plugin-code-quality`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-code-quality) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-code-quality?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-code-quality) | Guard clauses, comment and test hygiene, deterministic time, no stray `process.exit`. | [docs](https://noctcore.github.io/eslint-plugins/packages/code-quality/) |
| [`@noctcore/eslint-plugin-async-safety`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-async-safety) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-async-safety?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-async-safety) | Fetch timeouts, `AbortSignal` forwarding, async races and shared mutable state. | [docs](https://noctcore.github.io/eslint-plugins/packages/async-safety/) |
| [`@noctcore/eslint-plugin-contracts`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-contracts) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-contracts?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-contracts) | IO boundaries (checked fetch, parsed boundary data), error cause and taxonomy, zod schema and wire naming, env access, decimal money, translation keys. | [docs](https://noctcore.github.io/eslint-plugins/packages/contracts/) |
| [`@noctcore/eslint-plugin-security`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-security) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-security?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-security) | Shell injection, path traversal, SSRF, open redirect, unsanitized HTML (XSS), timing-unsafe comparison, server actions that bypass their action client. | [docs](https://noctcore.github.io/eslint-plugins/packages/security/) |
| [`@noctcore/eslint-plugin-observability`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-observability) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-observability?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-observability) | Structured logging: context objects over interpolation, no sensitive fields in logs, no lost error detail, declared PII in audit payloads. | [docs](https://noctcore.github.io/eslint-plugins/packages/observability/) |
| [`@noctcore/eslint-plugin-react`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-react) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-react?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-react) | React architecture and correctness (prop drilling, state colocation, memoized context, effect safety, guarded web storage). | [docs](https://noctcore.github.io/eslint-plugins/packages/react/) |
| [`@noctcore/eslint-plugin-rsc`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-rsc) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-rsc?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-rsc) | React Server Components and App Router correctness (navigation errors that must not be swallowed). | [docs](https://noctcore.github.io/eslint-plugins/packages/rsc/) |
| [`@noctcore/eslint-plugin-llm`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-llm) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-llm?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-llm) | LLM output treated as untrusted input before it reaches a sink. | [docs](https://noctcore.github.io/eslint-plugins/packages/llm/) |
| [`@noctcore/eslint-plugin-prisma`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-prisma) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-prisma?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-prisma) | Prisma tenancy, soft-delete and transaction guardrails (tenant-scope escape hatches, raw SQL, request-body writes, single-writer models, audit placement). | [docs](https://noctcore.github.io/eslint-plugins/packages/prisma/) |
| [`@noctcore/eslint-plugin-architecture`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-architecture) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-architecture?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-architecture) | Module and folder shape (folder-per-component, barrels, feature boundaries, import depth, colocated tests). | [docs](https://noctcore.github.io/eslint-plugins/packages/architecture/) |
| [`@noctcore/eslint-plugin-monorepo`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-plugin-monorepo) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-plugin-monorepo?label=)](https://www.npmjs.com/package/@noctcore/eslint-plugin-monorepo) | Workspace package boundaries (barrel-only and exports-map-aware imports); needs your workspace scope. | [docs](https://noctcore.github.io/eslint-plugins/packages/monorepo/) |
| [`@noctcore/lint-meta-rules`](https://github.com/noctcore/eslint-plugins/tree/main/packages/lint-meta-rules) | [![npm](https://img.shields.io/npm/v/@noctcore/lint-meta-rules?label=)](https://www.npmjs.com/package/@noctcore/lint-meta-rules) | Whole-repo rules ESLint can't reach (package naming, declared workspace deps, file-size ratchets), run by `harness lint-meta`. | [docs](https://noctcore.github.io/eslint-plugins/packages/lint-meta-rules/) |
| [`@noctcore/eslint-utils`](https://github.com/noctcore/eslint-plugins/tree/main/packages/eslint-utils) | [![npm](https://img.shields.io/npm/v/@noctcore/eslint-utils?label=)](https://www.npmjs.com/package/@noctcore/eslint-utils) | Shared rule-creator and AST helpers the plugins are built on. | |

#### Harness

Nothing to install; run it straight from any repo's CI:

```sh
npx @noctcore/harness check
npx @noctcore/harness lint-meta   # whole-repo lint-meta rules, opt-in by presence
```

#### ESLint plugins

Flat config only (ESLint 9+), each plugin versioned on its own. Every rule, its options, and the presets are documented at [noctcore.github.io/eslint-plugins](https://noctcore.github.io/eslint-plugins/).

```sh
npm i -D @noctcore/eslint-plugin-code-quality @typescript-eslint/parser   # or bun add -D / pnpm add -D
```

```js
// eslint.config.js (flat config). The presets set no `files` and no parser, so give them both.
import tsParser from '@typescript-eslint/parser';
import codeQuality from '@noctcore/eslint-plugin-code-quality';

export default [
  {
    ...codeQuality.configs.recommended,
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
  },
];
```

New here? Start with `code-quality`, `async-safety` and `contracts`, then add the plugins for your stack. The [Where to start](https://github.com/noctcore/eslint-plugins#where-to-start) guide has a combined config.

### Principles

- **Local-first.** Your code and your data stay on your machine. No hosted anything, no phone-home.
- **Governed autonomy.** Agents move fast inside guardrails you define, not around them.
- **Legible by default.** Every action a tool takes is visible and reviewable, never a black box.
- **Downstream-owned.** What we generate, you own. Edit it, extend it, or throw it away.

### Links

- npm: [npmjs.com/org/noctcore](https://www.npmjs.com/org/noctcore)
- ESLint plugin docs: [noctcore.github.io/eslint-plugins](https://noctcore.github.io/eslint-plugins/)
- Nightcore releases: [github.com/noctcore/nightcore/releases](https://github.com/noctcore/nightcore/releases)
- Web: [shirone.dev](https://shirone.dev)
- Contact: [support@shirone.dev](mailto:support@shirone.dev)

<div align="center">
<br/>
<sub>Built with care by noctcore. Ship fast, stay in control.</sub>
</div>
