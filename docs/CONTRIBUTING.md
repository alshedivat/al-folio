# Contributing to al-folio

Thank you for considering contributing to al-folio!

## Pull Requests

We welcome your pull requests (PRs).
For minor fixes (e.g., documentation improvements), feel free to submit a PR directly.
If you would like to implement a new feature or a bug, please make sure you (or someone else) has opened an appropriate issue first; in your PR, please mention the issue it addresses.

Note that since [#2048](https://github.com/alshedivat/al-folio/pull/2048) al-folio uses the [prettier formatter](https://prettier.io/) for its code, meaning all new submitted code must conform to its standard. If you don't have `prettier` installed for your setup and the `prettier` code check fails when submitting a PR, you can check the referred failed action in our repo. In that action there will be an artifact with an HTML diff showing the needed changes.

## Repository Routing (v1.x)

`al-folio` is a starter in `v1.x`. Before opening a PR, route your change to the owning repo:

- `al-folio` (this repo): starter wiring (`Gemfile`, `_config.yml`), example/demo content, documentation, visual tests, cross-gem integration tests.
- `al-folio-core` and other `al-*` gem repos: component runtime behavior, layouts/includes/style primitives, feature logic, unit/component tests.
- If a feature does not fit an existing plugin, propose a new standalone plugin first, then implement there.

See [`BOUNDARIES.md`](BOUNDARIES.md) for ownership details.

## Plugin Naming Convention (v1.x)

We use a hybrid naming convention:

- Theme-coupled plugins: repo `al-folio-<feature>`, gem/plugin id `al_folio_<feature>`.
- Reusable plugins: repo `al-<feature>` or neutral name, gem/plugin id aligned with plugin namespace.
- Third-party non-`al-*` plugins are allowed in the ecosystem and can be featured.

## Featuring Community Plugins

You can publish and own your own plugin, then propose it for featuring in `al-folio`.

1. Open a **Plugin Feature Proposal** issue in this repo.
2. Share plugin metadata (repo URL, gem name, plugin id, compatibility, owner, demo path).
3. Open a PR to this starter updating:
   - [`_data/featured_plugins.yml`](../_data/featured_plugins.yml)
   - optional demo content page/post under `_pages/` or `_posts/`
4. If requesting **bundled** status (not only featured listing), include starter wiring updates in:
   - [Gemfile](../Gemfile)
   - [\_config.yml](../_config.yml)

Featuring and bundling are separate decisions:

- **Featured-only**: catalog/docs entry and demo.
- **Bundled**: also included in starter dependencies/plugin list by maintainers.

Plugin patch releases are published from their owning repositories. Update this starter only when a plugin release changes default wiring, dependency pins, documentation, examples, integration tests, visual baselines, or Docker/runtime release artifacts.

## Test Ownership

`al-folio` is a starter kit in `v1.x`. Keep tests aligned with runtime ownership:

- `al-folio`: visual regression + cross-gem integration + starter wiring contracts.
- Gem repos (`al-folio-core`, `al-folio-distill`, `al-*`): component correctness/unit tests and asset/runtime contract checks.

Do not add duplicate component-level correctness tests to this starter when the component is gem-owned. See [`BOUNDARIES.md`](BOUNDARIES.md).

## Local Validation

Before opening/updating a PR in `v1.x`, run:

```bash
npm ci
bundle exec jekyll build
```

If your change touches visual tests, install Playwright browsers once and run:

```bash
npx playwright install chromium webkit
npm run test:visual
```

## AI Agent Guidance

This repository includes agent entrypoints and skills for Codex, Claude, Copilot, and similar coding agents.

### CLAUDE.md

The `CLAUDE.md` file serves as an entry point for Claude (Anthropic's AI assistant) when working with this repository. It uses Claude's `@path/to/import` syntax (as described in [Claude's best practices](https://code.claude.com/docs/en/best-practices#write-an-effective-claude-md)) to dynamically import the `AGENTS.md` file. This approach keeps documentation centralized while providing a convenient entry point for AI assistants. The file simply contains:

```
@AGENTS.md
```

### Agent Skills

Agents can use repo-local skills for common v1 workflows:

- `.agents/skills/al-folio-bootstrap/SKILL.md` for new site setup and safe starter customization.
- `.agents/skills/al-folio-v1-migration/SKILL.md` for customized fork migration and override drift auditing.

The canonical skill files live in `.agents/skills/`. `.codex/skills/` and `.claude/skills/` are symlinks for agent-specific discovery.

### Customization Agent

The **Customization Agent** (`.github/agents/customize.agent.md`) helps users customize their al-folio website. It:

- Guides you through modifying configuration files, adding content, and customizing the theme
- Explains technical concepts in plain language for users without coding experience
- Applies changes directly to your repository files
- Provides step-by-step instructions for common customization tasks

To use the customization agent, you need to have [GitHub Copilot](https://github.com/features/copilot) enabled in your repository. The agent can help with tasks like changing site information, updating your CV, adding publications, creating blog posts, customizing theme colors, and more.

### Documentation Agent

The **Documentation Agent** (`.github/agents/docs.agent.md`) maintains the project documentation. It:

- Updates and maintains documentation files (`README.md`, `docs/README.md`, `docs/INSTALL.md`, `docs/CUSTOMIZE.md`, `docs/FAQ.md`, `docs/CONTRIBUTING.md`)
- Keeps documentation in sync with code changes
- Writes clear, concise documentation for users without technical backgrounds
- Follows documentation standards and best practices

The documentation agent is primarily intended for maintainers and contributors who are updating the project documentation.

### Custom Instruction Files

To enhance GitHub Copilot's effectiveness when working with specific file types, this repository includes custom instruction files in `.github/instructions/`:

- **`.github/copilot-instructions.md`** – Main Copilot instructions with repository overview, build process, tech stack, project layout, CI/CD pipelines, and common pitfalls
- **`.github/instructions/liquid-templates.instructions.md`** – Guidance for modifying Liquid template files (`.liquid`)
- **`.github/instructions/yaml-configuration.instructions.md`** – Guidance for configuration and data files (`_config.yml`, `_data/**/*.yml`)
- **`.github/instructions/bibtex-bibliography.instructions.md`** – Guidance for bibliography files (`.bib`, `_bibliography/**`)
- **`.github/instructions/markdown-content.instructions.md`** – Guidance for content files across collections (`_books/`, `_news/`, `_pages/`, `_posts/`, `_projects/`, `_teachings/`)
- **`.github/instructions/javascript-scripts.instructions.md`** – Guidance for starter JavaScript and runtime script snippets

These files help Copilot agents understand project conventions, build requirements, and development workflows without requiring codebase exploration.

### Copilot Environment Setup

A GitHub Actions workflow (`.github/workflows/copilot-setup-steps.yml`) automatically configures the Copilot environment with required dependencies (Ruby 3.3.5, Python 3.13, Node.js, ImageMagick, nbconvert) before agent execution.

### Important: Verify Agent Output

While these agents are designed to assist you, **they can make mistakes or produce incorrect information**. Always review and verify the output before applying it to your repository:

- **Review code and configuration changes** – Check that suggested modifications are correct and fit your needs
- **Test changes locally** – Before pushing to GitHub, test the changes locally (using Docker or native setup)
- **Verify syntax** – Ensure any YAML, Markdown, or configuration files have correct syntax
- **Check documentation** – If the agent generates documentation, review it for accuracy and clarity
- **Don't blindly apply changes** – Understand what changes are being made and why
- **Run your site** – After applying changes, run your site locally and verify everything works as expected

**Example:** If an agent suggests a BibTeX entry or configuration change, verify that the syntax is correct and matches the existing style in your repository before committing.

### How to Enable Agents

GitHub Copilot agents are available to users with GitHub Copilot subscriptions. To use these agents:

1. Ensure you have [GitHub Copilot](https://github.com/features/copilot) enabled for your account
2. Open your repository in an editor with GitHub Copilot support (such as VS Code with the GitHub Copilot extension)
3. The agents will be automatically available based on the configuration files in `.github/agents/`. For more information, see [Using custom agents in your IDE](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents#using-custom-agents-in-your-ide).

For more information about GitHub Copilot agents and how to use them, see the [GitHub Copilot documentation](https://docs.github.com/en/copilot).

## Issues

We use GitHub issues to track bugs and feature requests.
Before submitting an issue, please make sure:

1. You have read [the FAQ section](FAQ.md) of the README and your question is NOT addressed there.
2. You have done your best to ensure that your issue is NOT a duplicate of one of [the previous issues](https://github.com/alshedivat/al-folio/issues).
3. Your issue is either a bug (unexpected/undesirable behavior) or a feature request.
   If it is just a question, please ask it in the [Discussions](https://github.com/alshedivat/al-folio/discussions) forum.

When submitting an issue, please make sure to use the appropriate template.

## License

By contributing to al-folio, you agree that your contributions will be licensed
under the LICENSE file in the root directory of the source tree.
