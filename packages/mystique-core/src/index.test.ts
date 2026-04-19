import { describe, expect, it } from 'vitest';
import {
  MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET,
  MYSTIQUE_CHART_CATALOG_SIZE,
  createChartDefinition,
  createSampleChartData,
  getFullyImplementedChartNames,
  getChartVariantName,
  getMystiqueChartManifest,
  getSupportedImplementedVariants,
  isFullyImplementedChart,
  mystiqueGuide,
  resolveChartType,
  resolveRenderer
} from './index';

describe('mystique core catalog', () => {
  it('targets the expanded chart catalog size', () => {
    expect(getMystiqueChartManifest().length).toBe(MYSTIQUE_CHART_CATALOG_SIZE);
  });

  it('resolves generated chart variants back to their implemented base family', () => {
    expect(resolveChartType('line-sparkline-9')).toBe('line');
    expect(resolveChartType('box-plot-large-data-1')).toBe('box-plot');
    expect(resolveChartType('grouped-bar-hierarchical-9')).toBe('grouped-bar');
    expect(resolveChartType('line-forecast-band')).toBe('line');
    expect(resolveChartType('network-topology-health')).toBe('network');
    expect(getChartVariantName('line-sparkline-9')).toBe('sparkline');
    expect(getChartVariantName('line-forecast-band')).toBe('forecast-band');
    expect(getChartVariantName('network-topology-health')).toBe('topology-health');
  });

  it('tracks 700 fully implemented chart entries inside the larger catalog', () => {
    const implemented = getFullyImplementedChartNames();
    expect(implemented.length).toBe(MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET);
    expect(new Set(implemented).size).toBe(MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET);
    expect(isFullyImplementedChart('line')).toBe(true);
    expect(isFullyImplementedChart('line-forecast-band')).toBe(true);
    expect(isFullyImplementedChart('treemap-drilldown-workbench')).toBe(true);
    expect(isFullyImplementedChart('pie-control-room')).toBe(true);
    expect(isFullyImplementedChart('treemap-control-room')).toBe(true);
    expect(isFullyImplementedChart('scatter-realtime-queue')).toBe(true);
    expect(isFullyImplementedChart('network-realtime-queue')).toBe(true);
    expect(isFullyImplementedChart('line-cohort-breakdown')).toBe(true);
    expect(isFullyImplementedChart('pie-ranking-shift')).toBe(true);
    expect(isFullyImplementedChart('heatmap-tapered-flow')).toBe(true);
    expect(isFullyImplementedChart('line-sparkline-1')).toBe(true);
    expect(isFullyImplementedChart('area-baseline-1')).toBe(true);
    expect(isFullyImplementedChart('scatter-faded-1')).toBe(true);
    expect(isFullyImplementedChart('bubble-animated-1')).toBe(true);
    expect(isFullyImplementedChart('pie-multi-resolution')).toBe(true);
    expect(isFullyImplementedChart('donut-seasonal-decomposition')).toBe(true);
    expect(isFullyImplementedChart('radar-timeline-1')).toBe(true);
    expect(isFullyImplementedChart('funnel-streaming-1')).toBe(true);
    expect(isFullyImplementedChart('heatmap-dense-1')).toBe(true);
    expect(isFullyImplementedChart('treemap-small-multiples')).toBe(true);
    expect(isFullyImplementedChart('network-forecast-band')).toBe(true);
    expect(isFullyImplementedChart('sankey-multi-axis-1')).toBe(true);
    expect(isFullyImplementedChart('pie-comparison-1')).toBe(true);
    expect(getSupportedImplementedVariants('network')).toContain('forecast-band');
    expect(getSupportedImplementedVariants('sankey')).toContain('multi-axis');
  });

  it('supports explicit svg and canvas requests for any chart type', () => {
    expect(resolveRenderer('heatmap', 'svg')).toBe('svg');
    expect(resolveRenderer('pie', 'canvas')).toBe('canvas');
    expect(resolveRenderer('line')).toBe('hybrid');
  });

  it('creates sample data and definitions for the full chart catalog', () => {
    for (const chart of getMystiqueChartManifest()) {
      const data = createSampleChartData(chart.name);
      const definition = createChartDefinition(chart.name);
      expect(data.length).toBeGreaterThan(0);
      expect(definition.series.length).toBeGreaterThan(0);
      expect(definition.dataShape.length).toBeGreaterThan(0);
      expect(definition.options.motion.durationMs).toBeGreaterThan(0);
      expect(Object.keys(definition.scales).length).toBeGreaterThan(0);
    }
  });

  it('exposes guide content for docs and implementation notes', () => {
    expect(mystiqueGuide.interactions.length).toBeGreaterThan(0);
    expect(mystiqueGuide.rendering.length).toBeGreaterThan(0);
    expect(mystiqueGuide.composition.length).toBeGreaterThan(0);
  });
});
