import { chartLibrary, componentLibrary } from '@eonui/manifest';
import { createMystiqueChart, createMystiqueChartPreview } from '@eonui/charts';

const featuredChartNames = [
  'line-forecast-band',
  'area-confidence-envelope',
  'scatter-outlier-lens',
  'heatmap-multi-resolution',
  'network-topology-health',
  'sankey-tapered-flow'
] as const;

const featuredCharts = featuredChartNames
  .map((chartName) => chartLibrary.find((chart) => chart.name === chartName))
  .filter((chart): chart is (typeof chartLibrary)[number] => Boolean(chart));
const fullyImplementedChartCount = 700;
const comboPreview = createMystiqueChartPreview('combo', {
  title: 'Combo chart',
  width: 640,
  height: 320
});
const spotlightPreview = createMystiqueChartPreview(featuredCharts[0]?.name ?? 'line', {
  title: featuredCharts[0]?.name ?? 'line',
  width: 480,
  height: 240
});

export const playgroundExamples = {
  EonPreview: `<${componentLibrary[0]?.tag ?? 'eon-button'} variant="primary">Launch</${componentLibrary[0]?.tag ?? 'eon-button'}>`,
  chartCatalogCount: chartLibrary.length,
  fullyImplementedChartCount,
  featuredCharts: featuredCharts.map((chart) => chart.name),
  chartPreview: comboPreview.svg,
  chartCanvasPreview: comboPreview.canvas,
  spotlightPreview: createMystiqueChart({
    type: featuredCharts[0]?.name ?? 'line',
    data: spotlightPreview.data,
    options: {
      title: featuredCharts[0]?.name ?? 'line',
      width: 480,
      height: 240,
      renderer: 'svg'
    }
  }),
  notes: [
    'Use the playground as a fast integration smoke surface for Eon components and Mystique charts.',
    'Favor manifest-backed examples so docs, AI prompts, and playground snippets stay aligned.',
    `Target ${chartLibrary.length} chart entries with shared SVG and canvas implementation contracts.`,
    `${fullyImplementedChartCount} chart entries currently have fully real SVG and canvas implementation coverage.`,
    'Spotlight advanced variants in the playground so forecast, topology, and exploratory chart patterns are visible immediately.'
  ]
} as const;
