import { describe, expect, it } from 'vitest';
import {
  applyZoomPan,
  createChartDefinition,
  createChartOptions,
  createChartTheme,
  createLegendState,
  createLinearScale,
  createLogScale,
  createRadialScale,
  createSelectionState,
  createSeriesConfig,
  createTooltipState,
  createZoomPanState,
  hideTooltip,
  nabuelaGuide,
  showTooltip,
  toggleLegendKey,
  toggleSelection
} from './index';

describe('linear scale', () => {
  it('maps domain to range', () => {
    expect(createLinearScale([0, 10], [0, 100]).map(5)).toBe(50);
  });

  it('creates logarithmic scales and chart options', () => {
    expect(createLogScale([1, 100], [0, 2]).map(10)).toBeGreaterThan(0);
    expect(createRadialScale([0, 10], [0, 100]).map(5)).toBe(50);
    expect(createChartOptions('heatmap').renderer).toBe('canvas');
  });

  it('creates default series config for known chart types', () => {
    expect(createSeriesConfig('line')[0]?.type).toBe('line');
    expect(createSeriesConfig('pie')[0]?.type).toBe('arc');
  });

  it('creates and updates interaction states', () => {
    const tooltip = showTooltip(createTooltipState<{ value: number }>(), { value: 12 }, 10, 20);
    expect(tooltip.open).toBe(true);
    expect(hideTooltip(tooltip).open).toBe(false);

    const legend = toggleLegendKey(createLegendState(['a', 'b']), 'a');
    expect(legend.activeKeys).not.toContain('a');

    const selection = toggleSelection(createSelectionState<object>(), { id: 1 });
    expect(selection.selected).toHaveLength(1);

    const zoomPan = applyZoomPan(createZoomPanState(), { scale: 2, offsetX: 10 });
    expect(zoomPan.scale).toBe(2);
    expect(zoomPan.offsetX).toBe(10);
  });

  it('exposes guide metadata for docs and tooling', () => {
    expect(nabuelaGuide.interactions.length).toBeGreaterThan(0);
    expect(nabuelaGuide.rendering.length).toBeGreaterThan(0);
    expect(nabuelaGuide.composition.length).toBeGreaterThan(0);
  });

  it('creates themed chart definitions', () => {
    const theme = createChartTheme({ axis: '#000000' });
    const definition = createChartDefinition('combo', { title: 'Revenue mix' });
    expect(theme.series.length).toBeGreaterThan(0);
    expect(definition.type).toBe('combo');
    expect(definition.options.theme?.axis).toBeTruthy();
    expect(definition.series.length).toBeGreaterThan(0);
  });
});
