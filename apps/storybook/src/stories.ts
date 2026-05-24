import type { ComponentManifestEntry, LibraryManifest } from '@eonui/manifest';

export type StoryDefinition = {
  id: string;
  title: string;
  componentTag: string;
  category: string;
  code: string;
  summary: string;
};

function defaultExample(component: ComponentManifestEntry): string {
  return component.examples[0]?.code ?? `<${component.tag}></${component.tag}>`;
}

export function createStories(manifest: LibraryManifest): StoryDefinition[] {
  return manifest.components.map((component) => ({
    id: component.tag,
    title: component.tag.replace('eon-', ''),
    componentTag: component.tag,
    category: component.category,
    code: defaultExample(component),
    summary: component.description
  }));
}
