import type { ChartCapability, ChartInteraction, SourceChartManifestEntry } from './types';

export const mystiqueChartManifest: SourceChartManifestEntry[] = [
  {
    name: 'area',
    family: 'cartesian',
    description: 'Time-series area chart with stacked and monotone variants.',
    renderer: 'svg',
    series: ['area', 'line', 'rule'],
    variants: ['stacked', 'normalized', 'stream'],
    interactions: ['tooltip', 'selection', 'crosshair'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'stacking'],
    dataShape: [
      { name: 'x', type: 'number', required: true, description: 'Primary x domain value' },
      { name: 'y', type: 'number', required: true, description: 'Y numeric value' }
    ],
    d3Analogs: ['d3.area'],
    devextremeHints: ['Use for trend and banded uncertainty contexts'],
    examples: ['Trend with confidence band', 'Area with baseline comparison', 'Normalized area stack']
  },
  {
    name: 'bar',
    family: 'cartesian',
    description: 'Standard categorical bar comparison chart.',
    renderer: 'hybrid',
    series: ['bar', 'rule', 'annotation'],
    variants: ['clustered', 'single', 'horizontal'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'grouping'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Category label' },
      { name: 'value', type: 'number', required: true, description: 'Bar value' }
    ],
    d3Analogs: ['d3.scaleBand', 'd3.axis'],
    devextremeHints: ['Map closest equivalent to BarSeries'],
    examples: ['Quarterly revenue', 'Grouped metrics']
  },
  {
    name: 'box-plot',
    family: 'distribution',
    description: 'Distribution chart with medians and quartiles.',
    renderer: 'svg',
    series: ['rect', 'rule', 'point'],
    variants: ['horizontal', 'notched', 'outlier-markers'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'annotations', 'axes'],
    dataShape: [
      { name: 'category', type: 'string', required: true, description: 'Grouping category' },
      { name: 'values', type: 'number', required: true, description: 'Array-like numeric values per category' }
    ],
    d3Analogs: ['d3.scaleBand', 'd3.line'],
    devextremeHints: ['Comparable to BoxPlotSeries'],
    examples: ['Quartile variance analysis']
  },
  {
    name: 'bubble',
    family: 'cartesian',
    description: 'Scatter variant with third dimension in point size.',
    renderer: 'hybrid',
    series: ['point', 'rule'],
    variants: ['scaled-size', 'animated', 'density'],
    interactions: ['tooltip', 'selection', 'crosshair'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'streaming'],
    dataShape: [
      { name: 'x', type: 'number', required: true, description: 'X coordinate' },
      { name: 'y', type: 'number', required: true, description: 'Y coordinate' },
      { name: 'value', type: 'number', required: false, description: 'Radius/weight value' }
    ],
    d3Analogs: ['d3.forceSimulation', 'd3.scaleSqrt'],
    devextremeHints: ['Closest behavior to BubbleSeries'],
    examples: ['Sales vs size vs margin']
  },
  {
    name: 'candlestick',
    family: 'financial',
    description: 'Financial open-high-low-close sequence visualization.',
    renderer: 'svg',
    series: ['rule', 'rect'],
    variants: ['candlestick', 'ohlc'],
    interactions: ['tooltip', 'crosshair'],
    capabilities: ['legend', 'grid', 'annotations', 'axes'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Period label' },
      { name: 'open', type: 'number', required: true, description: 'Open price' },
      { name: 'high', type: 'number', required: true, description: 'High price' },
      { name: 'low', type: 'number', required: true, description: 'Low price' },
      { name: 'close', type: 'number', required: true, description: 'Close price' }
    ],
    d3Analogs: ['d3.scaleTime', 'd3.axis'],
    devextremeHints: ['Comparable to finance candle representation'],
    examples: ['Equity close/open progression', 'Volatility panel']
  },
  {
    name: 'combo',
    family: 'composite',
    description: 'Mixed chart with bars and lines on a shared axis set.',
    renderer: 'hybrid',
    series: ['bar', 'line', 'point'],
    variants: ['bar+line', 'dual-axis'],
    interactions: ['tooltip', 'selection', 'crosshair'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'stacking'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Category or timeline label' },
      { name: 'bar', type: 'number', required: true, description: 'Column magnitude' },
      { name: 'line', type: 'number', required: true, description: 'Line magnitude' }
    ],
    d3Analogs: ['d3.axis', 'd3.scaleLinear'],
    devextremeHints: ['Comparable to CombinedSeries'],
    examples: ['Order volume and conversion rate']
  },
  {
    name: 'funnel',
    family: 'distribution',
    description: 'Stage reduction and conversion funnel.',
    renderer: 'svg',
    series: ['rect'],
    variants: ['horizontal', 'vertical'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'annotations', 'axes'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Stage label' },
      { name: 'value', type: 'number', required: true, description: 'Stage value' }
    ],
    d3Analogs: ['d3.pie', 'd3.layout'],
    devextremeHints: ['Closest to FunnelSeries'],
    examples: ['Sales pipeline', 'Onboarding conversion']
  },
  {
    name: 'grouped-bar',
    family: 'cartesian',
    description: 'Grouped bars for multiple series by category.',
    renderer: 'hybrid',
    series: ['bar', 'rule'],
    variants: ['grouped', 'grouped-stack'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'grouping'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Category label' },
      { name: 'values', type: 'number', required: true, description: 'Per-series values in order' }
    ],
    d3Analogs: ['d3.scaleBand', 'd3.stack'],
    devextremeHints: ['Comparable to BarSeries + series grouping'],
    examples: ['Team by quarter']
  },
  {
    name: 'heatmap',
    family: 'distribution',
    description: '2D matrix cells colored by intensity.',
    renderer: 'canvas',
    series: ['rect'],
    variants: ['ordered', 'clustered', 'calendar'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['grid', 'annotations', 'streaming'],
    dataShape: [
      { name: 'x', type: 'number', required: true, description: 'Column index' },
      { name: 'y', type: 'number', required: true, description: 'Row index' },
      { name: 'value', type: 'number', required: true, description: 'Heat value' }
    ],
    d3Analogs: ['d3.scaleSequential'],
    devextremeHints: ['Suitable replacement for dense matrix displays'],
    examples: ['Calendar activity heatmap']
  },
  {
    name: 'histogram',
    family: 'distribution',
    description: 'Frequency buckets for numeric distributions.',
    renderer: 'svg',
    series: ['bar'],
    variants: ['density', 'stacked'],
    interactions: ['tooltip', 'brush'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'streaming'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Bin label' },
      { name: 'value', type: 'number', required: true, description: 'Bin count' }
    ],
    d3Analogs: ['d3.histogram'],
    devextremeHints: ['Comparable to HistogramSeries'],
    examples: ['Latency histogram']
  },
  {
    name: 'line',
    family: 'cartesian',
    description: 'Time and numeric trend lines.',
    renderer: 'hybrid',
    series: ['line', 'rule', 'point'],
    variants: ['smooth', 'step', 'segment'],
    interactions: ['tooltip', 'selection', 'crosshair', 'zoom', 'pan'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'streaming'],
    dataShape: [
      { name: 'x', type: 'number', required: true, description: 'X domain value' },
      { name: 'y', type: 'number', required: true, description: 'Y value' }
    ],
    d3Analogs: ['d3.line', 'd3.curveMonotoneX'],
    devextremeHints: ['Comparable to LineSeries'],
    examples: ['Response time trend', 'Cumulative conversions']
  },
  {
    name: 'network',
    family: 'network',
    description: 'Force-directed node-link graph.',
    renderer: 'canvas',
    series: ['node'],
    variants: ['force', 'arc'],
    interactions: ['tooltip', 'pan', 'zoom', 'selection'],
    capabilities: ['annotations', 'drag'],
    dataShape: [
      { name: 'source', type: 'string', required: true, description: 'Source node id' },
      { name: 'target', type: 'string', required: true, description: 'Target node id' },
      { name: 'value', type: 'number', required: true, description: 'Link weight' }
    ],
    d3Analogs: ['d3.forceSimulation', 'd3.forceLink'],
    devextremeHints: ['Map toward graph scenarios with node/link datasets'],
    examples: ['Dependency graph', 'Service topology']
  },
  {
    name: 'pie',
    family: 'polar',
    description: 'Part-to-whole pie chart.',
    renderer: 'svg',
    series: ['arc'],
    variants: ['donut', 'mini-pie'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'annotations'],
    dataShape: [{ name: 'label', type: 'string', required: true, description: 'Slice label' }, { name: 'value', type: 'number', required: true, description: 'Slice size' }],
    d3Analogs: ['d3.pie', 'd3.arc'],
    devextremeHints: ['Comparable to PieSeries'],
    examples: ['Regional share']
  },
  {
    name: 'radar',
    family: 'polar',
    description: 'Multidimensional radial comparison.',
    renderer: 'svg',
    series: ['line', 'area', 'point'],
    variants: ['spider', 'area-radar'],
    interactions: ['tooltip'],
    capabilities: ['legend', 'annotations'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Axis label' },
      { name: 'value', type: 'number', required: true, description: 'Axis score' }
    ],
    d3Analogs: ['d3.scaleLinear'],
    devextremeHints: ['Useful for competency/radar displays'],
    examples: ['Capability heat score']
  },
  {
    name: 'scatter',
    family: 'cartesian',
    description: 'XY point cloud and correlation view.',
    renderer: 'hybrid',
    series: ['point', 'rule'],
    variants: ['marker', 'large-data'],
    interactions: ['tooltip', 'selection', 'brush', 'crosshair', 'zoom'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'streaming'],
    dataShape: [
      { name: 'x', type: 'number', required: true, description: 'X coordinate' },
      { name: 'y', type: 'number', required: true, description: 'Y coordinate' },
      { name: 'value', type: 'number', required: false, description: 'Optional weighting value' }
    ],
    d3Analogs: ['d3.scatter'],
    devextremeHints: ['Comparable to ScatterSeries'],
    examples: ['Feature correlation']
  },
  {
    name: 'sankey',
    family: 'network',
    description: 'Flow diagram for source-to-target transfer widths.',
    renderer: 'svg',
    series: ['node'],
    variants: ['vertical', 'horizontal'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['annotations', 'axes'],
    dataShape: [
      { name: 'source', type: 'string', required: true, description: 'Source node id' },
      { name: 'target', type: 'string', required: true, description: 'Target node id' },
      { name: 'value', type: 'number', required: true, description: 'Flow value' }
    ],
    d3Analogs: ['d3.sankey'],
    devextremeHints: ['Flow analytics and conversion pathways'],
    examples: ['Visitor conversion flow']
  },
  {
    name: 'stacked-bar',
    family: 'cartesian',
    description: 'Stacked bars where each category decomposes by series.',
    renderer: 'hybrid',
    series: ['bar', 'rule'],
    variants: ['full-stack', 'normalized'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'grid', 'annotations', 'axes', 'stacking'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Category label' },
      { name: 'values', type: 'number', required: true, description: 'Series values' }
    ],
    d3Analogs: ['d3.stack'],
    devextremeHints: ['Comparable to StackedBarSeries'],
    examples: ['Regional contribution']
  },
  {
    name: 'treemap',
    family: 'hierarchical',
    description: 'Area mapping for hierarchy decomposition.',
    renderer: 'canvas',
    series: ['rect'],
    variants: ['slice-dice', 'squarified'],
    interactions: ['tooltip', 'selection', 'drill-down'],
    capabilities: ['legend', 'annotations', 'drill-down'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Node label' },
      { name: 'value', type: 'number', required: true, description: 'Node size value' }
    ],
    d3Analogs: ['d3.treemap', 'd3.hierarchy'],
    devextremeHints: ['Comparable to Treemap-like hierarchical series'],
    examples: ['Storage allocation by category']
  },
  {
    name: 'waterfall',
    family: 'financial',
    description: 'Sequential deltas with total accumulation.',
    renderer: 'svg',
    series: ['bar', 'rule'],
    variants: ['bridge', 'subtotal', 'total-line'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'grid', 'annotations', 'axes'],
    dataShape: [
      { name: 'label', type: 'string', required: true, description: 'Sequence label' },
      { name: 'value', type: 'number', required: true, description: 'Delta amount' }
    ],
    d3Analogs: ['d3.cumsum'],
    devextremeHints: ['Comparable to WaterfallSeries'],
    examples: ['Budget to actual variance']
  },
  {
    name: 'donut',
    family: 'polar',
    description: 'Pie with inner radius for ratio and share.',
    renderer: 'svg',
    series: ['arc'],
    variants: ['label-inside', 'thick-ring'],
    interactions: ['tooltip', 'selection'],
    capabilities: ['legend', 'annotations'],
    dataShape: [{ name: 'label', type: 'string', required: true, description: 'Slice label' }, { name: 'value', type: 'number', required: true, description: 'Slice size' }],
    d3Analogs: ['d3.pie', 'd3.arc'],
    devextremeHints: ['Comparable to DonutSeries'],
    examples: ['Traffic channel share']
  }
];

type ChartVariantRecipe = {
  suffix: string;
  label: string;
  description: string;
  example: string;
  hint: string;
  analogs?: string[];
  interactions?: ChartInteraction[];
  capabilities?: ChartCapability[];
};

const legacyExpansionSuffixes: string[] = [
  'baseline',
  'compact',
  'large-data',
  'animated',
  'stacked',
  'normalized',
  'streaming',
  'hierarchical',
  'dense',
  'compact-grid',
  'sparkline',
  'delta',
  'comparison',
  'timeline',
  'faded',
  'multi-axis',
  'step',
  'area',
  'banded',
  'segment'
];

const LEGACY_VARIANT_CYCLES = 9;

const advancedVariantRecipes: ChartVariantRecipe[] = [
  {
    suffix: 'forecast-band',
    label: 'Forecast Band',
    description: 'Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.',
    example: 'Forecast band with optimistic, likely, and conservative outlooks',
    hint: 'Use when teams need projected movement plus uncertainty without changing chart family.',
    analogs: ['d3.area'],
    interactions: ['crosshair'],
    capabilities: ['annotations']
  },
  {
    suffix: 'anomaly-window',
    label: 'Anomaly Window',
    description: 'Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.',
    example: 'Anomaly window isolating suspicious jumps and troughs',
    hint: 'Useful for monitoring, fraud review, or incident triage.',
    analogs: ['d3.brush'],
    interactions: ['selection'],
    capabilities: ['annotations']
  },
  {
    suffix: 'confidence-envelope',
    label: 'Confidence Envelope',
    description: 'Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.',
    example: 'Confidence envelope around the main performance signal',
    hint: 'Best for teams that need a reliability story, not just a central value.',
    analogs: ['d3.area'],
    interactions: ['crosshair'],
    capabilities: ['annotations']
  },
  {
    suffix: 'rolling-window',
    label: 'Rolling Window',
    description: 'Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.',
    example: 'Rolling window view with seven-step smoothing',
    hint: 'Use when raw values are noisy but the short-term trend matters.',
    analogs: ['d3.rollup'],
    interactions: ['selection'],
    capabilities: ['grid']
  },
  {
    suffix: 'benchmark-lanes',
    label: 'Benchmark Lanes',
    description: 'Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.',
    example: 'Benchmark lanes for target, warning, and stretch zones',
    hint: 'Strong fit for KPI dashboards and executive scorecards.',
    analogs: ['d3.line'],
    interactions: ['tooltip'],
    capabilities: ['annotations']
  },
  {
    suffix: 'threshold-alert',
    label: 'Threshold Alert',
    description: 'Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.',
    example: 'Threshold alert view showing breach and recovery intervals',
    hint: 'Ideal when the key story is whether something crossed a policy line.',
    analogs: ['d3.line'],
    interactions: ['selection', 'crosshair'],
    capabilities: ['annotations']
  },
  {
    suffix: 'comparison-grid',
    label: 'Comparison Grid',
    description: 'Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.',
    example: 'Comparison grid for current, previous, and target states',
    hint: 'Use for board reviews and before-versus-after reporting.',
    analogs: ['d3.groupSort'],
    interactions: ['selection'],
    capabilities: ['grouping']
  },
  {
    suffix: 'scenario-planner',
    label: 'Scenario Planner',
    description: 'Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.',
    example: 'Scenario planner for best case, base case, and downside assumptions',
    hint: 'Great for roadmap planning and operational simulations.',
    analogs: ['d3.rollup'],
    interactions: ['selection'],
    capabilities: ['annotations']
  },
  {
    suffix: 'small-multiples',
    label: 'Small Multiples',
    description: 'Converts the base story into a repeated comparative lens for scanning many related subsets quickly.',
    example: 'Small multiples split by segment, region, or owner',
    hint: 'Useful when one chart is too dense but the structure should stay familiar.',
    analogs: ['d3.group'],
    interactions: ['selection'],
    capabilities: ['grouping']
  },
  {
    suffix: 'event-overlay',
    label: 'Event Overlay',
    description: 'Layers release markers, incidents, milestones, or external events directly into the chart narrative.',
    example: 'Event overlay showing launches, outages, and intervention markers',
    hint: 'Use when operational context matters as much as the raw metric.',
    analogs: ['d3.annotation'],
    interactions: ['tooltip'],
    capabilities: ['annotations']
  },
  {
    suffix: 'cohort-breakdown',
    label: 'Cohort Breakdown',
    description: 'Reorients the chart toward retention, aging, or grouped lifecycle comparisons.',
    example: 'Cohort breakdown across signup month or adoption stage',
    hint: 'Useful for growth, product analytics, and lifecycle operations.',
    analogs: ['d3.stack'],
    interactions: ['selection'],
    capabilities: ['grouping']
  },
  {
    suffix: 'quantile-layers',
    label: 'Quantile Layers',
    description: 'Adds quantile bands, percentile context, and layered distribution reading to the base chart.',
    example: 'Quantile layers showing median, interquartile, and tail behavior',
    hint: 'Use when averages are too blunt and spread matters.',
    analogs: ['d3.quantile'],
    interactions: ['tooltip'],
    capabilities: ['annotations']
  },
  {
    suffix: 'distribution-focus',
    label: 'Distribution Focus',
    description: 'Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.',
    example: 'Distribution-focused lens highlighting skew and density pockets',
    hint: 'Helpful for quality control and behavioral analysis.',
    analogs: ['d3.bin'],
    interactions: ['brush'],
    capabilities: ['grid']
  },
  {
    suffix: 'multi-resolution',
    label: 'Multi Resolution',
    description: 'Supports reading the same signal at summary and detailed resolutions in one coordinated representation.',
    example: 'Multi-resolution view combining macro trend and fine-grain detail',
    hint: 'Useful when users need both a zoomed-out and local reading.',
    analogs: ['d3.zoom'],
    interactions: ['zoom', 'pan'],
    capabilities: ['annotations']
  },
  {
    suffix: 'realtime-queue',
    label: 'Realtime Queue',
    description: 'Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.',
    example: 'Realtime queue dashboard with freshest values emphasized',
    hint: 'Built for active control rooms and streaming telemetry.',
    analogs: ['d3.timer'],
    interactions: ['live-update'],
    capabilities: ['streaming']
  },
  {
    suffix: 'outlier-lens',
    label: 'Outlier Lens',
    description: 'Pushes outliers into focus while preserving the baseline distribution or trend context.',
    example: 'Outlier lens with isolated extremes and support context',
    hint: 'Use when rare events are more important than the center of the data.',
    analogs: ['d3.extent'],
    interactions: ['selection', 'crosshair'],
    capabilities: ['annotations']
  },
  {
    suffix: 'seasonal-decomposition',
    label: 'Seasonal Decomposition',
    description: 'Frames the chart around recurring seasonality, cyclical movement, and baseline drift.',
    example: 'Seasonal decomposition with recurring cycles and baseline drift',
    hint: 'Good for demand planning, traffic, and operations with repeat patterns.',
    analogs: ['d3.rollup'],
    interactions: ['selection'],
    capabilities: ['grid']
  },
  {
    suffix: 'ranking-shift',
    label: 'Ranking Shift',
    description: 'Emphasizes position changes, movement between peers, and competitive reorderings.',
    example: 'Ranking shift across releases or reporting periods',
    hint: 'Use when change in order matters more than absolute magnitude.',
    analogs: ['d3.sort'],
    interactions: ['selection'],
    capabilities: ['annotations']
  },
  {
    suffix: 'dependency-critical-path',
    label: 'Dependency Critical Path',
    description: 'Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.',
    example: 'Critical-path view exposing blocked dependencies and gating steps',
    hint: 'Strong fit for operational flow mapping and delivery planning.',
    analogs: ['d3.sankey'],
    interactions: ['selection'],
    capabilities: ['annotations']
  },
  {
    suffix: 'topology-health',
    label: 'Topology Health',
    description: 'Adapts the chart to show health status, service relationships, or operational integrity overlays.',
    example: 'Topology health view with degraded and healthy segments',
    hint: 'Useful for service maps, infrastructure views, and reliability dashboards.',
    analogs: ['d3.forceSimulation'],
    interactions: ['selection', 'zoom'],
    capabilities: ['annotations']
  },
  {
    suffix: 'goal-tracking',
    label: 'Goal Tracking',
    description: 'Centers the chart around progress against explicit goals, milestones, and trailing completion status.',
    example: 'Goal tracking view with current progress and target pacing',
    hint: 'Ideal for roadmap delivery, OKRs, and adoption funnels.',
    analogs: ['d3.line'],
    interactions: ['tooltip'],
    capabilities: ['annotations']
  },
  {
    suffix: 'narrative-sequence',
    label: 'Narrative Sequence',
    description: 'Turns the chart into a presentation-oriented progression with stronger story beats and guided context.',
    example: 'Narrative sequence for walkthrough-style reporting',
    hint: 'Good for stakeholder storytelling and demo-ready flows.',
    analogs: ['d3.transition'],
    interactions: ['selection'],
    capabilities: ['annotations']
  },
  {
    suffix: 'drilldown-workbench',
    label: 'Drilldown Workbench',
    description: 'Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.',
    example: 'Drilldown workbench linking summary, segment, and detail views',
    hint: 'Use when the chart should act like an entry point, not a static endpoint.',
    analogs: ['d3.hierarchy'],
    interactions: ['drill-down'],
    capabilities: ['drill-down']
  },
  {
    suffix: 'control-room',
    label: 'Control Room',
    description: 'Optimizes the chart for operational command surfaces with dense status context and rapid scanning.',
    example: 'Control-room variant for live performance and alert review',
    hint: 'Built for operators who need fast answers in one glance.',
    analogs: ['d3.zoom'],
    interactions: ['live-update', 'crosshair'],
    capabilities: ['streaming', 'annotations']
  },
  {
    suffix: 'tapered-flow',
    label: 'Tapered Flow',
    description: 'Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.',
    example: 'Tapered flow view showing narrowing throughput across stages',
    hint: 'Useful for throughput, conversion, and value loss stories.',
    analogs: ['d3.sankey'],
    interactions: ['selection'],
    capabilities: ['annotations']
  }
];

export const MYSTIQUE_CHART_CATALOG_SIZE = 700;

function titleCase(value: string): string {
  return value
    .split(/[-_]/g)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function unique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)] as T[];
}

function withSafeExamples(base: SourceChartManifestEntry, suffix: string): string[] {
  const extra = `${titleCase(suffix)} variant with D3-inspired interaction pacing`;
  return [...new Set([...base.examples, extra])];
}

export function getMystiqueChartManifest(target = MYSTIQUE_CHART_CATALOG_SIZE): SourceChartManifestEntry[] {
  const catalog = [...mystiqueChartManifest];
  const baseLength = catalog.length;
  if (baseLength === 0) {
    return [];
  }

  if (target <= baseLength) {
    return catalog.slice(0, target);
  }

  for (let cycleOffset = 0; cycleOffset < LEGACY_VARIANT_CYCLES && catalog.length < target; cycleOffset += 1) {
    for (let index = 0; index < Math.min(baseLength, legacyExpansionSuffixes.length) && catalog.length < target; index += 1) {
      const base = mystiqueChartManifest[index];
      const suffix = legacyExpansionSuffixes[index];

      if (!base || !suffix) {
        continue;
      }

      const chartName = `${base.name}-${suffix}-${cycleOffset + 1}`;
      catalog.push({
        ...base,
        name: chartName,
        description: `${base.description} (${titleCase(suffix)} variant).`,
        variants: [...(base.variants ?? []), suffix, `v-${cycleOffset + 1}`],
        dataShape: [...base.dataShape],
        examples: withSafeExamples(base, `${base.name} ${suffix}`),
        d3Analogs: [...base.d3Analogs],
        devextremeHints: [...base.devextremeHints]
      });
    }
  }

  for (const recipe of advancedVariantRecipes) {
    for (const base of mystiqueChartManifest) {
      if (catalog.length >= target) {
        return catalog.slice(0, target);
      }

      const chartName = `${base.name}-${recipe.suffix}`;
      catalog.push({
        ...base,
        name: chartName,
        description: `${base.description} (${recipe.label} variant). ${recipe.description}`,
        variants: unique([...(base.variants ?? []), recipe.suffix]),
        dataShape: [...base.dataShape],
        interactions: unique([...(base.interactions ?? []), ...(recipe.interactions ?? [])]),
        capabilities: unique([...(base.capabilities ?? []), ...(recipe.capabilities ?? [])]),
        examples: unique([...base.examples, recipe.example, `${titleCase(base.name)} with ${recipe.label.toLowerCase()} storytelling`]),
        d3Analogs: unique([...(base.d3Analogs ?? []), ...(recipe.analogs ?? [])]),
        devextremeHints: unique([...base.devextremeHints, recipe.hint])
      });
    }
  }

  return catalog.slice(0, target);
}
