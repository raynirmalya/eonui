import { MYSTIQUE_CHART_CATALOG_SIZE, getMystiqueChartManifest, mystiqueChartManifest } from './manifest/registry';
import type { ChartCapability, ScaleType, ScaleBinding, SourceChartManifestEntry, DataFieldSchema, SeriesSpec } from './manifest/types';

export type { ScaleType, ScaleBinding, SourceChartManifestEntry, DataFieldSchema, SeriesSpec } from './manifest/types';
export { getMystiqueChartManifest, MYSTIQUE_CHART_CATALOG_SIZE, mystiqueChartManifest } from './manifest/registry';

export type DatumScalar = string | number | boolean | Date | null;
export type DatumValue = DatumScalar | DatumScalar[];
export type Datum = Record<string, DatumValue>;

export type ScaleDirection = 'forward' | 'reverse';

export type ChartRenderer = 'svg' | 'canvas' | 'hybrid';

export type ChartType = string;

export type ChartAxis = {
  id: string;
  field: string;
  scaleType: ScaleType;
  position: 'left' | 'right' | 'top' | 'bottom';
};

export type ChartSeriesConfig = {
  key: string;
  type: string;
  label?: string;
  color?: string;
};

export type ChartTheme = {
  axis: string;
  grid: string;
  focus: string;
  palette: string[];
};

export type ChartDimensions = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type ChartAnimationPreset = 'fade-scale' | 'draw' | 'rise' | 'sweep' | 'pulse';

export type ChartMotionConfig = {
  enabled: boolean;
  preset: ChartAnimationPreset;
  durationMs: number;
  easing: string;
  staggerMs: number;
};

export type ChartScales = {
  x?: ScaleBinding;
  y?: ScaleBinding;
  ySecondary?: ScaleBinding;
  radius?: ScaleBinding;
  color?: ScaleBinding;
  size?: ScaleBinding;
  angle?: ScaleBinding;
  node?: ScaleBinding;
};

export type ChartOptions = {
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
  renderer?: ChartRenderer;
  showLegend?: boolean;
  showAxes?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  capabilities?: ChartCapability[];
  axis?: ChartAxis[];
  theme?: Partial<ChartTheme>;
  dimensions?: Partial<ChartDimensions>;
  motion?: Partial<ChartMotionConfig>;
};

export type ChartDefinition<TDatum extends Datum = Datum> = {
  type: ChartType;
  title?: string;
  options: Required<ChartOptions>;
  dataShape: DataFieldSchema[];
  series: SeriesSpec[];
  capabilities: ChartCapability[];
  scales: ChartScales;
};

export type ChartInteractionAnchor = {
  id: string;
  index: number;
  x: number;
  y: number;
  label: string;
  summary: string;
};

export type ChartInteractionModel = {
  anchors: ChartInteractionAnchor[];
};

const fullyImplementedVariantMap: Record<string, string[]> = {
  area: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'baseline'],
  bar: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'compact'],
  'box-plot': ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'large-data'],
  bubble: ['anomaly-window', 'multi-resolution', 'outlier-lens', 'distribution-focus', 'control-room', 'comparison-grid', 'narrative-sequence', 'goal-tracking', 'quantile-layers', 'realtime-queue', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'animated', 'forecast-band', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'scenario-planner', 'small-multiples', 'event-overlay', 'seasonal-decomposition'],
  candlestick: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'stacked'],
  combo: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'normalized'],
  donut: ['comparison-grid', 'narrative-sequence', 'outlier-lens', 'goal-tracking', 'control-room', 'segment', 'threshold-alert', 'drilldown-workbench', 'tapered-flow', 'topology-health', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'distribution-focus', 'multi-resolution', 'realtime-queue', 'seasonal-decomposition'],
  funnel: ['goal-tracking', 'tapered-flow', 'narrative-sequence', 'control-room', 'comparison-grid', 'threshold-alert', 'scenario-planner', 'drilldown-workbench', 'realtime-queue', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'streaming', 'forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'small-multiples', 'event-overlay', 'quantile-layers', 'distribution-focus', 'multi-resolution', 'outlier-lens', 'seasonal-decomposition'],
  'grouped-bar': ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'hierarchical'],
  heatmap: ['multi-resolution', 'comparison-grid', 'anomaly-window', 'control-room', 'threshold-alert', 'goal-tracking', 'narrative-sequence', 'drilldown-workbench', 'realtime-queue', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'tapered-flow', 'dense', 'forecast-band', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'distribution-focus', 'outlier-lens', 'seasonal-decomposition'],
  histogram: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'compact-grid'],
  line: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'sparkline'],
  network: ['topology-health', 'dependency-critical-path', 'drilldown-workbench', 'control-room', 'narrative-sequence', 'goal-tracking', 'tapered-flow', 'realtime-queue', 'comparison-grid', 'cohort-breakdown', 'ranking-shift'],
  pie: ['comparison-grid', 'narrative-sequence', 'outlier-lens', 'goal-tracking', 'control-room', 'segment', 'threshold-alert', 'drilldown-workbench', 'tapered-flow', 'topology-health', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'distribution-focus', 'multi-resolution', 'realtime-queue', 'seasonal-decomposition'],
  radar: ['comparison-grid', 'quantile-layers', 'outlier-lens', 'control-room', 'narrative-sequence', 'threshold-alert', 'multi-resolution', 'drilldown-workbench', 'topology-health', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'tapered-flow', 'timeline', 'forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'scenario-planner', 'small-multiples', 'event-overlay', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'goal-tracking'],
  scatter: ['anomaly-window', 'multi-resolution', 'outlier-lens', 'distribution-focus', 'control-room', 'comparison-grid', 'narrative-sequence', 'goal-tracking', 'quantile-layers', 'realtime-queue', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'faded', 'forecast-band', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'scenario-planner', 'small-multiples', 'event-overlay', 'seasonal-decomposition'],
  sankey: ['tapered-flow', 'dependency-critical-path', 'control-room', 'topology-health', 'drilldown-workbench', 'narrative-sequence', 'goal-tracking', 'realtime-queue', 'cohort-breakdown', 'ranking-shift'],
  'stacked-bar': ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'step'],
  treemap: ['drilldown-workbench', 'comparison-grid', 'anomaly-window', 'control-room', 'goal-tracking', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'tapered-flow', 'area', 'forecast-band', 'rolling-window', 'small-multiples', 'multi-resolution', 'realtime-queue'],
  waterfall: ['forecast-band', 'anomaly-window', 'confidence-envelope', 'rolling-window', 'benchmark-lanes', 'threshold-alert', 'comparison-grid', 'scenario-planner', 'small-multiples', 'event-overlay', 'quantile-layers', 'multi-resolution', 'goal-tracking', 'control-room', 'outlier-lens', 'distribution-focus', 'realtime-queue', 'seasonal-decomposition', 'narrative-sequence', 'cohort-breakdown', 'ranking-shift', 'dependency-critical-path', 'topology-health', 'drilldown-workbench', 'tapered-flow', 'banded']
};

export const MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET = 700;

export type MystiqueScale = {
  domain: Array<string | number | Date>;
  range: [number, number];
  map: (input: string | number | Date) => number;
};

const baseManifestByName = new Map(mystiqueChartManifest.map((entry) => [entry.name, entry] as const));
const baseChartNames = [...baseManifestByName.keys()].sort((left, right) => right.length - left.length);
const baseChartNamesAscending = [...baseManifestByName.keys()].sort((left, right) => left.localeCompare(right));

function normalizeChartType(type: ChartType): string {
  return `${type}`.trim();
}

function asNumber(value: number, fallback = 0): number {
  return Number.isFinite(value) ? value : fallback;
}

function hashText(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash || 1;
}

function seededNumber(seed: number, index: number, min: number, max: number): number {
  const wave = Math.sin(seed * 0.017 + index * 0.91) + Math.cos(seed * 0.011 + index * 0.53);
  const normalized = (wave + 2) / 4;
  return min + normalized * (max - min);
}

function seededInteger(seed: number, index: number, min: number, max: number): number {
  return Math.round(seededNumber(seed, index, min, max));
}

function monthLabel(index: number): string {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return labels[index % labels.length] ?? `P${index + 1}`;
}

function stageLabel(index: number): string {
  const labels = ['Acquire', 'Qualify', 'Trial', 'Negotiate', 'Close', 'Expand', 'Renew'];
  return labels[index % labels.length] ?? `Stage ${index + 1}`;
}

function boxValues(seed: number, index: number): number[] {
  return Array.from({ length: 6 }, (_, pointIndex) => seededInteger(seed + index * 7, pointIndex, 12, 44));
}

function groupedValues(seed: number, index: number): number[] {
  return Array.from({ length: 3 + ((seed + index) % 2) }, (_, pointIndex) =>
    seededInteger(seed + index * 9, pointIndex, 6, 26)
  );
}

function createCategoricalSample(
  seed: number,
  count: number,
  min: number,
  max: number,
  labelForIndex: (index: number) => string = monthLabel
): Datum[] {
  return Array.from({ length: Math.max(count, 5) }, (_, index) => ({
    label: labelForIndex(index),
    value: seededInteger(seed, index, min, max)
  }));
}

function createTimelineSample(seed: number, count: number): Datum[] {
  return Array.from({ length: Math.max(count, 6) }, (_, index) => ({
    x: index + 1,
    y: seededInteger(seed, index, 12, 46),
    label: monthLabel(index)
  }));
}

function createScatterSample(seed: number, count: number, bubble = false): Datum[] {
  return Array.from({ length: Math.max(count, 8) }, (_, index) => ({
    x: seededInteger(seed, index, 1, 24),
    y: seededInteger(seed + 17, index, 8, 42),
    value: seededInteger(seed + 71, index, bubble ? 12 : 4, bubble ? 64 : 20),
    label: `P${index + 1}`
  }));
}

function createWaterfallSample(seed: number, count: number): Datum[] {
  return Array.from({ length: Math.max(count, 6) }, (_, index) => {
    const magnitude = seededInteger(seed, index, 4, 18);
    const signed = index === 0 ? magnitude + 18 : index % 2 === 0 ? magnitude : -magnitude;
    return {
      label: stageLabel(index),
      value: signed
    };
  });
}

function createGroupedBarSample(seed: number, count: number): Datum[] {
  return Array.from({ length: Math.max(count, 5) }, (_, index) => ({
    label: monthLabel(index),
    values: groupedValues(seed, index)
  }));
}

function createCandlestickSample(seed: number, count: number): Datum[] {
  let previousClose = seededInteger(seed, 0, 22, 30);
  return Array.from({ length: Math.max(count, 6) }, (_, index) => {
    const open = index === 0 ? previousClose : previousClose + seededInteger(seed + 5, index, -4, 4);
    const close = open + seededInteger(seed + 11, index, -5, 6);
    const high = Math.max(open, close) + seededInteger(seed + 23, index, 2, 6);
    const low = Math.min(open, close) - seededInteger(seed + 37, index, 2, 5);
    previousClose = close;
    return {
      label: monthLabel(index),
      open,
      high,
      low,
      close
    };
  });
}

function createComboSample(seed: number, count: number): Datum[] {
  return Array.from({ length: Math.max(count, 6) }, (_, index) => ({
    label: monthLabel(index),
    bar: seededInteger(seed, index, 14, 42),
    line: seededInteger(seed + 41, index, 10, 34)
  }));
}

function createBoxPlotSample(seed: number, count: number): Datum[] {
  return Array.from({ length: Math.max(count, 5) }, (_, index) => ({
    category: `Cluster ${index + 1}`,
    label: `Cluster ${index + 1}`,
    values: boxValues(seed, index)
  }));
}

function createHeatmapSample(seed: number, count: number): Datum[] {
  const cellTarget = Math.max(count * 2, 16);
  const columns = Math.max(4, Math.ceil(Math.sqrt(cellTarget)));
  const rows = Math.max(3, Math.ceil(cellTarget / columns));
  const cells: Datum[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      cells.push({
        x: column,
        y: row,
        value: seededInteger(seed + row * 13, column, 10, 100)
      });
    }
  }
  return cells;
}

function createTreemapSample(seed: number, count: number): Datum[] {
  return Array.from({ length: Math.max(count, 6) }, (_, index) => ({
    label: `Node ${index + 1}`,
    value: seededInteger(seed, index, 8, 36)
  }));
}

function createNetworkSample(seed: number, count: number): Datum[] {
  const sources = ['Design', 'API', 'Web', 'Mobile', 'Ops'].slice(0, Math.max(3, Math.ceil(count / 2)));
  const targets = ['Auth', 'Billing', 'Search', 'Charts', 'Alerts'].slice(0, Math.max(3, Math.ceil(count / 2)));
  return Array.from({ length: Math.max(count, 7) }, (_, index) => ({
    source: sources[index % sources.length] ?? `S${index + 1}`,
    target: targets[(index + Math.floor(index / 2)) % targets.length] ?? `T${index + 1}`,
    value: seededInteger(seed, index, 2, 12)
  }));
}

function createSankeySample(seed: number): Datum[] {
  return [
    { source: 'Visitors', target: 'Signup', value: seededInteger(seed, 0, 18, 28) },
    { source: 'Visitors', target: 'Demo', value: seededInteger(seed, 1, 10, 18) },
    { source: 'Signup', target: 'Qualified', value: seededInteger(seed, 2, 12, 20) },
    { source: 'Demo', target: 'Qualified', value: seededInteger(seed, 3, 8, 14) },
    { source: 'Qualified', target: 'Won', value: seededInteger(seed, 4, 7, 12) },
    { source: 'Qualified', target: 'Nurture', value: seededInteger(seed, 5, 5, 10) }
  ];
}

function findChartManifest(type: ChartType): SourceChartManifestEntry | undefined {
  const normalized = normalizeChartType(type);
  const catalog = getMystiqueChartManifest(MYSTIQUE_CHART_CATALOG_SIZE);
  const exact = catalog.find((chart) => chart.name === normalized);
  if (exact) {
    return exact;
  }

  const baseType = resolveChartType(type);
  return baseManifestByName.get(baseType) ?? catalog.find((chart) => chart.name === baseType);
}

export function createLinearScale(domain: [number, number], range: [number, number]): MystiqueScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const clamp = (input: number): number => Math.max(0, Math.min(1, (input - d0) / (d1 - d0 || 1)));
  return {
    domain: [d0, d1],
    range,
    map(value: string | number | Date) {
      const numeric = asNumber(typeof value === 'string' ? Number(value) : value instanceof Date ? value.getTime() : value, 0);
      const t = clamp(numeric);
      return r0 + t * (r1 - r0);
    }
  };
}

export function createBandScale(domain: string[], range: [number, number]) {
  const [r0, r1] = range;
  const bandCount = Math.max(domain.length, 1);
  const step = (r1 - r0) / bandCount;
  const scale = {
    domain,
    range,
    bandwidth: step * 0.78
  };

  return {
    ...scale,
    map: (value: string | number | Date) => {
      const index = scale.domain.indexOf(typeof value === 'string' ? value : String(value));
      const safeIndex = index >= 0 ? index : 0;
      return r0 + safeIndex * step + step * 0.11;
    }
  };
}

export function createLogScale(domain: [number, number], range: [number, number]): MystiqueScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const safeD0 = Math.max(d0, 1e-6);
  const safeD1 = Math.max(d1, safeD0 + 1e-6);
  const log0 = Math.log10(safeD0);
  const log1 = Math.log10(safeD1);
  return {
    domain: [d0, d1],
    range,
    map(value: string | number | Date) {
      const next = Math.max(typeof value === 'number' ? value : Number(value), 1e-6);
      return r0 + ((Math.log10(next) - log0) / (log1 - log0 || 1)) * (r1 - r0);
    }
  };
}

export function createTimeScale(domain: [Date, Date], range: [number, number]): MystiqueScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  return {
    domain: [d0, d1],
    range,
    map(value: string | number | Date) {
      const now = value instanceof Date ? value.getTime() : new Date(typeof value === 'string' ? value : String(value)).getTime();
      const start = d0.getTime();
      const end = d1.getTime();
      return r0 + ((now - start) / (end - start || 1)) * (r1 - r0);
    }
  };
}

export function createDefaultTheme(overrides: Partial<ChartTheme> = {}): ChartTheme {
  return {
    axis: '#111827',
    grid: '#dbe2ea',
    focus: '#115e59',
    palette: ['#115e59', '#0f766e', '#15803d', '#b45309', '#b91c1c', '#4338ca'],
    ...overrides
  };
}

function clampUnit(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function summarizeDatum(datum: Datum): string {
  const entries = Object.entries(datum)
    .filter(([, value]) => value !== null && value !== undefined)
    .slice(0, 4)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value instanceof Date ? value.toISOString().slice(0, 10) : String(value)}`);
  return entries.join(' • ');
}

function datumLabel(datum: Datum, index: number): string {
  const preferred = datum.label ?? datum.category ?? datum.source ?? datum.target ?? datum.x ?? `Point ${index + 1}`;
  return preferred instanceof Date ? preferred.toISOString().slice(0, 10) : String(preferred);
}

function datumValue(datum: Datum): number {
  const candidates = ['value', 'y', 'bar', 'line', 'close', 'high', 'open'];
  for (const key of candidates) {
    const next = datum[key];
    if (typeof next === 'number' && Number.isFinite(next)) {
      return next;
    }
  }
  if (Array.isArray(datum.values)) {
    const numbers = datum.values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
    if (numbers.length) {
      return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
    }
  }
  return indexAverageValue(datum);
}

function indexAverageValue(datum: Datum): number {
  const numericValues = Object.values(datum).flatMap((value) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return [value];
    }
    if (Array.isArray(value)) {
      return value.filter((entry): entry is number => typeof entry === 'number' && Number.isFinite(entry));
    }
    return [];
  });

  if (!numericValues.length) {
    return 0;
  }

  return numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
}

function createRectBounds(width: number, height: number) {
  return {
    left: 36,
    right: width - 24,
    top: 28,
    bottom: height - 36,
    width: width - 60,
    height: height - 64
  };
}

export function createChartInteractionModel(type: ChartType, data: Datum[], width = 640, height = 320): ChartInteractionModel {
  const baseType = resolveChartType(type);
  const bounds = createRectBounds(width, height);
  const anchors: ChartInteractionAnchor[] = [];

  if (!data.length) {
    return { anchors };
  }

  const numericValues = data.map((datum) => datumValue(datum));
  const minValue = Math.min(...numericValues, 0);
  const maxValue = Math.max(...numericValues, 1);
  const valueScale = createLinearScale([minValue, maxValue || 1], [bounds.bottom, bounds.top]);

  const pushAnchor = (index: number, x: number, y: number, datum: Datum, label = datumLabel(datum, index), summary = summarizeDatum(datum)) => {
    anchors.push({
      id: `${baseType}-${index}`,
      index,
      x,
      y,
      label,
      summary
    });
  };

  if (['bar', 'histogram', 'waterfall', 'grouped-bar', 'stacked-bar', 'candlestick', 'combo', 'box-plot'].includes(baseType)) {
    const labels = data.map((datum, index) => datumLabel(datum, index));
    const xScale = createBandScale(labels, [bounds.left, bounds.right]);
    data.forEach((datum, index) => {
      const label = labels[index] ?? `Item ${index + 1}`;
      const x = xScale.map(label) + xScale.bandwidth / 2;
      const y = valueScale.map(datumValue(datum));
      pushAnchor(index, x, y, datum, label);
    });
    return { anchors };
  }

  if (['line', 'area'].includes(baseType)) {
    const xValues = data.map((datum, index) => asNumber(typeof datum.x === 'number' ? datum.x : index + 1, index + 1));
    const xScale = createLinearScale([Math.min(...xValues), Math.max(...xValues) || 1], [bounds.left, bounds.right]);
    data.forEach((datum, index) => {
      pushAnchor(index, xScale.map(xValues[index] ?? index + 1), valueScale.map(datumValue(datum)), datum);
    });
    return { anchors };
  }

  if (['scatter', 'bubble'].includes(baseType)) {
    const xValues = data.map((datum, index) => asNumber(typeof datum.x === 'number' ? datum.x : index + 1, index + 1));
    const yValues = data.map((datum) => asNumber(typeof datum.y === 'number' ? datum.y : datumValue(datum), 0));
    const xScale = createLinearScale([Math.min(...xValues), Math.max(...xValues) || 1], [bounds.left, bounds.right]);
    const yScale = createLinearScale([Math.min(...yValues), Math.max(...yValues) || 1], [bounds.bottom, bounds.top]);
    data.forEach((datum, index) => {
      pushAnchor(index, xScale.map(xValues[index] ?? index + 1), yScale.map(yValues[index] ?? 0), datum);
    });
    return { anchors };
  }

  if (baseType === 'heatmap') {
    const xValues = data.map((datum) => asNumber(typeof datum.x === 'number' ? datum.x : 0, 0));
    const yValues = data.map((datum) => asNumber(typeof datum.y === 'number' ? datum.y : 0, 0));
    const maxX = Math.max(...xValues, 0) + 1;
    const maxY = Math.max(...yValues, 0) + 1;
    const cellWidth = bounds.width / Math.max(maxX, 1);
    const cellHeight = bounds.height / Math.max(maxY, 1);
    data.forEach((datum, index) => {
      const x = bounds.left + xValues[index] * cellWidth + cellWidth / 2;
      const y = bounds.top + yValues[index] * cellHeight + cellHeight / 2;
      pushAnchor(index, x, y, datum);
    });
    return { anchors };
  }

  if (baseType === 'treemap') {
    const total = numericValues.reduce((sum, value) => sum + value, 0) || 1;
    let offset = bounds.left;
    data.forEach((datum, index) => {
      const segmentWidth = (Math.max(datumValue(datum), 0.01) / total) * bounds.width;
      const x = offset + segmentWidth / 2;
      const y = bounds.top + bounds.height / 2;
      pushAnchor(index, x, y, datum);
      offset += segmentWidth;
    });
    return { anchors };
  }

  if (['pie', 'donut', 'radar'].includes(baseType)) {
    const total = numericValues.reduce((sum, value) => sum + Math.max(value, 0.001), 0) || 1;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * (baseType === 'radar' ? 0.24 : 0.28);
    let currentAngle = -Math.PI / 2;
    data.forEach((datum, index) => {
      const sliceValue = Math.max(datumValue(datum), 0.001);
      const sweep = (sliceValue / total) * Math.PI * 2;
      const mid = currentAngle + sweep / 2;
      const anchorRadius = baseType === 'donut' ? radius * 0.9 : radius * 0.78;
      pushAnchor(index, centerX + Math.cos(mid) * anchorRadius, centerY + Math.sin(mid) * anchorRadius, datum);
      currentAngle += sweep;
    });
    return { anchors };
  }

  if (baseType === 'funnel') {
    const step = bounds.height / Math.max(data.length, 1);
    data.forEach((datum, index) => {
      pushAnchor(index, width / 2, bounds.top + step * index + step / 2, datum);
    });
    return { anchors };
  }

  if (['network', 'sankey'].includes(baseType)) {
    const edgeData = data.map((datum, index) => ({
      source: String(datum.source ?? `S${index + 1}`),
      target: String(datum.target ?? `T${index + 1}`),
      value: Math.max(datumValue(datum), 1)
    }));
    const nodes = [...new Set(edgeData.flatMap((edge) => [edge.source, edge.target]))];
    const columns = Math.max(Math.ceil(Math.sqrt(nodes.length)), 1);
    const rows = Math.max(Math.ceil(nodes.length / columns), 1);
    const nodeMap = new Map<string, { x: number; y: number }>();
    nodes.forEach((node, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      nodeMap.set(node, {
        x: bounds.left + (column + 0.5) * (bounds.width / columns),
        y: bounds.top + (row + 0.5) * (bounds.height / rows)
      });
    });
    edgeData.forEach((edge, index) => {
      const source = nodeMap.get(edge.source);
      const target = nodeMap.get(edge.target);
      const datum = data[index] ?? {};
      if (!source || !target) {
        return;
      }
      pushAnchor(index, (source.x + target.x) / 2, (source.y + target.y) / 2, datum, `${edge.source} -> ${edge.target}`, summarizeDatum(datum));
    });
    return { anchors };
  }

  data.forEach((datum, index) => {
    const t = data.length === 1 ? 0.5 : index / Math.max(data.length - 1, 1);
    pushAnchor(index, bounds.left + bounds.width * t, valueScale.map(datumValue(datum)), datum);
  });
  return { anchors };
}

export function resolveChartType(type: ChartType): string {
  const normalized = normalizeChartType(type);
  return baseChartNames.find((name) => normalized === name || normalized.startsWith(`${name}-`)) ?? normalized;
}

export function getChartVariantName(type: ChartType): string | null {
  const normalized = normalizeChartType(type);
  const baseType = resolveChartType(normalized);

  if (normalized === baseType || !normalized.startsWith(`${baseType}-`)) {
    return null;
  }

  const rawVariant = normalized.slice(baseType.length + 1);
  if (!rawVariant) {
    return null;
  }

  const cycleMatch = rawVariant.match(/^(.*)-(\d+)$/);
  return cycleMatch?.[1] ?? rawVariant;
}

export function getSupportedImplementedVariants(type: ChartType): string[] {
  const baseType = resolveChartType(type);
  const manifestVariants = [...new Set(
    getMystiqueChartManifest()
      .map((chart) => chart.name)
      .filter((chartName) => resolveChartType(chartName) === baseType)
      .map((chartName) => getChartVariantName(chartName))
      .filter((variantName): variantName is string => Boolean(variantName))
  )];

  return manifestVariants.length ? manifestVariants : [...(fullyImplementedVariantMap[baseType] ?? [])];
}

export function getFullyImplementedChartNames(target = MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET): string[] {
  return getMystiqueChartManifest(target).map((chart) => chart.name);
}

const fullyImplementedChartSet = new Set(getFullyImplementedChartNames(MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET));

export function isFullyImplementedChart(type: ChartType): boolean {
  const normalized = normalizeChartType(type);
  return fullyImplementedChartSet.has(normalized);
}

function createScaleBindingSpec(field: string, type: ScaleType, range: [number, number], overrides: Partial<ScaleBinding> = {}): ScaleBinding {
  const domain: ScaleBinding['domain'] =
    type === 'band' || type === 'point'
      ? ['Alpha', 'Beta', 'Gamma']
      : type === 'time'
        ? [new Date('2026-01-01T00:00:00.000Z'), new Date('2026-12-31T00:00:00.000Z')]
        : type === 'log'
          ? [1, 10, 100, 1000]
          : type === 'sqrt'
            ? [0, 25, 100]
            : [0, 50, 100];

  return {
    type,
    domain,
    range,
    nice: type === 'linear' || type === 'time' || type === 'log' || type === 'sqrt',
    clamp: type !== 'band' && type !== 'point',
    base: type === 'log' ? 10 : undefined,
    ...overrides
  };
}

function createDefaultAxes(baseType: string): ChartAxis[] {
  switch (baseType) {
    case 'bar':
    case 'histogram':
    case 'grouped-bar':
    case 'stacked-bar':
    case 'waterfall':
    case 'box-plot':
    case 'candlestick':
      return [
        { id: 'x', field: 'label', scaleType: 'band', position: 'bottom' },
        { id: 'y', field: 'value', scaleType: 'linear', position: 'left' }
      ];
    case 'combo':
      return [
        { id: 'x', field: 'label', scaleType: 'band', position: 'bottom' },
        { id: 'y', field: 'bar', scaleType: 'linear', position: 'left' },
        { id: 'y-secondary', field: 'line', scaleType: 'linear', position: 'right' }
      ];
    case 'line':
    case 'area':
      return [
        { id: 'x', field: 'x', scaleType: 'time', position: 'bottom' },
        { id: 'y', field: 'y', scaleType: 'linear', position: 'left' }
      ];
    case 'scatter':
      return [
        { id: 'x', field: 'x', scaleType: 'linear', position: 'bottom' },
        { id: 'y', field: 'y', scaleType: 'linear', position: 'left' }
      ];
    case 'bubble':
      return [
        { id: 'x', field: 'x', scaleType: 'linear', position: 'bottom' },
        { id: 'y', field: 'y', scaleType: 'linear', position: 'left' }
      ];
    case 'heatmap':
      return [
        { id: 'x', field: 'x', scaleType: 'band', position: 'bottom' },
        { id: 'y', field: 'y', scaleType: 'band', position: 'left' }
      ];
    case 'network':
    case 'sankey':
      return [
        { id: 'x', field: 'source', scaleType: 'point', position: 'bottom' },
        { id: 'y', field: 'target', scaleType: 'point', position: 'left' }
      ];
    case 'treemap':
      return [
        { id: 'x', field: 'label', scaleType: 'band', position: 'bottom' },
        { id: 'y', field: 'value', scaleType: 'linear', position: 'left' }
      ];
    case 'funnel':
    case 'pie':
    case 'donut':
    case 'radar':
      return [{ id: 'value', field: 'value', scaleType: 'linear', position: 'left' }];
    default:
      return [
        { id: 'x', field: 'x', scaleType: 'linear', position: 'bottom' },
        { id: 'y', field: 'y', scaleType: 'linear', position: 'left' }
      ];
  }
}

function createDefaultMotion(baseType: string): ChartMotionConfig {
  switch (baseType) {
    case 'bar':
    case 'grouped-bar':
    case 'stacked-bar':
    case 'histogram':
    case 'waterfall':
    case 'box-plot':
      return { enabled: true, preset: 'rise', durationMs: 280, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', staggerMs: 24 };
    case 'pie':
    case 'donut':
    case 'radar':
    case 'funnel':
      return { enabled: true, preset: 'sweep', durationMs: 340, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', staggerMs: 18 };
    case 'network':
    case 'sankey':
    case 'heatmap':
    case 'treemap':
      return { enabled: true, preset: 'fade-scale', durationMs: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', staggerMs: 12 };
    case 'bubble':
    case 'scatter':
      return { enabled: true, preset: 'pulse', durationMs: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', staggerMs: 18 };
    default:
      return { enabled: true, preset: 'draw', durationMs: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', staggerMs: 20 };
  }
}

function createScales(baseType: string, axis: ChartAxis[]): ChartScales {
  const xAxis = axis.find((item) => item.position === 'bottom' || item.position === 'top');
  const leftAxis = axis.find((item) => item.position === 'left');
  const rightAxis = axis.find((item) => item.position === 'right');
  const scales: ChartScales = {};

  if (xAxis) {
    scales.x = createScaleBindingSpec(xAxis.field, xAxis.scaleType, [0, 100]);
  }
  if (leftAxis) {
    scales.y = createScaleBindingSpec(leftAxis.field, leftAxis.scaleType, [100, 0]);
  }
  if (rightAxis) {
    scales.ySecondary = createScaleBindingSpec(rightAxis.field, rightAxis.scaleType, [100, 0]);
  }

  switch (baseType) {
    case 'bubble':
      scales.radius = createScaleBindingSpec('value', 'sqrt', [4, 20]);
      break;
    case 'heatmap':
      scales.color = createScaleBindingSpec('value', 'linear', [0, 1]);
      break;
    case 'network':
    case 'sankey':
      scales.node = createScaleBindingSpec('value', 'sqrt', [6, 18]);
      break;
    case 'treemap':
      scales.size = createScaleBindingSpec('value', 'linear', [0, 1]);
      break;
    case 'pie':
    case 'donut':
      scales.angle = createScaleBindingSpec('value', 'linear', [0, 360]);
      scales.size = createScaleBindingSpec('value', 'linear', [0, 1]);
      break;
    case 'radar':
      scales.angle = createScaleBindingSpec('label', 'point', [0, 360]);
      scales.radius = createScaleBindingSpec('value', 'linear', [0, 100]);
      break;
    case 'funnel':
      scales.size = createScaleBindingSpec('value', 'linear', [0, 1]);
      break;
    default:
      break;
  }

  return scales;
}

export function getChartManifestEntry(type: ChartType): SourceChartManifestEntry | undefined {
  return findChartManifest(type);
}

export function getBaseChartManifestEntry(type: ChartType): SourceChartManifestEntry | undefined {
  return baseManifestByName.get(resolveChartType(type));
}

export function createSampleChartData(type: ChartType, count = 6): Datum[] {
  const normalizedType = normalizeChartType(type);
  const baseType = resolveChartType(normalizedType);
  const seed = hashText(normalizedType);

  switch (baseType) {
    case 'bar':
    case 'histogram':
      return createCategoricalSample(seed, count, 8, 34);
    case 'pie':
    case 'donut':
    case 'radar':
    case 'funnel':
      return createCategoricalSample(seed, Math.max(count, 5), 6, 28, stageLabel);
    case 'waterfall':
      return createWaterfallSample(seed, count);
    case 'line':
    case 'area':
      return createTimelineSample(seed, count);
    case 'scatter':
      return createScatterSample(seed, count, false);
    case 'bubble':
      return createScatterSample(seed, count, true);
    case 'grouped-bar':
    case 'stacked-bar':
      return createGroupedBarSample(seed, count);
    case 'candlestick':
      return createCandlestickSample(seed, count);
    case 'combo':
      return createComboSample(seed, count);
    case 'box-plot':
      return createBoxPlotSample(seed, count);
    case 'heatmap':
      return createHeatmapSample(seed, count);
    case 'treemap':
      return createTreemapSample(seed, count);
    case 'network':
      return createNetworkSample(seed, count);
    case 'sankey':
      return createSankeySample(seed);
    default:
      return createTimelineSample(seed, count);
  }
}

export function createChartDefinition(type: ChartType, options: ChartOptions = {}): ChartDefinition {
  const baseType = resolveChartType(type);
  const manifest = findChartManifest(type);
  const manifestShape = manifest?.dataShape ?? [];
  const capabilities = options.capabilities?.length ? options.capabilities : [...(manifest?.capabilities ?? ['legend'])];
  const dimensions = {
    top: 24,
    right: 20,
    bottom: 28,
    left: 42,
    ...(options.dimensions ?? {})
  };
  const axis = options.axis ?? createDefaultAxes(baseType);
  const motion = {
    ...createDefaultMotion(baseType),
    ...(options.motion ?? {})
  };
  const definition: ChartDefinition = {
    type,
    title: options.title,
    options: {
      title: options.title ?? '',
      subtitle: options.subtitle ?? '',
      width: options.width ?? 640,
      height: options.height ?? 320,
      renderer: resolveRenderer(type, options.renderer),
      showLegend: options.showLegend ?? capabilities.includes('legend'),
      showAxes: options.showAxes ?? true,
      showGrid: options.showGrid ?? true,
      showTooltip: options.showTooltip ?? true,
      capabilities,
      axis,
      theme: createDefaultTheme(options.theme),
      dimensions,
      motion
    },
    dataShape: manifestShape,
    series: createSeries(baseType, options),
    capabilities,
    scales: createScales(baseType, axis)
  };
  return definition;
}

export function resolveRenderer(type: ChartType, requested?: ChartRenderer): ChartRenderer {
  if (requested) {
    return requested;
  }

  return getBaseChartManifestEntry(type)?.renderer ?? 'svg';
}

function createSeries(type: ChartType, options: ChartOptions): SeriesSpec[] {
  switch (type) {
    case 'stacked-bar':
      return [
        { key: 'values', type: 'stacked-bar', label: 'Stacked series', axis: 'y' },
        { key: 'value', type: 'bar', label: 'Total', axis: 'y' }
      ];
    case 'grouped-bar':
      return [{ key: 'values', type: 'grouped-bar', label: 'Grouped series', axis: 'y' }];
    case 'box-plot':
      return [{ key: 'values', type: 'rect', label: 'Distribution', axis: 'y' }];
    case 'network':
    case 'sankey':
      return [{ key: 'value', type: 'node', label: 'Flow weight', axis: 'x' }];
    case 'bubble':
    case 'scatter':
      return [{ key: 'value', type: 'point', label: 'Points', axis: 'y' }];
    case 'line':
      return [{ key: 'y', type: 'line', label: 'Trend', axis: 'y' }];
    case 'area':
      return [{ key: 'y', type: 'area', label: 'Area', axis: 'y' }];
    case 'heatmap':
    case 'treemap':
    case 'funnel':
      return [{ key: 'value', type: 'rect', label: 'Cells', axis: 'y' }];
    case 'histogram':
    case 'bar':
    case 'waterfall':
      return [{ key: 'value', type: 'bar', label: 'Series', axis: 'y' }];
    case 'pie':
    case 'donut':
      return [{ key: 'value', type: 'arc', label: 'Share' }];
    case 'candlestick':
      return [{ key: 'close', type: 'rect', label: 'OHLC', axis: 'y' }];
    case 'combo':
      return [
        { key: 'bar', type: 'bar', label: 'Columns', axis: 'y' },
        { key: 'line', type: 'line', label: 'Trend', axis: 'y' }
      ];
    case 'radar':
      return [{ key: 'value', type: 'line', label: 'Axis score', axis: 'y' }];
    default:
      return [{ key: 'value', type: options.showGrid ? 'point' : 'rule', label: 'Series', axis: 'y' }];
  }
}

export function normalizeDataPoint<TDatum extends Datum>(datum: TDatum): TDatum {
  const normalized: Datum = { ...datum };
  if (normalized.x === undefined && normalized.label !== undefined) {
    normalized.x = String(normalized.label);
  }
  return normalized as TDatum;
}

export const mystiqueGuide = {
  interactions: [
    'Share a canonical interaction contract across canvas and svg renderers.',
    'Prioritise keyboard focus, pointer precision, and reduced-motion rendering transitions.',
    'Design scale and axis descriptors as data-first config so renderer upgrades stay additive.'
  ],
  rendering: [
    'Keep SVG output semantic and accessible for tooltips, labels, and print quality.',
    'Use canvas for dense or animated payloads and keep output deterministic from the same definition.'
  ],
  composition: [
    'Store chart definitions independently from renderer output so D3-inspired experiments are portable.',
    'Treat each chart as feature contract plus renderer matrix that can be extended per chart family.'
  ]
} as const;
