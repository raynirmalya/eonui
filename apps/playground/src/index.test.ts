import { describe, expect, it } from 'vitest';
import { playgroundExamples } from './examples';

describe('playground examples', () => {
  it('exposes a manifest-backed Eon preview', () => {
    expect(playgroundExamples.EonPreview).toContain('eon-');
  });

  it('exposes a chart preview for Mystique integration smoke testing', () => {
    expect(playgroundExamples.chartPreview).toContain('Combo chart');
    expect(playgroundExamples.chartCanvasPreview).toContain('<canvas');
  });

  it('tracks the expanded chart catalog in playground metadata', () => {
    expect(playgroundExamples.chartCatalogCount).toBe(700);
    expect(playgroundExamples.fullyImplementedChartCount).toBe(700);
    expect(playgroundExamples.featuredCharts.length).toBeGreaterThan(0);
  });

  it('documents the role of the playground in the quality loop', () => {
    expect(playgroundExamples.notes.length).toBeGreaterThan(2);
  });
});
