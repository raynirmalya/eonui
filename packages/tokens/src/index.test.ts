import { describe, expect, it } from 'vitest';
import { createCssVariables, createDensityCss, createThemeBundleCss, createThemeCatalog, createThemeCss, createThemeFamilyCss, createTokenCatalog } from './index';

describe('tokens', () => {
  it('creates css variables', () => {
    const css = createCssVariables();
    expect(css).toContain('--jarvis-semantic-text-primary');
    expect(css).toContain('#101828');
    expect(css).not.toContain('{base.');
  });

  it('creates theme css selectors', () => {
    const css = createThemeCss('dark');
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain('--jarvis-semantic-text-primary');
  });

  it('creates theme family css selectors', () => {
    const css = createThemeFamilyCss('generic');
    expect(css).toContain('[data-theme-family="generic"]');
    expect(css).toContain('--jarvis-semantic-action-primaryBg');
  });

  it('creates density css selectors', () => {
    const css = createDensityCss('compact');
    expect(css).toContain('[data-density="compact"]');
    expect(css).toContain('--jarvis-space-controlY');
  });

  it('creates a full theme bundle', () => {
    const css = createThemeBundleCss();
    expect(css).toContain('[data-theme-family="generic"]');
    expect(css).toContain('[data-theme="light"]');
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain('[data-density="comfortable"]');
  });

  it('creates token and theme catalogs for docs consumption', () => {
    const tokenCatalog = createTokenCatalog();
    const themeCatalog = createThemeCatalog();
    expect(tokenCatalog.some((entry) => entry.key === 'semantic.chart.axis')).toBe(true);
    expect(themeCatalog.families.map((entry) => entry.name).sort()).toEqual(['fluent', 'generic', 'material'].sort());
    expect(themeCatalog.themes.map((entry) => entry.name).sort()).toEqual(['dark', 'highContrast', 'light', 'premium'].sort());
    expect(themeCatalog.density.map((entry) => entry.name).sort()).toEqual(['comfortable', 'compact'].sort());
  });
});
