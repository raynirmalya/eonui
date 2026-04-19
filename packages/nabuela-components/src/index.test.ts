import { describe, expect, it } from 'vitest';
import { createNabuelaChart, createNabuelaChartDefinition } from './index';

describe('nabuela components', () => {
  it('creates chart definitions with shared options', () => {
    const definition = createNabuelaChartDefinition('line');
    expect(definition.options.legend).toBe(true);
    expect(definition.series.length).toBeGreaterThan(0);
  });

  it('renders multiple chart families through the shared API', () => {
    expect(createNabuelaChart({ type: 'bar', data: [{ label: 'Jan', value: 10 }] })).toContain('<svg');
    expect(createNabuelaChart({ type: 'pie', data: [{ label: 'A', value: 3 }] })).toContain('<svg');
  });

  it('renders advanced chart families through shared APIs', () => {
    expect(
      createNabuelaChart({
        type: 'grouped-bar',
        data: [{ label: 'Q1', values: [10, 12, 8] }]
      })
    ).toContain('Grouped bar chart');

    expect(
      createNabuelaChart({
        type: 'stacked-bar',
        data: [{ label: 'Q1', values: [10, 12, 8] }]
      })
    ).toContain('Stacked bar chart');

    expect(
      createNabuelaChart({
        type: 'waterfall',
        data: [
          { label: 'Start', value: 20 },
          { label: 'Growth', value: 10 },
          { label: 'Cost', value: -6 }
        ]
      })
    ).toContain('Waterfall chart');

    expect(
      createNabuelaChart({
        type: 'candlestick',
        data: [{ label: 'Mon', open: 10, high: 16, low: 8, close: 14 }]
      })
    ).toContain('Candlestick chart');

    expect(
      createNabuelaChart({
        type: 'combo',
        data: [{ label: 'Jan', bar: 22, line: 17 }]
      })
    ).toContain('Combo chart');
  });

  it('returns canvas renderers for dense chart families', () => {
    expect(
      createNabuelaChart({
        type: 'heatmap',
        data: [{ x: 0, y: 0, value: 3 }]
      })
    ).toContain('data-nabuela-renderer="heatmap"');

    expect(
      createNabuelaChart({
        type: 'treemap',
        data: [{ label: 'A', value: 10 }]
      })
    ).toContain('data-nabuela-renderer="treemap"');

    expect(
      createNabuelaChart({
        type: 'bubble',
        data: [{ x: 1, y: 2, value: 8 }],
        options: { renderer: 'canvas' }
      })
    ).toContain('data-nabuela-renderer="bubble"');
  });
});
