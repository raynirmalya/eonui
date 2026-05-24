export const systemRules = `
Use only documented Eon UI components and props from the generated manifest.
Prefer Eon layout primitives first: eon-section, eon-surface, eon-stack, and eon-grid.
Preserve accessibility semantics, visible labels, helper text, error text, and keyboard interactions.
Prefer token-driven theming and avoid hard-coded colors, spacing, and radii.
Use Eon Charts for charting needs and keep chart types aligned with the generated chart manifest.
Do not invent props, slots, parts, events, or component names that are not present in the manifest.
`;

export const pagePromptTemplate = `
Build a responsive page using Eon UI components only.
Respect composition rules, anti-pattern guidance, accessibility notes, and responsive notes from the manifest.
Use layout primitives to structure sections before adding controls or feedback components.
`;

export const formPromptTemplate = `
Generate an accessible form using eon-input, eon-textarea, eon-select, eon-combobox, eon-checkbox, eon-radio, eon-switch, and eon-button where appropriate.
Include labels, help text, validation messaging, and submit/reset actions.
Prefer visible grouping with eon-section, eon-card, and eon-stack.
`;

export const dashboardPromptTemplate = `
Create an Eon dashboard using eon-section, eon-card, eon-tabs, eon-toolbar, and eon-chart components.
Prefer semantic grouping, clear hierarchy, and progressive disclosure for dense data.
Use chart choices that match the data relationship described by the request.
`;

export const aiPromptLibrary = {
  systemRules,
  templates: {
    page: pagePromptTemplate,
    form: formPromptTemplate,
    dashboard: dashboardPromptTemplate
  },
  guardrails: [
    'Only emit valid Eon component tags and documented props.',
    'Prefer manifest examples and documented relationships when composing screens.',
    'Use text labels and helper content for form controls.',
    'Do not replace Eon layout primitives with arbitrary HTML when an equivalent Eon primitive exists.'
  ],
  naturalLanguageExamples: [
    {
      request: 'Create a compact settings form with email, role, alerts toggle, and save button.',
      target: 'form',
      output: `<eon-section heading="Settings"><eon-stack gap="1rem"><eon-input label="Email"></eon-input><eon-combobox label="Role" options="Admin,Editor,Viewer"></eon-combobox><eon-switch label="Enable alerts"></eon-switch><eon-button>Save</eon-button></eon-stack></eon-section>`
    },
    {
      request: 'Create a dashboard section with a revenue chart and key status chips.',
      target: 'dashboard',
      output: `<eon-section heading="Revenue overview"><eon-toolbar slot="actions"><eon-chip>Live</eon-chip><eon-chip>Quarterly</eon-chip></eon-toolbar><eon-card><eon-chart type="line"></eon-chart></eon-card></eon-section>`
    }
  ]
} as const;

export * from './guide';
