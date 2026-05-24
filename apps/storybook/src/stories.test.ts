import { describe, expect, it } from 'vitest';
import { componentLibrary } from '@eonui/manifest';
import { createStories } from './stories';

describe('storybook stories', () => {
  it('creates one story entry per manifest component', () => {
    const stories = createStories({
      generatedAt: new Date().toISOString(),
      components: componentLibrary,
      charts: []
    });

    expect(stories).toHaveLength(componentLibrary.length);
    expect(stories[0]).toHaveProperty('componentTag');
    expect(stories[0]).toHaveProperty('code');
  });

  it('keeps story ids aligned with component tags', () => {
    const stories = createStories({
      generatedAt: new Date().toISOString(),
      components: componentLibrary,
      charts: []
    });

    expect(stories.map((story) => story.id)).toEqual(componentLibrary.map((component) => component.tag));
  });
});
