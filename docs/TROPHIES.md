# GitHub Trophy Configuration Guide

This guide explains how to enable and manage GitHub profile trophies in **al-folio**.

## Overview

Trophies can be displayed on the `/repositories/` page alongside user stats.
You can use external rendering or generate SVGs in your repository for branch/local modes.

## Configuration

Enable trophies in `_config.yml`:

```yaml
repo_trophies:
  enabled: true
  theme_light: flat
  theme_dark: gitdimmed
```

## External Mode (Default)

When `repo_stats_type: external`, trophies are loaded from
`external_services.github_profile_trophy_url` in `_config.yml`.

## Branch/Local Mode (Self-Hosted)

When `repo_stats_type: branch` or `repo_stats_type: local`, the stats workflow
generates trophy SVGs using `ryo-ma/github-profile-trophy` and commits them to
the stats branch (branch mode) or expects them on the main branch (local mode).

### Requirements

- `METRICS_TOKEN` secret is required (same token used by stats generation).
- Workflow: `.github/workflows/update-stats.yml`
- Config: `.config/trophies.yml`

### Workflow Config File

You can tune trophy rendering via `.config/trophies.yml`:

```yaml
columns:
  - 6
  - 4
  - 3
margin_w: 15
margin_h: 15
no_bg: true
rank: "-C"
```

### Generated Files

For each user in `_data/repositories.yml`:

- `trophies_<username>_light_c6.svg`
- `trophies_<username>_light_c4.svg`
- `trophies_<username>_light_c3.svg`
- `trophies_<username>_dark_c6.svg`
- `trophies_<username>_dark_c4.svg`
- `trophies_<username>_dark_c3.svg`

These correspond to responsive layout breakpoints on the repositories page.

### Local Mode Copy

If you generate trophies elsewhere, copy them into `assets/img/stats/`:

```bash
cp trophies_*_c*.svg assets/img/stats/
```

## Troubleshooting

- **Trophies missing:** Ensure `repo_trophies.enabled: true` and the workflow ran successfully.
- **Branch mode 404:** Confirm `stats_branch_url` is set and the `stats` branch contains the SVGs.
- **Theme mismatch:** Update `repo_trophies.theme_light` and `repo_trophies.theme_dark`.

## References

- `ryo-ma/github-profile-trophy`: https://github.com/ryo-ma/github-profile-trophy
