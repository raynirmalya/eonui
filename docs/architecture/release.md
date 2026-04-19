# Release And Publish Readiness

## Goals

- npm-publishable package metadata
- repeatable versioning through changesets
- CI entry points for validation and release preparation

## Required Commands

```bash
pnpm install
pnpm verify
pnpm release:check
pnpm release:prepare
pnpm version-packages
pnpm release
```

## Publish Checklist

- Verify package exports, `main`, `types`, and `exports` entry points
- Regenerate manifests and docs artifacts
- Run `pnpm release:check`
- Review changesets before publishing
- Publish only from the main release branch through the release workflow

## Workflow

- `pnpm release:check` runs the workspace verification loop plus release metadata tests
- `pnpm release:prepare` regenerates docs/manifests and applies version bumps from changesets
- `.github/workflows/release.yml` uses `changesets/action` to either open a release PR or publish with `NPM_TOKEN`
