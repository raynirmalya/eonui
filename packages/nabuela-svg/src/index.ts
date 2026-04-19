import { createBandScale, createLinearScale, linePath } from '@nabuela/core';

const defaultPalette = ['#115e59', '#0f766e', '#15803d', '#b45309', '#b91c1c', '#4338ca'];

function clampMax(values: number[]): number {
  return Math.max(...values, 1);
}

export function renderSvgBarChart(data: Array<{ label: string; value: number }>, width = 640, height = 320): string {
  const x = createBandScale(
    data.map((item) => item.label),
    [40, width - 20]
  );
  const max = Math.max(...data.map((item) => item.value), 0);
  const y = createLinearScale([0, max || 1], [height - 32, 24]);

  const bars = data
    .map((item) => {
      const barX = x.map(item.label);
      const top = y.map(item.value);
      const barHeight = height - 32 - top;
      return `<rect x="${barX}" y="${top}" width="${x.bandwidth}" height="${barHeight}" rx="8" fill="#115e59" />`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart">${bars}</svg>`;
}

export function renderSvgGroupedBarChart(
  data: Array<{ label: string; values: number[] }>,
  width = 640,
  height = 320
): string {
  const x = createBandScale(
    data.map((item) => item.label),
    [40, width - 20]
  );
  const seriesCount = Math.max(...data.map((item) => item.values.length), 1);
  const innerWidth = x.bandwidth / seriesCount;
  const max = clampMax(data.flatMap((item) => item.values));
  const y = createLinearScale([0, max], [height - 32, 24]);

  const bars = data
    .flatMap((item) =>
      item.values.map((value, seriesIndex) => {
        const barX = x.map(item.label) + innerWidth * seriesIndex;
        const top = y.map(value);
        const barHeight = height - 32 - top;
        return `<rect x="${barX}" y="${top}" width="${Math.max(innerWidth - 4, 4)}" height="${barHeight}" rx="6" fill="${defaultPalette[seriesIndex % defaultPalette.length]}" />`;
      })
    )
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grouped bar chart">${bars}</svg>`;
}

export function renderSvgStackedBarChart(
  data: Array<{ label: string; values: number[] }>,
  width = 640,
  height = 320
): string {
  const x = createBandScale(
    data.map((item) => item.label),
    [40, width - 20]
  );
  const max = clampMax(data.map((item) => item.values.reduce((sum, value) => sum + value, 0)));
  const y = createLinearScale([0, max], [height - 32, 24]);

  const bars = data
    .map((item) => {
      let runningTotal = 0;
      return item.values
        .map((value, seriesIndex) => {
          const segmentTop = y.map(runningTotal + value);
          const currentBottom = y.map(runningTotal);
          runningTotal += value;
          return `<rect x="${x.map(item.label)}" y="${segmentTop}" width="${x.bandwidth}" height="${currentBottom - segmentTop}" rx="4" fill="${defaultPalette[seriesIndex % defaultPalette.length]}" />`;
        })
        .join('');
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Stacked bar chart">${bars}</svg>`;
}

export function renderSvgLineChart(data: Array<{ x: number; y: number }>, width = 640, height = 320): string {
  const x = createLinearScale([Math.min(...data.map((item) => item.x)), Math.max(...data.map((item) => item.x))], [24, width - 24]);
  const y = createLinearScale([0, Math.max(...data.map((item) => item.y), 0)], [height - 24, 24]);
  const path = linePath(data.map((item) => ({ x: x.map(item.x), y: y.map(item.y) })));
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart"><path d="${path}" fill="none" stroke="#115e59" stroke-width="3" stroke-linecap="round"/></svg>`;
}

export function renderSvgAreaChart(data: Array<{ x: number; y: number }>, width = 640, height = 320): string {
  const x = createLinearScale([Math.min(...data.map((item) => item.x)), Math.max(...data.map((item) => item.x))], [24, width - 24]);
  const y = createLinearScale([0, Math.max(...data.map((item) => item.y), 0)], [height - 24, 24]);
  const line = data.map((item) => ({ x: x.map(item.x), y: y.map(item.y) }));
  const areaPath = `${linePath(line)} L ${line[line.length - 1]?.x ?? 0} ${height - 24} L ${line[0]?.x ?? 0} ${height - 24} Z`;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Area chart"><path d="${areaPath}" fill="rgba(17,94,89,0.18)" stroke="none"/><path d="${linePath(line)}" fill="none" stroke="#115e59" stroke-width="3"/></svg>`;
}

export function renderSvgScatterChart(data: Array<{ x: number; y: number; r?: number }>, width = 640, height = 320): string {
  const x = createLinearScale([Math.min(...data.map((item) => item.x)), Math.max(...data.map((item) => item.x))], [24, width - 24]);
  const y = createLinearScale([Math.min(...data.map((item) => item.y)), Math.max(...data.map((item) => item.y))], [height - 24, 24]);
  const points = data
    .map((item) => `<circle cx="${x.map(item.x)}" cy="${y.map(item.y)}" r="${item.r ?? 5}" fill="#115e59" fill-opacity="0.75" />`)
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Scatter chart">${points}</svg>`;
}

export function renderSvgHistogramChart(data: Array<{ label: string; value: number }>, width = 640, height = 320): string {
  return renderSvgBarChart(data, width, height).replace('Bar chart', 'Histogram');
}

export function renderSvgWaterfallChart(data: Array<{ label: string; value: number }>, width = 640, height = 320): string {
  const labels = data.map((item) => item.label);
  const x = createBandScale(labels, [40, width - 20]);
  const cumulative: number[] = [];
  data.reduce((sum, item) => {
    const next = sum + item.value;
    cumulative.push(next);
    return next;
  }, 0);
  const min = Math.min(0, ...cumulative);
  const max = Math.max(0, ...cumulative);
  const y = createLinearScale([min, max || 1], [height - 32, 24]);

  let running = 0;
  const bars = data
    .map((item, index) => {
      const start = running;
      const end = running + item.value;
      running = end;
      const top = y.map(Math.max(start, end));
      const bottom = y.map(Math.min(start, end));
      const connector =
        index < data.length - 1
          ? `<line x1="${x.map(item.label) + x.bandwidth}" y1="${y.map(end)}" x2="${x.map(labels[index + 1] ?? item.label)}" y2="${y.map(end)}" stroke="#6b7280" stroke-dasharray="4 4" />`
          : '';
      return `<rect x="${x.map(item.label)}" y="${top}" width="${x.bandwidth}" height="${bottom - top}" rx="6" fill="${item.value >= 0 ? defaultPalette[0] : defaultPalette[4]}" />${connector}`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Waterfall chart">${bars}</svg>`;
}

export function renderSvgPieChart(data: Array<{ label: string; value: number }>, width = 320, height = 320): string {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let angle = -Math.PI / 2;
  const radius = Math.min(width, height) / 2 - 12;
  const centerX = width / 2;
  const centerY = height / 2;
  const slices = data
    .map((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      const startX = centerX + Math.cos(angle) * radius;
      const startY = centerY + Math.sin(angle) * radius;
      angle += sliceAngle;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;
      const largeArc = sliceAngle > Math.PI ? 1 : 0;
      return `<path d="M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z" fill="${defaultPalette[index % defaultPalette.length]}" />`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Pie chart">${slices}</svg>`;
}

export function renderSvgDonutChart(data: Array<{ label: string; value: number }>, width = 320, height = 320): string {
  return `${renderSvgPieChart(data, width, height).replace('</svg>', `<circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 5}" fill="#ffffff"/></svg>`)}`;
}

export function renderSvgRadarChart(data: Array<{ label: string; value: number }>, width = 360, height = 360): string {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;
  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data
    .map((item, index) => {
      const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
      const scaled = (item.value / max) * radius;
      return `${centerX + Math.cos(angle) * scaled},${centerY + Math.sin(angle) * scaled}`;
    })
    .join(' ');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Radar chart"><polygon points="${points}" fill="rgba(17,94,89,0.18)" stroke="#115e59" stroke-width="3" /></svg>`;
}

export function renderSvgFunnelChart(data: Array<{ label: string; value: number }>, width = 360, height = 320): string {
  const max = clampMax(data.map((item) => item.value));
  const stepHeight = (height - 24) / Math.max(data.length, 1);
  const segments = data
    .map((item, index) => {
      const segmentWidth = (item.value / max) * (width - 40);
      const nextWidth = ((data[index + 1]?.value ?? item.value) / max) * (width - 40);
      const topY = 12 + index * stepHeight;
      const bottomY = topY + stepHeight - 4;
      const topLeft = (width - segmentWidth) / 2;
      const bottomLeft = (width - nextWidth) / 2;
      const points = `${topLeft},${topY} ${topLeft + segmentWidth},${topY} ${bottomLeft + nextWidth},${bottomY} ${bottomLeft},${bottomY}`;
      return `<polygon points="${points}" fill="${defaultPalette[index % defaultPalette.length]}" /><text x="${width / 2}" y="${topY + stepHeight / 2}" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="12">${item.label}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Funnel chart">${segments}</svg>`;
}

export function renderSvgCandlestickChart(
  data: Array<{ label: string; open: number; high: number; low: number; close: number }>,
  width = 640,
  height = 320
): string {
  const x = createBandScale(data.map((item) => item.label), [40, width - 20]);
  const allValues = data.flatMap((item) => [item.open, item.high, item.low, item.close]);
  const y = createLinearScale([Math.min(...allValues, 0), Math.max(...allValues, 1)], [height - 32, 24]);

  const candles = data
    .map((item) => {
      const center = x.map(item.label) + x.bandwidth / 2;
      const bodyTop = y.map(Math.max(item.open, item.close));
      const bodyBottom = y.map(Math.min(item.open, item.close));
      const color = item.close >= item.open ? defaultPalette[2] : defaultPalette[4];
      return `<line x1="${center}" y1="${y.map(item.high)}" x2="${center}" y2="${y.map(item.low)}" stroke="${color}" stroke-width="2" /><rect x="${center - x.bandwidth / 4}" y="${bodyTop}" width="${x.bandwidth / 2}" height="${Math.max(bodyBottom - bodyTop, 2)}" fill="${color}" rx="4" />`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Candlestick chart">${candles}</svg>`;
}

export function renderSvgComboChart(
  data: Array<{ label: string; bar: number; line: number }>,
  width = 640,
  height = 320
): string {
  const x = createBandScale(data.map((item) => item.label), [40, width - 20]);
  const max = clampMax(data.flatMap((item) => [item.bar, item.line]));
  const y = createLinearScale([0, max], [height - 32, 24]);
  const bars = data
    .map((item) => {
      const top = y.map(item.bar);
      return `<rect x="${x.map(item.label)}" y="${top}" width="${x.bandwidth}" height="${height - 32 - top}" rx="6" fill="${defaultPalette[0]}" fill-opacity="0.28" stroke="${defaultPalette[0]}" />`;
    })
    .join('');
  const line = linePath(
    data.map((item) => ({
      x: x.map(item.label) + x.bandwidth / 2,
      y: y.map(item.line)
    }))
  );
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Combo chart">${bars}<path d="${line}" fill="none" stroke="${defaultPalette[4]}" stroke-width="3" stroke-linecap="round" /></svg>`;
}
