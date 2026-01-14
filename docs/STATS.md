# GitHub Stats Configuration Guide

This guide explains how to configure and use the GitHub statistics feature in **al-folio**.

## Table of Contents

- [Overview](#overview)
- [Stats Display Modes](#stats-display-modes)
  - [External Mode (Default)](#external-mode-default)
  - [Branch Mode (Self-Hosted)](#branch-mode-self-hosted)
  - [Local Mode (Static Files)](#local-mode-static-files)
- [Quick Start](#quick-start)
- [Branch Mode Setup](#branch-mode-setup)
- [Local Mode Setup](#local-mode-setup)
- [Configuration Options](#configuration-options)
- [Troubleshooting](#troubleshooting)

## Overview

**al-folio** can display GitHub repository statistics and user profiles on your `/repositories/` page using three different methods. The default "external" mode works out of the box with no configuration needed.

![Repositories Preview](../readme_preview/repositories.png)

## Stats Display Modes

### External Mode (Default)

Uses the [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) Vercel API to generate stats on-the-fly.

**Pros:**

- ✅ No setup required
- ✅ No secrets or tokens needed
- ✅ Always up-to-date
- ✅ No maintenance

**Cons:**

- ⚠️ Depends on external service
- ⚠️ Rate limits may apply
- ⚠️ Less customization

**Configuration:**

```yaml
# _config.yml
repo_stats_type: external
```

That's it! This is the default configuration.

### Branch Mode (Self-Hosted)

Uses GitHub Actions to generate stats SVG files and store them on a separate `stats` branch using [lowlighter/metrics](https://github.com/lowlighter/metrics).

You can also generate additional cards using [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) and render both side-by-side.

**Pros:**

- ✅ Full control over stats generation
- ✅ No dependency on external services
- ✅ Highly customizable
- ✅ Better privacy
- ✅ No rate limits

**Cons:**

- ⚠️ Requires initial setup
- ⚠️ Needs GitHub token
- ⚠️ Requires separate branch

**Configuration:**

```yaml
# _config.yml
repo_stats_type: branch
stats_branch_url: "https://raw.githubusercontent.com/<username>/<repo>/stats"
```

See [Branch Mode Setup](#branch-mode-setup) for detailed instructions.

### Local Mode (Static Files)

Stats SVG files are committed directly to the main branch.

**Pros:**

- ✅ Complete control
- ✅ Works offline
- ✅ No external dependencies

**Cons:**

- ⚠️ Manual updates required
- ⚠️ Increases repository size
- ⚠️ Files in main branch

**Configuration:**

```yaml
# _config.yml
repo_stats_type: local
```

See [Local Mode Setup](#local-mode-setup) for instructions.

## Quick Start

1. **Edit `_data/repositories.yml`** to add your GitHub username and repositories:

   ```yaml
   github_users:
     - your-username

   github_repos:
     - your-username/repo1
     - your-username/repo2
   ```

2. **That's it!** The default "external" mode will work immediately.

3. **Optional:** If you want more control, follow the [Branch Mode Setup](#branch-mode-setup).

## Branch Mode Setup

### Step 1: Create a Personal Access Token

1. Go to GitHub Settings → [Developer settings](https://github.com/settings/tokens) → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name (e.g., "al-folio stats")
4. Select scopes:
   - ✅ `repo` (for full access) or `public_repo` (for public repos only)
   - ✅ `read:user` (to read user profile data)
   - ✅ `read:org` (for organization membership data)
   - ✅ `read:project` (optional, only if using projects plugin)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### Step 2: Add Token as Repository Secret

1. Go to your repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `METRICS_TOKEN`
4. Value: Paste the token from Step 1
5. Click "Add secret"

### Step 3: Update Configuration

Edit `_config.yml`:

```yaml
# Change the stats type
repo_stats_type: branch

# Set your stats branch URL
stats_branch_url: "https://raw.githubusercontent.com/<your-username>/<your-repo>/stats"
```

Replace `<your-username>` and `<your-repo>` with your actual GitHub username and repository name.

### Step 4: Run the Workflow

1. Go to your repository's Actions tab
2. Click on "Update GitHub Stats" workflow
3. Click "Run workflow" → "Run workflow"
4. Wait for it to complete (~1-2 minutes)
5. The workflow will automatically create the `stats` branch if it doesn't exist
6. Check the `stats` branch - you should see new SVG files!

**Note:** The `stats` branch is created automatically on the first workflow run. You don't need to create it manually.

### Optional: Configure Timezone

By default, stats use UTC timezone. To customize:

1. Go to repository Settings → Secrets and variables → Actions → Variables tab
2. Click "New repository variable"
3. Name: `STATS_TIMEZONE`
4. Value: Your timezone (e.g., `America/New_York`, `Europe/London`, `Asia/Tokyo`)
5. Click "Add variable"

See [list of timezone names](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### Optional: Enable Auto-Update on Push

By default, stats only update daily at midnight UTC. To update on every push:

Edit `.github/workflows/update-stats.yml` and uncomment these lines:

```yaml
# Uncomment below to update stats on every push to main
push:
  branches:
    - main
```

### Optional: Generate github-readme-stats Cards

If you want to generate github-readme-stats cards alongside metrics:

```yaml
# _config.yml
repo_stats_generators: both # metrics, readme, or both
```

The workflow will spin up a local github-readme-stats server and render SVGs
using your existing `METRICS_TOKEN` secret.

### Workflow Config Files

Workflow-specific settings live in `.config/` so you can tune services without
editing the workflow file.

- `.config/stats-metrics.yml`: lowlighter/metrics options
- `.config/stats-readme.yml`: github-readme-stats query options

### Optional: Generate Self-Hosted Trophies

If you enable trophies and use branch/local stats, the workflow can generate
SVG files using `ryo-ma/github-profile-trophy` and commit them to the stats branch.

1. Enable trophies in `_config.yml`:

   ```yaml
   repo_trophies:
     enabled: true
     theme_light: flat
     theme_dark: gitdimmed
   ```

2. Ensure `repo_stats_type` is set to `branch` or `local`.
3. Run the "Update GitHub Stats" workflow.

The workflow generates files named:

- `trophies_<username>_light_c6.svg`
- `trophies_<username>_light_c4.svg`
- `trophies_<username>_light_c3.svg`
- `trophies_<username>_dark_c6.svg`
- `trophies_<username>_dark_c4.svg`
- `trophies_<username>_dark_c3.svg`

## Local Mode Setup

### Step 1: Generate Stats Locally

Option A: Run the GitHub Action workflow manually and download artifacts

1. Go to Actions → "Update GitHub Stats" → "Run workflow"
2. Wait for completion
3. Download the workflow artifacts
4. Extract SVG files

**⚠️ Important:** Workflow artifacts are automatically deleted after 1 day. Download them promptly after the workflow completes.

Option B: Use lowlighter/metrics locally (requires Docker):

```bash
docker run --rm -it -v $(pwd):/metrics ghcr.io/lowlighter/metrics:latest \
  --token=YOUR_GITHUB_TOKEN \
  --user=YOUR_USERNAME
```

### Step 2: Commit Files to Main Branch

```bash
# Create directory if it doesn't exist
mkdir -p assets/img/stats

# Copy your SVG files
cp user_stats_*.svg assets/img/stats/
cp repo_*_*.svg assets/img/stats/
cp user_stats_readme_*_*.svg assets/img/stats/
cp repo_readme_*_*.svg assets/img/stats/
cp trophies_*_c*.svg assets/img/stats/

# If you generated stats manually, ensure repo files are named:
# repo_<owner>_<repo>.svg (example: repo_octocat_hello-world.svg)
#
# Readme repo files should be named:
# repo_readme_<owner>_<repo>_light.svg (example: repo_readme_octocat_hello-world_light.svg)
# repo_readme_<owner>_<repo>_dark.svg (example: repo_readme_octocat_hello-world_dark.svg)
#
# User files should be named:
# user_stats_<username>.svg (example: user_stats_octocat.svg)
# user_stats_readme_<username>_light.svg (example: user_stats_readme_octocat_light.svg)
# user_stats_readme_<username>_dark.svg (example: user_stats_readme_octocat_dark.svg)

# Trophy files should be named:
# trophies_<username>_light_c6.svg (example: trophies_octocat_light_c6.svg)
# trophies_<username>_dark_c6.svg (example: trophies_octocat_dark_c6.svg)

# Commit
git add assets/img/stats/*.svg
git commit -m "Add stats files"
git push
```

### Step 3: Update Configuration

Edit `_config.yml`:

```yaml
repo_stats_type: local
```

## Configuration Options

### `_config.yml` Settings

```yaml
# Stats display mode
repo_stats_type: external # Options: external, branch, local

# Stats generators for branch/local mode
repo_stats_generators: metrics # Options: metrics, readme, both

# Stats branch URL (only for branch mode)
stats_branch_url: "" # Example: https://raw.githubusercontent.com/user/repo/stats

# External services configuration (for external mode)
external_services:
  github_readme_stats_url: https://github-readme-stats.vercel.app
  github_profile_trophy_url: https://github-profile-trophy.vercel.app

# Theme colors for stats
repo_theme_light: default
repo_theme_dark: dark

# Trophy configuration
repo_trophies:
  enabled: false
  theme_light: flat
  theme_dark: gitdimmed
```

### Stats Generators (Branch/Local)

By default, branch/local mode uses lowlighter/metrics. To switch generators or
render both cards side-by-side, set:

```yaml
repo_stats_generators: metrics # metrics, readme, or both
```

### Workflow Configuration

The workflow runs:

- **Daily** at midnight UTC (scheduled)
- **Manually** via workflow dispatch
- **On push** to main (if uncommented)

**Artifact Retention:**

- Workflow artifacts are automatically deleted after 1 day
- This prevents storage accumulation while allowing time for debugging
- Final SVG files remain permanently in the stats branch (branch mode) or after manual commit (local mode)

Edit `.github/workflows/update-stats.yml` to customize:

- Cron schedule: Change the `cron` value
- Timezone: Set `STATS_TIMEZONE` variable
- Push trigger: Uncomment the `push` section
- Stats options: Modify metrics configuration
- Artifact retention: Change `retention-days` in upload-artifact steps (default: 1)

For more customization options, see [lowlighter/metrics documentation](https://github.com/lowlighter/metrics).

## Troubleshooting

### Stats not appearing

**Check:**

1. `_data/repositories.yml` has your username/repos listed
2. `repo_stats_type` is set correctly in `_config.yml`
3. For branch mode: `stats_branch_url` is correct
4. Site has been rebuilt and deployed

### Workflow fails with "Resource not accessible by integration"

**Solution:** Make sure `METRICS_TOKEN` secret is set with correct scopes (`repo` or `public_repo`, `read:user`, `read:org`).

### Workflow fails with "Reference not found"

**Solution:** The `stats` branch doesn't exist. Follow [Step 3](#step-3-create-the-stats-branch) to create it.

### Stats show "404" or broken images in branch mode

**Check:**

1. Stats branch exists: `git ls-remote --heads origin stats`
2. SVG files exist in stats branch: Visit `https://github.com/<user>/<repo>/tree/stats/assets/img/stats`
3. `stats_branch_url` in `_config.yml` matches your repository

### Stats not updating on schedule

**Check:**

1. Workflow is enabled (Actions tab → "Update GitHub Stats" → Enable workflow)
2. Repository is active (GitHub disables workflows for inactive repos)
3. Check workflow run history for errors

### Rate limit errors with external mode

**Solution:** Switch to branch mode to avoid external API rate limits.

### Want to customize stats appearance

**For external mode:** Change `repo_theme_light` and `repo_theme_dark` in `_config.yml`. See [available themes](https://github.com/anuraghazra/github-readme-stats/blob/master/themes/README.md).

**For branch mode:** Edit `.github/workflows/update-stats.yml` and modify the lowlighter/metrics parameters. See [metrics documentation](https://github.com/lowlighter/metrics#-documentation) for all options.

## Additional Resources

- [lowlighter/metrics documentation](https://github.com/lowlighter/metrics)
- [github-readme-stats documentation](https://github.com/anuraghazra/github-readme-stats)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [al-folio main documentation](../README.md)

---

## Embedding Stats in Other Pages

You can display stats on any page using these code snippets:

### User Stats

```liquid
{% if site.data.repositories.github_users %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% for user in site.data.repositories.github_users %}
      {% include repository/repo_user.liquid username=user %}
    {% endfor %}
  </div>
{% endif %}
```

### Repository Cards

```liquid
{% if site.data.repositories.github_repos %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
    {% for repo in site.data.repositories.github_repos %}
      {% include repository/repo.liquid repository=repo %}
    {% endfor %}
  </div>
{% endif %}
```

### Trophies (if enabled)

```liquid
{% if site.repo_trophies.enabled %}
  {% for user in site.data.repositories.github_users %}
    {% if site.data.repositories.github_users.size > 1 %}
      <h4>{{ user }}</h4>
    {% endif %}
    <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
      {% include repository/repo_trophies.liquid username=user %}
    </div>
  {% endfor %}
{% endif %}
```
