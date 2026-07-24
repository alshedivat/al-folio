# al-folio Bootstrap

Use this skill when a user asks an agent to create, configure, or personalize a new al-folio v1.x website.

## Workflow

1. Read `AGENTS.md` and `docs/BOUNDARIES.md` before editing.
2. Keep the starter small: customize `_config.yml`, `_data`, content collections, and site assets first.
3. Leave runtime behavior in plugin repos. Do not copy plugin-owned layouts, includes, Sass, JavaScript, or assets into the starter unless the user intentionally wants a local override.
4. For local visual/content customization, prefer:
   - `_config.yml` feature flags and site metadata
   - `_data/*.yml`
   - `_pages`, `_posts`, `_projects`, `_news`, `_teachings`, `_bibliography`
   - local `_includes`, `_layouts`, and `_sass` overrides only when config/content cannot express the change
5. Run validation before handing work back:

```bash
npm ci
npm run lint:prettier
bundle exec al-folio upgrade audit --no-fail
bundle exec jekyll build --baseurl /al-folio
```

## Routing

- Starter wiring/docs/examples/tests: edit `al-folio`.
- Shared layouts/includes/assets: use `al_folio_core`.
- CV rendering: use `al_folio_cv`.
- Distill runtime: use `al_folio_distill`.
- Search/icons/math/comments/analytics/citations/external posts/newsletter/charts/images: use the owning `al-*` plugin repo.

## Handoff

Summarize changed files, validation results, and any local overrides created.
