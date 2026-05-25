import { describe, expect, it } from 'vitest';
import { toolCategories, toolEngineBlueprints, toolImplementationWaves } from './tool-taxonomy';

describe('tool taxonomy catalog', () => {
  it('covers the full category map with a large enough initial backlog', () => {
    expect(toolCategories).toHaveLength(18);
    expect(toolCategories.every((category) => category.tools.length >= 20)).toBe(true);
    expect(toolCategories.reduce((count, category) => count + category.tools.length, 0)).toBeGreaterThanOrEqual(360);
  });

  it('keeps every category grounded in reusable engines and reference products', () => {
    const engineSlugs = new Set(toolEngineBlueprints.map((engine) => engine.slug));

    toolCategories.forEach((category) => {
      expect(category.engineSlugs.length).toBeGreaterThanOrEqual(1);
      expect(category.engineSlugs.every((slug) => engineSlugs.has(slug))).toBe(true);
      expect(category.referenceProducts.length).toBeGreaterThanOrEqual(2);
      expect(category.accuracyNotes.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('maps the launch waves to real categories', () => {
    const categoryNames = new Set(toolCategories.map((category) => category.name));

    toolImplementationWaves.forEach((wave) => {
      expect(wave.categories.length).toBeGreaterThanOrEqual(3);
      expect(wave.categories.every((categoryName) => categoryNames.has(categoryName))).toBe(true);
    });
  });
});
