export type SourceChartManifestEntry = {
  name: string;
  description: string;
  renderer: 'svg' | 'canvas' | 'hybrid';
  series: string[];
};

