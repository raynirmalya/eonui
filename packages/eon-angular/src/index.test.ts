import { describe, expect, it } from 'vitest';
import { angularFormExample, angularIntegrationGuide, angularUsageExample } from './index';

describe('angular wrapper package', () => {
  it('documents framework integration guidance', () => {
    expect(angularIntegrationGuide.events).toContain('(eonInput)');
    expect(angularIntegrationGuide.forms).toContain('ControlValueAccessor');
  });

  it('includes component and form usage examples', () => {
    expect(angularUsageExample).toContain('eon-section');
    expect(angularFormExample).toContain('(eonChange)');
  });
});

