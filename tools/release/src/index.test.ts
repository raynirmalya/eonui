import { describe, expect, it } from 'vitest';
import { publishablePackageNames, releaseChecklist, releaseCommands } from './index';
import corePackage from '../../../packages/eon-core/package.json';
import reactPackage from '../../../packages/eon-react/package.json';
import angularPackage from '../../../packages/eon-angular/package.json';
import vuePackage from '../../../packages/eon-vue/package.json';
import manifestPackage from '../../../packages/eon-manifest/package.json';
import aiPromptsPackage from '../../../packages/eon-ai-prompts/package.json';
import tokensPackage from '../../../packages/tokens/package.json';
import stylesPackage from '../../../packages/styles/package.json';
import a11yPackage from '../../../packages/a11y/package.json';
import i18nPackage from '../../../packages/i18n/package.json';
import mystiqueCorePackage from '../../../packages/eon-charts-core/package.json';
import mystiqueSvgPackage from '../../../packages/eon-charts-svg/package.json';
import mystiqueCanvasPackage from '../../../packages/eon-charts-canvas/package.json';
import mystiqueComponentsPackage from '../../../packages/eon-charts/package.json';

const publishablePackages = [
  corePackage,
  reactPackage,
  angularPackage,
  vuePackage,
  manifestPackage,
  aiPromptsPackage,
  tokensPackage,
  stylesPackage,
  a11yPackage,
  i18nPackage,
  mystiqueCorePackage,
  mystiqueSvgPackage,
  mystiqueCanvasPackage,
  mystiqueComponentsPackage
];

describe('release metadata', () => {
  it('keeps a publish checklist', () => {
    expect(releaseChecklist).toContain('Run pnpm release');
    expect(releaseChecklist).toContain('Run pnpm docs:generate');
  });

  it('keeps publishable package names aligned with package metadata', () => {
    expect(publishablePackages.map((pkg) => pkg.name)).toEqual([...publishablePackageNames]);
  });

  it('ensures publishable packages expose access and exports metadata', () => {
    publishablePackages.forEach((pkg) => {
      expect(pkg.publishConfig?.access).toBe('public');
      expect(pkg.exports?.['.']).toBeTruthy();
      expect(pkg.main).toBeTruthy();
      expect(pkg.types).toBeTruthy();
    });
  });

  it('keeps release commands available to tooling', () => {
    expect(releaseCommands.verify).toBe('pnpm verify');
    expect(releaseCommands.publish).toBe('pnpm release');
  });
});
