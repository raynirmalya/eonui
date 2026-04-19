import { createThemeBundleCss, createThemeCatalog, createTokenCatalog, cssVariables } from '@jarvis/tokens';

export const foundationCss = `
${cssVariables}

:host, :root {
  color: var(--jarvis-semantic-text-primary);
  background: var(--jarvis-semantic-surface-canvas);
  font-family: var(--jarvis-base-font-family-sans);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  --jarvis-motion-micro: var(--jarvis-semantic-motion-micro);
  --jarvis-motion-ui: var(--jarvis-semantic-motion-ui);
  --jarvis-motion-complex: var(--jarvis-semantic-motion-complex);
  --jarvis-motion-ease: var(--jarvis-semantic-motion-ease);
  --jarvis-shadow-soft: var(--jarvis-semantic-shadow-soft);
  --jarvis-shadow-elevated: var(--jarvis-semantic-shadow-elevated);
  --jarvis-shadow-glass: var(--jarvis-semantic-shadow-glass);
  --jarvis-focus-ring: 0 0 0 1px rgba(255,255,255,0.4), 0 0 0 6px var(--jarvis-semantic-action-glow);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--jarvis-base-font-family-body, var(--jarvis-base-font-family-sans));
  font-size: var(--jarvis-base-font-size-body);
  line-height: var(--jarvis-base-font-lineHeight-body);
  letter-spacing: 0;
  background:
    radial-gradient(circle at top left, rgba(50, 93, 255, 0.08), transparent 32%),
    radial-gradient(circle at top right, rgba(15, 143, 123, 0.08), transparent 24%),
    var(--jarvis-semantic-surface-canvas);
  color: var(--jarvis-semantic-text-primary);
}

:where(button, input, select, textarea) {
  font: inherit;
}

:where(button, [role='button'], a, input, select, textarea) {
  transition:
    transform var(--jarvis-motion-ui) var(--jarvis-motion-ease),
    opacity var(--jarvis-motion-ui) var(--jarvis-motion-ease),
    box-shadow var(--jarvis-motion-ui) var(--jarvis-motion-ease),
    border-color var(--jarvis-motion-ui) var(--jarvis-motion-ease),
    background-color var(--jarvis-motion-ui) var(--jarvis-motion-ease),
    color var(--jarvis-motion-ui) var(--jarvis-motion-ease);
}

:where(button, [role='button']):hover {
  transform: translateY(-1px);
}

:where(button, [role='button']):active {
  transform: translateY(0) scale(0.98);
}

:where(button, input, select, textarea):focus-visible {
  outline: none;
  box-shadow: var(--jarvis-focus-ring);
}

@keyframes jarvis-fade-up {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes jarvis-soft-shimmer {
  0% { transform: translateX(-120%); opacity: 0.3; }
  50% { opacity: 0.55; }
  100% { transform: translateX(120%); opacity: 0.3; }
}

@keyframes jarvis-soft-pulse {
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
