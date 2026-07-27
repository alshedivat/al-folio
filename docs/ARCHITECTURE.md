# Architecture (v1.x)

This is the **authoritative** description of how the `al-folio` v1 starter and its plugin gems fit together. It is written for humans and coding agents alike. [`AGENTS.md`](../AGENTS.md) is the short entry point and links here; [`BOUNDARIES.md`](BOUNDARIES.md) is the authoritative area-to-gem ownership table. Everything in this file should exist in exactly one place — if you find it restated elsewhere, link here instead of copying.

<!--ts-->

- [Architecture (v1.x)](#architecture-v1x)
  - [What the starter is](#what-the-starter-is)
  - [Failure modes that produce no error message](#failure-modes-that-produce-no-error-message)
    - [1. Features fail silently when the gem or the flag is missing](#1-features-fail-silently-when-the-gem-or-the-flag-is-missing)
    - [2. Gemfile and \_config.yml are two lists that must agree](#2-gemfile-and-_configyml-are-two-lists-that-must-agree)
    - [3. This repo's effective baseurl is /al-folio](#3-this-repos-effective-baseurl-is-al-folio)
  - [Wrapper to tag to gem delegation](#wrapper-to-tag-to-gem-delegation)
  - [How feature gems ship their assets](#how-feature-gems-ship-their-assets)
  - [The v1 config contract](#the-v1-config-contract)
  - [Local overrides: your site vs. this repo](#local-overrides-your-site-vs-this-repo)
  - [Bootstrap compatibility is opt-in and time-boxed](#bootstrap-compatibility-is-opt-in-and-time-boxed)
  - [Working on a gem alongside the starter](#working-on-a-gem-alongside-the-starter)

<!--te-->

## What the starter is

`al-folio` v1.x is a **thin Jekyll starter, not a theme**. This repo owns only:

- starter wiring (`Gemfile`, `_config.yml`, `_data/featured_plugins.yml`),
- example content (`_pages`, `_posts`, `_projects`, `_news`, `_teachings`, `_books`, `_bibliography`),
- documentation (`docs/`),
- cross-gem integration tests (`test/integration_*.sh`) and visual parity tests (`test/visual/`).

**All runtime — layouts, includes, Sass, Liquid tags, filters, and feature JS — lives in versioned gems** published independently on RubyGems and developed under the [`al-org-dev`](https://github.com/al-org-dev) organization.

The single most common mistake is editing runtime here. If a change is a layout, include, tag, filter, or feature behavior, it belongs in the owning gem. See the routing table in [`AGENTS.md`](../AGENTS.md#route-your-change) and the full ownership table in [`BOUNDARIES.md`](BOUNDARIES.md).

## Failure modes that produce no error message

These three are the reason most "I changed it and nothing happened" reports exist. None of them raises a build error.

### 1. Features fail silently when the gem or the flag is missing

Feature gating is **two-layered**, and a feature renders only when _both_ layers agree:

- **Site-wide config flags** in `_config.yml`: `search_enabled`, `enable_math`, `enable_cookie_consent`, `enable_darkmode`, `al_folio.features.cv.enabled`, `al_folio.features.distill.enabled`, and the provider IDs under `analytics:`.
- **Per-page front matter**: `images:`, `tikzjax`, `chart.*`, `mermaid.*`, `giscus_comments`, `layout: distill`, `layout: cv`.

`al_folio_core` ships thin wrappers in `_includes/plugins/*.liquid` that call custom Liquid tags defined by the sibling gems. **When the owning gem is not in the plugin list, or the flag is off, the tag emits an empty string.** There is no warning, no missing-tag error, and no visual placeholder — the feature simply is not there.

When debugging a feature that "does nothing", check in this order:

1. Is the gem in **both** the `Gemfile` and the `plugins:` list in `_config.yml`? (See below.)
2. Is the site-wide flag on?
3. Does the page's front matter opt in?
4. Is the relevant `third_party_libraries` entry present with its SRI hash?

### 2. Gemfile and `_config.yml` are two lists that must agree

Plugin activation requires **two edits, in two files**:

- [`Gemfile`](../Gemfile), `group :al_folio_plugins` — the pinned dependency (for example `gem 'al_folio_core', '= 1.0.11'`).
- [`_config.yml`](../_config.yml), the `plugins:` list — the Jekyll activation entry.

A gem present in only one of them is inert. In the `Gemfile` only, Jekyll never loads it; in `plugins:` only, Bundler never installs it. Adding **or removing** a plugin means editing both. Note the spelling difference: repo directories use hyphens (`al-folio-core`), gem and plugin ids use underscores (`al_folio_core`).

### 3. This repo's effective baseurl is `/al-folio`

The demo site is published as a **project page** at `https://alshedivat.github.io/al-folio/`, so `_config.yml` already sets `baseurl: /al-folio`. A plain build therefore picks it up — `deploy.yml`, `broken-links-site.yml` and `axe.yml` all run `bundle exec jekyll build` with no flag. What matters is that the _effective_ baseurl stays `/al-folio`; passing it explicitly is redundant but harmless, and the command set spells it out so the served path is unambiguous:

```bash
bundle exec jekyll build --baseurl /al-folio
bundle exec jekyll serve            # http://localhost:4000/al-folio/  (note the path)
```

What breaks the site is **blanking the baseurl out** — build with an empty baseurl and every asset and internal link resolves one path segment too high. The Docker entry point serves under `/al-folio` too. A build that "works" but renders unstyled is almost always a baseurl mismatch. In **your own** site this is different: personal and organization sites (`username.github.io`) must leave `baseurl` **empty but present**; project sites set `baseurl: /<project-name>/`. See [FAQ](FAQ.md#my-webpage-works-locally-but-after-deploying-it-is-not-displayed-correctly-css-and-js-are-not-loaded-properly-how-do-i-fix-that).

## Wrapper to tag to gem delegation

`al_folio_core` is the hub: `_config.yml` sets `theme: al_folio_core`, and the gem ships every base `_layouts/*.liquid` and `_includes/*.liquid`, the base theme JS/CSS, the `details` and `file_exists` tags, and the `hideCustomBibtex` and `remove_accents` filters. Its `_includes/plugins/*.liquid` wrappers delegate to tags owned by sibling gems:

| Wrapper / call site       | Liquid tag                                          | Owning gem                                                                     |
| ------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------ |
| search assets             | `al_search_assets`                                  | `al_search` (Cmd-K ninja-keys palette; index built at build time from content) |
| comments                  | `al_comments`                                       | `al_comments` (Giscus + Disqus, front-matter gated)                            |
| cookie banner             | `al_cookie_styles` / `al_cookie_scripts`            | `al_cookie` (consent-mode gating of analytics)                                 |
| icon `<link>`s            | `al_icons_styles`                                   | `al_icons` (FontAwesome/Academicons/Scholar Icons from CDN)                    |
| analytics                 | `al_analytics_scripts`                              | `al_analytics` (GA/Cronitor/Pirsch/OpenPanel)                                  |
| math                      | `al_math_styles` / `al_math_scripts`                | `al_math` (MathJax, pseudocode.js, TikZJax)                                    |
| charts                    | `al_charts_scripts`                                 | `al_charts` (Mermaid/Chart.js/ECharts/Plotly/Vega/Leaflet/diff2html)           |
| image tools               | `al_img_tools_styles` / `al_img_tools_scripts`      | `al_img_tools` (zoom, lightbox, sliders, galleries)                            |
| newsletter                | `al_newsletter_form` / `al_newsletter_scripts`      | `al_newsletter` (Loops.so signup)                                              |
| `layout: cv`              | `al_folio_cv_render`                                | `al_folio_cv` (RenderCV YAML + JSONResume)                                     |
| `layout: distill`         | `al_folio_distill_render`                           | `al_folio_distill` (vendored, hash-pinned distillpub runtime)                  |
| citation badges           | `google_scholar_citations` / `inspirehep_citations` | `al_citations`                                                                 |
| external posts            | (generator, no tag)                                 | `al_ext_posts` (RSS/URL ingestion into synthetic posts)                        |
| legacy Bootstrap behavior | (opt-in assets)                                     | `al_folio_bootstrap_compat`                                                    |
| upgrade/audit CLI         | `bundle exec al-folio …`                            | `al_folio_upgrade`                                                             |

## How feature gems ship their assets

Most feature gems are Jekyll `Generator`s that inject their JS/CSS as static files at build time, **only when the feature is enabled**. Consequences worth knowing:

- Those assets are not committed to this repo; you will not find them under `assets/` in a fresh checkout, and they appear in `_site/` only for enabled features.
- Several load from pinned CDN URLs with Subresource Integrity hashes read from the `third_party_libraries:` block in `_config.yml`. Bumping a library version means bumping its `integrity` hash in the same block.
- Do not vendor icon fonts or runtime JS back into starter paths to "fix" a missing asset — that is the silent-gating symptom in [failure mode 1](#1-features-fail-silently-when-the-gem-or-the-flag-is-missing), not a packaging bug.

## The v1 config contract

`_config.yml` must keep the `al_folio` contract keys:

- `al_folio.api_version: 1`
- `al_folio.style_engine: tailwind`
- `al_folio.tailwind.{version,css_entry,preflight}`
- `al_folio.distill.{engine,source}`

This is enforced **twice**: as build-time warnings by `al_folio_core`'s `:after_init` hook, and as **blocking** findings by `bundle exec al-folio upgrade audit` (which CI runs in `upgrade-check.yml`). Do not remove these keys.

## Local overrides: your site vs. this repo

These two cases have **opposite** rules, and conflating them is a recurring source of confusion.

**In your own site** (a repo created from this template): local overrides are fully supported. You may shadow any gem-owned file by adding the same path in your repo — `_layouts/bib.liquid`, `_includes/repository/repo.liquid`, `_sass/_variables.scss`, and so on. Your copy wins over the gem's. Track them so future gem updates can flag drift:

```bash
bundle exec al-folio upgrade overrides audit
bundle exec al-folio upgrade overrides diff <path>
bundle exec al-folio upgrade overrides accept <path>
```

`overrides audit` records the owning gem, its version, and the upstream/local SHA256 in `.al-folio-overrides.yml`. Commit that file. When a later `bundle update` changes the upstream file, the audit marks your override stale. Fixes that would benefit everyone should be ported to the owning gem instead of kept as a local override.

**In this starter repo** (`alshedivat/al-folio` itself): those directories must not exist. `npm run lint:style-contract` fails the build if the starter contains `_includes/`, `_layouts/`, `_sass/`, `_scripts/`, `assets/tailwind/`, `tailwind.config.js`, `assets/webfonts/`, or icon-font artifacts. This is the automated enforcement of the thin-starter boundary and applies to contributions to al-folio, **not** to user sites.

> **Note for maintainers:** `test/style_contract.js` and `unit-tests.yml` ship to every site created from this template, so a user who adds a perfectly legal local override will see the starter's own contract check fail in their fork. Whether to re-scope that check to the upstream repo only is an open maintainer decision; it is deliberately unchanged here.

## Bootstrap compatibility is opt-in and time-boxed

`al_folio.compat.bootstrap.enabled: true` (default `false`) activates `al_folio_bootstrap_compat`, which restores legacy `data-toggle` and Bootstrap-class behavior on the Tailwind-first v1 core.

- Supported through `v1.2`
- Deprecated in `v1.3`
- Removed in `v2.0`

Migrate content off Bootstrap markup before then. See [FAQ](FAQ.md#how-do-i-handle-legacy-bootstrap-marked-pages-on-tailwind-first-v1x).

## Working on a gem alongside the starter

Plugin gems are developed as sibling checkouts next to this repo. Clone the gem repo beside your `al-folio` checkout, then point the `Gemfile` at your working copy and reinstall:

```ruby
gem "al_folio_core", path: "../al-folio-core"     # or git: / branch:
```

```bash
bundle install
bundle exec jekyll build --baseurl /al-folio
```

Revert the `Gemfile` to the pinned released version before committing — the pins in `Gemfile` are starter wiring and `test/style_contract.js` asserts some of them.
