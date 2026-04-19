import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Catalog/Web Components Gallery'
};

export default meta;

type Story = StoryObj;

export const Forms: Story = {
  render: () => `
    <div style="display:grid;gap:1rem;min-width:min(100%,32rem);">
      <jarvis-input label="Email" placeholder="name@example.com" help-text="We use this for account notifications."></jarvis-input>
      <jarvis-textarea label="Notes" help-text="Share any implementation constraints."></jarvis-textarea>
      <jarvis-select label="Plan" options="Starter,Growth,Scale"></jarvis-select>
      <jarvis-combobox label="Role" options="Admin,Editor,Viewer"></jarvis-combobox>
      <jarvis-checkbox>Enable digest email</jarvis-checkbox>
      <jarvis-switch label="Enable alerts"></jarvis-switch>
      <jarvis-button>Save settings</jarvis-button>
    </div>
  `
};

export const Overlays: Story = {
  render: () => `
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <jarvis-popover trigger-label="Open popover">Popover content</jarvis-popover>
      <jarvis-dropdown-menu label="Menu" items="Profile,Settings,Logout"></jarvis-dropdown-menu>
      <jarvis-tooltip text="Helpful context"><jarvis-button>Hover me</jarvis-button></jarvis-tooltip>
      <jarvis-toast title="Saved">Your workspace settings were updated.</jarvis-toast>
    </div>
  `
};

