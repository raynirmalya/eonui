export type FigmaTokenRef = {
  type: 'token';
  value: string;
};

export type FigmaLiteral = string | number | boolean;

export type FigmaPropertyValue = FigmaLiteral | FigmaTokenRef;

export type FigmaNode = {
  id?: string;
  name: string;
  type?: 'frame' | 'component' | 'instance' | 'text' | 'group';
  variant?: string;
  props?: Record<string, FigmaPropertyValue>;
  text?: string;
  children?: FigmaNode[];
};

export type MappedNode = {
  kind: 'component' | 'text';
  tag: string;
  frameworkName?: string;
  props: Record<string, string>;
  tokenBindings: Record<string, string>;
  children: MappedNode[];
  text?: string;
};

export type EmitTarget = 'custom-elements' | 'react' | 'angular' | 'vue';

