import { describe, expect, it } from 'vitest';
import { emitMappedTree } from './emitters';
import { mapFigmaTree } from './mapping';
import type { FigmaNode } from './types';

describe('figma mapper', () => {
  const sample: FigmaNode = {
    name: 'section',
    type: 'frame',
    props: {
      title: 'Billing settings'
    },
    children: [
      {
        name: 'stack',
        type: 'frame',
        children: [
          {
            name: 'button',
            type: 'instance',
            variant: 'solid',
            text: 'Save'
          },
          {
            name: 'card',
            type: 'instance',
            props: {
              padding: { type: 'token', value: 'component.card.padding' }
            },
            children: [{ name: 'badge', type: 'instance', text: 'Pro' }]
          }
        ]
      }
    ]
  };

  it('maps structured figma nodes into jarvis components', () => {
    const mapped = mapFigmaTree(sample);
    expect(mapped.tag).toBe('jarvis-section');
    expect(mapped.children[0]?.tag).toBe('jarvis-stack');
  });

  it('emits raw custom-element code', () => {
    const code = emitMappedTree(mapFigmaTree(sample), 'custom-elements');
    expect(code).toContain('<jarvis-section');
    expect(code).toContain('<jarvis-button');
  });

  it('emits react wrapper usage', () => {
    const code = emitMappedTree(mapFigmaTree(sample), 'react');
    expect(code).toContain('<JarvisButton');
  });

  it('emits angular and vue compatible templates', () => {
    const mapped = mapFigmaTree(sample);
    expect(emitMappedTree(mapped, 'angular')).toContain('<jarvis-button');
    expect(emitMappedTree(mapped, 'vue')).toContain('<jarvis-button');
  });
});

