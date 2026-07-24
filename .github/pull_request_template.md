## Summary

Describe what changed and why.

## Ownership Routing

- [ ] I confirmed this PR targets the correct repo based on `docs/BOUNDARIES.md`.
- [ ] This PR only changes starter-owned scope (`al-folio`) **or** I am porting a routed change and linked the owning repo issue/PR.

Owning repo (if not starter): <!-- e.g., al-org-dev/al-folio-core -->
Related issue/PR: <!-- link -->

## Plugin Ecosystem (if applicable)

- [ ] Not applicable
- [ ] This PR proposes a plugin for **featured-only** listing.
- [ ] This PR proposes a plugin for **bundled** starter inclusion.

If plugin-related, provide:

- Plugin repo URL:
- Gem name:
- Jekyll plugin id:
- Compatibility (`al_folio_min`/`al_folio_max`):
- Demo page/post path:
- Maintainer contact:

## Starter Wiring Changes

- [ ] Not applicable
- [ ] Updated `Gemfile` dependency wiring.
- [ ] Updated `_config.yml` plugin activation/config.
- [ ] Updated `_data/featured_plugins.yml` metadata.

## Validation

- [ ] `npm ci`
- [ ] `bundle exec jekyll build`
- [ ] `npm run lint:prettier`
- [ ] `npm run lint:style-contract`
- [ ] Integration tests (`test/integration_*.sh`) as needed
- [ ] Visual tests (`npm run test:visual`) as needed

## Notes

Compatibility, migration implications, and follow-ups:
