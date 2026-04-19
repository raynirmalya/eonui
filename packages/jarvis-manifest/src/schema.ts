export type ManifestProp = {
  name: string;
  type: string;
  default?: string;
  values?: string[];
  description: string;
};

export type ManifestEvent = {
  name: string;
  detail?: string;
  description: string;
};

export type ManifestSlot = {
  name: string;
  description: string;
};

export type ManifestPart = {
  name: string;
  description: string;
};

export type ComponentSpec = {
  visualAnatomy?: string[];
  variants?: string[];
  sizes?: string[];
  states?: string[];
  interactions?: string[];
  accessibilityNotes?: string[];
  responsiveNotes?: string[];
  themeBehavior?: {
    generic?: string[];
    material?: string[];
    fluent?: string[];
  };
  devexpressParity?: string[];
};

export type ComponentManifestEntry = {
  name: string;
  tag: string;
  category: string;
  description: string;
  anatomy: string[];
  props: ManifestProp[];
  events: ManifestEvent[];
  methods: { name: string; description: string }[];
  slots: ManifestSlot[];
  parts: ManifestPart[];
  cssVariables: { name: string; description: string }[];
  accessibility: string[];
  responsive: string[];
  examples: { title: string; code: string }[];
  antiPatterns: string[];
  related: string[];
  compositionRules: string[];
  spec?: ComponentSpec;
};

export type LibraryManifest = {
  generatedAt: string;
  components: ComponentManifestEntry[];
  charts: {
    name: string;
    description: string;
    renderer: 'svg' | 'canvas' | 'hybrid';
    series: string[];
    family?: 'cartesian' | 'polar' | 'hierarchical' | 'network' | 'distribution' | 'financial' | 'composite';
    variants?: string[];
    interactions?: ('tooltip' | 'brush' | 'zoom' | 'pan' | 'selection' | 'crosshair' | 'drill-down' | 'live-update' | 'drag')[];
    capabilities?: ('legend' | 'grid' | 'annotations' | 'axes' | 'stacking' | 'grouping' | 'streaming' | 'drill-down' | 'drag')[];
    dataShape?: {
      name: string;
      type: 'string' | 'number' | 'date' | 'boolean';
      required: boolean;
      description: string;
    }[];
    d3Analogs?: string[];
    devextremeHints?: string[];
    examples?: string[];
  }[];
};
