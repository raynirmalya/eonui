# Jarvis UI Architecture Overview

## Layers

1. `@jarvis/tokens` stores DTCG-like token JSON plus generated CSS and SCSS exports.
2. `@jarvis/styles` normalizes layers, responsive primitives, and theme utilities.
3. `@jarvis/core` ships Stencil-based Web Components with metadata colocated with source.
4. `@jarvis/manifest` turns colocated metadata into JSON for docs, AI agents, and Figma mapping.
5. `@jarvis/react`, `@jarvis/angular`, and `@jarvis/vue` provide framework-native ergonomics over the same custom elements.
6. `@mystique/*` provides a chart engine with renderer adapters and shared theme access.

## Source Of Truth

- Tokens are authored as JSON.
- Component metadata is authored beside each component.
- Docs, AI manifests, and framework docs are generated from source metadata.
- Figma mapping resolves design tokens and component variants through the manifest.
