import type { EmitTarget, MappedNode } from './types';

function emitProps(
  props: Record<string, string>,
  target: EmitTarget
): string {
  const entries = Object.entries(props);
  if (!entries.length) {
    return '';
  }

  return entries
    .map(([key, value]) => {
      if (target === 'react') {
        return `${key}="${value}"`;
      }
      if (target === 'angular') {
        return `${key}="${value}"`;
      }
      if (target === 'vue') {
        return `:${key}="'${value}'"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

function emitNode(node: MappedNode, target: EmitTarget, depth = 0): string {
  const indent = '  '.repeat(depth);

  if (node.kind === 'text') {
    return `${indent}${node.text ?? ''}`;
  }

  const tag =
    target === 'react'
      ? node.frameworkName ?? node.tag
      : node.tag;
  const props = emitProps(node.props, target);
  const open = props ? `<${tag} ${props}>` : `<${tag}>`;
  const children = node.children.map((child) => emitNode(child, target, depth + 1)).join('\n');
  const inlineText = node.text ? `${children ? '\n' : ''}${'  '.repeat(depth + 1)}${node.text}` : '';
  const content = [children, inlineText].filter(Boolean).join('\n');

  if (!content) {
    return `${indent}${open}</${tag}>`;
  }

  return `${indent}${open}\n${content}\n${indent}</${tag}>`;
}

export function emitMappedTree(node: MappedNode, target: EmitTarget): string {
  return emitNode(node, target);
}

