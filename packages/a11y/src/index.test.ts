import { describe, expect, it, vi } from 'vitest';
import {
  a11yGuide,
  createLiveRegion,
  createOutsidePointerHandler,
  createRovingTabIndex,
  focusPart,
  getDirection,
  isEventInsideHost,
  moveFocusByOffset,
  moveFocusEnd,
  moveFocusHome,
  restoreFocus
} from './index';

describe('a11y helpers', () => {
  it('detects whether an event happened inside the host', () => {
    const host = document.createElement('div');
    const child = document.createElement('button');
    host.append(child);
    const event = {
      composedPath: () => [child, host, document.body]
    } as unknown as Event;

    expect(isEventInsideHost(host, event)).toBe(true);
  });

  it('invokes outside handler only for external pointer events', () => {
    const host = document.createElement('div');
    const outside = document.createElement('div');
    const onOutside = vi.fn();
    const handler = createOutsidePointerHandler(host, onOutside);

    handler({
      composedPath: () => [outside, document.body]
    } as unknown as PointerEvent);

    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it('focuses a shadow part when available', () => {
    const host = document.createElement('div');
    const root = host.attachShadow({ mode: 'open' });
    const panel = document.createElement('div');
    panel.setAttribute('part', 'panel');
    panel.tabIndex = -1;
    const focusSpy = vi.spyOn(panel, 'focus');
    root.append(panel);

    focusPart(host, 'panel');

    expect(focusSpy).toHaveBeenCalled();
  });

  it('restores focus to a previous element', () => {
    const button = document.createElement('button');
    const focusSpy = vi.spyOn(button, 'focus');

    restoreFocus(button);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('moves focus within a roving collection', () => {
    const first = document.createElement('button');
    const second = document.createElement('button');
    const third = document.createElement('button');
    const secondFocusSpy = vi.spyOn(second, 'focus');
    const thirdFocusSpy = vi.spyOn(third, 'focus');

    expect(moveFocusByOffset([first, second, third], 0, 1)).toBe(second);
    expect(secondFocusSpy).toHaveBeenCalled();
    expect(moveFocusEnd([first, second, third])).toBe(third);
    expect(thirdFocusSpy).toHaveBeenCalled();
    expect(moveFocusHome([first, second, third])).toBe(first);
  });

  it('creates roving tabindex state', () => {
    const first = document.createElement('button');
    const second = document.createElement('button');

    createRovingTabIndex([first, second], 1);

    expect(first.tabIndex).toBe(-1);
    expect(second.tabIndex).toBe(0);
  });

  it('creates and updates live regions', () => {
    const region = createLiveRegion('assertive');
    expect(region.getAttribute('aria-live')).toBe('assertive');
  });

  it('resolves direction from the DOM', () => {
    const host = document.createElement('div');
    host.dir = 'rtl';
    expect(getDirection(host)).toBe('rtl');
  });

  it('exposes guidance metadata for docs and consumers', () => {
    expect(a11yGuide.focus.length).toBeGreaterThan(0);
    expect(a11yGuide.overlays.length).toBeGreaterThan(0);
    expect(a11yGuide.liveRegions.length).toBeGreaterThan(0);
  });
});
