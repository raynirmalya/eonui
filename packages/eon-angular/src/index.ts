export const provideEonAngular = `
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EonElementsModule {}
`;

export function ensureEonAngular(): void {
  if (typeof window === 'undefined' || typeof customElements === 'undefined') {
    return;
  }
}

export const angularIntegrationGuide = {
  registration: 'Import the Eon elements module or enable CUSTOM_ELEMENTS_SCHEMA in the consuming Angular module.',
  events: ['(eonInput)', '(eonChange)', '(eonSelect)', '(eonPageChange)'],
  forms: 'Wrap frequently used form controls with Angular components or ControlValueAccessor adapters when deep form integration is needed.',
  ssr: 'Register custom elements on the browser side and avoid DOM-dependent logic during server rendering.'
} as const;

export const angularUsageExample = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: \`
    <eon-section heading="Revenue">
      <eon-toolbar slot="actions">
        <eon-button>Export</eon-button>
      </eon-toolbar>
      <eon-card>
        <eon-pagination [page]="1" [total]="12"></eon-pagination>
      </eon-card>
    </eon-section>
  \`
})
export class DashboardComponent {}
`;

export const angularFormExample = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-form',
  template: \`
    <eon-section heading="Profile form">
      <eon-input
        label="Email"
        [value]="email"
        help-text="We use this for transactional notices."
        (eonInput)="email = $event.detail.value">
      </eon-input>

      <eon-combobox
        label="Role"
        options="Admin,Editor,Viewer"
        (eonChange)="role = $event.detail.value">
      </eon-combobox>

      <eon-button>Submit</eon-button>
    </eon-section>
  \`
})
export class ProfileFormComponent {
  email = '';
  role = 'Viewer';
}
`;
