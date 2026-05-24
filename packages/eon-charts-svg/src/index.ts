import { createBandScale, createChartDefinition, createLinearScale, resolveChartType } from '@eonui/charts-core';
import type { ChartDefinition, ChartOptions, ChartType } from '@eonui/charts-core';

type GenericDatum = Record<string, unknown>;

type Palette = [string, ...string[]];
type Point2D = { x: number; y: number };
type PlotBounds = { left: number; right: number; top: number; bottom: number };

const basePalette = ['#115e59', '#0f766e', '#15803d', '#b45309', '#b91c1c', '#4338ca', '#0f172a', '#7c3aed'] as Palette;

const defaultRadius = 4;

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

function coerceNumberList(raw: unknown, fallback: number[] = []): number[] {
  if (Array.isArray(raw)) {
    return raw.map((item) => toNumber(item, 0));
  }

  if (typeof raw === 'string') {
    const values = raw
      .split(',')
      .map((item) => toNumber(item.trim(), NaN))
      .filter((item) => Number.isFinite(item));
    return values.length ? values : fallback;
  }

  return fallback;
}

function linePath(points: Array<{ x: number; y: number }>): string {
  if (!points.length) {
    return '';
  }

  return points.reduce((path, point, index) => {
    return `${path} ${index ? 'L' : 'M'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, '').trim();
}

function getChartVariantName(type: ChartType): string | null {
  const baseType = resolveChartType(type);
  if (type === baseType || !type.startsWith(`${baseType}-`)) {
    return null;
  }

  const rawVariant = type.slice(baseType.length + 1);
  const cycleMatch = rawVariant.match(/^(.*)-(\d+)$/);
  return cycleMatch?.[1] ?? rawVariant;
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
  const weight = position - lowerIndex;
  return lower + (upper - lower) * weight;
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

function ribbonPath(upper: Point2D[], lower: Point2D[]): string {
  if (!upper.length || !lower.length) {
    return '';
  }

  const lowerPath = [...lower].reverse().map((point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  return `${linePath(upper)} ${lowerPath} Z`.trim();
}

function labelFromVariant(variantName: string): string {
  return variantName
    .split('-')
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function renderInsetChart(points: Point2D[], bounds: PlotBounds): string {
  if (points.length < 2) {
    return '';
  }

  const insetWidth = 112;
  const insetHeight = 56;
  const insetLeft = bounds.right - insetWidth - 8;
  const insetTop = bounds.top + 8;
  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));
  const scaleX = (value: number) => insetLeft + ((value - minX) / (maxX - minX || 1)) * insetWidth;
  const scaleY = (value: number) => insetTop + insetHeight - ((value - minY) / (maxY - minY || 1)) * insetHeight;
  const insetPoints = points.map((point) => ({ x: scaleX(point.x), y: scaleY(point.y) }));

  return `<g data-variant-fragment="inset">
    <rect x="${insetLeft - 6}" y="${insetTop - 6}" width="${insetWidth + 12}" height="${insetHeight + 12}" rx="10" fill="rgba(248,250,252,0.92)" stroke="rgba(15,23,42,0.12)" />
    <path d="${linePath(insetPoints)}" fill="none" stroke="#0f766e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </g>`;
}

function renderCartesianVariantOverlay(args: {
  variantName: string | null;
  points: Point2D[];
  values: number[];
  labels: string[];
  bounds: PlotBounds;
  mapValue: (value: number) => number;
  tone?: string;
}): string {
  const { variantName, points, values, labels, bounds, mapValue, tone = '#115e59' } = args;
  if (!variantName || !points.length || !values.length) {
    return '';
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  const layers: string[] = [];
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
      layers.push(`<rect x="${point.x}" y="${bounds.top}" width="${Math.max(next.x - point.x, 14)}" height="${bounds.bottom - bounds.top}" fill="rgba(15,23,42,0.04)" />`);
    }
  }

  if (denseGridVariants.has(variantName)) {
    [0.16, 0.32, 0.48, 0.64, 0.8].forEach((ratio) => {
      const x = bounds.left + (bounds.right - bounds.left) * ratio;
      const y = bounds.top + (bounds.bottom - bounds.top) * ratio;
      layers.push(`<line x1="${x}" y1="${bounds.top}" x2="${x}" y2="${bounds.bottom}" stroke="rgba(15,23,42,0.12)" stroke-dasharray="3 4" />`);
      layers.push(`<line x1="${bounds.left}" y1="${y}" x2="${bounds.right}" y2="${y}" stroke="rgba(15,23,42,0.12)" stroke-dasharray="3 4" />`);
    });
  }

  if (baselineVariants.has(variantName)) {
    const baseline = mapValue(minValue + valueRange * 0.15);
    layers.push(`<line x1="${bounds.left}" y1="${baseline}" x2="${bounds.right}" y2="${baseline}" stroke="#0f766e" stroke-width="2" stroke-dasharray="8 5" />`);
    layers.push(`<text x="${bounds.left + 4}" y="${baseline - 8}" font-size="10" fill="#0f766e">Baseline anchor</text>`);
  }

  if (densityVariants.has(variantName)) {
    points.forEach((point, index) => {
      const label = labels[index] ?? `P${index + 1}`;
      layers.push(`<line x1="${point.x}" y1="${point.y}" x2="${point.x}" y2="${bounds.bottom}" stroke="rgba(15,118,110,0.16)" />`);
      if (index % 2 === 0) {
        layers.push(`<text x="${point.x}" y="${bounds.top + 14}" text-anchor="middle" font-size="8" fill="#475569">${escapeHtml(label)}</text>`);
      }
    });
  }

  if (stackedVariants.has(variantName)) {
    points.forEach((point, index) => {
      layers.push(`<rect x="${point.x - 7}" y="${point.y}" width="14" height="${Math.max(bounds.bottom - point.y, 8)}" rx="7" fill="${index % 2 === 0 ? 'rgba(14,165,233,0.08)' : 'rgba(15,118,110,0.08)'}" />`);
    });
  }

  if (normalizedVariants.has(variantName)) {
    const fifty = mapValue(minValue + valueRange * 0.5);
    const eighty = mapValue(minValue + valueRange * 0.8);
    layers.push(`<line x1="${bounds.left}" y1="${fifty}" x2="${bounds.right}" y2="${fifty}" stroke="rgba(2,132,199,0.36)" stroke-dasharray="4 4" />`);
    layers.push(`<line x1="${bounds.left}" y1="${eighty}" x2="${bounds.right}" y2="${eighty}" stroke="rgba(2,132,199,0.2)" stroke-dasharray="4 4" />`);
    layers.push(`<text x="${bounds.right - 4}" y="${fifty - 6}" text-anchor="end" font-size="9" fill="#0369a1">50%</text>`);
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
      layers.push(`<line x1="${first.x}" y1="${bounds.top + 18}" x2="${last.x}" y2="${bounds.top + 18}" stroke="rgba(15,23,42,0.26)" />`);
      layers.push(`<line x1="${first.x}" y1="${bounds.top + 18}" x2="${first.x}" y2="${bounds.top + 26}" stroke="rgba(15,23,42,0.26)" />`);
      layers.push(`<line x1="${last.x}" y1="${bounds.top + 18}" x2="${last.x}" y2="${bounds.top + 26}" stroke="rgba(15,23,42,0.26)" />`);
      layers.push(`<text x="${(first.x + last.x) / 2}" y="${bounds.top + 14}" text-anchor="middle" font-size="9" fill="#475569">Group ${groupIndex}</text>`);
    }
  }

  if (compactVariants.has(variantName)) {
    const latest = points[points.length - 1];
    layers.push(`<rect x="${bounds.right - 116}" y="${bounds.top + 8}" width="108" height="20" rx="10" fill="rgba(255,255,255,0.9)" stroke="rgba(15,23,42,0.08)" />`);
    layers.push(`<text x="${bounds.right - 62}" y="${bounds.top + 21}" text-anchor="middle" font-size="9" fill="#0f172a">${variantName === 'sparkline' ? 'Sparkline mode' : 'Compact mode'}</text>`);
    if (latest) {
      layers.push(`<circle cx="${latest.x}" cy="${latest.y}" r="9" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.28)" />`);
    }
  }

  if (stepVariants.has(variantName) && points.length >= 2) {
    const stepped = points.flatMap((point, index) => (index === 0 ? [point] : [{ x: point.x, y: points[index - 1]?.y ?? point.y }, point]));
    layers.push(`<path d="${linePath(stepped)}" fill="none" stroke="#0f766e" stroke-width="2.4" stroke-linecap="square" />`);
  }

  if (variantName === 'forecast-band' || variantName === 'confidence-envelope') {
    const startIndex = variantName === 'forecast-band' ? Math.max(0, Math.floor(points.length * 0.55)) : 0;
    const spread = valueRange * (variantName === 'forecast-band' ? 0.18 : 0.12);
    const scopedPoints = points.slice(startIndex);
    const scopedValues = values.slice(startIndex);
    const upper = scopedPoints.map((point, index) => ({
      x: point.x,
      y: mapValue(scopedValues[index] + spread * (variantName === 'forecast-band' ? 1 + index / Math.max(scopedPoints.length - 1, 1) : 1))
    }));
    const lower = scopedPoints.map((point, index) => ({
      x: point.x,
      y: mapValue(scopedValues[index] - spread * (variantName === 'forecast-band' ? 0.75 + index / Math.max(scopedPoints.length - 1, 1) : 1))
    }));
    layers.push(`<path d="${ribbonPath(upper, lower)}" fill="${variantName === 'forecast-band' ? 'rgba(56,189,248,0.18)' : 'rgba(15,118,110,0.16)'}" stroke="none" />`);
    layers.push(`<path d="${linePath(scopedPoints)}" fill="none" stroke="${variantName === 'forecast-band' ? '#0284c7' : '#0f766e'}" stroke-width="2" stroke-dasharray="6 5" />`);
  }

  if (variantName === 'rolling-window' || variantName === 'seasonal-decomposition') {
    const averaged = movingAverage(values, 3);
    const averagePoints = points.map((point, index) => ({ x: point.x, y: mapValue(averaged[index] ?? values[index] ?? 0) }));
    if (variantName === 'seasonal-decomposition') {
      for (let index = 0; index < points.length - 1; index += 2) {
        const next = points[index + 1];
        if (!next) {
          continue;
        }
        layers.push(`<rect x="${points[index]?.x ?? bounds.left}" y="${bounds.top}" width="${Math.max(next.x - (points[index]?.x ?? bounds.left), 12)}" height="${bounds.bottom - bounds.top}" fill="rgba(148,163,184,0.08)" />`);
      }
    }
    layers.push(`<path d="${linePath(averagePoints)}" fill="none" stroke="#0f766e" stroke-width="2.2" stroke-dasharray="7 4" />`);
  }

  if (thresholdVariants.has(variantName)) {
    const warning = minValue + valueRange * 0.55;
    const critical = minValue + valueRange * 0.78;
    const target = minValue + valueRange * 0.68;
    if (variantName === 'benchmark-lanes' || variantName === 'control-room') {
      layers.push(`<rect x="${bounds.left}" y="${mapValue(critical)}" width="${bounds.right - bounds.left}" height="${bounds.bottom - mapValue(critical)}" fill="rgba(34,197,94,0.08)" />`);
      layers.push(`<rect x="${bounds.left}" y="${mapValue(warning)}" width="${bounds.right - bounds.left}" height="${Math.max(mapValue(critical) - mapValue(warning), 8)}" fill="rgba(245,158,11,0.08)" />`);
      layers.push(`<rect x="${bounds.left}" y="${bounds.top}" width="${bounds.right - bounds.left}" height="${Math.max(mapValue(warning) - bounds.top, 8)}" fill="rgba(239,68,68,0.06)" />`);
    }
    layers.push(`<line x1="${bounds.left}" y1="${mapValue(target)}" x2="${bounds.right}" y2="${mapValue(target)}" stroke="${variantName === 'threshold-alert' ? '#dc2626' : '#0284c7'}" stroke-width="1.8" stroke-dasharray="6 4" />`);
    layers.push(`<text x="${bounds.right - 4}" y="${mapValue(target) - 6}" text-anchor="end" font-size="10" fill="${variantName === 'threshold-alert' ? '#dc2626' : '#0284c7'}">${variantName === 'goal-tracking' ? 'Goal' : 'Threshold'}</text>`);

    if (variantName === 'threshold-alert' || variantName === 'control-room') {
      values.forEach((value, index) => {
        if (value < target) {
          return;
        }
        const point = points[index];
        if (!point) {
          return;
        }
        layers.push(`<circle cx="${point.x}" cy="${point.y}" r="7.5" fill="rgba(220,38,38,0.1)" stroke="#dc2626" stroke-width="1.6" />`);
      });
    }
  }

  if (anomalyVariants.has(variantName)) {
    const q1 = percentile(values, 0.25);
    const q3 = percentile(values, 0.75);
    layers.push(`<rect x="${bounds.left}" y="${mapValue(q3)}" width="${bounds.right - bounds.left}" height="${Math.max(mapValue(q1) - mapValue(q3), 12)}" fill="rgba(15,118,110,0.08)" />`);
    values.forEach((value, index) => {
      if (value >= q1 && value <= q3) {
        return;
      }
      const point = points[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${variantName === 'outlier-lens' ? 10 : 7}" fill="none" stroke="#b91c1c" stroke-width="1.8" />`);
      layers.push(`<text x="${point.x + 8}" y="${point.y - 10}" font-size="10" fill="#7f1d1d">${escapeHtml(labels[index] ?? `P${index + 1}`)}</text>`);
    });
  }

  if (eventVariants.has(variantName)) {
    const anchors = [Math.max(1, Math.floor(points.length / 3)), Math.max(2, Math.floor((points.length * 2) / 3))];
    anchors.forEach((anchor, index) => {
      const point = points[Math.min(anchor, points.length - 1)];
      if (!point) {
        return;
      }
      layers.push(`<line x1="${point.x}" y1="${bounds.top}" x2="${point.x}" y2="${bounds.bottom}" stroke="rgba(51,65,85,0.28)" stroke-dasharray="4 4" />`);
      layers.push(`<rect x="${point.x - 14}" y="${bounds.top + 8 + index * 18}" width="28" height="14" rx="7" fill="rgba(15,23,42,0.82)" />`);
      layers.push(`<text x="${point.x}" y="${bounds.top + 18 + index * 18}" text-anchor="middle" font-size="9" fill="#f8fafc">E${index + 1}</text>`);
    });
  }

  if (variantName === 'cohort-breakdown') {
    const cohortSize = Math.max(2, Math.ceil(points.length / 3));
    for (let start = 0; start < points.length; start += cohortSize) {
      const cohortPoints = points.slice(start, start + cohortSize);
      const first = cohortPoints[0];
      const last = cohortPoints[cohortPoints.length - 1];
      if (!first || !last) {
        continue;
      }
      const cohortIndex = Math.floor(start / cohortSize) + 1;
      layers.push(`<rect x="${first.x - 12}" y="${bounds.top}" width="${Math.max(last.x - first.x + 24, 28)}" height="${bounds.bottom - bounds.top}" fill="${cohortIndex % 2 === 0 ? 'rgba(14,165,233,0.05)' : 'rgba(15,23,42,0.03)'}" />`);
      layers.push(`<text x="${first.x}" y="${bounds.top + 14}" font-size="9" fill="#475569">Cohort ${cohortIndex}</text>`);
    }
  }

  if (variantName === 'ranking-shift') {
    const ranked = values
      .map((value, index) => ({ index, value }))
      .sort((left, right) => right.value - left.value)
      .slice(0, Math.min(3, values.length));
    ranked.forEach(({ index }, rank) => {
      const point = points[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x + 12}" cy="${point.y - 12}" r="10" fill="rgba(15,23,42,0.86)" />`);
      layers.push(`<text x="${point.x + 12}" y="${point.y - 9}" text-anchor="middle" font-size="9" fill="#f8fafc">#${rank + 1}</text>`);
    });
  }

  if (focusVariants.has(variantName)) {
    const focusStart = points[Math.max(0, Math.floor(points.length * 0.6))];
    const focusEnd = points[points.length - 1];
    if (focusStart && focusEnd) {
      layers.push(`<rect x="${focusStart.x - 8}" y="${bounds.top}" width="${Math.max(focusEnd.x - focusStart.x + 16, 18)}" height="${bounds.bottom - bounds.top}" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.24)" stroke-dasharray="4 4" />`);
    }
    layers.push(renderInsetChart(points, bounds));
  }

  if (variantName === 'realtime-queue' || variantName === 'control-room') {
    const tailStart = points[Math.max(0, Math.floor(points.length * 0.72))];
    const lastPoint = points[points.length - 1];
    if (tailStart) {
      layers.push(`<rect x="${tailStart.x - 10}" y="${bounds.top}" width="${bounds.right - tailStart.x + 10}" height="${bounds.bottom - bounds.top}" fill="rgba(14,165,233,0.05)" />`);
    }
    if (lastPoint) {
      layers.push(`<circle cx="${lastPoint.x}" cy="${lastPoint.y}" r="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.32)" />`);
      layers.push(`<circle cx="${lastPoint.x}" cy="${lastPoint.y}" r="6" fill="${tone}" stroke="#ffffff" stroke-width="1.6" />`);
    }
  }

  if (variantName === 'dependency-critical-path') {
    const criticalPoints = points.slice(Math.max(0, points.length - 4));
    if (criticalPoints.length >= 2) {
      layers.push(`<path d="${linePath(criticalPoints)}" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round" />`);
      const finalPoint = criticalPoints[criticalPoints.length - 1];
      if (finalPoint) {
        layers.push(`<text x="${finalPoint.x - 6}" y="${finalPoint.y - 12}" text-anchor="end" font-size="9" fill="#92400e">Critical path</text>`);
      }
    }
  }

  if (variantName === 'topology-health') {
    const warning = minValue + valueRange * 0.45;
    const critical = minValue + valueRange * 0.72;
    values.forEach((value, index) => {
      const point = points[index];
      if (!point) {
        return;
      }
      const tone = value >= critical ? '#dc2626' : value >= warning ? '#f59e0b' : '#0f766e';
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="7" fill="none" stroke="${tone}" stroke-width="2" />`);
    });
    layers.push(`<rect x="${bounds.right - 116}" y="${bounds.top + 8}" width="108" height="18" rx="9" fill="rgba(15,23,42,0.88)" />`);
    layers.push(`<text x="${bounds.right - 62}" y="${bounds.top + 20}" text-anchor="middle" font-size="9" fill="#67e8f9">Health overlay</text>`);
  }

  if (variantName === 'drilldown-workbench') {
    const ranked = values
      .map((value, index) => ({ index, value }))
      .sort((left, right) => right.value - left.value);
    const lead = points[ranked[0]?.index ?? 0];
    layers.push(`<rect x="${bounds.left}" y="${bounds.top + 8}" width="136" height="18" rx="9" fill="rgba(15,23,42,0.84)" />`);
    layers.push(`<text x="${bounds.left + 12}" y="${bounds.top + 20}" font-size="9" fill="#e2e8f0">Workspace / Segment / Detail</text>`);
    if (lead) {
      layers.push(`<circle cx="${lead.x + 12}" cy="${lead.y - 12}" r="9" fill="rgba(15,23,42,0.84)" stroke="#e2e8f0" />`);
      layers.push(`<text x="${lead.x + 12}" y="${lead.y - 9}" text-anchor="middle" font-size="8" fill="#f8fafc">+</text>`);
    }
  }

  if (variantName === 'tapered-flow') {
    const taperedPoints = points.slice(Math.max(0, points.length - 5));
    taperedPoints.forEach((point, index) => {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${Math.max(3, 9 - index)}" fill="rgba(17,94,89,0.08)" stroke="rgba(17,94,89,0.3)" />`);
    });
    if (taperedPoints.length >= 2) {
      layers.push(`<path d="${linePath(taperedPoints)}" fill="none" stroke="rgba(17,94,89,0.4)" stroke-width="2" stroke-dasharray="5 4" />`);
    }
  }

  if (variantName === 'control-room') {
    layers.push(`<g data-variant-fragment="status-panel">
      <rect x="${bounds.right - 116}" y="${bounds.top + 8}" width="108" height="44" rx="10" fill="rgba(15,23,42,0.88)" />
      <text x="${bounds.right - 62}" y="${bounds.top + 24}" text-anchor="middle" font-size="10" fill="#e2e8f0">CONTROL ROOM</text>
      <text x="${bounds.right - 62}" y="${bounds.top + 40}" text-anchor="middle" font-size="9" fill="#67e8f9">Live watch enabled</text>
    </g>`);
  }

  layers.push(`<rect x="${bounds.left + 8}" y="${bounds.top + 8}" width="${Math.max(labelFromVariant(variantName).length * 6 + 22, 72)}" height="18" rx="9" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="${bounds.left + 18}" y="${bounds.top + 20}" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);

  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function renderScatterVariantOverlay(args: {
  variantName: string | null;
  points: Point2D[];
  values: Array<{ x: number; y: number; r: number }>;
  bounds: PlotBounds;
}): string {
  const { variantName, points, values, bounds } = args;
  if (!variantName || !points.length || !values.length) {
    return '';
  }

  const layers: string[] = [];
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
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${variantName === 'animated' ? 11 : 8}" fill="none" stroke="${variantName === 'animated' ? 'rgba(14,165,233,0.36)' : 'rgba(100,116,139,0.28)'}" stroke-dasharray="4 4" />`);
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
      layers.push(`<rect x="${left}" y="${top}" width="${Math.max(right - left, 28)}" height="${Math.max(bottom - top, 28)}" rx="18" fill="${variantName === 'forecast-band' ? 'rgba(56,189,248,0.12)' : 'rgba(15,118,110,0.1)'}" stroke="${variantName === 'forecast-band' ? 'rgba(2,132,199,0.36)' : 'rgba(15,118,110,0.28)'}" stroke-dasharray="6 5" />`);
    }
  }

  if (trendVariants.has(variantName)) {
    const sorted = [...values]
      .map((item, index) => ({ ...item, point: points[index] }))
      .filter((item): item is { x: number; y: number; r: number; point: Point2D } => Boolean(item.point))
      .sort((left, right) => left.x - right.x)
      .map((item) => item.point);
    if (variantName === 'seasonal-decomposition') {
      for (let index = 0; index < 4; index += 1) {
        const left = bounds.left + ((bounds.right - bounds.left) / 4) * index;
        layers.push(`<rect x="${left}" y="${bounds.top}" width="${(bounds.right - bounds.left) / 8}" height="${bounds.bottom - bounds.top}" fill="rgba(148,163,184,0.06)" />`);
      }
    }
    if (sorted.length >= 2) {
      layers.push(`<path d="${linePath(sorted)}" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="6 4" />`);
    }
  }

  if (laneVariants.has(variantName)) {
    const laneX = percentile(points.map((point) => point.x), 0.68);
    const laneY = percentile(points.map((point) => point.y), 0.34);
    layers.push(`<line x1="${laneX}" y1="${bounds.top}" x2="${laneX}" y2="${bounds.bottom}" stroke="${variantName === 'threshold-alert' ? '#dc2626' : '#0284c7'}" stroke-dasharray="5 4" />`);
    layers.push(`<line x1="${bounds.left}" y1="${laneY}" x2="${bounds.right}" y2="${laneY}" stroke="${variantName === 'threshold-alert' ? '#dc2626' : '#0284c7'}" stroke-dasharray="5 4" />`);
    if (variantName === 'threshold-alert') {
      points.forEach((point) => {
        if (point.x < laneX || point.y > laneY) {
          return;
        }
        layers.push(`<circle cx="${point.x}" cy="${point.y}" r="9" fill="none" stroke="#dc2626" stroke-width="1.6" />`);
      });
    }
  }

  if (plannerVariants.has(variantName)) {
    const panelWidth = 34;
    const panelHeight = 24;
    for (let row = 0; row < 2; row += 1) {
      for (let column = 0; column < 2; column += 1) {
        layers.push(`<rect x="${bounds.right - 86 + column * (panelWidth + 6)}" y="${bounds.top + 8 + row * (panelHeight + 6)}" width="${panelWidth}" height="${panelHeight}" rx="8" fill="rgba(255,255,255,0.74)" stroke="rgba(15,23,42,0.08)" />`);
      }
    }
    const focusLeft = percentile(points.map((point) => point.x), 0.58);
    const focusTop = percentile(points.map((point) => point.y), 0.28);
    const focusRight = percentile(points.map((point) => point.x), 0.9);
    const focusBottom = percentile(points.map((point) => point.y), 0.72);
    layers.push(`<rect x="${focusLeft}" y="${focusTop}" width="${Math.max(focusRight - focusLeft, 28)}" height="${Math.max(focusBottom - focusTop, 28)}" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.28)" stroke-dasharray="4 4" />`);
  }

  if (eventOnlyVariants.has(variantName)) {
    [0.34, 0.68].forEach((ratio, index) => {
      const x = percentile(points.map((point) => point.x), ratio);
      layers.push(`<line x1="${x}" y1="${bounds.top}" x2="${x}" y2="${bounds.bottom}" stroke="rgba(51,65,85,0.28)" stroke-dasharray="4 4" />`);
      layers.push(`<rect x="${x - 14}" y="${bounds.top + 10 + index * 18}" width="28" height="14" rx="7" fill="rgba(15,23,42,0.82)" />`);
      layers.push(`<text x="${x}" y="${bounds.top + 20 + index * 18}" text-anchor="middle" font-size="9" fill="#f8fafc">E${index + 1}</text>`);
    });
  }

  if (variantName === 'outlier-lens' || variantName === 'anomaly-window' || variantName === 'control-room') {
    ranked.forEach(({ index }, rank) => {
      const point = points[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${10 + rank * 2}" fill="none" stroke="${rank === 0 ? '#dc2626' : '#f59e0b'}" stroke-width="1.6" />`);
    });
  }

  if (variantName === 'multi-resolution' || variantName === 'control-room') {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const focusLeft = percentile(xs, 0.6);
    const focusTop = percentile(ys, 0.25);
    const focusRight = percentile(xs, 0.9);
    const focusBottom = percentile(ys, 0.7);
    layers.push(`<rect x="${focusLeft}" y="${focusTop}" width="${Math.max(focusRight - focusLeft, 24)}" height="${Math.max(focusBottom - focusTop, 24)}" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.32)" stroke-dasharray="4 4" />`);
  }

  if (variantName === 'distribution-focus') {
    layers.push(`<line x1="${bounds.left}" y1="${(bounds.top + bounds.bottom) / 2}" x2="${bounds.right}" y2="${(bounds.top + bounds.bottom) / 2}" stroke="rgba(100,116,139,0.35)" stroke-dasharray="4 4" />`);
    layers.push(`<line x1="${(bounds.left + bounds.right) / 2}" y1="${bounds.top}" x2="${(bounds.left + bounds.right) / 2}" y2="${bounds.bottom}" stroke="rgba(100,116,139,0.35)" stroke-dasharray="4 4" />`);
  }

  if (variantName === 'comparison-grid' || variantName === 'quantile-layers') {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const xBands = [0.25, 0.5, 0.75].map((ratio) => percentile(xs, ratio));
    const yBands = [0.25, 0.5, 0.75].map((ratio) => percentile(ys, ratio));
    xBands.forEach((x) => {
      layers.push(`<line x1="${x}" y1="${bounds.top}" x2="${x}" y2="${bounds.bottom}" stroke="rgba(15,23,42,0.14)" stroke-dasharray="4 4" />`);
    });
    yBands.forEach((y) => {
      layers.push(`<line x1="${bounds.left}" y1="${y}" x2="${bounds.right}" y2="${y}" stroke="rgba(15,23,42,0.14)" stroke-dasharray="4 4" />`);
    });
  }

  if (variantName === 'narrative-sequence') {
    ranked.slice(0, 3).forEach(({ index }, rank) => {
      const point = points[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x + 12}" cy="${point.y - 12}" r="10" fill="rgba(15,23,42,0.86)" />`);
      layers.push(`<text x="${point.x + 12}" y="${point.y - 9}" text-anchor="middle" font-size="9" fill="#f8fafc">${rank + 1}</text>`);
    });
  }

  if (variantName === 'goal-tracking') {
    const targetX = percentile(points.map((point) => point.x), 0.78);
    const targetY = percentile(points.map((point) => point.y), 0.24);
    layers.push(`<rect x="${targetX - 34}" y="${targetY - 26}" width="68" height="52" rx="12" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.34)" stroke-dasharray="5 4" />`);
    layers.push(`<text x="${targetX}" y="${targetY - 10}" text-anchor="middle" font-size="9" fill="#0369a1">Goal zone</text>`);
  }

  if (variantName === 'cohort-breakdown') {
    const xs = points.map((point) => point.x);
    const xBands = [percentile(xs, 0.33), percentile(xs, 0.66)];
    xBands.forEach((x, index) => {
      layers.push(`<rect x="${index === 0 ? bounds.left : xBands[index - 1] ?? bounds.left}" y="${bounds.top}" width="${Math.max(x - (index === 0 ? bounds.left : xBands[index - 1] ?? bounds.left), 24)}" height="${bounds.bottom - bounds.top}" fill="${index % 2 === 0 ? 'rgba(14,165,233,0.04)' : 'rgba(15,23,42,0.03)'}" />`);
      layers.push(`<text x="${(index === 0 ? bounds.left : xBands[index - 1] ?? bounds.left) + 8}" y="${bounds.top + 14}" font-size="9" fill="#475569">Cohort ${index + 1}</text>`);
    });
    layers.push(`<rect x="${xBands[1] ?? bounds.right - 24}" y="${bounds.top}" width="${Math.max(bounds.right - (xBands[1] ?? bounds.right - 24), 24)}" height="${bounds.bottom - bounds.top}" fill="rgba(14,165,233,0.04)" />`);
    layers.push(`<text x="${(xBands[1] ?? bounds.right - 24) + 8}" y="${bounds.top + 14}" font-size="9" fill="#475569">Cohort 3</text>`);
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
        layers.push(`<circle cx="${point.x + 12}" cy="${point.y - 12}" r="10" fill="rgba(15,23,42,0.86)" />`);
        layers.push(`<text x="${point.x + 12}" y="${point.y - 9}" text-anchor="middle" font-size="9" fill="#f8fafc">#${rank + 1}</text>`);
      });
  }

  if (variantName === 'realtime-queue') {
    const recent = points.slice(-3);
    recent.forEach((point, index) => {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${12 - index * 2}" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.28)" />`);
    });
    const trail = recent.map((point) => `${point.x},${point.y}`).join(' ');
    if (trail) {
      layers.push(`<polyline points="${trail}" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="5 4" />`);
    }
    const latest = recent[recent.length - 1];
    if (latest) {
      layers.push(`<text x="${latest.x + 14}" y="${latest.y - 10}" font-size="9" fill="#0369a1">Latest</text>`);
    }
  }

  if (variantName === 'dependency-critical-path') {
    const chain = [...values]
      .map((item, index) => ({ ...item, index }))
      .sort((left, right) => left.x - right.x)
      .slice(0, Math.min(4, values.length))
      .map((item) => points[item.index])
      .filter((point): point is Point2D => Boolean(point));
    if (chain.length >= 2) {
      layers.push(`<path d="${linePath(chain)}" fill="none" stroke="#d97706" stroke-width="2.6" stroke-dasharray="6 4" />`);
    }
  }

  if (variantName === 'topology-health') {
    const maxRadius = Math.max(...values.map((item) => item.r), 1);
    values.slice(0, Math.min(values.length, points.length)).forEach((item, index) => {
      const point = points[index];
      if (!point) {
        return;
      }
      const tone = item.r / maxRadius > 0.72 ? '#dc2626' : item.r / maxRadius > 0.4 ? '#f59e0b' : '#0f766e';
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="7" fill="none" stroke="${tone}" stroke-width="2" />`);
    });
  }

  if (variantName === 'drilldown-workbench') {
    const lead = points[ranked[0]?.index ?? 0];
    layers.push(`<rect x="${bounds.left}" y="${bounds.top + 8}" width="136" height="18" rx="9" fill="rgba(15,23,42,0.84)" />`);
    layers.push(`<text x="${bounds.left + 12}" y="${bounds.top + 20}" font-size="9" fill="#e2e8f0">Explore / Cluster / Detail</text>`);
    if (lead) {
      layers.push(`<circle cx="${lead.x + 12}" cy="${lead.y - 12}" r="9" fill="rgba(15,23,42,0.84)" stroke="#e2e8f0" />`);
      layers.push(`<text x="${lead.x + 12}" y="${lead.y - 9}" text-anchor="middle" font-size="8" fill="#f8fafc">+</text>`);
    }
  }

  if (variantName === 'tapered-flow') {
    const chain = [...values]
      .map((item, index) => ({ ...item, index }))
      .sort((left, right) => left.x - right.x)
      .slice(0, Math.min(5, values.length))
      .map((item) => points[item.index])
      .filter((point): point is Point2D => Boolean(point));
    chain.forEach((point, index) => {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${Math.max(3, 9 - index)}" fill="rgba(17,94,89,0.08)" stroke="rgba(17,94,89,0.3)" />`);
    });
    if (chain.length >= 2) {
      layers.push(`<path d="${linePath(chain)}" fill="none" stroke="rgba(17,94,89,0.4)" stroke-width="2" stroke-dasharray="5 4" />`);
    }
  }

  layers.push(`<rect x="${bounds.left + 8}" y="${bounds.top + 8}" width="${Math.max(labelFromVariant(variantName).length * 6 + 22, 72)}" height="18" rx="9" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="${bounds.left + 18}" y="${bounds.top + 20}" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);

  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function renderHeatmapVariantOverlay(args: {
  variantName: string | null;
  cells: Array<{ x: number; y: number; value: number }>;
  width: number;
  height: number;
  columns: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
}): string {
  const { variantName, cells, width, height, columns, rows, cellWidth, cellHeight } = args;
  if (!variantName || !cells.length) {
    return '';
  }

  const layers: string[] = [];
  const maxValue = Math.max(...cells.map((cell) => cell.value), 1);
  const hottestCells = [...cells].sort((left, right) => right.value - left.value).slice(0, Math.min(3, cells.length));
  const variantKey = variantName ?? '';
  const bandVariants = new Set(['forecast-band', 'confidence-envelope']);
  const trendVariants = new Set(['rolling-window', 'seasonal-decomposition']);
  const laneVariants = new Set(['benchmark-lanes']);
  const focusVariants = new Set(['scenario-planner', 'small-multiples']);
  const distributionVariants = new Set(['quantile-layers', 'distribution-focus', 'outlier-lens']);

  if (variantName === 'multi-resolution' || variantName === 'comparison-grid') {
    for (let column = 0; column <= columns; column += 2) {
      layers.push(`<line x1="${36 + column * cellWidth}" y1="28" x2="${36 + column * cellWidth}" y2="${height - 20}" stroke="rgba(15,23,42,0.16)" />`);
    }
    for (let row = 0; row <= rows; row += 2) {
      layers.push(`<line x1="36" y1="${28 + row * cellHeight}" x2="${width - 12}" y2="${28 + row * cellHeight}" stroke="rgba(15,23,42,0.16)" />`);
    }
  }

  if (variantName === 'anomaly-window' || variantName === 'control-room') {
    cells
      .filter((cell) => cell.value >= maxValue * 0.82)
      .forEach((cell) => {
        layers.push(`<rect x="${36 + cell.x * cellWidth}" y="${28 + cell.y * cellHeight}" width="${Math.max(cellWidth - 2, 2)}" height="${Math.max(cellHeight - 2, 2)}" fill="none" stroke="#dc2626" stroke-width="1.6" />`);
      });
  }

  if (variantName === 'control-room') {
    layers.push(`<rect x="${width - 132}" y="20" width="120" height="42" rx="10" fill="rgba(15,23,42,0.9)" />`);
    layers.push(`<text x="${width - 72}" y="36" text-anchor="middle" font-size="10" fill="#e2e8f0">THERMAL WATCH</text>`);
    layers.push(`<text x="${width - 72}" y="52" text-anchor="middle" font-size="9" fill="#67e8f9">Hot cells highlighted</text>`);
  }

  if (variantName === 'threshold-alert' || variantName === 'goal-tracking') {
    const cutoff = maxValue * (variantName === 'threshold-alert' ? 0.78 : 0.64);
    cells
      .filter((cell) => cell.value >= cutoff)
      .forEach((cell) => {
        layers.push(`<rect x="${36 + cell.x * cellWidth}" y="${28 + cell.y * cellHeight}" width="${Math.max(cellWidth - 2, 2)}" height="${Math.max(cellHeight - 2, 2)}" fill="none" stroke="${variantName === 'threshold-alert' ? '#dc2626' : '#0284c7'}" stroke-width="1.8" rx="4" />`);
      });
  }

  if (variantName === 'narrative-sequence') {
    hottestCells.forEach((cell, index) => {
      const x = 36 + cell.x * cellWidth + Math.max(cellWidth - 2, 2) - 10;
      const y = 28 + cell.y * cellHeight + 12;
      layers.push(`<circle cx="${x}" cy="${y}" r="9" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="${x}" y="${y + 3}" text-anchor="middle" font-size="8" fill="#f8fafc">${index + 1}</text>`);
    });
  }

  if (variantName === 'drilldown-workbench') {
    const lead = hottestCells[0];
    if (lead) {
      layers.push(`<rect x="36" y="10" width="${Math.max(width - 180, 180)}" height="16" rx="8" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="48" y="21" font-size="9" fill="#e2e8f0">Ops / Region / Detail target</text>`);
      layers.push(`<rect x="${36 + lead.x * cellWidth - 2}" y="${28 + lead.y * cellHeight - 2}" width="${Math.max(cellWidth + 2, 6)}" height="${Math.max(cellHeight + 2, 6)}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5 4" />`);
    }
  }

  if (variantName === 'realtime-queue') {
    const lastColumn = Math.max(...cells.map((cell) => cell.x));
    const queueStart = Math.max(lastColumn - 1, 0);
    layers.push(`<rect x="${36 + queueStart * cellWidth}" y="28" width="${Math.max((lastColumn - queueStart + 1) * cellWidth, cellWidth)}" height="${rows * cellHeight}" fill="rgba(14,165,233,0.06)" />`);
    layers.push(`<text x="${36 + queueStart * cellWidth + 8}" y="22" font-size="9" fill="#0369a1">Recent queue</text>`);
  }

  if (variantName === 'dense') {
    for (let column = 0; column <= columns; column += 1) {
      layers.push(`<line x1="${36 + column * cellWidth}" y1="28" x2="${36 + column * cellWidth}" y2="${height - 20}" stroke="rgba(15,23,42,0.08)" />`);
    }
    for (let row = 0; row <= rows; row += 1) {
      layers.push(`<line x1="36" y1="${28 + row * cellHeight}" x2="${width - 12}" y2="${28 + row * cellHeight}" stroke="rgba(15,23,42,0.08)" />`);
    }
  }

  if (bandVariants.has(variantKey)) {
    const bandStart = variantName === 'forecast-band' ? Math.max(columns - 2, 0) : Math.max(Math.floor(columns / 2) - 1, 0);
    const bandWidth = variantName === 'forecast-band' ? Math.max(2 * cellWidth, cellWidth) : Math.max(3 * cellWidth, cellWidth);
    layers.push(`<rect x="${36 + bandStart * cellWidth}" y="28" width="${bandWidth}" height="${rows * cellHeight}" fill="${variantName === 'forecast-band' ? 'rgba(56,189,248,0.1)' : 'rgba(15,118,110,0.08)'}" stroke="${variantName === 'forecast-band' ? 'rgba(2,132,199,0.26)' : 'rgba(15,118,110,0.22)'}" stroke-dasharray="4 4" />`);
  }

  if (trendVariants.has(variantKey)) {
    if (variantName === 'seasonal-decomposition') {
      for (let row = 0; row < rows; row += 2) {
        layers.push(`<rect x="36" y="${28 + row * cellHeight}" width="${columns * cellWidth}" height="${Math.max(cellHeight, 4)}" fill="rgba(148,163,184,0.04)" />`);
      }
    }
    layers.push(`<rect x="${36 + cellWidth}" y="${28 + cellHeight}" width="${Math.max(columns * cellWidth - cellWidth * 2, cellWidth)}" height="${Math.max(rows * cellHeight - cellHeight * 2, cellHeight)}" fill="none" stroke="rgba(15,118,110,0.24)" stroke-dasharray="5 4" />`);
  }

  if (laneVariants.has(variantKey)) {
    const midColumn = Math.max(Math.floor(columns * 0.6), 1);
    const midRow = Math.max(Math.floor(rows * 0.4), 1);
    layers.push(`<line x1="${36 + midColumn * cellWidth}" y1="28" x2="${36 + midColumn * cellWidth}" y2="${height - 20}" stroke="rgba(2,132,199,0.26)" stroke-dasharray="4 4" />`);
    layers.push(`<line x1="36" y1="${28 + midRow * cellHeight}" x2="${width - 12}" y2="${28 + midRow * cellHeight}" stroke="rgba(245,158,11,0.24)" stroke-dasharray="4 4" />`);
  }

  if (focusVariants.has(variantKey)) {
    [0, 1, 2, 3].forEach((index) => {
      layers.push(`<rect x="${width - 92 + (index % 2) * 34}" y="${12 + Math.floor(index / 2) * 18}" width="28" height="12" rx="6" fill="rgba(255,255,255,0.8)" stroke="rgba(15,23,42,0.08)" />`);
    });
  }

  if (variantName === 'event-overlay') {
    const eventColumn = hottestCells[0]?.x ?? Math.max(Math.floor(columns / 2), 0);
    const x = 36 + eventColumn * cellWidth + cellWidth / 2;
    layers.push(`<line x1="${x}" y1="28" x2="${x}" y2="${height - 20}" stroke="rgba(51,65,85,0.28)" stroke-dasharray="4 4" />`);
    layers.push(`<text x="${x}" y="20" text-anchor="middle" font-size="8" fill="#475569">E1</text>`);
  }

  if (distributionVariants.has(variantKey)) {
    hottestCells.forEach((cell, index) => {
      const inset = index === 0 && variantName === 'outlier-lens' ? -2 : 2;
      layers.push(`<rect x="${36 + cell.x * cellWidth + inset}" y="${28 + cell.y * cellHeight + inset}" width="${Math.max(cellWidth - inset * 2, 4)}" height="${Math.max(cellHeight - inset * 2, 4)}" fill="none" stroke="${index === 0 ? '#dc2626' : 'rgba(15,118,110,0.3)'}" stroke-width="${variantName === 'outlier-lens' ? 2 : 1.2}" />`);
    });
  }

  if (variantName === 'cohort-breakdown') {
    for (let row = 0; row < rows; row += 2) {
      layers.push(`<rect x="36" y="${28 + row * cellHeight}" width="${columns * cellWidth}" height="${Math.max(cellHeight, 4)}" fill="rgba(15,23,42,0.03)" />`);
      layers.push(`<text x="24" y="${28 + row * cellHeight + 12}" text-anchor="end" font-size="8" fill="#475569">C${Math.floor(row / 2) + 1}</text>`);
    }
  }

  if (variantName === 'ranking-shift') {
    hottestCells.forEach((cell, index) => {
      const x = 36 + cell.x * cellWidth + 10;
      const y = 28 + cell.y * cellHeight + 12;
      layers.push(`<circle cx="${x}" cy="${y}" r="8" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="${x}" y="${y + 3}" text-anchor="middle" font-size="7" fill="#f8fafc">#${index + 1}</text>`);
    });
  }

  if (variantName === 'dependency-critical-path') {
    const chain = hottestCells
      .map((cell) => ({
        x: 36 + cell.x * cellWidth + Math.max(cellWidth - 2, 2) / 2,
        y: 28 + cell.y * cellHeight + Math.max(cellHeight - 2, 2) / 2
      }))
      .sort((left, right) => left.x - right.x);
    if (chain.length >= 2) {
      layers.push(`<path d="${linePath(chain)}" fill="none" stroke="#d97706" stroke-width="2.4" stroke-dasharray="5 4" />`);
    }
  }

  if (variantName === 'topology-health') {
    hottestCells.forEach((cell, index) => {
      const x = 36 + cell.x * cellWidth + Math.max(cellWidth - 2, 2) - 10;
      const y = 28 + cell.y * cellHeight + Math.max(cellHeight - 2, 2) - 10;
      const tone = index === 0 ? '#dc2626' : index === 1 ? '#f59e0b' : '#0f766e';
      layers.push(`<circle cx="${x}" cy="${y}" r="6" fill="${tone}" stroke="#f8fafc" stroke-width="1.2" />`);
    });
  }

  if (variantName === 'tapered-flow') {
    const chain = hottestCells
      .map((cell) => ({
        x: 36 + cell.x * cellWidth + Math.max(cellWidth - 2, 2) / 2,
        y: 28 + cell.y * cellHeight + Math.max(cellHeight - 2, 2) / 2
      }))
      .sort((left, right) => left.x - right.x);
    chain.forEach((point, index) => {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${Math.max(3, 9 - index)}" fill="rgba(17,94,89,0.08)" stroke="rgba(17,94,89,0.3)" />`);
    });
    if (chain.length >= 2) {
      layers.push(`<path d="${linePath(chain)}" fill="none" stroke="rgba(17,94,89,0.4)" stroke-width="2" stroke-dasharray="5 4" />`);
    }
  }

  layers.push(`<rect x="${width - Math.max(labelFromVariant(variantName).length * 6 + 40, 120)}" y="${height - 28}" width="${Math.max(labelFromVariant(variantName).length * 6 + 24, 88)}" height="18" rx="9" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="${width - Math.max(labelFromVariant(variantName).length * 3 + 28, 60)}" y="${height - 16}" text-anchor="middle" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);
  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function renderTreemapVariantOverlay(args: {
  variantName: string | null;
  items: Array<{ label: string; value: number; left: number; width: number }>;
  width: number;
  height: number;
}): string {
  const { variantName, items, width, height } = args;
  if (!variantName || !items.length) {
    return '';
  }

  const layers: string[] = [];
  const ranked = [...items].sort((left, right) => right.value - left.value);
  const total = ranked.reduce((sum, item) => sum + item.value, 0) || 1;
  const variantKey = variantName ?? '';
  const bandVariants = new Set(['forecast-band']);
  const trendVariants = new Set(['rolling-window']);
  const focusVariants = new Set(['small-multiples', 'multi-resolution']);
  const realtimeVariants = new Set(['realtime-queue']);

  if (variantName === 'drilldown-workbench') {
    const spotlight = ranked.slice(0, 3);
    layers.push(`<rect x="24" y="8" width="${width - 48}" height="16" rx="8" fill="rgba(15,23,42,0.82)" />`);
    layers.push(`<text x="36" y="19" font-size="9" fill="#e2e8f0">Workspace / Segment / Drilldown target</text>`);
    spotlight.forEach((item, index) => {
      layers.push(`<rect x="${item.left + 6}" y="30" width="${Math.max(item.width - 12, 14)}" height="${height - 60}" fill="none" stroke="${index === 0 ? '#38bdf8' : '#f8fafc'}" stroke-width="1.6" stroke-dasharray="5 4" />`);
      layers.push(`<circle cx="${item.left + item.width - 16}" cy="42" r="8" fill="rgba(15,23,42,0.72)" stroke="#e2e8f0" />`);
      layers.push(`<text x="${item.left + item.width - 16}" y="45" text-anchor="middle" font-size="8" fill="#f8fafc">${index + 1}</text>`);
    });
  }

  if (variantName === 'comparison-grid') {
    items.slice(1).forEach((item) => {
      layers.push(`<line x1="${item.left}" y1="30" x2="${item.left}" y2="${height - 30}" stroke="rgba(15,23,42,0.14)" stroke-dasharray="4 4" />`);
    });
  }

  if (variantName === 'anomaly-window') {
    ranked.slice(0, 2).forEach((item, index) => {
      layers.push(`<rect x="${item.left + 6}" y="36" width="${Math.max(item.width - 12, 12)}" height="${height - 72}" fill="none" stroke="${index === 0 ? '#dc2626' : '#f59e0b'}" stroke-width="1.8" />`);
    });
  }

  if (variantName === 'goal-tracking') {
    const lead = ranked[0];
    if (lead) {
      const percent = Math.round((lead.value / total) * 100);
      layers.push(`<rect x="${lead.left + 10}" y="40" width="62" height="22" rx="11" fill="rgba(255,255,255,0.92)" stroke="rgba(15,23,42,0.08)" />`);
      layers.push(`<text x="${lead.left + 41}" y="55" text-anchor="middle" font-size="10" fill="#0f172a">${percent}% goal</text>`);
    }
  }

  if (variantName === 'narrative-sequence') {
    ranked.slice(0, 3).forEach((item, index) => {
      layers.push(`<circle cx="${item.left + 18}" cy="46" r="10" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="${item.left + 18}" y="49" text-anchor="middle" font-size="8" fill="#f8fafc">${index + 1}</text>`);
    });
  }

  if (variantName === 'control-room') {
    layers.push(`<rect x="${width - 148}" y="10" width="132" height="24" rx="12" fill="rgba(15,23,42,0.9)" />`);
    layers.push(`<text x="${width - 82}" y="26" text-anchor="middle" font-size="9" fill="#67e8f9">Treemap watch</text>`);
    ranked.slice(0, 2).forEach((item) => {
      layers.push(`<rect x="${item.left + 4}" y="34" width="${Math.max(item.width - 8, 14)}" height="${height - 68}" fill="none" stroke="rgba(56,189,248,0.5)" stroke-width="1.6" />`);
    });
  }

  if (variantName === 'cohort-breakdown') {
    ranked.forEach((item, index) => {
      if (index % 2 === 0) {
        layers.push(`<rect x="${item.left}" y="30" width="${Math.max(item.width, 12)}" height="10" fill="rgba(15,23,42,0.05)" />`);
      }
      layers.push(`<text x="${item.left + 8}" y="38" font-size="8" fill="#475569">C${index + 1}</text>`);
    });
  }

  if (variantName === 'ranking-shift') {
    ranked.slice(0, 3).forEach((item, index) => {
      layers.push(`<circle cx="${item.left + 18}" cy="46" r="9" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="${item.left + 18}" y="49" text-anchor="middle" font-size="8" fill="#f8fafc">#${index + 1}</text>`);
    });
  }

  if (variantName === 'dependency-critical-path') {
    const chain = ranked.slice(0, 3);
    chain.forEach((item, index) => {
      const next = chain[index + 1];
      if (!next) {
        return;
      }
      layers.push(`<line x1="${item.left + item.width - 8}" y1="${height / 2}" x2="${next.left + 8}" y2="${height / 2}" stroke="#d97706" stroke-width="2.2" stroke-dasharray="5 4" />`);
    });
  }

  if (variantName === 'topology-health') {
    ranked.slice(0, 3).forEach((item, index) => {
      const tone = index === 0 ? '#dc2626' : index === 1 ? '#f59e0b' : '#0f766e';
      layers.push(`<circle cx="${item.left + item.width - 16}" cy="46" r="7" fill="${tone}" stroke="#f8fafc" stroke-width="1.2" />`);
    });
  }

  if (variantName === 'tapered-flow') {
    ranked.slice(0, 4).forEach((item, index) => {
      layers.push(`<path d="M ${item.left + 8} ${height - 36} C ${item.left + item.width / 2} ${height - (36 + index * 6)} ${item.left + item.width / 2} ${height - (36 + index * 6)} ${item.left + item.width - 8} ${height - 36}" fill="none" stroke="rgba(17,94,89,0.35)" stroke-width="${Math.max(1.5, 4 - index * 0.5)}" />`);
    });
  }

  if (variantName === 'area') {
    const lead = ranked[0];
    if (lead) {
      const percent = Math.round((lead.value / total) * 100);
      layers.push(`<rect x="${lead.left + 10}" y="${height - 60}" width="72" height="20" rx="10" fill="rgba(255,255,255,0.9)" stroke="rgba(15,23,42,0.08)" />`);
      layers.push(`<text x="${lead.left + 46}" y="${height - 46}" text-anchor="middle" font-size="9" fill="#0f172a">${percent}% share</text>`);
    }
  }

  if (bandVariants.has(variantKey)) {
    ranked.slice(-2).forEach((item) => {
      layers.push(`<rect x="${item.left + 4}" y="34" width="${Math.max(item.width - 8, 14)}" height="${height - 68}" fill="rgba(56,189,248,0.08)" stroke="rgba(2,132,199,0.24)" stroke-dasharray="4 4" />`);
    });
  }

  if (trendVariants.has(variantKey)) {
    ranked.forEach((item, index) => {
      if (index % 2 === 0) {
        layers.push(`<rect x="${item.left}" y="${height - 42}" width="${Math.max(item.width, 12)}" height="10" fill="rgba(148,163,184,0.08)" />`);
      }
    });
  }

  if (focusVariants.has(variantKey)) {
    ranked.slice(0, 3).forEach((item, index) => {
      layers.push(`<rect x="${width - 100 + (index % 2) * 36}" y="${height - 54 + Math.floor(index / 2) * 18}" width="30" height="12" rx="6" fill="rgba(255,255,255,0.8)" stroke="rgba(15,23,42,0.08)" />`);
      if (index === 0) {
        layers.push(`<rect x="${item.left + 6}" y="34" width="${Math.max(item.width - 12, 16)}" height="${height - 68}" fill="none" stroke="rgba(14,165,233,0.3)" stroke-dasharray="4 4" />`);
      }
    });
  }

  if (realtimeVariants.has(variantKey)) {
    const tail = ranked[ranked.length - 1];
    if (tail) {
      layers.push(`<rect x="${tail.left}" y="30" width="${Math.max(tail.width, 12)}" height="${height - 60}" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.24)" />`);
      layers.push(`<text x="${tail.left + Math.max(tail.width / 2, 12)}" y="${height - 18}" text-anchor="middle" font-size="8" fill="#0369a1">Recent</text>`);
    }
  }

  layers.push(`<rect x="${width - Math.max(labelFromVariant(variantName).length * 6 + 40, 120)}" y="${height - 28}" width="${Math.max(labelFromVariant(variantName).length * 6 + 24, 88)}" height="18" rx="9" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="${width - Math.max(labelFromVariant(variantName).length * 3 + 28, 60)}" y="${height - 16}" text-anchor="middle" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);
  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function describeArc(centerX: number, centerY: number, radius: number, start: number, end: number): string {
  const startX = centerX + Math.cos(start) * radius;
  const startY = centerY + Math.sin(start) * radius;
  const endX = centerX + Math.cos(end) * radius;
  const endY = centerY + Math.sin(end) * radius;
  const largeArc = end - start > Math.PI ? 1 : 0;
  return `M ${startX.toFixed(2)} ${startY.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;
}

function renderPolarVariantOverlay(args: {
  variantName: string | null;
  slices: Array<{ label: string; value: number; start: number; end: number }>;
  centerX: number;
  centerY: number;
  radius: number;
  innerRadius: number;
}): string {
  const { variantName, slices, centerX, centerY, radius, innerRadius } = args;
  if (!variantName || !slices.length) {
    return '';
  }

  const layers: string[] = [];
  const largest = [...slices].sort((left, right) => right.value - left.value)[0];
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
    layers.push(`<path d="${describeArc(centerX, centerY, radius + 6, largest.start, largest.end)}" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />`);
    layers.push(`<rect x="${labelX - 26}" y="${labelY - 10}" width="52" height="18" rx="9" fill="rgba(15,23,42,0.86)" />`);
    layers.push(`<text x="${labelX}" y="${labelY + 3}" text-anchor="middle" font-size="9" fill="#f8fafc">${escapeHtml(largest.label)}</text>`);
  }

  if (largest && (variantName === 'goal-tracking' || variantName === 'control-room')) {
    const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1;
    const percent = Math.round((largest.value / total) * 100);
    const ringRadius = innerRadius > 0 ? innerRadius - 10 : radius * 0.44;
    layers.push(`<circle cx="${centerX}" cy="${centerY}" r="${Math.max(ringRadius, 24)}" fill="rgba(255,255,255,0.94)" stroke="rgba(15,23,42,0.08)" />`);
    layers.push(`<text x="${centerX}" y="${centerY - 2}" text-anchor="middle" font-size="16" fill="#0f172a">${percent}%</text>`);
    layers.push(`<text x="${centerX}" y="${centerY + 14}" text-anchor="middle" font-size="9" fill="#475569">${variantName === 'goal-tracking' ? 'Target slice' : 'Primary segment'}</text>`);
  }

  if (variantName === 'control-room') {
    layers.push(`<rect x="${centerX - 44}" y="${centerY - radius - 10}" width="88" height="18" rx="9" fill="rgba(15,23,42,0.9)" />`);
    layers.push(`<text x="${centerX}" y="${centerY - radius + 2}" text-anchor="middle" font-size="9" fill="#67e8f9">Polar watch</text>`);
  }

  if (variantName === 'threshold-alert') {
    const average = slices.reduce((sum, slice) => sum + slice.value, 0) / Math.max(slices.length, 1);
    slices
      .filter((slice) => slice.value >= average)
      .forEach((slice) => {
        layers.push(`<path d="${describeArc(centerX, centerY, radius + 10, slice.start, slice.end)}" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />`);
      });
  }

  if (anomalyVariants.has(variantName)) {
    const smallest = [...slices].sort((left, right) => left.value - right.value)[0];
    if (smallest) {
      const mid = (smallest.start + smallest.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 22);
      const y = centerY + Math.sin(mid) * (radius + 22);
      layers.push(`<path d="${describeArc(centerX, centerY, radius + 8, smallest.start, smallest.end)}" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round" />`);
      layers.push(`<text x="${x}" y="${y}" text-anchor="middle" font-size="8" fill="#7f1d1d">Outlier</text>`);
    }
  }

  if (bandVariants.has(variantName)) {
    const scoped = variantName === 'forecast-band' ? slices.slice(Math.max(0, Math.floor(slices.length / 2))) : slices;
    scoped.forEach((slice, index) => {
      layers.push(`<path d="${describeArc(centerX, centerY, radius + 10 + index * 2, slice.start, slice.end)}" fill="none" stroke="${variantName === 'forecast-band' ? 'rgba(2,132,199,0.34)' : 'rgba(15,118,110,0.28)'}" stroke-width="3" stroke-dasharray="6 4" stroke-linecap="round" />`);
    });
  }

  if (ringVariants.has(variantName)) {
    [0.42, 0.64, 0.86].forEach((ratio, index) => {
      layers.push(`<circle cx="${centerX}" cy="${centerY}" r="${Math.max((innerRadius > 0 ? innerRadius : radius * 0.28) + radius * ratio * 0.35, 24)}" fill="none" stroke="rgba(100,116,139,${index === 1 ? '0.22' : '0.14'})" stroke-dasharray="4 4" />`);
    });
  }

  if (focusVariants.has(variantName)) {
    [0, 1, 2].forEach((index) => {
      layers.push(`<circle cx="${centerX - 34 + index * 34}" cy="${centerY - radius - 18}" r="10" fill="rgba(255,255,255,0.82)" stroke="rgba(15,23,42,0.08)" />`);
    });
    if (largest) {
      layers.push(`<path d="${describeArc(centerX, centerY, radius + 14, largest.start, largest.end)}" fill="none" stroke="rgba(14,165,233,0.32)" stroke-width="4" />`);
    }
  }

  if (eventVariants.has(variantName)) {
    slices.slice(0, 2).forEach((slice, index) => {
      const mid = (slice.start + slice.end) / 2;
      const innerX = centerX + Math.cos(mid) * (innerRadius > 0 ? innerRadius : radius * 0.34);
      const innerY = centerY + Math.sin(mid) * (innerRadius > 0 ? innerRadius : radius * 0.34);
      const outerX = centerX + Math.cos(mid) * (radius + 18);
      const outerY = centerY + Math.sin(mid) * (radius + 18);
      layers.push(`<line x1="${innerX}" y1="${innerY}" x2="${outerX}" y2="${outerY}" stroke="rgba(51,65,85,0.28)" stroke-dasharray="4 4" />`);
      layers.push(`<text x="${outerX}" y="${outerY}" text-anchor="middle" font-size="8" fill="#475569">E${index + 1}</text>`);
    });
  }

  if (realtimeVariants.has(variantName)) {
    const latest = slices[slices.length - 1];
    if (latest) {
      const mid = (latest.start + latest.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 28);
      const y = centerY + Math.sin(mid) * (radius + 28);
      layers.push(`<path d="${describeArc(centerX, centerY, radius + 12, latest.start, latest.end)}" fill="none" stroke="rgba(14,165,233,0.4)" stroke-width="5" stroke-linecap="round" />`);
      layers.push(`<text x="${x}" y="${y}" text-anchor="middle" font-size="8" fill="#0369a1">Latest</text>`);
    }
  }

  if (variantName === 'drilldown-workbench') {
    const lead = largest;
    if (lead) {
      const mid = (lead.start + lead.end) / 2;
      const badgeX = centerX + Math.cos(mid) * (radius + 18);
      const badgeY = centerY + Math.sin(mid) * (radius + 18);
      layers.push(`<rect x="${centerX - 62}" y="${centerY - radius - 10}" width="124" height="18" rx="9" fill="rgba(15,23,42,0.86)" />`);
      layers.push(`<text x="${centerX}" y="${centerY - radius + 2}" text-anchor="middle" font-size="9" fill="#e2e8f0">Portfolio / Segment / Slice</text>`);
      layers.push(`<circle cx="${badgeX}" cy="${badgeY}" r="10" fill="rgba(15,23,42,0.86)" stroke="#e2e8f0" />`);
      layers.push(`<text x="${badgeX}" y="${badgeY + 3}" text-anchor="middle" font-size="8" fill="#f8fafc">+</text>`);
    }
  }

  if (variantName === 'tapered-flow') {
    slices.forEach((slice, index) => {
      const thickness = Math.max(2, 8 - index);
      layers.push(`<path d="${describeArc(centerX, centerY, radius + 12 + index * 2, slice.start, slice.end)}" fill="none" stroke="rgba(17,94,89,0.35)" stroke-width="${thickness}" stroke-linecap="round" />`);
    });
  }

  if (variantName === 'topology-health') {
    const maxValue = Math.max(...slices.map((slice) => slice.value), 1);
    slices.slice(0, 3).forEach((slice) => {
      const mid = (slice.start + slice.end) / 2;
      const tone = slice.value / maxValue > 0.72 ? '#dc2626' : slice.value / maxValue > 0.4 ? '#f59e0b' : '#0f766e';
      const x = centerX + Math.cos(mid) * (radius + 22);
      const y = centerY + Math.sin(mid) * (radius + 22);
      layers.push(`<circle cx="${x}" cy="${y}" r="7" fill="${tone}" stroke="#f8fafc" stroke-width="1.2" />`);
    });
  }

  if (variantName === 'cohort-breakdown') {
    slices.forEach((slice, index) => {
      const mid = (slice.start + slice.end) / 2;
      const x = centerX + Math.cos(mid) * (radius + 20);
      const y = centerY + Math.sin(mid) * (radius + 20);
      layers.push(`<text x="${x}" y="${y}" text-anchor="middle" font-size="8" fill="#475569">C${index + 1}</text>`);
    });
  }

  if (variantName === 'ranking-shift') {
    [...slices]
      .sort((left, right) => right.value - left.value)
      .slice(0, 3)
      .forEach((slice, index) => {
        const mid = (slice.start + slice.end) / 2;
        const x = centerX + Math.cos(mid) * (radius + 26);
        const y = centerY + Math.sin(mid) * (radius + 26);
        layers.push(`<circle cx="${x}" cy="${y}" r="9" fill="rgba(15,23,42,0.84)" />`);
        layers.push(`<text x="${x}" y="${y + 3}" text-anchor="middle" font-size="8" fill="#f8fafc">#${index + 1}</text>`);
      });
  }

  if (variantName === 'dependency-critical-path') {
    const ranked = [...slices].sort((left, right) => right.value - left.value).slice(0, 3);
    ranked.forEach((slice, index) => {
      const next = ranked[index + 1];
      if (!next) {
        return;
      }
      const mid = (slice.start + slice.end) / 2;
      const nextMid = (next.start + next.end) / 2;
      const x1 = centerX + Math.cos(mid) * (innerRadius > 0 ? innerRadius : radius * 0.5);
      const y1 = centerY + Math.sin(mid) * (innerRadius > 0 ? innerRadius : radius * 0.5);
      const x2 = centerX + Math.cos(nextMid) * (innerRadius > 0 ? innerRadius : radius * 0.5);
      const y2 = centerY + Math.sin(nextMid) * (innerRadius > 0 ? innerRadius : radius * 0.5);
      layers.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d97706" stroke-width="2.2" stroke-dasharray="5 4" />`);
    });
  }

  layers.push(`<rect x="24" y="${centerY + radius + 16}" width="${Math.max(labelFromVariant(variantName).length * 6 + 24, 92)}" height="18" rx="9" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="36" y="${centerY + radius + 28}" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);
  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function renderRadarVariantOverlay(args: {
  variantName: string | null;
  values: number[];
  coords: Array<{ x: number; y: number }>;
  centerX: number;
  centerY: number;
  radius: number;
}): string {
  const { variantName, values, coords, centerX, centerY, radius } = args;
  if (!variantName || !values.length || !coords.length) {
    return '';
  }

  const layers: string[] = [];
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
    [0.25, 0.5, 0.75, 1].forEach((ratio) => {
      layers.push(`<circle cx="${centerX}" cy="${centerY}" r="${radius * ratio}" fill="none" stroke="rgba(100,116,139,0.22)" />`);
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
    layers.push(`<path d="${ribbonPath(outer, inner)}" fill="${variantName === 'forecast-band' ? 'rgba(56,189,248,0.12)' : 'rgba(15,118,110,0.1)'}" stroke="none" />`);
    layers.push(`<path d="${linePath(outer)}" fill="none" stroke="${variantName === 'forecast-band' ? '#0284c7' : '#0f766e'}" stroke-width="2" stroke-dasharray="6 4" />`);
  }

  if (anomalyVariants.has(variantName)) {
    const low = ranked[ranked.length - 1];
    const point = coords[low?.index ?? -1];
    if (point) {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="10" fill="none" stroke="#dc2626" stroke-width="1.8" />`);
      layers.push(`<text x="${point.x + 12}" y="${point.y + 2}" font-size="8" fill="#7f1d1d">Low axis</text>`);
    }
  }

  if (trendVariants.has(variantName)) {
    if (variantName === 'seasonal-decomposition') {
      [0.2, 0.4, 0.6, 0.8].forEach((ratio) => {
        layers.push(`<circle cx="${centerX}" cy="${centerY}" r="${radius * ratio}" fill="none" stroke="rgba(148,163,184,0.14)" />`);
      });
    }
    const averageCoords = coords.map((point) => ({
      x: centerX + (point.x - centerX) * 0.78,
      y: centerY + (point.y - centerY) * 0.78
    }));
    layers.push(`<path d="${linePath(averageCoords)}" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="6 4" />`);
    if (variantName === 'timeline') {
      ranked.slice(0, 3).forEach(({ index }, rank) => {
        const point = coords[index];
        if (!point) {
          return;
        }
        layers.push(`<text x="${point.x + 10}" y="${point.y - 12}" font-size="8" fill="#0369a1">T${rank + 1}</text>`);
      });
    }
  }

  if (laneVariants.has(variantName)) {
    [0.52, 0.76].forEach((ratio, index) => {
      layers.push(`<circle cx="${centerX}" cy="${centerY}" r="${radius * ratio}" fill="none" stroke="${index === 0 ? 'rgba(2,132,199,0.26)' : 'rgba(245,158,11,0.24)'}" stroke-dasharray="5 4" />`);
    });
  }

  if (focusVariants.has(variantName)) {
    const lead = coords[ranked[0]?.index ?? 0];
    if (lead) {
      layers.push(`<path d="M ${centerX} ${centerY} L ${lead.x} ${lead.y} L ${centerX + (lead.x - centerX) * 0.35} ${centerY + (lead.y - centerY) * 0.35} Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.28)" />`);
    }
    [0, 1, 2, 3].forEach((index) => {
      layers.push(`<rect x="${centerX - 44 + (index % 2) * 48}" y="${centerY + radius - 8 + Math.floor(index / 2) * 20}" width="40" height="14" rx="7" fill="rgba(255,255,255,0.78)" stroke="rgba(15,23,42,0.08)" />`);
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
      layers.push(`<line x1="${point.x}" y1="${point.y}" x2="${outerX}" y2="${outerY}" stroke="rgba(51,65,85,0.28)" stroke-dasharray="4 4" />`);
      layers.push(`<text x="${outerX}" y="${outerY}" text-anchor="middle" font-size="8" fill="#475569">E${order + 1}</text>`);
    });
  }

  if (realtimeVariants.has(variantName)) {
    const latest = coords[coords.length - 1];
    if (latest) {
      layers.push(`<circle cx="${latest.x}" cy="${latest.y}" r="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.32)" />`);
      layers.push(`<line x1="${centerX}" y1="${centerY}" x2="${latest.x}" y2="${latest.y}" stroke="#0ea5e9" stroke-dasharray="5 4" />`);
    }
  }

  if (variantName === 'outlier-lens' || variantName === 'control-room') {
    const topIndex = values.indexOf(Math.max(...values));
    const point = coords[topIndex];
    if (point) {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="10" fill="none" stroke="#dc2626" stroke-width="1.8" />`);
    }
  }

  if (variantName === 'control-room') {
    layers.push(`<rect x="${centerX - 40}" y="${centerY - radius - 10}" width="80" height="18" rx="9" fill="rgba(15,23,42,0.9)" />`);
    layers.push(`<text x="${centerX}" y="${centerY - radius + 2}" text-anchor="middle" font-size="9" fill="#67e8f9">Radar watch</text>`);
  }

  if (variantName === 'threshold-alert') {
    const threshold = radius * 0.72;
    layers.push(`<circle cx="${centerX}" cy="${centerY}" r="${threshold}" fill="none" stroke="#dc2626" stroke-dasharray="6 4" />`);
    values.forEach((value, index) => {
      if (value < Math.max(...values) * 0.72) {
        return;
      }
      const point = coords[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="6" fill="rgba(220,38,38,0.14)" stroke="#dc2626" stroke-width="1.4" />`);
    });
  }

  if (variantName === 'narrative-sequence') {
    ranked.slice(0, 3).forEach(({ index }, rank) => {
      const point = coords[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x + 10}" cy="${point.y - 10}" r="9" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="${point.x + 10}" y="${point.y - 7}" text-anchor="middle" font-size="8" fill="#f8fafc">${rank + 1}</text>`);
    });
  }

  if (variantName === 'multi-resolution') {
    const lead = coords[ranked[0]?.index ?? 0];
    if (lead) {
      layers.push(`<path d="M ${centerX} ${centerY} L ${lead.x} ${lead.y} L ${centerX + (lead.x - centerX) * 0.42} ${centerY + (lead.y - centerY) * 0.42} Z" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" />`);
    }
  }

  if (variantName === 'drilldown-workbench') {
    const lead = coords[ranked[0]?.index ?? 0];
    if (lead) {
      layers.push(`<rect x="${centerX - 54}" y="${centerY - radius - 10}" width="108" height="18" rx="9" fill="rgba(15,23,42,0.86)" />`);
      layers.push(`<text x="${centerX}" y="${centerY - radius + 2}" text-anchor="middle" font-size="9" fill="#e2e8f0">Axis / Cluster / Detail</text>`);
      layers.push(`<circle cx="${lead.x + 12}" cy="${lead.y - 12}" r="9" fill="rgba(15,23,42,0.84)" stroke="#e2e8f0" />`);
      layers.push(`<text x="${lead.x + 12}" y="${lead.y - 9}" text-anchor="middle" font-size="8" fill="#f8fafc">+</text>`);
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
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="8" fill="none" stroke="${tone}" stroke-width="2" />`);
    });
  }

  if (variantName === 'cohort-breakdown') {
    coords.forEach((point, index) => {
      layers.push(`<text x="${point.x + 10}" y="${point.y + 10}" font-size="8" fill="#475569">C${index + 1}</text>`);
    });
  }

  if (variantName === 'ranking-shift') {
    ranked.slice(0, 3).forEach(({ index }, rank) => {
      const point = coords[index];
      if (!point) {
        return;
      }
      layers.push(`<circle cx="${point.x + 10}" cy="${point.y - 10}" r="9" fill="rgba(15,23,42,0.84)" />`);
      layers.push(`<text x="${point.x + 10}" y="${point.y - 7}" text-anchor="middle" font-size="8" fill="#f8fafc">#${rank + 1}</text>`);
    });
  }

  if (variantName === 'dependency-critical-path') {
    const chain = ranked
      .slice(0, 3)
      .map(({ index }) => coords[index])
      .filter((point): point is { x: number; y: number } => Boolean(point));
    if (chain.length >= 2) {
      layers.push(`<path d="${linePath(chain)}" fill="none" stroke="#d97706" stroke-width="2.2" stroke-dasharray="5 4" />`);
    }
  }

  if (variantName === 'tapered-flow') {
    const chain = ranked
      .slice(0, 4)
      .map(({ index }) => coords[index])
      .filter((point): point is { x: number; y: number } => Boolean(point));
    chain.forEach((point, index) => {
      layers.push(`<circle cx="${point.x}" cy="${point.y}" r="${Math.max(3, 9 - index)}" fill="rgba(17,94,89,0.08)" stroke="rgba(17,94,89,0.3)" />`);
    });
  }

  layers.push(`<rect x="36" y="${centerY + radius + 8}" width="${Math.max(labelFromVariant(variantName).length * 6 + 24, 92)}" height="16" rx="8" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="48" y="${centerY + radius + 19}" font-size="8" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);
  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function renderFunnelVariantOverlay(args: {
  variantName: string | null;
  values: Array<{ label: string; value: number }>;
  width: number;
  height: number;
}): string {
  const { variantName, values, width, height } = args;
  if (!variantName || !values.length) {
    return '';
  }

  const layers: string[] = [];
  const segmentHeight = height / Math.max(values.length, 1);
  const conversions = values.map((item, index) => {
    if (index === 0) {
      return 100;
    }
    const previous = values[index - 1]?.value ?? item.value;
    return previous ? Math.round((item.value / previous) * 100) : 100;
  });
  const weakestIndex = conversions.slice(1).reduce(
    (lowestIndex, value, index) => (value < (conversions[lowestIndex] ?? 101) ? index + 1 : lowestIndex),
    1
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
      layers.push(`<text x="${width - 34}" y="${20 + index * segmentHeight + 8}" text-anchor="end" font-size="10" fill="#334155">${conversion}%</text>`);
      if (variantName === 'narrative-sequence') {
        layers.push(`<circle cx="28" cy="${20 + index * segmentHeight - 4}" r="9" fill="rgba(15,23,42,0.86)" />`);
        layers.push(`<text x="28" y="${20 + index * segmentHeight}" text-anchor="middle" font-size="8" fill="#f8fafc">${index + 1}</text>`);
      }
    });
  }

  if (variantName === 'control-room') {
    layers.push(`<rect x="${width - 128}" y="16" width="112" height="18" rx="9" fill="rgba(15,23,42,0.9)" />`);
    layers.push(`<text x="${width - 72}" y="28" text-anchor="middle" font-size="9" fill="#67e8f9">Conversion watch</text>`);
  }

  if (variantName === 'comparison-grid' || variantName === 'scenario-planner') {
    values.forEach((_, index) => {
      const y = 20 + index * segmentHeight;
      layers.push(`<line x1="24" y1="${y}" x2="${width - 24}" y2="${y}" stroke="rgba(15,23,42,0.14)" stroke-dasharray="4 4" />`);
    });
  }

  if (variantName === 'streaming') {
    const y = 20 + (values.length - 1) * segmentHeight - 10;
    layers.push(`<rect x="20" y="${y}" width="${width - 40}" height="${Math.max(segmentHeight - 2, 26)}" rx="13" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.28)" />`);
    layers.push(`<text x="${width - 34}" y="${y + 15}" text-anchor="end" font-size="9" fill="#0369a1">Streaming stage</text>`);
  }

  if (bandVariants.has(variantName)) {
    const ribbonY = 20 + Math.max(weakestIndex, 1) * segmentHeight - 14;
    layers.push(`<rect x="${width - 92}" y="${ribbonY}" width="56" height="${Math.max(segmentHeight + 8, 24)}" rx="12" fill="${variantName === 'forecast-band' ? 'rgba(56,189,248,0.12)' : 'rgba(15,118,110,0.1)'}" stroke="${variantName === 'forecast-band' ? 'rgba(2,132,199,0.34)' : 'rgba(15,118,110,0.28)'}" stroke-dasharray="5 4" />`);
  }

  if (anomalyVariants.has(variantName)) {
    const top = 20 + weakestIndex * segmentHeight - 12;
    layers.push(`<rect x="22" y="${top}" width="${width - 44}" height="${Math.max(segmentHeight - 8, 24)}" rx="12" fill="none" stroke="#dc2626" stroke-width="${variantName === 'outlier-lens' ? 2 : 1.6}" />`);
    if (variantName === 'quantile-layers') {
      [0.35, 0.5, 0.65].forEach((ratio) => {
        layers.push(`<line x1="24" y1="${20 + segmentHeight * ratio}" x2="${width - 24}" y2="${20 + segmentHeight * ratio}" stroke="rgba(15,23,42,0.14)" stroke-dasharray="4 4" />`);
      });
    }
  }

  if (trendVariants.has(variantName)) {
    if (variantName === 'seasonal-decomposition') {
      values.forEach((_, index) => {
        if (index % 2 === 0) {
          layers.push(`<rect x="24" y="${20 + index * segmentHeight - 10}" width="${width - 48}" height="${Math.max(segmentHeight - 2, 20)}" fill="rgba(148,163,184,0.05)" />`);
        }
      });
    }
    const pathPoints = conversions.map((value, index) => ({
      x: width - 76,
      y: 20 + index * segmentHeight + 8 - (100 - value) * 0.18
    }));
    if (pathPoints.length >= 2) {
      layers.push(`<path d="${linePath(pathPoints)}" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="6 4" />`);
    }
  }

  if (laneVariants.has(variantName)) {
    [0.55, 0.8].forEach((ratio, index) => {
      const x = 32 + (width - 96) * ratio;
      layers.push(`<line x1="${x}" y1="20" x2="${x}" y2="${height - 20}" stroke="${index === 0 ? 'rgba(2,132,199,0.26)' : 'rgba(245,158,11,0.28)'}" stroke-dasharray="4 4" />`);
    });
  }

  if (focusVariants.has(variantName)) {
    [0, 1, 2, 3].forEach((index) => {
      layers.push(`<rect x="${width - 96 + (index % 2) * 34}" y="${height - 56 + Math.floor(index / 2) * 18}" width="28" height="12" rx="6" fill="rgba(255,255,255,0.8)" stroke="rgba(15,23,42,0.08)" />`);
    });
    const top = 20 + weakestIndex * segmentHeight - 12;
    layers.push(`<rect x="22" y="${top}" width="${width - 44}" height="${Math.max(segmentHeight - 8, 24)}" rx="12" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.28)" stroke-dasharray="4 4" />`);
  }

  if (eventVariants.has(variantName)) {
    [1, Math.max(1, Math.floor(values.length / 2))].forEach((index, order) => {
      const y = 20 + index * segmentHeight + 4;
      layers.push(`<line x1="28" y1="${y}" x2="${width - 28}" y2="${y}" stroke="rgba(51,65,85,0.24)" stroke-dasharray="4 4" />`);
      layers.push(`<text x="34" y="${y - 4}" font-size="8" fill="#475569">E${order + 1}</text>`);
    });
  }

  if (variantName === 'threshold-alert') {
    const top = 20 + weakestIndex * segmentHeight - 12;
    layers.push(`<rect x="22" y="${top}" width="${width - 44}" height="${Math.max(segmentHeight - 8, 24)}" rx="12" fill="none" stroke="#dc2626" stroke-width="1.8" />`);
    layers.push(`<text x="${width - 34}" y="${top - 4}" text-anchor="end" font-size="9" fill="#dc2626">Weakest conversion</text>`);
  }

  if (variantName === 'drilldown-workbench') {
    const top = 20 + weakestIndex * segmentHeight;
    layers.push(`<rect x="24" y="8" width="136" height="16" rx="8" fill="rgba(15,23,42,0.84)" />`);
    layers.push(`<text x="36" y="19" font-size="9" fill="#e2e8f0">Pipeline / Stage / Detail</text>`);
    layers.push(`<circle cx="36" cy="${top + 6}" r="9" fill="rgba(15,23,42,0.82)" stroke="#e2e8f0" />`);
    layers.push(`<text x="36" y="${top + 9}" text-anchor="middle" font-size="8" fill="#f8fafc">+</text>`);
  }

  if (variantName === 'realtime-queue') {
    const y = 20 + (values.length - 1) * segmentHeight - 10;
    layers.push(`<rect x="24" y="${y}" width="${width - 48}" height="${Math.max(segmentHeight - 4, 24)}" rx="12" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.28)" />`);
    layers.push(`<text x="${width - 34}" y="${y + 14}" text-anchor="end" font-size="9" fill="#0369a1">Queue tail</text>`);
  }

  if (variantName === 'cohort-breakdown') {
    values.forEach((item, index) => {
      layers.push(`<text x="28" y="${20 + index * segmentHeight + 8}" font-size="8" fill="#475569">C${index + 1}</text>`);
    });
  }

  if (variantName === 'ranking-shift') {
    conversions
      .map((value, index) => ({ index, value }))
      .sort((left, right) => right.value - left.value)
      .slice(0, Math.min(3, conversions.length))
      .forEach(({ index }, rank) => {
        const y = 20 + index * segmentHeight + 6;
        layers.push(`<circle cx="${width - 24}" cy="${y}" r="8" fill="rgba(15,23,42,0.84)" />`);
        layers.push(`<text x="${width - 24}" y="${y + 3}" text-anchor="middle" font-size="7" fill="#f8fafc">#${rank + 1}</text>`);
      });
  }

  if (variantName === 'dependency-critical-path') {
    const top = 20 + weakestIndex * segmentHeight - 12;
    layers.push(`<rect x="22" y="${top}" width="${width - 44}" height="${Math.max(segmentHeight - 8, 24)}" rx="12" fill="none" stroke="#d97706" stroke-width="1.8" stroke-dasharray="5 4" />`);
    layers.push(`<text x="${width - 34}" y="${top - 4}" text-anchor="end" font-size="9" fill="#92400e">Critical step</text>`);
  }

  if (variantName === 'topology-health') {
    conversions.slice(1).forEach((conversion, index) => {
      const tone = conversion < 55 ? '#dc2626' : conversion < 75 ? '#f59e0b' : '#0f766e';
      layers.push(`<circle cx="${width - 16}" cy="${20 + (index + 1) * segmentHeight + 8}" r="6" fill="${tone}" stroke="#f8fafc" stroke-width="1.2" />`);
    });
  }

  if (variantName === 'tapered-flow') {
    values.forEach((_, index) => {
      if (index === 0) {
        return;
      }
      const y = 20 + index * segmentHeight + 8;
      layers.push(`<path d="M 42 ${y} C ${width / 2} ${y - 6} ${width / 2} ${y - 6} ${width - 64} ${y}" fill="none" stroke="rgba(17,94,89,0.35)" stroke-width="${Math.max(1.5, 4 - index * 0.3)}" />`);
    });
  }

  layers.push(`<rect x="24" y="${height - 22}" width="${Math.max(labelFromVariant(variantName).length * 6 + 24, 96)}" height="18" rx="9" fill="rgba(15,23,42,0.82)" />`);
  layers.push(`<text x="36" y="${height - 10}" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text>`);
  return `<g data-variant-layer="${variantName}">${layers.join('')}</g>`;
}

function boxStats(values: number[]): { min: number; q1: number; q2: number; q3: number; max: number } {
  if (!values.length) {
    return { min: 0, q1: 0, q2: 0, q3: 0, max: 0 };
  }

  const sorted = [...values].sort((left, right) => left - right);
  const q = (rank: number): number => sorted[Math.max(0, Math.min(sorted.length - 1, Math.floor(rank * (sorted.length - 1))))];
  const medianIndex = (sorted.length - 1) / 2;
  const lower = sorted.slice(0, Math.floor(sorted.length / 2));
  const upper = sorted.slice(Math.ceil(sorted.length / 2));

  const q1 = lower.length ? lower[Math.max(0, Math.floor((lower.length - 1) * 0.5))] : sorted[0];
  const q3 = upper.length ? upper[Math.max(0, Math.floor((upper.length - 1) * 0.5))] : sorted[sorted.length - 1];

  return {
    min: sorted[0],
    q1,
    q2: q(medianIndex),
    q3,
    max: sorted[sorted.length - 1]
  };
}

function layoutGridNodes(nodes: string[], width: number, height: number): Map<string, { x: number; y: number }> {
  const columns = Math.max(Math.ceil(Math.sqrt(nodes.length)), 1);
  const rows = Math.max(Math.ceil(nodes.length / columns), 1);
  const cellWidth = (width - 48) / columns;
  const cellHeight = (height - 48) / rows;
  const positions = new Map<string, { x: number; y: number }>();

  nodes.forEach((node, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    positions.set(node, {
      x: 24 + column * cellWidth + cellWidth / 2,
      y: 24 + row * cellHeight + cellHeight / 2
    });
  });

  return positions;
}

function layoutSankeyNodes(
  nodes: string[],
  edges: Array<{ source: string; target: string }>,
  width: number,
  height: number
): { positions: Map<string, { x: number; y: number }>; levels: Map<string, number>; maxLevel: number } {
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

  const positions = new Map<string, { x: number; y: number }>();
  itemsByLevel.forEach((items, level) => {
    const step = (height - 48) / Math.max(items.length, 1);
    items.forEach((node, index) => {
      const x = columns === 1 ? width / 2 : 24 + (level / Math.max(columns - 1, 1)) * (width - 48);
      const y = 24 + step * index + step / 2;
      positions.set(node, { x, y });
    });
  });

  return { positions, levels, maxLevel };
}

function chartTag(type: string, variantName?: string | null): string {
  return `<g data-chart-type="${type}"${variantName ? ` data-chart-variant="${variantName}"` : ''}></g>`;
}

function wrapSvg(width: number, height: number, roleLabel: string, body: string, title = ''): string {
  const safeTitle = title ? `<title>${escapeHtml(title)}</title>` : '';
  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(roleLabel)}">${safeTitle}${body}</svg>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function chartTitle(value: unknown): string {
  return toString(value, 'Mystique chart');
}

function resolveAxisLabel(value: unknown, fallback: string): string {
  return toString(value, fallback) || fallback;
}

export function renderMystiqueSvgBarChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const labels = data.map((item, index) => resolveAxisLabel(item.label, `Item ${index + 1}`));
  const values = data.map((item, index) => toNumber(item.value, index));
  const x = createBandScale(labels, [36, width - 24]);
  const max = Math.max(...values, 1);
  const y = createLinearScale([0, max || 1], [height - 36, 28]);
  const bounds = { left: 36, right: width - 24, top: 28, bottom: height - 36 };

  const bars = data
    .map((item, index) => {
      const left = x.map(labels[index] ?? String(index));
      const top = y.map(values[index]);
      const barHeight = height - 36 - top;
      return `<rect x="${left}" y="${top}" width="${Math.max(x.bandwidth - 6, 6)}" height="${Math.max(barHeight, 1)}" rx="8" fill="${basePalette[index % basePalette.length]}"/>`;
    })
    .join('');

  const centers = labels.map((label) => ({
    x: x.map(label) + Math.max(x.bandwidth - 6, 6) / 2,
    y: y.map(values[labels.indexOf(label)] ?? 0)
  }));
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points: centers,
    values,
    labels,
    bounds,
    mapValue: (value) => y.map(value)
  });

  const labelsMarkup = data
    .map((item, index) => {
      const left = x.map(labels[index] ?? String(index));
      return `<text x="${left + (x.bandwidth - 6) / 2}" y="${height - 12}" text-anchor="middle" font-size="11" fill="#334155">${escapeHtml(resolveAxisLabel(item.label, `#${index + 1}`))}</text>`;
    })
    .join('');

  return wrapSvg(width, height, chartTitle(title), `${overlay}${bars}${labelsMarkup}${chartTag('bar', variantName)}`);
}

export function renderMystiqueSvgGroupedBarChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const categories = data.map((item, index) => resolveAxisLabel(item.label, `Item ${index + 1}`));
  const values = data.map((item) => coerceNumberList(item.values, [toNumber(item.value, 0)]));
  const maxSeries = Math.max(...values.flatMap((item) => item));
  const max = Math.max(maxSeries, 1);
  const x = createBandScale(categories, [36, width - 24]);
  const y = createLinearScale([0, max || 1], [height - 36, 28]);
  const bounds = { left: 36, right: width - 24, top: 28, bottom: height - 36 };

  const bars = values
    .flatMap((series, seriesIndex) =>
      series.map((value, index) => {
        const groupWidth = x.bandwidth * (x.bandwidth ? 1 : 0);
        const segment = Math.max(groupWidth / Math.max(series.length, 1), 4);
        const left = x.map(categories[seriesIndex] ?? String(seriesIndex)) + segment * index;
        const top = y.map(value);
        const barHeight = height - 36 - top;
        return `<rect x="${left}" y="${top}" width="${Math.max(segment - 2, 4)}" height="${Math.max(barHeight, 1)}" rx="6" fill="${basePalette[index % basePalette.length]}"/>`;
      })
    )
    .join('');

  const aggregateValues = values.map((series) => series.reduce((sum, value) => sum + value, 0));
  const centers = categories.map((category, index) => ({
    x: x.map(category) + x.bandwidth / 2,
    y: y.map(Math.max(...(values[index] ?? [0])))
  }));
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points: centers,
    values: aggregateValues,
    labels: categories,
    bounds,
    mapValue: (value) => y.map(value)
  });

  return wrapSvg(width, height, chartTitle(title), `${overlay}${bars}${chartTag('grouped-bar', variantName)}`);
}

export function renderMystiqueSvgStackedBarChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const categories = data.map((item, index) => resolveAxisLabel(item.label, `Item ${index + 1}`));
  const stacks = data.map((item) => coerceNumberList(item.values, [toNumber(item.value, 0)]));
  const x = createBandScale(categories, [36, width - 24]);
  const max = Math.max(...stacks.map((series) => series.reduce((sum, value) => sum + Math.max(value, 0), 0)), 1);
  const y = createLinearScale([0, max], [height - 36, 28]);
  const bounds = { left: 36, right: width - 24, top: 28, bottom: height - 36 };

  const bars = stacks
    .map((segmentData, categoryIndex) => {
      let offset = 0;
      return segmentData
        .map((segment) => {
          const top = y.map(offset + segment);
          const base = y.map(offset);
          offset += segment;
          return `<rect x="${x.map(categories[categoryIndex] ?? String(categoryIndex))}" y="${top}" width="${Math.max(x.bandwidth - 6, 6)}" height="${Math.max(base - top, 1)}" fill="${basePalette[(categoryIndex + 1 + segmentData.indexOf(segment)) % basePalette.length]}" rx="4"/>`;
        })
        .join('');
    })
    .join('');

  const totals = stacks.map((series) => series.reduce((sum, value) => sum + Math.max(value, 0), 0));
  const centers = categories.map((category, index) => ({
    x: x.map(category) + x.bandwidth / 2,
    y: y.map(totals[index] ?? 0)
  }));
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points: centers,
    values: totals,
    labels: categories,
    bounds,
    mapValue: (value) => y.map(value)
  });

  return wrapSvg(width, height, chartTitle(title), `${overlay}${bars}${chartTag('stacked-bar', variantName)}`);
}

export function renderMystiqueSvgLineChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const mapped = data.map((item, index) => {
    const xValue = toNumber(item.x, index);
    const yValue = toNumber(item.y, toNumber(item.value, 0));
    return { xValue, yValue, label: resolveAxisLabel(item.label, String(index + 1)) };
  });

  const x = createLinearScale(
    [Math.min(...mapped.map((item) => item.xValue), 0), Math.max(...mapped.map((item) => item.xValue), 1)],
    [36, width - 24]
  );
  const y = createLinearScale(
    [Math.min(...mapped.map((item) => item.yValue), 0), Math.max(...mapped.map((item) => item.yValue), 1)],
    [height - 36, 28]
  );

  const points = mapped.map((item) => ({ x: x.map(item.xValue), y: y.map(item.yValue) }));
  const path = linePath(points);
  const bounds = { left: 36, right: width - 24, top: 28, bottom: height - 36 };
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points,
    values: mapped.map((item) => item.yValue),
    labels: mapped.map((item) => item.label),
    bounds,
    mapValue: (value) => y.map(value)
  });
  const markers = points.map((point, index) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#115e59"/><text x="${point.x + 2}" y="${point.y - 9}" font-size="10" fill="#334155">${escapeHtml(mapped[index].label)}</text>`).join('');

  return wrapSvg(width, height, chartTitle(title), `${overlay}<path d="${path}" fill="none" stroke="#115e59" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${markers}${chartTag('line', variantName)}`);
}

export function renderMystiqueSvgAreaChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const mapped = data.map((item, index) => ({
    x: toNumber(item.x, index),
    y: toNumber(item.y, toNumber(item.value, 0))
  }));
  const x = createLinearScale([Math.min(...mapped.map((item) => item.x), 0), Math.max(...mapped.map((item) => item.x), 1)], [36, width - 24]);
  const y = createLinearScale([0, Math.max(...mapped.map((item) => item.y), 1)], [height - 36, 28]);
  const points = mapped.map((item) => ({ x: x.map(item.x), y: y.map(item.y) }));
  const line = linePath(points);
  const area = `${line} L ${points[points.length - 1]?.x ?? width} ${height - 36} L ${points[0]?.x ?? 36} ${height - 36} Z`;
  const bounds = { left: 36, right: width - 24, top: 28, bottom: height - 36 };
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points,
    values: mapped.map((item) => item.y),
    labels: mapped.map((_, index) => `P${index + 1}`),
    bounds,
    mapValue: (value) => y.map(value)
  });

  return wrapSvg(width, height, chartTitle(title), `${overlay}<path d="${area}" fill="rgba(17,94,89,0.18)" stroke="none"/><path d="${line}" fill="none" stroke="#115e59" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${chartTag('area', variantName)}`);
}

export function renderMystiqueSvgScatterChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const mapped = data.map((item, index) => ({
    x: toNumber(item.x, index),
    y: toNumber(item.y, toNumber(item.value, 0)),
    r: toNumber(item.value, defaultRadius)
  }));
  const x = createLinearScale([Math.min(...mapped.map((item) => item.x), 0), Math.max(...mapped.map((item) => item.x), 1)], [36, width - 24]);
  const y = createLinearScale([Math.min(...mapped.map((item) => item.y), 0), Math.max(...mapped.map((item) => item.y), 1)], [height - 36, 28]);
  const bounds = { left: 36, right: width - 24, top: 28, bottom: height - 36 };
  const points = mapped
    .map((item) => `<circle cx="${x.map(item.x)}" cy="${y.map(item.y)}" r="${Math.max(2, Math.sqrt(item.r))}" fill="#115e59" fill-opacity="0.85" />`)
    .join('');
  const overlay = renderScatterVariantOverlay({
    variantName: variantName ?? null,
    points: mapped.map((item) => ({ x: x.map(item.x), y: y.map(item.y) })),
    values: mapped,
    bounds
  });

  return wrapSvg(width, height, chartTitle(title), `${overlay}${points}${chartTag('scatter', variantName)}`);
}

export function renderMystiqueSvgBubbleChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const mapped = data.map((item, index) => ({
    x: toNumber(item.x, index),
    y: toNumber(item.y, toNumber(item.value, 0)),
    radius: Math.max(3, Math.sqrt(Math.max(toNumber(item.value, 10), 1)))
  }));
  const x = createLinearScale([Math.min(...mapped.map((item) => item.x), 0), Math.max(...mapped.map((item) => item.x), 1)], [36, width - 24]);
  const y = createLinearScale([Math.min(...mapped.map((item) => item.y), 0), Math.max(...mapped.map((item) => item.y), 1)], [height - 36, 28]);

  const points = mapped
    .map(
      (item, index) =>
        `<circle cx="${x.map(item.x)}" cy="${y.map(item.y)}" r="${Math.max(4, item.radius)}" fill="${basePalette[index % basePalette.length]}" fill-opacity="0.86" />`
    )
    .join('');
  const overlay = renderScatterVariantOverlay({
    variantName: variantName ?? null,
    points: mapped.map((item) => ({ x: x.map(item.x), y: y.map(item.y) })),
    values: mapped.map((item) => ({ x: item.x, y: item.y, r: item.radius })),
    bounds: { left: 36, right: width - 24, top: 28, bottom: height - 36 }
  });

  return wrapSvg(width, height, chartTitle(title), `${overlay}${points}${chartTag('point', variantName)}`);
}

export function renderMystiqueSvgHistogramChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  return renderMystiqueSvgBarChart(data, width, height, title, variantName);
}

export function renderMystiqueSvgWaterfallChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const labels = data.map((item, index) => resolveAxisLabel(item.label, `Step ${index + 1}`));
  const bars = data.map((item) => toNumber(item.value, 0));
  const x = createBandScale(labels, [36, width - 24]);
  const cumulative = bars.reduce(
    (state, value) => {
      state.running = (state.running + value);
      state.series.push(state.running);
      return state;
    },
    { running: 0, series: [] as number[] }
  ).series;
  const max = Math.max(...cumulative.map((value) => Math.abs(value)), 1);
  const y = createLinearScale([-max, max], [height - 36, 28]);

  const segments = bars
    .reduce(
      (state, value, index) => {
        const previous = state.running;
        const next = previous + value;
        const top = y.map(Math.max(previous, next));
        const nextHeight = Math.abs(y.map(next) - y.map(previous));
        const fill = value >= 0 ? basePalette[index % basePalette.length] : basePalette[(index + 3) % basePalette.length];
        const connector =
          index < bars.length - 1
            ? `<line x1="${x.map(labels[index] ?? String(index)) + x.bandwidth}" y1="${y.map(next)}" x2="${x.map(labels[index + 1] ?? String(index + 1))}" y2="${y.map(next)}" stroke="#64748b" stroke-dasharray="4 4" />`
            : '';
        state.running = next;
        state.segments.push(
          `<rect x="${x.map(labels[index] ?? String(index))}" y="${top}" width="${Math.max(x.bandwidth - 6, 6)}" height="${Math.max(nextHeight, 1)}" fill="${fill}" rx="4"/>${connector}`
        );
        return state;
      },
      { running: 0, segments: [] as string[] }
    )
    .segments.join('');

  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points: labels.map((label, index) => ({ x: x.map(label) + x.bandwidth / 2, y: y.map(cumulative[index] ?? 0) })),
    values: cumulative,
    labels,
    bounds: { left: 36, right: width - 24, top: 28, bottom: height - 36 },
    mapValue: (value) => y.map(value)
  });

  return wrapSvg(width, height, chartTitle(title), `${overlay}${segments}<line x1="36" y1="${y.map(0)}" x2="${width - 24}" y2="${y.map(0)}" stroke="#94a3b8"/>${chartTag('waterfall', variantName)}`);
}

export function renderMystiqueSvgPieChart(
  data: GenericDatum[],
  width = 340,
  height = 340,
  title?: string,
  donut = false,
  variantName?: string | null
): string {
  const total = data.reduce((sum, item) => sum + Math.abs(toNumber(item.value, 0)), 0) || 1;
  const radius = Math.min(width, height) / 2 - 16;
  const centerX = width / 2;
  const centerY = height / 2;
  const innerRadius = donut ? radius * 0.52 : 0;

  let angle = -Math.PI / 2;
  const slicesMeta: Array<{ label: string; value: number; start: number; end: number }> = [];
  const slices = data
    .map((item, index) => {
      const portion = Math.max(0, toNumber(item.value, 0)) / total;
      const span = portion * Math.PI * 2;
      const start = angle;
      const end = angle + span;
      angle = end;
      const x1 = centerX + Math.cos(start) * radius;
      const y1 = centerY + Math.sin(start) * radius;
      const x2 = centerX + Math.cos(end) * radius;
      const y2 = centerY + Math.sin(end) * radius;
      const large = span > Math.PI ? 1 : 0;
      const arc = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
      slicesMeta.push({
        label: resolveAxisLabel(item.label, `Slice ${index + 1}`),
        value: Math.max(0, toNumber(item.value, 0)),
        start,
        end
      });
      return `<path d="${arc}" fill="${basePalette[index % basePalette.length]}"/>`;
    })
    .join('');
  const overlay = renderPolarVariantOverlay({
    variantName: variantName ?? null,
    slices: slicesMeta,
    centerX,
    centerY,
    radius,
    innerRadius
  });

  const centerHole = donut
    ? `<circle cx="${centerX}" cy="${centerY}" r="${innerRadius}" fill="#ffffff" />`
    : '';
  const label = title ? `<text x="${centerX}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#334155">${escapeHtml(chartTitle(title))}</text>` : '';

  return wrapSvg(width, height, chartTitle(title), `${slices}${centerHole}${overlay}${label}${chartTag(donut ? 'donut' : 'pie', variantName)}`);
}

export function renderMystiqueSvgDonutChart(data: GenericDatum[], width = 340, height = 340, title?: string, variantName?: string | null): string {
  return renderMystiqueSvgPieChart(data, width, height, title, true, variantName);
}

export function renderMystiqueSvgFunnelChart(
  data: GenericDatum[],
  width = 360,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const values = data.map((item, index) => ({ label: resolveAxisLabel(item.label, `Stage ${index + 1}`), value: Math.max(toNumber(item.value, 1), 0.0001) }));
  const total = Math.max(...values.map((item) => item.value), 1);
  const segmentHeight = height / Math.max(values.length, 1);
  const shapes = values
    .map((item, index) => {
      const topY = 20 + index * segmentHeight;
      const bottomY = topY + segmentHeight - 6;
      const topWidth = ((total - 0.05) && item.value / total) * (width - 64);
      const bottomWidth = Math.max(topWidth - 24, 36);
      const xTop = (width - topWidth) / 2;
      const xBottom = (width - bottomWidth) / 2;
      const points = `${xTop},${topY} ${xTop + topWidth},${topY} ${xBottom + bottomWidth},${bottomY} ${xBottom},${bottomY}`;
      return `<polygon points="${points}" fill="${basePalette[index % basePalette.length]}"/><text x="${width / 2}" y="${topY + segmentHeight / 2}" text-anchor="middle" fill="#ffffff" font-size="11">${escapeHtml(item.label)}</text>`;
    })
    .join('');

  const overlay = renderFunnelVariantOverlay({
    variantName: variantName ?? null,
    values,
    width,
    height
  });

  return wrapSvg(width, height, chartTitle(title), `${shapes}${overlay}${chartTag('funnel', variantName)}`);
}

export function renderMystiqueSvgRadarChart(
  data: GenericDatum[],
  width = 360,
  height = 360,
  title?: string,
  variantName?: string | null
): string {
  const points = data.map((item) => toNumber(item.value, 0));
  const max = Math.max(...points, 1);
  const count = Math.max(points.length, 3);
  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;

  const coords = points.map((value, index) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const scaled = (value / max) * radius;
    return `${(centerX + Math.cos(angle) * scaled).toFixed(2)},${(centerY + Math.sin(angle) * scaled).toFixed(2)}`;
  });

  const polygon = `<polygon points="${coords.join(' ')}" fill="rgba(17,94,89,0.18)" stroke="#115e59" stroke-width="2" />`;
  const overlay = renderRadarVariantOverlay({
    variantName: variantName ?? null,
    values: points,
    coords: points.map((value, index) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const scaled = (value / max) * radius;
      return {
        x: centerX + Math.cos(angle) * scaled,
        y: centerY + Math.sin(angle) * scaled
      };
    }),
    centerX,
    centerY,
    radius
  });
  const labels = points
    .map((_, index) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius + 14);
      const y = centerY + Math.sin(angle) * (radius + 14);
      const label = resolveAxisLabel(data[index]?.label, `Axis ${index + 1}`);
      return `<text x="${x}" y="${y}" text-anchor="middle" font-size="10" fill="#334155">${escapeHtml(label)}</text>`;
    })
    .join('');

  return wrapSvg(width, height, chartTitle(title), `${overlay}${polygon}${labels}${chartTag('radar', variantName)}`);
}

export function renderMystiqueSvgCandlestickChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const x = createBandScale(data.map((item, index) => resolveAxisLabel(item.label, `Day ${index + 1}`)), [36, width - 24]);
  const values = data.flatMap((item) => {
    const open = toNumber(item.open, toNumber(item.value, 0));
    const high = toNumber(item.high, open);
    const low = toNumber(item.low, open);
    const close = toNumber(item.close, open);
    return [open, high, low, close];
  });
  const y = createLinearScale([Math.min(...values, 0), Math.max(...values, 1)], [height - 36, 28]);
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points: data.map((item, index) => ({
      x: x.map(resolveAxisLabel(item.label, `Day ${index + 1}`)) + x.bandwidth / 2,
      y: y.map(toNumber(item.close, toNumber(item.value, 0)))
    })),
    values: data.map((item) => toNumber(item.close, toNumber(item.value, 0))),
    labels: data.map((item, index) => resolveAxisLabel(item.label, `Day ${index + 1}`)),
    bounds: { left: 36, right: width - 24, top: 28, bottom: height - 36 },
    mapValue: (value) => y.map(value)
  });

  const body = data
    .map((item, index) => {
      const open = toNumber(item.open, toNumber(item.value, 0));
      const high = toNumber(item.high, open);
      const low = toNumber(item.low, open);
      const close = toNumber(item.close, open);
      const center = x.map(resolveAxisLabel(item.label, `Day ${index + 1}`)) + x.bandwidth / 2;
      const top = y.map(Math.max(open, close));
      const bottom = y.map(Math.min(open, close));
      const fill = close >= open ? basePalette[2] : basePalette[4];
      const wick = `<line x1="${center}" y1="${y.map(high)}" x2="${center}" y2="${y.map(low)}" stroke="${fill}" stroke-width="2" />`;
      return `${wick}<rect x="${center - x.bandwidth / 4}" y="${top}" width="${x.bandwidth / 2}" height="${Math.max(bottom - top, 1)}" fill="${fill}" rx="3"/>`;
    })
    .join('');

  return wrapSvg(width, height, chartTitle(title), `${overlay}${body}${chartTag('candlestick', variantName)}`);
}

export function renderMystiqueSvgComboChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const mapped = data.map((item, index) => ({ label: resolveAxisLabel(item.label, `Step ${index + 1}`), x: index, bar: toNumber(item.bar, toNumber(item.value, 0)), line: toNumber(item.line, 0) }));
  const x = createBandScale(mapped.map((item) => item.label), [36, width - 24]);
  const y = createLinearScale([0, Math.max(...mapped.flatMap((item) => [item.bar, item.line]), 1)], [height - 36, 28]);
  const line = linePath(mapped.map((item) => ({ x: x.map(item.label) + x.bandwidth / 2, y: y.map(item.line) })));
  const points = mapped.map((item) => ({ x: x.map(item.label) + x.bandwidth / 2, y: y.map(item.line) }));
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points,
    values: mapped.map((item) => item.line),
    labels: mapped.map((item) => item.label),
    bounds: { left: 36, right: width - 24, top: 28, bottom: height - 36 },
    mapValue: (value) => y.map(value)
  });

  const linePathMarkup = `<path d="${line}" fill="none" stroke="#b91c1c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${mapped
    .map((item) => `<circle cx="${x.map(item.label) + x.bandwidth / 2}" cy="${y.map(item.line)}" r="4" fill="#b91c1c" />`)
    .join('')}`;
  const barMarkup = mapped
    .map((item) => `<rect x="${x.map(item.label)}" y="${y.map(item.bar)}" width="${Math.max(x.bandwidth - 6, 6)}" height="${Math.max(height - 36 - y.map(item.bar), 1)}" fill="${basePalette[0]}" fill-opacity="0.22" stroke="${basePalette[0]}" rx="5"/>`)
    .join('');
  const labels = mapped
    .map(
      (item) =>
        `<text x="${x.map(item.label) + x.bandwidth / 2}" y="${height - 12}" text-anchor="middle" font-size="11" fill="#334155">${escapeHtml(item.label)}</text>`
    )
    .join('');

  return wrapSvg(width, height, chartTitle(title), `${overlay}${barMarkup}${linePathMarkup}${labels}${chartTag('combo', variantName)}`);
}

export function renderMystiqueSvgBoxPlotChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const names = data.map((item, index) => resolveAxisLabel(item.label, `Category ${index + 1}`));
  const groups = data.map((item) => coerceNumberList(item.values, [toNumber(item.value, 0)]));
  const allValues = groups.flatMap((group) => group);
  const x = createBandScale(names, [36, width - 24]);
  const y = createLinearScale([Math.min(...allValues, 0), Math.max(...allValues, 1)], [height - 36, 28]);
  const boxHeight = Math.max(22, x.bandwidth - 8);
  const medians = groups.map((group) => boxStats(group.length ? group : [0]).q2);
  const overlay = renderCartesianVariantOverlay({
    variantName: variantName ?? null,
    points: names.map((name, index) => ({ x: x.map(name) + x.bandwidth / 2, y: y.map(medians[index] ?? 0) })),
    values: medians,
    labels: names,
    bounds: { left: 36, right: width - 24, top: 28, bottom: height - 36 },
    mapValue: (value) => y.map(value)
  });

  const body = groups
    .map((group, index) => {
      const stats = boxStats(group.length ? group : [0]);
      const left = x.map(names[index] ?? String(index));
      const center = left + x.bandwidth / 2;
      const q1Y = y.map(stats.q1);
      const q3Y = y.map(stats.q3);
      const medianY = y.map(stats.q2);
      const minY = y.map(stats.min);
      const maxY = y.map(stats.max);

      const box = `<rect x="${left + 2}" y="${q3Y}" width="${Math.max(x.bandwidth - 4, 6)}" height="${Math.max(q1Y - q3Y, 1)}" fill="rgba(17,94,89,0.12)" stroke="#115e59" rx="4"/>`;
      const whisker = `<line x1="${center}" y1="${minY}" x2="${center}" y2="${maxY}" stroke="#334155" stroke-width="2"/><line x1="${center - 10}" y1="${minY}" x2="${center + 10}" y2="${minY}" stroke="#334155"/><line x1="${center - 10}" y1="${maxY}" x2="${center + 10}" y2="${maxY}" stroke="#334155"/><line x1="${center - 8}" y1="${medianY}" x2="${center + 8}" y2="${medianY}" stroke="#0f766e"/>`;

      return `${box}${whisker}`;
    })
    .join('');

  return wrapSvg(width, height, chartTitle(title), `${overlay}${body}${chartTag('box-plot', variantName)}`);
}

export function renderMystiqueSvgHeatmapChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const cells = data.map((item) => ({ x: toNumber(item.x, 0), y: toNumber(item.y, 0), value: toNumber(item.value, 0) }));
  const columns = Math.max(...cells.map((cell) => cell.x), 0) + 1;
  const rows = Math.max(...cells.map((cell) => cell.y), 0) + 1;
  const cellWidth = (width - 48) / Math.max(columns, 1);
  const cellHeight = (height - 48) / Math.max(rows, 1);
  const maxValue = Math.max(...cells.map((cell) => cell.value), 1);

  const body = cells
    .map((cell, index) => {
      const ratio = Math.max(Math.min(cell.value / maxValue, 1), 0);
      const color = `rgba(17, 94, 89, ${0.15 + ratio * 0.85})`;
      return `<rect x="${36 + cell.x * cellWidth}" y="${28 + cell.y * cellHeight}" width="${Math.max(cellWidth - 2, 2)}" height="${Math.max(cellHeight - 2, 2)}" fill="${color}" />`;
    })
    .join('');

  const overlay = renderHeatmapVariantOverlay({
    variantName: variantName ?? null,
    cells,
    width,
    height,
    columns,
    rows,
    cellWidth,
    cellHeight
  });

  return wrapSvg(width, height, chartTitle(title), `${body}${overlay}${chartTag('heatmap', variantName)}`);
}

export function renderMystiqueSvgTreemapChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  variantName?: string | null
): string {
  const items = data.map((item, index) => ({
    label: resolveAxisLabel(item.label, `Node ${index + 1}`),
    value: Math.max(toNumber(item.value, 0), 0.01)
  }));
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  let currentX = 0;
  const layoutItems: Array<{ label: string; value: number; left: number; width: number }> = [];

  const body = items
    .map((item, index) => {
      const rectWidth = (item.value / total) * (width - 48);
      const left = currentX + 24;
      const safeWidth = Math.max(rectWidth - 6, 1);
      const rect = `<rect x="${currentX + 24}" y="24" width="${Math.max(rectWidth - 6, 1)}" height="${height - 48}" fill="${basePalette[index % basePalette.length]}" />`;
      const label = `<text x="${currentX + 24 + rectWidth / 2}" y="${height / 2}" text-anchor="middle" fill="#ffffff" font-size="12">${escapeHtml(item.label)}</text>`;
      layoutItems.push({ label: item.label, value: item.value, left, width: safeWidth });
      currentX += rectWidth;
      return `${rect}${label}`;
    })
    .join('');
  const overlay = renderTreemapVariantOverlay({
    variantName: variantName ?? null,
    items: layoutItems,
    width,
    height
  });

  return wrapSvg(width, height, chartTitle(title), `${body}${overlay}${chartTag('treemap', variantName)}`);
}

export function renderMystiqueSvgNetworkChart(
  data: GenericDatum[],
  width = 640,
  height = 320,
  title?: string,
  isSankey = false,
  variantName?: string | null
): string {
  const edges = data
    .map((item, index) => ({
      source: resolveAxisLabel(item.source, `N${index}S`),
      target: resolveAxisLabel(item.target, `N${index}T`),
      value: Math.max(1, toNumber(item.value, 1))
    }))
    .filter((edge) => edge.source && edge.target);

  const nodeSet = new Set<string>();
  edges.forEach((edge) => {
    nodeSet.add(edge.source);
    nodeSet.add(edge.target);
  });
  if (!nodeSet.size) {
    return wrapSvg(width, height, chartTitle(title), `<text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="#64748b">No graph data</text>`);
  }

  const nodes = [...nodeSet];
  const positions = isSankey ? layoutSankeyNodes(nodes, edges, width, height).positions : layoutGridNodes(nodes, width, height);
  const nodeWeights = new Map<string, number>();
  edges.forEach((edge) => {
    nodeWeights.set(edge.source, (nodeWeights.get(edge.source) ?? 0) + edge.value);
    nodeWeights.set(edge.target, (nodeWeights.get(edge.target) ?? 0) + edge.value);
  });
  const maxWeight = Math.max(...nodeWeights.values(), 1);
  const criticalEdges = [...edges]
    .sort((left, right) => right.value - left.value)
    .slice(0, Math.min(2, edges.length));
  const sinkNodes = nodes.filter((node) => !edges.some((edge) => edge.source === node));
  const sourceNodes = nodes.filter((node) => !edges.some((edge) => edge.target === node));
  const variantEmphasisesCriticalPath = ['dependency-critical-path', 'control-room', 'narrative-sequence', 'goal-tracking'].includes(variantName ?? '');

  const ribbonPathForLink = (source: { x: number; y: number }, target: { x: number; y: number }, startWidth: number, endWidth: number): string => {
    const deltaX = target.x - source.x;
    const deltaY = target.y - source.y;
    const length = Math.hypot(deltaX, deltaY) || 1;
    const normalX = -deltaY / length;
    const normalY = deltaX / length;
    const sourceTop = { x: source.x + normalX * startWidth, y: source.y + normalY * startWidth };
    const sourceBottom = { x: source.x - normalX * startWidth, y: source.y - normalY * startWidth };
    const targetTop = { x: target.x + normalX * endWidth, y: target.y + normalY * endWidth };
    const targetBottom = { x: target.x - normalX * endWidth, y: target.y - normalY * endWidth };
    return `M ${sourceTop.x.toFixed(2)} ${sourceTop.y.toFixed(2)} L ${targetTop.x.toFixed(2)} ${targetTop.y.toFixed(2)} L ${targetBottom.x.toFixed(2)} ${targetBottom.y.toFixed(2)} L ${sourceBottom.x.toFixed(2)} ${sourceBottom.y.toFixed(2)} Z`;
  };

  const links = edges
    .map((edge) => {
      const source = positions.get(edge.source);
      const target = positions.get(edge.target);
      if (!source || !target) {
        return '';
      }
      const widthStroke = Math.max(1.5, Math.sqrt(edge.value));
      const thickness = isSankey ? Math.max(2, Math.min(12, widthStroke + 0.8)) : Math.max(1.5, Math.min(6, widthStroke));
      const sourceX = isSankey ? source.x + 34 : source.x;
      const targetX = isSankey ? target.x - 34 : target.x;
      const isCritical = criticalEdges.some((item) => item.source === edge.source && item.target === edge.target && item.value === edge.value);
      if (variantName === 'tapered-flow') {
        const endWidth = isSankey ? Math.max(thickness * 0.3, 1.5) : Math.max(thickness * 0.45, 1.2);
        return `<path d="${ribbonPathForLink({ x: sourceX, y: source.y }, { x: targetX, y: target.y }, thickness * 0.75, endWidth)}" fill="${isCritical ? 'rgba(217,119,6,0.38)' : 'rgba(17,94,89,0.28)'}" stroke="${isCritical ? '#d97706' : 'rgba(17,94,89,0.4)'}" stroke-width="0.8" />`;
      }
      const stroke =
        isCritical && variantEmphasisesCriticalPath
          ? 'rgba(217,119,6,0.72)'
          : variantName === 'ranking-shift'
            ? 'rgba(37,99,235,0.42)'
            : 'rgba(17,94,89,0.4)';
      const strokeWidth = isCritical && variantEmphasisesCriticalPath ? thickness + 1.6 : thickness;
      const narrativeBadge =
        variantName === 'narrative-sequence' && isCritical
          ? `<circle cx="${(sourceX + targetX) / 2}" cy="${(source.y + target.y) / 2 - 10}" r="8" fill="rgba(15,23,42,0.84)" /><text x="${(sourceX + targetX) / 2}" y="${(source.y + target.y) / 2 - 7}" text-anchor="middle" font-size="7" fill="#f8fafc">!</text>`
          : '';
      return `<line x1="${sourceX}" y1="${source.y}" x2="${targetX}" y2="${target.y}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" />${narrativeBadge}`;
    })
    .join('');

  const nodesMarkup = nodes
    .map((node) => {
      const position = positions.get(node);
      if (!position) {
        return '';
      }
      const intensity = (nodeWeights.get(node) ?? 0) / maxWeight;
      const nodeTone =
        variantName === 'topology-health' || variantName === 'control-room' || variantName === 'goal-tracking'
          ? intensity > 0.72
            ? '#dc2626'
            : intensity > 0.4
              ? '#f59e0b'
              : '#0f766e'
          : '#115e59';
      if (isSankey) {
        const badge = variantName === 'control-room' || variantName === 'goal-tracking' || variantName === 'topology-health' ? `<circle cx="${position.x + 26}" cy="${position.y - 8}" r="4" fill="${nodeTone}" stroke="#f8fafc" stroke-width="1" />` : '';
        const drill = variantName === 'drilldown-workbench' ? `<circle cx="${position.x - 26}" cy="${position.y - 8}" r="6" fill="rgba(15,23,42,0.78)" stroke="#e2e8f0" /><text x="${position.x - 26}" y="${position.y - 5}" text-anchor="middle" font-size="7" fill="#f8fafc">+</text>` : '';
        const sequence = variantName === 'narrative-sequence' ? `<circle cx="${position.x}" cy="${position.y - 18}" r="8" fill="rgba(15,23,42,0.84)" /><text x="${position.x}" y="${position.y - 15}" text-anchor="middle" font-size="7" fill="#f8fafc">${Math.max(nodes.indexOf(node) + 1, 1)}</text>` : '';
        const queue = variantName === 'realtime-queue' && sinkNodes.includes(node) ? `<rect x="${position.x - 38}" y="${position.y - 18}" width="76" height="36" rx="10" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.28)" />` : '';
        const cohort = variantName === 'cohort-breakdown' ? `<text x="${position.x}" y="${position.y + 24}" text-anchor="middle" font-size="8" fill="#475569">${sourceNodes.includes(node) ? 'Source cohort' : sinkNodes.includes(node) ? 'Sink cohort' : 'Bridge cohort'}</text>` : '';
        const ranking = variantName === 'ranking-shift' ? `<circle cx="${position.x}" cy="${position.y - 18}" r="8" fill="rgba(15,23,42,0.84)" /><text x="${position.x}" y="${position.y - 15}" text-anchor="middle" font-size="7" fill="#f8fafc">#${Math.max(nodes.indexOf(node) + 1, 1)}</text>` : '';
        return `${queue}<rect x="${position.x - 34}" y="${position.y - 14}" width="68" height="28" rx="8" fill="${nodeTone}" />${badge}${drill}${sequence}${ranking}<text x="${position.x}" y="${position.y + 4}" text-anchor="middle" fill="#f8fafc" font-size="9">${escapeHtml(node)}</text>${cohort}`;
      }
      const halo =
        variantName === 'topology-health' || variantName === 'control-room' || variantName === 'realtime-queue'
          ? `<circle cx="${position.x}" cy="${position.y}" r="19" fill="none" stroke="${nodeTone}" stroke-opacity="0.3" stroke-width="5" />`
          : '';
      const drill =
        variantName === 'drilldown-workbench'
          ? `<circle cx="${position.x + 10}" cy="${position.y - 10}" r="6" fill="rgba(15,23,42,0.78)" stroke="#e2e8f0" /><text x="${position.x + 10}" y="${position.y - 7}" text-anchor="middle" font-size="7" fill="#f8fafc">+</text>`
          : '';
      const goal =
        variantName === 'goal-tracking' && sinkNodes.includes(node)
          ? `<rect x="${position.x - 20}" y="${position.y + 18}" width="40" height="14" rx="7" fill="rgba(255,255,255,0.92)" stroke="rgba(15,23,42,0.08)" /><text x="${position.x}" y="${position.y + 28}" text-anchor="middle" font-size="8" fill="#0f172a">Target</text>`
          : '';
      const sequence =
        variantName === 'narrative-sequence'
          ? `<circle cx="${position.x - 12}" cy="${position.y - 14}" r="8" fill="rgba(15,23,42,0.84)" /><text x="${position.x - 12}" y="${position.y - 11}" text-anchor="middle" font-size="7" fill="#f8fafc">${Math.max(nodes.indexOf(node) + 1, 1)}</text>`
          : '';
      const cohort =
        variantName === 'cohort-breakdown'
          ? `<text x="${position.x}" y="${position.y + 26}" text-anchor="middle" font-size="8" fill="#475569">${sourceNodes.includes(node) ? 'Source cohort' : sinkNodes.includes(node) ? 'Sink cohort' : 'Bridge cohort'}</text>`
          : '';
      const ranking =
        variantName === 'ranking-shift'
          ? `<circle cx="${position.x + 12}" cy="${position.y - 14}" r="8" fill="rgba(15,23,42,0.84)" /><text x="${position.x + 12}" y="${position.y - 11}" text-anchor="middle" font-size="7" fill="#f8fafc">#${Math.max(nodes.indexOf(node) + 1, 1)}</text>`
          : '';
      const queue =
        variantName === 'realtime-queue' && sinkNodes.includes(node)
          ? `<rect x="${position.x - 20}" y="${position.y - 20}" width="40" height="40" rx="20" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.28)" />`
          : '';
      return `${queue}${halo}<circle cx="${position.x}" cy="${position.y}" r="14" fill="${nodeTone}" /><text x="${position.x}" y="${position.y + 4}" text-anchor="middle" fill="#f8fafc" font-size="9">${escapeHtml(node)}</text>${drill}${goal}${sequence}${ranking}${cohort}`;
    })
    .join('');
  const comparisonGrid =
    variantName === 'comparison-grid' && !isSankey
      ? `<g data-variant-layer="comparison-grid">${[0.25, 0.5, 0.75]
          .map((ratio) => `<line x1="${width * ratio}" y1="28" x2="${width * ratio}" y2="${height - 20}" stroke="rgba(15,23,42,0.14)" stroke-dasharray="4 4" />`)
          .join('')}</g>`
      : '';
  const variantPanel =
    variantName === 'control-room'
      ? `<g data-variant-layer="control-room"><rect x="${width - 144}" y="18" width="128" height="44" rx="10" fill="rgba(15,23,42,0.9)" /><text x="${width - 80}" y="34" text-anchor="middle" font-size="10" fill="#e2e8f0">Topology watch</text><text x="${width - 80}" y="50" text-anchor="middle" font-size="9" fill="#67e8f9">Critical path surfaced</text></g>`
      : variantName === 'realtime-queue'
        ? `<g data-variant-layer="realtime-queue"><rect x="${width - 144}" y="18" width="128" height="44" rx="10" fill="rgba(14,165,233,0.12)" stroke="rgba(14,165,233,0.28)" /><text x="${width - 80}" y="34" text-anchor="middle" font-size="10" fill="#0f172a">Queue watch</text><text x="${width - 80}" y="50" text-anchor="middle" font-size="9" fill="#0369a1">Newest sinks highlighted</text></g>`
        : variantName === 'dependency-critical-path'
          ? `<g data-variant-layer="dependency-critical-path"><rect x="${width - 164}" y="18" width="148" height="24" rx="12" fill="rgba(15,23,42,0.88)" /><text x="${width - 90}" y="34" text-anchor="middle" font-size="9" fill="#f8fafc">Critical path emphasised</text></g>`
          : variantName === 'cohort-breakdown'
            ? `<g data-variant-layer="cohort-breakdown"><rect x="${width - 170}" y="18" width="154" height="24" rx="12" fill="rgba(15,23,42,0.88)" /><text x="${width - 93}" y="34" text-anchor="middle" font-size="9" fill="#f8fafc">Source, bridge, sink cohorts</text></g>`
            : variantName === 'ranking-shift'
              ? `<g data-variant-layer="ranking-shift"><rect x="${width - 152}" y="18" width="136" height="24" rx="12" fill="rgba(15,23,42,0.88)" /><text x="${width - 84}" y="34" text-anchor="middle" font-size="9" fill="#f8fafc">Node priority ranked</text></g>`
              : variantName
                ? `<g data-variant-layer="${variantName}"><rect x="${width - 170}" y="18" width="154" height="24" rx="12" fill="rgba(15,23,42,0.88)" /><text x="${width - 93}" y="34" text-anchor="middle" font-size="9" fill="#f8fafc">${escapeHtml(labelFromVariant(variantName))}</text></g>`
                : '';

  return wrapSvg(width, height, chartTitle(title), `${comparisonGrid}${links}${nodesMarkup}${variantPanel}${chartTag(isSankey ? 'sankey' : 'network', variantName)}`);
}

export function renderMystiqueSvgChart(config: {
  type: ChartType;
  data: GenericDatum[];
  options?: ChartOptions;
  definition?: ChartDefinition;
}): string {
  const definition = config.definition ?? createChartDefinition(config.type, config.options);
  const width = config.options?.width ?? config.definition?.options.width ?? 640;
  const height = config.options?.height ?? config.definition?.options.height ?? 320;
  const title = config.options?.title ?? config.definition?.title;
  const chartType = resolveChartType(config.type);
  const variantName = getChartVariantName(config.type);
  let markup = '';

  if (chartType === 'heatmap') {
    markup = renderMystiqueSvgHeatmapChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'treemap') {
    markup = renderMystiqueSvgTreemapChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'bar') {
    markup = renderMystiqueSvgBarChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'grouped-bar') {
    markup = renderMystiqueSvgGroupedBarChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'stacked-bar') {
    markup = renderMystiqueSvgStackedBarChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'line') {
    markup = renderMystiqueSvgLineChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'area') {
    markup = renderMystiqueSvgAreaChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'scatter') {
    markup = renderMystiqueSvgScatterChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'bubble') {
    markup = renderMystiqueSvgBubbleChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'histogram') {
    markup = renderMystiqueSvgHistogramChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'waterfall') {
    markup = renderMystiqueSvgWaterfallChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'pie') {
    markup = renderMystiqueSvgPieChart(config.data, 320, 320, title, false, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'donut') {
    markup = renderMystiqueSvgDonutChart(config.data, 320, 320, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'radar') {
    markup = renderMystiqueSvgRadarChart(config.data, 360, 360, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'candlestick') {
    markup = renderMystiqueSvgCandlestickChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'combo') {
    markup = renderMystiqueSvgComboChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'box-plot') {
    markup = renderMystiqueSvgBoxPlotChart(config.data, width, height, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'network') {
    markup = renderMystiqueSvgNetworkChart(config.data, width, height, title, false, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'sankey') {
    markup = renderMystiqueSvgNetworkChart(config.data, width, height, title, true, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }
  if (chartType === 'funnel') {
    markup = renderMystiqueSvgFunnelChart(config.data, 360, 320, title, variantName);
    return decorateSvgOutput(markup, definition, chartType);
  }

  markup = renderMystiqueSvgLineChart(config.data, width, height, title, variantName);
  return decorateSvgOutput(markup, definition, chartType);
}

export { chartTag };

function resolveSvgAnimation(preset: ChartDefinition['options']['motion']['preset']): string {
  switch (preset) {
    case 'fade-scale':
      return 'mystique-fade-scale';
    case 'rise':
      return 'mystique-rise';
    case 'sweep':
      return 'mystique-sweep';
    case 'pulse':
      return 'mystique-pulse';
    case 'draw':
    default:
      return 'mystique-draw';
  }
}

function decorateSvgOutput(markup: string, definition: ChartDefinition, chartType: string): string {
  const motion = {
    enabled: definition.options.motion?.enabled ?? false,
    preset: definition.options.motion?.preset ?? 'draw',
    durationMs: definition.options.motion?.durationMs ?? 0,
    easing: definition.options.motion?.easing ?? 'linear',
    staggerMs: definition.options.motion?.staggerMs ?? 0
  };
  const scales = definition.scales ?? {};
  const animationName = resolveSvgAnimation(motion.preset);
  const scaleAttrs = [
    ['data-scale-x', scales.x?.type],
    ['data-scale-y', scales.y?.type],
    ['data-scale-y-secondary', scales.ySecondary?.type],
    ['data-scale-radius', scales.radius?.type],
    ['data-scale-color', scales.color?.type],
    ['data-scale-size', scales.size?.type],
    ['data-scale-angle', scales.angle?.type],
    ['data-scale-node', scales.node?.type]
  ]
    .map(([name, value]) => `${name}="${value ?? 'none'}"`)
    .join(' ');
  const rootAttrs = `${scaleAttrs} data-chart-family="${escapeHtml(chartType)}" data-motion-enabled="${motion.enabled ? 'true' : 'false'}" data-motion-preset="${escapeHtml(motion.preset)}" data-motion-duration="${motion.durationMs}" data-motion-easing="${escapeHtml(motion.easing)}" data-motion-stagger="${motion.staggerMs}"`;
  const rootStyle = motion.enabled
    ? ` style="transform-origin:center center;transform-box:fill-box;--mystique-duration:${motion.durationMs}ms;--mystique-easing:${escapeHtml(motion.easing)};--mystique-stagger:${motion.staggerMs}ms;animation:${animationName} ${motion.durationMs}ms ${escapeHtml(motion.easing)} both;"`
    : '';
  const motionStyle = `<style>
    @keyframes mystique-fade-scale { from { opacity: 0; transform: translateY(10px) scale(0.985); filter: saturate(0.94); } to { opacity: 1; transform: translateY(0) scale(1); filter: saturate(1); } }
    @keyframes mystique-draw { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes mystique-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes mystique-sweep { from { opacity: 0; transform: scale(0.94) rotate(-4deg); } to { opacity: 1; transform: scale(1) rotate(0deg); } }
    @keyframes mystique-pulse { 0% { opacity: 0; transform: scale(0.96); } 60% { opacity: 1; transform: scale(1.02); } 100% { opacity: 1; transform: scale(1); } }
    @keyframes mystique-layer-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    svg[data-motion-enabled="true"] [data-variant-layer],
    svg[data-motion-enabled="true"] [data-variant-fragment],
    svg[data-motion-enabled="true"] [data-chart-type] {
      animation: mystique-layer-fade calc(var(--mystique-duration, 280ms) * 0.82) var(--mystique-easing, cubic-bezier(0.22, 1, 0.36, 1)) both;
      animation-delay: var(--mystique-stagger, 20ms);
      transform-origin: center center;
      transform-box: fill-box;
    }
    @media (prefers-reduced-motion: reduce) {
      svg[data-motion-enabled="true"],
      svg[data-motion-enabled="true"] [data-variant-layer],
      svg[data-motion-enabled="true"] [data-variant-fragment],
      svg[data-motion-enabled="true"] [data-chart-type] {
        animation: none !important;
        transform: none !important;
        filter: none !important;
      }
    }
  </style>`;

  return markup
    .replace('<svg ', `<svg ${rootAttrs}${rootStyle} `)
    .replace('>', `>${motionStyle}`);
}
