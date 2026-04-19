import { mystiqueGuide } from '@mystique/core';

export const chartGuide = {
  interactions: [...mystiqueGuide.interactions],
  rendering: [...mystiqueGuide.rendering],
  composition: [...mystiqueGuide.composition]
} as const;
