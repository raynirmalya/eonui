# Eon UI Monorepo

Eon UI is a production-oriented cross-framework design system platform built on Web Components with Stencil. Mystique is its companion D3-ready charting platform with shared theming, manifest metadata, and AI-friendly generation rules.

## Repository Boundary

This public repository is the source of truth for the reusable EonUI package layer and the public development tooling that supports it.

Keep package and public-docs work here:

- `packages/*`
- `apps/*`
- `docs/*`
- `tools/*`

Do not treat this repository as the home for private platform work. The following live in separate private repositories:

- `eonui-private`
  Internal platform work, API planning, release helpers, and private integration surfaces.
- `eonui-staging-private`
  Local staging and component validation flows.
- `eonui-marketing-private`
  Private marketing-site and product-story experiments.

If a change affects a reusable package or its public documentation, it should land here first. Private product work can mirror or consume these packages, but this repo stays the canonical shared component source.

## Packages

- `@eonui/core`: standards-based component library
- `@eonui/react`, `@eonui/angular`, `@eonui/vue`: framework wrappers
- `@eonui/tokens`: source-of-truth design tokens
- `@eonui/manifest`: generated component and chart metadata
- `@eonui/ai-prompts`: prompt templates and agent rules
- `@eonui/charts*`: chart engine, renderers, and components (targeting 200 D3-style chart definitions)

## Quick Start

```bash
pnpm install
pnpm build:packages
pnpm docs:generate
pnpm dev:docs
```

See [architecture overview](./docs/architecture/overview.md).
