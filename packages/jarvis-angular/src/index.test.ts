import { describe, expect, it } from 'vitest';
import { angularFormExample, angularIntegrationGuide, angularUsageExample } from './index';

describe('angular wrapper package', () => {
  it('documents framework integration guidance', () => {
    expect(angularIntegrationGuide.events).toContain('(jarvisInput)');
    expect(angularIntegrationGuide.forms).toContain('ControlValueAccessor');
  });

  it('includes component and form usage examples', () => {
    expect(angularUsageExample).toContain('jarvis-section');
    expect(angularFormExample).toContain('(jarvisChange)');
  });
});

