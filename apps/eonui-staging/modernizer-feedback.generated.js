// Auto-generated from eonui-component-modernization-blueprint-2026-06-13.json. Do not edit by hand.
export const modernizerFeedback = {
  "eon-app-store-button": {
    "tag": "eon-app-store-button",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Store-download call-to-action for mobile application surfaces.",
    "focus": "Broaden the action surface so it can look and behave differently without exploding into many one-off components.",
    "featureIdeas": [
      "Support richer action metadata such as icon, badge, shortcut, and async-busy messaging.",
      "Let each action carry iconography, badge count, and secondary meta without forcing a custom child component.",
      "Document destructive, loading, and success-completion patterns with authored examples."
    ],
    "variantIdeas": [
      "Use a stronger visual set such as `solid`, `outline`, `ghost`, `soft`, and `elevated` rather than only one flat button look.",
      "Add `neutral`, `brand`, `success`, `warning`, and `danger` tones with token-driven hover and pressed depth.",
      "Add compact, standard, large CTA, icon-leading, icon-trailing, and pill silhouettes with strong motion contrast."
    ],
    "templateIdeas": [
      "Expose named regions like `start`, `default`, `end`, `loading`, `badge` so richer content does not require prop sprawl.",
      "Keep the fast path tiny with scalar props, but allow an action object like `{ id, label, icon, tone, variant, shortcut, badge, busy, destructive }`.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Normalize hover, focus-visible, pressed, busy, success, and disabled states with token-based motion and contrast.",
      "Expose event detail that tells wrappers whether the action was pressed, toggled, or blocked by validation.",
      "Make reduced-motion and high-contrast themes first-class, not afterthoughts."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-button": {
    "tag": "eon-button",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Primary action trigger.",
    "focus": "Turn the base action primitive into a visually distinctive system driver rather than a flat utility control.",
    "featureIdeas": [
      "Add pressed, selected, loading-progress, and split-action behavior without forcing separate components.",
      "Support icon-only, icon-leading, icon-trailing, and badge-bearing actions from the same contract.",
      "Expose motion tokens for hover, press depth, and busy transitions so branded themes can feel premium."
    ],
    "variantIdeas": [
      "Ship `solid`, `outline`, `ghost`, `soft`, `elevated`, and `gradient` variants with `neutral`, `brand`, `success`, `warning`, and `danger` tones.",
      "Add shape modes such as `square`, `rounded`, and `pill`, plus compact toolbar and large hero CTA sizes.",
      "Offer a `quiet-link` visual for places where a button should still behave like an action but look editorial."
    ],
    "templateIdeas": [
      "Keep simple usage as `label`, `variant`, and `tone`, but allow an action object like `{ id, label, icon, badge, shortcut, busy, destructive }`.",
      "Use slots `start`, `default`, `end`, and `loading` so frameworks can supply richer content without prop sprawl.",
      "Reserve event payload space for `{ actionId, pressed, busy, originalEvent }` so all wrappers can stay aligned."
    ],
    "stateIdeas": [
      "Normalize idle, hover, focus-visible, pressed, busy, success-flash, and disabled states across themes.",
      "Handle async actions with busy locking, delayed spinner reveal, and success or error completion hooks.",
      "Support reduced-motion fallbacks while preserving clear affordance and hierarchy."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-button-group": {
    "tag": "eon-button-group",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Segmented button set for single or multi selection.",
    "focus": "Make grouped actions feel more like a modern segmented-control system than a row of plain buttons.",
    "featureIdeas": [
      "Support richer action metadata such as icon, badge, shortcut, and async-busy messaging.",
      "Let each action carry iconography, badge count, and secondary meta without forcing a custom child component.",
      "Document destructive, loading, and success-completion patterns with authored examples."
    ],
    "variantIdeas": [
      "Use a stronger visual set such as `solid`, `outline`, `ghost`, `soft`, and `elevated` rather than only one flat button look.",
      "Add `neutral`, `brand`, `success`, `warning`, and `danger` tones with token-driven hover and pressed depth.",
      "Add compact, standard, large CTA, icon-leading, icon-trailing, and pill silhouettes with strong motion contrast."
    ],
    "templateIdeas": [
      "Expose named regions like `start`, `default`, `end`, `loading`, `badge` so richer content does not require prop sprawl.",
      "Keep the fast path tiny with scalar props, but allow an action object like `{ id, label, icon, tone, variant, shortcut, badge, busy, destructive }`.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Normalize hover, focus-visible, pressed, busy, success, and disabled states with token-based motion and contrast.",
      "Expose event detail that tells wrappers whether the action was pressed, toggled, or blocked by validation.",
      "Make reduced-motion and high-contrast themes first-class, not afterthoughts."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-drop-down-button": {
    "tag": "eon-drop-down-button",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Button that opens a structured action menu.",
    "focus": "Broaden the action surface so it can look and behave differently without exploding into many one-off components.",
    "featureIdeas": [
      "Support richer action metadata such as icon, badge, shortcut, and async-busy messaging.",
      "Let each action carry iconography, badge count, and secondary meta without forcing a custom child component.",
      "Document destructive, loading, and success-completion patterns with authored examples."
    ],
    "variantIdeas": [
      "Use a stronger visual set such as `solid`, `outline`, `ghost`, `soft`, and `elevated` rather than only one flat button look.",
      "Add `neutral`, `brand`, `success`, `warning`, and `danger` tones with token-driven hover and pressed depth.",
      "Add compact, standard, large CTA, icon-leading, icon-trailing, and pill silhouettes with strong motion contrast."
    ],
    "templateIdeas": [
      "Expose named regions like `start`, `default`, `end`, `loading`, `badge` so richer content does not require prop sprawl.",
      "Keep the fast path tiny with scalar props, but allow an action object like `{ id, label, icon, tone, variant, shortcut, badge, busy, destructive }`.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Normalize hover, focus-visible, pressed, busy, success, and disabled states with token-based motion and contrast.",
      "Expose event detail that tells wrappers whether the action was pressed, toggled, or blocked by validation.",
      "Make reduced-motion and high-contrast themes first-class, not afterthoughts."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-floating-action-button": {
    "tag": "eon-floating-action-button",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Floating primary action button with optional speed-dial actions.",
    "focus": "Turn the FAB into a real mobile-first launcher with speed-dial composition and adaptive placement.",
    "featureIdeas": [
      "Support richer action metadata such as icon, badge, shortcut, and async-busy messaging.",
      "Let each action carry iconography, badge count, and secondary meta without forcing a custom child component.",
      "Document destructive, loading, and success-completion patterns with authored examples."
    ],
    "variantIdeas": [
      "Use a stronger visual set such as `solid`, `outline`, `ghost`, `soft`, and `elevated` rather than only one flat button look.",
      "Add `neutral`, `brand`, `success`, `warning`, and `danger` tones with token-driven hover and pressed depth.",
      "Add compact, standard, large CTA, icon-leading, icon-trailing, and pill silhouettes with strong motion contrast."
    ],
    "templateIdeas": [
      "Expose named regions like `start`, `default`, `end`, `loading`, `badge` so richer content does not require prop sprawl.",
      "Keep the fast path tiny with scalar props, but allow an action object like `{ id, label, icon, tone, variant, shortcut, badge, busy, destructive }`.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Normalize hover, focus-visible, pressed, busy, success, and disabled states with token-based motion and contrast.",
      "Expose event detail that tells wrappers whether the action was pressed, toggled, or blocked by validation.",
      "Make reduced-motion and high-contrast themes first-class, not afterthoughts."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-icon-button": {
    "tag": "eon-icon-button",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Compact icon-only button.",
    "focus": "Push icon buttons beyond tiny circular clicks by supporting toggle, badge, and contextual emphasis modes.",
    "featureIdeas": [
      "Support richer action metadata such as icon, badge, shortcut, and async-busy messaging.",
      "Let each action carry iconography, badge count, and secondary meta without forcing a custom child component.",
      "Document destructive, loading, and success-completion patterns with authored examples."
    ],
    "variantIdeas": [
      "Use a stronger visual set such as `solid`, `outline`, `ghost`, `soft`, and `elevated` rather than only one flat button look.",
      "Add `neutral`, `brand`, `success`, `warning`, and `danger` tones with token-driven hover and pressed depth.",
      "Add compact, standard, large CTA, icon-leading, icon-trailing, and pill silhouettes with strong motion contrast."
    ],
    "templateIdeas": [
      "Expose named regions like `start`, `default`, `end`, `loading`, `badge` so richer content does not require prop sprawl.",
      "Keep the fast path tiny with scalar props, but allow an action object like `{ id, label, icon, tone, variant, shortcut, badge, busy, destructive }`.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Normalize hover, focus-visible, pressed, busy, success, and disabled states with token-based motion and contrast.",
      "Expose event detail that tells wrappers whether the action was pressed, toggled, or blocked by validation.",
      "Make reduced-motion and high-contrast themes first-class, not afterthoughts."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-social-button": {
    "tag": "eon-social-button",
    "category": "actions",
    "categoryLabel": "Actions",
    "description": "Branded social-signposting button for community and sharing entry points.",
    "focus": "Broaden the action surface so it can look and behave differently without exploding into many one-off components.",
    "featureIdeas": [
      "Support richer action metadata such as icon, badge, shortcut, and async-busy messaging.",
      "Let each action carry iconography, badge count, and secondary meta without forcing a custom child component.",
      "Document destructive, loading, and success-completion patterns with authored examples."
    ],
    "variantIdeas": [
      "Use a stronger visual set such as `solid`, `outline`, `ghost`, `soft`, and `elevated` rather than only one flat button look.",
      "Add `neutral`, `brand`, `success`, `warning`, and `danger` tones with token-driven hover and pressed depth.",
      "Add compact, standard, large CTA, icon-leading, icon-trailing, and pill silhouettes with strong motion contrast."
    ],
    "templateIdeas": [
      "Expose named regions like `start`, `default`, `end`, `loading`, `badge` so richer content does not require prop sprawl.",
      "Keep the fast path tiny with scalar props, but allow an action object like `{ id, label, icon, tone, variant, shortcut, badge, busy, destructive }`.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Normalize hover, focus-visible, pressed, busy, success, and disabled states with token-based motion and contrast.",
      "Expose event detail that tells wrappers whether the action was pressed, toggled, or blocked by validation.",
      "Make reduced-motion and high-contrast themes first-class, not afterthoughts."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-autocomplete": {
    "tag": "eon-autocomplete",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Freeform text input with inline suggestion popup.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-calendar": {
    "tag": "eon-calendar",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Interactive month calendar with single or multiple selection.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-checkbox": {
    "tag": "eon-checkbox",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Binary choice control.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-chip": {
    "tag": "eon-chip",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Compact selected value or filter token.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-color-box": {
    "tag": "eon-color-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Color picker field with optional alpha-channel editing.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-combobox": {
    "tag": "eon-combobox",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Filterable single-select text input with suggestion list.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-date-box": {
    "tag": "eon-date-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Date, time, or date-time field with Eon styling.",
    "focus": "Push date-box toward a trustworthy scheduling primitive with presets, timezones, and draft-state clarity.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-date-range-box": {
    "tag": "eon-date-range-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Paired start and end date selection field.",
    "focus": "Make range selection feel compact and trustworthy across dashboards, travel flows, and reporting.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-drop-down-box": {
    "tag": "eon-drop-down-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Advanced dropdown editor with embedded tree or list content.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-file-uploader": {
    "tag": "eon-file-uploader",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "File picker with drag-drop, validation, and manual or instant upload states.",
    "focus": "Upgrade uploader into a workflow component with queueing, progress, error recovery, and file-template control.",
    "featureIdeas": [
      "Add queueing, retry, cancel, validation, and upload-adapter hooks so the component can survive real workflows.",
      "Support per-file preview, status, and action regions instead of a flat file list.",
      "Clarify the contract between local files, remote assets, and controlled upload progress."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Use `files: Array<{ id, name, size, type, status, progress, previewUrl, error, actions }>` plus adapter callbacks for upload lifecycle.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-filter-bar": {
    "tag": "eon-filter-bar",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Filter-pill toolbar for narrowing content, metrics, or list views.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-gradient-picker": {
    "tag": "eon-gradient-picker",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Gradient picker preview surface for choosing colorful brand or theme treatments.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-html-editor": {
    "tag": "eon-html-editor",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Rich text editor with formatting toolbar, block controls, and embedded media actions.",
    "focus": "Move the editor from a monolithic control to a templated authoring surface with pluggable tools and content guards.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-image-picker": {
    "tag": "eon-image-picker",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Image-picker surface for selecting media variants or visual categories.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-input": {
    "tag": "eon-input",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Single-line text entry field.",
    "focus": "Modernize the base text field with stronger adornments, formatting, and intent-specific presentation.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-lookup": {
    "tag": "eon-lookup",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Expanded lookup picker with search-focused selection sheet.",
    "focus": "Position lookup as the rich search-and-pick surface for people, records, and remote datasets.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-number-box": {
    "tag": "eon-number-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Numeric field with spin controls and clamping.",
    "focus": "Make number-box production-ready for commerce, analytics, and calculator use cases with stronger formatting control.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-radio": {
    "tag": "eon-radio",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Single selection within a set.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-radio-group": {
    "tag": "eon-radio-group",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Radio input group with horizontal or vertical layout.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-range-selector": {
    "tag": "eon-range-selector",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Dual-handle range selector with scale ticks and formatted value labels.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-range-slider": {
    "tag": "eon-range-slider",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Dual-thumb slider for selecting a numeric range.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-select": {
    "tag": "eon-select",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Native-backed select with Eon styling.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-select-box": {
    "tag": "eon-select-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Searchable dropdown selector with optional grouping.",
    "focus": "Make select-box the canonical typed selection primitive with rich item templates and scalable data handling.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-slider": {
    "tag": "eon-slider",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Single-value range selector.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-speech-to-text": {
    "tag": "eon-speech-to-text",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Speech recognition trigger with transcript preview and browser support messaging.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-switch": {
    "tag": "eon-switch",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Immediate toggle for settings.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-tag-box": {
    "tag": "eon-tag-box",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Multi-select combobox that renders selected items as dismissible tags.",
    "focus": "Improve tag-box so dense multi-select flows stay readable, searchable, and easy to summarize.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-textarea": {
    "tag": "eon-textarea",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Multi-line text entry field.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-verification-code-input": {
    "tag": "eon-verification-code-input",
    "category": "forms",
    "categoryLabel": "Forms",
    "description": "Verification-code display and entry shell for multi-character OTP flows.",
    "focus": "Keep quick forms simple while making the advanced path data-aware, template-friendly, and production-ready.",
    "featureIdeas": [
      "Normalize label, helper, validation, pending, and success messaging so every field behaves coherently.",
      "Support async data, richer metadata rows, or custom formatting when the field renders non-trivial content.",
      "Add mobile-specific behavior where pickers, sheets, or compact summaries are more usable than inline chrome."
    ],
    "variantIdeas": [
      "Offer `outlined`, `filled`, `quiet`, and `underlined` shells so forms can feel different without breaking API parity.",
      "Add dense, standard, and spacious layouts plus states that read cleanly in cards, tables, and marketing pages.",
      "Support card-like or chip-like field presentations where the component doubles as a picker or summary surface."
    ],
    "templateIdeas": [
      "Expose named regions like `label`, `prefix`, `default`, `suffix`, `help`, `error` so richer content does not require prop sprawl.",
      "Separate field chrome props from value-model props so wrappers can bind `{ value, displayValue, status, helper, validation, suggestions }` cleanly.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Standardize pristine, dirty, focused, validating, invalid, success, readonly, and disabled states across all form primitives.",
      "Support draft text versus committed value where parsing or async search is involved.",
      "Keep helper, error, and success regions stable so layouts do not jump unexpectedly."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-breadcrumb": {
    "tag": "eon-breadcrumb",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Hierarchical location trail.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-command-menu": {
    "tag": "eon-command-menu",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Command-menu surface for quick actions, navigation, and search shortcuts.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-context-menu": {
    "tag": "eon-context-menu",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Right-click or long-press contextual action menu.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-dropdown-menu": {
    "tag": "eon-dropdown-menu",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Menu of contextual actions anchored to a trigger.",
    "focus": "Move dropdown-menu from string-fed actions to a command model with sections, shortcuts, icons, and async items.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-header-navigation": {
    "tag": "eon-header-navigation",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Top-level header navigation with branded links and utility actions.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-menu": {
    "tag": "eon-menu",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Structured command menu with nested submenus.",
    "focus": "Make menu a reusable command surface for app navigation, not just a static list of text rows.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-page-header": {
    "tag": "eon-page-header",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Page-level header block for titles, descriptions, and utility actions.",
    "focus": "Make page headers more cinematic and information-dense so apps can express hierarchy without custom one-offs.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-pagination": {
    "tag": "eon-pagination",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Paged navigation control.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-section-footer": {
    "tag": "eon-section-footer",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Section footer row for links, summary copy, and compact follow-up actions.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-section-header": {
    "tag": "eon-section-header",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Section header block for grouped content titles and descriptive context.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-sidebar-navigation": {
    "tag": "eon-sidebar-navigation",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Sidebar navigation list for dense product and docs structures.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-stepper": {
    "tag": "eon-stepper",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Multi-step progress and navigation indicator.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-tab-panel": {
    "tag": "eon-tab-panel",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Tabs plus synchronized panel content for grouped task or workflow views.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-tabs": {
    "tag": "eon-tabs",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Tabbed content switcher.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-tree-view": {
    "tag": "eon-tree-view",
    "category": "navigation",
    "categoryLabel": "Navigation",
    "description": "Expandable hierarchical navigation and selection tree.",
    "focus": "Promote tree-view into a high-capability information browser with async nodes, richer rows, and virtualization.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-action-sheet": {
    "tag": "eon-action-sheet",
    "category": "overlays",
    "categoryLabel": "Overlays",
    "description": "Bottom sheet or contextual action list for task-specific commands.",
    "focus": "Make action sheets feel native on mobile while still handling richer desktop command layouts gracefully.",
    "featureIdeas": [
      "Add smarter open-state control, stacking, collision handling, and route or task integration.",
      "Support async confirm, destructive messaging, and richer embedded content flows.",
      "Clarify trigger versus surface responsibilities so wrappers can stay thin and predictable."
    ],
    "variantIdeas": [
      "Support modal, sheet, floating, and fullscreen interpretations where that component family makes sense.",
      "Let teams pick between soft-surface, elevated, glassy, or dense productivity treatments via tokens.",
      "Add mobile-safe compact headers and sticky action bars for long content."
    ],
    "templateIdeas": [
      "Expose named regions like `trigger`, `title`, `description`, `default`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle open, entering, entered, exiting, and dismissed states predictably, including escape, outside-click, and route-driven closure.",
      "Support async action pending states without trapping users in unclear modal flows.",
      "Keep focus restoration, scroll locking, and reduced-motion behavior consistent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-dialog": {
    "tag": "eon-dialog",
    "category": "overlays",
    "categoryLabel": "Overlays",
    "description": "Modal dialog surface.",
    "focus": "Treat dialogs as composable workflows with strong async, validation, and destructive-confirmation states.",
    "featureIdeas": [
      "Add smarter open-state control, stacking, collision handling, and route or task integration.",
      "Support async confirm, destructive messaging, and richer embedded content flows.",
      "Clarify trigger versus surface responsibilities so wrappers can stay thin and predictable."
    ],
    "variantIdeas": [
      "Support modal, sheet, floating, and fullscreen interpretations where that component family makes sense.",
      "Let teams pick between soft-surface, elevated, glassy, or dense productivity treatments via tokens.",
      "Add mobile-safe compact headers and sticky action bars for long content."
    ],
    "templateIdeas": [
      "Expose named regions like `trigger`, `title`, `description`, `default`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Use a surface config like `{ open, title, description, size, placement, tone, dismissBehavior, actions }` instead of many disconnected booleans.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle open, entering, entered, exiting, and dismissed states predictably, including escape, outside-click, and route-driven closure.",
      "Support async action pending states without trapping users in unclear modal flows.",
      "Keep focus restoration, scroll locking, and reduced-motion behavior consistent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-drawer": {
    "tag": "eon-drawer",
    "category": "overlays",
    "categoryLabel": "Overlays",
    "description": "Edge-anchored overlay panel for navigation or details.",
    "focus": "Evolve drawers into route-aware panels that can work as sidebars, inspectors, or mobile sheets.",
    "featureIdeas": [
      "Add smarter open-state control, stacking, collision handling, and route or task integration.",
      "Support async confirm, destructive messaging, and richer embedded content flows.",
      "Clarify trigger versus surface responsibilities so wrappers can stay thin and predictable."
    ],
    "variantIdeas": [
      "Support modal, sheet, floating, and fullscreen interpretations where that component family makes sense.",
      "Let teams pick between soft-surface, elevated, glassy, or dense productivity treatments via tokens.",
      "Add mobile-safe compact headers and sticky action bars for long content."
    ],
    "templateIdeas": [
      "Expose named regions like `trigger`, `title`, `description`, `default`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Use a surface config like `{ open, title, description, size, placement, tone, dismissBehavior, actions }` instead of many disconnected booleans.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle open, entering, entered, exiting, and dismissed states predictably, including escape, outside-click, and route-driven closure.",
      "Support async action pending states without trapping users in unclear modal flows.",
      "Keep focus restoration, scroll locking, and reduced-motion behavior consistent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-load-panel": {
    "tag": "eon-load-panel",
    "category": "overlays",
    "categoryLabel": "Overlays",
    "description": "Blocking or non-blocking loading overlay layered over content.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-popover": {
    "tag": "eon-popover",
    "category": "overlays",
    "categoryLabel": "Overlays",
    "description": "Anchored overlay for lightweight contextual content.",
    "focus": "Strengthen anchored overlays so they can hold interactive content without fragile positioning behavior.",
    "featureIdeas": [
      "Add smarter open-state control, stacking, collision handling, and route or task integration.",
      "Support async confirm, destructive messaging, and richer embedded content flows.",
      "Clarify trigger versus surface responsibilities so wrappers can stay thin and predictable."
    ],
    "variantIdeas": [
      "Support modal, sheet, floating, and fullscreen interpretations where that component family makes sense.",
      "Let teams pick between soft-surface, elevated, glassy, or dense productivity treatments via tokens.",
      "Add mobile-safe compact headers and sticky action bars for long content."
    ],
    "templateIdeas": [
      "Expose named regions like `trigger`, `title`, `description`, `default`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Use a surface config like `{ open, title, description, size, placement, tone, dismissBehavior, actions }` instead of many disconnected booleans.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle open, entering, entered, exiting, and dismissed states predictably, including escape, outside-click, and route-driven closure.",
      "Support async action pending states without trapping users in unclear modal flows.",
      "Keep focus restoration, scroll locking, and reduced-motion behavior consistent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-popup": {
    "tag": "eon-popup",
    "category": "overlays",
    "categoryLabel": "Overlays",
    "description": "Modal popup surface for focused detail or confirmation flows.",
    "focus": "Clarify popup responsibilities relative to dialog and drawer, then give it a cleaner lightweight modal contract.",
    "featureIdeas": [
      "Add smarter open-state control, stacking, collision handling, and route or task integration.",
      "Support async confirm, destructive messaging, and richer embedded content flows.",
      "Clarify trigger versus surface responsibilities so wrappers can stay thin and predictable."
    ],
    "variantIdeas": [
      "Support modal, sheet, floating, and fullscreen interpretations where that component family makes sense.",
      "Let teams pick between soft-surface, elevated, glassy, or dense productivity treatments via tokens.",
      "Add mobile-safe compact headers and sticky action bars for long content."
    ],
    "templateIdeas": [
      "Expose named regions like `trigger`, `title`, `description`, `default`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Use a surface config like `{ open, title, description, size, placement, tone, dismissBehavior, actions }` instead of many disconnected booleans.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle open, entering, entered, exiting, and dismissed states predictably, including escape, outside-click, and route-driven closure.",
      "Support async action pending states without trapping users in unclear modal flows.",
      "Keep focus restoration, scroll locking, and reduced-motion behavior consistent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-alert": {
    "tag": "eon-alert",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Inline system message.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-badge": {
    "tag": "eon-badge",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Compact status label.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-chat": {
    "tag": "eon-chat",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Conversation surface with message bubbles, attachments, and a composer.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-empty-state": {
    "tag": "eon-empty-state",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Guided placeholder when no data is available.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-load-indicator": {
    "tag": "eon-load-indicator",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Lightweight indeterminate loading indicator.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-progress": {
    "tag": "eon-progress",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Determinate or indeterminate progress indicator with optional labels and helper text.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-skeleton": {
    "tag": "eon-skeleton",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Loading placeholder block.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-spinner": {
    "tag": "eon-spinner",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Indeterminate loading indicator.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-toast": {
    "tag": "eon-toast",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Transient global notification surface.",
    "focus": "Broaden state and presentation coverage so the component feels intentional in real product flows.",
    "featureIdeas": [
      "Broaden severity, density, and persistence rules so the component works inline, stacked, or standalone.",
      "Handle async transitions and completion feedback rather than just static states.",
      "Provide clearer accessibility and announcement behavior for assistive technologies."
    ],
    "variantIdeas": [
      "Support inline, toast-like, card, and banner-style visual treatments where the semantics still fit.",
      "Add subtle, strong, and inverse densities so status surfaces can work on light or dark themed regions.",
      "Use icon, accent-bar, and minimal text-only presentations without changing the underlying event model."
    ],
    "templateIdeas": [
      "Expose named regions like `icon`, `title`, `description`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Differentiate transient, persistent, dismissible, and blocking feedback states clearly.",
      "Handle announcement timing and motion carefully so messaging stays noticeable without being noisy.",
      "Provide stable structure for icon, copy, and actions across severities."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-tooltip": {
    "tag": "eon-tooltip",
    "category": "feedback",
    "categoryLabel": "Feedback",
    "description": "Contextual hover/focus hint.",
    "focus": "Use stronger slots, smarter state management, and clearer role boundaries so overlays compose well across apps.",
    "featureIdeas": [
      "Add smarter open-state control, stacking, collision handling, and route or task integration.",
      "Support async confirm, destructive messaging, and richer embedded content flows.",
      "Clarify trigger versus surface responsibilities so wrappers can stay thin and predictable."
    ],
    "variantIdeas": [
      "Support modal, sheet, floating, and fullscreen interpretations where that component family makes sense.",
      "Let teams pick between soft-surface, elevated, glassy, or dense productivity treatments via tokens.",
      "Add mobile-safe compact headers and sticky action bars for long content."
    ],
    "templateIdeas": [
      "Expose named regions like `trigger`, `title`, `description`, `default`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Use a surface config like `{ open, title, description, size, placement, tone, dismissBehavior, actions }` instead of many disconnected booleans.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle open, entering, entered, exiting, and dismissed states predictably, including escape, outside-click, and route-driven closure.",
      "Support async action pending states without trapping users in unclear modal flows.",
      "Keep focus restoration, scroll locking, and reduced-motion behavior consistent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-activity-feed": {
    "tag": "eon-activity-feed",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Chronological activity feed for product, team, or audit updates.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-activity-gauge": {
    "tag": "eon-activity-gauge",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Gauge-style summary surface for completion, health, or adoption metrics.",
    "focus": "Define a stronger data contract first, then layer visuals, interaction, and framework parity around it.",
    "featureIdeas": [
      "Promote the component from visual placeholder status to a typed data, interaction, and annotation contract.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-avatar": {
    "tag": "eon-avatar",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "User image or initials fallback.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-badge-group": {
    "tag": "eon-badge-group",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Clustered badge sets for compact metadata and status labels.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-card-header": {
    "tag": "eon-card-header",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Structured card header block with title, summary, and trailing metadata.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-carousel": {
    "tag": "eon-carousel",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Horizontally browsable content rail for featured cards and previews.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-featured-icon": {
    "tag": "eon-featured-icon",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Decorative highlighted icon callout for stats and feature blocks.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-file-manager": {
    "tag": "eon-file-manager",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "File-browser surface with tree navigation, breadcrumbs, and details/grid views.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-gallery": {
    "tag": "eon-gallery",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Media gallery with slideshow, indicators, and navigation buttons.",
    "focus": "Make gallery capable of editorial, commerce, and portfolio presentation rather than only a simple slideshow.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-list": {
    "tag": "eon-list",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Simple ordered, searchable, or selectable content list.",
    "focus": "Turn list into a flexible record-view primitive instead of a simple string renderer.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-metric": {
    "tag": "eon-metric",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Single metric card with trend context and supporting explanation.",
    "focus": "Define a stronger data contract first, then layer visuals, interaction, and framework parity around it.",
    "featureIdeas": [
      "Promote the component from visual placeholder status to a typed data, interaction, and annotation contract.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-qr-code": {
    "tag": "eon-qr-code",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Compact QR code presentation surface with label and helper copy.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-rating": {
    "tag": "eon-rating",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Rating badge with star treatment and supporting review context.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-tile-view": {
    "tag": "eon-tile-view",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Tiled content layout for media, property cards, and directional browsing.",
    "focus": "Stop treating repeated content as encoded strings and move the component to a reusable typed collection contract.",
    "featureIdeas": [
      "Accept object arrays and nested data rather than encoded strings so repeated content can carry meta and actions.",
      "Support empty, loading, error, selection, and bulk-action states instead of only the happy path.",
      "Improve keyboarding, virtualization, and search or filter affordances where the surface can grow large."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle loading, empty, filtered-empty, selected, multi-selected, and error states directly in the shell.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-vector-map": {
    "tag": "eon-vector-map",
    "category": "data-display",
    "categoryLabel": "Data Display",
    "description": "Lightweight vector map with region coloring, zoom controls, and legend.",
    "focus": "Define a stronger data contract first, then layer visuals, interaction, and framework parity around it.",
    "featureIdeas": [
      "Promote the component from visual placeholder status to a typed data, interaction, and annotation contract.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-card": {
    "tag": "eon-card",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Composable surfaced container.",
    "focus": "Turn card into a strong composition primitive with clearer media, header, body, meta, and footer regions.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-divider": {
    "tag": "eon-divider",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Visual or semantic separation line.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-grid": {
    "tag": "eon-grid",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Responsive two-dimensional layout primitive.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-resizable": {
    "tag": "eon-resizable",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Resize wrapper for dashboards, cards, and embedded surfaces.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-scroll-view": {
    "tag": "eon-scroll-view",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Scrollable viewport with bottom-reach events and configurable scrollbar treatment.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-section": {
    "tag": "eon-section",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Semantic content section with title and actions.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-sortable": {
    "tag": "eon-sortable",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Drag-and-drop board for reordering cards across columns.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-splitter": {
    "tag": "eon-splitter",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Resizable split-pane layout with optional collapsible panel.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-stack": {
    "tag": "eon-stack",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Responsive one-dimensional layout primitive.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-surface": {
    "tag": "eon-surface",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Themed surface container.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-toolbar": {
    "tag": "eon-toolbar",
    "category": "layout",
    "categoryLabel": "Layout",
    "description": "Action grouping bar for dense controls.",
    "focus": "Turn the primitive into a more expressive page-building tool with stronger structure and density controls.",
    "featureIdeas": [
      "Add stronger responsive behavior, density presets, and layout recipes so teams stop rebuilding common shells.",
      "Support auxiliary regions like toolbars, filters, or inspector areas with named structure instead of ad hoc wrappers.",
      "Document persistence and interaction behavior where resizing, sorting, or scrolling is part of the contract."
    ],
    "variantIdeas": [
      "Support airy editorial, dense productivity, and dashboard shell variants through tokens and structure slots.",
      "Add carded and borderless interpretations so the same primitive can sit in app or landing-page layouts.",
      "Use responsive mode switches instead of fixed visual assumptions at each breakpoint."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `toolbar`, `default`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Support compact, standard, and expanded density states plus responsive structure changes by token or prop.",
      "Persist user-driven size or order changes where resizing or sorting is core behavior.",
      "Handle scroll, sticky, collapse, and overflow states without layout jumps."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-banner": {
    "tag": "eon-banner",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Announcement banner surface for release notes, promos, or important updates.",
    "focus": "Evolve banners from simple notice strips into configurable announcement and conversion surfaces.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-blog-section": {
    "tag": "eon-blog-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Editorial blog-section layout for featured posts and article summaries.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-careers-section": {
    "tag": "eon-careers-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Careers section for open roles, team highlights, and hiring context.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-contact-section": {
    "tag": "eon-contact-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Contact section for support, sales, and regional reach-out options.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-content-section": {
    "tag": "eon-content-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Rich-content section for mixed narrative blocks, quotes, and highlights.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-cta-section": {
    "tag": "eon-cta-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Call-to-action section for conversions, launches, and high-priority asks.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-faq-section": {
    "tag": "eon-faq-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "FAQ section for grouped questions, concise answers, and docs pointers.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-features-section": {
    "tag": "eon-features-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Feature grid for grouped product benefits and implementation highlights.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-footer": {
    "tag": "eon-footer",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Footer section for grouped links, brand summary, and product metadata.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-header-section": {
    "tag": "eon-header-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Marketing header section for grouped narrative introductions.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support split-media, centered manifesto, proof-led, and immersive background-image compositions.",
      "Allow soft brand gradients, editorial neutrals, and bold campaign palettes without custom page CSS.",
      "Provide small-screen variants that reorder media, proof, and CTAs intelligently."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-hero-header-section": {
    "tag": "eon-hero-header-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Hero header section for strong page openings, messaging, and CTA framing.",
    "focus": "Make hero sections feel more intentionally designed with split layouts, background media, and proof modules.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support split-media, centered manifesto, proof-led, and immersive background-image compositions.",
      "Allow soft brand gradients, editorial neutrals, and bold campaign palettes without custom page CSS.",
      "Provide small-screen variants that reorder media, proof, and CTAs intelligently."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-illustration": {
    "tag": "eon-illustration",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Lightweight editorial illustration block for empty or promotional states.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-inline-cta": {
    "tag": "eon-inline-cta",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Inline call-to-action block for contextual upsells and invitations.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-metrics-section": {
    "tag": "eon-metrics-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Metrics section for grouped proof points, KPI snapshots, and social evidence.",
    "focus": "Define a stronger data contract first, then layer visuals, interaction, and framework parity around it.",
    "featureIdeas": [
      "Promote the component from visual placeholder status to a typed data, interaction, and annotation contract.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-newsletter-cta-section": {
    "tag": "eon-newsletter-cta-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Newsletter call-to-action section for updates, releases, and launch notes.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-pricing-section": {
    "tag": "eon-pricing-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Pricing section for tier cards, purchase context, and plan differences.",
    "focus": "Turn pricing into a real merchandising surface with plan comparison, billing logic, and recommendation emphasis.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-social-proof-section": {
    "tag": "eon-social-proof-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Social-proof section for quotes, logos, and outcome-focused endorsements.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-team-section": {
    "tag": "eon-team-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Team section for people cards, roles, and organization storytelling.",
    "focus": "Make the section feel more designed, more configurable, and easier to wire to CMS or product data.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-testimonial-section": {
    "tag": "eon-testimonial-section",
    "category": "marketing",
    "categoryLabel": "Marketing",
    "description": "Testimonial section for customer quotes and outcomes with concise framing.",
    "focus": "Broaden testimonials into quote, rating, video, and case-study teaser variants with stronger editorial range.",
    "featureIdeas": [
      "Treat the component as a page-building block with media, proof, action, and secondary-content regions.",
      "Support editorial, dashboard, and campaign-like variants without forcing page-specific forks.",
      "Improve data-driven authoring so CMS or API content can map cleanly to the component."
    ],
    "variantIdeas": [
      "Support centered, split-media, stacked, and immersive compositions with consistent spacing tokens.",
      "Add editorial, product, and campaign visual modes so the same component can look intentionally different.",
      "Allow background tones, media bleed, and proof-band treatments without page-specific rewrites."
    ],
    "templateIdeas": [
      "Expose named regions like `eyebrow`, `title`, `description`, `actions`, `media`, `aside`, `footer` so richer content does not require prop sprawl.",
      "Prefer typed arrays such as `{ id, label, title, description, icon, media, meta, href, status, actions, children }` over encoded strings.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Design loading, skeleton, empty, and CMS-missing states so page sections do not collapse awkwardly.",
      "Support responsive reflow rules for actions, media, and meta bands instead of one rigid layout.",
      "Allow sections to degrade gracefully when optional content is absent."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-video-player": {
    "tag": "eon-video-player",
    "category": "media",
    "categoryLabel": "Media",
    "description": "Lightweight video-player hero surface with poster, caption, and duration.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-credit-card": {
    "tag": "eon-credit-card",
    "category": "commerce",
    "categoryLabel": "Commerce",
    "description": "Card-shaped payment and billing summary surface.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-code-snippet": {
    "tag": "eon-code-snippet",
    "category": "developer-tools",
    "categoryLabel": "Developer Tools",
    "description": "Readable code-snippet presentation with language label and helper text.",
    "focus": "Improve visual hierarchy, slot coverage, and data shape so the component can scale past the demo stage.",
    "featureIdeas": [
      "Broaden the data model so content can include meta, actions, media, and secondary lines without prop overload.",
      "Support compact and rich presentation modes so one component can cover dashboard and editorial cases.",
      "Improve authored examples around loading, empty, selection, and responsive states."
    ],
    "variantIdeas": [
      "Support minimal, meta-rich, editorial, and carded looks from the same core data model.",
      "Add avatar, media, badge, and status accents where the content type benefits from stronger hierarchy.",
      "Expose density and emphasis tokens so the component can work in both dashboards and marketing pages."
    ],
    "templateIdeas": [
      "Expose named regions like `media`, `title`, `description`, `meta`, `actions`, `footer` so richer content does not require prop sprawl.",
      "Keep scalar props for the simplest case, but add a small structured object model for richer content, meta, and state.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Handle empty, loading, selected, expanded, and action-rich states without requiring app-specific wrappers.",
      "Support responsive collapse or truncation rules for meta, media, and secondary text.",
      "Make focus and active treatments clear when rows or cards are interactive."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-accordion": {
    "tag": "eon-accordion",
    "category": "disclosure",
    "categoryLabel": "Disclosure",
    "description": "Expandable content sections.",
    "focus": "Make accordion items template-first so each header can carry richer summary, meta, and action regions.",
    "featureIdeas": [
      "Support controlled expanded arrays, lazy panel mounting, and richer per-item summary content.",
      "Add per-item meta and action affordances so accordion rows can summarize live state, not just show a title.",
      "Handle nested, compact, and mobile-safe disclosure patterns with better keyboard narration."
    ],
    "variantIdeas": [
      "Support `plain list`, `card row`, `editorial`, and `dashboard` row presentations backed by the same data shape.",
      "Add density controls so the component can move between comfortable browsing and compact productivity layouts.",
      "Allow accents such as selected rail, drag handle, badge, avatar, or status dot without requiring custom markup."
    ],
    "templateIdeas": [
      "Expose named regions like `header`, `item-start`, `item-body`, `item-end`, `empty`, `loading`, `footer` so richer content does not require prop sprawl.",
      "Accept `items: Array<{ id, title, description, meta, expanded, disabled, body, actions }>` so each row can express summary and content cleanly.",
      "Use object data for repeated content and reserve slots for shell regions plus row subregions so framework wrappers can layer render helpers later."
    ],
    "stateIdeas": [
      "Handle collapsed, expanded, loading-body, disabled, and nested states with clear keyboard narration.",
      "Support keyboard, touch, and screen-reader navigation with consistent focus and active-row behavior.",
      "Expose state summary hooks so apps can show counts, selection chips, or bulk actions."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "Use typed collection data now; add wrapper-level render helpers later instead of encoding rows into strings.",
      "Angular and Vue remain docs-only locally, so treat this as a core-first blueprint rather than claimed parity today."
    ]
  },
  "eon-line-bar-chart": {
    "tag": "eon-line-bar-chart",
    "category": "charts",
    "categoryLabel": "Live Charts",
    "description": "Combined line-and-bar chart surface for trend and volume storytelling.",
    "focus": "Define a serious chart contract with mixed-series composition, interaction layers, and accessible fallback data.",
    "featureIdeas": [
      "Define typed `series`, `categories`, `thresholds`, and `annotations` inputs before expanding visual polish.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Use a typed chart model such as `{ title, categories, series, thresholds, annotations, legend, emptyState }` rather than loose one-off props.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue are still docs-only locally, so this blueprint should become wrapper work only after the chart contract is real in `core`."
    ]
  },
  "eon-pie-chart": {
    "tag": "eon-pie-chart",
    "category": "charts",
    "categoryLabel": "Live Charts",
    "description": "Pie-chart summary surface for categorical proportional breakdowns.",
    "focus": "Make pie-chart suitable for dashboards and storytelling by adding proper data, interaction, and summary structure.",
    "featureIdeas": [
      "Define typed `series`, `categories`, `thresholds`, and `annotations` inputs before expanding visual polish.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Use a typed chart model such as `{ title, categories, series, thresholds, annotations, legend, emptyState }` rather than loose one-off props.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue are still docs-only locally, so this blueprint should become wrapper work only after the chart contract is real in `core`."
    ]
  },
  "eon-radar-chart": {
    "tag": "eon-radar-chart",
    "category": "charts",
    "categoryLabel": "Live Charts",
    "description": "Radar-chart summary surface for multi-axis comparison snapshots.",
    "focus": "Modernize radar-chart into a configurable comparison surface with readable labeling and textual summaries.",
    "featureIdeas": [
      "Define typed `series`, `categories`, `thresholds`, and `annotations` inputs before expanding visual polish.",
      "Support legends, tooltips, thresholds, and textual summaries so dashboards and reports can reuse it safely.",
      "Design empty, loading, compare, and export flows as first-class states."
    ],
    "variantIdeas": [
      "Support dashboard, presentation, and compact-summary modes with the same series contract.",
      "Use tonal, high-contrast, and muted palettes so charts can work in analytical and editorial contexts.",
      "Add comparison overlays, threshold bands, and annotation styles instead of only raw series rendering."
    ],
    "templateIdeas": [
      "Expose named regions like `title`, `toolbar`, `legend`, `empty`, `footer` so richer content does not require prop sprawl.",
      "Use a typed chart model such as `{ title, categories, series, thresholds, annotations, legend, emptyState }` rather than loose one-off props.",
      "Keep the same structural vocabulary across web components, React, Angular, and Vue so wrappers can map to the same contract."
    ],
    "stateIdeas": [
      "Treat loading, empty, no-legend, compare, drilldown, and export states as part of the component contract.",
      "Expose hover, selection, and focus states through typed event detail so wrappers can integrate with surrounding UI.",
      "Provide accessible text summaries and tabular fallbacks when the visual surface is insufficient."
    ],
    "frameworkNotes": [
      "Keep the underlying web-component API stable first so React, Angular, and Vue wrappers all target the same contract.",
      "After the core API settles, add component-specific React event/detail typing instead of keeping this surface generic.",
      "Angular and Vue are still docs-only locally, so this blueprint should become wrapper work only after the chart contract is real in `core`."
    ]
  }
};
