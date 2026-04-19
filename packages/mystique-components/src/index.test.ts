import { describe, expect, it } from 'vitest';
import { MYSTIQUE_CHART_CATALOG_SIZE } from '@mystique/core';
import { createMystiqueCatalogPreviews, createMystiqueChartPreview } from './index';

describe('mystique components api', () => {
  it('creates dual-render previews for individual chart variants', () => {
    const preview = createMystiqueChartPreview('heatmap-dense-9', { title: 'Heatmap dense' });
    expect(preview.data.length).toBeGreaterThan(0);
    expect(preview.svg).toContain('<svg');
    expect(preview.svg).toContain('data-scale-color="linear"');
    expect(preview.svg).toContain('data-motion-preset=');
    expect(preview.canvas).toContain('<canvas');
    expect(preview.canvas).toContain('data-mystique-motion-preset=');
    expect(preview.canvas).toContain('data-scale-color="linear"');
  });

  it('creates dual-render previews for the full chart catalog', () => {
    const previews = createMystiqueCatalogPreviews();
    expect(previews.length).toBe(MYSTIQUE_CHART_CATALOG_SIZE);
    expect(previews.every((preview) => preview.svg.includes('<svg'))).toBe(true);
    expect(previews.every((preview) => preview.canvas.includes('<canvas'))).toBe(true);
  });
});
