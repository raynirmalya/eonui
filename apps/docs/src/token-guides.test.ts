import { describe, expect, it } from 'vitest';
import { tokenGuide } from './token-guides';

describe('token guide', () => {
  it('exposes themes, density options, and featured token entries', () => {
    expect(tokenGuide.themes.map((entry) => entry.name)).toEqual(expect.arrayContaining(['dark', 'highContrast', 'light', 'premium']));
    expect(tokenGuide.density.map((entry) => entry.name)).toEqual(expect.arrayContaining(['comfortable', 'compact']));
    expect(tokenGuide.featuredTokens.some((token) => token.key === 'semantic.chart.axis')).toBe(true);
  });
});
