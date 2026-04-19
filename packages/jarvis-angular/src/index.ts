export const provideJarvisAngular = `
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JarvisElementsModule {}
`;

export function ensureJarvisAngular(): void {
  if (typeof window === 'undefined' || typeof customElements === 'undefined') {
    return;
  }
}

export const angularIntegrationGuide = {
  registration: 'Import the Jarvis elements module or enable CUSTOM_ELEMENTS_SCHEMA in the consuming Angular module.',
  events: ['(jarvisInput)', '(jarvisChange)', '(jarvisSelect)', '(jarvisPageChange)'],
  forms: 'Wrap frequently used form controls with Angular components or ControlValueAccessor adapters when deep form integration is needed.',
  ssr: 'Register custom elements on the browser side and avoid DOM-dependent logic during server rendering.'
} as const;

export const angularUsageExample = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: \`
    <jarvis-section heading="Revenue">
      <jarvis-toolbar slot="actions">
        <jarvis-button>Export</jarvis-button>
      </jarvis-toolbar>
      <jarvis-card>
        <jarvis-pagination [page]="1" [total]="12"></jarvis-pagination>
      </jarvis-card>
    </jarvis-section>
  \`
})
export class DashboardComponent {}
`;

export const angularFormExample = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-form',
  template: \`
    <jarvis-section heading="Profile form">
      <jarvis-input
        label="Email"
        [value]="email"
        help-text="We use this for transactional notices."
        (jarvisInput)="email = $event.detail.value">
      </jarvis-input>

      <jarvis-combobox
        label="Role"
        options="Admin,Editor,Viewer"
        (jarvisChange)="role = $event.detail.value">
      </jarvis-combobox>

      <jarvis-button>Submit</jarvis-button>
    </jarvis-section>
  \`
})
export class ProfileFormComponent {
  email = '';
  role = 'Viewer';
}
`;
