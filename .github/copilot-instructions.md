# Copilot Coding Agent Instructions (v1.x)

## Repository Role

`al-folio` is a **thin starter** for the pluginized architecture.

This repo owns starter configuration, docs, sample content, integration tests, and visual parity checks.

## Ownership Boundaries

Follow `docs/BOUNDARIES.md`.

- Starter (`al-folio`) owns:
  - `Gemfile`, `_config.yml`
  - starter content (`_pages`, `_posts`, `_projects`, `_news`, `_data`)
  - docs
  - integration tests (`test/integration_*.sh`)
  - visual tests (`test/visual/*`)
- Plugin repos own:
  - runtime/component logic
  - component correctness/unit tests
  - feature-specific assets

Do not reintroduce plugin-owned runtime assets into starter paths unless intentionally overriding behavior.

## Plugin Naming and Featuring

- Theme-coupled plugins: repo `al-folio-<feature>`, gem/plugin id `al_folio_<feature>`.
- Reusable plugins: repo `al-<feature>` (or neutral), gem/plugin id aligned to namespace.
- Featured plugin metadata lives in `_data/featured_plugins.yml`.
- Featuring and bundling are separate decisions.

## Core Stack

- Jekyll (Ruby)
- Node tooling only (Prettier, Playwright)
- No starter-local Tailwind build pipeline

## High-Signal Paths

- `_config.yml` - starter plugin wiring and feature flags
- `_data/featured_plugins.yml` - plugin catalog metadata
- `test/style_contract.js` - starter contract checks
- `test/integration_*.sh` - cross-plugin integration checks
- `test/visual/` - visual parity checks
- `.github/workflows/` - CI workflows
- `docs/` - user, maintainer, upgrade, and plugin-system documentation
- `.agents/skills/al-folio-bootstrap/SKILL.md` - canonical agent workflow for new site setup
- `.agents/skills/al-folio-v1-migration/SKILL.md` - canonical agent workflow for customized fork migration
- `.codex/skills` and `.claude/skills` - symlinks to `.agents/skills`

## Validated Commands

```bash
npm ci
npm run lint:prettier
npm run lint:style-contract
bundle exec jekyll build --baseurl /al-folio
bash test/integration_comments.sh
bash test/integration_plugin_toggles.sh
bash test/integration_distill.sh
bash test/integration_bootstrap_compat.sh
bash test/integration_upgrade_cli.sh
npx playwright install chromium webkit
npm run test:visual
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit
bundle exec al-folio upgrade report
docker compose up -d
curl -fsS http://127.0.0.1:8080/al-folio/ >/dev/null
docker compose logs --tail=80
docker compose down
```

## CI Expectations

Keep these workflows aligned when changing starter behavior:

- `unit-tests.yml`
- `visual-regression.yml`
- `upgrade-check.yml`
- `deploy.yml`

## Editing Guidance

- Prefer starter wiring/docs/content changes in this repo.
- Route runtime/layout/feature fixes to owning plugin repos.
- Keep all contributor guidance consistent with v1 ownership boundaries.
- When a site keeps local overrides of plugin-owned files, run `bundle exec al-folio upgrade overrides audit` and update `.al-folio-overrides.yml` after reviewing diffs.
