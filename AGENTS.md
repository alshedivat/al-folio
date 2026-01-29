# Agent Guidelines for al-folio

This is a hub for AI agents and automation tools working with the al-folio repository. It directs you to specialized resources by role and task type.

## Quick Links by Role

**Are you a coding agent?** → Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) first (tech stack, build, CI/CD, common pitfalls & solutions)
**Customizing the site?** → See [`.github/agents/customize.agent.md`](.github/agents/customize.agent.md)
**Writing documentation?** → See [`.github/agents/docs.agent.md`](.github/agents/docs.agent.md)
**Need setup/deployment help?** → [INSTALL.md](INSTALL.md)
**Troubleshooting & FAQ?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
**Customization & theming?** → [CUSTOMIZE.md](CUSTOMIZE.md)
**Quick 5-min start?** → [QUICKSTART.md](QUICKSTART.md)

## Essential Commands

### Local Development (Docker)

```bash
# Initial setup & start dev server
docker compose pull && docker compose up
# Site runs at http://localhost:8080

# Rebuild with updated dependencies
docker compose up --build

# Stop containers
docker compose down
```

### Pre-Commit Checklist

```bash
# 1. Format code
npm install --save-dev prettier @shopify/prettier-plugin-liquid  # (first time only)
npx prettier . --write

# 2. Build locally
docker compose up --build

# 3. Verify site
# → Visit http://localhost:8080 and check navigation, pages, images, dark mode

# 4. Commit with clear message
git add .
git commit -m "type: description"  # See "Commit Format" below
```

## Critical Configuration

When modifying `_config.yml`, these **must be updated together**:

**Personal site:** `url: https://username.github.io` + `baseurl:` (empty)
**Project site:** `url: https://username.github.io` + `baseurl: /repo-name/`
**YAML errors:** Quote strings with special characters: `title: "My: Cool Site"`

## Common Issues

For troubleshooting common build, deployment, and configuration issues, see:

- [Common Pitfalls & Workarounds](https://github.com/alshedivat/al-folio/blob/master/.github/copilot-instructions.md#common-pitfalls--workarounds) in copilot-instructions.md
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues) to search for your specific problem

## Commit Format

```
<type>: <subject>

<body (optional)>
```

**Types:** `feat` (feature), `fix` (bug), `docs` (docs), `style` (formatting), `config` (configuration), `chore` (maintenance)

**Examples:**

```
feat: Add dark mode toggle button to header
fix: Correct baseurl in project site configuration
docs: Update INSTALL.md with Docker troubleshooting
style: Format all Liquid templates with Prettier
config: Enable blog section in _config.yml
chore: Update Jekyll dependencies with bundle update --all
```

**Always git add explicitly** – Do not stage everything with `git add .` unless you're certain of what's being committed. Check `git status` first.

## Code-Specific Instructions

Always consult the relevant instruction file for your code type:

| File Type                                     | Instruction File                                                                                |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Markdown content (`_posts/`, `_pages/`, etc.) | [markdown-content.instructions.md](.github/instructions/markdown-content.instructions.md)       |
| YAML config (`_config.yml`, `_data/`)         | [yaml-configuration.instructions.md](.github/instructions/yaml-configuration.instructions.md)   |
| BibTeX (`_bibliography/`)                     | [bibtex-bibliography.instructions.md](.github/instructions/bibtex-bibliography.instructions.md) |
| Liquid templates (`_includes/`, `_layouts/`)  | [liquid-templates.instructions.md](.github/instructions/liquid-templates.instructions.md)       |
| JavaScript (`_scripts/`)                      | [javascript-scripts.instructions.md](.github/instructions/javascript-scripts.instructions.md)   |

## Auto-Loaded Context

The following files are automatically available to you in this agent context:

- [`.github/copilot-instructions.md`](.github/copilot-instructions.md) – Primary technical reference
- [`.github/instructions/*.md`](.github/instructions/) – Code-specific instruction files (loaded when editing relevant file types)

Other files need to be accessed explicitly.

## What NOT to Commit

**Always obey [`.gitignore`](.gitignore).** It prevents accidental commits of:

- Build outputs (`_site/`, `.jekyll-cache/`, etc.)
- Dependencies (`node_modules/`, `Gemfile.lock`, `vendor/`)
- OS files (`.DS_store`)
- Editor temp files (`.idea/`, `.swp`, `.swo`)
- Secrets and API keys (never commit credentials)

If you create new files, ensure they follow the patterns in `.gitignore`.
