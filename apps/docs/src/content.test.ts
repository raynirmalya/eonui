import { describe, expect, it } from 'vitest';
import { guidePages } from './content';

describe('docs guide content', () => {
  it('includes the major docs information architecture pages', () => {
    const slugs = guidePages.map((page) => page.slug);

    expect(slugs).toEqual(expect.arrayContaining([
      'accessibility',
      'ai',
      'figma-mapping',
      'frameworks',
      'getting-started',
      'i18n',
      'installation',
      'migration-versioning',
      'theming',
      'validation-workflows'
    ]));
  });
});
