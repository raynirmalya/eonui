import { emitMappedTree } from './emitters';
import { mapFigmaTree } from './mapping';
import type { EmitTarget, FigmaNode } from './types';

export * from './types';
export * from './mapping';
export * from './emitters';
export * from './guide';

export function mapFigmaToCode(input: FigmaNode, target: EmitTarget): string {
  return emitMappedTree(mapFigmaTree(input), target);
}

const sample: FigmaNode = {
  name: 'section',
  type: 'frame',
  props: {
    title: 'Workspace settings'
  },
  children: [
    {
      name: 'stack',
      type: 'frame',
      children: [
        { name: 'button', type: 'instance', variant: 'solid', text: 'Save' },
        { name: 'card', type: 'instance', children: [{ name: 'badge', type: 'instance', text: 'Pro' }] }
      ]
    }
  ]
};

console.log(mapFigmaToCode(sample, 'custom-elements'));
