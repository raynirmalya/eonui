import { componentLibrary } from '@eonui/manifest';
import { flattenTokens, tokens } from '@eonui/tokens';
import type { FigmaNode, FigmaPropertyValue, MappedNode } from './types';

const flattenedTokens = flattenTokens({
  base: tokens.base,
  semantic: tokens.semantic,
  component: tokens.component
});

const aliasMap: Record<string, string> = {
  frame: 'eon-surface',
  group: 'eon-stack',
  section: 'eon-section',
  stack: 'eon-stack',
  grid: 'eon-grid',
  surface: 'eon-surface',
  button: 'eon-button',
  input: 'eon-input',
  textarea: 'eon-textarea',
  select: 'eon-select',
  combobox: 'eon-combobox',
  card: 'eon-card',
  badge: 'eon-badge',
  alert: 'eon-alert',
  toolbar: 'eon-toolbar',
  emptystate: 'eon-empty-state',
  'empty-state': 'eon-empty-state'
};

function normalizeName(value: string): string {
  return value.replace(/\s+/g, '').toLowerCase();
}

function resolveComponentTag(name: string): string {
  const normalized = normalizeName(name);
  const alias = aliasMap[normalized];
  if (alias) {
    return alias;
  }

  const fromManifest = componentLibrary.find(
    (component) => normalizeName(component.name) === normalized || normalizeName(component.tag) === normalized
  );

  return fromManifest?.tag ?? 'eon-surface';
}

function resolveTokenBinding(value: FigmaPropertyValue): { token?: string; value: string } {
  if (typeof value === 'object' && value?.type === 'token') {
    const key = value.value.replace(/^Eon\./, '').replace(/\//g, '.');
    const token = flattenedTokens[key];
    return {
      token: key,
      value: token ? `var(--eon-${key.replace(/\./g, '-')})` : value.value
    };
  }

  return { value: String(value) };
}

function applyNodeSpecificProps(node: FigmaNode, tag: string): { props: Record<string, string>; tokenBindings: Record<string, string> } {
  const props: Record<string, string> = {};
  const tokenBindings: Record<string, string> = {};

  Object.entries(node.props ?? {}).forEach(([key, value]) => {
    const resolved = resolveTokenBinding(value);
    props[key] = resolved.value;
    if (resolved.token) {
      tokenBindings[key] = resolved.token;
    }
  });

  if (tag === 'eon-button' && node.variant) {
    props.variant = node.variant;
  }

  if (tag === 'eon-section' && node.props?.title) {
    props.heading = String(node.props.title);
  }

  if (tag === 'eon-stack' && !props.gap) {
    props.gap = 'var(--eon-component-layout-gap)';
  }

  if (tag === 'eon-grid' && !props.min) {
    props.min = '16rem';
  }

  return { props, tokenBindings };
}

export function mapFigmaNode(node: FigmaNode): MappedNode {
  if (node.type === 'text') {
    return {
      kind: 'text',
      tag: 'span',
      props: {},
      tokenBindings: {},
      children: [],
      text: node.text ?? node.name
    };
  }

  const tag = resolveComponentTag(node.name || node.type || 'surface');
  const { props, tokenBindings } = applyNodeSpecificProps(node, tag);
  const frameworkName =
    `Eon${tag
      .replace('eon-', '')
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')}`;

  return {
    kind: 'component',
    tag,
    frameworkName,
    props,
    tokenBindings,
    children: (node.children ?? []).map(mapFigmaNode),
    text: node.text
  };
}

export function mapFigmaTree(root: FigmaNode): MappedNode {
  return mapFigmaNode(root);
}
