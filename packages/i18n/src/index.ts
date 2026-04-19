export type LocaleContext = {
  locale: string;
  dir: 'ltr' | 'rtl';
  messages?: Record<string, string>;
  numberingSystem?: string;
};

export const defaultLocaleContext: LocaleContext = {
  locale: 'en-US',
  dir: 'ltr',
  messages: {},
  numberingSystem: 'latn'
};

export function formatNumber(value: number, context = defaultLocaleContext): string {
  return new Intl.NumberFormat(context.locale, {
    numberingSystem: context.numberingSystem
  }).format(value);
}

export function formatDate(value: Date, context = defaultLocaleContext): string {
  return new Intl.DateTimeFormat(context.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(value);
}

export function translate(key: string, fallback: string, context = defaultLocaleContext): string {
  return context.messages?.[key] ?? fallback;
}

export function createLocaleContext(input: Partial<LocaleContext> & Pick<LocaleContext, 'locale'>): LocaleContext {
  return {
    ...defaultLocaleContext,
    ...input,
    dir: input.dir ?? inferDirectionFromLocale(input.locale)
  };
}

export function inferDirectionFromLocale(locale: string): 'ltr' | 'rtl' {
  return /^(ar|fa|he|ur)\b/i.test(locale) ? 'rtl' : 'ltr';
}

export function mergeMessages(...messageSets: Array<Record<string, string> | undefined>): Record<string, string> {
  return Object.assign({}, ...messageSets.filter(Boolean));
}

export function createNumberFormatter(
  context = defaultLocaleContext,
  options: Intl.NumberFormatOptions = {}
): Intl.NumberFormat {
  return new Intl.NumberFormat(context.locale, {
    numberingSystem: context.numberingSystem,
    ...options
  });
}

export function createDateFormatter(
  context = defaultLocaleContext,
  options: Intl.DateTimeFormatOptions = {}
): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(context.locale, options);
}

export function formatCurrency(value: number, currency: string, context = defaultLocaleContext): string {
  return createNumberFormatter(context, {
    style: 'currency',
    currency
  }).format(value);
}

export function createMessagePattern(
  key: string,
  fallback: string,
  values: Record<string, string | number> = {},
  context = defaultLocaleContext
): string {
  const template = translate(key, fallback, context);
  return Object.entries(values).reduce(
    (message, [token, value]) => message.replace(new RegExp(`\\{${token}\\}`, 'g'), String(value)),
    template
  );
}

export const i18nGuide = {
  locale: [
    'Create locale contexts per app or request boundary.',
    'Infer direction from locale when an explicit dir value is not provided.'
  ],
  formatting: [
    'Use formatter factories when repeated number/date formatting is needed.',
    'Prefer message patterns with placeholder replacement for reusable copy.'
  ],
  direction: [
    'Keep direction data near locale context and propagate it into layout-aware components.',
    'Use logical properties and alignment-aware layout primitives for RTL support.'
  ]
} as const;
