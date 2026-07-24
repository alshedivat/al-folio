# al-folio v1 Migration

Use this skill when a user asks an agent to migrate an existing customized al-folio fork to v1.x.

## Workflow

1. Work in a disposable branch, fork, or clone. Do not overwrite the user's original site.
2. Start from the v1 starter contract, then bring over site-owned files:
   - `_config.yml` values
   - `_data`
   - `_bibliography`
   - content collections
   - site assets
   - intentional local `_includes`, `_layouts`, and `_sass` overrides
3. Keep v1 plugin wiring from the starter:
   - `theme: al_folio_core`
   - bundled `al_*` and `al_folio_*` gems in `Gemfile`
   - bundled plugin entries in `_config.yml`
4. Remove stale copied runtime files now owned by plugins unless they are intentional overrides.
5. Run upgrade checks:

```bash
bundle exec al-folio upgrade audit --no-fail
bundle exec al-folio upgrade overrides audit
```

6. For each stale or unacknowledged override:

```bash
bundle exec al-folio upgrade overrides diff LOCAL_PATH
bundle exec al-folio upgrade overrides accept LOCAL_PATH
```

7. Build and inspect key pages: home, CV, publications, repositories, projects, posts, and any custom routes.

## Migration Notes

Commit `.al-folio-overrides.yml` when the site intentionally keeps local overrides. It records the upstream plugin file checksum last reviewed so future gem updates can flag drift explicitly.

## Handoff

Report removed stale runtime files, retained local overrides, unresolved visual differences, and exact validation commands.
