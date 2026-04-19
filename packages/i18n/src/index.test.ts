import { describe, expect, it } from 'vitest';
import {
  createDateFormatter,
  createLocaleContext,
  createMessagePattern,
  createNumberFormatter,
  defaultLocaleContext,
  formatCurrency,
  formatNumber,
  i18nGuide,
  inferDirectionFromLocale,
  mergeMessages
} from './index';

describe('i18n utilities', () => {
  it('creates locale contexts with inferred direction', () => {
    expect(createLocaleContext({ locale: 'ar-SA' }).dir).toBe('rtl');
    expect(createLocaleContext({ locale: 'en-US' }).dir).toBe('ltr');
  });

  it('formats numbers and currency using locale helpers', () => {
    expect(formatNumber(1234, defaultLocaleContext)).toContain('1');
    expect(formatCurrency(199.99, 'USD', defaultLocaleContext)).toContain('$');
  });

  it('creates reusable formatter instances', () => {
    expect(createNumberFormatter(defaultLocaleContext).format(42)).toContain('42');
    expect(createDateFormatter(defaultLocaleContext, { year: 'numeric' }).format(new Date('2025-01-01'))).toContain('2025');
  });

  it('merges messages and formats message patterns', () => {
    const messages = mergeMessages({ greeting: 'Hello {name}' }, { plan: 'Plan: {tier}' });
    const context = createLocaleContext({ locale: 'en-US', messages });
    expect(createMessagePattern('greeting', 'Hi {name}', { name: 'Ava' }, context)).toBe('Hello Ava');
    expect(createMessagePattern('plan', 'Plan: {tier}', { tier: 'Pro' }, context)).toBe('Plan: Pro');
  });

  it('infers direction from locale prefixes', () => {
    expect(inferDirectionFromLocale('he-IL')).toBe('rtl');
    expect(inferDirectionFromLocale('fr-FR')).toBe('ltr');
  });

  it('exposes docs-friendly guide metadata', () => {
    expect(i18nGuide.locale.length).toBeGreaterThan(0);
    expect(i18nGuide.formatting.length).toBeGreaterThan(0);
    expect(i18nGuide.direction.length).toBeGreaterThan(0);
  });
});

