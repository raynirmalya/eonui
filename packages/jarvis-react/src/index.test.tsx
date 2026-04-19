import { describe, expect, it } from 'vitest';
import { reactIntegrationNotes, reactUsageExample } from './index';

describe('react wrapper package', () => {
  it('documents wrapper integration notes for SSR, events, and forms', () => {
    expect(reactIntegrationNotes.events).toContain('onJarvisInput');
    expect(reactIntegrationNotes.ssr).toContain('client');
    expect(reactIntegrationNotes.forms).toContain('custom events');
  });

  it('includes a concrete framework usage example', () => {
    expect(reactUsageExample).toContain('JarvisCombobox');
    expect(reactUsageExample).toContain('ensureJarvisReact');
  });
});

