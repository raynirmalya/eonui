export function registerEonVue() {
  return {
    install() {
      // Vue consumers register Eon custom elements globally.
    }
  };
}

export function ensureEonVue(): void {
  if (typeof window === 'undefined' || typeof customElements === 'undefined') {
    return;
  }
}

export const vueIntegrationGuide = {
  registration: 'Install the wrapper plugin or call ensureEonVue() in client-side setup code.',
  events: ['@eonInput', '@eonChange', '@eonSelect', '@eonPageChange'],
  forms: 'Bind to custom events and mirror state into Vue refs or form stores for controlled usage.',
  ssr: 'Defer custom element registration to onMounted or other browser-only hooks.'
} as const;

export const vueUsageExample = `
<script setup lang="ts">
import { onMounted } from 'vue';
import { ensureEonVue } from '@eonui/vue';

onMounted(() => {
  ensureEonVue();
});
</script>

<template>
  <eon-section heading="Team settings">
    <eon-stack gap="1rem">
      <eon-input label="Workspace name"></eon-input>
      <eon-switch label="Enable alerts"></eon-switch>
      <eon-button>Update</eon-button>
    </eon-stack>
  </eon-section>
</template>
`;

export const vueFormExample = `
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ensureEonVue } from '@eonui/vue';

const email = ref('');
const role = ref('Viewer');

onMounted(() => {
  ensureEonVue();
});
</script>

<template>
  <eon-section heading="Profile form">
    <eon-input
      label="Email"
      :value="email"
      help-text="We use this for transactional notices."
      @eonInput="email = $event.detail.value">
    </eon-input>

    <eon-combobox
      label="Role"
      options="Admin,Editor,Viewer"
      @eonChange="role = $event.detail.value">
    </eon-combobox>

    <eon-button>Submit</eon-button>
  </eon-section>
</template>
`;
