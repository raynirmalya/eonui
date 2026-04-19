import { angularIntegrationGuide, angularUsageExample } from '@jarvis/angular';
import { reactIntegrationNotes, reactUsageExample } from '@jarvis/react';
import { vueIntegrationGuide, vueUsageExample } from '@jarvis/vue';

export const frameworkGuides = {
  react: {
    title: 'React',
    notes: reactIntegrationNotes,
    example: reactUsageExample
  },
  angular: {
    title: 'Angular',
    notes: angularIntegrationGuide,
    example: angularUsageExample
  },
  vue: {
    title: 'Vue',
    notes: vueIntegrationGuide,
    example: vueUsageExample
  }
} as const;
