export const publishablePackageNames = [
  '@jarvis/core',
  '@jarvis/react',
  '@jarvis/angular',
  '@jarvis/vue',
  '@jarvis/manifest',
  '@jarvis/ai-prompts',
  '@jarvis/tokens',
  '@jarvis/styles',
  '@jarvis/a11y',
  '@jarvis/i18n',
  '@mystique/core',
  '@mystique/svg',
  '@mystique/canvas',
  '@mystique/components'
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
