import { describe, expect, it } from 'vitest';
import { tokenGuide } from './token-guides';

describe('token guide', () => {
  it('exposes themes, density options, and featured token entries', () => {
    expect(tokenGuide.themes.map((entry) => entry.name).sort()).toEqual(['dark', 'highContrast', 'light'].sort());
    expect(tokenGuide.density.map((entry) => entry.name).sort()).toEqual(['comfortable', 'compact'].sort());
    expect(tokenGuide.featuredTokens.some((token) => token.key === 'semantic.chart.axis')).toBe(true);
  });
});
