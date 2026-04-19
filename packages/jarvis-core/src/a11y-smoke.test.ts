import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const currentDir = dirname(fileURLToPath(import.meta.url));

function readComponentSource(relativePath: string): string {
  return readFileSync(resolve(currentDir, relativePath), 'utf8');
}

describe('jarvis core accessibility smoke coverage', () => {
  it('keeps core form controls wired with labels and described-by relationships', () => {
    const input = readComponentSource('./components/input/input.tsx');
    const textarea = readComponentSource('./components/textarea/textarea.tsx');
    const select = readComponentSource('./components/select/select.tsx');

    expect(input).toContain('aria-describedby');
    expect(input).toContain('aria-invalid');
    expect(textarea).toContain('aria-describedby');
    expect(textarea).toContain('aria-invalid');
    expect(select).toContain('aria-describedby');
    expect(select).toContain('aria-invalid');
  });

  it('keeps interactive disclosure widgets wired with expected roles and states', () => {
    const combobox = readComponentSource('./components/combobox/combobox.tsx');
    const dropdownMenu = readComponentSource('./components/dropdown-menu/dropdown-menu.tsx');
    const dialog = readComponentSource('./components/dialog/dialog.tsx');
    const popover = readComponentSource('./components/popover/popover.tsx');
    const drawer = readComponentSource('./components/drawer/drawer.tsx');

    expect(combobox).toContain('role="combobox"');
    expect(combobox).toContain('aria-haspopup="listbox"');
    expect(combobox).toContain('aria-expanded');
    expect(dropdownMenu).toContain('role="menu"');
    expect(dropdownMenu).toContain('role="menuitem"');
    expect(dropdownMenu).toContain('hidden={!this.open}');
    expect(dialog).toContain('role="dialog"');
    expect(dialog).toContain('aria-modal="true"');
    expect(popover).toContain('aria-haspopup="dialog"');
    expect(drawer).toContain('trapFocus');
  });

  it('keeps navigation widgets wired for keyboard and structural semantics', () => {
    const tabs = readComponentSource('./components/tabs/tabs.tsx');
    const accordion = readComponentSource('./components/accordion/accordion.tsx');
    const tooltip = readComponentSource('./components/tooltip/tooltip.tsx');

    expect(tabs).toContain('role="tablist"');
    expect(tabs).toContain('role="tab"');
    expect(accordion).toContain('aria-controls');
    expect(tooltip).toContain('role="tooltip"');
    expect(tooltip).toContain('aria-describedby');
  });

  it('keeps live-region and busy-state semantics for status surfaces and actions', () => {
    const button = readComponentSource('./components/button/button.tsx');
    const iconButton = readComponentSource('./components/icon-button/icon-button.tsx');
    const alert = readComponentSource('./components/alert/alert.tsx');
    const toast = readComponentSource('./components/toast/toast.tsx');

    expect(button).toContain('aria-busy');
    expect(iconButton).toContain('aria-busy');
    expect(alert).toContain('aria-live');
    expect(toast).toContain('aria-live');
  });
});
