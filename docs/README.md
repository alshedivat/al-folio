# al-folio Documentation

These guides cover the `al-folio` v1.x starter and its pluginized runtime.

## User Guides

- [Quick Start](QUICKSTART.md): create a site from the template and get it live quickly.
- [Installing and Deploying](INSTALL.md): Docker, local setup, GitHub Pages, Netlify, and upgrade guidance.
- [Customizing](CUSTOMIZE.md): content, CVs, publications, layouts, local overrides, and feature configuration.
- [FAQ](FAQ.md): common deployment, upgrade, plugin, and troubleshooting questions.
- [Troubleshooting](TROUBLESHOOTING.md): build, deployment, styling, and content debugging.
- [Analytics](ANALYTICS.md): analytics provider setup.
- [SEO](SEO.md): search-engine and social preview setup.

## Maintainer Guides

- [Architecture](ARCHITECTURE.md): how the starter and its plugin gems fit together, the failure modes that produce no error message, the v1 config contract, and local overrides.
- [Ownership Boundaries](BOUNDARIES.md): starter-vs-plugin ownership, PR routing, and release responsibilities.
- [Contributing](CONTRIBUTING.md): contributor workflow, validation, and agent guidance.
- [Bootstrap skill](../.agents/skills/al-folio-bootstrap/SKILL.md): agent workflow for new v1 sites.
- [Migration skill](../.agents/skills/al-folio-v1-migration/SKILL.md): agent workflow for customized fork migrations and override audits.

## v1 Plugin System

`al-folio` v1.x is a thin starter. It owns site wiring, example content, documentation, integration tests, and visual tests.
Runtime behavior belongs in Ruby gems maintained under the [`al-org-dev`](https://github.com/al-org-dev) organization.
See [Architecture](ARCHITECTURE.md) for how the two halves connect, and [`AGENTS.md`](../AGENTS.md) if you are a coding agent.

When changing feature behavior, route the work to the owning plugin repo first. Update this starter only when the change affects:

- `Gemfile` dependency pins,
- `_config.yml` plugin activation or feature flags,
- `_data/featured_plugins.yml` catalog metadata (rendered as the [plugin catalog page](https://alshedivat.github.io/al-folio/plugins/), source [`_pages/plugins.md`](../_pages/plugins.md)),
- documentation, examples, integration tests, or visual parity coverage.

See [Ownership Boundaries](BOUNDARIES.md) for the full routing table.
