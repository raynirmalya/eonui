import { describe, expect, it } from 'vitest';
import { asPercent } from '../shared/helpers';

describe('shared helper', () => {
  it('clamps percent values', () => {
    expect(asPercent(150)).toBe(100);
  });
});
