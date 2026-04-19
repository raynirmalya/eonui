import { describe, expect, it } from 'vitest';
import { chartGuide } from './chart-guides';

describe('chart guides', () => {
  it('surfaces Mystique chart guidance for docs', () => {
    expect(chartGuide.interactions.length).toBeGreaterThan(0);
    expect(chartGuide.rendering.length).toBeGreaterThan(0);
    expect(chartGuide.composition.length).toBeGreaterThan(0);
  });
});
