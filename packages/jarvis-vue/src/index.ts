export function registerJarvisVue() {
  return {
    install() {
      // Vue consumers register Jarvis custom elements globally.
    }
  };
}

export function ensureJarvisVue(): void {
  if (typeof window === 'undefined' || typeof customElements === 'undefined') {
    return;
  }
}

export const vueIntegrationGuide = {
  registration: 'Install the wrapper plugin or call ensureJarvisVue() in client-side setup code.',
  events: ['@jarvisInput', '@jarvisChange', '@jarvisSelect', '@jarvisPageChange'],
  forms: 'Bind to custom events and mirror state into Vue refs or form stores for controlled usage.',
  ssr: 'Defer custom element registration to onMounted or other browser-only hooks.'
} as const;

export const vueUsageExample = `
<script setup lang="ts">
import { onMounted } from 'vue';
import { ensureJarvisVue } from '@jarvis/vue';

onMounted(() => {
  ensureJarvisVue();
});
</script>

<template>
  <jarvis-section heading="Team settings">
    <jarvis-stack gap="1rem">
      <jarvis-input label="Workspace name"></jarvis-input>
      <jarvis-switch label="Enable alerts"></jarvis-switch>
      <jarvis-button>Update</jarvis-button>
    </jarvis-stack>
  </jarvis-section>
</template>
`;

export const vueFormExample = `
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ensureJarvisVue } from '@jarvis/vue';

const email = ref('');
const role = ref('Viewer');

onMounted(() => {
  ensureJarvisVue();
});
</script>

<template>
  <jarvis-section heading="Profile form">
    <jarvis-input
      label="Email"
      :value="email"
      help-text="We use this for transactional notices."
      @jarvisInput="email = $event.detail.value">
    </jarvis-input>

    <jarvis-combobox
      label="Role"
      options="Admin,Editor,Viewer"
      @jarvisChange="role = $event.detail.value">
    </jarvis-combobox>

    <jarvis-button>Submit</jarvis-button>
  </jarvis-section>
</template>
`;
