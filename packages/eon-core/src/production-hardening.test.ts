import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const currentDir = dirname(fileURLToPath(import.meta.url));

function readComponent(relativePath: string): string {
  return readFileSync(resolve(currentDir, relativePath), 'utf8');
}

describe('Eon production hardening coverage', () => {
  it('keeps overlay components dismissible and keyboard-contained', () => {
    const dialog = readComponent('./components/dialog/dialog.tsx');
    const drawer = readComponent('./components/drawer/drawer.tsx');
    const popover = readComponent('./components/popover/popover.tsx');

    expect(dialog).toContain("event.key === 'Escape'");
    expect(dialog).toContain('trapFocus');
    expect(drawer).toContain("event.key === 'Escape'");
    expect(drawer).toContain('trapFocus');
    expect(popover).toContain('createOutsidePointerHandler');
    expect(popover).toContain('hidden={!this.open}');
  });

  it('keeps form controls wired with validation and help/error channels', () => {
    const input = readComponent('./components/input/input.tsx');
    const textarea = readComponent('./components/textarea/textarea.tsx');
    const select = readComponent('./components/select/select.tsx');
    const combobox = readComponent('./components/combobox/combobox.tsx');

    [input, textarea, select, combobox].forEach((source) => {
      expect(source).toContain('aria-describedby');
      expect(source).toContain('aria-invalid');
    });
  });

  it('keeps feedback surfaces and dense actions production-safe', () => {
    const button = readComponent('./components/button/button.tsx');
    const iconButton = readComponent('./components/icon-button/icon-button.tsx');
    const pagination = readComponent('./components/pagination/pagination.tsx');
    const alert = readComponent('./components/alert/alert.tsx');
    const toast = readComponent('./components/toast/toast.tsx');

    expect(button).toContain('this.disabled || this.loading');
    expect(iconButton).toContain('this.disabled || this.loading');
    expect(pagination).toContain('this.disabled || this.page <= 1');
    expect(alert).toContain('aria-live');
    expect(toast).toContain('aria-live');
  });
});
