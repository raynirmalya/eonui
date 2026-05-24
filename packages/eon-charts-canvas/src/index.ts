import { createBandScale, createLinearScale, resolveChartType } from '@eonui/charts-core';

type GenericDatum = Record<string, unknown>;

type Palette = readonly string[];

const palette: Palette = ['#115e59', '#0f766e', '#15803d', '#b45309', '#b91c1c', '#4338ca', '#7c3aed', '#0f172a'];
const chartPadding = {
  x0: 40,
  y0: 28,
  x1: 20,
  y1: 28
};

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toString(value: unknown, fallback = ''): string {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'string') {
    return value;
  }

  return String(value);
}

function pointPath(points: Array<{ x: number; y: number }>): string {
  if (!points.length) {
    return '';
  }

  return points.reduce((path, point, index) => {
    const segment = `${index ? 'L' : 'M'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    return `${path} ${segment}`.trim();
  }, '');
}

function getChartVariantName(type: string): string | null {
  const baseType = resolveChartType(type);
  if (type === baseType || !type.startsWith(`${baseType}-`)) {
    return null;
  }

  const rawVariant = type.slice(baseType.length + 1);
  const cycleMatch = rawVariant.match(/^(.*)-(\d+)$/);
  return cycleMatch?.[1] ?? rawVariant;
}

function labelFromVariant(variantName: string): string {
  return variantName
    .split('-')
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function percentile(values: number[], rank: number): number {
  if (!values.length) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const position = clamp(rank, 0, 1) * (sorted.length - 1);
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);
  const lower = sorted[lowerIndex] ?? sorted[0] ?? 0;
  const upper = sorted[upperIndex] ?? sorted[sorted.length - 1] ?? lower;
  return lower + (upper - lower) * (position - lowerIndex);
}

function movingAverage(values: number[], windowSize = 3): number[] {
  return values.map((_, index) => {
    const start = Math.max(0, index - Math.floor(windowSize / 2));
    const end = Math.min(values.length, index + Math.ceil(windowSize / 2));
    const slice = values.slice(start, end);
    const total = slice.reduce((sum, value) => sum + value, 0);
    return slice.length ? total / slice.length : values[index] ?? 0;
  });
}

function coerceNumberList(raw: unknown, fallback: number[] = []): number[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => toNumber(item, 0));
  }

  if (typeof raw === 'string') {
    const parsed = raw
      .split(',')
      .map((item) => toNumber(item.trim(), NaN))
      .filter((item) => Number.isFinite(item));
    return parsed.length ? parsed : fallback;
  }

  return fallback;
}

function layoutGridNodes(nodes: string[], width: number, height: number): Map<string, { x: number; y: number }> {
  const columns = Math.max(Math.ceil(Math.sqrt(nodes.length)), 1);
  const rows = Math.max(Math.ceil(nodes.length / columns), 1);
  const spacingX = (width - chartPadding.x0 - chartPadding.x1) / columns;
  const spacingY = (height - chartPadding.y0 - chartPadding.y1) / rows;
  const map = new Map<string, { x: number; y: number }>();

  nodes.forEach((node, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    map.set(node, {
      x: chartPadding.x0 + column * spacingX + spacingX / 2,
      y: chartPadding.y0 + row * spacingY + spacingY / 2
    });
  });

  return map;
}

function layoutSankeyNodes(
  nodes: string[],
  edges: Array<{ source: string; target: string }>,
  width: number,
  height: number
): Map<string, { x: number; y: number }> {
  const levels = new Map<string, number>(nodes.map((node) => [node, 0]));

  for (let iteration = 0; iteration < nodes.length; iteration += 1) {
    let changed = false;
    edges.forEach((edge) => {
      const sourceLevel = levels.get(edge.source) ?? 0;
      const nextLevel = sourceLevel + 1;
      if ((levels.get(edge.target) ?? 0) < nextLevel) {
        levels.set(edge.target, nextLevel);
        changed = true;
      }
    });
    if (!changed) {
      break;
    }
  }

  const maxLevel = Math.max(...levels.values(), 0);
  const columns = Math.max(maxLevel + 1, 1);
  const itemsByLevel = new Map<number, string[]>();
  nodes.forEach((node) => {
    const level = levels.get(node) ?? 0;
    const group = itemsByLevel.get(level) ?? [];
    group.push(node);
    itemsByLevel.set(level, group);
  });

  const map = new Map<string, { x: number; y: number }>();
  itemsByLevel.forEach((items, level) => {
    const spacingY = (height - chartPadding.y0 - chartPadding.y1) / Math.max(items.length, 1);
    items.forEach((node, index) => {
      const x =
        columns === 1
          ? chartPadding.x0 + (width - chartPadding.x0 - chartPadding.x1) / 2
          : chartPadding.x0 + (level / Math.max(columns - 1, 1)) * (width - chartPadding.x0 - chartPadding.x1);
      const y = chartPadding.y0 + spacingY * index + spacingY / 2;
      map.set(node, { x, y });
    });
  });

  return map;
}

function clearArea(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  title = 'Mystique chart'
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#0f172a';
  ctx.font = '12px -apple-system, Segoe UI, Roboto, sans-serif';
  ctx.fillText(title, 10, 16);
}

function ensureRect(ctx: CanvasRenderingContext2D, width: number, height: number, title?: string): void {
  clearArea(ctx, width, height, title);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.strokeRect(chartPadding.x0, chartPadding.y0, width - chartPadding.x0 - chartPadding.x1, height - chartPadding.y0 - chartPadding.y1);
}

function chartBounds(width: number, height: number) {
  return {
    left: chartPadding.x0,
    right: width - chartPadding.x1,
    top: chartPadding.y0,
    bottom: height - chartPadding.y1,
    width: width - chartPadding.x0 - chartPadding.x1,
    height: height - chartPadding.y0 - chartPadding.y1
  };
}

function drawAxes(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  showX = true,
  showY = true
): void {
  const bounds = chartBounds(width, height);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.beginPath();

  if (showY) {
    ctx.moveTo(bounds.left, bounds.top);
    ctx.lineTo(bounds.left, bounds.bottom);
  }

  if (showX) {
    ctx.moveTo(bounds.left, bounds.bottom);
    ctx.lineTo(bounds.right, bounds.bottom);
  }

  ctx.stroke();
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  align: CanvasTextAlign = 'left',
  options: { color?: string; font?: string } = {}
): void {
  ctx.fillStyle = options.color ?? '#334155';
  ctx.font = options.font ?? '11px -apple-system, Segoe UI, Roboto, sans-serif';
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawPolyline(ctx: CanvasRenderingContext2D, points: Array<{ x: number; y: number }>): void {
  if (!points.length) {
    return;
  }

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
}

function drawCartesianVariantOverlay(args: {
  ctx: CanvasRenderingContext2D;
  variantName: string | null;
  points: Array<{ x: number; y: number }>;
  values: number[];
  labels: string[];
  width: number;
  height: number;
  mapValue: (value: number) => number;
}): void {
  const { ctx, variantName, points, values, labels, width, height, mapValue } = args;
  if (!variantName || !points.length || !values.length) {
    return;
  }

  const bounds = chartBounds(width, height);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  const thresholdVariants = new Set(['benchmark-lanes', 'threshold-alert', 'goal-tracking', 'control-room']);
  const anomalyVariants = new Set(['anomaly-window', 'outlier-lens', 'distribution-focus', 'quantile-layers']);
  const eventVariants = new Set(['event-overlay', 'narrative-sequence', 'scenario-planner']);
  const focusVariants = new Set(['multi-resolution', 'comparison-grid', 'small-multiples', 'scenario-planner']);
  const baselineVariants = new Set(['baseline']);
  const densityVariants = new Set(['large-data']);
  const stackedVariants = new Set(['stacked']);
  const normalizedVariants = new Set(['normalized']);
  const hierarchyVariants = new Set(['hierarchical']);
  const denseGridVariants = new Set(['compact-grid']);
  const compactVariants = new Set(['compact', 'sparkline']);
  const stepVariants = new Set(['step']);
  const bandedVariants = new Set(['banded']);

  if (bandedVariants.has(variantName)) {
    for (let index = 0; index < points.length - 1; index += 1) {
      const point = points[index];
      const next = points[index + 1];
      if (!point || !next || index % 2 !== 0) {
        continue;
      }
      ctx.fillStyle = 'rgba(15,23,42,0.04)';
      ctx.fillRect(point.x, bounds.top, Math.max(next.x - point.x, 14), bounds.height);
    }
  }

  if (denseGridVariants.has(variantName)) {
    ctx.strokeStyle = 'rgba(15,23,42,0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    [0.16, 0.32, 0.48, 0.64, 0.8].forEach((ratio) => {
      const x = bounds.left + bounds.width * ratio;
      const y = bounds.top + bounds.height * ratio;
      ctx.beginPath();
      ctx.moveTo(x, bounds.top);
      ctx.lineTo(x, bounds.bottom);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bounds.left, y);
      ctx.lineTo(bounds.right, y);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (baselineVariants.has(variantName)) {
    const baseline = mapValue(minValue + valueRange * 0.15);
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 5]);
    ctx.beginPath();
    ctx.moveTo(bounds.left, baseline);
    ctx.lineTo(bounds.right, baseline);
    ctx.stroke();
    ctx.setLineDash([]);
    drawText(ctx, 'Baseline anchor', bounds.left + 4, baseline - 8, 'left', {
      color: '#0f766e',
      font: '10px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (densityVariants.has(variantName)) {
    points.forEach((point, index) => {
      ctx.strokeStyle = 'rgba(15,118,110,0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x, bounds.bottom);
      ctx.stroke();
      if (index % 2 === 0) {
        drawText(ctx, labels[index] ?? `P${index + 1}`, point.x, bounds.top + 14, 'center', {
          color: '#475569',
          font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
        });
      }
    });
  }

  if (stackedVariants.has(variantName)) {
    points.forEach((point, index) => {
      ctx.fillStyle = index % 2 === 0 ? 'rgba(14,165,233,0.08)' : 'rgba(15,118,110,0.08)';
      ctx.fillRect(point.x - 7, point.y, 14, Math.max(bounds.bottom - point.y, 8));
    });
  }

  if (normalizedVariants.has(variantName)) {
    const fifty = mapValue(minValue + valueRange * 0.5);
    const eighty = mapValue(minValue + valueRange * 0.8);
    ctx.strokeStyle = 'rgba(2,132,199,0.36)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(bounds.left, fifty);
    ctx.lineTo(bounds.right, fifty);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(2,132,199,0.2)';
    ctx.beginPath();
    ctx.moveTo(bounds.left, eighty);
    ctx.lineTo(bounds.right, eighty);
    ctx.stroke();
    ctx.setLineDash([]);
    drawText(ctx, '50%', bounds.right - 4, fifty - 6, 'right', {
      color: '#0369a1',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (hierarchyVariants.has(variantName)) {
    const groupSize = Math.max(2, Math.ceil(points.length / 3));
    for (let start = 0; start < points.length; start += groupSize) {
      const first = points[start];
      const last = points[Math.min(start + groupSize - 1, points.length - 1)];
      if (!first || !last) {
        continue;
      }
      const groupIndex = Math.floor(start / groupSize) + 1;
      ctx.strokeStyle = 'rgba(15,23,42,0.26)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(first.x, bounds.top + 18);
      ctx.lineTo(last.x, bounds.top + 18);
      ctx.moveTo(first.x, bounds.top + 18);
      ctx.lineTo(first.x, bounds.top + 26);
      ctx.moveTo(last.x, bounds.top + 18);
      ctx.lineTo(last.x, bounds.top + 26);
      ctx.stroke();
      drawText(ctx, `Group ${groupIndex}`, (first.x + last.x) / 2, bounds.top + 14, 'center', {
        color: '#475569',
        font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    }
  }

  if (compactVariants.has(variantName)) {
    const latest = points[points.length - 1];
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    ctx.fillRect(bounds.right - 116, bounds.top + 8, 108, 20);
    ctx.strokeRect(bounds.right - 116, bounds.top + 8, 108, 20);
    drawText(ctx, variantName === 'sparkline' ? 'Sparkline mode' : 'Compact mode', bounds.right - 62, bounds.top + 21, 'center', {
      color: '#0f172a',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
    if (latest) {
      ctx.strokeStyle = 'rgba(14,165,233,0.28)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(latest.x, latest.y, 9, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (stepVariants.has(variantName) && points.length >= 2) {
    const stepped = points.flatMap((point, index) => (index === 0 ? [point] : [{ x: point.x, y: points[index - 1]?.y ?? point.y }, point]));
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 2.4;
    drawPolyline(ctx, stepped);
    ctx.stroke();
  }

  if (variantName === 'forecast-band' || variantName === 'confidence-envelope') {
    const startIndex = variantName === 'forecast-band' ? Math.max(0, Math.floor(points.length * 0.55)) : 0;
    const scopedPoints = points.slice(startIndex);
    const scopedValues = values.slice(startIndex);
    const spread = valueRange * (variantName === 'forecast-band' ? 0.18 : 0.12);

    ctx.beginPath();
    scopedPoints.forEach((point, index) => {
      const y = mapValue(scopedValues[index] + spread * (variantName === 'forecast-band' ? 1 + index / Math.max(scopedPoints.length - 1, 1) : 1));
      if (index === 0) {
        ctx.moveTo(point.x, y);
      } else {
        ctx.lineTo(point.x, y);
      }
    });
    [...scopedPoints].reverse().forEach((point, reverseIndex) => {
      const valueIndex = scopedPoints.length - reverseIndex - 1;
      const y = mapValue(scopedValues[valueIndex] - spread * (variantName === 'forecast-band' ? 0.75 + valueIndex / Math.max(scopedPoints.length - 1, 1) : 1));
      ctx.lineTo(point.x, y);
    });
    ctx.closePath();
    ctx.fillStyle = variantName === 'forecast-band' ? 'rgba(56,189,248,0.18)' : 'rgba(15,118,110,0.16)';
    ctx.fill();

    ctx.strokeStyle = variantName === 'forecast-band' ? '#0284c7' : '#0f766e';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    drawPolyline(ctx, scopedPoints);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (variantName === 'rolling-window' || variantName === 'seasonal-decomposition') {
    if (variantName === 'seasonal-decomposition') {
      for (let index = 0; index < points.length - 1; index += 2) {
        const next = points[index + 1];
        if (!next) {
          continue;
        }
        ctx.fillStyle = 'rgba(148,163,184,0.08)';
        ctx.fillRect(points[index]?.x ?? bounds.left, bounds.top, Math.max(next.x - (points[index]?.x ?? bounds.left), 12), bounds.height);
      }
    }
    const averaged = movingAverage(values, 3);
    const averagePoints = points.map((point, index) => ({ x: point.x, y: mapValue(averaged[index] ?? values[index] ?? 0) }));
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 4]);
    drawPolyline(ctx, averagePoints);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (thresholdVariants.has(variantName)) {
    const warning = minValue + valueRange * 0.55;
    const critical = minValue + valueRange * 0.78;
    const target = minValue + valueRange * 0.68;
    if (variantName === 'benchmark-lanes' || variantName === 'control-room') {
      ctx.fillStyle = 'rgba(34,197,94,0.08)';
      ctx.fillRect(bounds.left, mapValue(critical), bounds.width, bounds.bottom - mapValue(critical));
      ctx.fillStyle = 'rgba(245,158,11,0.08)';
      ctx.fillRect(bounds.left, mapValue(warning), bounds.width, Math.max(mapValue(critical) - mapValue(warning), 8));
      ctx.fillStyle = 'rgba(239,68,68,0.06)';
      ctx.fillRect(bounds.left, bounds.top, bounds.width, Math.max(mapValue(warning) - bounds.top, 8));
    }
    ctx.strokeStyle = variantName === 'threshold-alert' ? '#dc2626' : '#0284c7';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(bounds.left, mapValue(target));
    ctx.lineTo(bounds.right, mapValue(target));
    ctx.stroke();
    ctx.setLineDash([]);
    drawText(ctx, variantName === 'goal-tracking' ? 'Goal' : 'Threshold', bounds.right - 4, mapValue(target) - 6, 'right', {
      color: variantName === 'threshold-alert' ? '#dc2626' : '#0284c7'
    });

    if (variantName === 'threshold-alert' || variantName === 'control-room') {
      values.forEach((value, index) => {
        if (value < target) {
          return;
        }
        const point = points[index];
        if (!point) {
          return;
        }
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
  }

  if (anomalyVariants.has(variantName)) {
    const q1 = percentile(values, 0.25);
    const q3 = percentile(values, 0.75);
    ctx.fillStyle = 'rgba(15,118,110,0.08)';
    ctx.fillRect(bounds.left, mapValue(q3), bounds.width, Math.max(mapValue(q1) - mapValue(q3), 12));
    values.forEach((value, index) => {
      if (value >= q1 && value <= q3) {
        return;
      }
      const point = points[index];
      if (!point) {
        return;
      }
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(point.x, point.y, variantName === 'outlier-lens' ? 10 : 7, 0, Math.PI * 2);
      ctx.stroke();
      drawText(ctx, labels[index] ?? `P${index + 1}`, point.x + 8, point.y - 10, 'left', { color: '#7f1d1d' });
    });
  }

  if (eventVariants.has(variantName)) {
    const anchors = [Math.max(1, Math.floor(points.length / 3)), Math.max(2, Math.floor((points.length * 2) / 3))];
    anchors.forEach((anchor, index) => {
      const point = points[Math.min(anchor, points.length - 1)];
      if (!point) {
        return;
      }
      ctx.strokeStyle = 'rgba(51,65,85,0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(point.x, bounds.top);
      ctx.lineTo(point.x, bounds.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(15,23,42,0.82)';
      ctx.fillRect(point.x - 14, bounds.top + 8 + index * 18, 28, 14);
      drawText(ctx, `E${index + 1}`, point.x, bounds.top + 18 + index * 18, 'center', { color: '#f8fafc', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
    });
  }

  if (focusVariants.has(variantName)) {
    const focusStart = points[Math.max(0, Math.floor(points.length * 0.6))];
    const focusEnd = points[points.length - 1];
    if (focusStart && focusEnd) {
      ctx.strokeStyle = 'rgba(59,130,246,0.32)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(focusStart.x - 8, bounds.top, Math.max(focusEnd.x - focusStart.x + 16, 18), bounds.height);
      ctx.setLineDash([]);
    }
  }

  if (variantName === 'realtime-queue' || variantName === 'control-room') {
    const tailStart = points[Math.max(0, Math.floor(points.length * 0.72))];
    const lastPoint = points[points.length - 1];
    if (tailStart) {
      ctx.fillStyle = 'rgba(14,165,233,0.05)';
      ctx.fillRect(tailStart.x - 10, bounds.top, bounds.right - tailStart.x + 10, bounds.height);
    }
    if (lastPoint) {
      ctx.strokeStyle = 'rgba(14,165,233,0.32)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(lastPoint.x, lastPoint.y, 12, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(bounds.right - 116, bounds.top + 8, 108, 44);
    drawText(ctx, 'CONTROL ROOM', bounds.right - 62, bounds.top + 24, 'center', { color: '#e2e8f0', font: '10px -apple-system, Segoe UI, Roboto, sans-serif' });
    drawText(ctx, 'Live watch enabled', bounds.right - 62, bounds.top + 40, 'center', { color: '#67e8f9', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  }

  ctx.fillStyle = 'rgba(15,23,42,0.82)';
  ctx.fillRect(bounds.left + 8, bounds.top + 8, Math.max(labelFromVariant(variantName).length * 6 + 22, 72), 18);
  drawText(ctx, labelFromVariant(variantName), bounds.left + 18, bounds.top + 20, 'left', {
    color: '#f8fafc',
    font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
  });
}

function drawScatterVariantOverlay(args: {
  ctx: CanvasRenderingContext2D;
  variantName: string | null;
  points: Array<{ x: number; y: number }>;
  values: Array<{ x: number; y: number; r: number }>;
  width: number;
  height: number;
}): void {
  const { ctx, variantName, points, values, width, height } = args;
  if (!variantName || !points.length || !values.length) {
    return;
  }

  const bounds = chartBounds(width, height);
  const xMean = values.reduce((sum, item) => sum + item.x, 0) / values.length;
  const yMean = values.reduce((sum, item) => sum + item.y, 0) / values.length;
  const ranked = values
    .map((item, index) => ({
      index,
      distance: Math.hypot(item.x - xMean, item.y - yMean)
    }))
    .sort((left, right) => right.distance - left.distance)
    .slice(0, Math.min(3, values.length));
  const bandVariants = new Set(['forecast-band', 'confidence-envelope']);
  const trendVariants = new Set(['rolling-window', 'seasonal-decomposition']);
  const laneVariants = new Set(['benchmark-lanes', 'threshold-alert']);
  const plannerVariants = new Set(['scenario-planner', 'small-multiples']);
  const eventOnlyVariants = new Set(['event-overlay']);
  const fadedVariants = new Set(['animated', 'faded']);

  if (fadedVariants.has(variantName)) {
    points.forEach((point, index) => {
      if (index % 2 !== 0) {
        return;
      }
      ctx.strokeStyle = variantName === 'animated' ? 'rgba(14,165,233,0.36)' : 'rgba(100,116,139,0.28)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(point.x, point.y, variantName === 'animated' ? 11 : 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  if (bandVariants.has(variantName)) {
    const sortedPoints = [...points].sort((left, right) => left.x - right.x);
    const scoped = variantName === 'forecast-band' ? sortedPoints.slice(Math.max(0, Math.floor(sortedPoints.length * 0.55))) : sortedPoints;
    const xs = scoped.map((point) => point.x);
    const ys = scoped.map((point) => point.y);
    if (xs.length && ys.length) {
      const left = Math.min(...xs) - 12;
      const top = Math.min(...ys) - 14;
      const right = Math.max(...xs) + 12;
      const bottom = Math.max(...ys) + 14;
      ctx.fillStyle = variantName === 'forecast-band' ? 'rgba(56,189,248,0.12)' : 'rgba(15,118,110,0.1)';
      ctx.strokeStyle = variantName === 'forecast-band' ? 'rgba(2,132,199,0.36)' : 'rgba(15,118,110,0.28)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 5]);
      ctx.fillRect(left, top, Math.max(right - left, 28), Math.max(bottom - top, 28));
      ctx.strokeRect(left, top, Math.max(right - left, 28), Math.max(bottom - top, 28));
      ctx.setLineDash([]);
    }
  }

  if (trendVariants.has(variantName)) {
    const sorted = [...values]
      .map((item, index) => ({ ...item, point: points[index] }))
      .filter((item): item is { x: number; y: number; r: number; point: { x: number; y: number } } => Boolean(item.point))
      .sort((left, right) => left.x - right.x)
      .map((item) => item.point);
    if (variantName === 'seasonal-decomposition') {
      for (let index = 0; index < 4; index += 1) {
        const left = bounds.left + (bounds.width / 4) * index;
        ctx.fillStyle = 'rgba(148,163,184,0.06)';
        ctx.fillRect(left, bounds.top, bounds.width / 8, bounds.height);
      }
    }
    if (sorted.length >= 2) {
      ctx.strokeStyle = '#0f766e';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      drawPolyline(ctx, sorted);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (laneVariants.has(variantName)) {
    const laneX = percentile(points.map((point) => point.x), 0.68);
    const laneY = percentile(points.map((point) => point.y), 0.34);
    ctx.strokeStyle = variantName === 'threshold-alert' ? '#dc2626' : '#0284c7';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(laneX, bounds.top);
    ctx.lineTo(laneX, bounds.bottom);
    ctx.moveTo(bounds.left, laneY);
    ctx.lineTo(bounds.right, laneY);
    ctx.stroke();
    ctx.setLineDash([]);
    if (variantName === 'threshold-alert') {
      points.forEach((point) => {
        if (point.x < laneX || point.y > laneY) {
          return;
        }
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 9, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
  }

  if (plannerVariants.has(variantName)) {
    const panelWidth = 34;
    const panelHeight = 24;
    ctx.fillStyle = 'rgba(255,255,255,0.74)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 2; column += 1) {
        const x = bounds.right - 86 + column * (panelWidth + 6);
        const y = bounds.top + 8 + row * (panelHeight + 6);
        ctx.fillRect(x, y, panelWidth, panelHeight);
        ctx.strokeRect(x, y, panelWidth, panelHeight);
      }
    }
    const focusLeft = percentile(points.map((point) => point.x), 0.58);
    const focusTop = percentile(points.map((point) => point.y), 0.28);
    const focusRight = percentile(points.map((point) => point.x), 0.9);
    const focusBottom = percentile(points.map((point) => point.y), 0.72);
    ctx.fillStyle = 'rgba(14,165,233,0.05)';
    ctx.strokeStyle = 'rgba(14,165,233,0.28)';
    ctx.setLineDash([4, 4]);
    ctx.fillRect(focusLeft, focusTop, Math.max(focusRight - focusLeft, 28), Math.max(focusBottom - focusTop, 28));
    ctx.strokeRect(focusLeft, focusTop, Math.max(focusRight - focusLeft, 28), Math.max(focusBottom - focusTop, 28));
    ctx.setLineDash([]);
  }

  if (eventOnlyVariants.has(variantName)) {
    [0.34, 0.68].forEach((ratio, index) => {
      const x = percentile(points.map((point) => point.x), ratio);
      ctx.strokeStyle = 'rgba(51,65,85,0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x, bounds.top);
      ctx.lineTo(x, bounds.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(15,23,42,0.82)';
      ctx.fillRect(x - 14, bounds.top + 10 + index * 18, 28, 14);
      drawText(ctx, `E${index + 1}`, x, bounds.top + 20 + index * 18, 'center', {
        color: '#f8fafc',
        font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'outlier-lens' || variantName === 'anomaly-window' || variantName === 'control-room') {
    ranked.forEach(({ index }, rank) => {
      const point = points[index];
      if (!point) {
        return;
      }
      ctx.strokeStyle = rank === 0 ? '#dc2626' : '#f59e0b';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10 + rank * 2, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (variantName === 'multi-resolution' || variantName === 'control-room') {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const focusLeft = percentile(xs, 0.6);
    const focusTop = percentile(ys, 0.25);
    const focusRight = percentile(xs, 0.9);
    const focusBottom = percentile(ys, 0.7);
    ctx.strokeStyle = 'rgba(59,130,246,0.32)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(focusLeft, focusTop, Math.max(focusRight - focusLeft, 24), Math.max(focusBottom - focusTop, 24));
    ctx.setLineDash([]);
  }

  if (variantName === 'distribution-focus') {
    ctx.strokeStyle = 'rgba(100,116,139,0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(bounds.left, (bounds.top + bounds.bottom) / 2);
    ctx.lineTo(bounds.right, (bounds.top + bounds.bottom) / 2);
    ctx.moveTo((bounds.left + bounds.right) / 2, bounds.top);
    ctx.lineTo((bounds.left + bounds.right) / 2, bounds.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (variantName === 'comparison-grid' || variantName === 'quantile-layers') {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const xBands = [0.25, 0.5, 0.75].map((ratio) => percentile(xs, ratio));
    const yBands = [0.25, 0.5, 0.75].map((ratio) => percentile(ys, ratio));
    ctx.strokeStyle = 'rgba(15,23,42,0.14)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    xBands.forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, bounds.top);
      ctx.lineTo(x, bounds.bottom);
      ctx.stroke();
    });
    yBands.forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(bounds.left, y);
      ctx.lineTo(bounds.right, y);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (variantName === 'narrative-sequence') {
    ranked.slice(0, 3).forEach(({ index }, rank) => {
      const point = points[index];
      if (!point) {
        return;
      }
      ctx.fillStyle = 'rgba(15,23,42,0.86)';
      ctx.beginPath();
      ctx.arc(point.x + 12, point.y - 12, 10, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `${rank + 1}`, point.x + 12, point.y - 9, 'center', {
        color: '#f8fafc',
        font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'goal-tracking') {
    const targetX = percentile(points.map((point) => point.x), 0.78);
    const targetY = percentile(points.map((point) => point.y), 0.24);
    ctx.fillStyle = 'rgba(14,165,233,0.06)';
    ctx.strokeStyle = 'rgba(14,165,233,0.34)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.fillRect(targetX - 34, targetY - 26, 68, 52);
    ctx.strokeRect(targetX - 34, targetY - 26, 68, 52);
    ctx.setLineDash([]);
    drawText(ctx, 'Goal zone', targetX, targetY - 10, 'center', {
      color: '#0369a1',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'cohort-breakdown') {
    const xs = points.map((point) => point.x);
    const xBands = [percentile(xs, 0.33), percentile(xs, 0.66)];
    const starts = [bounds.left, xBands[0], xBands[1]];
    const ends = [xBands[0], xBands[1], bounds.right];
    starts.forEach((start, index) => {
      const end = ends[index];
      if (start === undefined || end === undefined) {
        return;
      }
      ctx.fillStyle = index % 2 === 0 ? 'rgba(14,165,233,0.04)' : 'rgba(15,23,42,0.03)';
      ctx.fillRect(start, bounds.top, Math.max(end - start, 24), bounds.height);
      drawText(ctx, `Cohort ${index + 1}`, start + 8, bounds.top + 14, 'left', {
        color: '#475569',
        font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'ranking-shift') {
    values
      .map((item, index) => ({ index, score: item.y + item.x * 0.25 }))
      .sort((left, right) => right.score - left.score)
      .slice(0, Math.min(3, values.length))
      .forEach(({ index }, rank) => {
        const point = points[index];
        if (!point) {
          return;
        }
        ctx.fillStyle = 'rgba(15,23,42,0.86)';
        ctx.beginPath();
        ctx.arc(point.x + 12, point.y - 12, 10, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, `#${rank + 1}`, point.x + 12, point.y - 9, 'center', {
          color: '#f8fafc',
          font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
        });
      });
  }

  if (variantName === 'realtime-queue') {
    const recent = points.slice(-3);
    recent.forEach((point, index) => {
      ctx.strokeStyle = 'rgba(14,165,233,0.28)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 12 - index * 2, 0, Math.PI * 2);
      ctx.stroke();
    });
    if (recent.length) {
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 4]);
      drawPolyline(ctx, recent);
      ctx.stroke();
      ctx.setLineDash([]);
      const latest = recent[recent.length - 1];
      if (latest) {
        drawText(ctx, 'Latest', latest.x + 14, latest.y - 10, 'left', {
          color: '#0369a1',
          font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
        });
      }
    }
  }

  if (variantName === 'dependency-critical-path') {
    const chain = [...values]
      .map((item, index) => ({ ...item, index }))
      .sort((left, right) => left.x - right.x)
      .slice(0, Math.min(4, values.length))
      .map((item) => points[item.index])
      .filter((point): point is { x: number; y: number } => Boolean(point));
    if (chain.length >= 2) {
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.6;
      ctx.setLineDash([6, 4]);
      drawPolyline(ctx, chain);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (variantName === 'topology-health') {
    const maxRadius = Math.max(...values.map((item) => item.r), 1);
    values.forEach((item, index) => {
      const point = points[index];
      if (!point) {
        return;
      }
      const tone = item.r / maxRadius > 0.72 ? '#dc2626' : item.r / maxRadius > 0.4 ? '#f59e0b' : '#0f766e';
      ctx.strokeStyle = tone;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 7, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (variantName === 'drilldown-workbench') {
    const lead = points[ranked[0]?.index ?? 0];
    ctx.fillStyle = 'rgba(15,23,42,0.84)';
    ctx.fillRect(bounds.left, bounds.top + 8, 136, 18);
    drawText(ctx, 'Explore / Cluster / Detail', bounds.left + 12, bounds.top + 20, 'left', {
      color: '#e2e8f0',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
    if (lead) {
      ctx.beginPath();
      ctx.arc(lead.x + 12, lead.y - 12, 9, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, '+', lead.x + 12, lead.y - 9, 'center', {
        color: '#f8fafc',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    }
  }

  if (variantName === 'tapered-flow') {
    const chain = [...values]
      .map((item, index) => ({ ...item, index }))
      .sort((left, right) => left.x - right.x)
      .slice(0, Math.min(5, values.length))
      .map((item) => points[item.index])
      .filter((point): point is { x: number; y: number } => Boolean(point));
    chain.forEach((point, index) => {
      ctx.strokeStyle = 'rgba(17,94,89,0.3)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(point.x, point.y, Math.max(3, 9 - index), 0, Math.PI * 2);
      ctx.stroke();
    });
    if (chain.length >= 2) {
      ctx.strokeStyle = 'rgba(17,94,89,0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      drawPolyline(ctx, chain);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(bounds.right - 116, bounds.top + 8, 108, 18);
    drawText(ctx, 'Scatter watch', bounds.right - 62, bounds.top + 20, 'center', {
      color: '#67e8f9',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  ctx.fillStyle = 'rgba(15,23,42,0.82)';
  ctx.fillRect(bounds.left + 8, bounds.top + 8, Math.max(labelFromVariant(variantName).length * 6 + 22, 72), 18);
  drawText(ctx, labelFromVariant(variantName), bounds.left + 18, bounds.top + 20, 'left', {
    color: '#f8fafc',
    font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
  });
}

function drawPolarVariantOverlay(args: {
  ctx: CanvasRenderingContext2D;
  variantName: string | null;
  slices: Array<{ label: string; value: number; start: number; end: number }>;
  centerX: number;
  centerY: number;
  radius: number;
  innerRadius: number;
}): void {
  const { ctx, variantName, slices, centerX, centerY, radius, innerRadius } = args;
  if (!variantName || !slices.length) {
    return;
  }

  const ranked = [...slices].sort((left, right) => right.value - left.value);
  const largest = ranked[0];
  const bandVariants = new Set(['forecast-band', 'confidence-envelope']);
  const anomalyVariants = new Set(['anomaly-window']);
  const ringVariants = new Set(['rolling-window', 'seasonal-decomposition', 'benchmark-lanes', 'quantile-layers', 'distribution-focus']);
  const focusVariants = new Set(['scenario-planner', 'small-multiples', 'multi-resolution']);
  const eventVariants = new Set(['event-overlay']);
  const realtimeVariants = new Set(['realtime-queue']);

  if (largest && ['segment', 'comparison-grid', 'narrative-sequence', 'outlier-lens'].includes(variantName)) {
    const mid = (largest.start + largest.end) / 2;
    const labelX = centerX + Math.cos(mid) * (radius + 28);
    const labelY = centerY + Math.sin(mid) * (radius + 28);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, largest.start, largest.end);
    ctx.stroke();
    ctx.fillStyle = 'rgba(15,23,42,0.86)';
    ctx.fillRect(labelX - 26, labelY - 10, 52, 18);
    drawText(ctx, largest.label, labelX, labelY + 3, 'center', {
      color: '#f8fafc',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (largest && (variantName === 'goal-tracking' || variantName === 'control-room')) {
    const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
    const percent = Math.round((largest.value / total) * 100);
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(centerX - 44, centerY - 18, 88, 36);
    drawText(ctx, `${percent}%`, centerX, centerY - 2, 'center', {
      color: '#f8fafc',
      font: '14px -apple-system, Segoe UI, Roboto, sans-serif'
    });
    drawText(ctx, variantName === 'goal-tracking' ? 'Target slice' : 'Primary segment', centerX, centerY + 14, 'center', {
      color: '#475569',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(centerX - 44, centerY - radius - 10, 88, 18);
    drawText(ctx, 'Polar watch', centerX, centerY - radius + 2, 'center', {
      color: '#67e8f9',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'threshold-alert') {
    const average = slices.reduce((sum, slice) => sum + slice.value, 0) / Math.max(slices.length, 1);
    slices
      .filter((slice) => slice.value >= average)
      .forEach((slice) => {
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 10, slice.start, slice.end);
        ctx.stroke();
      });
  }

  if (anomalyVariants.has(variantName)) {
    const smallest = [...slices].sort((left, right) => left.value - right.value)[0];
    if (smallest) {
      const mid = (smallest.start + smallest.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 22);
      const y = centerY + Math.sin(mid) * (radius + 22);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 8, smallest.start, smallest.end);
      ctx.stroke();
      drawText(ctx, 'Outlier', x, y, 'center', {
        color: '#7f1d1d',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    }
  }

  if (bandVariants.has(variantName)) {
    const scoped = variantName === 'forecast-band' ? slices.slice(Math.max(0, Math.floor(slices.length / 2))) : slices;
    scoped.forEach((slice, index) => {
      ctx.strokeStyle = variantName === 'forecast-band' ? 'rgba(2,132,199,0.34)' : 'rgba(15,118,110,0.28)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 10 + index * 2, slice.start, slice.end);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  if (ringVariants.has(variantName)) {
    ctx.strokeStyle = 'rgba(100,116,139,0.18)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    [0.42, 0.64, 0.86].forEach((ratio) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.max((innerRadius > 0 ? innerRadius : radius * 0.28) + radius * ratio * 0.35, 24), 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (focusVariants.has(variantName)) {
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    [0, 1, 2].forEach((index) => {
      const x = centerX - 34 + index * 34;
      const y = centerY - radius - 18;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    if (largest) {
      ctx.strokeStyle = 'rgba(14,165,233,0.32)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 14, largest.start, largest.end);
      ctx.stroke();
    }
  }

  if (eventVariants.has(variantName)) {
    slices.slice(0, 2).forEach((slice, index) => {
      const mid = (slice.start + slice.end) / 2;
      const innerX = centerX + Math.cos(mid) * (innerRadius > 0 ? innerRadius : radius * 0.34);
      const innerY = centerY + Math.sin(mid) * (innerRadius > 0 ? innerRadius : radius * 0.34);
      const outerX = centerX + Math.cos(mid) * (radius + 18);
      const outerY = centerY + Math.sin(mid) * (radius + 18);
      ctx.strokeStyle = 'rgba(51,65,85,0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
      ctx.setLineDash([]);
      drawText(ctx, `E${index + 1}`, outerX, outerY, 'center', {
        color: '#475569',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (realtimeVariants.has(variantName)) {
    const latest = slices[slices.length - 1];
    if (latest) {
      const mid = (latest.start + latest.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 28);
      const y = centerY + Math.sin(mid) * (radius + 28);
      ctx.strokeStyle = 'rgba(14,165,233,0.4)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 12, latest.start, latest.end);
      ctx.stroke();
      drawText(ctx, 'Latest', x, y, 'center', {
        color: '#0369a1',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    }
  }

  if (variantName === 'drilldown-workbench' && largest) {
    const mid = (largest.start + largest.end) / 2;
    const badgeX = centerX + Math.cos(mid) * (radius + 18);
    const badgeY = centerY + Math.sin(mid) * (radius + 18);
    ctx.fillStyle = 'rgba(15,23,42,0.86)';
    ctx.fillRect(centerX - 62, centerY - radius - 10, 124, 18);
    drawText(ctx, 'Portfolio / Segment / Slice', centerX, centerY - radius + 2, 'center', {
      color: '#e2e8f0',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, 10, 0, Math.PI * 2);
    ctx.fill();
    drawText(ctx, '+', badgeX, badgeY + 3, 'center', {
      color: '#f8fafc',
      font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'tapered-flow') {
    slices.forEach((slice, index) => {
      const thickness = Math.max(2, 8 - index);
      ctx.strokeStyle = 'rgba(17,94,89,0.35)';
      ctx.lineWidth = thickness;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 12 + index * 2, slice.start, slice.end);
      ctx.stroke();
    });
  }

  if (variantName === 'topology-health') {
    const maxValue = Math.max(...slices.map((slice) => slice.value), 1);
    ranked.slice(0, 3).forEach((slice) => {
      const mid = (slice.start + slice.end) / 2;
      const tone = slice.value / maxValue > 0.72 ? '#dc2626' : slice.value / maxValue > 0.4 ? '#f59e0b' : '#0f766e';
      const x = centerX + Math.cos(mid) * (radius + 22);
      const y = centerY + Math.sin(mid) * (radius + 22);
      ctx.fillStyle = tone;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (variantName === 'cohort-breakdown') {
    slices.forEach((slice, index) => {
      const mid = (slice.start + slice.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 20);
      const y = centerY + Math.sin(mid) * (radius + 20);
      drawText(ctx, `C${index + 1}`, x, y, 'center', {
        color: '#475569',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'ranking-shift') {
    ranked.slice(0, 3).forEach((slice, index) => {
      const mid = (slice.start + slice.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 26);
      const y = centerY + Math.sin(mid) * (radius + 26);
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `#${index + 1}`, x, y + 3, 'center', {
        color: '#f8fafc',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'dependency-critical-path') {
    ranked.slice(0, 3).forEach((slice, index) => {
      const next = ranked[index + 1];
      if (!next) {
        return;
      }
      const mid = (slice.start + slice.end) / 2;
      const nextMid = (next.start + next.end) / 2;
      const radiusPoint = innerRadius > 0 ? innerRadius : radius * 0.5;
      const x1 = centerX + Math.cos(mid) * radiusPoint;
      const y1 = centerY + Math.sin(mid) * radiusPoint;
      const x2 = centerX + Math.cos(nextMid) * radiusPoint;
      const y2 = centerY + Math.sin(nextMid) * radiusPoint;
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  ctx.fillStyle = 'rgba(15,23,42,0.82)';
  ctx.fillRect(centerX - Math.max(labelFromVariant(variantName).length * 3 + 18, 44), centerY + radius + 16, Math.max(labelFromVariant(variantName).length * 6 + 24, 88), 18);
  drawText(ctx, labelFromVariant(variantName), centerX, centerY + radius + 28, 'center', {
    color: '#f8fafc',
    font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
  });
}

function drawRadarVariantOverlay(args: {
  ctx: CanvasRenderingContext2D;
  variantName: string | null;
  values: number[];
  coords: Array<{ x: number; y: number }>;
  centerX: number;
  centerY: number;
  radius: number;
}): void {
  const { ctx, variantName, values, coords, centerX, centerY, radius } = args;
  if (!variantName || !values.length || !coords.length) {
    return;
  }

  const ranked = values
    .map((value, index) => ({ index, value }))
    .sort((left, right) => right.value - left.value);
  const bandVariants = new Set(['forecast-band', 'confidence-envelope']);
  const anomalyVariants = new Set(['anomaly-window']);
  const trendVariants = new Set(['rolling-window', 'seasonal-decomposition', 'timeline']);
  const laneVariants = new Set(['benchmark-lanes']);
  const focusVariants = new Set(['scenario-planner', 'small-multiples', 'distribution-focus']);
  const eventVariants = new Set(['event-overlay']);
  const realtimeVariants = new Set(['realtime-queue']);

  if (['comparison-grid', 'quantile-layers', 'goal-tracking', 'control-room'].includes(variantName)) {
    ctx.strokeStyle = 'rgba(100,116,139,0.22)';
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach((ratio) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (bandVariants.has(variantName)) {
    const outer = coords.map((point) => ({
      x: centerX + (point.x - centerX) * (variantName === 'forecast-band' ? 1.12 : 1.06),
      y: centerY + (point.y - centerY) * (variantName === 'forecast-band' ? 1.12 : 1.06)
    }));
    const inner = coords.map((point) => ({
      x: centerX + (point.x - centerX) * 0.88,
      y: centerY + (point.y - centerY) * 0.88
    }));
    ctx.fillStyle = variantName === 'forecast-band' ? 'rgba(56,189,248,0.12)' : 'rgba(15,118,110,0.1)';
    ctx.beginPath();
    outer.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    [...inner].reverse().forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = variantName === 'forecast-band' ? '#0284c7' : '#0f766e';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    drawPolyline(ctx, outer);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (anomalyVariants.has(variantName)) {
    const low = ranked[ranked.length - 1];
    const point = coords[low?.index ?? -1];
    if (point) {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      drawText(ctx, 'Low axis', point.x + 12, point.y + 2, 'left', {
        color: '#7f1d1d',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    }
  }

  if (trendVariants.has(variantName)) {
    if (variantName === 'seasonal-decomposition') {
      ctx.strokeStyle = 'rgba(148,163,184,0.14)';
      ctx.lineWidth = 1;
      [0.2, 0.4, 0.6, 0.8].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
    const averageCoords = coords.map((point) => ({
      x: centerX + (point.x - centerX) * 0.78,
      y: centerY + (point.y - centerY) * 0.78
    }));
    ctx.strokeStyle = '#0f766e';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    drawPolyline(ctx, averageCoords);
    ctx.stroke();
    ctx.setLineDash([]);
    if (variantName === 'timeline') {
      ranked.slice(0, 3).forEach(({ index }, rank) => {
        const point = coords[index];
        if (!point) {
          return;
        }
        drawText(ctx, `T${rank + 1}`, point.x + 10, point.y - 12, 'left', {
          color: '#0369a1',
          font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
        });
      });
    }
  }

  if (laneVariants.has(variantName)) {
    ctx.strokeStyle = 'rgba(2,132,199,0.26)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    [0.52, 0.76].forEach((ratio, index) => {
      ctx.strokeStyle = index === 0 ? 'rgba(2,132,199,0.26)' : 'rgba(245,158,11,0.24)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (focusVariants.has(variantName)) {
    const lead = coords[ranked[0]?.index ?? 0];
    if (lead) {
      ctx.fillStyle = 'rgba(14,165,233,0.08)';
      ctx.strokeStyle = 'rgba(14,165,233,0.28)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(lead.x, lead.y);
      ctx.lineTo(centerX + (lead.x - centerX) * 0.35, centerY + (lead.y - centerY) * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    [0, 1, 2, 3].forEach((index) => {
      const x = centerX - 44 + (index % 2) * 48;
      const y = centerY + radius - 8 + Math.floor(index / 2) * 20;
      ctx.fillRect(x, y, 40, 14);
      ctx.strokeRect(x, y, 40, 14);
    });
  }

  if (eventVariants.has(variantName)) {
    ranked.slice(0, 2).forEach(({ index }, order) => {
      const point = coords[index];
      if (!point) {
        return;
      }
      const outerX = centerX + (point.x - centerX) * 1.16;
      const outerY = centerY + (point.y - centerY) * 1.16;
      ctx.strokeStyle = 'rgba(51,65,85,0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
      ctx.setLineDash([]);
      drawText(ctx, `E${order + 1}`, outerX, outerY, 'center', {
        color: '#475569',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (realtimeVariants.has(variantName)) {
    const latest = coords[coords.length - 1];
    if (latest) {
      ctx.strokeStyle = 'rgba(14,165,233,0.32)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(latest.x, latest.y, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(latest.x, latest.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (variantName === 'outlier-lens' || variantName === 'control-room') {
    const topIndex = values.indexOf(Math.max(...values));
    const point = coords[topIndex];
    if (point) {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(centerX - 40, centerY - radius - 10, 80, 18);
    drawText(ctx, 'Radar watch', centerX, centerY - radius + 2, 'center', {
      color: '#67e8f9',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'threshold-alert') {
    const threshold = radius * 0.72;
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, threshold, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    values.forEach((value, index) => {
      if (value < Math.max(...values) * 0.72) {
        return;
      }
      const point = coords[index];
      if (!point) {
        return;
      }
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (variantName === 'narrative-sequence') {
    ranked.slice(0, 3).forEach(({ index }, rank) => {
      const point = coords[index];
      if (!point) {
        return;
      }
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc(point.x + 10, point.y - 10, 9, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `${rank + 1}`, point.x + 10, point.y - 7, 'center', {
        color: '#f8fafc',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'multi-resolution') {
    const lead = coords[ranked[0]?.index ?? 0];
    if (lead) {
      ctx.fillStyle = 'rgba(14,165,233,0.08)';
      ctx.strokeStyle = 'rgba(14,165,233,0.3)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(lead.x, lead.y);
      ctx.lineTo(centerX + (lead.x - centerX) * 0.42, centerY + (lead.y - centerY) * 0.42);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  if (variantName === 'drilldown-workbench') {
    const lead = coords[ranked[0]?.index ?? 0];
    if (lead) {
      ctx.fillStyle = 'rgba(15,23,42,0.86)';
      ctx.fillRect(centerX - 54, centerY - radius - 10, 108, 18);
      drawText(ctx, 'Axis / Cluster / Detail', centerX, centerY - radius + 2, 'center', {
        color: '#e2e8f0',
        font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
      });
      ctx.beginPath();
      ctx.arc(lead.x + 12, lead.y - 12, 9, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, '+', lead.x + 12, lead.y - 9, 'center', {
        color: '#f8fafc',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    }
  }

  if (variantName === 'topology-health') {
    const maxValue = Math.max(...values, 1);
    ranked.slice(0, 3).forEach(({ index, value }) => {
      const point = coords[index];
      if (!point) {
        return;
      }
      const tone = value / maxValue > 0.72 ? '#dc2626' : value / maxValue > 0.4 ? '#f59e0b' : '#0f766e';
      ctx.strokeStyle = tone;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  if (variantName === 'cohort-breakdown') {
    coords.forEach((point, index) => {
      drawText(ctx, `C${index + 1}`, point.x + 10, point.y + 10, 'left', {
        color: '#475569',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'ranking-shift') {
    ranked.slice(0, 3).forEach(({ index }, rank) => {
      const point = coords[index];
      if (!point) {
        return;
      }
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc(point.x + 10, point.y - 10, 9, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `#${rank + 1}`, point.x + 10, point.y - 7, 'center', {
        color: '#f8fafc',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'dependency-critical-path') {
    const chain = ranked
      .slice(0, 3)
      .map(({ index }) => coords[index])
      .filter((point): point is { x: number; y: number } => Boolean(point));
    if (chain.length >= 2) {
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([5, 4]);
      drawPolyline(ctx, chain);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (variantName === 'tapered-flow') {
    const chain = ranked
      .slice(0, 4)
      .map(({ index }) => coords[index])
      .filter((point): point is { x: number; y: number } => Boolean(point));
    chain.forEach((point, index) => {
      ctx.strokeStyle = 'rgba(17,94,89,0.3)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(point.x, point.y, Math.max(3, 9 - index), 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  ctx.fillStyle = 'rgba(15,23,42,0.82)';
  ctx.fillRect(centerX - Math.max(labelFromVariant(variantName).length * 3 + 18, 44), centerY + radius + 16, Math.max(labelFromVariant(variantName).length * 6 + 24, 88), 18);
  drawText(ctx, labelFromVariant(variantName), centerX, centerY + radius + 28, 'center', {
    color: '#f8fafc',
    font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
  });
}

function drawFunnelVariantOverlay(args: {
  ctx: CanvasRenderingContext2D;
  variantName: string | null;
  values: Array<{ label: string; value: number }>;
  width: number;
  height: number;
}): void {
  const { ctx, variantName, values, width, height } = args;
  if (!variantName || !values.length) {
    return;
  }

  const segmentHeight = height / Math.max(values.length, 1);
  const conversions = values.map((item, index) => {
    if (index === 0) {
      return 100;
    }
    const previous = values[index - 1]?.value ?? item.value;
    return previous ? Math.round((item.value / previous) * 100) : 100;
  });
  const weakestIndex = (
    conversions.length > 1
      ? conversions.slice(1).reduce(
          (lowestIndex, value, index) => (value < (conversions[lowestIndex] ?? 101) ? index + 1 : lowestIndex),
          1
        )
      : 0
  );
  const bandVariants = new Set(['forecast-band', 'confidence-envelope']);
  const anomalyVariants = new Set(['anomaly-window', 'outlier-lens', 'distribution-focus', 'quantile-layers']);
  const trendVariants = new Set(['rolling-window', 'seasonal-decomposition']);
  const laneVariants = new Set(['benchmark-lanes']);
  const focusVariants = new Set(['small-multiples', 'multi-resolution']);
  const eventVariants = new Set(['event-overlay']);

  if (['goal-tracking', 'tapered-flow', 'narrative-sequence', 'control-room'].includes(variantName)) {
    values.forEach((item, index) => {
      if (index === 0) {
        return;
      }
      const previous = values[index - 1]?.value ?? item.value;
      const conversion = previous ? Math.round((item.value / previous) * 100) : 100;
      drawText(ctx, `${conversion}%`, width - 34, 20 + index * segmentHeight + 8, 'right');
      if (variantName === 'narrative-sequence') {
        ctx.fillStyle = 'rgba(15,23,42,0.86)';
        ctx.beginPath();
        ctx.arc(28, 20 + index * segmentHeight - 4, 9, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, `${index + 1}`, 28, 20 + index * segmentHeight, 'center', {
          color: '#f8fafc',
          font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
        });
      }
    });
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(width - 128, 16, 112, 18);
    drawText(ctx, 'Conversion watch', width - 72, 28, 'center', {
      color: '#67e8f9',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'comparison-grid' || variantName === 'scenario-planner') {
    ctx.strokeStyle = 'rgba(15,23,42,0.14)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    values.forEach((_, index) => {
      const y = 20 + index * segmentHeight;
      ctx.beginPath();
      ctx.moveTo(24, y);
      ctx.lineTo(width - 24, y);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (variantName === 'streaming') {
    const y = 20 + (values.length - 1) * segmentHeight - 10;
    ctx.fillStyle = 'rgba(14,165,233,0.08)';
    ctx.strokeStyle = 'rgba(14,165,233,0.28)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(20, y, width - 40, Math.max(segmentHeight - 2, 26));
    ctx.strokeRect(20, y, width - 40, Math.max(segmentHeight - 2, 26));
    drawText(ctx, 'Streaming stage', width - 34, y + 15, 'right', {
      color: '#0369a1',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (bandVariants.has(variantName)) {
    const ribbonY = 20 + Math.max(weakestIndex, 1) * segmentHeight - 14;
    ctx.fillStyle = variantName === 'forecast-band' ? 'rgba(56,189,248,0.12)' : 'rgba(15,118,110,0.1)';
    ctx.strokeStyle = variantName === 'forecast-band' ? 'rgba(2,132,199,0.34)' : 'rgba(15,118,110,0.28)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 4]);
    ctx.fillRect(width - 92, ribbonY, 56, Math.max(segmentHeight + 8, 24));
    ctx.strokeRect(width - 92, ribbonY, 56, Math.max(segmentHeight + 8, 24));
    ctx.setLineDash([]);
  }

  if (anomalyVariants.has(variantName)) {
    const top = 20 + weakestIndex * segmentHeight - 12;
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = variantName === 'outlier-lens' ? 2 : 1.6;
    ctx.strokeRect(22, top, width - 44, Math.max(segmentHeight - 8, 24));
    if (variantName === 'quantile-layers') {
      ctx.strokeStyle = 'rgba(15,23,42,0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      [0.35, 0.5, 0.65].forEach((ratio) => {
        ctx.beginPath();
        ctx.moveTo(24, 20 + segmentHeight * ratio);
        ctx.lineTo(width - 24, 20 + segmentHeight * ratio);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }
  }

  if (trendVariants.has(variantName)) {
    if (variantName === 'seasonal-decomposition') {
      values.forEach((_, index) => {
        if (index % 2 === 0) {
          ctx.fillStyle = 'rgba(148,163,184,0.05)';
          ctx.fillRect(24, 20 + index * segmentHeight - 10, width - 48, Math.max(segmentHeight - 2, 20));
        }
      });
    }
    const pathPoints = conversions.map((value, index) => ({
      x: width - 76,
      y: 20 + index * segmentHeight + 8 - (100 - value) * 0.18
    }));
    if (pathPoints.length >= 2) {
      ctx.strokeStyle = '#0f766e';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      drawPolyline(ctx, pathPoints);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  if (laneVariants.has(variantName)) {
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    [0.55, 0.8].forEach((ratio, index) => {
      const x = 32 + (width - 96) * ratio;
      ctx.strokeStyle = index === 0 ? 'rgba(2,132,199,0.26)' : 'rgba(245,158,11,0.28)';
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, height - 20);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (focusVariants.has(variantName)) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    [0, 1, 2, 3].forEach((index) => {
      const x = width - 96 + (index % 2) * 34;
      const y = height - 56 + Math.floor(index / 2) * 18;
      ctx.fillRect(x, y, 28, 12);
      ctx.strokeRect(x, y, 28, 12);
    });
    const top = 20 + weakestIndex * segmentHeight - 12;
    ctx.fillStyle = 'rgba(14,165,233,0.05)';
    ctx.strokeStyle = 'rgba(14,165,233,0.28)';
    ctx.setLineDash([4, 4]);
    ctx.fillRect(22, top, width - 44, Math.max(segmentHeight - 8, 24));
    ctx.strokeRect(22, top, width - 44, Math.max(segmentHeight - 8, 24));
    ctx.setLineDash([]);
  }

  if (eventVariants.has(variantName)) {
    [1, Math.max(1, Math.floor(values.length / 2))].forEach((index, order) => {
      const y = 20 + index * segmentHeight + 4;
      ctx.strokeStyle = 'rgba(51,65,85,0.24)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(28, y);
      ctx.lineTo(width - 28, y);
      ctx.stroke();
      ctx.setLineDash([]);
      drawText(ctx, `E${order + 1}`, 34, y - 4, 'left', {
        color: '#475569',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'threshold-alert') {
    const top = 20 + weakestIndex * segmentHeight - 12;
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(22, top, width - 44, Math.max(segmentHeight - 8, 24));
    drawText(ctx, 'Weakest conversion', width - 34, top - 4, 'right', {
      color: '#dc2626',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'drilldown-workbench') {
    const top = 20 + weakestIndex * segmentHeight;
    ctx.fillStyle = 'rgba(15,23,42,0.84)';
    ctx.fillRect(24, 8, 136, 16);
    drawText(ctx, 'Pipeline / Stage / Detail', 36, 19, 'left', {
      color: '#e2e8f0',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
    ctx.beginPath();
    ctx.arc(36, top + 6, 9, 0, Math.PI * 2);
    ctx.fill();
    drawText(ctx, '+', 36, top + 9, 'center', {
      color: '#f8fafc',
      font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'realtime-queue') {
    const y = 20 + (values.length - 1) * segmentHeight - 10;
    ctx.fillStyle = 'rgba(14,165,233,0.06)';
    ctx.strokeStyle = 'rgba(14,165,233,0.28)';
    ctx.lineWidth = 1.2;
    ctx.fillRect(24, y, width - 48, Math.max(segmentHeight - 4, 24));
    ctx.strokeRect(24, y, width - 48, Math.max(segmentHeight - 4, 24));
    drawText(ctx, 'Queue tail', width - 34, y + 14, 'right', {
      color: '#0369a1',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'cohort-breakdown') {
    values.forEach((_, index) => {
      drawText(ctx, `C${index + 1}`, 28, 20 + index * segmentHeight + 8, 'left', {
        color: '#475569',
        font: '8px -apple-system, Segoe UI, Roboto, sans-serif'
      });
    });
  }

  if (variantName === 'ranking-shift') {
    conversions
      .map((value, index) => ({ index, value }))
      .sort((left, right) => right.value - left.value)
      .slice(0, Math.min(3, conversions.length))
      .forEach(({ index }, rank) => {
        const y = 20 + index * segmentHeight + 6;
        ctx.fillStyle = 'rgba(15,23,42,0.84)';
        ctx.beginPath();
        ctx.arc(width - 24, y, 8, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, `#${rank + 1}`, width - 24, y + 3, 'center', {
          color: '#f8fafc',
          font: '7px -apple-system, Segoe UI, Roboto, sans-serif'
        });
      });
  }

  if (variantName === 'dependency-critical-path') {
    const top = 20 + weakestIndex * segmentHeight - 12;
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(22, top, width - 44, Math.max(segmentHeight - 8, 24));
    ctx.setLineDash([]);
    drawText(ctx, 'Critical step', width - 34, top - 4, 'right', {
      color: '#92400e',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }

  if (variantName === 'topology-health') {
    conversions.slice(1).forEach((conversion, index) => {
      const tone = conversion < 55 ? '#dc2626' : conversion < 75 ? '#f59e0b' : '#0f766e';
      ctx.fillStyle = tone;
      ctx.beginPath();
      ctx.arc(width - 16, 20 + (index + 1) * segmentHeight + 8, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (variantName === 'tapered-flow') {
    values.forEach((_, index) => {
      if (index == 0) {
        return;
      }
      const y = 20 + index * segmentHeight + 8;
      ctx.strokeStyle = 'rgba(17,94,89,0.35)';
      ctx.lineWidth = Math.max(1.5, 4 - index * 0.3);
      ctx.beginPath();
      ctx.moveTo(42, y);
      ctx.bezierCurveTo(width / 2, y - 6, width / 2, y - 6, width - 64, y);
      ctx.stroke();
    });
  }

  const labelWidth = Math.max(labelFromVariant(variantName).length * 6 + 24, 92);
  ctx.fillStyle = 'rgba(15,23,42,0.82)';
  ctx.fillRect(width / 2 - labelWidth / 2, height - 24, labelWidth, 18);
  drawText(ctx, labelFromVariant(variantName), width / 2, height - 11, 'center', {
    color: '#f8fafc',
    font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
  });
}

export function drawMystiqueBarChart(

  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Bar chart',
  yDomain?: [number, number],
  variantName?: string | null
): void {
  const labels = data.map((item, index) => toString(item.label, `Item ${index + 1}`));
  const values = data.map((item, index) => toNumber(item.value, index));
  const bounds = chartBounds(width, height);
  const max = Math.max(...values, 1);
  const domain: [number, number] = yDomain ?? [0, max || 1];
  const y = createLinearScale(domain, [bounds.bottom, bounds.top]);
  const x = createBandScale(labels, [bounds.left, bounds.right]);

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: labels.map((label, index) => ({
      x: x.map(label) + Math.max(x.bandwidth, 6) / 2,
      y: y.map(values[index] ?? 0)
    })),
    values,
    labels,
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  values.forEach((value, index) => {
    const left = x.map(labels[index] ?? String(index));
    const top = y.map(value);
    const barWidth = Math.max(x.bandwidth, 6);
    const barHeight = Math.max(bounds.bottom - top, 1);
    ctx.fillStyle = palette[index % palette.length];
    ctx.fillRect(left, top, barWidth, barHeight);
    drawText(ctx, toString(labels[index]), left + barWidth / 2, bounds.bottom + 14, 'center');
  });
}

export function drawMystiqueGroupedBarChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Grouped bar chart',
  variantName?: string | null
): void {
  const categories = data.map((item, index) => toString(item.label, `Item ${index + 1}`));
  const values = data.map((item) => coerceNumberList(item.values, [toNumber(item.value, 0)]));
  const x = createBandScale(categories, [chartPadding.x0, width - chartPadding.x1]);
  const max = Math.max(...values.flatMap((series) => series), 1);
  const y = createLinearScale([0, max], [height - chartPadding.y1, chartPadding.y0]);

  const maxSeries = Math.max(...values.map((series) => series.length), 1);
  const segment = x.bandwidth / maxSeries;

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: categories.map((category, index) => ({
      x: x.map(category) + x.bandwidth / 2,
      y: y.map(Math.max(...(values[index] ?? [0])))
    })),
    values: values.map((series) => series.reduce((sum, value) => sum + value, 0)),
    labels: categories,
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  values.forEach((series, categoryIndex) => {
    series.forEach((value, seriesIndex) => {
      const left = x.map(categories[categoryIndex] ?? String(categoryIndex)) + segment * seriesIndex;
      const top = y.map(value);
      ctx.fillStyle = palette[seriesIndex % palette.length];
      const barHeight = Math.max(height - chartPadding.y1 - top, 1);
      ctx.fillRect(left, top, Math.max(segment - 2, 2), barHeight);
    });
  });
}

export function drawMystiqueStackedBarChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Stacked bar chart',
  variantName?: string | null
): void {
  const labels = data.map((item, index) => toString(item.label, `Item ${index + 1}`));
  const stacks = data.map((item) => coerceNumberList(item.values, [toNumber(item.value, 0)]));
  const x = createBandScale(labels, [chartPadding.x0, width - chartPadding.x1]);
  const max = Math.max(
    ...stacks.map((series) => series.reduce((sum, value) => sum + Math.max(value, 0), 0)),
    1
  );
  const y = createLinearScale([0, max], [height - chartPadding.y1, chartPadding.y0]);

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: labels.map((label, index) => ({
      x: x.map(label) + x.bandwidth / 2,
      y: y.map(stacks[index]?.reduce((sum, value) => sum + Math.max(value, 0), 0) ?? 0)
    })),
    values: stacks.map((series) => series.reduce((sum, value) => sum + Math.max(value, 0), 0)),
    labels,
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  stacks.forEach((segment, categoryIndex) => {
    let offset = 0;
    segment.forEach((value, segmentIndex) => {
      const top = y.map(offset + value);
      const bottom = y.map(offset);
      offset += value;
      ctx.fillStyle = palette[(categoryIndex + segmentIndex) % palette.length];
      ctx.fillRect(x.map(labels[categoryIndex] ?? String(categoryIndex)), top, x.bandwidth, Math.max(bottom - top, 1));
    });
  });
}

export function drawMystiqueLineChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Line chart',
  variantName?: string | null
): void {
  const points = data.map((item, index) => ({
    x: toNumber(item.x, index),
    y: toNumber(item.y, toNumber(item.value, index))
  }));
  const yMin = Math.min(...points.map((point) => point.y), 0);
  const yMax = Math.max(...points.map((point) => point.y), 1);
  const x = createLinearScale([Math.min(...points.map((point) => point.x), 0), Math.max(...points.map((point) => point.x), 1)], [
    chartPadding.x0,
    width - chartPadding.x1
  ]);
  const y = createLinearScale([yMin, yMax], [height - chartPadding.y1, chartPadding.y0]);

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: points.map((point) => ({ x: x.map(point.x), y: y.map(point.y) })),
    values: points.map((point) => point.y),
    labels: points.map((_, index) => String(index + 1)),
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  if (points.length) {
    ctx.strokeStyle = '#115e59';
    ctx.lineWidth = 2.8;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    points.forEach((point, index) => {
      const px = x.map(point.x);
      const py = y.map(point.y);
      if (index === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    });
    ctx.stroke();
    points.forEach((point, index) => {
      const px = x.map(point.x);
      const py = y.map(point.y);
      ctx.fillStyle = '#115e59';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, String(index + 1), px + 2, py - 6, 'left');
    });
  }
}

export function drawMystiqueAreaChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Area chart',
  variantName?: string | null
): void {
  const points = data.map((item, index) => ({
    x: toNumber(item.x, index),
    y: toNumber(item.y, toNumber(item.value, 0))
  }));
  const x = createLinearScale([Math.min(...points.map((point) => point.x), 0), Math.max(...points.map((point) => point.x), 1)], [
    chartPadding.x0,
    width - chartPadding.x1
  ]);
  const y = createLinearScale([0, Math.max(...points.map((point) => point.y), 1)], [height - chartPadding.y1, chartPadding.y0]);

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: points.map((point) => ({ x: x.map(point.x), y: y.map(point.y) })),
    values: points.map((point) => point.y),
    labels: points.map((_, index) => String(index + 1)),
    width,
    height,
    mapValue: (value) => y.map(value)
  });
  ctx.beginPath();
  points.forEach((point, index) => {
    const px = x.map(point.x);
    const py = y.map(point.y);
    if (index === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  });
  const last = points[points.length - 1];
  const first = points[0];
  if (last && first) {
    ctx.lineTo(x.map(last.x), height - chartPadding.y1);
    ctx.lineTo(x.map(first.x), height - chartPadding.y1);
    ctx.closePath();
    ctx.fillStyle = 'rgba(17,94,89,0.18)';
    ctx.fill();
  }
  if (points.length) {
    ctx.beginPath();
    points.forEach((point, index) => {
      const px = x.map(point.x);
      const py = y.map(point.y);
      if (index === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    });
    ctx.strokeStyle = '#115e59';
    ctx.lineWidth = 2.8;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}

export function drawMystiqueScatterChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Scatter chart',
  radiusScale = false,
  variantName?: string | null
): void {
  const points = data.map((item, index) => ({
    x: toNumber(item.x, index),
    y: toNumber(item.y, toNumber(item.value, 0)),
    r: radiusScale ? Math.max(2, Math.sqrt(Math.max(toNumber(item.value, 12), 1))) : 4
  }));
  const x = createLinearScale([Math.min(...points.map((point) => point.x), 0), Math.max(...points.map((point) => point.x), 1)], [
    chartPadding.x0,
    width - chartPadding.x1
  ]);
  const y = createLinearScale([Math.min(...points.map((point) => point.y), 0), Math.max(...points.map((point) => point.y), 1)], [
    height - chartPadding.y1,
    chartPadding.y0
  ]);

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawScatterVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: points.map((point) => ({ x: x.map(point.x), y: y.map(point.y) })),
    values: points,
    width,
    height
  });

  points.forEach((point, index) => {
    ctx.fillStyle = palette[index % palette.length];
    const px = x.map(point.x);
    const py = y.map(point.y);
    ctx.beginPath();
    ctx.arc(px, py, point.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function drawMystiqueHistogramChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Histogram',
  variantName?: string | null
): void {
  drawMystiqueBarChart(ctx, data, width, height, title, undefined, variantName);
}

export function drawMystiqueWaterfallChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Waterfall',
  variantName?: string | null
): void {
  const labels = data.map((item, index) => toString(item.label, `Step ${index + 1}`));
  const values = data.map((item) => toNumber(item.value, 0));
  const cumulative = values.reduce(
    (state, value) => {
      state.running += value;
      state.points.push(state.running);
      return state;
    },
    { running: 0, points: [] as number[] }
  ).points;
  const max = Math.max(...cumulative.map((value) => Math.abs(value)), 1);
  const x = createBandScale(labels, [chartPadding.x0, width - chartPadding.x1]);
  const y = createLinearScale([-max, max], [height - chartPadding.y1, chartPadding.y0]);
  const bounds = chartBounds(width, height);

  ensureRect(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: labels.map((label, index) => ({
      x: x.map(label) + x.bandwidth / 2,
      y: y.map(cumulative[index] ?? 0)
    })),
    values: cumulative,
    labels,
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  let running = 0;
  values.forEach((value, index) => {
    const next = running + value;
    const top = y.map(Math.max(running, next));
    const nextY = y.map(next);
    const barHeight = Math.max(Math.abs(y.map(next) - y.map(running)), 1);
    ctx.fillStyle = value >= 0 ? palette[1] : palette[4];
    ctx.fillRect(x.map(labels[index] ?? String(index)), top, x.bandwidth, barHeight);
    if (index < values.length - 1) {
      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      const connectorX1 = x.map(labels[index] ?? String(index)) + x.bandwidth;
      const connectorX2 = x.map(labels[index + 1] ?? String(index + 1));
      ctx.setLineDash([4, 4]);
      ctx.moveTo(connectorX1, nextY);
      ctx.lineTo(connectorX2, nextY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    running = next;
  });

  if (bounds.bottom > bounds.top) {
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(bounds.left, y.map(0));
    ctx.lineTo(bounds.right, y.map(0));
    ctx.stroke();
  }
}

export function drawMystiquePieChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  _width: number,
  _height: number,
  title = 'Pie chart',
  donut = false,
  variantName?: string | null
): void {
  const width = _width;
  const height = _height;
  const values = data.map((item) => Math.max(0, toNumber(item.value, 0)));
  const total = values.reduce((sum, value) => sum + value, 0) || 1;
  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;
  let angle = -Math.PI / 2;
  let innerRadius = donut ? radius * 0.54 : 0;
  const slicesMeta: Array<{ label: string; value: number; start: number; end: number }> = [];

  clearArea(ctx, width, height, title);
  data.forEach((item, index) => {
    const slice = values[index] / total;
    const span = slice * Math.PI * 2;
    const start = angle;
    const end = angle + span;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, start, end);
    if (donut) {
      ctx.arc(centerX, centerY, innerRadius, end, start, true);
    } else {
      ctx.lineTo(centerX, centerY);
    }
    ctx.closePath();
    ctx.fillStyle = palette[index % palette.length];
    ctx.fill();
    slicesMeta.push({
      label: toString(item.label, `Slice ${index + 1}`),
      value: values[index] ?? 0,
      start,
      end
    });
    angle = end;
  });
  if (donut) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  drawPolarVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    slices: slicesMeta,
    centerX,
    centerY,
    radius,
    innerRadius
  });
}

export function drawMystiqueDonutChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Donut chart',
  variantName?: string | null
): void {
  drawMystiquePieChart(ctx, data, width, height, title, true, variantName);
}

export function drawMystiqueRadarChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Radar chart',
  variantName?: string | null
): void {
  const values = data.map((item) => toNumber(item.value, 0));
  const max = Math.max(...values, 1);
  const count = Math.max(values.length, 1);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;
  const coords = values.map((value, index) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const scaled = (value / max) * radius;
    return {
      x: centerX + Math.cos(angle) * scaled,
      y: centerY + Math.sin(angle) * scaled
    };
  });

  clearArea(ctx, width, height, title);
  drawRadarVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    values,
    coords,
    centerX,
    centerY,
    radius
  });
  ctx.strokeStyle = '#115e59';
  ctx.fillStyle = 'rgba(17,94,89,0.18)';
  ctx.beginPath();
  values.forEach((value, index) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const scaled = (value / max) * radius;
    const x = centerX + Math.cos(angle) * scaled;
    const y = centerY + Math.sin(angle) * scaled;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  values.forEach((value, index) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const scaled = (value / max) * radius;
    const x = centerX + Math.cos(angle) * scaled;
    const y = centerY + Math.sin(angle) * scaled;
    drawText(ctx, toString(data[index]?.label, `Axis ${index + 1}`), x, y, 'center');
  });
}

export function drawMystiqueCandlestickChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Candlestick',
  variantName?: string | null
): void {
  const categories = data.map((item, index) => toString(item.label, `Day ${index + 1}`));
  const ranges = data.flatMap((item) => {
    const open = toNumber(item.open, toNumber(item.value, 0));
    const high = toNumber(item.high, open);
    const low = toNumber(item.low, open);
    const close = toNumber(item.close, open);
    return [open, high, low, close];
  });
  const x = createBandScale(categories, [chartPadding.x0, width - chartPadding.x1]);
  const y = createLinearScale([Math.min(...ranges, 0), Math.max(...ranges, 1)], [height - chartPadding.y1, chartPadding.y0]);
  clearArea(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: data.map((item, index) => ({
      x: x.map(categories[index] ?? String(index)) + x.bandwidth / 2,
      y: y.map(toNumber(item.close, toNumber(item.value, 0)))
    })),
    values: data.map((item) => toNumber(item.close, toNumber(item.value, 0))),
    labels: categories,
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  data.forEach((item, index) => {
    const open = toNumber(item.open, toNumber(item.value, 0));
    const high = toNumber(item.high, open);
    const low = toNumber(item.low, open);
    const close = toNumber(item.close, open);
    const color = close >= open ? palette[2] : palette[4];
    const center = x.map(categories[index] ?? String(index)) + x.bandwidth / 2;
    const top = y.map(Math.max(open, close));
    const bottom = y.map(Math.min(open, close));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(center, y.map(high));
    ctx.lineTo(center, y.map(low));
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(center - x.bandwidth / 4, top, x.bandwidth / 2, Math.max(bottom - top, 1));
  });
}

export function drawMystiqueComboChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Combo chart',
  variantName?: string | null
): void {
  const normalized = data.map((item, index) => ({
    label: toString(item.label, `Item ${index + 1}`),
    bar: toNumber(item.bar, toNumber(item.value, 0)),
    line: toNumber(item.line, toNumber(item.value, 0))
  }));
  const bars = normalized.map((item) => item.bar);
  const lines = normalized.map((item) => item.line);
  const max = Math.max(...bars.concat(lines), 1);
  const x = createBandScale(normalized.map((item) => item.label), [chartPadding.x0, width - chartPadding.x1]);
  const y = createLinearScale([0, max], [height - chartPadding.y1, chartPadding.y0]);

  clearArea(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: normalized.map((item) => ({ x: x.map(item.label) + x.bandwidth / 2, y: y.map(item.line) })),
    values: normalized.map((item) => item.line),
    labels: normalized.map((item) => item.label),
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  normalized.forEach((item) => {
    const top = y.map(item.bar);
    ctx.fillStyle = `${palette[0]}80`;
    ctx.fillRect(x.map(item.label), top, x.bandwidth, height - chartPadding.y1 - top);
  });

  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  normalized.forEach((item, index) => {
    const px = x.map(item.label) + x.bandwidth / 2;
    const py = y.map(item.line);
    if (index === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  });
  ctx.stroke();
}

export function drawMystiqueBoxPlotChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Box plot',
  variantName?: string | null
): void {
  const categories = data.map((item, index) => toString(item.category, toString(item.label, `Category ${index + 1}`)));
  const groups = data.map((item) => coerceNumberList(item.values, [toNumber(item.value, 0)]));
  const flat = groups.flatMap((group) => group);
  const x = createBandScale(categories, [chartPadding.x0, width - chartPadding.x1]);
  const y = createLinearScale([Math.min(...flat, 0), Math.max(...flat, 1)], [height - chartPadding.y1, chartPadding.y0]);
  clearArea(ctx, width, height, title);
  drawAxes(ctx, width, height);
  drawCartesianVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    points: categories.map((category, index) => ({
      x: x.map(category) + x.bandwidth / 2,
      y: y.map((() => {
        const sorted = [...(groups[index] ?? [0])].sort((left, right) => left - right);
        return sorted[Math.floor((sorted.length - 1) * 0.5)] ?? 0;
      })())
    })),
    values: groups.map((group) => {
      const sorted = [...group].sort((left, right) => left - right);
      return sorted[Math.floor((sorted.length - 1) * 0.5)] ?? 0;
    }),
    labels: categories,
    width,
    height,
    mapValue: (value) => y.map(value)
  });

  groups.forEach((group, index) => {
    if (!group.length) {
      return;
    }
    const sorted = [...group].sort((left, right) => left - right);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const q1 = sorted[Math.floor((sorted.length - 1) * 0.25)] ?? min;
    const q2 = sorted[Math.floor((sorted.length - 1) * 0.5)] ?? min;
    const q3 = sorted[Math.floor((sorted.length - 1) * 0.75)] ?? min;

    const left = x.map(categories[index] ?? String(index));
    const center = left + x.bandwidth / 2;
    const top = y.map(q3);
    const bottom = y.map(q1);
    const minY = y.map(min);
    const maxY = y.map(max);
    const medianY = y.map(q2);

    ctx.strokeStyle = '#334155';
    ctx.fillStyle = 'rgba(17,94,89,0.1)';
    ctx.fillRect(left + 2, top, Math.max(x.bandwidth - 4, 1), Math.max(bottom - top, 1));
    ctx.beginPath();
    ctx.moveTo(center, minY);
    ctx.lineTo(center, maxY);
    ctx.moveTo(center - 8, minY);
    ctx.lineTo(center + 8, minY);
    ctx.moveTo(center - 8, maxY);
    ctx.lineTo(center + 8, maxY);
    ctx.moveTo(center - 6, medianY);
    ctx.lineTo(center + 6, medianY);
    ctx.stroke();
  });
}

export function drawMystiqueHeatmap(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Heatmap',
  variantName?: string | null
): void {
  const cells = data.map((item) => ({
    x: toNumber(item.x, 0),
    y: toNumber(item.y, 0),
    value: toNumber(item.value, 0)
  }));
  const cols = Math.max(...cells.map((cell) => cell.x), 0) + 1;
  const rows = Math.max(...cells.map((cell) => cell.y), 0) + 1;
  const cellWidth = (width - chartPadding.x0 - chartPadding.x1) / Math.max(cols, 1);
  const cellHeight = (height - chartPadding.y0 - chartPadding.y1) / Math.max(rows, 1);
  const max = Math.max(...cells.map((cell) => cell.value), 1);
  const hottestCells = [...cells].sort((left, right) => right.value - left.value).slice(0, Math.min(3, cells.length));
  const variantKey = variantName ?? '';
  const bandVariants = new Set(['forecast-band', 'confidence-envelope']);
  const trendVariants = new Set(['rolling-window', 'seasonal-decomposition']);
  const laneVariants = new Set(['benchmark-lanes']);
  const focusVariants = new Set(['scenario-planner', 'small-multiples']);
  const distributionVariants = new Set(['quantile-layers', 'distribution-focus', 'outlier-lens']);
  clearArea(ctx, width, height, title);

  cells.forEach((cell) => {
    const tone = Math.max(Math.min(cell.value / max, 1), 0);
    ctx.fillStyle = `rgba(17, 94, 89, ${0.15 + tone * 0.8})`;
    ctx.fillRect(chartPadding.x0 + cell.x * cellWidth, chartPadding.y0 + cell.y * cellHeight, cellWidth - 2, cellHeight - 2);
  });

  if (variantName === 'multi-resolution' || variantName === 'comparison-grid') {
    ctx.strokeStyle = 'rgba(15,23,42,0.16)';
    ctx.lineWidth = 1;
    for (let column = 0; column <= cols; column += 2) {
      ctx.beginPath();
      ctx.moveTo(chartPadding.x0 + column * cellWidth, chartPadding.y0);
      ctx.lineTo(chartPadding.x0 + column * cellWidth, height - chartPadding.y1);
      ctx.stroke();
    }
    for (let row = 0; row <= rows; row += 2) {
      ctx.beginPath();
      ctx.moveTo(chartPadding.x0, chartPadding.y0 + row * cellHeight);
      ctx.lineTo(width - chartPadding.x1, chartPadding.y0 + row * cellHeight);
      ctx.stroke();
    }
  }

  if (variantName === 'anomaly-window' || variantName === 'control-room') {
    cells
      .filter((cell) => cell.value >= max * 0.82)
      .forEach((cell) => {
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1.6;
        ctx.strokeRect(chartPadding.x0 + cell.x * cellWidth, chartPadding.y0 + cell.y * cellHeight, cellWidth - 2, cellHeight - 2);
      });
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(width - 132, 20, 120, 42);
    drawText(ctx, 'THERMAL WATCH', width - 72, 36, 'center', { color: '#e2e8f0', font: '10px -apple-system, Segoe UI, Roboto, sans-serif' });
    drawText(ctx, 'Hot cells highlighted', width - 72, 52, 'center', { color: '#67e8f9', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  }

  if (variantName === 'threshold-alert' || variantName === 'goal-tracking') {
    const cutoff = max * (variantName === 'threshold-alert' ? 0.78 : 0.64);
    cells
      .filter((cell) => cell.value >= cutoff)
      .forEach((cell) => {
        ctx.strokeStyle = variantName === 'threshold-alert' ? '#dc2626' : '#0284c7';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(chartPadding.x0 + cell.x * cellWidth, chartPadding.y0 + cell.y * cellHeight, cellWidth - 2, cellHeight - 2);
      });
  }

  if (variantName === 'narrative-sequence') {
    hottestCells.forEach((cell, index) => {
      const x = chartPadding.x0 + cell.x * cellWidth + cellWidth - 12;
      const y = chartPadding.y0 + cell.y * cellHeight + 12;
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `${index + 1}`, x, y + 3, 'center', { color: '#f8fafc', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
    });
  }

  if (variantName === 'drilldown-workbench') {
    const lead = hottestCells[0];
    if (lead) {
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.fillRect(36, 10, Math.max(width - 180, 180), 16);
      drawText(ctx, 'Ops / Region / Detail target', 48, 21, 'left', { color: '#e2e8f0', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(chartPadding.x0 + lead.x * cellWidth - 2, chartPadding.y0 + lead.y * cellHeight - 2, Math.max(cellWidth + 2, 6), Math.max(cellHeight + 2, 6));
      ctx.setLineDash([]);
    }
  }

  if (variantName === 'realtime-queue') {
    const lastColumn = Math.max(...cells.map((cell) => cell.x));
    const queueStart = Math.max(lastColumn - 1, 0);
    ctx.fillStyle = 'rgba(14,165,233,0.06)';
    ctx.fillRect(chartPadding.x0 + queueStart * cellWidth, chartPadding.y0, Math.max((lastColumn - queueStart + 1) * cellWidth, cellWidth), rows * cellHeight);
    drawText(ctx, 'Recent queue', chartPadding.x0 + queueStart * cellWidth + 8, 22, 'left', { color: '#0369a1', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  }

  if (variantName === 'dense') {
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    for (let column = 0; column <= cols; column += 1) {
      ctx.beginPath();
      ctx.moveTo(chartPadding.x0 + column * cellWidth, chartPadding.y0);
      ctx.lineTo(chartPadding.x0 + column * cellWidth, height - chartPadding.y1);
      ctx.stroke();
    }
    for (let row = 0; row <= rows; row += 1) {
      ctx.beginPath();
      ctx.moveTo(chartPadding.x0, chartPadding.y0 + row * cellHeight);
      ctx.lineTo(width - chartPadding.x1, chartPadding.y0 + row * cellHeight);
      ctx.stroke();
    }
  }

  if (bandVariants.has(variantKey)) {
    const bandStart = variantName === 'forecast-band' ? Math.max(cols - 2, 0) : Math.max(Math.floor(cols / 2) - 1, 0);
    const bandWidth = variantName === 'forecast-band' ? Math.max(2 * cellWidth, cellWidth) : Math.max(3 * cellWidth, cellWidth);
    ctx.fillStyle = variantName === 'forecast-band' ? 'rgba(56,189,248,0.1)' : 'rgba(15,118,110,0.08)';
    ctx.strokeStyle = variantName === 'forecast-band' ? 'rgba(2,132,199,0.26)' : 'rgba(15,118,110,0.22)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.fillRect(chartPadding.x0 + bandStart * cellWidth, chartPadding.y0, bandWidth, rows * cellHeight);
    ctx.strokeRect(chartPadding.x0 + bandStart * cellWidth, chartPadding.y0, bandWidth, rows * cellHeight);
    ctx.setLineDash([]);
  }

  if (trendVariants.has(variantKey)) {
    if (variantName === 'seasonal-decomposition') {
      for (let row = 0; row < rows; row += 2) {
        ctx.fillStyle = 'rgba(148,163,184,0.04)';
        ctx.fillRect(chartPadding.x0, chartPadding.y0 + row * cellHeight, cols * cellWidth, Math.max(cellHeight, 4));
      }
    }
    ctx.strokeStyle = 'rgba(15,118,110,0.24)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(chartPadding.x0 + cellWidth, chartPadding.y0 + cellHeight, Math.max(cols * cellWidth - cellWidth * 2, cellWidth), Math.max(rows * cellHeight - cellHeight * 2, cellHeight));
    ctx.setLineDash([]);
  }

  if (laneVariants.has(variantKey)) {
    const midColumn = Math.max(Math.floor(cols * 0.6), 1);
    const midRow = Math.max(Math.floor(rows * 0.4), 1);
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(2,132,199,0.26)';
    ctx.beginPath();
    ctx.moveTo(chartPadding.x0 + midColumn * cellWidth, chartPadding.y0);
    ctx.lineTo(chartPadding.x0 + midColumn * cellWidth, height - chartPadding.y1);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(245,158,11,0.24)';
    ctx.beginPath();
    ctx.moveTo(chartPadding.x0, chartPadding.y0 + midRow * cellHeight);
    ctx.lineTo(width - chartPadding.x1, chartPadding.y0 + midRow * cellHeight);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (focusVariants.has(variantKey)) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    [0, 1, 2, 3].forEach((index) => {
      const x = width - 92 + (index % 2) * 34;
      const y = 12 + Math.floor(index / 2) * 18;
      ctx.fillRect(x, y, 28, 12);
      ctx.strokeRect(x, y, 28, 12);
    });
  }

  if (variantName === 'event-overlay') {
    const eventColumn = hottestCells[0]?.x ?? Math.max(Math.floor(cols / 2), 0);
    const x = chartPadding.x0 + eventColumn * cellWidth + cellWidth / 2;
    ctx.strokeStyle = 'rgba(51,65,85,0.28)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x, chartPadding.y0);
    ctx.lineTo(x, height - chartPadding.y1);
    ctx.stroke();
    ctx.setLineDash([]);
    drawText(ctx, 'E1', x, 20, 'center', { color: '#475569', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
  }

  if (distributionVariants.has(variantKey)) {
    hottestCells.forEach((cell, index) => {
      const inset = index === 0 && variantName === 'outlier-lens' ? -2 : 2;
      ctx.strokeStyle = index === 0 ? '#dc2626' : 'rgba(15,118,110,0.3)';
      ctx.lineWidth = variantName === 'outlier-lens' ? 2 : 1.2;
      ctx.strokeRect(chartPadding.x0 + cell.x * cellWidth + inset, chartPadding.y0 + cell.y * cellHeight + inset, Math.max(cellWidth - inset * 2, 4), Math.max(cellHeight - inset * 2, 4));
    });
  }

  if (variantName) {
    const labelWidth = Math.max(labelFromVariant(variantName).length * 6 + 24, 92);
    ctx.fillStyle = 'rgba(15,23,42,0.82)';
    ctx.fillRect(width - labelWidth - 16, height - 28, labelWidth, 18);
    drawText(ctx, labelFromVariant(variantName), width - labelWidth / 2 - 16, height - 15, 'center', {
      color: '#f8fafc',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }
}

export function drawMystiqueTreemap(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Treemap',
  variantName?: string | null
): void {
  const items = data.map((item, index) => ({
    label: toString(item.label, `Node ${index + 1}`),
    value: Math.max(toNumber(item.value, 0), 0.01)
  }));
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  let offsetX = chartPadding.x0;
  const layoutItems: Array<{ label: string; value: number; left: number; width: number }> = [];
  const variantKey = variantName ?? '';
  const bandVariants = new Set(['forecast-band']);
  const trendVariants = new Set(['rolling-window']);
  const focusVariants = new Set(['small-multiples', 'multi-resolution']);
  const realtimeVariants = new Set(['realtime-queue']);

  clearArea(ctx, width, height, title);
  items.forEach((item, index) => {
    const segmentWidth = (item.value / total) * (width - chartPadding.x0 - chartPadding.x1);
    ctx.fillStyle = palette[index % palette.length];
    ctx.fillRect(offsetX, chartPadding.y0, segmentWidth, height - chartPadding.y0 - chartPadding.y1);
    drawText(ctx, item.label, offsetX + segmentWidth / 2, height / 2, 'center', { color: '#ffffff' });
    layoutItems.push({ label: item.label, value: item.value, left: offsetX, width: segmentWidth });
    offsetX += segmentWidth;
  });

  if (variantName === 'drilldown-workbench') {
    const spotlight = [...layoutItems].sort((left, right) => right.value - left.value).slice(0, 3);
    ctx.fillStyle = 'rgba(15,23,42,0.82)';
    ctx.fillRect(24, 8, width - 48, 16);
    drawText(ctx, 'Workspace / Segment / Drilldown target', 36, 19, 'left', { color: '#e2e8f0', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
    spotlight.forEach((item, index) => {
      ctx.strokeStyle = index === 0 ? '#38bdf8' : '#f8fafc';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(item.left + 6, 30, Math.max(item.width - 12, 14), height - 60);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(15,23,42,0.72)';
      ctx.beginPath();
      ctx.arc(item.left + item.width - 16, 42, 8, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `${index + 1}`, item.left + item.width - 16, 45, 'center', { color: '#f8fafc', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
    });
  }

  if (variantName === 'comparison-grid') {
    layoutItems.slice(1).forEach((item) => {
      ctx.strokeStyle = 'rgba(15,23,42,0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(item.left, 30);
      ctx.lineTo(item.left, height - 30);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  if (variantName === 'anomaly-window') {
    [...layoutItems]
      .sort((left, right) => right.value - left.value)
      .slice(0, 2)
      .forEach((item, index) => {
        ctx.strokeStyle = index === 0 ? '#dc2626' : '#f59e0b';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(item.left + 6, 36, Math.max(item.width - 12, 12), height - 72);
      });
  }

  if (variantName === 'goal-tracking') {
    const lead = [...layoutItems].sort((left, right) => right.value - left.value)[0];
    if (lead) {
      const percent = Math.round((lead.value / total) * 100);
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillRect(lead.left + 10, 40, 62, 22);
      drawText(ctx, `${percent}% goal`, lead.left + 41, 55, 'center', { color: '#0f172a', font: '10px -apple-system, Segoe UI, Roboto, sans-serif' });
    }
  }

  if (variantName === 'narrative-sequence') {
    [...layoutItems]
      .sort((left, right) => right.value - left.value)
      .slice(0, 3)
      .forEach((item, index) => {
        ctx.fillStyle = 'rgba(15,23,42,0.84)';
        ctx.beginPath();
        ctx.arc(item.left + 18, 46, 10, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, `${index + 1}`, item.left + 18, 49, 'center', { color: '#f8fafc', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
      });
  }

  if (variantName === 'control-room') {
    const ranked = [...layoutItems].sort((left, right) => right.value - left.value);
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(width - 148, 10, 132, 24);
    drawText(ctx, 'Treemap watch', width - 82, 26, 'center', { color: '#67e8f9', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
    ranked.slice(0, 2).forEach((item) => {
      ctx.strokeStyle = 'rgba(56,189,248,0.5)';
      ctx.lineWidth = 1.6;
      ctx.strokeRect(item.left + 4, 34, Math.max(item.width - 8, 14), height - 68);
    });
  }

  if (variantName === 'area') {
    const lead = [...layoutItems].sort((left, right) => right.value - left.value)[0];
    if (lead) {
      const percent = Math.round((lead.value / total) * 100);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.strokeStyle = 'rgba(15,23,42,0.08)';
      ctx.lineWidth = 1;
      ctx.fillRect(lead.left + 10, height - 60, 72, 20);
      ctx.strokeRect(lead.left + 10, height - 60, 72, 20);
      drawText(ctx, `${percent}% share`, lead.left + 46, height - 46, 'center', { color: '#0f172a', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
    }
  }

  if (bandVariants.has(variantKey)) {
    [...layoutItems]
      .sort((left, right) => left.left - right.left)
      .slice(-2)
      .forEach((item) => {
        ctx.fillStyle = 'rgba(56,189,248,0.08)';
        ctx.strokeStyle = 'rgba(2,132,199,0.24)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.fillRect(item.left + 4, 34, Math.max(item.width - 8, 14), height - 68);
        ctx.strokeRect(item.left + 4, 34, Math.max(item.width - 8, 14), height - 68);
        ctx.setLineDash([]);
      });
  }

  if (trendVariants.has(variantKey)) {
    layoutItems.forEach((item, index) => {
      if (index % 2 === 0) {
        ctx.fillStyle = 'rgba(148,163,184,0.08)';
        ctx.fillRect(item.left, height - 42, Math.max(item.width, 12), 10);
      }
    });
  }

  if (focusVariants.has(variantKey)) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.strokeStyle = 'rgba(15,23,42,0.08)';
    ctx.lineWidth = 1;
    [0, 1, 2, 3].forEach((index) => {
      const x = width - 100 + (index % 2) * 36;
      const y = height - 54 + Math.floor(index / 2) * 18;
      ctx.fillRect(x, y, 30, 12);
      ctx.strokeRect(x, y, 30, 12);
    });
    const lead = [...layoutItems].sort((left, right) => right.value - left.value)[0];
    if (lead) {
      ctx.strokeStyle = 'rgba(14,165,233,0.3)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(lead.left + 6, 34, Math.max(lead.width - 12, 16), height - 68);
      ctx.setLineDash([]);
    }
  }

  if (realtimeVariants.has(variantKey)) {
    const tail = [...layoutItems].sort((left, right) => left.left - right.left).slice(-1)[0];
    if (tail) {
      ctx.fillStyle = 'rgba(14,165,233,0.06)';
      ctx.strokeStyle = 'rgba(14,165,233,0.24)';
      ctx.lineWidth = 1;
      ctx.fillRect(tail.left, 30, Math.max(tail.width, 12), height - 60);
      ctx.strokeRect(tail.left, 30, Math.max(tail.width, 12), height - 60);
      drawText(ctx, 'Recent', tail.left + Math.max(tail.width / 2, 12), height - 18, 'center', { color: '#0369a1', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
    }
  }

  if (variantName) {
    const labelWidth = Math.max(labelFromVariant(variantName).length * 6 + 24, 96);
    ctx.fillStyle = 'rgba(15,23,42,0.82)';
    ctx.fillRect(width - labelWidth - 16, height - 28, labelWidth, 18);
    drawText(ctx, labelFromVariant(variantName), width - labelWidth / 2 - 16, height - 15, 'center', {
      color: '#f8fafc',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }
}

export function drawMystiqueNetworkChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Network',
  sankey = false,
  variantName?: string | null
): void {
  const edges = data
    .map((item, index) => ({
      source: toString(item.source, `S${index}`),
      target: toString(item.target, `T${index}`),
      value: Math.max(1, toNumber(item.value, 1))
    }))
    .filter((edge) => edge.source && edge.target);
  const nodes = [...new Set(edges.flatMap((edge) => [edge.source, edge.target]))];
  clearArea(ctx, width, height, title);
  const map = sankey ? layoutSankeyNodes(nodes, edges, width, height) : layoutGridNodes(nodes, width, height);
  const nodeWeights = new Map<string, number>();
  edges.forEach((edge) => {
    nodeWeights.set(edge.source, (nodeWeights.get(edge.source) ?? 0) + edge.value);
    nodeWeights.set(edge.target, (nodeWeights.get(edge.target) ?? 0) + edge.value);
  });
  const maxWeight = Math.max(...nodeWeights.values(), 1);
  const criticalEdges = [...edges].sort((left, right) => right.value - left.value).slice(0, Math.min(2, edges.length));
  const sinkNodes = nodes.filter((node) => !edges.some((edge) => edge.source === node));
  const sourceNodes = nodes.filter((node) => !edges.some((edge) => edge.target === node));
  const variantEmphasisesCriticalPath = ['dependency-critical-path', 'control-room', 'narrative-sequence', 'goal-tracking'].includes(variantName ?? '');

  const drawRibbon = (source: { x: number; y: number }, target: { x: number; y: number }, startWidth: number, endWidth: number, fillStyle: string) => {
    const deltaX = target.x - source.x;
    const deltaY = target.y - source.y;
    const length = Math.hypot(deltaX, deltaY) || 1;
    const normalX = -deltaY / length;
    const normalY = deltaX / length;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.moveTo(source.x + normalX * startWidth, source.y + normalY * startWidth);
    ctx.lineTo(target.x + normalX * endWidth, target.y + normalY * endWidth);
    ctx.lineTo(target.x - normalX * endWidth, target.y - normalY * endWidth);
    ctx.lineTo(source.x - normalX * startWidth, source.y - normalY * startWidth);
    ctx.closePath();
    ctx.fill();
  };

  edges.forEach((edge) => {
    const source = map.get(edge.source);
    const target = map.get(edge.target);
    if (!source || !target) {
      return;
    }
    const stroke = sankey ? Math.max(2, Math.sqrt(edge.value)) : Math.max(1.5, Math.min(6, Math.sqrt(edge.value)));
    const isCritical = criticalEdges.some((item) => item.source === edge.source && item.target === edge.target && item.value === edge.value);
    const sourcePoint = { x: sankey ? source.x + 34 : source.x, y: source.y };
    const targetPoint = { x: sankey ? target.x - 34 : target.x, y: target.y };
    if (variantName === 'tapered-flow') {
      drawRibbon(sourcePoint, targetPoint, stroke * 0.75, sankey ? Math.max(stroke * 0.3, 1.5) : Math.max(stroke * 0.45, 1.2), isCritical ? 'rgba(217,119,6,0.38)' : 'rgba(17,94,89,0.28)');
      return;
    }
    ctx.strokeStyle = isCritical && variantEmphasisesCriticalPath ? 'rgba(217,119,6,0.72)' : variantName === 'ranking-shift' ? 'rgba(37,99,235,0.42)' : 'rgba(17,94,89,0.45)';
    ctx.lineWidth = isCritical && variantEmphasisesCriticalPath ? stroke + 1.6 : stroke;
    ctx.beginPath();
    ctx.moveTo(sourcePoint.x, sourcePoint.y);
    ctx.lineTo(targetPoint.x, targetPoint.y);
    ctx.stroke();
    if (variantName === 'narrative-sequence' && isCritical) {
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc((sourcePoint.x + targetPoint.x) / 2, (sourcePoint.y + targetPoint.y) / 2 - 10, 8, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, '!', (sourcePoint.x + targetPoint.x) / 2, (sourcePoint.y + targetPoint.y) / 2 - 7, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
    }
  });

  nodes.forEach((node) => {
    const point = map.get(node);
    if (!point) {
      return;
    }
    const intensity = (nodeWeights.get(node) ?? 0) / maxWeight;
    const tone =
      variantName === 'topology-health' || variantName === 'control-room' || variantName === 'goal-tracking'
        ? intensity > 0.72
          ? '#dc2626'
          : intensity > 0.4
            ? '#f59e0b'
            : '#0f766e'
        : '#115e59';
    ctx.fillStyle = tone;
    if (sankey) {
      if (variantName === 'realtime-queue' && sinkNodes.includes(node)) {
        ctx.fillStyle = 'rgba(14,165,233,0.06)';
        ctx.fillRect(point.x - 38, point.y - 18, 76, 36);
        ctx.fillStyle = tone;
      }
      ctx.fillRect(point.x - 34, point.y - 14, 68, 28);
      if (variantName === 'control-room' || variantName === 'goal-tracking' || variantName === 'topology-health') {
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(point.x + 26, point.y - 8, 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (variantName === 'drilldown-workbench') {
        ctx.fillStyle = 'rgba(15,23,42,0.78)';
        ctx.beginPath();
        ctx.arc(point.x - 26, point.y - 8, 6, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, '+', point.x - 26, point.y - 5, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
        ctx.fillStyle = tone;
      }
      if (variantName === 'narrative-sequence') {
        ctx.fillStyle = 'rgba(15,23,42,0.84)';
        ctx.beginPath();
        ctx.arc(point.x, point.y - 18, 8, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, `${Math.max(nodes.indexOf(node) + 1, 1)}`, point.x, point.y - 15, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
        ctx.fillStyle = tone;
      }
      if (variantName === 'ranking-shift') {
        ctx.fillStyle = 'rgba(15,23,42,0.84)';
        ctx.beginPath();
        ctx.arc(point.x, point.y - 18, 8, 0, Math.PI * 2);
        ctx.fill();
        drawText(ctx, `#${Math.max(nodes.indexOf(node) + 1, 1)}`, point.x, point.y - 15, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
        ctx.fillStyle = tone;
      }
      drawText(ctx, node, point.x, point.y + 4, 'center', { color: '#f8fafc' });
      if (variantName === 'cohort-breakdown') {
        drawText(ctx, sourceNodes.includes(node) ? 'Source cohort' : sinkNodes.includes(node) ? 'Sink cohort' : 'Bridge cohort', point.x, point.y + 24, 'center', { color: '#475569', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
      }
      return;
    }
    if (variantName === 'realtime-queue' && sinkNodes.includes(node)) {
      ctx.strokeStyle = 'rgba(14,165,233,0.28)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(point.x - 20, point.y - 20, 40, 40);
    }
    if (variantName === 'topology-health' || variantName === 'control-room' || variantName === 'realtime-queue') {
      ctx.strokeStyle = tone;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 19, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
    ctx.fill();
    drawText(ctx, node, point.x, point.y + 3, 'center', { color: '#f8fafc' });
    if (variantName === 'drilldown-workbench') {
      ctx.fillStyle = 'rgba(15,23,42,0.78)';
      ctx.beginPath();
      ctx.arc(point.x + 10, point.y - 10, 6, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, '+', point.x + 10, point.y - 7, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
    }
    if (variantName === 'goal-tracking' && sinkNodes.includes(node)) {
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.fillRect(point.x - 20, point.y + 18, 40, 14);
      drawText(ctx, 'Target', point.x, point.y + 28, 'center', { color: '#0f172a', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
      ctx.fillStyle = tone;
    }
    if (variantName === 'narrative-sequence') {
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc(point.x - 12, point.y - 14, 8, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `${Math.max(nodes.indexOf(node) + 1, 1)}`, point.x - 12, point.y - 11, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
      ctx.fillStyle = tone;
    }
    if (variantName === 'ranking-shift') {
      ctx.fillStyle = 'rgba(15,23,42,0.84)';
      ctx.beginPath();
      ctx.arc(point.x + 12, point.y - 14, 8, 0, Math.PI * 2);
      ctx.fill();
      drawText(ctx, `#${Math.max(nodes.indexOf(node) + 1, 1)}`, point.x + 12, point.y - 11, 'center', { color: '#f8fafc', font: '7px -apple-system, Segoe UI, Roboto, sans-serif' });
      ctx.fillStyle = tone;
    }
    if (variantName === 'cohort-breakdown') {
      drawText(ctx, sourceNodes.includes(node) ? 'Source cohort' : sinkNodes.includes(node) ? 'Sink cohort' : 'Bridge cohort', point.x, point.y + 26, 'center', { color: '#475569', font: '8px -apple-system, Segoe UI, Roboto, sans-serif' });
    }
  });

  if (variantName === 'comparison-grid' && !sankey) {
    ctx.strokeStyle = 'rgba(15,23,42,0.14)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    [0.25, 0.5, 0.75].forEach((ratio) => {
      ctx.beginPath();
      ctx.moveTo(width * ratio, chartPadding.y0);
      ctx.lineTo(width * ratio, height - chartPadding.y1);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  if (variantName === 'control-room') {
    ctx.fillStyle = 'rgba(15,23,42,0.9)';
    ctx.fillRect(width - 144, 18, 128, 44);
    drawText(ctx, 'Topology watch', width - 80, 34, 'center', { color: '#e2e8f0', font: '10px -apple-system, Segoe UI, Roboto, sans-serif' });
    drawText(ctx, 'Critical path surfaced', width - 80, 50, 'center', { color: '#67e8f9', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  } else if (variantName === 'realtime-queue') {
    ctx.fillStyle = 'rgba(14,165,233,0.12)';
    ctx.fillRect(width - 144, 18, 128, 44);
    drawText(ctx, 'Queue watch', width - 80, 34, 'center', { color: '#0f172a', font: '10px -apple-system, Segoe UI, Roboto, sans-serif' });
    drawText(ctx, 'Newest sinks highlighted', width - 80, 50, 'center', { color: '#0369a1', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  } else if (variantName === 'dependency-critical-path') {
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(width - 164, 18, 148, 24);
    drawText(ctx, 'Critical path emphasised', width - 90, 34, 'center', { color: '#f8fafc', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  } else if (variantName === 'cohort-breakdown') {
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(width - 170, 18, 154, 24);
    drawText(ctx, 'Source, bridge, sink cohorts', width - 93, 34, 'center', { color: '#f8fafc', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  } else if (variantName === 'ranking-shift') {
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(width - 152, 18, 136, 24);
    drawText(ctx, 'Node priority ranked', width - 84, 34, 'center', { color: '#f8fafc', font: '9px -apple-system, Segoe UI, Roboto, sans-serif' });
  } else if (variantName) {
    const labelWidth = Math.max(labelFromVariant(variantName).length * 6 + 24, 110);
    ctx.fillStyle = 'rgba(15,23,42,0.88)';
    ctx.fillRect(width - labelWidth - 16, 18, labelWidth, 24);
    drawText(ctx, labelFromVariant(variantName), width - labelWidth / 2 - 16, 34, 'center', {
      color: '#f8fafc',
      font: '9px -apple-system, Segoe UI, Roboto, sans-serif'
    });
  }
}

export function drawMystiqueSankeyChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Sankey',
  variantName?: string | null
): void {
  drawMystiqueNetworkChart(ctx, data, width, height, title, true, variantName);
}

export function drawMystiqueFunnelChart(
  ctx: CanvasRenderingContext2D,
  data: GenericDatum[],
  width: number,
  height: number,
  title = 'Funnel',
  variantName?: string | null
): void {
  const rows = data.map((item, index) => ({
    label: toString(item.label, `Stage ${index + 1}`),
    value: Math.max(toNumber(item.value, 1), 0.0001)
  }));
  const total = Math.max(...rows.map((item) => item.value), 1);
  const stageHeight = height / Math.max(rows.length, 1);
  clearArea(ctx, width, height, title);
  rows.forEach((row, index) => {
    const top = index * stageHeight + chartPadding.y0;
    const bottom = Math.min(top + stageHeight - 4, height - chartPadding.y1);
    const topWidth = (row.value / total) * (width - chartPadding.x0 - chartPadding.x1);
    const bottomWidth = Math.max(topWidth - 24, 20);
    const xTop = chartPadding.x0 + (width - chartPadding.x0 - chartPadding.x1 - topWidth) / 2;
    const xBottom = chartPadding.x0 + (width - chartPadding.x0 - chartPadding.x1 - bottomWidth) / 2;
    ctx.fillStyle = palette[index % palette.length];
    ctx.beginPath();
    ctx.moveTo(xTop, top);
    ctx.lineTo(xTop + topWidth, top);
    ctx.lineTo(xBottom + bottomWidth, bottom);
    ctx.lineTo(xBottom, bottom);
    ctx.closePath();
    ctx.fill();
    drawText(ctx, row.label, width / 2, top + stageHeight / 2, 'center', { color: '#ffffff' });
  });
  drawFunnelVariantOverlay({
    ctx,
    variantName: variantName ?? null,
    values: rows,
    width,
    height
  });
}

export function drawMystiqueChart(
  ctx: CanvasRenderingContext2D,
  type: string,
  data: GenericDatum[],
  width: number,
  height: number,
  title?: string
): void {
  const chartType = resolveChartType(type);
  const variantName = getChartVariantName(type);
  switch (chartType) {
    case 'heatmap':
      return drawMystiqueHeatmap(ctx, data, width, height, title ?? 'Heatmap', variantName);
    case 'treemap':
      return drawMystiqueTreemap(ctx, data, width, height, title ?? 'Treemap', variantName);
    case 'bar':
      return drawMystiqueBarChart(ctx, data, width, height, title ?? 'Bar chart', undefined, variantName);
    case 'grouped-bar':
      return drawMystiqueGroupedBarChart(ctx, data, width, height, title ?? 'Grouped bar chart', variantName);
    case 'stacked-bar':
      return drawMystiqueStackedBarChart(ctx, data, width, height, title ?? 'Stacked bar chart', variantName);
    case 'line':
      return drawMystiqueLineChart(ctx, data, width, height, title ?? 'Line chart', variantName);
    case 'area':
      return drawMystiqueAreaChart(ctx, data, width, height, title ?? 'Area chart', variantName);
    case 'scatter':
      return drawMystiqueScatterChart(ctx, data, width, height, title ?? 'Scatter chart', false, variantName);
    case 'bubble':
      return drawMystiqueScatterChart(ctx, data, width, height, title ?? 'Bubble chart', true, variantName);
    case 'histogram':
      return drawMystiqueHistogramChart(ctx, data, width, height, title ?? 'Histogram', variantName);
    case 'waterfall':
      return drawMystiqueWaterfallChart(ctx, data, width, height, title ?? 'Waterfall', variantName);
    case 'pie':
      return drawMystiquePieChart(ctx, data, width, height, title ?? 'Pie', false, variantName);
    case 'donut':
      return drawMystiqueDonutChart(ctx, data, width, height, title ?? 'Donut', variantName);
    case 'radar':
      return drawMystiqueRadarChart(ctx, data, width, height, title ?? 'Radar', variantName);
    case 'candlestick':
      return drawMystiqueCandlestickChart(ctx, data, width, height, title ?? 'Candlestick', variantName);
    case 'combo':
      return drawMystiqueComboChart(ctx, data, width, height, title ?? 'Combo', variantName);
    case 'box-plot':
      return drawMystiqueBoxPlotChart(ctx, data, width, height, title ?? 'Box plot', variantName);
    case 'network':
      return drawMystiqueNetworkChart(ctx, data, width, height, title ?? 'Network', false, variantName);
    case 'sankey':
      return drawMystiqueSankeyChart(ctx, data, width, height, title ?? 'Sankey', variantName);
    case 'funnel':
      return drawMystiqueFunnelChart(ctx, data, width, height, title ?? 'Funnel', variantName);
    default:
      return drawMystiqueLineChart(ctx, data, width, height, title ?? 'Chart', variantName);
  }
}

export { palette };
