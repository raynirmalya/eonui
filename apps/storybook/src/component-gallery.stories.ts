import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Catalog/Web Components Gallery'
};

export default meta;

type Story = StoryObj;

export const Forms: Story = {
  render: () => `
    <div style="display:grid;gap:1rem;min-width:min(100%,32rem);">
      <eon-input label="Email" placeholder="name@example.com" help-text="We use this for account notifications."></eon-input>
      <eon-textarea label="Notes" help-text="Share any implementation constraints."></eon-textarea>
      <eon-select label="Plan" options="Starter,Growth,Scale"></eon-select>
      <eon-combobox label="Role" options="Admin,Editor,Viewer"></eon-combobox>
      <eon-checkbox>Enable digest email</eon-checkbox>
      <eon-switch label="Enable alerts"></eon-switch>
      <eon-button>Save settings</eon-button>
    </div>
  `
};

export const Overlays: Story = {
  render: () => `
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <eon-popover trigger-label="Open popover">Popover content</eon-popover>
      <eon-dropdown-menu label="Menu" items="Profile,Settings,Logout"></eon-dropdown-menu>
      <eon-tooltip text="Helpful context"><eon-button>Hover me</eon-button></eon-tooltip>
      <eon-toast title="Saved">Your workspace settings were updated.</eon-toast>
    </div>
  `
};

