# Eon UI Architecture Overview

## Layers

1. `@eonui/tokens` stores DTCG-like token JSON plus generated CSS and SCSS exports.
2. `@eonui/styles` normalizes layers, responsive primitives, and theme utilities.
3. `@eonui/core` ships Stencil-based Web Components with metadata colocated with source.
4. `@eonui/manifest` turns colocated metadata into JSON for docs, AI agents, and Figma mapping.
5. `@eonui/react`, `@eonui/angular`, and `@eonui/vue` provide framework-native ergonomics over the same custom elements.
6. `@eonui/charts*` provides a chart engine with renderer adapters and shared theme access.

## Source Of Truth

- Tokens are authored as JSON.
- Component metadata is authored beside each component.
- Docs, AI manifests, and framework docs are generated from source metadata.
- Figma mapping resolves design tokens and component variants through the manifest.
