import { clamp } from '@jarvis/utils';

export function asPercent(value: number): number {
  return clamp(value, 0, 100);
}

export function parseOptions(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export interface LabeledOption {
  label: string;
  value: string;
  group?: string;
  description?: string;
  disabled?: boolean;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export type JarvisNumericFormat = 'decimal' | 'integer' | 'fixed-point' | 'currency' | 'accounting' | 'percent' | 'unit';

export interface JarvisNumericFormatterConfig {
  format?: JarvisNumericFormat;
  locale?: string;
  currency?: string;
  unit?: string;
  fractionDigits?: number;
  valuePrefix?: string;
  valueSuffix?: string;
}

export type JarvisSearchMode = 'contains' | 'startsWith' | 'startswith' | 'equals';
export type NormalizedJarvisSearchMode = 'contains' | 'startsWith' | 'equals';

export interface LabeledOptionSearchConfig {
  expr?: string;
  mode?: JarvisSearchMode;
  minLength?: number;
  query?: string;
  showDataBeforeSearch?: boolean;
}

function parseOptionDisplayToken(token: string): Pick<LabeledOption, 'label' | 'description'> {
  const [rawLabel, rawDescription] = token.split('~').map((segment) => segment.trim());
  return {
    label: rawLabel || token.trim(),
    description: rawDescription || undefined
  };
}

function parseOptionFlags(rawFlags: string): Set<string> {
  return new Set(
    rawFlags
      .toLowerCase()
      .split(/[ ,]+/)
      .map((segment) => segment.trim())
      .filter(Boolean)
  );
}

function getOptionTone(flags: Set<string>): LabeledOption['tone'] {
  if (flags.has('danger')) {
    return 'danger';
  }

  if (flags.has('warning')) {
    return 'warning';
  }

  if (flags.has('success')) {
    return 'success';
  }

  return 'default';
}

export function parseLabeledOptions(value: string): LabeledOption[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [rawPath = '', rawValue = '', rawFlags = '', rawDescription = ''] = entry.split('|').map((segment) => segment.trim());
      const flags = parseOptionFlags(rawFlags);
      const segments = rawPath
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean);

      if (segments.length > 1) {
        const parsedSegments = segments.map((segment) => parseOptionDisplayToken(segment));
        const { label, description } = parsedSegments[parsedSegments.length - 1];
        const cleanPath = parsedSegments.map((segment) => segment.label).join('/');
        const group = parsedSegments.slice(0, -1).map((segment) => segment.label).join(' / ');
        return {
          label,
          value: rawValue || cleanPath,
          group,
          description: rawDescription || description,
          disabled: flags.has('disabled'),
          tone: getOptionTone(flags)
        };
      }

      const { label, description } = parseOptionDisplayToken(rawPath);
      return {
        label,
        value: rawValue || label,
        description: rawDescription || description,
        disabled: flags.has('disabled'),
        tone: getOptionTone(flags)
      };
    });
}

export function groupOptions(options: LabeledOption[]): Array<{ label: string; items: LabeledOption[] }> {
  const groups = new Map<string, LabeledOption[]>();

  for (const option of options) {
    const key = option.group || '';
    groups.set(key, [...(groups.get(key) || []), option]);
  }

  return [...groups.entries()].map(([label, items]) => ({ label, items }));
}

export function normalizeSearchMode(mode: JarvisSearchMode | string | undefined): NormalizedJarvisSearchMode {
  const normalizedMode = mode?.trim().toLowerCase();

  if (normalizedMode === 'startswith') {
    return 'startsWith';
  }

  if (normalizedMode === 'equals') {
    return 'equals';
  }

  return 'contains';
}

export function matchesSearchTerm(value: string, query: string, mode: JarvisSearchMode = 'contains'): boolean {
  if (!query) {
    return true;
  }

  const normalizedValue = value.trim().toLowerCase();
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedMode = normalizeSearchMode(mode);

  if (!normalizedQuery) {
    return true;
  }

  if (normalizedMode === 'startsWith') {
    return normalizedValue.startsWith(normalizedQuery);
  }

  if (normalizedMode === 'equals') {
    return normalizedValue === normalizedQuery;
  }

  return normalizedValue.includes(normalizedQuery);
}

export function filterLabeledOptions(options: LabeledOption[], config: LabeledOptionSearchConfig): LabeledOption[] {
  const query = config.query?.trim().toLowerCase() ?? '';
  const minLength = config.minLength ?? 0;
  const showDataBeforeSearch = config.showDataBeforeSearch ?? true;
  const searchExpr = parseOptions(config.expr || '');
  const searchMode = normalizeSearchMode(config.mode);

  if (!query && !showDataBeforeSearch) {
    return [];
  }

  if (query && query.length < minLength) {
    return showDataBeforeSearch ? options : [];
  }

  const fields = searchExpr.length ? searchExpr : ['label', 'group', 'value'];

  return options.filter((option) =>
    fields.some((field) => {
      const candidate =
        field === 'value'
          ? option.value
          : field === 'group'
            ? option.group || ''
            : option.label;

      return matchesSearchTerm(candidate, query, searchMode);
    })
  );
}

export interface PathOptionNode {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  tone?: LabeledOption['tone'];
  children: PathOptionNode[];
}

export function parsePathOptions(value: string): string[][] {
  return value
    .split(';')
    .map((entry) =>
      entry
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean)
    )
    .filter((segments) => segments.length);
}

export function buildPathTree(value: string): PathOptionNode[] {
  const root: PathOptionNode[] = [];

  for (const entry of value.split(';').map((segment) => segment.trim()).filter(Boolean)) {
    const rawSegments = entry
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean);
    let branch = root;
    let currentPath = '';

    for (const segment of rawSegments) {
      const [rawDisplay = '', rawFlags = ''] = segment.split('|').map((part) => part.trim());
      const { label, description } = parseOptionDisplayToken(rawDisplay);
      const flags = parseOptionFlags(rawFlags);
      currentPath = currentPath ? `${currentPath}/${label}` : label;
      let existing = branch.find((node) => node.label === label);
      if (!existing) {
        existing = {
          id: currentPath.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          label,
          value: currentPath,
          description,
          disabled: flags.has('disabled'),
          tone: getOptionTone(flags),
          children: []
        };
        branch.push(existing);
      } else {
        existing.description = existing.description || description;
        existing.disabled = existing.disabled || flags.has('disabled');
        if (existing.tone === 'default' && getOptionTone(flags) !== 'default') {
          existing.tone = getOptionTone(flags);
        }
      }
      branch = existing.children;
    }
  }

  return root;
}

export function formatNumericValue(value: number, config: JarvisNumericFormatterConfig = {}): string {
  const format = config.format ?? 'decimal';
  const locale = config.locale ?? 'en-US';
  const currency = config.currency ?? 'USD';
  const unit = config.unit ?? '';
  const valuePrefix = config.valuePrefix ?? '';
  const valueSuffix = config.valueSuffix ?? '';
  const effectiveFractionDigits = config.fractionDigits != null && config.fractionDigits >= 0 ? config.fractionDigits : undefined;
  const maximumFractionDigits = effectiveFractionDigits;
  const minimumFractionDigits = format === 'fixed-point' ? maximumFractionDigits ?? 2 : undefined;

  const options: Intl.NumberFormatOptions =
    format === 'integer'
      ? { maximumFractionDigits: 0 }
      : format === 'currency'
        ? { style: 'currency', currency, minimumFractionDigits, maximumFractionDigits }
        : format === 'accounting'
          ? { style: 'currency', currency, currencySign: 'accounting', minimumFractionDigits, maximumFractionDigits }
          : { minimumFractionDigits, maximumFractionDigits };

  const formatter = new Intl.NumberFormat(locale, options);
  const formattedValue = formatter.format(value);
  const normalizedValue =
    format === 'percent'
      ? `${formattedValue}%`
      : format === 'unit' && unit
        ? `${formattedValue} ${unit}`.trim()
        : formattedValue;

  return `${valuePrefix}${normalizedValue}${valueSuffix}`.trim();
}
