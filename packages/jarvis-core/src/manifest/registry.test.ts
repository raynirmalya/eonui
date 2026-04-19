import { describe, expect, it } from 'vitest';
import { componentManifestRegistry, requiredJarvisComponentTags } from './registry';

describe('jarvis core registry', () => {
  it('contains the full requested Phase 3 component catalog', () => {
    expect(componentManifestRegistry.map((entry) => entry.tag).sort()).toEqual([...requiredJarvisComponentTags].sort());
    expect(componentManifestRegistry).toHaveLength(requiredJarvisComponentTags.length);
  });

  it('keeps component tags unique', () => {
    const tags = componentManifestRegistry.map((entry) => entry.tag);
    expect(new Set(tags).size).toBe(tags.length);
  });

  it('documents hardened state props for primary controls', () => {
    const byTag = new Map(componentManifestRegistry.map((entry) => [entry.tag, entry]));
    expect(byTag.get('jarvis-button')?.props.some((prop) => prop.name === 'loading')).toBe(true);
    expect(byTag.get('jarvis-icon-button')?.props.some((prop) => prop.name === 'loading')).toBe(true);
    expect(byTag.get('jarvis-input')?.props.some((prop) => prop.name === 'invalid')).toBe(true);
    expect(byTag.get('jarvis-textarea')?.props.some((prop) => prop.name === 'errorText')).toBe(true);
    expect(byTag.get('jarvis-select')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('jarvis-combobox')?.props.some((prop) => prop.name === 'required')).toBe(true);
    expect(byTag.get('jarvis-checkbox')?.props.some((prop) => prop.name === 'invalid')).toBe(true);
    expect(byTag.get('jarvis-radio')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('jarvis-switch')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('jarvis-pagination')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('jarvis-alert')?.props.some((prop) => prop.name === 'polite')).toBe(true);
    expect(byTag.get('jarvis-toast')?.props.some((prop) => prop.name === 'polite')).toBe(true);
    expect(byTag.get('jarvis-dialog')?.props.some((prop) => prop.name === 'label')).toBe(true);
    expect(byTag.get('jarvis-drawer')?.props.some((prop) => prop.name === 'label')).toBe(true);
    expect(byTag.get('jarvis-popover')?.props.some((prop) => prop.name === 'label')).toBe(true);
  });
});
