export const guidePages = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    summary: 'Install Jarvis UI packages, register custom elements, and start composing token-driven layouts.',
    body: [
      'Jarvis UI is built around standards-based custom elements with framework wrappers for React, Angular, and Vue.',
      'Start with tokens, surface, stack, grid, and section primitives, then layer in form controls and overlays.',
      'Use generated manifests as the source of truth for props, events, slots, parts, and composition guidance.'
    ]
  },
  {
    slug: 'installation',
    title: 'Installation',
    summary: 'Choose the packages you need for core Web Components, framework wrappers, tokens, and charts.',
    body: [
      'Install @jarvis/core for the component platform and @jarvis/tokens for theme primitives.',
      'Add @jarvis/react, @jarvis/angular, or @jarvis/vue when working inside those frameworks.',
      'Use @mystique/components when you need chart rendering on top of the Jarvis design system.'
    ]
  },
  {
    slug: 'theming',
    title: 'Theming',
    summary: 'Apply light, dark, and density variants through generated CSS variable layers.',
    body: [
      'Jarvis tokens generate root variables plus theme and density selectors.',
      'Theme switching is designed around data attributes so product apps can toggle context at runtime.',
      'Components consume semantic and component tokens rather than hard-coded colors and spacing.'
    ]
  },
  {
    slug: 'accessibility',
    title: 'Accessibility',
    summary: 'Jarvis UI is designed with keyboard support, ARIA semantics, and focus visibility from the start.',
    body: [
      'Prefer native semantics when possible and augment with ARIA only where component behavior requires it.',
      'Use visible labels, helper text, error text, and focus management utilities together for form quality.',
      'Interactive overlays should restore focus and remain keyboard reachable.'
    ]
  },
  {
    slug: 'i18n',
    title: 'Internationalization',
    summary: 'Locale and direction support are first-class concerns across text, layout, and formatting.',
    body: [
      'Use @jarvis/i18n helpers for locale-aware number and date formatting.',
      'Avoid hard-coded copy inside reusable components and keep message patterns externalized.',
      'Prefer layout primitives and logical alignment so RTL behavior stays predictable.'
    ]
  },
  {
    slug: 'frameworks',
    title: 'Framework Usage',
    summary: 'React, Angular, and Vue wrappers keep custom elements approachable in framework-heavy codebases.',
    body: [
      'Use wrapper packages where you want framework-style imports and examples without losing the Web Component core.',
      'SSR and client registration concerns should be documented alongside product integration examples.',
      'The wrapper layer should mirror the manifest contract rather than invent a divergent component API.'
    ]
  },
  {
    slug: 'validation-workflows',
    title: 'Validation and Workflows',
    summary: 'Compose fields, helper text, errors, overlays, and review steps into understandable submit flows.',
    body: [
      'Treat validation as a workflow, not an afterthought. Show helper text before a field becomes invalid, then escalate to error text only when the user needs a correction.',
      'Pair field-level validation with review surfaces such as dialog, popup, and action-sheet so users can confirm a submission before it becomes final.',
      'Keep related controls grouped visually and semantically, especially for date ranges, uploads, reviewer assignment, and approval states.'
    ]
  },
  {
    slug: 'ai',
    title: 'AI Prompt Usage',
    summary: 'Jarvis manifests and prompt templates help agents generate valid component trees and safer layouts.',
    body: [
      'Use manifest metadata for allowed props, events, slots, parts, and composition rules.',
      'Prompt templates should constrain generation to valid Jarvis building blocks.',
      'AI output should be validated against generated manifests rather than undocumented assumptions.'
    ]
  },
  {
    slug: 'figma-mapping',
    title: 'Figma Mapping',
    summary: 'Structured design exports can be mapped onto Jarvis tokens, layout primitives, and components.',
    body: [
      'Token references should resolve to @jarvis/tokens rather than ad hoc visual values.',
      'Component variants should map to Jarvis public APIs and composition rules.',
      'Layout frames should prefer stack, grid, section, and surface primitives.'
    ]
  },
  {
    slug: 'migration-versioning',
    title: 'Migration and Versioning',
    summary: 'Generated manifests and changesets form the baseline for upgrade guidance and compatibility notes.',
    body: [
      'Versioning should be automated and traceable through package-level changesets.',
      'Manifest changes should surface API additions, removals, and behavior shifts.',
      'Migration docs should explain both component-level and token-level changes.'
    ]
  }
] as const;

export type GuidePage = (typeof guidePages)[number];
