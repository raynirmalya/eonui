export const figmaMapperGuide = {
  supportedTargets: ['custom-elements', 'react', 'angular', 'vue'],
  supportedLayouts: ['eon-stack', 'eon-grid', 'eon-section', 'eon-surface'],
  notes: [
    'Map design tokens to @eonui/tokens wherever possible instead of literal visual values.',
    'Prefer layout primitives for frames and groups before dropping to generic surfaces.',
    'Emit the same mapped tree across framework targets to keep parity high.'
  ]
} as const;
