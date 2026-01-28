# GitHub Stats and Metrics Implementation

This document explains the GitHub stats and metrics system implementation in al-folio, including the bug-fix fork usage and configuration requirements.

## Overview

The stats system uses [lowlighter/metrics](https://github.com/lowlighter/metrics) to generate GitHub statistics visualizations and [ryo-ma/github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) for achievement trophies.

**Important**: This implementation uses a bug-fix fork of lowlighter/metrics to resolve plugin errors until the fixes are merged upstream.

## Bug-Fix Fork Usage

### Why a Fork?

The workflow uses `endavis/metrics@fix/habits-activity-typeerror-bugs` instead of `lowlighter/metrics@latest` because several plugins have critical bugs in the upstream version:

1. **Activity Plugin** - Null pointer errors when processing events from deleted/missing users
2. **Habits Plugin** - Undefined destructuring errors when accessing event author data
3. **Achievements Plugin** - Uses deprecated Projects (classic) API (sunset May 2024)
4. **Projects Plugin** - Mixed legacy/modern API usage causing deprecation errors

### Fixes Included

The fork includes these bug fixes:

- **Activity plugin**: Added 6 null checks for missing user objects + corrected REST API method
- **Habits plugin**: Added null checks for undefined event author data
- **Achievements plugin**: Migrated from `projects` to `projectsV2` GraphQL API
- **Projects plugin**: Removed all deprecated Projects classic API calls, uses only ProjectsV2
- **Wakatime template**: Added optional chaining for null-safe template rendering

### Fork Repository

- **Repository**: https://github.com/endavis/metrics
- **Branch**: `fix/habits-activity-typeerror-bugs`
- **Pre-built Docker Image**: `ghcr.io/endavis/metrics:bugfix-habits-activity`

The fork automatically builds and publishes a Docker image on push, which is used by the composite action for fast execution (~1 minute vs ~10 minutes per job).

### Switching to Upstream

Once the bugs are fixed in lowlighter/metrics, update `.github/workflows/update-stats.yml`:

```yaml
# Change from:
uses: endavis/metrics@fix/habits-activity-typeerror-bugs

# To:
uses: lowlighter/metrics@latest
```

## GitHub Token Scopes

The metrics system requires a GitHub Personal Access Token with specific scopes.

### Required Scopes

| Scope          | Required For                     | Plugins                             |
| -------------- | -------------------------------- | ----------------------------------- |
| `read:user`    | Basic user information           | All user plugins                    |
| `repo`         | Repository access and statistics | All repo plugins, most user plugins |
| `read:org`     | Organization membership data     | Organization-related metrics        |
| `read:project` | GitHub Projects v2 access        | `projects` plugin                   |

### Creating the Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes:
   - ✅ `read:user`
   - ✅ `repo` (all sub-scopes)
   - ✅ `read:org`
   - ✅ `read:project` (if using projects plugin)
4. Generate token and copy it
5. Add to repository secrets as `METRICS_TOKEN`

### Token Scope Impact

- **Without `read:project`**: The `projects` plugin will fail with "Insufficient token scopes" error. Disable it in `.config/stats-metrics.yml`:

  ```yaml
  projects:
    enabled: no
  ```

- **With public repos only**: Using `public_repo` instead of full `repo` scope will limit some plugin functionality

## Configuration Files

### Main Configuration: `.config/stats-metrics.yml`

This file controls which plugins are enabled and their settings. See the file for comprehensive inline documentation.

#### Plugin Categories

1. **Working Plugins** - Fully functional in the fork:

   - `languages`, `notable`, `isocalendar`, `topics`, `code`
   - `stars`, `stargazers`, `followup`, `reactions`
   - `calendar`, `discussions`, `gists`, `people`, `projects`
   - `habits`, `achievements`, `activity`

2. **Disabled Plugins** - Require additional setup/services:
   - `wakatime` - Needs WakaTime API key
   - `music` - Needs Spotify/Apple Music integration
   - Other specialized plugins (chess, crypto, etc.)

### Workflow Configuration: `.github/workflows/update-stats.yml`

Controls the automated stats generation schedule and execution.

#### Key Settings

```yaml
# Run daily at midnight UTC
schedule:
  - cron: "0 0 * * *"

# Use bug-fix fork
uses: endavis/metrics@fix/habits-activity-typeerror-bugs

# Allow plugin errors without failing workflow
plugins_errors_fatal: no
```

The `plugins_errors_fatal: no` setting allows the workflow to complete even if some plugins encounter errors, useful when experimenting with different plugin configurations.

## Customization

### Enabling/Disabling Plugins

Edit `.config/stats-metrics.yml`:

```yaml
user:
  plugins:
    # Enable a plugin
    languages:
      enabled: yes
      details: bytes-size, percentage

    # Disable a plugin
    wakatime:
      enabled: no
```

### Adding Custom Plugins

1. Enable in `.config/stats-metrics.yml`
2. Add plugin parameters to `.github/workflows/update-stats.yml` in the "Generate User Stats" step:
   ```yaml
   plugin_name: ${{ steps.metrics_params.outputs.plugin_name }}
   plugin_name_setting: ${{ steps.metrics_params.outputs.plugin_name_setting }}
   ```

### Trophy Configuration: `.config/trophies.yml`

Controls GitHub trophy generation appearance:

```yaml
columns: [6, 4, 3] # Responsive column counts
margin_w: 15 # Horizontal spacing
margin_h: 15 # Vertical spacing
no_bg: true # Transparent background
rank: "-C" # Show B rank and above
```

## Workflow Execution

The stats workflow runs automatically:

1. **Daily Schedule**: Midnight UTC (configured via cron)
2. **Manual Trigger**: Via GitHub Actions UI or `gh workflow run update-stats.yml`
3. **On Push**: When workflow files are modified (on main branch)

### Execution Flow

1. **Prepare** - Parse configuration files and create job matrix
2. **Generate User Stats** - Create user statistics SVG
3. **Generate Repo Stats** - Create per-repository statistics SVGs
4. **Generate Trophies** - Create achievement trophy SVGs
5. **Generate Readme Stats** - Create GitHub Readme Stats cards
6. **Commit to Stats Branch** - Push all generated SVGs to `stats` branch

### Output Location

All generated SVGs are committed to the `stats` branch under `assets/img/stats/`:

```
assets/img/stats/
├── user_stats_<username>.svg
├── repo_<user>_<repo>.svg
├── trophies_<username>_<theme>_<columns>.svg
└── user_stats_readme_<username>_<theme>.svg
```

## Troubleshooting

### Common Issues

1. **"Unexpected error" in generated SVG**

   - Check workflow logs for specific plugin errors
   - Verify token has required scopes
   - Ensure fork is being used correctly

2. **Projects plugin fails**

   - Token needs `read:project` scope
   - Or disable the plugin if not needed

3. **Workflow timeout**

   - Reduce `analysis_timeout` for language plugin
   - Disable `indepth` analysis
   - Reduce number of enabled plugins

4. **Stats not updating**
   - Check workflow runs in GitHub Actions
   - Verify cron schedule is active
   - Check for workflow failures

### Debug Mode

Enable debug output in `.config/stats-metrics.yml`:

```yaml
repo:
  debug: yes
```

This provides verbose logging in workflow runs.

## Performance Optimization

The fork's pre-built Docker images significantly improve performance:

- **Without pre-built image**: ~10 minutes per job (building from scratch)
- **With pre-built image**: ~1 minute per job (pulling from GHCR)

For a typical workflow with 6 parallel jobs:

- **Before**: ~60 minutes total
- **After**: ~6 minutes total

## Contributing

If you encounter bugs or have improvements:

1. **Bug Fixes**: Consider contributing to [endavis/metrics](https://github.com/endavis/metrics) fork
2. **Configuration Examples**: Share your `.config/stats-metrics.yml` setups
3. **Documentation**: Help improve this guide

## References

- [lowlighter/metrics Documentation](https://github.com/lowlighter/metrics)
- [Available Metrics Plugins](https://github.com/lowlighter/metrics#-plugins)
- [GitHub Profile Trophy](https://github.com/ryo-ma/github-profile-trophy)
- [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)
- [Fork Repository](https://github.com/endavis/metrics/tree/fix/habits-activity-typeerror-bugs)
