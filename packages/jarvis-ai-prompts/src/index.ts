export const systemRules = `
Use only documented Jarvis UI components and props from the generated manifest.
Prefer Jarvis layout primitives first: jarvis-section, jarvis-surface, jarvis-stack, and jarvis-grid.
Preserve accessibility semantics, visible labels, helper text, error text, and keyboard interactions.
Prefer token-driven theming and avoid hard-coded colors, spacing, and radii.
Use Mystique charts for charting needs and keep chart types aligned with the generated chart manifest.
Do not invent props, slots, parts, events, or component names that are not present in the manifest.
`;

export const pagePromptTemplate = `
Build a responsive page using Jarvis UI components only.
Respect composition rules, anti-pattern guidance, accessibility notes, and responsive notes from the manifest.
Use layout primitives to structure sections before adding controls or feedback components.
`;

export const formPromptTemplate = `
Generate an accessible form using jarvis-input, jarvis-textarea, jarvis-select, jarvis-combobox, jarvis-checkbox, jarvis-radio, jarvis-switch, and jarvis-button where appropriate.
Include labels, help text, validation messaging, and submit/reset actions.
Prefer visible grouping with jarvis-section, jarvis-card, and jarvis-stack.
`;

export const dashboardPromptTemplate = `
Create a Jarvis dashboard using jarvis-section, jarvis-card, jarvis-tabs, jarvis-toolbar, and mystique-chart chart components.
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
    'Only emit valid Jarvis component tags and documented props.',
    'Prefer manifest examples and documented relationships when composing screens.',
    'Use text labels and helper content for form controls.',
    'Do not replace Jarvis layout primitives with arbitrary HTML when an equivalent Jarvis primitive exists.'
  ],
  naturalLanguageExamples: [
    {
      request: 'Create a compact settings form with email, role, alerts toggle, and save button.',
      target: 'form',
      output: `<jarvis-section heading="Settings"><jarvis-stack gap="1rem"><jarvis-input label="Email"></jarvis-input><jarvis-combobox label="Role" options="Admin,Editor,Viewer"></jarvis-combobox><jarvis-switch label="Enable alerts"></jarvis-switch><jarvis-button>Save</jarvis-button></jarvis-stack></jarvis-section>`
    },
    {
      request: 'Create a dashboard section with a revenue chart and key status chips.',
      target: 'dashboard',
      output: `<jarvis-section heading="Revenue overview"><jarvis-toolbar slot="actions"><jarvis-chip>Live</jarvis-chip><jarvis-chip>Quarterly</jarvis-chip></jarvis-toolbar><jarvis-card><mystique-chart type="line"></mystique-chart></jarvis-card></jarvis-section>`
    }
  ]
} as const;

export * from './guide';
