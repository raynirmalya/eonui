import { describe, expect, it } from 'vitest';
import { clamp, toKebabCase } from './index';

describe('utils', () => {
  it('clamps values into the provided range', () => {
    expect(clamp(12, 0, 10)).toBe(10);
    expect(clamp(-2, 0, 10)).toBe(0);
  });

  it('converts mixed case strings to kebab case', () => {
    expect(toKebabCase('JarvisButtonGroup')).toBe('jarvis-button-group');
  });
});

