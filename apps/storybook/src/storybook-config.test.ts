import { describe, expect, it } from 'vitest';
import config from '../.storybook/main';

describe('storybook config', () => {
  it('is configured for web components stories', () => {
    expect(config.framework?.name).toBe('@storybook/web-components-vite');
    expect(config.stories).toContain('../src/**/*.stories.ts');
  });
});

