import { describe, expect, it } from 'vitest';
import { componentManifestRegistry, requiredEonComponentTags } from './registry';

describe('Eon core registry', () => {
  it('contains the full requested Phase 3 component catalog', () => {
    expect(componentManifestRegistry.map((entry) => entry.tag).sort()).toEqual([...requiredEonComponentTags].sort());
    expect(componentManifestRegistry).toHaveLength(requiredEonComponentTags.length);
  });

  it('keeps component tags unique', () => {
    const tags = componentManifestRegistry.map((entry) => entry.tag);
    expect(new Set(tags).size).toBe(tags.length);
  });

  it('documents hardened state props for primary controls', () => {
    const byTag = new Map(componentManifestRegistry.map((entry) => [entry.tag, entry]));
    expect(byTag.get('eon-button')?.props.some((prop) => prop.name === 'loading')).toBe(true);
    expect(byTag.get('eon-icon-button')?.props.some((prop) => prop.name === 'loading')).toBe(true);
    expect(byTag.get('eon-input')?.props.some((prop) => prop.name === 'invalid')).toBe(true);
    expect(byTag.get('eon-textarea')?.props.some((prop) => prop.name === 'errorText')).toBe(true);
    expect(byTag.get('eon-select')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('eon-combobox')?.props.some((prop) => prop.name === 'required')).toBe(true);
    expect(byTag.get('eon-checkbox')?.props.some((prop) => prop.name === 'invalid')).toBe(true);
    expect(byTag.get('eon-radio')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('eon-switch')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('eon-pagination')?.props.some((prop) => prop.name === 'disabled')).toBe(true);
    expect(byTag.get('eon-alert')?.props.some((prop) => prop.name === 'polite')).toBe(true);
    expect(byTag.get('eon-toast')?.props.some((prop) => prop.name === 'polite')).toBe(true);
    expect(byTag.get('eon-dialog')?.props.some((prop) => prop.name === 'label')).toBe(true);
    expect(byTag.get('eon-dialog')?.props.some((prop) => prop.name === 'fullScreen')).toBe(true);
    expect(byTag.get('eon-drawer')?.props.some((prop) => prop.name === 'label')).toBe(true);
    expect(byTag.get('eon-drawer')?.props.some((prop) => prop.name === 'fullScreen')).toBe(true);
    expect(byTag.get('eon-popover')?.props.some((prop) => prop.name === 'label')).toBe(true);
    expect(byTag.get('eon-popover')?.props.some((prop) => prop.name === 'renderInViewport')).toBe(true);
    expect(byTag.get('eon-dropdown-menu')?.props.some((prop) => prop.name === 'renderInViewport')).toBe(true);
    expect(byTag.get('eon-action-sheet')?.props.some((prop) => prop.name === 'fullScreen')).toBe(true);
    expect(byTag.get('eon-load-panel')?.props.some((prop) => prop.name === 'coverViewport')).toBe(true);
  });
});
