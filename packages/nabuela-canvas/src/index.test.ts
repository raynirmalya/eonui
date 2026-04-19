import { describe, expect, it, vi } from 'vitest';
import { drawHeatmap, drawScatterPlot, drawTreemap } from './index';

function createMockContext() {
  return {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    set fillStyle(value: string) {
      void value;
    },
    set font(value: string) {
      void value;
    },
    set textBaseline(value: CanvasTextBaseline) {
      void value;
    }
  } as unknown as CanvasRenderingContext2D;
}

describe('nabuela canvas renderers', () => {
  it('draws a heatmap grid', () => {
    const ctx = createMockContext();
    drawHeatmap(
      ctx,
      [
        { x: 0, y: 0, value: 2 },
        { x: 1, y: 0, value: 4 }
      ],
      200,
      100
    );
    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.fillRect).toHaveBeenCalled();
  });

  it('draws a treemap strip layout', () => {
    const ctx = createMockContext();
    drawTreemap(
      ctx,
      [
        { label: 'A', value: 3 },
        { label: 'B', value: 2 }
      ],
      240,
      120
    );
    expect(ctx.fillRect).toHaveBeenCalled();
    expect(ctx.fillText).toHaveBeenCalled();
  });

  it('draws a scatter plot with arcs', () => {
    const ctx = createMockContext();
    drawScatterPlot(
      ctx,
      [
        { x: 1, y: 2, value: 6 },
        { x: 3, y: 5, value: 8 }
      ],
      320,
      180
    );
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });
});
