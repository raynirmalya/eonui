export type ScaleType = 'linear' | 'log' | 'sqrt' | 'time' | 'band' | 'point' | 'identity';

export type DataType = 'string' | 'number' | 'date' | 'boolean';

export type ChartRenderer = 'svg' | 'canvas' | 'hybrid';

export type ChartFamily = 'cartesian' | 'polar' | 'hierarchical' | 'network' | 'distribution' | 'financial' | 'composite';

export type ChartInteraction = 'tooltip' | 'brush' | 'zoom' | 'pan' | 'selection' | 'crosshair' | 'drill-down' | 'live-update' | 'drag';

export type ChartCapability =
  | 'legend'
  | 'grid'
  | 'annotations'
  | 'axes'
  | 'stacking'
  | 'grouping'
  | 'streaming'
  | 'drill-down'
  | 'drag';

export interface ScaleBinding {
  type: ScaleType;
  domain: (string | number | Date | null)[];
  range: [number, number];
  nice?: boolean;
  clamp?: boolean;
  base?: number;
}

export interface DataFieldSchema {
  name: string;
  type: DataType;
  required: boolean;
  description: string;
}

export interface SourceChartManifestEntry {
  name: string;
  family: ChartFamily;
  description: string;
  renderer: ChartRenderer;
  series: string[];
  variants: string[];
  interactions: ChartInteraction[];
  capabilities: ChartCapability[];
  dataShape: DataFieldSchema[];
  d3Analogs: string[];
  devextremeHints: string[];
  examples: string[];
}

export interface AxisSpec {
  id: string;
  field: string;
  scale: ScaleBinding;
  position: 'left' | 'right' | 'top' | 'bottom';
  label?: string;
}

export type SeriesType = 'line' | 'area' | 'bar' | 'stacked-bar' | 'grouped-bar' | 'point' | 'arc' | 'rect' | 'rule' | 'sankey' | 'node';

export interface SeriesSpec {
  key: string;
  type: SeriesType;
  label: string;
  color?: string;
  axis?: string;
  stack?: string;
}
