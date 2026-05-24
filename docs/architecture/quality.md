# Quality Strategy

## Current Layers

- unit tests in packages and apps
- contract tests for manifests, wrappers, tokens, and release metadata
- accessibility smoke tests for core controls, overlays, and navigation widgets
- playground-backed integration smoke examples for Eon and Mystique
- visual regression workflow placeholder

## Next Layers

- Stencil interaction tests for core components
- accessibility assertions for key controls and overlays
- Storybook snapshot or screenshot regression coverage
- chart renderer parity tests between SVG and Canvas paths

## Workspace Commands

```bash
pnpm test:a11y
pnpm test:contracts
pnpm test:quality
pnpm verify
```

## Minimum Validation Loop

```bash
pnpm build:packages
pnpm test
pnpm docs:generate
```
