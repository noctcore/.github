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
| **@noctcore/harness** | A zero-dependency CLI that enforces a repository's structure lock in its own CI. No account, no server, no Nightcore install: a teammate pulls the repo and `npx @noctcore/harness check` reds the build on any violation. | Shipping soon |
| **SDK** | A typed toolkit for building on top of the studio and its provider seam. | Planned |
| **ESLint plugins** | Shareable, generated lint rules you can drop into your own projects or wire into the harness. | Planned |

### Principles

- **Local-first.** Your code and your data stay on your machine. No hosted anything, no phone-home.
- **Governed autonomy.** Agents move fast inside guardrails you define, not around them.
- **Legible by default.** Every action a tool takes is visible and reviewable, never a black box.
- **Downstream-owned.** What we generate, you own. Edit it, extend it, or throw it away.

### Links

- npm: [npmjs.com/org/noctcore](https://www.npmjs.com/org/noctcore)
- Web: [shirone.dev](https://shirone.dev)
- Contact: [support@shirone.dev](mailto:support@shirone.dev)

<div align="center">
<br/>
<sub>Built with care by noctcore. Ship fast, stay in control.</sub>
</div>
