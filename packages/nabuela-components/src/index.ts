import { drawHeatmap, drawScatterPlot, drawTreemap } from '@nabuela/canvas';
import { createChartDefinition, createChartOptions, type ChartOptions, type ChartType } from '@nabuela/core';
import {
  renderSvgAreaChart,
  renderSvgBarChart,
  renderSvgCandlestickChart,
  renderSvgComboChart,
  renderSvgDonutChart,
  renderSvgFunnelChart,
  renderSvgGroupedBarChart,
  renderSvgHistogramChart,
  renderSvgLineChart,
  renderSvgPieChart,
  renderSvgRadarChart,
  renderSvgScatterChart,
  renderSvgStackedBarChart,
  renderSvgWaterfallChart
} from '@nabuela/svg';

export function createNabuelaChart(config: {
  type: ChartType;
  data: Array<{
    label?: string;
    value?: number;
    x?: number;
    y?: number;
    values?: number[];
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    bar?: number;
    line?: number;
  }>;
  options?: Partial<ChartOptions>;
}): string {
  const options = createChartOptions(config.type, config.options);
  const width = options.width ?? 640;
  const height = options.height ?? 320;

  if (config.type === 'bar') {
    return renderSvgBarChart(
      config.data.map((item) => ({ label: String(item.label ?? ''), value: Number(item.value ?? 0) })),
      width,
      height
    );
  }

  if (config.type === 'grouped-bar') {
    return renderSvgGroupedBarChart(
      config.data.map((item) => ({
        label: String(item.label ?? ''),
        values: item.values?.map((value) => Number(value)) ?? [Number(item.value ?? 0)]
      })),
      width,
      height
    );
  }

  if (config.type === 'stacked-bar') {
    return renderSvgStackedBarChart(
      config.data.map((item) => ({
        label: String(item.label ?? ''),
        values: item.values?.map((value) => Number(value)) ?? [Number(item.value ?? 0)]
      })),
      width,
      height
    );
  }

  if (config.type === 'histogram') {
    return renderSvgHistogramChart(
      config.data.map((item) => ({ label: String(item.label ?? ''), value: Number(item.value ?? 0) })),
      width,
      height
    );
  }

  if (config.type === 'waterfall') {
    return renderSvgWaterfallChart(
      config.data.map((item) => ({ label: String(item.label ?? ''), value: Number(item.value ?? 0) })),
      width,
      height
    );
  }

  if (config.type === 'funnel') {
    return renderSvgFunnelChart(
      config.data.map((item) => ({ label: String(item.label ?? ''), value: Number(item.value ?? 0) })),
      width,
      height
    );
  }

  if (config.type === 'pie' || config.type === 'donut') {
    const source = config.type === 'donut' ? renderSvgDonutChart : renderSvgPieChart;
    return source(
      config.data.map((item) => ({ label: String(item.label ?? ''), value: Number(item.value ?? 0) }))
    );
  }

  if (config.type === 'area') {
    return renderSvgAreaChart(
      config.data.map((item, index) => ({ x: Number(item.x ?? index), y: Number(item.y ?? item.value ?? 0) })),
      width,
      height
    );
  }

  if (config.type === 'scatter' || config.type === 'bubble') {
    if (options.renderer === 'canvas') {
      return `<canvas data-nabuela-renderer="${config.type}" width="${width}" height="${height}"></canvas>`;
    }

    return renderSvgScatterChart(
      config.data.map((item, index) => ({
        x: Number(item.x ?? index),
        y: Number(item.y ?? item.value ?? 0),
        r: config.type === 'bubble' ? Math.max(Number(item.value ?? 0), 4) : 5
      })),
      width,
      height
    );
  }

  if (config.type === 'radar') {
    return renderSvgRadarChart(config.data.map((item, index) => ({ label: String(item.label ?? `Item ${index + 1}`), value: Number(item.value ?? 0) })));
  }

  if (config.type === 'candlestick') {
    return renderSvgCandlestickChart(
      config.data.map((item, index) => ({
        label: String(item.label ?? `Day ${index + 1}`),
        open: Number(item.open ?? item.value ?? 0),
        high: Number(item.high ?? item.value ?? 0),
        low: Number(item.low ?? item.value ?? 0),
        close: Number(item.close ?? item.value ?? 0)
      })),
      width,
      height
    );
  }

  if (config.type === 'combo') {
    return renderSvgComboChart(
      config.data.map((item) => ({
        label: String(item.label ?? ''),
        bar: Number(item.bar ?? item.value ?? 0),
        line: Number(item.line ?? item.y ?? item.value ?? 0)
      })),
      width,
      height
    );
  }

  if (config.type === 'heatmap' || config.type === 'treemap') {
    return `<canvas data-nabuela-renderer="${config.type}" width="${width}" height="${height}"></canvas>`;
  }

  return renderSvgLineChart(
    config.data.map((item, index) => ({ x: Number(item.x ?? index), y: Number(item.y ?? item.value ?? 0) })),
    width,
    height
  );
}

export function createNabuelaChartDefinition(type: ChartType, options: Partial<ChartOptions> = {}) {
  return createChartDefinition(type, options);
}

export function defineNabuelaChartElement(): void {
  if (typeof window === 'undefined' || customElements.get('nabuela-chart')) {
    return;
  }

  class NabuelaChartElement extends HTMLElement {
    connectedCallback() {
      const type = (this.getAttribute('type') as ChartType | null) ?? 'line';
      const rawData = this.getAttribute('data');
      const data = rawData
        ? (JSON.parse(rawData) as Array<{
            label?: string;
            value?: number;
            x?: number;
            y?: number;
            values?: number[];
            open?: number;
            high?: number;
            low?: number;
            close?: number;
            bar?: number;
            line?: number;
          }>)
        : [];
      this.innerHTML = createNabuelaChart({ type, data });

      const canvas = this.querySelector('canvas[data-nabuela-renderer]') as HTMLCanvasElement | null;
      if (canvas?.getContext) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (type === 'heatmap') {
            drawHeatmap(
              ctx,
              data.map((item, index) => ({
                x: Number(item.x ?? index % 4),
                y: Number(item.y ?? Math.floor(index / 4)),
                value: Number(item.value ?? 0)
              })),
              canvas.width,
              canvas.height
            );
          }

          if (type === 'treemap') {
            drawTreemap(
              ctx,
              data.map((item, index) => ({
                label: String(item.label ?? `Item ${index + 1}`),
                value: Number(item.value ?? 0)
              })),
              canvas.width,
              canvas.height
            );
          }

          if (type === 'scatter' || type === 'bubble') {
            drawScatterPlot(
              ctx,
              data.map((item, index) => ({
                x: Number(item.x ?? index),
                y: Number(item.y ?? item.value ?? 0),
                value: type === 'bubble' ? Number(item.value ?? 5) : 5
              })),
              canvas.width,
              canvas.height
            );
          }
        }
      }
    }
  }

  customElements.define('nabuela-chart', NabuelaChartElement);
}
