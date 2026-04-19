import { describe, expect, it, vi } from 'vitest';
import { createSampleChartData, getMystiqueChartManifest } from '@mystique/core';
import { drawMystiqueChart } from './index';

function createMockContext(): CanvasRenderingContext2D {
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    closePath: vi.fn(),
    setLineDash: vi.fn(),
    strokeRect: vi.fn(),
    set fillStyle(value: string) {
      void value;
    },
    set strokeStyle(value: string) {
      void value;
    },
    set lineWidth(value: number) {
      void value;
    },
    set font(value: string) {
      void value;
    },
    set textAlign(value: CanvasTextAlign) {
      void value;
    },
    set lineJoin(value: CanvasLineJoin) {
      void value;
    },
    set lineCap(value: CanvasLineCap) {
      void value;
    }
  } as unknown as CanvasRenderingContext2D;
}

describe('mystique canvas renderers', () => {
  it('draws the full expanded chart catalog without throwing', () => {
    const ctx = createMockContext();

    for (const chart of getMystiqueChartManifest()) {
      expect(() =>
        drawMystiqueChart(
          ctx,
          chart.name,
          createSampleChartData(chart.name) as Array<Record<string, unknown>>,
          640,
          320,
          chart.name
        )
      ).not.toThrow();
    }

    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.beginPath).toHaveBeenCalled();
  });

  it('draws newly promoted advanced variants without throwing', () => {
    const ctx = createMockContext();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'treemap-control-room',
        createSampleChartData('treemap-control-room') as Array<Record<string, unknown>>,
        640,
        320,
        'Treemap'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'network-realtime-queue',
        createSampleChartData('network-realtime-queue') as Array<Record<string, unknown>>,
        640,
        320,
        'Network'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'line-cohort-breakdown',
        createSampleChartData('line-cohort-breakdown') as Array<Record<string, unknown>>,
        640,
        320,
        'Cohort'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'pie-ranking-shift',
        createSampleChartData('pie-ranking-shift') as Array<Record<string, unknown>>,
        640,
        320,
        'Ranking'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'line-sparkline-1',
        createSampleChartData('line-sparkline-1') as Array<Record<string, unknown>>,
        640,
        320,
        'Sparkline'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'heatmap-dense-1',
        createSampleChartData('heatmap-dense-1') as Array<Record<string, unknown>>,
        640,
        320,
        'Dense'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'funnel-streaming-1',
        createSampleChartData('funnel-streaming-1') as Array<Record<string, unknown>>,
        640,
        320,
        'Streaming'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'network-forecast-band',
        createSampleChartData('network-forecast-band') as Array<Record<string, unknown>>,
        640,
        320,
        'Network forecast'
      )
    ).not.toThrow();

    expect(() =>
      drawMystiqueChart(
        ctx,
        'sankey-multi-axis-1',
        createSampleChartData('sankey-multi-axis-1') as Array<Record<string, unknown>>,
        640,
        320,
        'Sankey multi-axis'
      )
    ).not.toThrow();
  });
});
