# Jarvis UI Monorepo

Jarvis UI is a production-oriented cross-framework design system platform built on Web Components with Stencil. Mystique is its companion D3-ready charting platform with shared theming, manifest metadata, and AI-friendly generation rules.

## Packages

- `@jarvis/core`: standards-based component library
- `@jarvis/react`, `@jarvis/angular`, `@jarvis/vue`: framework wrappers
- `@jarvis/tokens`: source-of-truth design tokens
- `@jarvis/manifest`: generated component and chart metadata
- `@jarvis/ai-prompts`: prompt templates and agent rules
- `@mystique/*`: chart engine, renderers, and components (targeting 200 D3-style chart definitions)

## Quick Start

```bash
pnpm install
pnpm build:packages
pnpm docs:generate
pnpm dev:docs
```

See [architecture overview](./docs/architecture/overview.md).
