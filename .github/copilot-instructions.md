# Copilot Coding Agent Instructions (v1.x)

**Read [`AGENTS.md`](../AGENTS.md) first — it is the authoritative entry point for all coding agents in this repo.** It carries the change-routing table, the stop sign for gem-owned paths, the three silent failure modes, and the validated command set. This file previously duplicated that content; it is now a pointer so the rules cannot drift apart.

In short: `al-folio` v1.x is a **thin Jekyll starter, not a theme**. It owns starter wiring (`Gemfile`, `_config.yml`), example content, docs, integration tests, and visual parity tests. All runtime — layouts, includes, Sass, Liquid tags, filters, feature JS — lives in versioned gems under [`al-org-dev`](https://github.com/al-org-dev). Route runtime changes to the owning gem.

## Where to look

| Question                             | File                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| Which repo does my change belong in? | [`AGENTS.md`](../AGENTS.md#route-your-change)                                                 |
| Which gem owns this area?            | [`docs/BOUNDARIES.md`](../docs/BOUNDARIES.md)                                                 |
| Which gem owns this Liquid tag?      | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md#wrapper-to-tag-to-gem-delegation)            |
| Why did my feature render nothing?   | [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md#failure-modes-that-produce-no-error-message) |
| What commands should I run?          | [`AGENTS.md`](../AGENTS.md#validated-local-command-set)                                       |
| How do I contribute?                 | [`docs/CONTRIBUTING.md`](../docs/CONTRIBUTING.md)                                             |

## Copilot-specific paths

- `.github/agents/` — custom agents (`customize.agent.md`, `docs.agent.md`).
- `.github/instructions/` — per-file-type instruction files (Liquid, YAML, BibTeX, Markdown, JavaScript).
- `.github/workflows/copilot-setup-steps.yml` — pre-installs Ruby, Python, Node, ImageMagick, and nbconvert for the coding agent.
- `.agents/skills/` — canonical agent skills, also exposed via the `.codex/skills` and `.claude/skills` symlinks.

## CI expectations

Keep these workflows aligned when changing starter behavior: `unit-tests.yml` (style contract plus all six `test/integration_*.sh` scripts), `visual-regression.yml`, `upgrade-check.yml`, `prettier.yml`, and `deploy.yml`.
