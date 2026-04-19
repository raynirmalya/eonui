import { describe, expect, it } from 'vitest';
import {
  renderSvgCandlestickChart,
  renderSvgComboChart,
  renderSvgFunnelChart,
  renderSvgGroupedBarChart,
  renderSvgHistogramChart,
  renderSvgRadarChart,
  renderSvgStackedBarChart,
  renderSvgWaterfallChart
} from './index';

describe('nabuela svg renderers', () => {
  it('renders grouped and stacked categorical charts', () => {
    expect(renderSvgGroupedBarChart([{ label: 'Q1', values: [4, 6] }])).toContain('Grouped bar chart');
    expect(renderSvgStackedBarChart([{ label: 'Q1', values: [4, 6] }])).toContain('Stacked bar chart');
  });

  it('renders specialized analytical chart families', () => {
    expect(renderSvgHistogramChart([{ label: '0-10', value: 8 }])).toContain('Histogram');
    expect(
      renderSvgWaterfallChart([
        { label: 'Start', value: 10 },
        { label: 'Gain', value: 5 },
        { label: 'Loss', value: -3 }
      ])
    ).toContain('Waterfall chart');
    expect(renderSvgFunnelChart([{ label: 'Visit', value: 100 }, { label: 'Signup', value: 40 }])).toContain('Funnel chart');
  });

  it('renders radial and financial charts', () => {
    expect(renderSvgRadarChart([{ label: 'A', value: 4 }, { label: 'B', value: 7 }, { label: 'C', value: 5 }])).toContain('Radar chart');
    expect(renderSvgCandlestickChart([{ label: 'Mon', open: 10, high: 14, low: 8, close: 12 }])).toContain('Candlestick chart');
  });

  it('renders combo charts with both bar and line marks', () => {
    const output = renderSvgComboChart([{ label: 'Jan', bar: 14, line: 11 }]);
    expect(output).toContain('Combo chart');
    expect(output).toContain('<rect');
    expect(output).toContain('<path');
  });
});
