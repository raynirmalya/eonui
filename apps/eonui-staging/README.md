# EonUI staging explorer

Local EonUI component explorer for reviewing the `@eonui/core` package in this monorepo.

## Run

```bash
pnpm dev:staging
```

Run this from the repository root. The command builds the packages and starts the explorer at `http://127.0.0.1:4310`. To restart only the explorer after the packages are built, run `pnpm --filter eonui-staging dev`.

The explorer reads the component build from `packages/eon-core` and the chart manifest from `packages/eon-manifest/generated/library.manifest.json`.

Mock screens and design notes are optional. By default, the server checks `docs/mock-screens` and `docs/eonui-element-design-docs`. Set `EONUI_MOCK_SCREENS_ROOT` or `EONUI_MOCK_DESIGN_DOCS_ROOT` to use local folders elsewhere. The explorer still runs when these folders are absent.

## What It Does

- lists every component from the local EonUI manifest
- shows features, props, events, methods, slots, parts, and CSS variables
- renders live working examples from the manifest where available
- generates fallback playgrounds for components that do not yet ship authored examples
- supports standalone preview mode for focused analysis
