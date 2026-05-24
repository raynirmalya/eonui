import { createThemeBundleCss, createThemeCatalog, createTokenCatalog, cssVariables } from '@eonui/tokens';

export const foundationCss = `
${cssVariables}

:host, :root {
  color: var(--eon-semantic-text-primary);
  background: var(--eon-semantic-surface-canvas);
  font-family: var(--eon-base-font-family-sans);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  --eon-motion-micro: var(--eon-semantic-motion-micro);
  --eon-motion-ui: var(--eon-semantic-motion-ui);
  --eon-motion-complex: var(--eon-semantic-motion-complex);
  --eon-motion-ease: var(--eon-semantic-motion-ease);
  --eon-shadow-soft: var(--eon-semantic-shadow-soft);
  --eon-shadow-elevated: var(--eon-semantic-shadow-elevated);
  --eon-shadow-glass: var(--eon-semantic-shadow-glass);
  --eon-focus-ring: 0 0 0 1px rgba(255,255,255,0.4), 0 0 0 6px var(--eon-semantic-action-glow);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--eon-base-font-family-body, var(--eon-base-font-family-sans));
  font-size: var(--eon-base-font-size-body);
  line-height: var(--eon-base-font-lineHeight-body);
  letter-spacing: 0;
  background:
    radial-gradient(circle at top left, rgba(50, 93, 255, 0.08), transparent 32%),
    radial-gradient(circle at top right, rgba(15, 143, 123, 0.08), transparent 24%),
    var(--eon-semantic-surface-canvas);
  color: var(--eon-semantic-text-primary);
}

:where(button, input, select, textarea) {
  font: inherit;
}

:where(button, [role='button'], a, input, select, textarea) {
  transition:
    transform var(--eon-motion-ui) var(--eon-motion-ease),
    opacity var(--eon-motion-ui) var(--eon-motion-ease),
    box-shadow var(--eon-motion-ui) var(--eon-motion-ease),
    border-color var(--eon-motion-ui) var(--eon-motion-ease),
    background-color var(--eon-motion-ui) var(--eon-motion-ease),
    color var(--eon-motion-ui) var(--eon-motion-ease);
}

:where(button, [role='button']):hover {
  transform: translateY(-1px);
}

:where(button, [role='button']):active {
  transform: translateY(0) scale(0.98);
}

:where(button, input, select, textarea):focus-visible {
  outline: none;
  box-shadow: var(--eon-focus-ring);
}

@keyframes eon-fade-up {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes eon-soft-shimmer {
  0% { transform: translateX(-120%); opacity: 0.3; }
  50% { opacity: 0.55; }
  100% { transform: translateX(120%); opacity: 0.3; }
}

@keyframes eon-soft-pulse {
  0%, 100% { opacity: 0.65; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.015); }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
`;

export const themeBundleCss = createThemeBundleCss();
export const tokenCatalog = createTokenCatalog();
export const themeCatalog = createThemeCatalog();

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280
} as const;

export function mediaUp(key: keyof typeof breakpoints): string {
  return `@media (min-width: ${breakpoints[key]}px)`;
}
