import type { LibraryManifest } from './schema';

export const chartLibrary: LibraryManifest['charts'] = [
  {
    "name": "area",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack"
    ]
  },
  {
    "name": "bar",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics"
    ]
  },
  {
    "name": "box-plot",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis"
    ]
  },
  {
    "name": "bubble",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin"
    ]
  },
  {
    "name": "candlestick",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel"
    ]
  },
  {
    "name": "combo",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate"
    ]
  },
  {
    "name": "funnel",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion"
    ]
  },
  {
    "name": "grouped-bar",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter"
    ]
  },
  {
    "name": "heatmap",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap"
    ]
  },
  {
    "name": "histogram",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram"
    ]
  },
  {
    "name": "line",
    "family": "cartesian",
    "description": "Time and numeric trend lines.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions"
    ]
  },
  {
    "name": "network",
    "family": "network",
    "description": "Force-directed node-link graph.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology"
    ]
  },
  {
    "name": "pie",
    "family": "polar",
    "description": "Part-to-whole pie chart.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share"
    ]
  },
  {
    "name": "radar",
    "family": "polar",
    "description": "Multidimensional radial comparison.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score"
    ]
  },
  {
    "name": "scatter",
    "family": "cartesian",
    "description": "XY point cloud and correlation view.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation"
    ]
  },
  {
    "name": "sankey",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow"
    ]
  },
  {
    "name": "stacked-bar",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution"
    ]
  },
  {
    "name": "treemap",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category"
    ]
  },
  {
    "name": "waterfall",
    "family": "financial",
    "description": "Sequential deltas with total accumulation.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance"
    ]
  },
  {
    "name": "donut",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share"
    ]
  },
  {
    "name": "area-baseline-1",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-1",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-1",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-1",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-1",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-1",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-1",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-1",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-1",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-1",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-1",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-1",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-1",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-1",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-1"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-1",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-1",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-1",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-1",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-1",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-1",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-1"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-2",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-2",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-2",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-2",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-2",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-2",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-2",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-2",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-2",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-2",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-2",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-2",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-2",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-2",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-2"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-2",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-2",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-2",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-2",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-2",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-2",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-2"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-3",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-3",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-3",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-3",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-3",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-3",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-3",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-3",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-3",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-3",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-3",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-3",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-3",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-3",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-3"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-3",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-3",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-3",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-3",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-3",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-3",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-3"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-4",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-4",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-4",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-4",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-4",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-4",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-4",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-4",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-4",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-4",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-4",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-4",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-4",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-4",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-4"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-4",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-4",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-4",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-4",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-4",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-4",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-4"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-5",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-5",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-5",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-5",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-5",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-5",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-5",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-5",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-5",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-5",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-5",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-5",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-5",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-5",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-5"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-5",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-5",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-5",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-5",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-5",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-5",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-5"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-6",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-6",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-6",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-6",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-6",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-6",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-6",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-6",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-6",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-6",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-6",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-6",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-6",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-6",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-6"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-6",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-6",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-6",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-6",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-6",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-6",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-6"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-7",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-7",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-7",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-7",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-7",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-7",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-7",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-7",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-7",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-7",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-7",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-7",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-7",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-7",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-7"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-7",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-7",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-7",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-7",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-7",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-7",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-7"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-8",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-8",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-8",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-8",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-8",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-8",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-8",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-8",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-8",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-8",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-8",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-8",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-8",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-8",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-8"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-8",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-8",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-8",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-8",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-8",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-8",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-8"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-baseline-9",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Baseline variant).",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "baseline",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts"
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Area baseline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bar-compact-9",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Compact variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "compact",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries"
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Bar compact variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "box-plot-large-data-9",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Large Data variant).",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "large-data",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries"
    ],
    "examples": [
      "Quartile variance analysis",
      "Box Plot large Data variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "bubble-animated-9",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Animated variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "animated",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries"
    ],
    "examples": [
      "Sales vs size vs margin",
      "Bubble animated variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "candlestick-stacked-9",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Stacked variant).",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "stacked",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation"
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Candlestick stacked variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "combo-normalized-9",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Normalized variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "normalized",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries"
    ],
    "examples": [
      "Order volume and conversion rate",
      "Combo normalized variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "funnel-streaming-9",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Streaming variant).",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "streaming",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries"
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Funnel streaming variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "grouped-bar-hierarchical-9",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Hierarchical variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "hierarchical",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping"
    ],
    "examples": [
      "Team by quarter",
      "Grouped Bar hierarchical variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "heatmap-dense-9",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dense variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dense",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays"
    ],
    "examples": [
      "Calendar activity heatmap",
      "Heatmap dense variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "histogram-compact-grid-9",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Compact Grid variant).",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "compact-grid",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries"
    ],
    "examples": [
      "Latency histogram",
      "Histogram compact Grid variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "line-sparkline-9",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Sparkline variant).",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "sparkline",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries"
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Line sparkline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "network-delta-9",
    "family": "network",
    "description": "Force-directed node-link graph. (Delta variant).",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "delta",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets"
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Network delta variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "pie-comparison-9",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to PieSeries"
    ],
    "examples": [
      "Regional share",
      "Pie comparison variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "radar-timeline-9",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Timeline variant).",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "timeline",
      "v-9"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays"
    ],
    "examples": [
      "Capability heat score",
      "Radar timeline variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "scatter-faded-9",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Faded variant).",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "faded",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries"
    ],
    "examples": [
      "Feature correlation",
      "Scatter faded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "sankey-multi-axis-9",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Axis variant).",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-axis",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways"
    ],
    "examples": [
      "Visitor conversion flow",
      "Sankey multi Axis variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "stacked-bar-step-9",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Step variant).",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "step",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries"
    ],
    "examples": [
      "Regional contribution",
      "Stacked Bar step variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "treemap-area-9",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Area variant).",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "area",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series"
    ],
    "examples": [
      "Storage allocation by category",
      "Treemap area variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "waterfall-banded-9",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Banded variant).",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "banded",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries"
    ],
    "examples": [
      "Budget to actual variance",
      "Waterfall banded variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "donut-segment-9",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Segment variant).",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "segment",
      "v-9"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries"
    ],
    "examples": [
      "Traffic channel share",
      "Donut segment variant with D3-inspired interaction pacing"
    ]
  },
  {
    "name": "area-forecast-band",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Area with forecast band storytelling"
    ]
  },
  {
    "name": "bar-forecast-band",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.area"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Bar with forecast band storytelling"
    ]
  },
  {
    "name": "box-plot-forecast-band",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Quartile variance analysis",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Box Plot with forecast band storytelling"
    ]
  },
  {
    "name": "bubble-forecast-band",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.area"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Bubble with forecast band storytelling"
    ]
  },
  {
    "name": "candlestick-forecast-band",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Candlestick with forecast band storytelling"
    ]
  },
  {
    "name": "combo-forecast-band",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Combo with forecast band storytelling"
    ]
  },
  {
    "name": "funnel-forecast-band",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.area"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Funnel with forecast band storytelling"
    ]
  },
  {
    "name": "grouped-bar-forecast-band",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Team by quarter",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Grouped Bar with forecast band storytelling"
    ]
  },
  {
    "name": "heatmap-forecast-band",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.area"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Heatmap with forecast band storytelling"
    ]
  },
  {
    "name": "histogram-forecast-band",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Latency histogram",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Histogram with forecast band storytelling"
    ]
  },
  {
    "name": "line-forecast-band",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Line with forecast band storytelling"
    ]
  },
  {
    "name": "network-forecast-band",
    "family": "network",
    "description": "Force-directed node-link graph. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.area"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Network with forecast band storytelling"
    ]
  },
  {
    "name": "pie-forecast-band",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Regional share",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Pie with forecast band storytelling"
    ]
  },
  {
    "name": "radar-forecast-band",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.area"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Capability heat score",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Radar with forecast band storytelling"
    ]
  },
  {
    "name": "scatter-forecast-band",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Feature correlation",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Scatter with forecast band storytelling"
    ]
  },
  {
    "name": "sankey-forecast-band",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.area"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Visitor conversion flow",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Sankey with forecast band storytelling"
    ]
  },
  {
    "name": "stacked-bar-forecast-band",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Regional contribution",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Stacked Bar with forecast band storytelling"
    ]
  },
  {
    "name": "treemap-forecast-band",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Storage allocation by category",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Treemap with forecast band storytelling"
    ]
  },
  {
    "name": "waterfall-forecast-band",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Budget to actual variance",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Waterfall with forecast band storytelling"
    ]
  },
  {
    "name": "donut-forecast-band",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Forecast Band variant). Extends the base chart with projected ranges, scenario envelopes, and forward-looking decision framing.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "forecast-band"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when teams need projected movement plus uncertainty without changing chart family."
    ],
    "examples": [
      "Traffic channel share",
      "Forecast band with optimistic, likely, and conservative outlooks",
      "Donut with forecast band storytelling"
    ]
  },
  {
    "name": "area-anomaly-window",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.brush"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Anomaly window isolating suspicious jumps and troughs",
      "Area with anomaly window storytelling"
    ]
  },
  {
    "name": "bar-anomaly-window",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.brush"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Anomaly window isolating suspicious jumps and troughs",
      "Bar with anomaly window storytelling"
    ]
  },
  {
    "name": "box-plot-anomaly-window",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Quartile variance analysis",
      "Anomaly window isolating suspicious jumps and troughs",
      "Box Plot with anomaly window storytelling"
    ]
  },
  {
    "name": "bubble-anomaly-window",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.brush"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Anomaly window isolating suspicious jumps and troughs",
      "Bubble with anomaly window storytelling"
    ]
  },
  {
    "name": "candlestick-anomaly-window",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Anomaly window isolating suspicious jumps and troughs",
      "Candlestick with anomaly window storytelling"
    ]
  },
  {
    "name": "combo-anomaly-window",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Anomaly window isolating suspicious jumps and troughs",
      "Combo with anomaly window storytelling"
    ]
  },
  {
    "name": "funnel-anomaly-window",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.brush"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Anomaly window isolating suspicious jumps and troughs",
      "Funnel with anomaly window storytelling"
    ]
  },
  {
    "name": "grouped-bar-anomaly-window",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Team by quarter",
      "Anomaly window isolating suspicious jumps and troughs",
      "Grouped Bar with anomaly window storytelling"
    ]
  },
  {
    "name": "heatmap-anomaly-window",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.brush"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Anomaly window isolating suspicious jumps and troughs",
      "Heatmap with anomaly window storytelling"
    ]
  },
  {
    "name": "histogram-anomaly-window",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Latency histogram",
      "Anomaly window isolating suspicious jumps and troughs",
      "Histogram with anomaly window storytelling"
    ]
  },
  {
    "name": "line-anomaly-window",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Anomaly window isolating suspicious jumps and troughs",
      "Line with anomaly window storytelling"
    ]
  },
  {
    "name": "network-anomaly-window",
    "family": "network",
    "description": "Force-directed node-link graph. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.brush"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Anomaly window isolating suspicious jumps and troughs",
      "Network with anomaly window storytelling"
    ]
  },
  {
    "name": "pie-anomaly-window",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Regional share",
      "Anomaly window isolating suspicious jumps and troughs",
      "Pie with anomaly window storytelling"
    ]
  },
  {
    "name": "radar-anomaly-window",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.brush"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Capability heat score",
      "Anomaly window isolating suspicious jumps and troughs",
      "Radar with anomaly window storytelling"
    ]
  },
  {
    "name": "scatter-anomaly-window",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Feature correlation",
      "Anomaly window isolating suspicious jumps and troughs",
      "Scatter with anomaly window storytelling"
    ]
  },
  {
    "name": "sankey-anomaly-window",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.brush"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Visitor conversion flow",
      "Anomaly window isolating suspicious jumps and troughs",
      "Sankey with anomaly window storytelling"
    ]
  },
  {
    "name": "stacked-bar-anomaly-window",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Regional contribution",
      "Anomaly window isolating suspicious jumps and troughs",
      "Stacked Bar with anomaly window storytelling"
    ]
  },
  {
    "name": "treemap-anomaly-window",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Storage allocation by category",
      "Anomaly window isolating suspicious jumps and troughs",
      "Treemap with anomaly window storytelling"
    ]
  },
  {
    "name": "waterfall-anomaly-window",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Budget to actual variance",
      "Anomaly window isolating suspicious jumps and troughs",
      "Waterfall with anomaly window storytelling"
    ]
  },
  {
    "name": "donut-anomaly-window",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Anomaly Window variant). Highlights unusual clusters, sudden spikes, and suspicious dips inside an explicitly marked analysis window.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "anomaly-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.brush"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Useful for monitoring, fraud review, or incident triage."
    ],
    "examples": [
      "Traffic channel share",
      "Anomaly window isolating suspicious jumps and troughs",
      "Donut with anomaly window storytelling"
    ]
  },
  {
    "name": "area-confidence-envelope",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Confidence envelope around the main performance signal",
      "Area with confidence envelope storytelling"
    ]
  },
  {
    "name": "bar-confidence-envelope",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.area"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Confidence envelope around the main performance signal",
      "Bar with confidence envelope storytelling"
    ]
  },
  {
    "name": "box-plot-confidence-envelope",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Quartile variance analysis",
      "Confidence envelope around the main performance signal",
      "Box Plot with confidence envelope storytelling"
    ]
  },
  {
    "name": "bubble-confidence-envelope",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.area"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Confidence envelope around the main performance signal",
      "Bubble with confidence envelope storytelling"
    ]
  },
  {
    "name": "candlestick-confidence-envelope",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Confidence envelope around the main performance signal",
      "Candlestick with confidence envelope storytelling"
    ]
  },
  {
    "name": "combo-confidence-envelope",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Confidence envelope around the main performance signal",
      "Combo with confidence envelope storytelling"
    ]
  },
  {
    "name": "funnel-confidence-envelope",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.area"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Confidence envelope around the main performance signal",
      "Funnel with confidence envelope storytelling"
    ]
  },
  {
    "name": "grouped-bar-confidence-envelope",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Team by quarter",
      "Confidence envelope around the main performance signal",
      "Grouped Bar with confidence envelope storytelling"
    ]
  },
  {
    "name": "heatmap-confidence-envelope",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.area"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Confidence envelope around the main performance signal",
      "Heatmap with confidence envelope storytelling"
    ]
  },
  {
    "name": "histogram-confidence-envelope",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Latency histogram",
      "Confidence envelope around the main performance signal",
      "Histogram with confidence envelope storytelling"
    ]
  },
  {
    "name": "line-confidence-envelope",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Confidence envelope around the main performance signal",
      "Line with confidence envelope storytelling"
    ]
  },
  {
    "name": "network-confidence-envelope",
    "family": "network",
    "description": "Force-directed node-link graph. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.area"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Confidence envelope around the main performance signal",
      "Network with confidence envelope storytelling"
    ]
  },
  {
    "name": "pie-confidence-envelope",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Regional share",
      "Confidence envelope around the main performance signal",
      "Pie with confidence envelope storytelling"
    ]
  },
  {
    "name": "radar-confidence-envelope",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.area"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Capability heat score",
      "Confidence envelope around the main performance signal",
      "Radar with confidence envelope storytelling"
    ]
  },
  {
    "name": "scatter-confidence-envelope",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Feature correlation",
      "Confidence envelope around the main performance signal",
      "Scatter with confidence envelope storytelling"
    ]
  },
  {
    "name": "sankey-confidence-envelope",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.area"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Visitor conversion flow",
      "Confidence envelope around the main performance signal",
      "Sankey with confidence envelope storytelling"
    ]
  },
  {
    "name": "stacked-bar-confidence-envelope",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Regional contribution",
      "Confidence envelope around the main performance signal",
      "Stacked Bar with confidence envelope storytelling"
    ]
  },
  {
    "name": "treemap-confidence-envelope",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Storage allocation by category",
      "Confidence envelope around the main performance signal",
      "Treemap with confidence envelope storytelling"
    ]
  },
  {
    "name": "waterfall-confidence-envelope",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Budget to actual variance",
      "Confidence envelope around the main performance signal",
      "Waterfall with confidence envelope storytelling"
    ]
  },
  {
    "name": "donut-confidence-envelope",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Confidence Envelope variant). Adds upper and lower confidence bounds around the primary signal while preserving the original mark language.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "confidence-envelope"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.area"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Best for teams that need a reliability story, not just a central value."
    ],
    "examples": [
      "Traffic channel share",
      "Confidence envelope around the main performance signal",
      "Donut with confidence envelope storytelling"
    ]
  },
  {
    "name": "area-rolling-window",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Rolling window view with seven-step smoothing",
      "Area with rolling window storytelling"
    ]
  },
  {
    "name": "bar-rolling-window",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Rolling window view with seven-step smoothing",
      "Bar with rolling window storytelling"
    ]
  },
  {
    "name": "box-plot-rolling-window",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Quartile variance analysis",
      "Rolling window view with seven-step smoothing",
      "Box Plot with rolling window storytelling"
    ]
  },
  {
    "name": "bubble-rolling-window",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Rolling window view with seven-step smoothing",
      "Bubble with rolling window storytelling"
    ]
  },
  {
    "name": "candlestick-rolling-window",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Rolling window view with seven-step smoothing",
      "Candlestick with rolling window storytelling"
    ]
  },
  {
    "name": "combo-rolling-window",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Rolling window view with seven-step smoothing",
      "Combo with rolling window storytelling"
    ]
  },
  {
    "name": "funnel-rolling-window",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Rolling window view with seven-step smoothing",
      "Funnel with rolling window storytelling"
    ]
  },
  {
    "name": "grouped-bar-rolling-window",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Team by quarter",
      "Rolling window view with seven-step smoothing",
      "Grouped Bar with rolling window storytelling"
    ]
  },
  {
    "name": "heatmap-rolling-window",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Rolling window view with seven-step smoothing",
      "Heatmap with rolling window storytelling"
    ]
  },
  {
    "name": "histogram-rolling-window",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Latency histogram",
      "Rolling window view with seven-step smoothing",
      "Histogram with rolling window storytelling"
    ]
  },
  {
    "name": "line-rolling-window",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Rolling window view with seven-step smoothing",
      "Line with rolling window storytelling"
    ]
  },
  {
    "name": "network-rolling-window",
    "family": "network",
    "description": "Force-directed node-link graph. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "grid"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Rolling window view with seven-step smoothing",
      "Network with rolling window storytelling"
    ]
  },
  {
    "name": "pie-rolling-window",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Regional share",
      "Rolling window view with seven-step smoothing",
      "Pie with rolling window storytelling"
    ]
  },
  {
    "name": "radar-rolling-window",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Capability heat score",
      "Rolling window view with seven-step smoothing",
      "Radar with rolling window storytelling"
    ]
  },
  {
    "name": "scatter-rolling-window",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Feature correlation",
      "Rolling window view with seven-step smoothing",
      "Scatter with rolling window storytelling"
    ]
  },
  {
    "name": "sankey-rolling-window",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Visitor conversion flow",
      "Rolling window view with seven-step smoothing",
      "Sankey with rolling window storytelling"
    ]
  },
  {
    "name": "stacked-bar-rolling-window",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Regional contribution",
      "Rolling window view with seven-step smoothing",
      "Stacked Bar with rolling window storytelling"
    ]
  },
  {
    "name": "treemap-rolling-window",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Storage allocation by category",
      "Rolling window view with seven-step smoothing",
      "Treemap with rolling window storytelling"
    ]
  },
  {
    "name": "waterfall-rolling-window",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Budget to actual variance",
      "Rolling window view with seven-step smoothing",
      "Waterfall with rolling window storytelling"
    ]
  },
  {
    "name": "donut-rolling-window",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Rolling Window variant). Applies moving-window smoothing, rolling aggregates, and localized trend interpretation.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "rolling-window"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when raw values are noisy but the short-term trend matters."
    ],
    "examples": [
      "Traffic channel share",
      "Rolling window view with seven-step smoothing",
      "Donut with rolling window storytelling"
    ]
  },
  {
    "name": "area-benchmark-lanes",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.line"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Benchmark lanes for target, warning, and stretch zones",
      "Area with benchmark lanes storytelling"
    ]
  },
  {
    "name": "bar-benchmark-lanes",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.line"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Benchmark lanes for target, warning, and stretch zones",
      "Bar with benchmark lanes storytelling"
    ]
  },
  {
    "name": "box-plot-benchmark-lanes",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Quartile variance analysis",
      "Benchmark lanes for target, warning, and stretch zones",
      "Box Plot with benchmark lanes storytelling"
    ]
  },
  {
    "name": "bubble-benchmark-lanes",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.line"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Benchmark lanes for target, warning, and stretch zones",
      "Bubble with benchmark lanes storytelling"
    ]
  },
  {
    "name": "candlestick-benchmark-lanes",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Benchmark lanes for target, warning, and stretch zones",
      "Candlestick with benchmark lanes storytelling"
    ]
  },
  {
    "name": "combo-benchmark-lanes",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Benchmark lanes for target, warning, and stretch zones",
      "Combo with benchmark lanes storytelling"
    ]
  },
  {
    "name": "funnel-benchmark-lanes",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.line"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Benchmark lanes for target, warning, and stretch zones",
      "Funnel with benchmark lanes storytelling"
    ]
  },
  {
    "name": "grouped-bar-benchmark-lanes",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Team by quarter",
      "Benchmark lanes for target, warning, and stretch zones",
      "Grouped Bar with benchmark lanes storytelling"
    ]
  },
  {
    "name": "heatmap-benchmark-lanes",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.line"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Benchmark lanes for target, warning, and stretch zones",
      "Heatmap with benchmark lanes storytelling"
    ]
  },
  {
    "name": "histogram-benchmark-lanes",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Latency histogram",
      "Benchmark lanes for target, warning, and stretch zones",
      "Histogram with benchmark lanes storytelling"
    ]
  },
  {
    "name": "line-benchmark-lanes",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Benchmark lanes for target, warning, and stretch zones",
      "Line with benchmark lanes storytelling"
    ]
  },
  {
    "name": "network-benchmark-lanes",
    "family": "network",
    "description": "Force-directed node-link graph. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.line"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Benchmark lanes for target, warning, and stretch zones",
      "Network with benchmark lanes storytelling"
    ]
  },
  {
    "name": "pie-benchmark-lanes",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Regional share",
      "Benchmark lanes for target, warning, and stretch zones",
      "Pie with benchmark lanes storytelling"
    ]
  },
  {
    "name": "radar-benchmark-lanes",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.line"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Capability heat score",
      "Benchmark lanes for target, warning, and stretch zones",
      "Radar with benchmark lanes storytelling"
    ]
  },
  {
    "name": "scatter-benchmark-lanes",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Feature correlation",
      "Benchmark lanes for target, warning, and stretch zones",
      "Scatter with benchmark lanes storytelling"
    ]
  },
  {
    "name": "sankey-benchmark-lanes",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.line"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Visitor conversion flow",
      "Benchmark lanes for target, warning, and stretch zones",
      "Sankey with benchmark lanes storytelling"
    ]
  },
  {
    "name": "stacked-bar-benchmark-lanes",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Regional contribution",
      "Benchmark lanes for target, warning, and stretch zones",
      "Stacked Bar with benchmark lanes storytelling"
    ]
  },
  {
    "name": "treemap-benchmark-lanes",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Storage allocation by category",
      "Benchmark lanes for target, warning, and stretch zones",
      "Treemap with benchmark lanes storytelling"
    ]
  },
  {
    "name": "waterfall-benchmark-lanes",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Budget to actual variance",
      "Benchmark lanes for target, warning, and stretch zones",
      "Waterfall with benchmark lanes storytelling"
    ]
  },
  {
    "name": "donut-benchmark-lanes",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Benchmark Lanes variant). Places the primary series against explicit target lanes, benchmark bands, and operational tolerance zones.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "benchmark-lanes"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Strong fit for KPI dashboards and executive scorecards."
    ],
    "examples": [
      "Traffic channel share",
      "Benchmark lanes for target, warning, and stretch zones",
      "Donut with benchmark lanes storytelling"
    ]
  },
  {
    "name": "area-threshold-alert",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.line"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Threshold alert view showing breach and recovery intervals",
      "Area with threshold alert storytelling"
    ]
  },
  {
    "name": "bar-threshold-alert",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.line"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Threshold alert view showing breach and recovery intervals",
      "Bar with threshold alert storytelling"
    ]
  },
  {
    "name": "box-plot-threshold-alert",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Quartile variance analysis",
      "Threshold alert view showing breach and recovery intervals",
      "Box Plot with threshold alert storytelling"
    ]
  },
  {
    "name": "bubble-threshold-alert",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.line"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Threshold alert view showing breach and recovery intervals",
      "Bubble with threshold alert storytelling"
    ]
  },
  {
    "name": "candlestick-threshold-alert",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Threshold alert view showing breach and recovery intervals",
      "Candlestick with threshold alert storytelling"
    ]
  },
  {
    "name": "combo-threshold-alert",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Threshold alert view showing breach and recovery intervals",
      "Combo with threshold alert storytelling"
    ]
  },
  {
    "name": "funnel-threshold-alert",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.line"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Threshold alert view showing breach and recovery intervals",
      "Funnel with threshold alert storytelling"
    ]
  },
  {
    "name": "grouped-bar-threshold-alert",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Team by quarter",
      "Threshold alert view showing breach and recovery intervals",
      "Grouped Bar with threshold alert storytelling"
    ]
  },
  {
    "name": "heatmap-threshold-alert",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.line"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Threshold alert view showing breach and recovery intervals",
      "Heatmap with threshold alert storytelling"
    ]
  },
  {
    "name": "histogram-threshold-alert",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Latency histogram",
      "Threshold alert view showing breach and recovery intervals",
      "Histogram with threshold alert storytelling"
    ]
  },
  {
    "name": "line-threshold-alert",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Threshold alert view showing breach and recovery intervals",
      "Line with threshold alert storytelling"
    ]
  },
  {
    "name": "network-threshold-alert",
    "family": "network",
    "description": "Force-directed node-link graph. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.line"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Threshold alert view showing breach and recovery intervals",
      "Network with threshold alert storytelling"
    ]
  },
  {
    "name": "pie-threshold-alert",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Regional share",
      "Threshold alert view showing breach and recovery intervals",
      "Pie with threshold alert storytelling"
    ]
  },
  {
    "name": "radar-threshold-alert",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.line"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Capability heat score",
      "Threshold alert view showing breach and recovery intervals",
      "Radar with threshold alert storytelling"
    ]
  },
  {
    "name": "scatter-threshold-alert",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Feature correlation",
      "Threshold alert view showing breach and recovery intervals",
      "Scatter with threshold alert storytelling"
    ]
  },
  {
    "name": "sankey-threshold-alert",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.line"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Visitor conversion flow",
      "Threshold alert view showing breach and recovery intervals",
      "Sankey with threshold alert storytelling"
    ]
  },
  {
    "name": "stacked-bar-threshold-alert",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Regional contribution",
      "Threshold alert view showing breach and recovery intervals",
      "Stacked Bar with threshold alert storytelling"
    ]
  },
  {
    "name": "treemap-threshold-alert",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Storage allocation by category",
      "Threshold alert view showing breach and recovery intervals",
      "Treemap with threshold alert storytelling"
    ]
  },
  {
    "name": "waterfall-threshold-alert",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Budget to actual variance",
      "Threshold alert view showing breach and recovery intervals",
      "Waterfall with threshold alert storytelling"
    ]
  },
  {
    "name": "donut-threshold-alert",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Threshold Alert variant). Emphasizes crossing points, hard limits, and alert thresholds with stronger visual escalation.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "threshold-alert"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Ideal when the key story is whether something crossed a policy line."
    ],
    "examples": [
      "Traffic channel share",
      "Threshold alert view showing breach and recovery intervals",
      "Donut with threshold alert storytelling"
    ]
  },
  {
    "name": "area-comparison-grid",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Comparison grid for current, previous, and target states",
      "Area with comparison grid storytelling"
    ]
  },
  {
    "name": "bar-comparison-grid",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Comparison grid for current, previous, and target states",
      "Bar with comparison grid storytelling"
    ]
  },
  {
    "name": "box-plot-comparison-grid",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Quartile variance analysis",
      "Comparison grid for current, previous, and target states",
      "Box Plot with comparison grid storytelling"
    ]
  },
  {
    "name": "bubble-comparison-grid",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Comparison grid for current, previous, and target states",
      "Bubble with comparison grid storytelling"
    ]
  },
  {
    "name": "candlestick-comparison-grid",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Comparison grid for current, previous, and target states",
      "Candlestick with comparison grid storytelling"
    ]
  },
  {
    "name": "combo-comparison-grid",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Comparison grid for current, previous, and target states",
      "Combo with comparison grid storytelling"
    ]
  },
  {
    "name": "funnel-comparison-grid",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Comparison grid for current, previous, and target states",
      "Funnel with comparison grid storytelling"
    ]
  },
  {
    "name": "grouped-bar-comparison-grid",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Team by quarter",
      "Comparison grid for current, previous, and target states",
      "Grouped Bar with comparison grid storytelling"
    ]
  },
  {
    "name": "heatmap-comparison-grid",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Comparison grid for current, previous, and target states",
      "Heatmap with comparison grid storytelling"
    ]
  },
  {
    "name": "histogram-comparison-grid",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Latency histogram",
      "Comparison grid for current, previous, and target states",
      "Histogram with comparison grid storytelling"
    ]
  },
  {
    "name": "line-comparison-grid",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Comparison grid for current, previous, and target states",
      "Line with comparison grid storytelling"
    ]
  },
  {
    "name": "network-comparison-grid",
    "family": "network",
    "description": "Force-directed node-link graph. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Comparison grid for current, previous, and target states",
      "Network with comparison grid storytelling"
    ]
  },
  {
    "name": "pie-comparison-grid",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Regional share",
      "Comparison grid for current, previous, and target states",
      "Pie with comparison grid storytelling"
    ]
  },
  {
    "name": "radar-comparison-grid",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Capability heat score",
      "Comparison grid for current, previous, and target states",
      "Radar with comparison grid storytelling"
    ]
  },
  {
    "name": "scatter-comparison-grid",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Feature correlation",
      "Comparison grid for current, previous, and target states",
      "Scatter with comparison grid storytelling"
    ]
  },
  {
    "name": "sankey-comparison-grid",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Visitor conversion flow",
      "Comparison grid for current, previous, and target states",
      "Sankey with comparison grid storytelling"
    ]
  },
  {
    "name": "stacked-bar-comparison-grid",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Regional contribution",
      "Comparison grid for current, previous, and target states",
      "Stacked Bar with comparison grid storytelling"
    ]
  },
  {
    "name": "treemap-comparison-grid",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Storage allocation by category",
      "Comparison grid for current, previous, and target states",
      "Treemap with comparison grid storytelling"
    ]
  },
  {
    "name": "waterfall-comparison-grid",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Budget to actual variance",
      "Comparison grid for current, previous, and target states",
      "Waterfall with comparison grid storytelling"
    ]
  },
  {
    "name": "donut-comparison-grid",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Comparison Grid variant). Frames the chart as a side-by-side comparison surface with stronger category alignment and scenario contrast.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "comparison-grid"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.groupSort"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use for board reviews and before-versus-after reporting."
    ],
    "examples": [
      "Traffic channel share",
      "Comparison grid for current, previous, and target states",
      "Donut with comparison grid storytelling"
    ]
  },
  {
    "name": "area-scenario-planner",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Scenario planner for best case, base case, and downside assumptions",
      "Area with scenario planner storytelling"
    ]
  },
  {
    "name": "bar-scenario-planner",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Scenario planner for best case, base case, and downside assumptions",
      "Bar with scenario planner storytelling"
    ]
  },
  {
    "name": "box-plot-scenario-planner",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Quartile variance analysis",
      "Scenario planner for best case, base case, and downside assumptions",
      "Box Plot with scenario planner storytelling"
    ]
  },
  {
    "name": "bubble-scenario-planner",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Scenario planner for best case, base case, and downside assumptions",
      "Bubble with scenario planner storytelling"
    ]
  },
  {
    "name": "candlestick-scenario-planner",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Scenario planner for best case, base case, and downside assumptions",
      "Candlestick with scenario planner storytelling"
    ]
  },
  {
    "name": "combo-scenario-planner",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Scenario planner for best case, base case, and downside assumptions",
      "Combo with scenario planner storytelling"
    ]
  },
  {
    "name": "funnel-scenario-planner",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Scenario planner for best case, base case, and downside assumptions",
      "Funnel with scenario planner storytelling"
    ]
  },
  {
    "name": "grouped-bar-scenario-planner",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Team by quarter",
      "Scenario planner for best case, base case, and downside assumptions",
      "Grouped Bar with scenario planner storytelling"
    ]
  },
  {
    "name": "heatmap-scenario-planner",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Scenario planner for best case, base case, and downside assumptions",
      "Heatmap with scenario planner storytelling"
    ]
  },
  {
    "name": "histogram-scenario-planner",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Latency histogram",
      "Scenario planner for best case, base case, and downside assumptions",
      "Histogram with scenario planner storytelling"
    ]
  },
  {
    "name": "line-scenario-planner",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Scenario planner for best case, base case, and downside assumptions",
      "Line with scenario planner storytelling"
    ]
  },
  {
    "name": "network-scenario-planner",
    "family": "network",
    "description": "Force-directed node-link graph. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Scenario planner for best case, base case, and downside assumptions",
      "Network with scenario planner storytelling"
    ]
  },
  {
    "name": "pie-scenario-planner",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Regional share",
      "Scenario planner for best case, base case, and downside assumptions",
      "Pie with scenario planner storytelling"
    ]
  },
  {
    "name": "radar-scenario-planner",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Capability heat score",
      "Scenario planner for best case, base case, and downside assumptions",
      "Radar with scenario planner storytelling"
    ]
  },
  {
    "name": "scatter-scenario-planner",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Feature correlation",
      "Scenario planner for best case, base case, and downside assumptions",
      "Scatter with scenario planner storytelling"
    ]
  },
  {
    "name": "sankey-scenario-planner",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Visitor conversion flow",
      "Scenario planner for best case, base case, and downside assumptions",
      "Sankey with scenario planner storytelling"
    ]
  },
  {
    "name": "stacked-bar-scenario-planner",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Regional contribution",
      "Scenario planner for best case, base case, and downside assumptions",
      "Stacked Bar with scenario planner storytelling"
    ]
  },
  {
    "name": "treemap-scenario-planner",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Storage allocation by category",
      "Scenario planner for best case, base case, and downside assumptions",
      "Treemap with scenario planner storytelling"
    ]
  },
  {
    "name": "waterfall-scenario-planner",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Budget to actual variance",
      "Scenario planner for best case, base case, and downside assumptions",
      "Waterfall with scenario planner storytelling"
    ]
  },
  {
    "name": "donut-scenario-planner",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Scenario Planner variant). Packages the chart for planning workflows with explicit scenario branches and alternate state reasoning.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "scenario-planner"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Great for roadmap planning and operational simulations."
    ],
    "examples": [
      "Traffic channel share",
      "Scenario planner for best case, base case, and downside assumptions",
      "Donut with scenario planner storytelling"
    ]
  },
  {
    "name": "area-small-multiples",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.group"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Small multiples split by segment, region, or owner",
      "Area with small multiples storytelling"
    ]
  },
  {
    "name": "bar-small-multiples",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.group"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Small multiples split by segment, region, or owner",
      "Bar with small multiples storytelling"
    ]
  },
  {
    "name": "box-plot-small-multiples",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Quartile variance analysis",
      "Small multiples split by segment, region, or owner",
      "Box Plot with small multiples storytelling"
    ]
  },
  {
    "name": "bubble-small-multiples",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.group"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Small multiples split by segment, region, or owner",
      "Bubble with small multiples storytelling"
    ]
  },
  {
    "name": "candlestick-small-multiples",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Small multiples split by segment, region, or owner",
      "Candlestick with small multiples storytelling"
    ]
  },
  {
    "name": "combo-small-multiples",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Small multiples split by segment, region, or owner",
      "Combo with small multiples storytelling"
    ]
  },
  {
    "name": "funnel-small-multiples",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.group"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Small multiples split by segment, region, or owner",
      "Funnel with small multiples storytelling"
    ]
  },
  {
    "name": "grouped-bar-small-multiples",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Team by quarter",
      "Small multiples split by segment, region, or owner",
      "Grouped Bar with small multiples storytelling"
    ]
  },
  {
    "name": "heatmap-small-multiples",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.group"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Small multiples split by segment, region, or owner",
      "Heatmap with small multiples storytelling"
    ]
  },
  {
    "name": "histogram-small-multiples",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Latency histogram",
      "Small multiples split by segment, region, or owner",
      "Histogram with small multiples storytelling"
    ]
  },
  {
    "name": "line-small-multiples",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Small multiples split by segment, region, or owner",
      "Line with small multiples storytelling"
    ]
  },
  {
    "name": "network-small-multiples",
    "family": "network",
    "description": "Force-directed node-link graph. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.group"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Small multiples split by segment, region, or owner",
      "Network with small multiples storytelling"
    ]
  },
  {
    "name": "pie-small-multiples",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Regional share",
      "Small multiples split by segment, region, or owner",
      "Pie with small multiples storytelling"
    ]
  },
  {
    "name": "radar-small-multiples",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.group"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Capability heat score",
      "Small multiples split by segment, region, or owner",
      "Radar with small multiples storytelling"
    ]
  },
  {
    "name": "scatter-small-multiples",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Feature correlation",
      "Small multiples split by segment, region, or owner",
      "Scatter with small multiples storytelling"
    ]
  },
  {
    "name": "sankey-small-multiples",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.group"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Visitor conversion flow",
      "Small multiples split by segment, region, or owner",
      "Sankey with small multiples storytelling"
    ]
  },
  {
    "name": "stacked-bar-small-multiples",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Regional contribution",
      "Small multiples split by segment, region, or owner",
      "Stacked Bar with small multiples storytelling"
    ]
  },
  {
    "name": "treemap-small-multiples",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Storage allocation by category",
      "Small multiples split by segment, region, or owner",
      "Treemap with small multiples storytelling"
    ]
  },
  {
    "name": "waterfall-small-multiples",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Budget to actual variance",
      "Small multiples split by segment, region, or owner",
      "Waterfall with small multiples storytelling"
    ]
  },
  {
    "name": "donut-small-multiples",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Small Multiples variant). Converts the base story into a repeated comparative lens for scanning many related subsets quickly.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "small-multiples"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.group"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Useful when one chart is too dense but the structure should stay familiar."
    ],
    "examples": [
      "Traffic channel share",
      "Small multiples split by segment, region, or owner",
      "Donut with small multiples storytelling"
    ]
  },
  {
    "name": "area-event-overlay",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Event overlay showing launches, outages, and intervention markers",
      "Area with event overlay storytelling"
    ]
  },
  {
    "name": "bar-event-overlay",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Event overlay showing launches, outages, and intervention markers",
      "Bar with event overlay storytelling"
    ]
  },
  {
    "name": "box-plot-event-overlay",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Quartile variance analysis",
      "Event overlay showing launches, outages, and intervention markers",
      "Box Plot with event overlay storytelling"
    ]
  },
  {
    "name": "bubble-event-overlay",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Event overlay showing launches, outages, and intervention markers",
      "Bubble with event overlay storytelling"
    ]
  },
  {
    "name": "candlestick-event-overlay",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Event overlay showing launches, outages, and intervention markers",
      "Candlestick with event overlay storytelling"
    ]
  },
  {
    "name": "combo-event-overlay",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Event overlay showing launches, outages, and intervention markers",
      "Combo with event overlay storytelling"
    ]
  },
  {
    "name": "funnel-event-overlay",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Event overlay showing launches, outages, and intervention markers",
      "Funnel with event overlay storytelling"
    ]
  },
  {
    "name": "grouped-bar-event-overlay",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Team by quarter",
      "Event overlay showing launches, outages, and intervention markers",
      "Grouped Bar with event overlay storytelling"
    ]
  },
  {
    "name": "heatmap-event-overlay",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Event overlay showing launches, outages, and intervention markers",
      "Heatmap with event overlay storytelling"
    ]
  },
  {
    "name": "histogram-event-overlay",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Latency histogram",
      "Event overlay showing launches, outages, and intervention markers",
      "Histogram with event overlay storytelling"
    ]
  },
  {
    "name": "line-event-overlay",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Event overlay showing launches, outages, and intervention markers",
      "Line with event overlay storytelling"
    ]
  },
  {
    "name": "network-event-overlay",
    "family": "network",
    "description": "Force-directed node-link graph. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Event overlay showing launches, outages, and intervention markers",
      "Network with event overlay storytelling"
    ]
  },
  {
    "name": "pie-event-overlay",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Regional share",
      "Event overlay showing launches, outages, and intervention markers",
      "Pie with event overlay storytelling"
    ]
  },
  {
    "name": "radar-event-overlay",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "event-overlay"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Capability heat score",
      "Event overlay showing launches, outages, and intervention markers",
      "Radar with event overlay storytelling"
    ]
  },
  {
    "name": "scatter-event-overlay",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Feature correlation",
      "Event overlay showing launches, outages, and intervention markers",
      "Scatter with event overlay storytelling"
    ]
  },
  {
    "name": "sankey-event-overlay",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Visitor conversion flow",
      "Event overlay showing launches, outages, and intervention markers",
      "Sankey with event overlay storytelling"
    ]
  },
  {
    "name": "stacked-bar-event-overlay",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Regional contribution",
      "Event overlay showing launches, outages, and intervention markers",
      "Stacked Bar with event overlay storytelling"
    ]
  },
  {
    "name": "treemap-event-overlay",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Storage allocation by category",
      "Event overlay showing launches, outages, and intervention markers",
      "Treemap with event overlay storytelling"
    ]
  },
  {
    "name": "waterfall-event-overlay",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Budget to actual variance",
      "Event overlay showing launches, outages, and intervention markers",
      "Waterfall with event overlay storytelling"
    ]
  },
  {
    "name": "donut-event-overlay",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Event Overlay variant). Layers release markers, incidents, milestones, or external events directly into the chart narrative.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "event-overlay"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.annotation"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when operational context matters as much as the raw metric."
    ],
    "examples": [
      "Traffic channel share",
      "Event overlay showing launches, outages, and intervention markers",
      "Donut with event overlay storytelling"
    ]
  },
  {
    "name": "area-cohort-breakdown",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.stack"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Cohort breakdown across signup month or adoption stage",
      "Area with cohort breakdown storytelling"
    ]
  },
  {
    "name": "bar-cohort-breakdown",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.stack"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Cohort breakdown across signup month or adoption stage",
      "Bar with cohort breakdown storytelling"
    ]
  },
  {
    "name": "box-plot-cohort-breakdown",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Quartile variance analysis",
      "Cohort breakdown across signup month or adoption stage",
      "Box Plot with cohort breakdown storytelling"
    ]
  },
  {
    "name": "bubble-cohort-breakdown",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.stack"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Cohort breakdown across signup month or adoption stage",
      "Bubble with cohort breakdown storytelling"
    ]
  },
  {
    "name": "candlestick-cohort-breakdown",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Cohort breakdown across signup month or adoption stage",
      "Candlestick with cohort breakdown storytelling"
    ]
  },
  {
    "name": "combo-cohort-breakdown",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Cohort breakdown across signup month or adoption stage",
      "Combo with cohort breakdown storytelling"
    ]
  },
  {
    "name": "funnel-cohort-breakdown",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.stack"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Cohort breakdown across signup month or adoption stage",
      "Funnel with cohort breakdown storytelling"
    ]
  },
  {
    "name": "grouped-bar-cohort-breakdown",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Team by quarter",
      "Cohort breakdown across signup month or adoption stage",
      "Grouped Bar with cohort breakdown storytelling"
    ]
  },
  {
    "name": "heatmap-cohort-breakdown",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.stack"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Cohort breakdown across signup month or adoption stage",
      "Heatmap with cohort breakdown storytelling"
    ]
  },
  {
    "name": "histogram-cohort-breakdown",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Latency histogram",
      "Cohort breakdown across signup month or adoption stage",
      "Histogram with cohort breakdown storytelling"
    ]
  },
  {
    "name": "line-cohort-breakdown",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Cohort breakdown across signup month or adoption stage",
      "Line with cohort breakdown storytelling"
    ]
  },
  {
    "name": "network-cohort-breakdown",
    "family": "network",
    "description": "Force-directed node-link graph. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.stack"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Cohort breakdown across signup month or adoption stage",
      "Network with cohort breakdown storytelling"
    ]
  },
  {
    "name": "pie-cohort-breakdown",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Regional share",
      "Cohort breakdown across signup month or adoption stage",
      "Pie with cohort breakdown storytelling"
    ]
  },
  {
    "name": "radar-cohort-breakdown",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.stack"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Capability heat score",
      "Cohort breakdown across signup month or adoption stage",
      "Radar with cohort breakdown storytelling"
    ]
  },
  {
    "name": "scatter-cohort-breakdown",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Feature correlation",
      "Cohort breakdown across signup month or adoption stage",
      "Scatter with cohort breakdown storytelling"
    ]
  },
  {
    "name": "sankey-cohort-breakdown",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.stack"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Visitor conversion flow",
      "Cohort breakdown across signup month or adoption stage",
      "Sankey with cohort breakdown storytelling"
    ]
  },
  {
    "name": "stacked-bar-cohort-breakdown",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Regional contribution",
      "Cohort breakdown across signup month or adoption stage",
      "Stacked Bar with cohort breakdown storytelling"
    ]
  },
  {
    "name": "treemap-cohort-breakdown",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Storage allocation by category",
      "Cohort breakdown across signup month or adoption stage",
      "Treemap with cohort breakdown storytelling"
    ]
  },
  {
    "name": "waterfall-cohort-breakdown",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Budget to actual variance",
      "Cohort breakdown across signup month or adoption stage",
      "Waterfall with cohort breakdown storytelling"
    ]
  },
  {
    "name": "donut-cohort-breakdown",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Cohort Breakdown variant). Reorients the chart toward retention, aging, or grouped lifecycle comparisons.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "cohort-breakdown"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.stack"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Useful for growth, product analytics, and lifecycle operations."
    ],
    "examples": [
      "Traffic channel share",
      "Cohort breakdown across signup month or adoption stage",
      "Donut with cohort breakdown storytelling"
    ]
  },
  {
    "name": "area-quantile-layers",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Area with quantile layers storytelling"
    ]
  },
  {
    "name": "bar-quantile-layers",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Bar with quantile layers storytelling"
    ]
  },
  {
    "name": "box-plot-quantile-layers",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Quartile variance analysis",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Box Plot with quantile layers storytelling"
    ]
  },
  {
    "name": "bubble-quantile-layers",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Bubble with quantile layers storytelling"
    ]
  },
  {
    "name": "candlestick-quantile-layers",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Candlestick with quantile layers storytelling"
    ]
  },
  {
    "name": "combo-quantile-layers",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Combo with quantile layers storytelling"
    ]
  },
  {
    "name": "funnel-quantile-layers",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Funnel with quantile layers storytelling"
    ]
  },
  {
    "name": "grouped-bar-quantile-layers",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Team by quarter",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Grouped Bar with quantile layers storytelling"
    ]
  },
  {
    "name": "heatmap-quantile-layers",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Heatmap with quantile layers storytelling"
    ]
  },
  {
    "name": "histogram-quantile-layers",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Latency histogram",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Histogram with quantile layers storytelling"
    ]
  },
  {
    "name": "line-quantile-layers",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Line with quantile layers storytelling"
    ]
  },
  {
    "name": "network-quantile-layers",
    "family": "network",
    "description": "Force-directed node-link graph. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Network with quantile layers storytelling"
    ]
  },
  {
    "name": "pie-quantile-layers",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Regional share",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Pie with quantile layers storytelling"
    ]
  },
  {
    "name": "radar-quantile-layers",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Capability heat score",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Radar with quantile layers storytelling"
    ]
  },
  {
    "name": "scatter-quantile-layers",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Feature correlation",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Scatter with quantile layers storytelling"
    ]
  },
  {
    "name": "sankey-quantile-layers",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Visitor conversion flow",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Sankey with quantile layers storytelling"
    ]
  },
  {
    "name": "stacked-bar-quantile-layers",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Regional contribution",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Stacked Bar with quantile layers storytelling"
    ]
  },
  {
    "name": "treemap-quantile-layers",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Storage allocation by category",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Treemap with quantile layers storytelling"
    ]
  },
  {
    "name": "waterfall-quantile-layers",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Budget to actual variance",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Waterfall with quantile layers storytelling"
    ]
  },
  {
    "name": "donut-quantile-layers",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Quantile Layers variant). Adds quantile bands, percentile context, and layered distribution reading to the base chart.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "quantile-layers"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.quantile"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when averages are too blunt and spread matters."
    ],
    "examples": [
      "Traffic channel share",
      "Quantile layers showing median, interquartile, and tail behavior",
      "Donut with quantile layers storytelling"
    ]
  },
  {
    "name": "area-distribution-focus",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.bin"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Distribution-focused lens highlighting skew and density pockets",
      "Area with distribution focus storytelling"
    ]
  },
  {
    "name": "bar-distribution-focus",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.bin"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Distribution-focused lens highlighting skew and density pockets",
      "Bar with distribution focus storytelling"
    ]
  },
  {
    "name": "box-plot-distribution-focus",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Quartile variance analysis",
      "Distribution-focused lens highlighting skew and density pockets",
      "Box Plot with distribution focus storytelling"
    ]
  },
  {
    "name": "bubble-distribution-focus",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.bin"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Distribution-focused lens highlighting skew and density pockets",
      "Bubble with distribution focus storytelling"
    ]
  },
  {
    "name": "candlestick-distribution-focus",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Distribution-focused lens highlighting skew and density pockets",
      "Candlestick with distribution focus storytelling"
    ]
  },
  {
    "name": "combo-distribution-focus",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Distribution-focused lens highlighting skew and density pockets",
      "Combo with distribution focus storytelling"
    ]
  },
  {
    "name": "funnel-distribution-focus",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.bin"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Distribution-focused lens highlighting skew and density pockets",
      "Funnel with distribution focus storytelling"
    ]
  },
  {
    "name": "grouped-bar-distribution-focus",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Team by quarter",
      "Distribution-focused lens highlighting skew and density pockets",
      "Grouped Bar with distribution focus storytelling"
    ]
  },
  {
    "name": "heatmap-distribution-focus",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.bin"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Distribution-focused lens highlighting skew and density pockets",
      "Heatmap with distribution focus storytelling"
    ]
  },
  {
    "name": "histogram-distribution-focus",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Latency histogram",
      "Distribution-focused lens highlighting skew and density pockets",
      "Histogram with distribution focus storytelling"
    ]
  },
  {
    "name": "line-distribution-focus",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Distribution-focused lens highlighting skew and density pockets",
      "Line with distribution focus storytelling"
    ]
  },
  {
    "name": "network-distribution-focus",
    "family": "network",
    "description": "Force-directed node-link graph. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "brush"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "grid"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.bin"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Distribution-focused lens highlighting skew and density pockets",
      "Network with distribution focus storytelling"
    ]
  },
  {
    "name": "pie-distribution-focus",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Regional share",
      "Distribution-focused lens highlighting skew and density pockets",
      "Pie with distribution focus storytelling"
    ]
  },
  {
    "name": "radar-distribution-focus",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.bin"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Capability heat score",
      "Distribution-focused lens highlighting skew and density pockets",
      "Radar with distribution focus storytelling"
    ]
  },
  {
    "name": "scatter-distribution-focus",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Feature correlation",
      "Distribution-focused lens highlighting skew and density pockets",
      "Scatter with distribution focus storytelling"
    ]
  },
  {
    "name": "sankey-distribution-focus",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.bin"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Visitor conversion flow",
      "Distribution-focused lens highlighting skew and density pockets",
      "Sankey with distribution focus storytelling"
    ]
  },
  {
    "name": "stacked-bar-distribution-focus",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Regional contribution",
      "Distribution-focused lens highlighting skew and density pockets",
      "Stacked Bar with distribution focus storytelling"
    ]
  },
  {
    "name": "treemap-distribution-focus",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "brush"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Storage allocation by category",
      "Distribution-focused lens highlighting skew and density pockets",
      "Treemap with distribution focus storytelling"
    ]
  },
  {
    "name": "waterfall-distribution-focus",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Budget to actual variance",
      "Distribution-focused lens highlighting skew and density pockets",
      "Waterfall with distribution focus storytelling"
    ]
  },
  {
    "name": "donut-distribution-focus",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Distribution Focus variant). Shifts emphasis toward tails, skew, clustering, and shape while staying inside the original chart family.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "distribution-focus"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.bin"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Helpful for quality control and behavioral analysis."
    ],
    "examples": [
      "Traffic channel share",
      "Distribution-focused lens highlighting skew and density pockets",
      "Donut with distribution focus storytelling"
    ]
  },
  {
    "name": "area-multi-resolution",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Area with multi resolution storytelling"
    ]
  },
  {
    "name": "bar-multi-resolution",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Bar with multi resolution storytelling"
    ]
  },
  {
    "name": "box-plot-multi-resolution",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Quartile variance analysis",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Box Plot with multi resolution storytelling"
    ]
  },
  {
    "name": "bubble-multi-resolution",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Bubble with multi resolution storytelling"
    ]
  },
  {
    "name": "candlestick-multi-resolution",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Candlestick with multi resolution storytelling"
    ]
  },
  {
    "name": "combo-multi-resolution",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Combo with multi resolution storytelling"
    ]
  },
  {
    "name": "funnel-multi-resolution",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Funnel with multi resolution storytelling"
    ]
  },
  {
    "name": "grouped-bar-multi-resolution",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Team by quarter",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Grouped Bar with multi resolution storytelling"
    ]
  },
  {
    "name": "heatmap-multi-resolution",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Heatmap with multi resolution storytelling"
    ]
  },
  {
    "name": "histogram-multi-resolution",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Latency histogram",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Histogram with multi resolution storytelling"
    ]
  },
  {
    "name": "line-multi-resolution",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Line with multi resolution storytelling"
    ]
  },
  {
    "name": "network-multi-resolution",
    "family": "network",
    "description": "Force-directed node-link graph. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Network with multi resolution storytelling"
    ]
  },
  {
    "name": "pie-multi-resolution",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Regional share",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Pie with multi resolution storytelling"
    ]
  },
  {
    "name": "radar-multi-resolution",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Capability heat score",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Radar with multi resolution storytelling"
    ]
  },
  {
    "name": "scatter-multi-resolution",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Feature correlation",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Scatter with multi resolution storytelling"
    ]
  },
  {
    "name": "sankey-multi-resolution",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Visitor conversion flow",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Sankey with multi resolution storytelling"
    ]
  },
  {
    "name": "stacked-bar-multi-resolution",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Regional contribution",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Stacked Bar with multi resolution storytelling"
    ]
  },
  {
    "name": "treemap-multi-resolution",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Storage allocation by category",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Treemap with multi resolution storytelling"
    ]
  },
  {
    "name": "waterfall-multi-resolution",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Budget to actual variance",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Waterfall with multi resolution storytelling"
    ]
  },
  {
    "name": "donut-multi-resolution",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Multi Resolution variant). Supports reading the same signal at summary and detailed resolutions in one coordinated representation.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "multi-resolution"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Useful when users need both a zoomed-out and local reading."
    ],
    "examples": [
      "Traffic channel share",
      "Multi-resolution view combining macro trend and fine-grain detail",
      "Donut with multi resolution storytelling"
    ]
  },
  {
    "name": "area-realtime-queue",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.timer"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Realtime queue dashboard with freshest values emphasized",
      "Area with realtime queue storytelling"
    ]
  },
  {
    "name": "bar-realtime-queue",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.timer"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Realtime queue dashboard with freshest values emphasized",
      "Bar with realtime queue storytelling"
    ]
  },
  {
    "name": "box-plot-realtime-queue",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Quartile variance analysis",
      "Realtime queue dashboard with freshest values emphasized",
      "Box Plot with realtime queue storytelling"
    ]
  },
  {
    "name": "bubble-realtime-queue",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.timer"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Realtime queue dashboard with freshest values emphasized",
      "Bubble with realtime queue storytelling"
    ]
  },
  {
    "name": "candlestick-realtime-queue",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Realtime queue dashboard with freshest values emphasized",
      "Candlestick with realtime queue storytelling"
    ]
  },
  {
    "name": "combo-realtime-queue",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Realtime queue dashboard with freshest values emphasized",
      "Combo with realtime queue storytelling"
    ]
  },
  {
    "name": "funnel-realtime-queue",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.timer"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Realtime queue dashboard with freshest values emphasized",
      "Funnel with realtime queue storytelling"
    ]
  },
  {
    "name": "grouped-bar-realtime-queue",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Team by quarter",
      "Realtime queue dashboard with freshest values emphasized",
      "Grouped Bar with realtime queue storytelling"
    ]
  },
  {
    "name": "heatmap-realtime-queue",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.timer"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Realtime queue dashboard with freshest values emphasized",
      "Heatmap with realtime queue storytelling"
    ]
  },
  {
    "name": "histogram-realtime-queue",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Latency histogram",
      "Realtime queue dashboard with freshest values emphasized",
      "Histogram with realtime queue storytelling"
    ]
  },
  {
    "name": "line-realtime-queue",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Realtime queue dashboard with freshest values emphasized",
      "Line with realtime queue storytelling"
    ]
  },
  {
    "name": "network-realtime-queue",
    "family": "network",
    "description": "Force-directed node-link graph. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.timer"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Realtime queue dashboard with freshest values emphasized",
      "Network with realtime queue storytelling"
    ]
  },
  {
    "name": "pie-realtime-queue",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Regional share",
      "Realtime queue dashboard with freshest values emphasized",
      "Pie with realtime queue storytelling"
    ]
  },
  {
    "name": "radar-realtime-queue",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.timer"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Capability heat score",
      "Realtime queue dashboard with freshest values emphasized",
      "Radar with realtime queue storytelling"
    ]
  },
  {
    "name": "scatter-realtime-queue",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Feature correlation",
      "Realtime queue dashboard with freshest values emphasized",
      "Scatter with realtime queue storytelling"
    ]
  },
  {
    "name": "sankey-realtime-queue",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.timer"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Visitor conversion flow",
      "Realtime queue dashboard with freshest values emphasized",
      "Sankey with realtime queue storytelling"
    ]
  },
  {
    "name": "stacked-bar-realtime-queue",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Regional contribution",
      "Realtime queue dashboard with freshest values emphasized",
      "Stacked Bar with realtime queue storytelling"
    ]
  },
  {
    "name": "treemap-realtime-queue",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Storage allocation by category",
      "Realtime queue dashboard with freshest values emphasized",
      "Treemap with realtime queue storytelling"
    ]
  },
  {
    "name": "waterfall-realtime-queue",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Budget to actual variance",
      "Realtime queue dashboard with freshest values emphasized",
      "Waterfall with realtime queue storytelling"
    ]
  },
  {
    "name": "donut-realtime-queue",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Realtime Queue variant). Tunes the chart toward live operations with recency emphasis and high-frequency update expectations.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "realtime-queue"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.timer"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Built for active control rooms and streaming telemetry."
    ],
    "examples": [
      "Traffic channel share",
      "Realtime queue dashboard with freshest values emphasized",
      "Donut with realtime queue storytelling"
    ]
  },
  {
    "name": "area-outlier-lens",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.extent"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Outlier lens with isolated extremes and support context",
      "Area with outlier lens storytelling"
    ]
  },
  {
    "name": "bar-outlier-lens",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.extent"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Outlier lens with isolated extremes and support context",
      "Bar with outlier lens storytelling"
    ]
  },
  {
    "name": "box-plot-outlier-lens",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Quartile variance analysis",
      "Outlier lens with isolated extremes and support context",
      "Box Plot with outlier lens storytelling"
    ]
  },
  {
    "name": "bubble-outlier-lens",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.extent"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Outlier lens with isolated extremes and support context",
      "Bubble with outlier lens storytelling"
    ]
  },
  {
    "name": "candlestick-outlier-lens",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Outlier lens with isolated extremes and support context",
      "Candlestick with outlier lens storytelling"
    ]
  },
  {
    "name": "combo-outlier-lens",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Outlier lens with isolated extremes and support context",
      "Combo with outlier lens storytelling"
    ]
  },
  {
    "name": "funnel-outlier-lens",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.extent"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Outlier lens with isolated extremes and support context",
      "Funnel with outlier lens storytelling"
    ]
  },
  {
    "name": "grouped-bar-outlier-lens",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Team by quarter",
      "Outlier lens with isolated extremes and support context",
      "Grouped Bar with outlier lens storytelling"
    ]
  },
  {
    "name": "heatmap-outlier-lens",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.extent"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Outlier lens with isolated extremes and support context",
      "Heatmap with outlier lens storytelling"
    ]
  },
  {
    "name": "histogram-outlier-lens",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Latency histogram",
      "Outlier lens with isolated extremes and support context",
      "Histogram with outlier lens storytelling"
    ]
  },
  {
    "name": "line-outlier-lens",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Outlier lens with isolated extremes and support context",
      "Line with outlier lens storytelling"
    ]
  },
  {
    "name": "network-outlier-lens",
    "family": "network",
    "description": "Force-directed node-link graph. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.extent"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Outlier lens with isolated extremes and support context",
      "Network with outlier lens storytelling"
    ]
  },
  {
    "name": "pie-outlier-lens",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Regional share",
      "Outlier lens with isolated extremes and support context",
      "Pie with outlier lens storytelling"
    ]
  },
  {
    "name": "radar-outlier-lens",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.extent"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Capability heat score",
      "Outlier lens with isolated extremes and support context",
      "Radar with outlier lens storytelling"
    ]
  },
  {
    "name": "scatter-outlier-lens",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Feature correlation",
      "Outlier lens with isolated extremes and support context",
      "Scatter with outlier lens storytelling"
    ]
  },
  {
    "name": "sankey-outlier-lens",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.extent"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Visitor conversion flow",
      "Outlier lens with isolated extremes and support context",
      "Sankey with outlier lens storytelling"
    ]
  },
  {
    "name": "stacked-bar-outlier-lens",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Regional contribution",
      "Outlier lens with isolated extremes and support context",
      "Stacked Bar with outlier lens storytelling"
    ]
  },
  {
    "name": "treemap-outlier-lens",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Storage allocation by category",
      "Outlier lens with isolated extremes and support context",
      "Treemap with outlier lens storytelling"
    ]
  },
  {
    "name": "waterfall-outlier-lens",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Budget to actual variance",
      "Outlier lens with isolated extremes and support context",
      "Waterfall with outlier lens storytelling"
    ]
  },
  {
    "name": "donut-outlier-lens",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Outlier Lens variant). Pushes outliers into focus while preserving the baseline distribution or trend context.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "outlier-lens"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.extent"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when rare events are more important than the center of the data."
    ],
    "examples": [
      "Traffic channel share",
      "Outlier lens with isolated extremes and support context",
      "Donut with outlier lens storytelling"
    ]
  },
  {
    "name": "area-seasonal-decomposition",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Area with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "bar-seasonal-decomposition",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Bar with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "box-plot-seasonal-decomposition",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Quartile variance analysis",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Box Plot with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "bubble-seasonal-decomposition",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Bubble with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "candlestick-seasonal-decomposition",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Candlestick with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "combo-seasonal-decomposition",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Combo with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "funnel-seasonal-decomposition",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Funnel with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "grouped-bar-seasonal-decomposition",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Team by quarter",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Grouped Bar with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "heatmap-seasonal-decomposition",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Heatmap with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "histogram-seasonal-decomposition",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Latency histogram",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Histogram with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "line-seasonal-decomposition",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Line with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "network-seasonal-decomposition",
    "family": "network",
    "description": "Force-directed node-link graph. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "grid"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Network with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "pie-seasonal-decomposition",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Regional share",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Pie with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "radar-seasonal-decomposition",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Capability heat score",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Radar with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "scatter-seasonal-decomposition",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Feature correlation",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Scatter with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "sankey-seasonal-decomposition",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "grid"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Visitor conversion flow",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Sankey with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "stacked-bar-seasonal-decomposition",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Regional contribution",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Stacked Bar with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "treemap-seasonal-decomposition",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Storage allocation by category",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Treemap with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "waterfall-seasonal-decomposition",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Budget to actual variance",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Waterfall with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "donut-seasonal-decomposition",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Seasonal Decomposition variant). Frames the chart around recurring seasonality, cyclical movement, and baseline drift.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "seasonal-decomposition"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "grid"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.rollup"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Good for demand planning, traffic, and operations with repeat patterns."
    ],
    "examples": [
      "Traffic channel share",
      "Seasonal decomposition with recurring cycles and baseline drift",
      "Donut with seasonal decomposition storytelling"
    ]
  },
  {
    "name": "area-ranking-shift",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.sort"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Ranking shift across releases or reporting periods",
      "Area with ranking shift storytelling"
    ]
  },
  {
    "name": "bar-ranking-shift",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.sort"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Ranking shift across releases or reporting periods",
      "Bar with ranking shift storytelling"
    ]
  },
  {
    "name": "box-plot-ranking-shift",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Quartile variance analysis",
      "Ranking shift across releases or reporting periods",
      "Box Plot with ranking shift storytelling"
    ]
  },
  {
    "name": "bubble-ranking-shift",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.sort"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Ranking shift across releases or reporting periods",
      "Bubble with ranking shift storytelling"
    ]
  },
  {
    "name": "candlestick-ranking-shift",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Ranking shift across releases or reporting periods",
      "Candlestick with ranking shift storytelling"
    ]
  },
  {
    "name": "combo-ranking-shift",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Ranking shift across releases or reporting periods",
      "Combo with ranking shift storytelling"
    ]
  },
  {
    "name": "funnel-ranking-shift",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.sort"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Ranking shift across releases or reporting periods",
      "Funnel with ranking shift storytelling"
    ]
  },
  {
    "name": "grouped-bar-ranking-shift",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Team by quarter",
      "Ranking shift across releases or reporting periods",
      "Grouped Bar with ranking shift storytelling"
    ]
  },
  {
    "name": "heatmap-ranking-shift",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.sort"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Ranking shift across releases or reporting periods",
      "Heatmap with ranking shift storytelling"
    ]
  },
  {
    "name": "histogram-ranking-shift",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Latency histogram",
      "Ranking shift across releases or reporting periods",
      "Histogram with ranking shift storytelling"
    ]
  },
  {
    "name": "line-ranking-shift",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Ranking shift across releases or reporting periods",
      "Line with ranking shift storytelling"
    ]
  },
  {
    "name": "network-ranking-shift",
    "family": "network",
    "description": "Force-directed node-link graph. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.sort"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Ranking shift across releases or reporting periods",
      "Network with ranking shift storytelling"
    ]
  },
  {
    "name": "pie-ranking-shift",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Regional share",
      "Ranking shift across releases or reporting periods",
      "Pie with ranking shift storytelling"
    ]
  },
  {
    "name": "radar-ranking-shift",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.sort"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Capability heat score",
      "Ranking shift across releases or reporting periods",
      "Radar with ranking shift storytelling"
    ]
  },
  {
    "name": "scatter-ranking-shift",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Feature correlation",
      "Ranking shift across releases or reporting periods",
      "Scatter with ranking shift storytelling"
    ]
  },
  {
    "name": "sankey-ranking-shift",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.sort"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Visitor conversion flow",
      "Ranking shift across releases or reporting periods",
      "Sankey with ranking shift storytelling"
    ]
  },
  {
    "name": "stacked-bar-ranking-shift",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Regional contribution",
      "Ranking shift across releases or reporting periods",
      "Stacked Bar with ranking shift storytelling"
    ]
  },
  {
    "name": "treemap-ranking-shift",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Storage allocation by category",
      "Ranking shift across releases or reporting periods",
      "Treemap with ranking shift storytelling"
    ]
  },
  {
    "name": "waterfall-ranking-shift",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Budget to actual variance",
      "Ranking shift across releases or reporting periods",
      "Waterfall with ranking shift storytelling"
    ]
  },
  {
    "name": "donut-ranking-shift",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Ranking Shift variant). Emphasizes position changes, movement between peers, and competitive reorderings.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "ranking-shift"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.sort"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when change in order matters more than absolute magnitude."
    ],
    "examples": [
      "Traffic channel share",
      "Ranking shift across releases or reporting periods",
      "Donut with ranking shift storytelling"
    ]
  },
  {
    "name": "area-dependency-critical-path",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Area with dependency critical path storytelling"
    ]
  },
  {
    "name": "bar-dependency-critical-path",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Bar with dependency critical path storytelling"
    ]
  },
  {
    "name": "box-plot-dependency-critical-path",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Quartile variance analysis",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Box Plot with dependency critical path storytelling"
    ]
  },
  {
    "name": "bubble-dependency-critical-path",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Bubble with dependency critical path storytelling"
    ]
  },
  {
    "name": "candlestick-dependency-critical-path",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Candlestick with dependency critical path storytelling"
    ]
  },
  {
    "name": "combo-dependency-critical-path",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Combo with dependency critical path storytelling"
    ]
  },
  {
    "name": "funnel-dependency-critical-path",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Funnel with dependency critical path storytelling"
    ]
  },
  {
    "name": "grouped-bar-dependency-critical-path",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Team by quarter",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Grouped Bar with dependency critical path storytelling"
    ]
  },
  {
    "name": "heatmap-dependency-critical-path",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Heatmap with dependency critical path storytelling"
    ]
  },
  {
    "name": "histogram-dependency-critical-path",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Latency histogram",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Histogram with dependency critical path storytelling"
    ]
  },
  {
    "name": "line-dependency-critical-path",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Line with dependency critical path storytelling"
    ]
  },
  {
    "name": "network-dependency-critical-path",
    "family": "network",
    "description": "Force-directed node-link graph. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Network with dependency critical path storytelling"
    ]
  },
  {
    "name": "pie-dependency-critical-path",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Regional share",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Pie with dependency critical path storytelling"
    ]
  },
  {
    "name": "radar-dependency-critical-path",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Capability heat score",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Radar with dependency critical path storytelling"
    ]
  },
  {
    "name": "scatter-dependency-critical-path",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Feature correlation",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Scatter with dependency critical path storytelling"
    ]
  },
  {
    "name": "sankey-dependency-critical-path",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Visitor conversion flow",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Sankey with dependency critical path storytelling"
    ]
  },
  {
    "name": "stacked-bar-dependency-critical-path",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Regional contribution",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Stacked Bar with dependency critical path storytelling"
    ]
  },
  {
    "name": "treemap-dependency-critical-path",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Storage allocation by category",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Treemap with dependency critical path storytelling"
    ]
  },
  {
    "name": "waterfall-dependency-critical-path",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Budget to actual variance",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Waterfall with dependency critical path storytelling"
    ]
  },
  {
    "name": "donut-dependency-critical-path",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Dependency Critical Path variant). Highlights bottlenecks, constrained flows, and sequencing dependencies inside the chart narrative.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "dependency-critical-path"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Strong fit for operational flow mapping and delivery planning."
    ],
    "examples": [
      "Traffic channel share",
      "Critical-path view exposing blocked dependencies and gating steps",
      "Donut with dependency critical path storytelling"
    ]
  },
  {
    "name": "area-topology-health",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Topology health view with degraded and healthy segments",
      "Area with topology health storytelling"
    ]
  },
  {
    "name": "bar-topology-health",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Topology health view with degraded and healthy segments",
      "Bar with topology health storytelling"
    ]
  },
  {
    "name": "box-plot-topology-health",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Quartile variance analysis",
      "Topology health view with degraded and healthy segments",
      "Box Plot with topology health storytelling"
    ]
  },
  {
    "name": "bubble-topology-health",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Topology health view with degraded and healthy segments",
      "Bubble with topology health storytelling"
    ]
  },
  {
    "name": "candlestick-topology-health",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Topology health view with degraded and healthy segments",
      "Candlestick with topology health storytelling"
    ]
  },
  {
    "name": "combo-topology-health",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Topology health view with degraded and healthy segments",
      "Combo with topology health storytelling"
    ]
  },
  {
    "name": "funnel-topology-health",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Topology health view with degraded and healthy segments",
      "Funnel with topology health storytelling"
    ]
  },
  {
    "name": "grouped-bar-topology-health",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Team by quarter",
      "Topology health view with degraded and healthy segments",
      "Grouped Bar with topology health storytelling"
    ]
  },
  {
    "name": "heatmap-topology-health",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Topology health view with degraded and healthy segments",
      "Heatmap with topology health storytelling"
    ]
  },
  {
    "name": "histogram-topology-health",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Latency histogram",
      "Topology health view with degraded and healthy segments",
      "Histogram with topology health storytelling"
    ]
  },
  {
    "name": "line-topology-health",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Topology health view with degraded and healthy segments",
      "Line with topology health storytelling"
    ]
  },
  {
    "name": "network-topology-health",
    "family": "network",
    "description": "Force-directed node-link graph. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Topology health view with degraded and healthy segments",
      "Network with topology health storytelling"
    ]
  },
  {
    "name": "pie-topology-health",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Regional share",
      "Topology health view with degraded and healthy segments",
      "Pie with topology health storytelling"
    ]
  },
  {
    "name": "radar-topology-health",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Capability heat score",
      "Topology health view with degraded and healthy segments",
      "Radar with topology health storytelling"
    ]
  },
  {
    "name": "scatter-topology-health",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Feature correlation",
      "Topology health view with degraded and healthy segments",
      "Scatter with topology health storytelling"
    ]
  },
  {
    "name": "sankey-topology-health",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Visitor conversion flow",
      "Topology health view with degraded and healthy segments",
      "Sankey with topology health storytelling"
    ]
  },
  {
    "name": "stacked-bar-topology-health",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Regional contribution",
      "Topology health view with degraded and healthy segments",
      "Stacked Bar with topology health storytelling"
    ]
  },
  {
    "name": "treemap-topology-health",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Storage allocation by category",
      "Topology health view with degraded and healthy segments",
      "Treemap with topology health storytelling"
    ]
  },
  {
    "name": "waterfall-topology-health",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Budget to actual variance",
      "Topology health view with degraded and healthy segments",
      "Waterfall with topology health storytelling"
    ]
  },
  {
    "name": "donut-topology-health",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Topology Health variant). Adapts the chart to show health status, service relationships, or operational integrity overlays.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "topology-health"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.forceSimulation"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Useful for service maps, infrastructure views, and reliability dashboards."
    ],
    "examples": [
      "Traffic channel share",
      "Topology health view with degraded and healthy segments",
      "Donut with topology health storytelling"
    ]
  },
  {
    "name": "area-goal-tracking",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.line"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Goal tracking view with current progress and target pacing",
      "Area with goal tracking storytelling"
    ]
  },
  {
    "name": "bar-goal-tracking",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.line"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Goal tracking view with current progress and target pacing",
      "Bar with goal tracking storytelling"
    ]
  },
  {
    "name": "box-plot-goal-tracking",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Quartile variance analysis",
      "Goal tracking view with current progress and target pacing",
      "Box Plot with goal tracking storytelling"
    ]
  },
  {
    "name": "bubble-goal-tracking",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.line"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Goal tracking view with current progress and target pacing",
      "Bubble with goal tracking storytelling"
    ]
  },
  {
    "name": "candlestick-goal-tracking",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Goal tracking view with current progress and target pacing",
      "Candlestick with goal tracking storytelling"
    ]
  },
  {
    "name": "combo-goal-tracking",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Goal tracking view with current progress and target pacing",
      "Combo with goal tracking storytelling"
    ]
  },
  {
    "name": "funnel-goal-tracking",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.line"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Goal tracking view with current progress and target pacing",
      "Funnel with goal tracking storytelling"
    ]
  },
  {
    "name": "grouped-bar-goal-tracking",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Team by quarter",
      "Goal tracking view with current progress and target pacing",
      "Grouped Bar with goal tracking storytelling"
    ]
  },
  {
    "name": "heatmap-goal-tracking",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.line"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Goal tracking view with current progress and target pacing",
      "Heatmap with goal tracking storytelling"
    ]
  },
  {
    "name": "histogram-goal-tracking",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "brush"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Latency histogram",
      "Goal tracking view with current progress and target pacing",
      "Histogram with goal tracking storytelling"
    ]
  },
  {
    "name": "line-goal-tracking",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Goal tracking view with current progress and target pacing",
      "Line with goal tracking storytelling"
    ]
  },
  {
    "name": "network-goal-tracking",
    "family": "network",
    "description": "Force-directed node-link graph. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.line"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Goal tracking view with current progress and target pacing",
      "Network with goal tracking storytelling"
    ]
  },
  {
    "name": "pie-goal-tracking",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Regional share",
      "Goal tracking view with current progress and target pacing",
      "Pie with goal tracking storytelling"
    ]
  },
  {
    "name": "radar-goal-tracking",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.line"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Capability heat score",
      "Goal tracking view with current progress and target pacing",
      "Radar with goal tracking storytelling"
    ]
  },
  {
    "name": "scatter-goal-tracking",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Feature correlation",
      "Goal tracking view with current progress and target pacing",
      "Scatter with goal tracking storytelling"
    ]
  },
  {
    "name": "sankey-goal-tracking",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.line"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Visitor conversion flow",
      "Goal tracking view with current progress and target pacing",
      "Sankey with goal tracking storytelling"
    ]
  },
  {
    "name": "stacked-bar-goal-tracking",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Regional contribution",
      "Goal tracking view with current progress and target pacing",
      "Stacked Bar with goal tracking storytelling"
    ]
  },
  {
    "name": "treemap-goal-tracking",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Storage allocation by category",
      "Goal tracking view with current progress and target pacing",
      "Treemap with goal tracking storytelling"
    ]
  },
  {
    "name": "waterfall-goal-tracking",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Budget to actual variance",
      "Goal tracking view with current progress and target pacing",
      "Waterfall with goal tracking storytelling"
    ]
  },
  {
    "name": "donut-goal-tracking",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Goal Tracking variant). Centers the chart around progress against explicit goals, milestones, and trailing completion status.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "goal-tracking"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.line"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Ideal for roadmap delivery, OKRs, and adoption funnels."
    ],
    "examples": [
      "Traffic channel share",
      "Goal tracking view with current progress and target pacing",
      "Donut with goal tracking storytelling"
    ]
  },
  {
    "name": "area-narrative-sequence",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.transition"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Narrative sequence for walkthrough-style reporting",
      "Area with narrative sequence storytelling"
    ]
  },
  {
    "name": "bar-narrative-sequence",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.transition"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Narrative sequence for walkthrough-style reporting",
      "Bar with narrative sequence storytelling"
    ]
  },
  {
    "name": "box-plot-narrative-sequence",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Quartile variance analysis",
      "Narrative sequence for walkthrough-style reporting",
      "Box Plot with narrative sequence storytelling"
    ]
  },
  {
    "name": "bubble-narrative-sequence",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.transition"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Narrative sequence for walkthrough-style reporting",
      "Bubble with narrative sequence storytelling"
    ]
  },
  {
    "name": "candlestick-narrative-sequence",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Narrative sequence for walkthrough-style reporting",
      "Candlestick with narrative sequence storytelling"
    ]
  },
  {
    "name": "combo-narrative-sequence",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Narrative sequence for walkthrough-style reporting",
      "Combo with narrative sequence storytelling"
    ]
  },
  {
    "name": "funnel-narrative-sequence",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.transition"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Narrative sequence for walkthrough-style reporting",
      "Funnel with narrative sequence storytelling"
    ]
  },
  {
    "name": "grouped-bar-narrative-sequence",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Team by quarter",
      "Narrative sequence for walkthrough-style reporting",
      "Grouped Bar with narrative sequence storytelling"
    ]
  },
  {
    "name": "heatmap-narrative-sequence",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.transition"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Narrative sequence for walkthrough-style reporting",
      "Heatmap with narrative sequence storytelling"
    ]
  },
  {
    "name": "histogram-narrative-sequence",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Latency histogram",
      "Narrative sequence for walkthrough-style reporting",
      "Histogram with narrative sequence storytelling"
    ]
  },
  {
    "name": "line-narrative-sequence",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Narrative sequence for walkthrough-style reporting",
      "Line with narrative sequence storytelling"
    ]
  },
  {
    "name": "network-narrative-sequence",
    "family": "network",
    "description": "Force-directed node-link graph. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.transition"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Narrative sequence for walkthrough-style reporting",
      "Network with narrative sequence storytelling"
    ]
  },
  {
    "name": "pie-narrative-sequence",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Regional share",
      "Narrative sequence for walkthrough-style reporting",
      "Pie with narrative sequence storytelling"
    ]
  },
  {
    "name": "radar-narrative-sequence",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.transition"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Capability heat score",
      "Narrative sequence for walkthrough-style reporting",
      "Radar with narrative sequence storytelling"
    ]
  },
  {
    "name": "scatter-narrative-sequence",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Feature correlation",
      "Narrative sequence for walkthrough-style reporting",
      "Scatter with narrative sequence storytelling"
    ]
  },
  {
    "name": "sankey-narrative-sequence",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.transition"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Visitor conversion flow",
      "Narrative sequence for walkthrough-style reporting",
      "Sankey with narrative sequence storytelling"
    ]
  },
  {
    "name": "stacked-bar-narrative-sequence",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Regional contribution",
      "Narrative sequence for walkthrough-style reporting",
      "Stacked Bar with narrative sequence storytelling"
    ]
  },
  {
    "name": "treemap-narrative-sequence",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Storage allocation by category",
      "Narrative sequence for walkthrough-style reporting",
      "Treemap with narrative sequence storytelling"
    ]
  },
  {
    "name": "waterfall-narrative-sequence",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Budget to actual variance",
      "Narrative sequence for walkthrough-style reporting",
      "Waterfall with narrative sequence storytelling"
    ]
  },
  {
    "name": "donut-narrative-sequence",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Narrative Sequence variant). Turns the chart into a presentation-oriented progression with stronger story beats and guided context.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "narrative-sequence"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.transition"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Good for stakeholder storytelling and demo-ready flows."
    ],
    "examples": [
      "Traffic channel share",
      "Narrative sequence for walkthrough-style reporting",
      "Donut with narrative sequence storytelling"
    ]
  },
  {
    "name": "area-drilldown-workbench",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Drilldown workbench linking summary, segment, and detail views",
      "Area with drilldown workbench storytelling"
    ]
  },
  {
    "name": "bar-drilldown-workbench",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Drilldown workbench linking summary, segment, and detail views",
      "Bar with drilldown workbench storytelling"
    ]
  },
  {
    "name": "box-plot-drilldown-workbench",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Quartile variance analysis",
      "Drilldown workbench linking summary, segment, and detail views",
      "Box Plot with drilldown workbench storytelling"
    ]
  },
  {
    "name": "bubble-drilldown-workbench",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Drilldown workbench linking summary, segment, and detail views",
      "Bubble with drilldown workbench storytelling"
    ]
  },
  {
    "name": "candlestick-drilldown-workbench",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Drilldown workbench linking summary, segment, and detail views",
      "Candlestick with drilldown workbench storytelling"
    ]
  },
  {
    "name": "combo-drilldown-workbench",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Drilldown workbench linking summary, segment, and detail views",
      "Combo with drilldown workbench storytelling"
    ]
  },
  {
    "name": "funnel-drilldown-workbench",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Drilldown workbench linking summary, segment, and detail views",
      "Funnel with drilldown workbench storytelling"
    ]
  },
  {
    "name": "grouped-bar-drilldown-workbench",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Team by quarter",
      "Drilldown workbench linking summary, segment, and detail views",
      "Grouped Bar with drilldown workbench storytelling"
    ]
  },
  {
    "name": "heatmap-drilldown-workbench",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Drilldown workbench linking summary, segment, and detail views",
      "Heatmap with drilldown workbench storytelling"
    ]
  },
  {
    "name": "histogram-drilldown-workbench",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Latency histogram",
      "Drilldown workbench linking summary, segment, and detail views",
      "Histogram with drilldown workbench storytelling"
    ]
  },
  {
    "name": "line-drilldown-workbench",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Drilldown workbench linking summary, segment, and detail views",
      "Line with drilldown workbench storytelling"
    ]
  },
  {
    "name": "network-drilldown-workbench",
    "family": "network",
    "description": "Force-directed node-link graph. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Drilldown workbench linking summary, segment, and detail views",
      "Network with drilldown workbench storytelling"
    ]
  },
  {
    "name": "pie-drilldown-workbench",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Regional share",
      "Drilldown workbench linking summary, segment, and detail views",
      "Pie with drilldown workbench storytelling"
    ]
  },
  {
    "name": "radar-drilldown-workbench",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Capability heat score",
      "Drilldown workbench linking summary, segment, and detail views",
      "Radar with drilldown workbench storytelling"
    ]
  },
  {
    "name": "scatter-drilldown-workbench",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Feature correlation",
      "Drilldown workbench linking summary, segment, and detail views",
      "Scatter with drilldown workbench storytelling"
    ]
  },
  {
    "name": "sankey-drilldown-workbench",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Visitor conversion flow",
      "Drilldown workbench linking summary, segment, and detail views",
      "Sankey with drilldown workbench storytelling"
    ]
  },
  {
    "name": "stacked-bar-drilldown-workbench",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Regional contribution",
      "Drilldown workbench linking summary, segment, and detail views",
      "Stacked Bar with drilldown workbench storytelling"
    ]
  },
  {
    "name": "treemap-drilldown-workbench",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Storage allocation by category",
      "Drilldown workbench linking summary, segment, and detail views",
      "Treemap with drilldown workbench storytelling"
    ]
  },
  {
    "name": "waterfall-drilldown-workbench",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Budget to actual variance",
      "Drilldown workbench linking summary, segment, and detail views",
      "Waterfall with drilldown workbench storytelling"
    ]
  },
  {
    "name": "donut-drilldown-workbench",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Drilldown Workbench variant). Packages the chart as an exploratory workspace where high-level findings can open deeper detail levels.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "drilldown-workbench"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.hierarchy"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Use when the chart should act like an entry point, not a static endpoint."
    ],
    "examples": [
      "Traffic channel share",
      "Drilldown workbench linking summary, segment, and detail views",
      "Donut with drilldown workbench storytelling"
    ]
  },
  {
    "name": "area-control-room",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Control-room variant for live performance and alert review",
      "Area with control room storytelling"
    ]
  },
  {
    "name": "bar-control-room",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Control-room variant for live performance and alert review",
      "Bar with control room storytelling"
    ]
  },
  {
    "name": "box-plot-control-room",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Quartile variance analysis",
      "Control-room variant for live performance and alert review",
      "Box Plot with control room storytelling"
    ]
  },
  {
    "name": "bubble-control-room",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Control-room variant for live performance and alert review",
      "Bubble with control room storytelling"
    ]
  },
  {
    "name": "candlestick-control-room",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Control-room variant for live performance and alert review",
      "Candlestick with control room storytelling"
    ]
  },
  {
    "name": "combo-control-room",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Control-room variant for live performance and alert review",
      "Combo with control room storytelling"
    ]
  },
  {
    "name": "funnel-control-room",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Control-room variant for live performance and alert review",
      "Funnel with control room storytelling"
    ]
  },
  {
    "name": "grouped-bar-control-room",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Team by quarter",
      "Control-room variant for live performance and alert review",
      "Grouped Bar with control room storytelling"
    ]
  },
  {
    "name": "heatmap-control-room",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Control-room variant for live performance and alert review",
      "Heatmap with control room storytelling"
    ]
  },
  {
    "name": "histogram-control-room",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Latency histogram",
      "Control-room variant for live performance and alert review",
      "Histogram with control room storytelling"
    ]
  },
  {
    "name": "line-control-room",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Control-room variant for live performance and alert review",
      "Line with control room storytelling"
    ]
  },
  {
    "name": "network-control-room",
    "family": "network",
    "description": "Force-directed node-link graph. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "drag",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Control-room variant for live performance and alert review",
      "Network with control room storytelling"
    ]
  },
  {
    "name": "pie-control-room",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Regional share",
      "Control-room variant for live performance and alert review",
      "Pie with control room storytelling"
    ]
  },
  {
    "name": "radar-control-room",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Capability heat score",
      "Control-room variant for live performance and alert review",
      "Radar with control room storytelling"
    ]
  },
  {
    "name": "scatter-control-room",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom",
      "live-update"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Feature correlation",
      "Control-room variant for live performance and alert review",
      "Scatter with control room storytelling"
    ]
  },
  {
    "name": "sankey-control-room",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Visitor conversion flow",
      "Control-room variant for live performance and alert review",
      "Sankey with control room storytelling"
    ]
  },
  {
    "name": "stacked-bar-control-room",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Regional contribution",
      "Control-room variant for live performance and alert review",
      "Stacked Bar with control room storytelling"
    ]
  },
  {
    "name": "treemap-control-room",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Storage allocation by category",
      "Control-room variant for live performance and alert review",
      "Treemap with control room storytelling"
    ]
  },
  {
    "name": "waterfall-control-room",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Budget to actual variance",
      "Control-room variant for live performance and alert review",
      "Waterfall with control room storytelling"
    ]
  },
  {
    "name": "donut-control-room",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Control Room variant). Optimizes the chart for operational command surfaces with dense status context and rapid scanning.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "control-room"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "live-update",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.zoom"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Built for operators who need fast answers in one glance."
    ],
    "examples": [
      "Traffic channel share",
      "Control-room variant for live performance and alert review",
      "Donut with control room storytelling"
    ]
  },
  {
    "name": "area-tapered-flow",
    "family": "cartesian",
    "description": "Time-series area chart with stacked and monotone variants. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "area",
      "line",
      "rule"
    ],
    "variants": [
      "stacked",
      "normalized",
      "stream",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Primary x domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y numeric value"
      }
    ],
    "d3Analogs": [
      "d3.area",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Use for trend and banded uncertainty contexts",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Trend with confidence band",
      "Area with baseline comparison",
      "Normalized area stack",
      "Tapered flow view showing narrowing throughput across stages",
      "Area with tapered flow storytelling"
    ]
  },
  {
    "name": "bar-tapered-flow",
    "family": "cartesian",
    "description": "Standard categorical bar comparison chart. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule",
      "annotation"
    ],
    "variants": [
      "clustered",
      "single",
      "horizontal",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bar value"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.axis",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Map closest equivalent to BarSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Quarterly revenue",
      "Grouped metrics",
      "Tapered flow view showing narrowing throughput across stages",
      "Bar with tapered flow storytelling"
    ]
  },
  {
    "name": "box-plot-tapered-flow",
    "family": "distribution",
    "description": "Distribution chart with medians and quartiles. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "rect",
      "rule",
      "point"
    ],
    "variants": [
      "horizontal",
      "notched",
      "outlier-markers",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "category",
        "type": "string",
        "required": true,
        "description": "Grouping category"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Array-like numeric values per category"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.line",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to BoxPlotSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Quartile variance analysis",
      "Tapered flow view showing narrowing throughput across stages",
      "Box Plot with tapered flow storytelling"
    ]
  },
  {
    "name": "bubble-tapered-flow",
    "family": "cartesian",
    "description": "Scatter variant with third dimension in point size. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "scaled-size",
      "animated",
      "density",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Radius/weight value"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.scaleSqrt",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Closest behavior to BubbleSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Sales vs size vs margin",
      "Tapered flow view showing narrowing throughput across stages",
      "Bubble with tapered flow storytelling"
    ]
  },
  {
    "name": "candlestick-tapered-flow",
    "family": "financial",
    "description": "Financial open-high-low-close sequence visualization. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "rule",
      "rect"
    ],
    "variants": [
      "candlestick",
      "ohlc",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "crosshair",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Period label"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "Open price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "High price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Low price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Close price"
      }
    ],
    "d3Analogs": [
      "d3.scaleTime",
      "d3.axis",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to finance candle representation",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Equity close/open progression",
      "Volatility panel",
      "Tapered flow view showing narrowing throughput across stages",
      "Candlestick with tapered flow storytelling"
    ]
  },
  {
    "name": "combo-tapered-flow",
    "family": "composite",
    "description": "Mixed chart with bars and lines on a shared axis set. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "line",
      "point"
    ],
    "variants": [
      "bar+line",
      "dual-axis",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category or timeline label"
      },
      {
        "name": "bar",
        "type": "number",
        "required": true,
        "description": "Column magnitude"
      },
      {
        "name": "line",
        "type": "number",
        "required": true,
        "description": "Line magnitude"
      }
    ],
    "d3Analogs": [
      "d3.axis",
      "d3.scaleLinear",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to CombinedSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Order volume and conversion rate",
      "Tapered flow view showing narrowing throughput across stages",
      "Combo with tapered flow storytelling"
    ]
  },
  {
    "name": "funnel-tapered-flow",
    "family": "distribution",
    "description": "Stage reduction and conversion funnel. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "rect"
    ],
    "variants": [
      "horizontal",
      "vertical",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Stage label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Stage value"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.layout",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Closest to FunnelSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Sales pipeline",
      "Onboarding conversion",
      "Tapered flow view showing narrowing throughput across stages",
      "Funnel with tapered flow storytelling"
    ]
  },
  {
    "name": "grouped-bar-tapered-flow",
    "family": "cartesian",
    "description": "Grouped bars for multiple series by category. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "grouped",
      "grouped-stack",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "grouping"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Per-series values in order"
      }
    ],
    "d3Analogs": [
      "d3.scaleBand",
      "d3.stack",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to BarSeries + series grouping",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Team by quarter",
      "Tapered flow view showing narrowing throughput across stages",
      "Grouped Bar with tapered flow storytelling"
    ]
  },
  {
    "name": "heatmap-tapered-flow",
    "family": "distribution",
    "description": "2D matrix cells colored by intensity. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "ordered",
      "clustered",
      "calendar",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "grid",
      "annotations",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "Column index"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Row index"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Heat value"
      }
    ],
    "d3Analogs": [
      "d3.scaleSequential",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Suitable replacement for dense matrix displays",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Calendar activity heatmap",
      "Tapered flow view showing narrowing throughput across stages",
      "Heatmap with tapered flow storytelling"
    ]
  },
  {
    "name": "histogram-tapered-flow",
    "family": "distribution",
    "description": "Frequency buckets for numeric distributions. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "bar"
    ],
    "variants": [
      "density",
      "stacked",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "brush",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Bin label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Bin count"
      }
    ],
    "d3Analogs": [
      "d3.histogram",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to HistogramSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Latency histogram",
      "Tapered flow view showing narrowing throughput across stages",
      "Histogram with tapered flow storytelling"
    ]
  },
  {
    "name": "line-tapered-flow",
    "family": "cartesian",
    "description": "Time and numeric trend lines. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "line",
      "rule",
      "point"
    ],
    "variants": [
      "smooth",
      "step",
      "segment",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "crosshair",
      "zoom",
      "pan"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X domain value"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y value"
      }
    ],
    "d3Analogs": [
      "d3.line",
      "d3.curveMonotoneX",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to LineSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Response time trend",
      "Cumulative conversions",
      "Tapered flow view showing narrowing throughput across stages",
      "Line with tapered flow storytelling"
    ]
  },
  {
    "name": "network-tapered-flow",
    "family": "network",
    "description": "Force-directed node-link graph. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "canvas",
    "series": [
      "node"
    ],
    "variants": [
      "force",
      "arc",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "pan",
      "zoom",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "drag"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Link weight"
      }
    ],
    "d3Analogs": [
      "d3.forceSimulation",
      "d3.forceLink",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Map toward graph scenarios with node/link datasets",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Dependency graph",
      "Service topology",
      "Tapered flow view showing narrowing throughput across stages",
      "Network with tapered flow storytelling"
    ]
  },
  {
    "name": "pie-tapered-flow",
    "family": "polar",
    "description": "Part-to-whole pie chart. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "donut",
      "mini-pie",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to PieSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Regional share",
      "Tapered flow view showing narrowing throughput across stages",
      "Pie with tapered flow storytelling"
    ]
  },
  {
    "name": "radar-tapered-flow",
    "family": "polar",
    "description": "Multidimensional radial comparison. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "line",
      "area",
      "point"
    ],
    "variants": [
      "spider",
      "area-radar",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Axis label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Axis score"
      }
    ],
    "d3Analogs": [
      "d3.scaleLinear",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Useful for competency/radar displays",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Capability heat score",
      "Tapered flow view showing narrowing throughput across stages",
      "Radar with tapered flow storytelling"
    ]
  },
  {
    "name": "scatter-tapered-flow",
    "family": "cartesian",
    "description": "XY point cloud and correlation view. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "point",
      "rule"
    ],
    "variants": [
      "marker",
      "large-data",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "brush",
      "crosshair",
      "zoom"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "streaming"
    ],
    "dataShape": [
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "X coordinate"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "Y coordinate"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Optional weighting value"
      }
    ],
    "d3Analogs": [
      "d3.scatter",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to ScatterSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Feature correlation",
      "Tapered flow view showing narrowing throughput across stages",
      "Scatter with tapered flow storytelling"
    ]
  },
  {
    "name": "sankey-tapered-flow",
    "family": "network",
    "description": "Flow diagram for source-to-target transfer widths. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "node"
    ],
    "variants": [
      "vertical",
      "horizontal",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "source",
        "type": "string",
        "required": true,
        "description": "Source node id"
      },
      {
        "name": "target",
        "type": "string",
        "required": true,
        "description": "Target node id"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Flow value"
      }
    ],
    "d3Analogs": [
      "d3.sankey"
    ],
    "devextremeHints": [
      "Flow analytics and conversion pathways",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Visitor conversion flow",
      "Tapered flow view showing narrowing throughput across stages",
      "Sankey with tapered flow storytelling"
    ]
  },
  {
    "name": "stacked-bar-tapered-flow",
    "family": "cartesian",
    "description": "Stacked bars where each category decomposes by series. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "hybrid",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "full-stack",
      "normalized",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes",
      "stacking"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Category label"
      },
      {
        "name": "values",
        "type": "number",
        "required": true,
        "description": "Series values"
      }
    ],
    "d3Analogs": [
      "d3.stack",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to StackedBarSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Regional contribution",
      "Tapered flow view showing narrowing throughput across stages",
      "Stacked Bar with tapered flow storytelling"
    ]
  },
  {
    "name": "treemap-tapered-flow",
    "family": "hierarchical",
    "description": "Area mapping for hierarchy decomposition. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "canvas",
    "series": [
      "rect"
    ],
    "variants": [
      "slice-dice",
      "squarified",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection",
      "drill-down"
    ],
    "capabilities": [
      "legend",
      "annotations",
      "drill-down"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Node label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Node size value"
      }
    ],
    "d3Analogs": [
      "d3.treemap",
      "d3.hierarchy",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to Treemap-like hierarchical series",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Storage allocation by category",
      "Tapered flow view showing narrowing throughput across stages",
      "Treemap with tapered flow storytelling"
    ]
  },
  {
    "name": "waterfall-tapered-flow",
    "family": "financial",
    "description": "Sequential deltas with total accumulation. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "bar",
      "rule"
    ],
    "variants": [
      "bridge",
      "subtotal",
      "total-line",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "grid",
      "annotations",
      "axes"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Sequence label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Delta amount"
      }
    ],
    "d3Analogs": [
      "d3.cumsum",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to WaterfallSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Budget to actual variance",
      "Tapered flow view showing narrowing throughput across stages",
      "Waterfall with tapered flow storytelling"
    ]
  },
  {
    "name": "donut-tapered-flow",
    "family": "polar",
    "description": "Pie with inner radius for ratio and share. (Tapered Flow variant). Adds directional tapering and value emphasis to show acceleration, attrition, or narrowing conversion.",
    "renderer": "svg",
    "series": [
      "arc"
    ],
    "variants": [
      "label-inside",
      "thick-ring",
      "tapered-flow"
    ],
    "interactions": [
      "tooltip",
      "selection"
    ],
    "capabilities": [
      "legend",
      "annotations"
    ],
    "dataShape": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Slice label"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Slice size"
      }
    ],
    "d3Analogs": [
      "d3.pie",
      "d3.arc",
      "d3.sankey"
    ],
    "devextremeHints": [
      "Comparable to DonutSeries",
      "Useful for throughput, conversion, and value loss stories."
    ],
    "examples": [
      "Traffic channel share",
      "Tapered flow view showing narrowing throughput across stages",
      "Donut with tapered flow storytelling"
    ]
  }
];
