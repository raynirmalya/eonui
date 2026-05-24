import { flattenTokens, tokens } from '@eonui/tokens';

export type Datum = Record<string, string | number | Date>;
export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'stacked-bar'
  | 'grouped-bar'
  | 'pie'
  | 'donut'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'radar'
  | 'histogram'
  | 'waterfall'
  | 'funnel'
  | 'treemap'
  | 'candlestick'
  | 'combo';

export type Scale<Input = number | string | Date> = {
  domain: Input[];
  range: [number, number];
  map: (value: Input) => number;
};

export function createLinearScale(domain: [number, number], range: [number, number]): Scale<number> {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  return {
    domain,
    range,
    map: (value) => r0 + ((value - d0) / (d1 - d0 || 1)) * (r1 - r0)
  };
}

export function createBandScale(domain: string[], range: [number, number]): Scale<string> & { bandwidth: number } {
  const [r0, r1] = range;
  const step = (r1 - r0) / Math.max(domain.length, 1);
  return {
    domain,
    range,
    bandwidth: step * 0.8,
    map: (value) => r0 + Math.max(domain.indexOf(value), 0) * step + step * 0.1
  };
}

export function createOrdinalScale(domain: string[], values: string[]) {
  return (input: string) => values[domain.indexOf(input) % values.length];
}

export function createTimeScale(domain: [Date, Date], range: [number, number]): Scale<Date> {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const start = d0.getTime();
  const end = d1.getTime();

  return {
    domain,
    range,
    map: (value) => {
      const current = value.getTime();
      return r0 + ((current - start) / (end - start || 1)) * (r1 - r0);
    }
  };
}

export function createLogScale(domain: [number, number], range: [number, number]): Scale<number> {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const safeD0 = Math.max(d0, 1e-6);
  const safeD1 = Math.max(d1, safeD0 + 1e-6);
  const log0 = Math.log10(safeD0);
  const log1 = Math.log10(safeD1);
  return {
    domain,
    range,
    map: (value) => r0 + ((Math.log10(Math.max(value, 1e-6)) - log0) / (log1 - log0 || 1)) * (r1 - r0)
  };
}

export function createRadialScale(domain: [number, number], range: [number, number]): Scale<number> {
  return createLinearScale(domain, range);
}

export function linePath(data: { x: number; y: number }[]): string {
  return data.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
}

export type ChartSeriesConfig = {
  key: string;
  type: 'line' | 'area' | 'bar' | 'point' | 'arc' | 'rect' | 'rule';
  label?: string;
  color?: string;
};

export type TooltipState<TDatum = Datum> = {
  open: boolean;
  datum?: TDatum;
  x: number;
  y: number;
};

export type LegendState = {
  activeKeys: string[];
};

export type SelectionState<TDatum = Datum> = {
  selected: TDatum[];
};

export type ZoomPanState = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

export type ChartOptions = {
  title?: string;
  xKey?: string;
  yKey?: string;
  renderer?: 'svg' | 'canvas' | 'hybrid';
  theme?: Partial<typeof defaultChartTheme>;
  series?: ChartSeriesConfig[];
  legend?: boolean;
  grid?: boolean;
  tooltip?: boolean;
  width?: number;
  height?: number;
  showLabels?: boolean;
  showAxes?: boolean;
};

export const defaultChartTheme = {
  axis: '#111827',
  grid: '#dbe2ea',
  series: ['#115e59', '#0f766e', '#15803d', '#b45309']
};

export type ChartDefinition = {
  type: ChartType;
  title?: string;
  options: ChartOptions;
  series: ChartSeriesConfig[];
};

const flattenedJarvisTokens = flattenTokens({
  semantic: tokens.semantic,
  component: tokens.component
});

function tokenValue(key: string, fallback: string): string {
  return flattenedJarvisTokens[key]?.$value ?? fallback;
}

export function createChartTheme(overrides: Partial<typeof defaultChartTheme> = {}) {
  return {
    axis: tokenValue('semantic.chart.axis', defaultChartTheme.axis),
    grid: tokenValue('semantic.chart.grid', defaultChartTheme.grid),
    series: [
      tokenValue('semantic.chart.series1', defaultChartTheme.series[0]),
      tokenValue('semantic.chart.series2', defaultChartTheme.series[1]),
      tokenValue('semantic.chart.series3', defaultChartTheme.series[2]),
      tokenValue('semantic.chart.series4', defaultChartTheme.series[3])
    ],
    ...overrides
  };
}

export function createChartOptions(type: ChartType, options: Partial<ChartOptions> = {}): ChartOptions {
  return {
    renderer: type === 'heatmap' || type === 'treemap' ? 'canvas' : 'hybrid',
    legend: true,
    grid: true,
    tooltip: true,
    width: 640,
    height: 320,
    showLabels: true,
    showAxes: type !== 'pie' && type !== 'donut' && type !== 'radar',
    theme: createChartTheme(options.theme),
    ...options
  };
}

export function createSeriesConfig(type: ChartType): ChartSeriesConfig[] {
  switch (type) {
    case 'line':
      return [{ key: 'value', type: 'line', label: 'Series 1' }];
    case 'area':
      return [{ key: 'value', type: 'area', label: 'Series 1' }];
    case 'scatter':
    case 'bubble':
      return [{ key: 'value', type: 'point', label: 'Series 1' }];
    case 'pie':
    case 'donut':
      return [{ key: 'value', type: 'arc', label: 'Series 1' }];
    default:
      return [{ key: 'value', type: 'bar', label: 'Series 1' }];
  }
}

export function createTooltipState<TDatum = Datum>(): TooltipState<TDatum> {
  return {
    open: false,
    x: 0,
    y: 0
  };
}

export function showTooltip<TDatum>(state: TooltipState<TDatum>, datum: TDatum, x: number, y: number): TooltipState<TDatum> {
  return {
    open: true,
    datum,
    x,
    y
  };
}

export function hideTooltip<TDatum>(state: TooltipState<TDatum>): TooltipState<TDatum> {
  return {
    ...state,
    open: false,
    datum: undefined
  };
}

export function createLegendState(keys: string[]): LegendState {
  return {
    activeKeys: [...keys]
  };
}

export function toggleLegendKey(state: LegendState, key: string): LegendState {
  return state.activeKeys.includes(key)
    ? { activeKeys: state.activeKeys.filter((item) => item !== key) }
    : { activeKeys: [...state.activeKeys, key] };
}

export function createSelectionState<TDatum = Datum>(): SelectionState<TDatum> {
  return {
    selected: []
  };
}

export function toggleSelection<TDatum>(state: SelectionState<TDatum>, datum: TDatum): SelectionState<TDatum> {
  const exists = state.selected.includes(datum);
  return {
    selected: exists ? state.selected.filter((item) => item !== datum) : [...state.selected, datum]
  };
}

export function createZoomPanState(): ZoomPanState {
  return {
    scale: 1,
    offsetX: 0,
    offsetY: 0
  };
}

export function applyZoomPan(state: ZoomPanState, patch: Partial<ZoomPanState>): ZoomPanState {
  return {
    ...state,
    ...patch
  };
}

export function createChartDefinition(type: ChartType, options: Partial<ChartOptions> = {}): ChartDefinition {
  return {
    type,
    title: options.title,
    options: createChartOptions(type, options),
    series: options.series ?? createSeriesConfig(type)
  };
}

export const nabuelaGuide = {
  interactions: [
    'Use tooltip, legend, selection, and zoom-pan state helpers as the shared interaction model.',
    'Keep chart definitions renderer-agnostic where possible and branch only at the rendering layer.'
  ],
  rendering: [
    'Use SVG for semantic-rich vector charts and Canvas for denser pixel-oriented charts.',
    'Prefer shared chart definitions so SVG and Canvas remain aligned over time.'
  ],
  composition: [
    'Use createChartOptions and createSeriesConfig as the shared API baseline for higher-level chart components.',
    'Integrate chart theme values with Jarvis token-derived semantic colors.'
  ]
} as const;

export * from './manifest/index.js';
