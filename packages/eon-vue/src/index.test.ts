import { describe, expect, it } from 'vitest';
import { vueFormExample, vueIntegrationGuide, vueUsageExample } from './index';

describe('vue wrapper package', () => {
  it('documents framework integration guidance', () => {
    expect(vueIntegrationGuide.events).toContain('@eonInput');
    expect(vueIntegrationGuide.ssr).toContain('onMounted');
  });

  it('includes component and form usage examples', () => {
    expect(vueUsageExample).toContain('ensureEonVue');
    expect(vueFormExample).toContain('@eonChange');
  });
});

