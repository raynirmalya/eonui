import { describe, expect, it } from 'vitest';
import { componentLibrary } from './component-library';
import { chartLibrary } from './charts-library';
import { requiredEonComponentTags } from '../../eon-core/src/manifest/registry';

describe('component library', () => {
  it('contains the first high-quality component slice', () => {
    expect(componentLibrary.length).toBeGreaterThanOrEqual(15);
    expect(componentLibrary.some((entry) => entry.tag === 'eon-button')).toBe(true);
  });

  it('keeps interactive overlay components documented in the manifest', () => {
    const requiredTags = ['eon-combobox', 'eon-dialog', 'eon-drawer', 'eon-dropdown-menu', 'eon-popover'];
    expect(componentLibrary.filter((entry) => requiredTags.includes(entry.tag)).map((entry) => entry.tag).sort()).toEqual(
      requiredTags.sort()
    );
  });

  it('loads components from the source-owned core registry', async () => {
    const coreRegistry = await import('../../eon-core/src/manifest/registry.ts');
    expect(componentLibrary.length).toBe(coreRegistry.componentManifestRegistry.length);
    expect(componentLibrary.map((entry) => entry.tag)).toEqual(coreRegistry.componentManifestRegistry.map((entry) => entry.tag));
  });

  it('covers the full requested Eon core catalog', () => {
    expect(componentLibrary.map((entry) => entry.tag).sort()).toEqual([...requiredEonComponentTags].sort());
  });
});

describe('chart library', () => {
  it('loads charts from the source-owned mystique registry', async () => {
    const chartRegistry = await import('../../eon-charts-core/src/manifest/registry.ts');
    expect(chartLibrary.length).toBe(chartRegistry.getMystiqueChartManifest().length);
    expect(chartLibrary.map((entry) => entry.name)).toEqual(chartRegistry.getMystiqueChartManifest().map((entry) => entry.name));
  });

  it('targets the expanded Eon chart catalog size', async () => {
    const chartRegistry = await import('../../eon-charts-core/src/manifest/registry.ts');
    expect(chartRegistry.getMystiqueChartManifest().length).toBe(chartRegistry.MYSTIQUE_CHART_CATALOG_SIZE);
  });
});
