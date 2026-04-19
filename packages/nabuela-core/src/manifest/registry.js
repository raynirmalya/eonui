export const chartManifestRegistry = [
    {
        name: 'line',
        description: 'Continuous trend visualization.',
        renderer: 'hybrid',
        series: ['line', 'point', 'annotation']
    },
    {
        name: 'bar',
        description: 'Categorical comparison chart.',
        renderer: 'hybrid',
        series: ['bar', 'rule', 'annotation']
    },
    {
        name: 'area',
        description: 'Filled trend visualization.',
        renderer: 'svg',
        series: ['area', 'line', 'annotation']
    },
    {
        name: 'scatter',
        description: 'Relationship chart for numeric dimensions.',
        renderer: 'hybrid',
        series: ['point', 'rule', 'annotation']
    },
    {
        name: 'stacked-bar',
        description: 'Stacked categorical comparison chart.',
        renderer: 'hybrid',
        series: ['bar', 'annotation', 'rule']
    },
    {
        name: 'grouped-bar',
        description: 'Grouped categorical comparison chart.',
        renderer: 'hybrid',
        series: ['bar', 'annotation', 'rule']
    },
    {
        name: 'pie',
        description: 'Part-to-whole radial chart.',
        renderer: 'svg',
        series: ['arc', 'text', 'annotation']
    },
    {
        name: 'donut',
        description: 'Part-to-whole radial chart with inner cutout.',
        renderer: 'svg',
        series: ['arc', 'text', 'annotation']
    },
    {
        name: 'bubble',
        description: 'Scatter plot with variable point size.',
        renderer: 'hybrid',
        series: ['point', 'annotation', 'rule']
    },
    {
        name: 'heatmap',
        description: 'Matrix chart for intensity across two categorical dimensions.',
        renderer: 'canvas',
        series: ['rect', 'text', 'annotation']
    },
    {
        name: 'radar',
        description: 'Radial comparison chart across multiple dimensions.',
        renderer: 'svg',
        series: ['line', 'area', 'annotation']
    },
    {
        name: 'histogram',
        description: 'Binned distribution chart.',
        renderer: 'hybrid',
        series: ['bar', 'rule', 'annotation']
    },
    {
        name: 'waterfall',
        description: 'Incremental contribution chart across sequential categories.',
        renderer: 'svg',
        series: ['bar', 'rule', 'annotation']
    },
    {
        name: 'funnel',
        description: 'Stage-based conversion chart.',
        renderer: 'svg',
        series: ['rect', 'text', 'annotation']
    },
    {
        name: 'treemap',
        description: 'Hierarchical part-to-whole area chart.',
        renderer: 'canvas',
        series: ['rect', 'text', 'annotation']
    },
    {
        name: 'candlestick',
        description: 'Open-high-low-close financial series chart.',
        renderer: 'svg',
        series: ['rule', 'rect', 'annotation']
    },
    {
        name: 'combo',
        description: 'Mixed chart composition across shared axes.',
        renderer: 'hybrid',
        series: ['bar', 'line', 'point', 'annotation']
    }
];
//# sourceMappingURL=registry.js.map