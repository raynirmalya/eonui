// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { defineCustomElements } from '../dist/loader/index.js';

beforeAll(async () => {
  await defineCustomElements(window);
});

async function mount<T extends HTMLElement>(html: string): Promise<T> {
  document.body.innerHTML = html;

  const elements = Array.from(document.body.querySelectorAll<HTMLElement>('*')).filter((element) =>
    element.tagName.toLowerCase().startsWith('eon-')
  );
  const tags = [...new Set(elements.map((element) => element.tagName.toLowerCase()))];

  await Promise.all(tags.map((tag) => customElements.whenDefined(tag)));
  await Promise.all(
    elements.map(async (element) => {
      const componentOnReady = (element as HTMLElement & { componentOnReady?: () => Promise<unknown> }).componentOnReady;

      if (typeof componentOnReady === 'function') {
        await componentOnReady.call(element);
      }
    })
  );

  await new Promise((resolve) => setTimeout(resolve, 0));
  return document.body.firstElementChild as T;
}

describe('Eon overlay behavior', () => {
  it('supports fullscreen dialog and drawer surfaces', async () => {
    const dialog = await mount<HTMLElement>('<eon-dialog open full-screen heading="Review details"><p>Dialog body</p></eon-dialog>');
    const drawer = await mount<HTMLElement>('<eon-drawer open full-screen label="Workspace navigation"><p>Drawer body</p></eon-drawer>');

    expect(dialog.shadowRoot?.querySelector('.panel')?.classList.contains('fullscreen')).toBe(true);
    expect(drawer.shadowRoot?.querySelector('.drawer')?.classList.contains('fullscreen')).toBe(true);
  });

  it('supports fullscreen action sheets and viewport-covering load panels', async () => {
    const actionSheet = await mount<HTMLElement>(
      '<eon-action-sheet open full-screen heading="Choose action" items="Call|call||Start a call.; Message|message||Send a message."></eon-action-sheet>'
    );
    const loadPanel = await mount<HTMLElement>(
      '<eon-load-panel visible cover-viewport heading="Loading profile" message="Fetching records"></eon-load-panel>'
    );

    expect(actionSheet.shadowRoot?.querySelector('.overlay')?.classList.contains('fullscreen')).toBe(true);
    expect(actionSheet.shadowRoot?.querySelector('.panel')?.classList.contains('fullscreen')).toBe(true);
    expect(loadPanel.shadowRoot?.querySelector('.overlay')?.classList.contains('viewport')).toBe(true);
  });

  it('supports viewport-positioned floating overlays for menus and popovers', async () => {
    const dropdown = await mount<HTMLElement>(
      '<eon-dropdown-menu open render-in-viewport label="More actions" items="Edit|edit||Edit item.; Delete|delete|danger|Remove item."></eon-dropdown-menu>'
    );
    const popover = await mount<HTMLElement>(
      '<eon-popover open render-in-viewport trigger-label="Review details" heading="Workspace summary"><p>Popover content</p></eon-popover>'
    );

    expect(dropdown.shadowRoot?.querySelector('.panel')?.classList.contains('viewport')).toBe(true);
    expect(popover.shadowRoot?.querySelector('.panel')?.classList.contains('viewport')).toBe(true);
  });
});
