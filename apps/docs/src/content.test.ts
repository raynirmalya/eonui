import { describe, expect, it } from 'vitest';
import { guidePages } from './content';

describe('docs guide content', () => {
  it('includes the major docs information architecture pages', () => {
    expect(guidePages.map((page) => page.slug).sort()).toEqual(
      [
        'accessibility',
        'ai',
        'figma-mapping',
        'frameworks',
        'getting-started',
        'i18n',
        'installation',
        'migration-versioning',
        'theming'
      ].sort()
    );
  });
});

