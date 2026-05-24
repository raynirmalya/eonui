import { angularIntegrationGuide, angularUsageExample } from '@eonui/angular';
import { reactIntegrationNotes, reactUsageExample } from '../../../packages/eon-react/dist/index.js';
import { vueIntegrationGuide, vueUsageExample } from '@eonui/vue';

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
