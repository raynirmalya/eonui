import { describe, expect, it } from 'vitest';
import { aiPromptLibrary, dashboardPromptTemplate, formPromptTemplate, pagePromptTemplate, systemRules } from './index';

describe('ai prompt library', () => {
  it('exposes core prompt templates and system rules', () => {
    expect(systemRules).toContain('generated manifest');
    expect(pagePromptTemplate).toContain('responsive page');
    expect(formPromptTemplate).toContain('accessible form');
    expect(dashboardPromptTemplate).toContain('Eon dashboard');
  });

  it('includes guardrails and natural language examples', () => {
    expect(aiPromptLibrary.guardrails.length).toBeGreaterThan(0);
    expect(aiPromptLibrary.naturalLanguageExamples.length).toBeGreaterThan(0);
    expect(aiPromptLibrary.naturalLanguageExamples[0]?.output).toContain('eon-');
  });
});
