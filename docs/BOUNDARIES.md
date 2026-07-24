# Ownership Boundaries (v1.x)

`al-folio` is a starter kit. Runtime/component ownership lives in gems.

## Runtime ownership

- `al-folio` (starter): example content, wiring, docs, integration harness.
- `al_folio_core`: shared layouts/includes/runtime primitives and upgrade contracts.
- `al_folio_distill`: Distill templates/runtime assets.
- `al_cookie`: cookie consent runtime assets and consent logic.
- `al_icons`: icon runtime loading (Font Awesome, Academicons, Scholar Icons).
- `al_search`: search runtime payload (`ninja-keys`, search setup/hotkey assets).
- Other `al-*` gems: feature-specific assets, tags, filters, and runtime behavior.

## Bundled v1 plugin routing

Use this table before opening or reviewing a PR:

| Area                                                                                                                  | Owning repo/gem                                                      |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Base layouts, shared includes, publication card layout, repository cards, style/runtime primitives, upgrade contracts | `al-org-dev/al-folio-core` / `al_folio_core`                         |
| CV data rendering and CV layouts                                                                                      | `al-org-dev/al-folio-cv` / `al_folio_cv`                             |
| Distill layouts, tags, and Distill runtime assets                                                                     | `al-org-dev/al-folio-distill` / `al_folio_distill`                   |
| Bootstrap compatibility CSS/JS during the v1 transition window                                                        | `al-org-dev/al-folio-bootstrap-compat` / `al_folio_bootstrap_compat` |
| Upgrade audit/report/codemods                                                                                         | `al-org-dev/al-folio-upgrade` / `al_folio_upgrade`                   |
| Icons and icon-library loading                                                                                        | `al-org-dev/al-icons` / `al_icons`                                   |
| Search UI/runtime                                                                                                     | `al-org-dev/al-search` / `al_search`                                 |
| Publication/citation helper logic                                                                                     | `al-org-dev/al-citations` / `al_citations`                           |
| External post ingestion                                                                                               | `al-org-dev/al-ext-posts` / `al_ext_posts`                           |
| Analytics providers                                                                                                   | `al-org-dev/al-analytics` / `al_analytics`                           |
| Comments providers                                                                                                    | `al-org-dev/al-comments` / `al_comments`                             |
| Cookie consent UI/runtime                                                                                             | `al-org-dev/al-cookie` / `al_cookie`                                 |
| Image/lightbox helpers                                                                                                | `al-org-dev/al-img-tools` / `al_img_tools`                           |
| Math/TikZ runtime integration                                                                                         | `al-org-dev/al-math` / `al_math`                                     |
| Chart runtime integration                                                                                             | `al-org-dev/al-charts` / `al_charts`                                 |
| Newsletter form integration                                                                                           | `al-org-dev/al-newsletter` / `al_newsletter`                         |

Local site overrides are still valid. A starter site may define `_layouts/<name>.liquid`, `_includes/<path>.liquid`, `_sass/*.scss`, or site-specific plugins when the customization is only for that site. Shared runtime fixes should be ported to the owning plugin instead.

When a site keeps local overrides of plugin-owned files, run `bundle exec al-folio upgrade overrides audit`. Commit `.al-folio-overrides.yml` after review so future plugin gem updates can flag upstream changes to shadowed files.

Plugin releases are versioned and published independently on RubyGems. A plugin patch release does not require a new starter release unless the starter wiring, dependency pins, lockfile/image metadata, docs, or test fixtures need to change.

## Plugin naming convention

- Theme-coupled plugins:
  - GitHub repo: `al-folio-<feature>`
  - gem/plugin id: `al_folio_<feature>`
- Reusable plugins:
  - GitHub repo: `al-<feature>` or neutral name
  - gem/plugin id aligned with plugin namespace
- Third-party non-`al-*` plugins are valid ecosystem plugins and may be featured.

## Featured vs bundled plugins

- `featured`: listed in docs/catalog with metadata and compatibility, but not required in starter dependencies.
- `bundled`: included in starter wiring (`Gemfile` + `_config.yml` plugin list) and shipped by default.

Use [`_data/featured_plugins.yml`](../_data/featured_plugins.yml) as the catalog source of truth.

## Minified asset policy

- Use pinned CDN assets (with SRI) for stable standalone third-party libraries.
- Keep vendored release-time artifacts (with provenance) only where ownership needs complex runtime/module graphs (for example: `al_search`, `al_folio_distill`).
- Do not add install-time network fetches in `gem install` / `bundle install` paths.

## Test ownership

- `al-folio` tests:
  - Visual regression/parity (`test/visual/**`)
  - Cross-gem integration checks (plugin toggles, compat wiring, upgrade smoke tests)
  - Starter wiring contracts only
- Gem-local tests (`al-folio-core`, `al-folio-distill`, `al-*`):
  - Component correctness (tags, filters, generators)
  - Runtime asset packaging contracts
  - Feature edge cases
  - Migration/upgrade contract logic in the owning gem

## Prohibited pattern

- Do not duplicate gem-owned component correctness tests in `al-folio`.
- Do not add local starter copies of gem-owned runtime files unless intentionally overriding behavior.
- Do not leave intentional local overrides untracked; acknowledge them with `bundle exec al-folio upgrade overrides accept`.

## PR triage playbook

- If a PR changes starter wiring/docs/content/tests only: keep it in `al-folio`.
- If a PR changes gem-owned runtime/component behavior: redirect/port to the owning gem repo.
- If a PR introduces a feature without an owner:
  - create a plugin proposal issue
  - recommend a standalone plugin repo
  - close/redirect the starter PR with references.
