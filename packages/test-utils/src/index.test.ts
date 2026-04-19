import { describe, expect, it } from 'vitest';
import { containsAccessibilityMarkers, createManifestContractExpectation, createQualityChecklist } from './index';

describe('manifest contract helpers', () => {
  it('extracts stable component names', () => {
    expect(createManifestContractExpectation([{ name: 'button' }, { name: 'dialog' }])).toEqual(['button', 'dialog']);
  });

  it('checks accessibility markers in serialized source strings', () => {
    expect(containsAccessibilityMarkers('<div role="dialog" aria-modal="true"></div>', ['role="dialog"', 'aria-modal'])).toBe(true);
  });

  it('creates a simple quality checklist view', () => {
    expect(createQualityChecklist(['contracts', 'a11y'])[0]?.status).toBe('covered');
  });
});
