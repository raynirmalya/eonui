import type { Preview } from '@storybook/web-components';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f8fafc' },
        { name: 'surface', value: '#ffffff' }
      ]
    }
  }
};

export default preview;

