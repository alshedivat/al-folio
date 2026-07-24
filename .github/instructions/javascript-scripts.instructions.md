# JavaScript Instructions (v1.x)

Scope: starter JS and related setup scripts

## Ownership

- Starter JS should be limited to orchestration/integration behavior.
- Feature runtime JS belongs in owning plugin repos.

## Guidance

- Do not copy plugin-owned search/icon/math/image runtime code into starter.
- Keep starter scripts framework-agnostic and compatible with plugin contracts.
- Prefer deterministic behavior suitable for integration/visual tests.

## Validation

Use the validated command set in `AGENTS.md`.
