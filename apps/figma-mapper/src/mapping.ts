import { componentLibrary } from '@jarvis/manifest';
import { flattenTokens, tokens } from '@jarvis/tokens';
import type { FigmaNode, FigmaPropertyValue, MappedNode } from './types';

const flattenedTokens = flattenTokens({
  base: tokens.base,
  semantic: tokens.semantic,
  component: tokens.component
});

const aliasMap: Record<string, string> = {
  frame: 'jarvis-surface',
  group: 'jarvis-stack',
  section: 'jarvis-section',
  stack: 'jarvis-stack',
  grid: 'jarvis-grid',
  surface: 'jarvis-surface',
  button: 'jarvis-button',
  input: 'jarvis-input',
  textarea: 'jarvis-textarea',
  select: 'jarvis-select',
  combobox: 'jarvis-combobox',
  card: 'jarvis-card',
  badge: 'jarvis-badge',
  alert: 'jarvis-alert',
  toolbar: 'jarvis-toolbar',
  emptystate: 'jarvis-empty-state',
  'empty-state': 'jarvis-empty-state'
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

  return fromManifest?.tag ?? 'jarvis-surface';
}

function resolveTokenBinding(value: FigmaPropertyValue): { token?: string; value: string } {
  if (typeof value === 'object' && value?.type === 'token') {
    const key = value.value.replace(/^jarvis\./, '').replace(/\//g, '.');
    const token = flattenedTokens[key];
    return {
      token: key,
      value: token ? `var(--jarvis-${key.replace(/\./g, '-')})` : value.value
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

  if (tag === 'jarvis-button' && node.variant) {
    props.variant = node.variant;
  }

  if (tag === 'jarvis-section' && node.props?.title) {
    props.heading = String(node.props.title);
  }

  if (tag === 'jarvis-stack' && !props.gap) {
    props.gap = 'var(--jarvis-component-layout-gap)';
  }

  if (tag === 'jarvis-grid' && !props.min) {
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
    `Jarvis${tag
      .replace('jarvis-', '')
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
