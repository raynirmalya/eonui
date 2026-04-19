import rawTokens from './tokens.json' with { type: 'json' };

export type TokenNode = {
  $value: string;
  $type: string;
};

export const tokens = rawTokens;
export type TokenCatalogEntry = {
  key: string;
  cssVariable: string;
  type: string;
  value: string;
  category: string;
};

const aliasPattern = /\{([^}]+)\}/g;

function getByPath(record: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, record);
}

function resolveReference(path: string, source: Record<string, unknown>, seen = new Set<string>()): string | undefined {
  if (seen.has(path)) {
    return undefined;
  }

  const token = getByPath(source, path) as TokenNode | undefined;
  if (!token?.$value) {
    return undefined;
  }

  seen.add(path);
  return resolveValue(token.$value, source, seen);
}

function resolveValue(value: string, source: Record<string, unknown>, seen = new Set<string>()): string {
  return value.replace(aliasPattern, (match, path: string) => {
    const resolved = resolveReference(path, source, new Set(seen));
    return resolved ?? match;
  });
}

function createThemeVariableName(key: string): string {
  const normalizedKey = key.replace(/^color\./, 'semantic.');
  return `--jarvis-${normalizedKey.replace(/\./g, '-')}`;
}

export function flattenTokens(source: Record<string, unknown>, prefix = ''): Record<string, TokenNode> {
  return Object.entries(source).reduce<Record<string, TokenNode>>((acc, [key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      acc[nextKey] = value as TokenNode;
      return acc;
    }

    Object.assign(acc, flattenTokens(value as Record<string, unknown>, nextKey));
    return acc;
  }, {});
}

export function createCssVariables(): string {
  const flattened = flattenTokens({
    base: tokens.base,
    semantic: tokens.semantic,
    component: tokens.component
  });

  const lines = Object.entries(flattened).map(([key, token]) => {
    const cssName = `--jarvis-${key.replace(/\./g, '-')}`;
    return `  ${cssName}: ${resolveValue(token.$value, tokens as Record<string, unknown>)};`;
  });

  return `:root {\n${lines.join('\n')}\n}`;
}

export const cssVariables = createCssVariables();

export function createScssMap(): string {
  const flattened = flattenTokens({
    base: tokens.base,
    semantic: tokens.semantic,
    component: tokens.component
  });
  const pairs = Object.entries(flattened).map(
    ([key, token]) => `  "${key}": ${resolveValue(token.$value, tokens as Record<string, unknown>)}`
  );
  return `$jarvis-tokens: (\n${pairs.join(',\n')}\n);`;
}

function flattenThemeEntries(source: Record<string, unknown>, prefix = ''): Record<string, TokenNode> {
  return Object.entries(source).reduce<Record<string, TokenNode>>((acc, [key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      acc[nextKey] = value as TokenNode;
      return acc;
    }

    Object.assign(acc, flattenThemeEntries(value as Record<string, unknown>, nextKey));
    return acc;
  }, {});
}

export function createThemeCss(themeName: keyof typeof tokens.themes): string {
  const flattened = flattenThemeEntries(tokens.themes[themeName] as Record<string, unknown>);
  const lines = Object.entries(flattened).map(([key, token]) => {
    const cssName = createThemeVariableName(key);
    return `  ${cssName}: ${resolveValue(token.$value, tokens as Record<string, unknown>)};`;
  });

  return `[data-theme="${themeName}"] {\n${lines.join('\n')}\n}`;
}

export function createThemeFamilyCss(themeFamilyName: keyof typeof tokens.themeFamilies): string {
  const flattened = flattenTokens(tokens.themeFamilies[themeFamilyName] as Record<string, unknown>);
  const lines = Object.entries(flattened).map(([key, token]) => {
    const cssName = `--jarvis-${key.replace(/\./g, '-')}`;
    return `  ${cssName}: ${resolveValue(token.$value, tokens as Record<string, unknown>)};`;
  });

  return `[data-theme-family="${themeFamilyName}"] {\n${lines.join('\n')}\n}`;
}

export function createDensityCss(densityName: keyof typeof tokens.density): string {
  const flattened = flattenThemeEntries(tokens.density[densityName] as Record<string, unknown>);
  const lines = Object.entries(flattened).map(([key, token]) => {
    const cssName = `--jarvis-${key.replace(/\./g, '-')}`;
    return `  ${cssName}: ${resolveValue(token.$value, tokens as Record<string, unknown>)};`;
  });

  return `[data-density="${densityName}"] {\n${lines.join('\n')}\n}`;
}

export function createThemeBundleCss(): string {
  const familyCss = Object.keys(tokens.themeFamilies)
    .map((themeFamilyName) => createThemeFamilyCss(themeFamilyName as keyof typeof tokens.themeFamilies))
    .join('\n\n');
  const themeCss = Object.keys(tokens.themes)
    .map((themeName) => createThemeCss(themeName as keyof typeof tokens.themes))
    .join('\n\n');
  const densityCss = Object.keys(tokens.density)
    .map((densityName) => createDensityCss(densityName as keyof typeof tokens.density))
    .join('\n\n');

  return [createCssVariables(), familyCss, themeCss, densityCss].filter(Boolean).join('\n\n');
}

export function createTokenCatalog(): TokenCatalogEntry[] {
  const flattened = flattenTokens({
    base: tokens.base,
    semantic: tokens.semantic,
    component: tokens.component
  });

  return Object.entries(flattened).map(([key, token]) => ({
    key,
    cssVariable: `--jarvis-${key.replace(/\./g, '-')}`,
    type: token.$type,
    value: resolveValue(token.$value, tokens as Record<string, unknown>),
    category: key.split('.')[0] ?? 'misc'
  }));
}

export function createThemeCatalog() {
  return {
    families: Object.keys(tokens.themeFamilies).map((family) => ({
      name: family,
      selector: `[data-theme-family="${family}"]`
    })),
    themes: Object.keys(tokens.themes).map((theme) => ({
      name: theme,
      selector: `[data-theme="${theme}"]`
    })),
    density: Object.keys(tokens.density).map((density) => ({
      name: density,
      selector: `[data-density="${density}"]`
    }))
  };
}
