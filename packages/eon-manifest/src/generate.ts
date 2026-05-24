import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { LibraryManifest } from './schema';

const currentDir = dirname(fileURLToPath(import.meta.url));

async function loadSourceRegistries(): Promise<Pick<LibraryManifest, 'components' | 'charts'>> {
  const componentRegistryUrl = pathToFileURL(resolve(currentDir, '../../eon-core/src/manifest/registry.ts')).href;
  const chartRegistryUrl = pathToFileURL(resolve(currentDir, '../../eon-charts-core/src/manifest/registry.ts')).href;
  const componentRegistryModule = (await import(componentRegistryUrl)) as {
    componentManifestRegistry: LibraryManifest['components'];
  };
  const chartRegistryModule = (await import(chartRegistryUrl)) as {
    getMystiqueChartManifest: (target?: number) => Array<{
      name: string;
      description: string;
      renderer: 'svg' | 'canvas' | 'hybrid';
      series: string[];
    }>;
  };

  return {
    components: componentRegistryModule.componentManifestRegistry,
    charts: chartRegistryModule.getMystiqueChartManifest()
  };
}

async function main(): Promise<void> {
  const { components: componentLibrary, charts: chartLibrary } = await loadSourceRegistries();
  const manifest: LibraryManifest = {
    generatedAt: new Date().toISOString(),
    components: componentLibrary,
    charts: chartLibrary
  };
  const outputDir = resolve(process.cwd(), 'generated');
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'library.manifest.json'), JSON.stringify(manifest, null, 2));
  await writeFile(
    resolve(outputDir, 'component-specs.md'),
    componentLibrary
      .map(
        (component) => `## ${component.tag}\n\n${component.description}\n\n### Anatomy\n${component.anatomy
          .map((part) => `- ${part}`)
          .join('\n')}\n${
            component.spec
              ? `\n### Variants\n${(component.spec.variants ?? []).map((variant) => `- ${variant}`).join('\n')}\n\n### States\n${(component.spec.states ?? [])
                  .map((state) => `- ${state}`)
                  .join('\n')}\n\n### Interactions\n${(component.spec.interactions ?? [])
                  .map((interaction) => `- ${interaction}`)
                  .join('\n')}\n`
              : ''
          }`
      )
      .join('\n')
  );
  await writeFile(
    resolve(outputDir, 'chart-specs.md'),
    chartLibrary
      .map(
        (chart) => `## ${chart.name}\n\n${chart.description}\n\n### Renderer\n- ${chart.renderer}\n\n### Series\n${chart.series
          .map((series) => `- ${series}`)
          .join('\n')}\n`
      )
      .join('\n')
  );
  await writeFile(
    resolve(currentDir, 'generated-component-library.ts'),
    `import type { ComponentManifestEntry } from './schema';\n\nexport const componentLibrary: ComponentManifestEntry[] = ${JSON.stringify(
      componentLibrary,
      null,
      2
    )};\n`
  );
  await writeFile(
    resolve(currentDir, 'generated-charts-library.ts'),
    `import type { LibraryManifest } from './schema';\n\nexport const chartLibrary: LibraryManifest['charts'] = ${JSON.stringify(
      chartLibrary,
      null,
      2
    )};\n`
  );
}

main();
