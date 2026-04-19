export function getFocusableElements(root: ParentNode): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));
}

export function moveFocusByOffset(elements: HTMLElement[], currentIndex: number, offset: number): HTMLElement | undefined {
  if (!elements.length) {
    return undefined;
  }

  const nextIndex = (currentIndex + offset + elements.length) % elements.length;
  const nextElement = elements[nextIndex];
  nextElement?.focus();
  return nextElement;
}

export function moveFocusHome(elements: HTMLElement[]): HTMLElement | undefined {
  const first = elements[0];
  first?.focus();
  return first;
}

export function moveFocusEnd(elements: HTMLElement[]): HTMLElement | undefined {
  const last = elements[elements.length - 1];
  last?.focus();
  return last;
}

export function trapFocus(event: KeyboardEvent, root: ParentNode): void {
  if (event.key !== 'Tab') {
    return;
  }

  const focusables = getFocusableElements(root);
  if (!focusables.length) {
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): HTMLDivElement {
  const region = document.createElement('div');
  region.setAttribute('aria-live', politeness);
  region.style.position = 'absolute';
  region.style.width = '1px';
  region.style.height = '1px';
  region.style.clipPath = 'inset(50%)';
  region.textContent = message;
  document.body.append(region);
  window.setTimeout(() => region.remove(), 500);
  return region;
}

export function createLiveRegion(politeness: 'polite' | 'assertive' = 'polite'): HTMLDivElement {
  const region = document.createElement('div');
  region.setAttribute('aria-live', politeness);
  region.setAttribute('aria-atomic', 'true');
  region.style.position = 'absolute';
  region.style.width = '1px';
  region.style.height = '1px';
  region.style.clipPath = 'inset(50%)';
  document.body.append(region);
  return region;
}

export function updateLiveRegion(region: HTMLDivElement, message: string): void {
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

export function isEventInsideHost(host: HTMLElement, event: Event): boolean {
  return event.composedPath().includes(host);
}

export function createOutsidePointerHandler(host: HTMLElement, onOutside: () => void) {
  return (event: PointerEvent): void => {
    if (!isEventInsideHost(host, event)) {
      onOutside();
    }
  };
}

export function focusPart(host: HTMLElement, partName: string): void {
  const root = host.shadowRoot ?? host;
  root.querySelector<HTMLElement>(`[part="${partName}"]`)?.focus();
}

export function restoreFocus(target?: HTMLElement | null): void {
  target?.focus();
}

export function createRovingTabIndex(items: HTMLElement[], activeIndex: number): void {
  items.forEach((item, index) => {
    item.tabIndex = index === activeIndex ? 0 : -1;
  });
}

export function getDirection(root?: HTMLElement | null): 'ltr' | 'rtl' {
  const dir = root?.dir || document.documentElement.dir || 'ltr';
  return dir === 'rtl' ? 'rtl' : 'ltr';
}

export const a11yGuide = {
  focus: [
    'Use trapFocus for modal surfaces that must keep keyboard navigation contained.',
    'Use moveFocusByOffset, moveFocusHome, and moveFocusEnd for roving collections.'
  ],
  overlays: [
    'Use createOutsidePointerHandler for dismiss-on-outside interaction patterns.',
    'Use focusPart and restoreFocus to manage lifecycle transitions for overlays.'
  ],
  liveRegions: [
    'Use createLiveRegion and updateLiveRegion for dynamic status messaging.',
    'Prefer polite announcements unless the update is urgent and disruptive.'
  ]
} as const;
