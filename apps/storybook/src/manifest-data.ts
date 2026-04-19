import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { componentLibrary } from '@jarvis/manifest';
import type { LibraryManifest } from '@jarvis/manifest';

export async function loadManifestData(): Promise<LibraryManifest> {
  try {
    const raw = await readFile(resolve(process.cwd(), '../../packages/jarvis-manifest/generated/library.manifest.json'), 'utf8');
    return JSON.parse(raw) as LibraryManifest;
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      components: componentLibrary,
      charts: []
    };
  }
}
