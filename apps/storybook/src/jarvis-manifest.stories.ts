import type { Meta, StoryObj } from '@storybook/web-components';
import { componentLibrary } from '@jarvis/manifest';

const manifestPreview = componentLibrary.slice(0, 12);

const meta: Meta = {
  title: 'Catalog/Manifest Overview',
  render: () => {
    const items = manifestPreview
      .map(
        (component) => `
          <article style="padding:1rem;border:1px solid #e2e8f0;border-radius:14px;background:#fff;">
            <p style="margin:0 0 .25rem;color:#5a6472;font-size:.8rem;text-transform:uppercase;">${component.category}</p>
            <h3 style="margin:.25rem 0;">${component.tag}</h3>
            <p style="margin:0 0 .75rem;">${component.description}</p>
            <code>${component.examples[0]?.code ?? `<${component.tag}></${component.tag}>`}</code>
          </article>
        `
      )
      .join('');

    return `
      <section style="display:grid;gap:1rem;max-width:72rem;">
        <header style="display:grid;gap:.5rem;">
          <p style="margin:0;color:#5a6472;text-transform:uppercase;font-size:.8rem;">Manifest-driven stories</p>
          <h1 style="margin:0;">Jarvis Component Catalog</h1>
          <p style="margin:0;">This preview is generated from the source manifest registry and acts as the bridge into richer component stories.</p>
        </header>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;">
          ${items}
        </div>
      </section>
    `;
  }
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {};

