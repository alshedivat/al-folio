# Agent Guidelines for al-folio (v1.x)

`al-folio` is the **starter repo** for the pluginized v1 architecture.

## Read This First

- Start with `.github/copilot-instructions.md` for architecture, ownership boundaries, and CI expectations.
- Use `docs/BOUNDARIES.md` as the source of truth for starter-vs-plugin ownership.
- Use `.agents/skills/al-folio-bootstrap/SKILL.md` for new-site setup tasks.
- Use `.agents/skills/al-folio-v1-migration/SKILL.md` for customized fork migrations.
- `.codex/skills` and `.claude/skills` are symlinks to `.agents/skills` for agent-specific discovery.

## What This Repo Owns

- Starter wiring (`Gemfile`, `_config.yml`)
- Starter content and documentation
- Cross-plugin integration tests
- Visual regression tests

Runtime/component logic belongs in owning plugin repos (`al_folio_core`, `al_folio_distill`, `al_search`, `al_icons`, `al_cookie`, and other `al-*` gems).
Long-form documentation lives in `docs/`; keep this root file as the short discovery entry point for coding agents.

## Validated Local Command Set

Run from repo root:

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

Docker note: v1 uses `/srv/jekyll/bin/entry_point.sh` and serves from container-local `/tmp/_site` to avoid host bind-mount write deadlocks.

## Agent Routing Rules

- If change is starter wiring/docs/integration/visual testing: edit here.
- If change is runtime feature behavior: route to owning plugin repo.
- Do not add starter-local npm build scripts for theme/runtime assets.
- Keep docs aligned with pluginized v1 ownership.
- If you create or keep local overrides of plugin-owned files, run `bundle exec al-folio upgrade overrides audit` and commit `.al-folio-overrides.yml` after review.
