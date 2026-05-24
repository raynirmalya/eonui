import { aiPromptLibrary } from './index';

export const aiPromptGuide = {
  templates: Object.keys(aiPromptLibrary.templates),
  guardrails: aiPromptLibrary.guardrails,
  exampleCount: aiPromptLibrary.naturalLanguageExamples.length
} as const;

