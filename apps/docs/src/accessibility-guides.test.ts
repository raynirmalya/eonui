import { describe, expect, it } from 'vitest';
import { sharedGuides } from './accessibility-guides';

describe('shared docs guides', () => {
  it('exposes a11y and i18n guide sections for docs consumption', () => {
    expect(sharedGuides.a11y.focus.length).toBeGreaterThan(0);
    expect(sharedGuides.i18n.locale.length).toBeGreaterThan(0);
    expect(sharedGuides.i18n.direction.length).toBeGreaterThan(0);
  });
});
