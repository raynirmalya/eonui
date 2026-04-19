export const requiredJarvisComponentTags = [
    'jarvis-button',
    'jarvis-icon-button',
    'jarvis-input',
    'jarvis-textarea',
    'jarvis-checkbox',
    'jarvis-radio',
    'jarvis-switch',
    'jarvis-select',
    'jarvis-combobox',
    'jarvis-badge',
    'jarvis-alert',
    'jarvis-toast',
    'jarvis-card',
    'jarvis-tabs',
    'jarvis-accordion',
    'jarvis-tooltip',
    'jarvis-dialog',
    'jarvis-drawer',
    'jarvis-popover',
    'jarvis-dropdown-menu',
    'jarvis-breadcrumb',
    'jarvis-pagination',
    'jarvis-progress',
    'jarvis-spinner',
    'jarvis-skeleton',
    'jarvis-avatar',
    'jarvis-chip',
    'jarvis-list',
    'jarvis-divider',
    'jarvis-surface',
    'jarvis-stack',
    'jarvis-grid',
    'jarvis-section',
    'jarvis-toolbar',
    'jarvis-empty-state'
];
const baseA11y = [
    'Supports keyboard interaction and visible focus treatment.',
    'Uses semantic roles and ARIA attributes where native semantics are insufficient.',
    'Color is never the only means of conveying state.'
];
const baseResponsive = [
    'Adapts to its container width and avoids fixed pixel assumptions.',
    'Supports density and token-driven spacing changes.'
];
function entry(tag, category, description, extras = {}) {
    return {
        name: tag.replace('jarvis-', ''),
        tag,
        category,
        description,
        anatomy: ['root'],
        props: [],
        events: [],
        methods: [],
        slots: [{ name: 'default', description: 'Primary slotted content.' }],
        parts: [{ name: 'base', description: 'Root interactive surface.' }],
        cssVariables: [{ name: '--jarvis-component-radius', description: 'Component radius token.' }],
        accessibility: baseA11y,
        responsive: baseResponsive,
        examples: [],
        antiPatterns: ['Do not override internal semantics with conflicting roles.'],
        related: [],
        compositionRules: ['Compose with Jarvis layout primitives for consistent spacing.'],
        ...extras
    };
}
export const componentManifestRegistry = [
    entry('jarvis-button', 'actions', 'Primary action trigger.', {
        anatomy: ['root', 'prefix', 'label', 'suffix'],
        props: [
            { name: 'variant', type: '"solid" | "outline" | "ghost"', default: 'solid', description: 'Visual treatment.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: 'md', description: 'Control size.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Shows loading state and disables interaction.' }
        ],
        parts: [
            { name: 'base', description: 'Clickable button surface.' },
            { name: 'prefix', description: 'Leading icon container.' },
            { name: 'suffix', description: 'Trailing icon container.' }
        ],
        cssVariables: [
            { name: '--jarvis-button-bg', description: 'Background color.' },
            { name: '--jarvis-button-color', description: 'Foreground color.' }
        ],
        examples: [{ title: 'Primary', code: '<jarvis-button>Save</jarvis-button>' }]
    }),
    entry('jarvis-icon-button', 'actions', 'Compact icon-only button.', {
        props: [
            { name: 'label', type: 'string', description: 'Accessible name for assistive technology.' },
            { name: 'size', type: '"sm" | "md" | "lg"', default: 'md', description: 'Control size.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a busy state and disables interaction.' }
        ]
    }),
    entry('jarvis-input', 'forms', 'Single-line text entry field.', {
        anatomy: ['label', 'control', 'help-text'],
        props: [
            { name: 'label', type: 'string', description: 'Accessible label.' },
            { name: 'placeholder', type: 'string', description: 'Hint text.' },
            { name: 'value', type: 'string', default: '""', description: 'Current value.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing.' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
            { name: 'helpText', type: 'string', description: 'Assistive helper text.' },
            { name: 'errorText', type: 'string', description: 'Validation error text.' }
        ],
        events: [{ name: 'jarvisInput', detail: '{ value: string }', description: 'Emits when value changes.' }]
    }),
    entry('jarvis-textarea', 'forms', 'Multi-line text entry field.', {
        props: [
            { name: 'label', type: 'string', description: 'Accessible label.' },
            { name: 'value', type: 'string', default: '""', description: 'Current value.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing.' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
            { name: 'helpText', type: 'string', description: 'Assistive helper text.' },
            { name: 'errorText', type: 'string', description: 'Validation error text.' }
        ]
    }),
    entry('jarvis-checkbox', 'forms', 'Binary choice control.', {
        props: [
            { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the control as invalid.' }
        ]
    }),
    entry('jarvis-radio', 'forms', 'Single selection within a set.', {
        props: [
            { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the control as invalid.' }
        ]
    }),
    entry('jarvis-switch', 'forms', 'Immediate toggle for settings.', {
        props: [
            { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' }
        ]
    }),
    entry('jarvis-select', 'forms', 'Native-backed select with Jarvis styling.', {
        props: [
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables selection.' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
            { name: 'helpText', type: 'string', description: 'Assistive helper text.' },
            { name: 'errorText', type: 'string', description: 'Validation error text.' }
        ]
    }),
    entry('jarvis-badge', 'feedback', 'Compact status label.'),
    entry('jarvis-alert', 'feedback', 'Inline system message.', {
        props: [
            { name: 'tone', type: '"neutral" | "success" | "warning" | "danger"', default: 'neutral', description: 'Visual and semantic tone.' },
            { name: 'title', type: 'string', description: 'Short heading text.' },
            { name: 'polite', type: '"polite" | "assertive"', default: 'polite', description: 'Live region politeness.' }
        ]
    }),
    entry('jarvis-avatar', 'data-display', 'User image or initials fallback.'),
    entry('jarvis-breadcrumb', 'navigation', 'Hierarchical location trail.'),
    entry('jarvis-card', 'layout', 'Composable surfaced container.'),
    entry('jarvis-chip', 'forms', 'Compact selected value or filter token.'),
    entry('jarvis-divider', 'layout', 'Visual or semantic separation line.'),
    entry('jarvis-empty-state', 'feedback', 'Guided placeholder when no data is available.'),
    entry('jarvis-list', 'data-display', 'Simple ordered or unordered content list.'),
    entry('jarvis-pagination', 'navigation', 'Paged navigation control.', {
        props: [
            { name: 'page', type: 'number', default: '1', description: 'Current page.' },
            { name: 'total', type: 'number', default: '1', description: 'Total number of pages.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables page navigation controls.' }
        ],
        events: [{ name: 'jarvisPageChange', detail: '{ page: number }', description: 'Emits when requested page changes.' }]
    }),
    entry('jarvis-tabs', 'navigation', 'Tabbed content switcher.', {
        accessibility: [
            ...baseA11y,
            'Supports Arrow Left, Arrow Right, Home, and End keyboard navigation.',
            'Uses tablist, tab, and tabpanel semantics.'
        ]
    }),
    entry('jarvis-skeleton', 'feedback', 'Loading placeholder block.'),
    entry('jarvis-toast', 'feedback', 'Transient global notification surface.', {
        props: [
            { name: 'tone', type: '"neutral" | "success" | "warning" | "danger"', default: 'neutral', description: 'Visual and semantic tone.' },
            { name: 'title', type: 'string', description: 'Short heading text.' },
            { name: 'polite', type: '"polite" | "assertive"', default: 'polite', description: 'Live region politeness.' }
        ]
    }),
    entry('jarvis-toolbar', 'layout', 'Action grouping bar for dense controls.'),
    entry('jarvis-accordion', 'disclosure', 'Expandable content sections.', {
        accessibility: [
            ...baseA11y,
            'Trigger exposes expanded state and controls the associated panel.',
            'Content remains keyboard reachable when expanded.'
        ]
    }),
    entry('jarvis-combobox', 'forms', 'Filterable single-select text input with suggestion list.', {
        props: [
            { name: 'label', type: 'string', description: 'Visible field label.' },
            { name: 'options', type: 'string', description: 'Comma-separated option list.' },
            { name: 'value', type: 'string', default: '""', description: 'Selected value.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
            { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks the field as invalid.' },
            { name: 'helpText', type: 'string', description: 'Assistive helper text.' },
            { name: 'errorText', type: 'string', description: 'Validation error text.' }
        ],
        events: [{ name: 'jarvisChange', detail: '{ value: string }', description: 'Emits when an option is selected.' }],
        parts: [
            { name: 'base', description: 'Field container.' },
            { name: 'control', description: 'Text input.' },
            { name: 'toggle', description: 'Open/close trigger.' },
            { name: 'listbox', description: 'Options overlay.' },
            { name: 'option', description: 'Selectable option.' }
        ],
        accessibility: [
            ...baseA11y,
            'Supports Arrow Up, Arrow Down, Enter, and Escape keyboard interactions.',
            'Uses combobox, listbox, option, and active descendant semantics.',
            'Dismisses the popup on outside interaction or focus exit.'
        ]
    }),
    entry('jarvis-drawer', 'overlays', 'Edge-anchored overlay panel for navigation or details.', {
        props: [
            { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility.' },
            { name: 'side', type: '"left" | "right"', default: 'right', description: 'Anchoring edge.' },
            { name: 'label', type: 'string', default: 'Drawer', description: 'Accessible label for assistive technology.' }
        ],
        methods: [
            { name: 'show()', description: 'Opens the drawer.' },
            { name: 'hide()', description: 'Closes the drawer.' }
        ],
        slots: [
            { name: 'default', description: 'Drawer content body.' },
            { name: 'header', description: 'Drawer header.' },
            { name: 'footer', description: 'Drawer footer actions.' }
        ],
        accessibility: [
            ...baseA11y,
            'Returns focus to the invoking element when closed.',
            'Uses dialog semantics for assistive technology.',
            'Receives initial focus when opened.'
        ]
    }),
    entry('jarvis-dropdown-menu', 'navigation', 'Menu of contextual actions anchored to a trigger.', {
        props: [
            { name: 'label', type: 'string', description: 'Trigger button label.' },
            { name: 'items', type: 'string', description: 'Comma-separated menu item labels.' }
        ],
        events: [{ name: 'jarvisSelect', detail: '{ value: string }', description: 'Emits when a menu item is selected.' }],
        parts: [
            { name: 'base', description: 'Root menu container.' },
            { name: 'trigger', description: 'Menu trigger button.' },
            { name: 'panel', description: 'Floating menu panel.' },
            { name: 'item', description: 'Selectable menu item.' }
        ],
        accessibility: [
            ...baseA11y,
            'Supports Arrow Up, Arrow Down, Enter, and Escape keyboard interactions.',
            'Uses menu and menuitem roles for contextual action lists.',
            'Dismisses the popup on outside interaction.'
        ]
    }),
    entry('jarvis-popover', 'overlays', 'Anchored overlay for lightweight contextual content.', {
        props: [
            { name: 'triggerLabel', type: 'string', description: 'Fallback trigger label.' },
            { name: 'placement', type: '"top" | "bottom"', default: 'bottom', description: 'Preferred panel placement.' },
            { name: 'label', type: 'string', default: 'Popover', description: 'Accessible label for assistive technology.' }
        ],
        slots: [
            { name: 'default', description: 'Popover content.' },
            { name: 'trigger', description: 'Custom trigger content.' }
        ],
        accessibility: [
            ...baseA11y,
            'Dismisses when interaction moves outside the popover surface.'
        ]
    }),
    entry('jarvis-tooltip', 'feedback', 'Contextual hover/focus hint.', {
        props: [{ name: 'text', type: 'string', description: 'Tooltip content string.' }],
        parts: [
            { name: 'trigger', description: 'Hover or focus anchor.' },
            { name: 'content', description: 'Tooltip body.' }
        ]
    }),
    entry('jarvis-dialog', 'overlays', 'Modal dialog surface.', {
        props: [
            { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility.' },
            { name: 'label', type: 'string', default: 'Dialog', description: 'Accessible label for assistive technology.' }
        ],
        methods: [
            { name: 'show()', description: 'Opens the dialog.' },
            { name: 'hide()', description: 'Closes the dialog.' }
        ],
        slots: [
            { name: 'default', description: 'Dialog body content.' },
            { name: 'header', description: 'Dialog heading and top actions.' },
            { name: 'footer', description: 'Dialog footer actions.' }
        ],
        parts: [
            { name: 'overlay', description: 'Backdrop layer.' },
            { name: 'panel', description: 'Dialog surface.' },
            { name: 'header', description: 'Header region.' },
            { name: 'body', description: 'Body region.' },
            { name: 'footer', description: 'Footer region.' }
        ],
        accessibility: [
            ...baseA11y,
            'Escape closes the dialog and focus is restored to the invoking element.',
            'Focus is trapped while the dialog is active.',
            'The dialog panel receives initial focus when opened.'
        ]
    }),
    entry('jarvis-progress', 'feedback', 'Determinate progress indicator.'),
    entry('jarvis-spinner', 'feedback', 'Indeterminate loading indicator.'),
    entry('jarvis-stack', 'layout', 'Responsive one-dimensional layout primitive.'),
    entry('jarvis-grid', 'layout', 'Responsive two-dimensional layout primitive.'),
    entry('jarvis-surface', 'layout', 'Themed surface container.'),
    entry('jarvis-section', 'layout', 'Semantic content section with title and actions.')
];
//# sourceMappingURL=registry.js.map