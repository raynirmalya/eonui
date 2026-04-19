import { describe, expect, it } from 'vitest';
import { componentLibrary } from './component-library';
import { chartLibrary } from './charts-library';
import { requiredJarvisComponentTags } from '../../jarvis-core/src/manifest/registry';

describe('component library', () => {
  it('contains the first high-quality component slice', () => {
    expect(componentLibrary.length).toBeGreaterThanOrEqual(15);
    expect(componentLibrary.some((entry) => entry.tag === 'jarvis-button')).toBe(true);
  });

  it('keeps interactive overlay components documented in the manifest', () => {
    const requiredTags = ['jarvis-combobox', 'jarvis-dialog', 'jarvis-drawer', 'jarvis-dropdown-menu', 'jarvis-popover'];
    expect(componentLibrary.filter((entry) => requiredTags.includes(entry.tag)).map((entry) => entry.tag).sort()).toEqual(
      requiredTags.sort()
    );
  });

  it('loads components from the source-owned core registry', async () => {
    const coreRegistry = await import('../../jarvis-core/src/manifest/registry.ts');
    expect(componentLibrary.length).toBe(coreRegistry.componentManifestRegistry.length);
    expect(componentLibrary.map((entry) => entry.tag)).toEqual(coreRegistry.componentManifestRegistry.map((entry) => entry.tag));
  });

  it('covers the full requested Jarvis core catalog', () => {
    expect(componentLibrary.map((entry) => entry.tag).sort()).toEqual([...requiredJarvisComponentTags].sort());
  });
});

describe('chart library', () => {
  it('loads charts from the source-owned mystique registry', async () => {
    const mystiqueRegistry = await import('../../mystique-core/src/manifest/registry.ts');
    expect(chartLibrary.length).toBe(mystiqueRegistry.getMystiqueChartManifest().length);
    expect(chartLibrary.map((entry) => entry.name)).toEqual(mystiqueRegistry.getMystiqueChartManifest().map((entry) => entry.name));
  });

  it('targets the expanded Mystique chart catalog size', async () => {
    const mystiqueRegistry = await import('../../mystique-core/src/manifest/registry.ts');
    expect(mystiqueRegistry.getMystiqueChartManifest().length).toBe(mystiqueRegistry.MYSTIQUE_CHART_CATALOG_SIZE);
  });
});
