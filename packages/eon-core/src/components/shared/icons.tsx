import { h, VNode } from '@stencil/core';

type ChevronDirection = 'up' | 'right' | 'down' | 'left';

function renderBaseIcon(paths: VNode | VNode[], className?: string) {
  return (
    <svg
      class={className}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {paths}
    </svg>
  );
}

export function renderChevronIcon(direction: ChevronDirection = 'down', className?: string) {
  const chevronByDirection: Record<ChevronDirection, string> = {
    up: 'M3.75 10.5L8 6.25L12.25 10.5',
    right: 'M5.5 3.75L9.75 8L5.5 12.25',
    down: 'M3.75 5.5L8 9.75L12.25 5.5',
    left: 'M10.5 3.75L6.25 8L10.5 12.25'
  };

  return renderBaseIcon(<path d={chevronByDirection[direction]} />, className);
}

export function renderCheckIcon(className?: string) {
  return renderBaseIcon(<path d="M3.5 8.25L6.5 11.25L12.5 4.75" />, className);
}

export function renderCloseIcon(className?: string) {
  return renderBaseIcon([<path d="M4.75 4.75L11.25 11.25" />, <path d="M11.25 4.75L4.75 11.25" />], className);
}
