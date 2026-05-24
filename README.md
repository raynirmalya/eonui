# Eon UI Monorepo

Eon UI is a production-oriented cross-framework design system platform built on Web Components with Stencil. Mystique is its companion D3-ready charting platform with shared theming, manifest metadata, and AI-friendly generation rules.

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
