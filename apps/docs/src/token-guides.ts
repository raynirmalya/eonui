import { themeCatalog, tokenCatalog } from '@jarvis/styles';

export const tokenGuide = {
  families: themeCatalog.families,
  themes: themeCatalog.themes,
  density: themeCatalog.density,
  featuredTokens: tokenCatalog.filter((entry) =>
    [
      'semantic.surface.canvas',
      'semantic.text.primary',
      'semantic.border.focus',
      'semantic.chart.axis',
      'component.button.radius',
      'component.dialog.padding',
      'component.layout.gap'
    ].includes(entry.key)
  )
} as const;
