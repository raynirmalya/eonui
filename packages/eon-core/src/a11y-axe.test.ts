// @vitest-environment jsdom
import axe from 'axe-core';
import { beforeAll, describe, expect, it } from 'vitest';
import { defineCustomElements } from '../dist/loader/index.js';
import { componentManifestRegistry, requiredEonComponentTags } from './manifest/registry';

const fixtureOverrides: Record<string, string> = {
  'eon-action-sheet':
    '<eon-action-sheet open heading="Choose action" items="Call|call||Start a voice call.; Message|message||Send a threaded message."></eon-action-sheet>',
  'eon-dialog':
    '<eon-dialog open heading="Confirm action" description="Review the request before continuing."><p>Dialog body content</p></eon-dialog>',
  'eon-drawer':
    '<eon-drawer open label="Workspace navigation"><div slot="header">Workspace navigation</div><p>Drawer content</p></eon-drawer>',
  'eon-dropdown-menu':
    '<eon-dropdown-menu open label="More actions" items="Workspace/Edit|edit||Update this workspace.; Danger/Delete|delete|danger|Remove permanently." show-selection value="edit"></eon-dropdown-menu>',
  'eon-icon-button': '<eon-icon-button label="Open details">i</eon-icon-button>',
  'eon-progress': '<eon-progress label="Uploading assets" value="65" show-value-label helper-text="3 of 5 files complete."></eon-progress>',
  'eon-select': '<eon-select label="Workspace" options="North,South,East,West" value="North"></eon-select>',
  'eon-load-panel':
    '<eon-load-panel visible heading="Loading employee profile" message="Fetching records" description="This usually takes a few seconds." show-cancel-button></eon-load-panel>',
  'eon-popover':
    '<eon-popover open trigger-label="Review details" heading="Workspace summary" description="Quick context for reviewers"><p>Popover content</p></eon-popover>',
  'eon-popup':
    '<eon-popup open heading="Information" description="Use popups for focused detail."><p>Popup body content</p></eon-popup>',
  'eon-tooltip': '<eon-tooltip text="Helpful context"><button type="button">Open help</button></eon-tooltip>'
};

beforeAll(async () => {
  await defineCustomElements(window);
});

async function waitForUpgrade(container: ParentNode): Promise<void> {
  const elements = Array.from(container.querySelectorAll<HTMLElement>('*')).filter((element) =>
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
}

function getFallbackFixture(tag: string): string {
  const entry = componentManifestRegistry.find((candidate) => candidate.tag === tag);

  if (!entry) {
    return `<${tag}>Sample content</${tag}>`;
  }

  if (entry.examples[0]?.code) {
    return entry.examples[0].code;
  }

  const attrs: string[] = [];
  const propNames = new Set(entry.props.map((prop) => prop.name));

  if (propNames.has('label')) {
    attrs.push('label="Sample label"');
  }

  if (propNames.has('heading')) {
    attrs.push('heading="Sample heading"');
  }

  if (propNames.has('description')) {
    attrs.push('description="Sample description"');
  }

  if (propNames.has('triggerLabel')) {
    attrs.push('trigger-label="Open details"');
  }

  if (propNames.has('text')) {
    attrs.push('text="Helpful tooltip content"');
  }

  if (propNames.has('message')) {
    attrs.push('message="Loading component content"');
  }

  if (propNames.has('items')) {
    attrs.push('items="Alpha|alpha||First option.; Beta|beta||Second option."');
  }

  if (propNames.has('open')) {
    attrs.push('open');
  }

  if (propNames.has('visible')) {
    attrs.push('visible');
  }

  const attrString = attrs.length ? ` ${attrs.join(' ')}` : '';
  const slotContent = tag === 'eon-button' || tag === 'eon-chip' || tag === 'eon-badge' ? 'Sample action' : 'Sample content';

  return `<${tag}${attrString}>${slotContent}</${tag}>`;
}

describe('Eon core axe coverage', () => {
  it('keeps representative component fixtures free from axe violations', async () => {
    const failures: Array<{
      tag: string;
      violations: Array<{
        id: string;
        impact: string | null;
        help: string;
        nodes: string[];
      }>;
    }> = [];

    for (const tag of requiredEonComponentTags) {
      const fixture = fixtureOverrides[tag] ?? getFallbackFixture(tag);
      document.body.innerHTML = `<main><h1>Eon accessibility harness</h1><section>${fixture}</section></main>`;

      await waitForUpgrade(document.body);

      const results = await axe.run(document.body, {
        rules: {
          'color-contrast': { enabled: false }
        }
      });

      if (results.violations.length > 0) {
        failures.push({
          tag,
          violations: results.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact ?? null,
            help: violation.help,
            nodes: violation.nodes.map((node) => node.html)
          }))
        });
      }

      document.body.innerHTML = '';
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    expect(failures).toEqual([]);
  }, 20000);
});
