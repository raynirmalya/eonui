export const publishablePackageNames = [
  '@eonui/core',
  '@eonui/react',
  '@eonui/angular',
  '@eonui/vue',
  '@eonui/manifest',
  '@eonui/ai-prompts',
  '@eonui/tokens',
  '@eonui/styles',
  '@eonui/a11y',
  '@eonui/i18n',
  '@eonui/charts-core',
  '@eonui/charts-svg',
  '@eonui/charts-canvas',
  '@eonui/charts'
] as const;

export const releaseChecklist = [
  'Run pnpm build:packages',
  'Run pnpm docs:generate',
  'Run pnpm test:quality',
  'Run pnpm typecheck',
  'Run pnpm version-packages',
  'Run pnpm release'
] as const;

export const releaseCommands = {
  verify: 'pnpm verify',
  version: 'pnpm version-packages',
  publish: 'pnpm release'
} as const;
