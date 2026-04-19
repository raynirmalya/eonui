import { describe, expect, it } from 'vitest';
import { createSampleChartData, getMystiqueChartManifest } from '@mystique/core';
import { renderMystiqueSvgChart } from './index';

describe('mystique svg renderers', () => {
  it('renders the full expanded chart catalog to SVG markup', () => {
    for (const chart of getMystiqueChartManifest()) {
      const markup = renderMystiqueSvgChart({
        type: chart.name,
        data: createSampleChartData(chart.name) as Array<Record<string, unknown>>,
        options: {
          title: chart.name,
          width: 640,
          height: 320
        }
      });

      expect(markup).toContain('<svg');
      expect(markup).toContain('role="img"');
      expect(markup).toContain('data-chart-type=');
    }
  });

  it('renders advanced line and network variants with explicit variant layers', () => {
    const forecastMarkup = renderMystiqueSvgChart({
      type: 'line-forecast-band',
      data: createSampleChartData('line-forecast-band') as Array<Record<string, unknown>>,
      options: {
        title: 'Forecast',
        width: 640,
        height: 320
      }
    });
    const topologyMarkup = renderMystiqueSvgChart({
      type: 'network-topology-health',
      data: createSampleChartData('network-topology-health') as Array<Record<string, unknown>>,
      options: {
        title: 'Topology',
        width: 640,
        height: 320
      }
    });
    const treemapMarkup = renderMystiqueSvgChart({
      type: 'treemap-control-room',
      data: createSampleChartData('treemap-control-room') as Array<Record<string, unknown>>,
      options: {
        title: 'Treemap',
        width: 640,
        height: 320
      }
    });
    const scatterMarkup = renderMystiqueSvgChart({
      type: 'scatter-realtime-queue',
      data: createSampleChartData('scatter-realtime-queue') as Array<Record<string, unknown>>,
      options: {
        title: 'Scatter',
        width: 640,
        height: 320
      }
    });
    const cohortMarkup = renderMystiqueSvgChart({
      type: 'line-cohort-breakdown',
      data: createSampleChartData('line-cohort-breakdown') as Array<Record<string, unknown>>,
      options: {
        title: 'Cohort',
        width: 640,
        height: 320
      }
    });
    const rankingMarkup = renderMystiqueSvgChart({
      type: 'pie-ranking-shift',
      data: createSampleChartData('pie-ranking-shift') as Array<Record<string, unknown>>,
      options: {
        title: 'Ranking',
        width: 640,
        height: 320
      }
    });
    const sparklineMarkup = renderMystiqueSvgChart({
      type: 'line-sparkline-1',
      data: createSampleChartData('line-sparkline-1') as Array<Record<string, unknown>>,
      options: {
        title: 'Sparkline',
        width: 640,
        height: 320
      }
    });
    const denseHeatmapMarkup = renderMystiqueSvgChart({
      type: 'heatmap-dense-1',
      data: createSampleChartData('heatmap-dense-1') as Array<Record<string, unknown>>,
      options: {
        title: 'Dense',
        width: 640,
        height: 320
      }
    });
    const streamingFunnelMarkup = renderMystiqueSvgChart({
      type: 'funnel-streaming-1',
      data: createSampleChartData('funnel-streaming-1') as Array<Record<string, unknown>>,
      options: {
        title: 'Streaming',
        width: 640,
        height: 320
      }
    });
    const polarFocusMarkup = renderMystiqueSvgChart({
      type: 'pie-multi-resolution',
      data: createSampleChartData('pie-multi-resolution') as Array<Record<string, unknown>>,
      options: {
        title: 'Polar',
        width: 640,
        height: 320
      }
    });

    expect(forecastMarkup).toContain('data-chart-variant="forecast-band"');
    expect(forecastMarkup).toContain('data-variant-layer="forecast-band"');
    expect(forecastMarkup).toContain('data-scale-x="time"');
    expect(forecastMarkup).toContain('data-motion-preset="draw"');
    expect(topologyMarkup).toContain('data-chart-variant="topology-health"');
    expect(treemapMarkup).toContain('data-variant-layer="control-room"');
    expect(scatterMarkup).toContain('data-variant-layer="realtime-queue"');
    expect(cohortMarkup).toContain('data-variant-layer="cohort-breakdown"');
    expect(rankingMarkup).toContain('data-variant-layer="ranking-shift"');
    expect(sparklineMarkup).toContain('data-variant-layer="sparkline"');
    expect(denseHeatmapMarkup).toContain('data-variant-layer="dense"');
    expect(streamingFunnelMarkup).toContain('data-variant-layer="streaming"');
    expect(polarFocusMarkup).toContain('data-variant-layer="multi-resolution"');
    expect(topologyMarkup).toContain('data-motion-enabled="true"');
  });
});
