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

  it('maps structured figma nodes into Eon components', () => {
    const mapped = mapFigmaTree(sample);
    expect(mapped.tag).toBe('eon-section');
    expect(mapped.children[0]?.tag).toBe('eon-stack');
  });

  it('emits raw custom-element code', () => {
    const code = emitMappedTree(mapFigmaTree(sample), 'custom-elements');
    expect(code).toContain('<eon-section');
    expect(code).toContain('<eon-button');
  });

  it('emits react wrapper usage', () => {
    const code = emitMappedTree(mapFigmaTree(sample), 'react');
    expect(code).toContain('<EonButton');
  });

  it('emits angular and vue compatible templates', () => {
    const mapped = mapFigmaTree(sample);
    expect(emitMappedTree(mapped, 'angular')).toContain('<eon-button');
    expect(emitMappedTree(mapped, 'vue')).toContain('<eon-button');
  });
});

