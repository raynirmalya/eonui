import type { ComponentManifestEntry } from './schema';

export const componentLibrary: ComponentManifestEntry[] = [
  {
    "name": "button",
    "tag": "jarvis-button",
    "category": "actions",
    "description": "Primary action trigger.",
    "anatomy": [
      "root",
      "prefix",
      "label",
      "suffix"
    ],
    "props": [
      {
        "name": "variant",
        "type": "\"solid\" | \"outline\" | \"ghost\"",
        "default": "solid",
        "description": "Visual treatment."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Control size."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows loading state and disables interaction."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Clickable button surface."
      },
      {
        "name": "prefix",
        "description": "Leading icon container."
      },
      {
        "name": "suffix",
        "description": "Trailing icon container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-button-bg",
        "description": "Background color."
      },
      {
        "name": "--jarvis-button-color",
        "description": "Foreground color."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Primary",
        "code": "<jarvis-button>Save</jarvis-button>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "container",
        "prefix slot",
        "label",
        "suffix slot"
      ],
      "variants": [
        "solid",
        "outline",
        "ghost"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "hover",
        "focus-visible",
        "active",
        "disabled",
        "loading"
      ],
      "interactions": [
        "Click and keyboard activation trigger the same action.",
        "Loading preserves label alignment and disables repeated submission.",
        "Prefix and suffix content should not shift vertical rhythm across variants."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses Apple-like restraint with softer corners, dense text hierarchy, and luminous primary action emphasis.",
          "Outline and ghost styles stay visually quiet and rely on contrast over heavy chrome."
        ],
        "material": [
          "Uses filled, outlined, and text-button style relationships with higher state-layer emphasis.",
          "Corners are more shaped and surfaces feel flatter than the generic theme."
        ],
        "fluent": [
          "Uses tighter radii, stroke-led surfaces, and subtle acrylic depth.",
          "Hover and focus should feel crisp rather than glossy."
        ]
      },
      "devexpressParity": [
        "Provide clear primary, secondary, and tertiary button hierarchy.",
        "Support loading and disabled states without collapsing content width.",
        "Keep content alignment stable across icon-leading and icon-trailing layouts."
      ]
    }
  },
  {
    "name": "icon-button",
    "tag": "jarvis-icon-button",
    "category": "actions",
    "description": "Compact icon-only button.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Accessible name for assistive technology."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Control size."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a busy state and disables interaction."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base button",
        "icon slot",
        "loading indicator"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "hover",
        "focus-visible",
        "active",
        "disabled",
        "loading"
      ],
      "interactions": [
        "Icon-only action should be equally actionable by pointer and keyboard with identical activation behavior.",
        "Loading state keeps the icon region centered and suppresses interaction noise.",
        "Icon-only labels must remain explicitly announced via `label`."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses compact control proportion with strong contrast and polished micro-motion.",
          "Emphasis comes from spacing and glow rather than heavy chrome."
        ],
        "material": [
          "Uses icon-action proportions with clear focus and active treatment.",
          "Tone and motion cues remain restrained on light and dark surfaces."
        ],
        "fluent": [
          "Uses crisp icon button proportion with direct state-state boundaries.",
          "Keeps geometry simple and predictable in dense action bars."
        ]
      },
      "devexpressParity": [
        "Use as toolbar and command density controls.",
        "Preserve target size and icon rhythm across interactive panels.",
        "Keep loading and disabled states visually distinct without reflow."
      ]
    }
  },
  {
    "name": "input",
    "tag": "jarvis-input",
    "category": "forms",
    "description": "Single-line text entry field.",
    "anatomy": [
      "label",
      "control",
      "help-text"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Accessible label."
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Hint text."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Current value."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables editing."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the field focusable but prevents editing."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Assistive helper text."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Validation error text."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows an inline clear action when the field has a value."
      },
      {
        "name": "showRevealButton",
        "type": "boolean",
        "default": "false",
        "description": "Adds a password reveal toggle when type is password."
      },
      {
        "name": "maxLength",
        "type": "number",
        "description": "Limits entered characters."
      },
      {
        "name": "showCount",
        "type": "boolean",
        "default": "false",
        "description": "Displays the current character count when maxLength is set."
      }
    ],
    "events": [
      {
        "name": "jarvisInput",
        "detail": "{ value: string }",
        "description": "Emits when value changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "field container",
        "input control",
        "assistive text"
      ],
      "variants": [
        "text",
        "email",
        "password",
        "search",
        "clear action",
        "password reveal",
        "character count"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "filled",
        "focus",
        "disabled",
        "read-only",
        "required",
        "invalid",
        "with help text",
        "with error text",
        "cleared",
        "revealed"
      ],
      "interactions": [
        "Input value updates on each keystroke and emits jarvisInput.",
        "Focus state must be visible without overpowering nearby content.",
        "Helper and error text remain attached to the field through described-by relationships.",
        "Inline actions should not collapse the typing area or shift surrounding content."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Feels like Apple form fields with generous padding and understated chrome.",
          "Focus relies on clarity and contrast, not loud outlines."
        ],
        "material": [
          "Uses a filled-field interpretation with a stronger baseline and state-layer feel.",
          "Label and helper rhythm follow Material-style field grouping."
        ],
        "fluent": [
          "Uses stroke-first inputs with restrained elevation and pragmatic density.",
          "Focus emphasizes ring clarity and stroke precision."
        ]
      },
      "devexpressParity": [
        "Expose helper and error text channels directly on the component.",
        "Support common input types and preserve alignment across states.",
        "Make validation and disabled states visually distinct but accessible."
      ]
    }
  },
  {
    "name": "textarea",
    "tag": "jarvis-textarea",
    "category": "forms",
    "description": "Multi-line text entry field.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Accessible label."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Current value."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables editing."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the field focusable but prevents editing."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Assistive helper text."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Validation error text."
      },
      {
        "name": "autoResize",
        "type": "boolean",
        "default": "false",
        "description": "Expands the field height to fit the current content."
      },
      {
        "name": "maxLength",
        "type": "number",
        "description": "Limits entered characters."
      },
      {
        "name": "showCount",
        "type": "boolean",
        "default": "false",
        "description": "Displays the current character count when maxLength is set."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "multiline container",
        "textarea control",
        "assistive text"
      ],
      "variants": [
        "default",
        "auto resize",
        "character count"
      ],
      "sizes": [
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "filled",
        "focus",
        "disabled",
        "read-only",
        "required",
        "invalid",
        "resized"
      ],
      "interactions": [
        "Supports vertical resizing without breaking surrounding layout rhythm.",
        "Validation and helper messaging mirror input field behavior.",
        "Padding and line height should make long-form text comfortable to scan.",
        "Auto-resize should grow smoothly without causing abrupt layout jumps."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft, calm surfaces suited to editorial text entry."
        ],
        "material": [
          "Uses filled-field visual logic adapted to larger multiline surfaces."
        ],
        "fluent": [
          "Uses structured stroke-based framing with pragmatic density."
        ]
      },
      "devexpressParity": [
        "Keep text readability comfortable at multiple heights.",
        "Match input-field semantics and assistive messaging patterns.",
        "Preserve resize affordance without exposing broken corners or spacing."
      ]
    }
  },
  {
    "name": "checkbox",
    "tag": "jarvis-checkbox",
    "category": "forms",
    "description": "Binary choice control.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible label content."
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Checked state."
      },
      {
        "name": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Native checkbox name attribute."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents changes while keeping the checkbox focusable."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the checkbox as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the control as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper copy shown below the checkbox."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error copy shown when invalid."
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "Sets the control to a mixed state."
      },
      {
        "name": "threeState",
        "type": "boolean",
        "default": "false",
        "description": "Cycles unchecked, mixed, and checked states."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Indicator and label size."
      },
      {
        "name": "labelPosition",
        "type": "\"start\" | \"end\"",
        "default": "end",
        "description": "Moves the text before or after the indicator."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ checked: boolean; indeterminate: boolean }",
        "description": "Emits the current checked and mixed-state values after interaction."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper including helper or error copy."
      },
      {
        "name": "control",
        "description": "Interactive checkbox row."
      },
      {
        "name": "indicator",
        "description": "Checkbox indicator box."
      },
      {
        "name": "label",
        "description": "Visible label content."
      },
      {
        "name": "help",
        "description": "Helper text block."
      },
      {
        "name": "error",
        "description": "Error text block."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "input",
        "indicator box",
        "checkmark",
        "label",
        "helper or error text"
      ],
      "variants": [
        "default",
        "three-state",
        "small",
        "large",
        "required",
        "readonly"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "unchecked",
        "checked",
        "mixed",
        "focus",
        "disabled",
        "invalid",
        "read-only"
      ],
      "interactions": [
        "Label and indicator form a single hit target.",
        "Checked mark should animate in without blurring legibility.",
        "Group usage should preserve vertical rhythm when stacked.",
        "Mixed state should remain visually distinct from a checked state.",
        "Helper and error copy should stay visually attached without collapsing control spacing."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses a softer box and calmer motion with Apple-like restraint."
        ],
        "material": [
          "Uses clearer geometric indicator treatment and stronger state layers."
        ],
        "fluent": [
          "Uses sharper strokes and more pragmatic control framing."
        ]
      },
      "devexpressParity": [
        "Preserve a clear indicator at small sizes.",
        "Keep label spacing consistent in dense form groups.",
        "Support invalid and disabled presentation without losing readability.",
        "Readonly, required, and supporting-text patterns should align with the rest of the form system."
      ]
    }
  },
  {
    "name": "radio",
    "tag": "jarvis-radio",
    "category": "forms",
    "description": "Single selection within a set.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible label content."
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Checked state."
      },
      {
        "name": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Native radio group name."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Native radio value."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents changes while keeping the radio focusable."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the radio as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the control as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper copy shown below the radio."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error copy shown when invalid."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ checked: boolean; value: string }",
        "description": "Emits when the radio selection changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper including helper or error copy."
      },
      {
        "name": "control",
        "description": "Interactive radio row."
      },
      {
        "name": "indicator",
        "description": "Radio indicator ring and dot."
      },
      {
        "name": "label",
        "description": "Visible radio label."
      },
      {
        "name": "help",
        "description": "Helper text block."
      },
      {
        "name": "error",
        "description": "Error text block."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "input",
        "indicator ring",
        "selected dot",
        "label",
        "helper or error text"
      ],
      "variants": [
        "default",
        "required",
        "readonly"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "unchecked",
        "checked",
        "focus",
        "disabled",
        "invalid",
        "read-only"
      ],
      "interactions": [
        "Radio dot animation should remain crisp and centered.",
        "Multiple radios in a group should feel visually related.",
        "Indicator and label act as one selection target.",
        "Single radios should still support helper and error copy without feeling disconnected from grouped radios."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft circular controls with restrained emphasis."
        ],
        "material": [
          "Uses bold checked-state clarity and compact control geometry."
        ],
        "fluent": [
          "Uses stroke-led circles and precise focus treatment."
        ]
      },
      "devexpressParity": [
        "Provide strong selected-state clarity in grouped contexts.",
        "Keep focus and disabled states obvious in keyboard flows.",
        "Maintain indicator alignment in mixed-content labels.",
        "Readonly and required patterns should mirror checkbox and switch fields."
      ]
    }
  },
  {
    "name": "switch",
    "tag": "jarvis-switch",
    "category": "forms",
    "description": "Immediate toggle for settings.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible switch label."
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Checked state."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents changes while keeping the switch focusable."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the switch as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the switch as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper copy shown below the switch."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error copy shown when invalid."
      },
      {
        "name": "showText",
        "type": "boolean",
        "default": "false",
        "description": "Shows on/off text inside the track."
      },
      {
        "name": "enabledText",
        "type": "string",
        "default": "On",
        "description": "Track text for the enabled state. Maps to the `on-text` attribute."
      },
      {
        "name": "disabledText",
        "type": "string",
        "default": "Off",
        "description": "Track text for the disabled state. Maps to the `off-text` attribute."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Track and thumb size."
      },
      {
        "name": "labelPosition",
        "type": "\"start\" | \"end\"",
        "default": "end",
        "description": "Moves the text before or after the switch."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ checked: boolean }",
        "description": "Emits the updated switch state."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper including helper or error copy."
      },
      {
        "name": "control",
        "description": "Interactive switch row."
      },
      {
        "name": "label",
        "description": "Visible switch label."
      },
      {
        "name": "thumb",
        "description": "Sliding switch thumb."
      },
      {
        "name": "text",
        "description": "Optional state text inside the track."
      },
      {
        "name": "help",
        "description": "Helper text block."
      },
      {
        "name": "error",
        "description": "Error text block."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "track",
        "thumb",
        "optional state text",
        "helper or error text"
      ],
      "variants": [
        "default",
        "text on track",
        "small",
        "large",
        "required",
        "readonly"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "off",
        "on",
        "focus",
        "disabled",
        "read-only",
        "invalid"
      ],
      "interactions": [
        "Thumb travel should feel smooth and measurable, not jumpy.",
        "Track and thumb both communicate current state.",
        "Switch should be used for immediate settings rather than form submission.",
        "Track text should remain readable without obscuring thumb travel.",
        "Supporting copy should sit below the field without breaking the compact settings rhythm."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses a rounded, touch-friendly toggle with calm motion."
        ],
        "material": [
          "Uses stronger state-layer and track/thumb contrast."
        ],
        "fluent": [
          "Uses pragmatic track proportions and crisp stroke detail."
        ]
      },
      "devexpressParity": [
        "Keep thumb travel and checked-state contrast obvious.",
        "Preserve legibility when rendered next to text-heavy settings labels.",
        "Avoid ambiguous off/on colors in high-density settings surfaces.",
        "Readonly, required, and invalid states should feel like part of the same field family as checkbox and radio."
      ]
    }
  },
  {
    "name": "select",
    "tag": "jarvis-select",
    "category": "forms",
    "description": "Native-backed select with Jarvis styling.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables selection."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Assistive helper text."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Validation error text."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "field container",
        "selected value",
        "chevron",
        "assistive text"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "placeholder/empty",
        "selected",
        "focus",
        "disabled",
        "required",
        "invalid",
        "with help text",
        "with error text"
      ],
      "interactions": [
        "Uses native select semantics with Jarvis theming.",
        "Chevron treatment should remain aligned across themes and densities.",
        "Text truncation should remain readable inside narrower layouts."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer surface treatment and soft field framing."
        ],
        "material": [
          "Uses shaped-field styling with stronger baseline emphasis."
        ],
        "fluent": [
          "Uses stroke-first field styling with restrained elevation."
        ]
      },
      "devexpressParity": [
        "Support common form-field messaging and validation states.",
        "Keep the field legible in narrow responsive layouts.",
        "Preserve native selection behavior while aligning visually with the rest of the system."
      ]
    }
  },
  {
    "name": "badge",
    "tag": "jarvis-badge",
    "category": "feedback",
    "description": "Compact status label.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base wrapper",
        "label slot"
      ],
      "variants": [
        "neutral",
        "success",
        "warning",
        "danger"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting"
      ],
      "interactions": [
        "Badge tone changes should be perceptible and legible in dense table or toolbar contexts.",
        "Text alignment should stay centered and stable when tone updates."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft label chip treatment with restrained color emphasis.",
          "Tone shifts are subtle and elegant."
        ],
        "material": [
          "Uses clear semantic color bands with concise size and shape.",
          "Maintains strong contrast at reduced sizes."
        ],
        "fluent": [
          "Uses compact utility style with clear semantic boundaries.",
          "State colors should remain discoverable without saturating the surface."
        ]
      },
      "devexpressParity": [
        "Use as status and metadata labels with optional icon content.",
        "Keep badges readable in dashboards and inline flows."
      ]
    }
  },
  {
    "name": "alert",
    "tag": "jarvis-alert",
    "category": "feedback",
    "description": "Inline system message.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "tone",
        "type": "\"neutral\" | \"success\" | \"warning\" | \"danger\"",
        "default": "neutral",
        "description": "Visual and semantic tone."
      },
      {
        "name": "heading",
        "type": "string",
        "description": "Short heading text."
      },
      {
        "name": "polite",
        "type": "\"polite\" | \"assertive\"",
        "default": "polite",
        "description": "Live region politeness."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base",
        "heading",
        "content slot"
      ],
      "variants": [
        "neutral",
        "success",
        "warning",
        "danger"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "inline",
        "announcement",
        "assertive",
        "dismissible"
      ],
      "interactions": [
        "Status iconography and message copy should align to the same baseline.",
        "Role should adapt between status and alert per tone/polite combinations.",
        "Heading and content spacing must remain stable when heading is omitted."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calm tone-led messaging with elegant hierarchy.",
          "Emphasis is conveyed through subtle border or glow accents."
        ],
        "material": [
          "Uses clearer tone contrast and structured message rhythm.",
          "Maintains concise alert density at card level."
        ],
        "fluent": [
          "Uses direct semantic cues and strong text readability.",
          "Applies disciplined spacing over decorative affordances."
        ]
      },
      "devexpressParity": [
        "Use in forms, validation blocks, and process guidance.",
        "Keep alert copy concise and discoverable for both screen readers and quick scanning."
      ]
    }
  },
  {
    "name": "avatar",
    "tag": "jarvis-avatar",
    "category": "data-display",
    "description": "User image or initials fallback.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base avatar surface",
        "image",
        "fallback initials"
      ],
      "variants": [
        "sm",
        "md",
        "lg"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "with-image",
        "with-fallback",
        "loading"
      ],
      "interactions": [
        "When `src` is valid, render image with rounded crop and fallback to initials when missing.",
        "Fallback initials should remain centered and stable in width and height.",
        "Name changes should update fallback text without layout shift."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft personality with balanced edge radius.",
          "Visual focus remains subtle and consistent with people surfaces."
        ],
        "material": [
          "Uses predictable photo circle proportions and compact profile tokens.",
          "Fallback initials remain readable at all scale levels."
        ],
        "fluent": [
          "Uses clear person-identity framing with deterministic geometry.",
          "Image and fallback states share the same alignment model."
        ]
      },
      "devexpressParity": [
        "Use for identity surfaces and participant lists.",
        "Keep fallback and photo states visually interchangeable in grids."
      ]
    }
  },
  {
    "name": "breadcrumb",
    "tag": "jarvis-breadcrumb",
    "category": "navigation",
    "description": "Hierarchical location trail.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Comma-separated breadcrumb labels."
      },
      {
        "name": "separator",
        "type": "string",
        "default": "/",
        "description": "Separator between breadcrumb items."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Breadcrumb nav container."
      },
      {
        "name": "item",
        "description": "Individual breadcrumb label."
      },
      {
        "name": "separator",
        "description": "Separator glyph between items."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "nav container",
        "item labels",
        "separator"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "default",
        "overflowing labels"
      ],
      "interactions": [
        "Breadcrumb items should preserve a readable trail even with long labels.",
        "Separators support theme personality without overpowering hierarchy."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft typography-first navigation with understated separators."
        ],
        "material": [
          "Uses clearer path segmentation and structured rhythm."
        ],
        "fluent": [
          "Uses pragmatic separators and crisp text spacing."
        ]
      },
      "devexpressParity": [
        "Support compact path trails in app headers and content shells.",
        "Keep separators subtle and avoid visual clutter."
      ]
    }
  },
  {
    "name": "card",
    "tag": "jarvis-card",
    "category": "layout",
    "description": "Composable surfaced container.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "surface",
        "header",
        "body",
        "footer"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "hovered",
        "interactive",
        "elevated"
      ],
      "interactions": [
        "Cards should support content grouping without becoming visually noisy.",
        "Hover lift is optional and should never disrupt text readability.",
        "Header, body, and footer spacing stays consistent across layouts."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses premium soft-depth surfaces with generous spacing."
        ],
        "material": [
          "Uses shaped surfaces with flatter elevation logic."
        ],
        "fluent": [
          "Uses acrylic-like surfaces, precise corners, and subtle stroke depth."
        ]
      },
      "devexpressParity": [
        "Make hierarchy readable through spacing and typography before borders.",
        "Support compact dashboard cards and richer content cards with the same anatomy.",
        "Avoid over-heavy shadowing that collapses the theme distinction."
      ]
    }
  },
  {
    "name": "chip",
    "tag": "jarvis-chip",
    "category": "forms",
    "description": "Compact selected value or filter token.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "removable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a remove affordance."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Chip container."
      },
      {
        "name": "remove-button",
        "description": "Optional remove action."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "chip container",
        "label",
        "remove affordance"
      ],
      "variants": [
        "default",
        "removable"
      ],
      "sizes": [
        "sm",
        "md"
      ],
      "states": [
        "resting",
        "hover",
        "focus",
        "removable"
      ],
      "interactions": [
        "Chips should stay compact without collapsing text readability.",
        "Remove affordance appears as a secondary action, not a competing primary control."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses rounded filter-pill styling with soft contrast."
        ],
        "material": [
          "Uses clearer container shape and stronger state-layer emphasis."
        ],
        "fluent": [
          "Uses pragmatic spacing and crisp outline-led surfaces."
        ]
      },
      "devexpressParity": [
        "Support compact filter tokens and selected-value pills.",
        "Keep remove affordance discoverable without inflating chip height."
      ]
    }
  },
  {
    "name": "divider",
    "tag": "jarvis-divider",
    "category": "layout",
    "description": "Visual or semantic separation line.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base separator"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "horizontal",
        "vertical"
      ],
      "states": [
        "default"
      ],
      "interactions": [
        "Divider should remain unobtrusive and avoid visual weight unless acting as section separator.",
        "Orientation changes should maintain 1px rhythm consistency."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses thin, calm separators to preserve visual calm.",
          "Soft contrast avoids breaking premium whitespace."
        ],
        "material": [
          "Uses practical contrast with clear section grouping.",
          "Allows denser grouping in forms and panels."
        ],
        "fluent": [
          "Uses crisp line work and predictable geometry.",
          "Preserves rhythm when placed repeatedly in long lists."
        ]
      },
      "devexpressParity": [
        "Use between high-level and low-level sections without changing component intent.",
        "Keep divider density low enough to avoid visual noise."
      ]
    }
  },
  {
    "name": "empty-state",
    "tag": "jarvis-empty-state",
    "category": "feedback",
    "description": "Guided placeholder when no data is available.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "visual slot",
        "heading",
        "description",
        "action slot"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "with-visual",
        "with-actions",
        "loaded"
      ],
      "interactions": [
        "Preserve centered alignment for heading, description, and actions.",
        "Keep copy concise and supportive, allowing optional visual slot content.",
        "Action region should remain visible while retaining calm focus hierarchy."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses white-space-rich, calm onboarding state surfaces.",
          "Visuals remain editorial and understated."
        ],
        "material": [
          "Uses high-clarity helper messaging patterns.",
          "Supports clear recovery call-to-action."
        ],
        "fluent": [
          "Uses clear content lanes and predictable stack rhythm.",
          "Focus and action flows remain legible in dense pages."
        ]
      },
      "devexpressParity": [
        "Use for no-data conditions with explicit recovery guidance.",
        "Support quick action insertion without breaking visual calm."
      ]
    }
  },
  {
    "name": "list",
    "tag": "jarvis-list",
    "category": "data-display",
    "description": "Simple ordered, searchable, or selectable content list.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "ordered",
        "type": "boolean",
        "default": "false",
        "description": "Renders ordered numbering for slot-based or data-driven items."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated list items. Use `Group/Item~Description` for grouped rows with supporting text."
      },
      {
        "name": "selectionMode",
        "type": "\"none\" | \"single\" | \"multiple\"",
        "default": "none",
        "description": "Controls interactive row selection."
      },
      {
        "name": "searchEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Shows a client-side search field for data-driven items."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls whether filtering matches anywhere, only at the start, or by exact value."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "Search list",
        "description": "Placeholder text for the search field."
      },
      {
        "name": "showToolbar",
        "type": "boolean",
        "default": "false",
        "description": "Shows bulk selection actions above interactive lists."
      },
      {
        "name": "showSelectAll",
        "type": "boolean",
        "default": "false",
        "description": "Shows a visible “select all” action in the toolbar when multiple selection is enabled."
      },
      {
        "name": "showStatus",
        "type": "boolean",
        "default": "false",
        "description": "Shows visible-row and selected-row counts below the toolbar."
      },
      {
        "name": "selectAllText",
        "type": "string",
        "default": "Select all",
        "description": "Label used for the bulk-select action."
      },
      {
        "name": "clearSelectionText",
        "type": "string",
        "default": "Clear",
        "description": "Label used for the clear-selection action."
      },
      {
        "name": "showSelectionControls",
        "type": "boolean",
        "default": "false",
        "description": "Shows radio or checkbox controls beside interactive rows."
      },
      {
        "name": "selected",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated selected values for data-driven lists."
      },
      {
        "name": "height",
        "type": "string",
        "description": "Optional max-height applied to the scrollable list viewport."
      },
      {
        "name": "emptyStateText",
        "type": "string",
        "default": "No items match this view.",
        "description": "Copy shown when filtering leaves no visible rows."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "List",
        "description": "Accessible label applied to the list root when interactive semantics are enabled."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits the active or selected values when rows are chosen."
      }
    ],
    "methods": [
      {
        "name": "selectAll()",
        "description": "Selects every currently visible row when multiple selection is enabled."
      },
      {
        "name": "clearSelection()",
        "description": "Clears the current list selection."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "List shell."
      },
      {
        "name": "toolbar",
        "description": "Action row for selection helpers."
      },
      {
        "name": "status",
        "description": "Visible and selected count summary."
      },
      {
        "name": "search",
        "description": "Search field for data-driven lists."
      },
      {
        "name": "group",
        "description": "Grouped item section."
      },
      {
        "name": "group-label",
        "description": "Group heading label."
      },
      {
        "name": "item",
        "description": "Interactive row button."
      },
      {
        "name": "empty",
        "description": "Empty state container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Uses listbox and option semantics when interactive selection is enabled.",
      "Keeps slot-based lists semantic by rendering native ul or ol elements."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Selectable grouped list",
        "code": "<jarvis-list items=\"Hamburg/Hamburg Suites~20099, An Der Alster 82; Hamburg/The Park Hotel~20537, Borstelmannsweg 82; Honolulu/Honolulu Inn~96801, 822 Mauna Loa Rd\" selection-mode=\"single\" search-enabled></jarvis-list>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "toolbar",
        "search field",
        "status row",
        "group heading",
        "row control",
        "title",
        "supporting text"
      ],
      "variants": [
        "slot content",
        "searchable list",
        "single-select",
        "multi-select",
        "toolbar bulk actions",
        "status summary"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "active",
        "selected",
        "filtered empty",
        "bulk-selected"
      ],
      "interactions": [
        "Lists should support both authored slot content and data-driven row rendering without changing the visual family.",
        "Filtering should preserve group headings only when at least one child row remains visible.",
        "Bulk actions should apply only to rows still visible after filtering so search-first workflows stay predictable."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer grouped cards with calmer list rhythm."
        ],
        "material": [
          "Uses denser row grouping and stronger selection surfaces."
        ],
        "fluent": [
          "Uses crisp explorer-like grouping and efficient row density."
        ]
      },
      "devexpressParity": [
        "Support hotel pickers, task lists, product catalogs, and simple action queues.",
        "Keep list search, grouping, selection, and bulk actions coherent without promoting the control into a full grid."
      ]
    }
  },
  {
    "name": "pagination",
    "tag": "jarvis-pagination",
    "category": "navigation",
    "description": "Paged navigation control.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "page",
        "type": "number",
        "default": "1",
        "description": "Current page."
      },
      {
        "name": "total",
        "type": "number",
        "default": "1",
        "description": "Total number of pages."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables page navigation controls."
      }
    ],
    "events": [
      {
        "name": "jarvisPageChange",
        "detail": "{ page: number }",
        "description": "Emits when requested page changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Pagination nav container."
      },
      {
        "name": "previous",
        "description": "Previous page button."
      },
      {
        "name": "status",
        "description": "Current page status text."
      },
      {
        "name": "next",
        "description": "Next page button."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "nav container",
        "previous control",
        "status",
        "next control"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "first page",
        "middle page",
        "last page",
        "disabled"
      ],
      "interactions": [
        "Previous and next controls clamp to the available page range.",
        "Status text should remain readable and stable as page values change."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer nav controls with softer motion and spacing."
        ],
        "material": [
          "Uses clearer state containers and stronger action emphasis."
        ],
        "fluent": [
          "Uses practical command-bar-like controls and crisp borders."
        ]
      },
      "devexpressParity": [
        "Support straightforward paging flows for lists and tables.",
        "Keep previous/next affordances obvious and disabled states clear."
      ]
    }
  },
  {
    "name": "tabs",
    "tag": "jarvis-tabs",
    "category": "navigation",
    "description": "Tabbed content switcher.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Supports Arrow Left, Arrow Right, Home, and End keyboard navigation.",
      "Uses tablist, tab, and tabpanel semantics."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "tablist container",
        "tab items",
        "active indicator",
        "tabpanel"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "active",
        "focus",
        "disabled if implemented"
      ],
      "interactions": [
        "Arrow key navigation should move between tabs without shifting layout unexpectedly.",
        "Active indicator motion should be fluid but calm.",
        "Tab label sizing should remain balanced across short and long labels."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer segmented control styling with a luminous active state."
        ],
        "material": [
          "Uses clearer active-state emphasis and shaped tab surfaces."
        ],
        "fluent": [
          "Uses pragmatic tab framing and crisp active indication."
        ]
      },
      "devexpressParity": [
        "Support segmented tab bars and content panels with stable spacing.",
        "Keep active state obvious in both pointer and keyboard usage.",
        "Preserve strong readability in crowded label sets."
      ]
    }
  },
  {
    "name": "skeleton",
    "tag": "jarvis-skeleton",
    "category": "feedback",
    "description": "Loading placeholder block.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base placeholder"
      ],
      "variants": [
        "rectangular",
        "text",
        "avatar"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "loading",
        "finished"
      ],
      "interactions": [
        "Skeleton blocks should reserve final content space to avoid layout shifts.",
        "Shimmer and pulse should remain low-contrast and calm.",
        "Width, height, and radius changes should stay predictable."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft loading motion with controlled shimmer width.",
          "Treats placeholders as temporary layout scaffolding."
        ],
        "material": [
          "Uses practical shimmer tracks with subtle depth.",
          "Supports compact dashboard loading states."
        ],
        "fluent": [
          "Uses restrained animated placeholder strips.",
          "Keeps movement gentle and non-jarring."
        ]
      },
      "devexpressParity": [
        "Use where content is asynchronous or computed.",
        "Avoid using skeletons as permanent decorative blocks."
      ]
    }
  },
  {
    "name": "toast",
    "tag": "jarvis-toast",
    "category": "feedback",
    "description": "Transient global notification surface.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "visible",
        "type": "boolean",
        "default": "true",
        "description": "Controls whether the toast is rendered."
      },
      {
        "name": "tone",
        "type": "\"neutral\" | \"success\" | \"warning\" | \"danger\"",
        "default": "neutral",
        "description": "Visual and semantic tone."
      },
      {
        "name": "heading",
        "type": "string",
        "description": "Short heading text."
      },
      {
        "name": "polite",
        "type": "\"polite\" | \"assertive\"",
        "default": "polite",
        "description": "Live region politeness."
      },
      {
        "name": "position",
        "type": "\"inline\" | \"top-left\" | \"top-center\" | \"top-right\" | \"bottom-left\" | \"bottom-center\" | \"bottom-right\"",
        "default": "inline",
        "description": "Placement preset."
      },
      {
        "name": "duration",
        "type": "number",
        "default": "0",
        "description": "Auto-hide delay in milliseconds. Set `0` to keep the toast visible."
      },
      {
        "name": "showCloseButton",
        "type": "boolean",
        "default": "false",
        "description": "Displays a close button."
      },
      {
        "name": "showIcon",
        "type": "boolean",
        "default": "true",
        "description": "Shows the tone or custom icon."
      },
      {
        "name": "icon",
        "type": "string",
        "description": "Custom icon glyph rendered before the content."
      },
      {
        "name": "showProgressBar",
        "type": "boolean",
        "default": "false",
        "description": "Displays an inline progress bar while auto-hide is active."
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "default": "false",
        "description": "Pauses auto-hide timing when the pointer hovers the toast."
      },
      {
        "name": "stackIndex",
        "type": "number",
        "default": "0",
        "description": "Offsets stacked positioned toasts."
      },
      {
        "name": "dismissLabel",
        "type": "string",
        "default": "Close notification",
        "description": "Accessible close-button label."
      },
      {
        "name": "showTimestamp",
        "type": "boolean",
        "default": "false",
        "description": "Shows a compact time label beside the heading."
      },
      {
        "name": "timestamp",
        "type": "string",
        "description": "Overrides the timestamp label instead of using the current local time."
      },
      {
        "name": "density",
        "type": "\"comfortable\" | \"compact\"",
        "default": "comfortable",
        "description": "Adjusts the spacing of the toast shell and actions."
      }
    ],
    "events": [
      {
        "name": "jarvisShow",
        "detail": "void",
        "description": "Emits when the toast becomes visible."
      },
      {
        "name": "jarvisHide",
        "detail": "{ reason: \"dismiss\" | \"programmatic\" | \"timeout\" }",
        "description": "Emits when the toast hides and reports why."
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "Shows the toast."
      },
      {
        "name": "hide",
        "description": "Hides the toast."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Toast shell."
      },
      {
        "name": "icon",
        "description": "Leading tone or custom icon."
      },
      {
        "name": "content",
        "description": "Heading and body copy container."
      },
      {
        "name": "timestamp",
        "description": "Compact time label beside the heading."
      },
      {
        "name": "actions",
        "description": "Inline action area."
      },
      {
        "name": "close-button",
        "description": "Dismiss action button."
      },
      {
        "name": "progress-bar",
        "description": "Auto-hide progress indicator."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Action toast with progress",
        "code": "<jarvis-toast tone=\"success\" heading=\"Saved\" duration=\"5000\" show-progress-bar pause-on-hover show-close-button show-timestamp density=\"compact\"><span slot=\"actions\"><jarvis-button size=\"sm\" variant=\"ghost\">Undo</jarvis-button></span>Workspace changes are live.</jarvis-toast>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "accent rail",
        "icon",
        "content block",
        "action row",
        "dismiss button",
        "progress bar"
      ],
      "variants": [
        "inline",
        "auto-hide",
        "dismissible",
        "stacked global",
        "compact timestamped"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "visible",
        "hidden",
        "hover paused",
        "assertive",
        "timed out"
      ],
      "interactions": [
        "Auto-hide should feel predictable and pause cleanly when pauseOnHover is enabled.",
        "Global stacks should preserve legibility while offsetting multiple notifications."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses premium glass-dark surfaces with restrained accent rails."
        ],
        "material": [
          "Uses clearer state color emphasis and practical action separation."
        ],
        "fluent": [
          "Uses compact utility toast framing with crisp edge highlights."
        ]
      },
      "devexpressParity": [
        "Cover inline notifications, stacked global toasts, and undo-style action surfaces.",
        "Match the DevExpress toast family for tones, timed dismissal, and positioning presets."
      ]
    }
  },
  {
    "name": "toolbar",
    "tag": "jarvis-toolbar",
    "category": "layout",
    "description": "Action grouping bar for dense controls.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "density",
        "type": "\"comfortable\" | \"compact\"",
        "default": "comfortable",
        "description": "Controls the spacing rhythm between actions."
      },
      {
        "name": "sticky",
        "type": "boolean",
        "default": "false",
        "description": "Pins the toolbar while surrounding content scrolls."
      },
      {
        "name": "dividers",
        "type": "boolean",
        "default": "false",
        "description": "Shows separators between the start, center, and end regions."
      },
      {
        "name": "justify",
        "type": "\"space-between\" | \"start\" | \"center\" | \"end\"",
        "default": "space-between",
        "description": "Controls how the toolbar regions align inside the available width."
      },
      {
        "name": "wrap",
        "type": "boolean",
        "default": "true",
        "description": "Allows the toolbar to wrap onto multiple rows on narrow layouts."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "Toolbar",
        "description": "Accessible label applied to the toolbar container."
      },
      {
        "name": "ariaDescription",
        "type": "string",
        "default": "\"\"",
        "description": "Optional accessible description announced with the toolbar label."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "start",
        "description": "Leading action region."
      },
      {
        "name": "default",
        "description": "Central content region."
      },
      {
        "name": "end",
        "description": "Trailing action region."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Toolbar container."
      },
      {
        "name": "start",
        "description": "Start slot wrapper."
      },
      {
        "name": "center",
        "description": "Center slot wrapper."
      },
      {
        "name": "end",
        "description": "End slot wrapper."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "toolbar container",
        "start region",
        "center region",
        "end region",
        "optional dividers"
      ],
      "variants": [
        "default",
        "sticky utility bar",
        "divided groups",
        "aligned regions",
        "nowrap command bar"
      ],
      "sizes": [
        "md",
        "compact"
      ],
      "states": [
        "default",
        "dense actions",
        "compact",
        "sticky",
        "wrapped",
        "nowrap"
      ],
      "interactions": [
        "Start, center, and end regions should preserve alignment under wrapping pressure.",
        "Dense action sets must remain scannable without collapsing spacing.",
        "Alignment changes should not break keyboard order or accessible naming."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses quiet premium container treatment and soft spacing."
        ],
        "material": [
          "Uses clearer grouping and flatter command-surface styling."
        ],
        "fluent": [
          "Uses command-bar inspired spacing and structured outlines."
        ]
      },
      "devexpressParity": [
        "Support header, table, and panel action grouping.",
        "Keep grouped actions readable in responsive layouts and compact command bars."
      ]
    }
  },
  {
    "name": "accordion",
    "tag": "jarvis-accordion",
    "category": "disclosure",
    "description": "Expandable content sections.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "summary",
        "type": "string",
        "default": "Details",
        "description": "Fallback summary text when a single disclosure item is rendered."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated accordion items using \"Summary|Content|flags\" entries."
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controls the fallback single-panel disclosure state."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Current open item value or semicolon-separated values when multiple panels are enabled."
      },
      {
        "name": "multiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows multiple panels to stay expanded at once."
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "default": "true",
        "description": "Allows an already-open panel to collapse."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables user interaction for the entire accordion."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents changes while preserving the current expansion state."
      },
      {
        "name": "animationDuration",
        "type": "number",
        "default": "220",
        "description": "Panel transition duration in milliseconds."
      }
    ],
    "events": [
      {
        "name": "jarvisToggle",
        "detail": "{ value: string; open: boolean }",
        "description": "Emits whenever a panel is toggled."
      },
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits the full set of expanded values after a change."
      }
    ],
    "methods": [
      {
        "name": "expandAll()",
        "description": "Expands every item when multiple panels are allowed, or the first item in single mode."
      },
      {
        "name": "collapseAll()",
        "description": "Collapses all items when the accordion is collapsible."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Accordion container."
      },
      {
        "name": "item",
        "description": "Individual accordion section wrapper."
      },
      {
        "name": "trigger",
        "description": "Expand or collapse button."
      },
      {
        "name": "summary",
        "description": "Summary label inside the trigger row."
      },
      {
        "name": "chevron",
        "description": "Disclosure indicator."
      },
      {
        "name": "panel",
        "description": "Expandable content panel."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Trigger exposes expanded state and controls the associated panel.",
      "Arrow keys, Home, End, Enter, and Space support predictable keyboard traversal in multi-item mode.",
      "Content remains keyboard reachable when expanded."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Grouped settings disclosure",
        "code": "<jarvis-accordion items=\"Workspace defaults|Control the base workspace experience.|; Notifications|Route alerts by priority, owner, and working hours.|; Escalations|Choose who gets paged after hours.|\" value=\"Workspace defaults\"></jarvis-accordion>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "container",
        "section item",
        "trigger row",
        "summary label",
        "disclosure indicator",
        "content panel"
      ],
      "variants": [
        "single disclosure",
        "stacked disclosures",
        "readonly"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "collapsed",
        "expanded",
        "focus",
        "disabled",
        "readonly"
      ],
      "interactions": [
        "Stacked items should preserve rhythm so multiple sections feel like one intentional disclosure system.",
        "Trigger rows should support Arrow key navigation without trapping focus inside expanded content.",
        "Panel reveal should feel smooth and should not jolt surrounding layout."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses premium disclosure surfaces with quieter chrome and softer motion."
        ],
        "material": [
          "Uses clearer sectional separation and stronger active-state emphasis."
        ],
        "fluent": [
          "Uses precise stroke-led disclosure rows with pragmatic spacing."
        ]
      },
      "devexpressParity": [
        "Support FAQ, settings, configuration, and secondary-detail disclosures.",
        "Mirror DevExpress-style accordion expectations with configurable multi-open and collapsible behavior.",
        "Keep header rhythm and panel spacing consistent across stacked accordions."
      ]
    }
  },
  {
    "name": "combobox",
    "tag": "jarvis-combobox",
    "category": "forms",
    "description": "Filterable single-select text input with suggestion list.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible field label."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Select an option",
        "description": "Placeholder when empty."
      },
      {
        "name": "options",
        "type": "string",
        "description": "Semicolon-separated options or grouped paths."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No matching items\"",
        "description": "Custom empty-state copy when no matches are found."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Selected value."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents changes while preserving the current value."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "opened",
        "type": "boolean",
        "default": "false",
        "description": "Current popup state."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "true",
        "description": "Opens the list when the field is clicked."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear affordance when a value exists."
      },
      {
        "name": "showDropDownButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the chevron affordance inside the field."
      },
      {
        "name": "acceptCustomValue",
        "type": "boolean",
        "default": "false",
        "description": "Allows unmatched text to be committed as a custom option."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls how the current input matches options."
      },
      {
        "name": "minSearchLength",
        "type": "number",
        "default": "0",
        "description": "Minimum characters required before filtering."
      },
      {
        "name": "showDataBeforeSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows options before the search threshold is met."
      },
      {
        "name": "searchExpr",
        "type": "string",
        "default": "\"\"",
        "description": "Optional alternate field used for matching."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Assistive helper text."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Validation error text."
      }
    ],
    "events": [
      {
        "name": "jarvisInput",
        "detail": "{ value: string }",
        "description": "Emits as the user types into the field."
      },
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits when an option or committed custom value is selected."
      },
      {
        "name": "jarvisOpened",
        "detail": "void",
        "description": "Emits when the popup opens."
      },
      {
        "name": "jarvisClosed",
        "detail": "void",
        "description": "Emits when the popup closes."
      },
      {
        "name": "jarvisCustomItemCreate",
        "detail": "{ value: string }",
        "description": "Emits when custom text is committed as a value."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field container."
      },
      {
        "name": "control",
        "description": "Text input."
      },
      {
        "name": "clear",
        "description": "Clear button."
      },
      {
        "name": "toggle",
        "description": "Open/close trigger."
      },
      {
        "name": "listbox",
        "description": "Options overlay."
      },
      {
        "name": "option",
        "description": "Selectable option."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Supports Arrow Up, Arrow Down, Enter, and Escape keyboard interactions.",
      "Uses combobox, listbox, option, and active descendant semantics.",
      "Dismisses the popup on outside interaction or focus exit."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Searchable combobox",
        "code": "<jarvis-combobox label=\"Owner\" placeholder=\"Select or type an owner\" options=\"Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris\" show-clear-button search-mode=\"startsWith\" value=\"Engineering/Kevin Carter\"></jarvis-combobox>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "input field",
        "clear action",
        "dropdown action",
        "suggestion panel",
        "option row"
      ],
      "variants": [
        "default",
        "clear button",
        "custom value",
        "exact match search"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "open",
        "selected",
        "empty",
        "disabled",
        "readonly",
        "custom value ready"
      ],
      "interactions": [
        "Typing should filter the suggestion list immediately without losing the currently selected display value.",
        "Closing the popup should either restore the selected label, commit the matching option, or create a custom value when allowed.",
        "Keyboard navigation should cover Arrow keys, Home, End, Enter, Escape, and Tab predictably."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer search-field chrome with calmer floating depth."
        ],
        "material": [
          "Uses stronger active-state emphasis and more assertive field framing."
        ],
        "fluent": [
          "Uses crisp utility styling with practical option density."
        ]
      },
      "devexpressParity": [
        "Support searchable owner pickers, product selectors, and hybrid type-or-select flows.",
        "Match the DevExpress-style combobox feel for filterable single selection with optional custom entry.",
        "Cover clear button, no-data guidance, search modes, and popup open-state control."
      ]
    }
  },
  {
    "name": "drawer",
    "tag": "jarvis-drawer",
    "category": "overlays",
    "description": "Edge-anchored overlay panel for navigation or details.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controls visibility."
      },
      {
        "name": "side",
        "type": "\"left\" | \"right\"",
        "default": "right",
        "description": "Anchoring edge."
      },
      {
        "name": "label",
        "type": "string",
        "default": "Drawer",
        "description": "Accessible label for assistive technology."
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "show()",
        "description": "Opens the drawer."
      },
      {
        "name": "hide()",
        "description": "Closes the drawer."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Drawer content body."
      },
      {
        "name": "header",
        "description": "Drawer header."
      },
      {
        "name": "footer",
        "description": "Drawer footer actions."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Returns focus to the invoking element when closed.",
      "Uses dialog semantics for assistive technology.",
      "Receives initial focus when opened."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "overlay",
        "panel",
        "header",
        "body",
        "footer"
      ],
      "variants": [
        "left",
        "right"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "opening",
        "open",
        "closing"
      ],
      "interactions": [
        "Opening should reveal panel movement without disrupting background task context.",
        "Focus must be trapped inside the panel while open.",
        "Closing returns focus to the trigger context.",
        "Backdrop click and escape close are mandatory dismissal channels."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses smooth panel motion and soft scrim.",
          "Anchoring should feel anchored but lightweight."
        ],
        "material": [
          "Uses practical modal transition and clear side-panel hierarchy.",
          "Emphasizes state and dismissal clarity."
        ],
        "fluent": [
          "Uses direct motion and restrained panel framing.",
          "Supports predictable panel width and side-specific framing."
        ]
      },
      "devexpressParity": [
        "Use for off-canvas navigation, details, and workflow drawers.",
        "Match DevExpress-style side panels with predictable close behavior."
      ]
    }
  },
  {
    "name": "dropdown-menu",
    "tag": "jarvis-dropdown-menu",
    "category": "navigation",
    "description": "Menu of contextual actions anchored to a trigger.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "Open menu",
        "description": "Trigger button label."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated action items using \"Group/Label|value|flags|description\" entries."
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controls whether the menu is visible."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Currently selected menu item value."
      },
      {
        "name": "triggerMode",
        "type": "\"click\" | \"hover\"",
        "default": "click",
        "description": "How the trigger opens the menu."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Closes the menu when interaction moves outside the component."
      },
      {
        "name": "placement",
        "type": "\"bottom-start\" | \"bottom-end\" | \"top-start\" | \"top-end\"",
        "default": "bottom-start",
        "description": "Preferred anchor placement for the floating panel."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No actions available\"",
        "description": "Message shown when there are no menu items to render."
      },
      {
        "name": "showSelection",
        "type": "boolean",
        "default": "false",
        "description": "Shows selected-state metadata and radio-style semantics for the active item."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ value: string; label: string }",
        "description": "Emits when a menu item is selected."
      },
      {
        "name": "jarvisOpenChange",
        "detail": "{ open: boolean }",
        "description": "Emits whenever the menu opens or closes."
      }
    ],
    "methods": [
      {
        "name": "show()",
        "description": "Opens the menu when items are available."
      },
      {
        "name": "hide()",
        "description": "Closes the menu."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root menu container."
      },
      {
        "name": "trigger",
        "description": "Menu trigger button."
      },
      {
        "name": "panel",
        "description": "Floating menu panel."
      },
      {
        "name": "section",
        "description": "Grouped section wrapper."
      },
      {
        "name": "section-label",
        "description": "Optional section heading."
      },
      {
        "name": "item",
        "description": "Selectable menu item."
      },
      {
        "name": "empty-state",
        "description": "Fallback empty-state copy when no actions are available."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Supports Arrow Up, Arrow Down, Enter, and Escape keyboard interactions.",
      "Uses menu and menuitem roles for contextual action lists.",
      "Dismisses the popup on outside interaction."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Grouped command menu",
        "code": "<jarvis-dropdown-menu label=\"More actions\" items=\"Workspace/Edit|edit||Update the current workspace details.; Workspace/Duplicate|duplicate||Create a copy for experimentation.; Reviews/Archive|archive||Move this workspace to the archive.; Reviews/Delete|delete|danger|This action cannot be undone.\" show-selection value=\"duplicate\"></jarvis-dropdown-menu>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "trigger button",
        "floating panel",
        "section label",
        "action row",
        "selection meta"
      ],
      "variants": [
        "grouped actions",
        "selection state",
        "hover trigger"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "closed",
        "open",
        "active item",
        "selected item",
        "keyboard navigation",
        "empty"
      ],
      "interactions": [
        "Arrow keys move the active item predictably through grouped menu items without skipping section context.",
        "Selection closes the panel and emits the chosen value and label.",
        "Outside interaction dismisses the panel without trapping focus."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses quieter contextual surfaces and softer floating depth."
        ],
        "material": [
          "Uses clearer menu container separation and stronger item hover treatment."
        ],
        "fluent": [
          "Uses crisp command-like menu rows with pragmatic spacing."
        ]
      },
      "devexpressParity": [
        "Support contextual action menus anchored to a clear trigger.",
        "Match DevExpress-style command menu expectations with grouping, danger states, placement control, and open-state methods.",
        "Keep pointer and keyboard selection parity intact."
      ]
    }
  },
  {
    "name": "popover",
    "tag": "jarvis-popover",
    "category": "overlays",
    "description": "Anchored overlay for lightweight contextual content.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controls whether the popover is visible."
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "default": "Toggle popover",
        "description": "Fallback trigger label."
      },
      {
        "name": "placement",
        "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
        "default": "bottom",
        "description": "Preferred panel placement."
      },
      {
        "name": "label",
        "type": "string",
        "default": "Popover",
        "description": "Accessible label for assistive technology."
      },
      {
        "name": "heading",
        "type": "string",
        "description": "Optional popover heading."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Supporting description shown in the header."
      },
      {
        "name": "triggerMode",
        "type": "\"click\" | \"hover\"",
        "default": "click",
        "description": "How the popover opens from the trigger."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Dismisses the popover when interaction moves outside the component."
      },
      {
        "name": "showCloseButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows a dismiss button inside the popover header."
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "default": "true",
        "description": "Shows an anchored directional arrow."
      },
      {
        "name": "offset",
        "type": "number",
        "default": "8",
        "description": "Spacing between the trigger and the panel in pixels."
      },
      {
        "name": "width",
        "type": "string",
        "description": "Optional explicit panel width."
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "show()",
        "description": "Opens the popover."
      },
      {
        "name": "hide()",
        "description": "Closes the popover."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Popover content."
      },
      {
        "name": "trigger",
        "description": "Custom trigger content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Popover container."
      },
      {
        "name": "trigger",
        "description": "Trigger button."
      },
      {
        "name": "panel",
        "description": "Floating content panel."
      },
      {
        "name": "header",
        "description": "Optional header with heading and description."
      },
      {
        "name": "body",
        "description": "Main content region."
      },
      {
        "name": "dismiss-button",
        "description": "Optional dismiss action."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Dismisses when interaction moves outside the popover surface.",
      "Escape closes the panel and focus returns to the trigger naturally."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Anchored details popover",
        "code": "<jarvis-popover trigger-label=\"Review details\" heading=\"Workspace summary\" description=\"Quick context for reviewers\" width=\"18rem\"><jarvis-stack><p>Use a popover when people need lightweight context without leaving the current surface.</p><jarvis-button variant=\"outline\">Open workspace</jarvis-button></jarvis-stack></jarvis-popover>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "trigger",
        "anchored panel",
        "header",
        "description",
        "content region",
        "dismiss action"
      ],
      "variants": [
        "anchored details",
        "hover hint",
        "side placement"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "closed",
        "open",
        "hover-triggered",
        "dismissible"
      ],
      "interactions": [
        "Trigger toggles a lightweight contextual panel that should feel anchored rather than detached.",
        "Header, description, and dismiss controls should stay balanced even in compact widths.",
        "Panel placement should remain visually anchored to the trigger."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer glass-like layering and calm contextual depth."
        ],
        "material": [
          "Uses clearer floating-surface distinction and structured spacing."
        ],
        "fluent": [
          "Uses acrylic-inspired panel tone with crisp edge definition."
        ]
      },
      "devexpressParity": [
        "Support lightweight contextual help and quick actions.",
        "Match DevExpress-style popover expectations for anchored contextual overlays without escalating to a dialog.",
        "Remain simpler and lighter than full dialogs or drawers."
      ]
    }
  },
  {
    "name": "tooltip",
    "tag": "jarvis-tooltip",
    "category": "feedback",
    "description": "Contextual hover/focus hint.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Shows the tooltip content."
      },
      {
        "name": "heading",
        "type": "string",
        "description": "Optional heading shown above the body copy."
      },
      {
        "name": "text",
        "type": "string",
        "description": "Tooltip content string."
      },
      {
        "name": "position",
        "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
        "default": "top",
        "description": "Tooltip placement around the trigger."
      },
      {
        "name": "triggerMode",
        "type": "\"hover\" | \"focus\" | \"click\"",
        "default": "hover",
        "description": "How the tooltip opens."
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "default": "true",
        "description": "Shows the directional arrow."
      },
      {
        "name": "delay",
        "type": "number",
        "default": "80",
        "description": "Delay before the tooltip appears."
      },
      {
        "name": "hideDelay",
        "type": "number",
        "default": "40",
        "description": "Delay before the tooltip hides."
      },
      {
        "name": "maxWidth",
        "type": "string",
        "default": "18rem",
        "description": "Maximum tooltip width."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables tooltip interaction."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Closes the tooltip when clicking outside in click mode."
      },
      {
        "name": "interactive",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the tooltip open while the pointer moves into the tooltip content."
      }
    ],
    "events": [],
    "methods": [
      {
        "name": "show",
        "description": "Shows the tooltip programmatically."
      },
      {
        "name": "hide",
        "description": "Hides the tooltip programmatically."
      }
    ],
    "slots": [
      {
        "name": "content",
        "description": "Custom rich tooltip content."
      }
    ],
    "parts": [
      {
        "name": "trigger",
        "description": "Hover or focus anchor."
      },
      {
        "name": "content",
        "description": "Tooltip body."
      },
      {
        "name": "heading",
        "description": "Tooltip heading region."
      },
      {
        "name": "body",
        "description": "Tooltip body text."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Hover, focus, and click trigger modes support different intent levels without changing the tooltip content model.",
      "Escape dismisses the tooltip in interactive modes.",
      "Rich tooltip content remains associated to the trigger via tooltip semantics."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Interactive tooltip",
        "code": "<jarvis-tooltip heading=\"Inline guidance\" text=\"Use hover, focus, or click depending on how much intent you need.\" trigger-mode=\"click\" interactive><jarvis-button variant=\"outline\">Open tooltip</jarvis-button></jarvis-tooltip>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "trigger anchor",
        "tooltip surface",
        "heading",
        "body",
        "directional arrow"
      ],
      "variants": [
        "hover",
        "focus",
        "click",
        "rich content"
      ],
      "sizes": [
        "sm",
        "md"
      ],
      "states": [
        "closed",
        "open",
        "interactive",
        "disabled"
      ],
      "interactions": [
        "Tooltips should appear quickly enough to feel helpful without creating accidental flicker.",
        "Rich content should remain lightweight and guidance-oriented instead of becoming a substitute for a popover.",
        "Interactive tooltips should stay dismissible with Escape and outside interaction."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer elevated hint surfaces and quieter micro-motion."
        ],
        "material": [
          "Uses clearer focus and state contrast for guidance-heavy interfaces."
        ],
        "fluent": [
          "Uses pragmatic utility styling with crisp edge definition."
        ]
      },
      "devexpressParity": [
        "Support short hints, structured guidance, and richer explanatory content.",
        "Match DevExpress-style tooltip expectations with trigger mode choice, delay control, and interactive content support."
      ]
    }
  },
  {
    "name": "dialog",
    "tag": "jarvis-dialog",
    "category": "overlays",
    "description": "Modal dialog surface.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Controls visibility."
      },
      {
        "name": "label",
        "type": "string",
        "default": "Dialog",
        "description": "Accessible label for assistive technology."
      },
      {
        "name": "heading",
        "type": "string",
        "default": "\"\"",
        "description": "Optional built-in heading when no header slot is provided."
      },
      {
        "name": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Supporting description shown beneath the heading."
      },
      {
        "name": "showCloseButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the dismiss button in the header."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Closes the dialog when the backdrop is clicked."
      },
      {
        "name": "showOverlay",
        "type": "boolean",
        "default": "true",
        "description": "Shows the modal backdrop blur and tint."
      },
      {
        "name": "hideOnEscape",
        "type": "boolean",
        "default": "true",
        "description": "Allows Escape to dismiss the dialog."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Panel size preset."
      },
      {
        "name": "width",
        "type": "string",
        "default": "\"\"",
        "description": "Optional explicit panel width."
      },
      {
        "name": "initialFocus",
        "type": "\"panel\" | \"close\"",
        "default": "panel",
        "description": "Controls the first focused element when opened."
      }
    ],
    "events": [
      {
        "name": "jarvisOpen",
        "detail": "void",
        "description": "Emits when the dialog opens."
      },
      {
        "name": "jarvisClose",
        "detail": "{ reason: \"dismiss\" | \"programmatic\" }",
        "description": "Emits when the dialog closes."
      }
    ],
    "methods": [
      {
        "name": "show()",
        "description": "Opens the dialog."
      },
      {
        "name": "hide()",
        "description": "Closes the dialog."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Dialog body content."
      },
      {
        "name": "header",
        "description": "Dialog heading and top actions."
      },
      {
        "name": "footer",
        "description": "Dialog footer actions."
      }
    ],
    "parts": [
      {
        "name": "overlay",
        "description": "Backdrop layer."
      },
      {
        "name": "panel",
        "description": "Dialog surface."
      },
      {
        "name": "header",
        "description": "Header region."
      },
      {
        "name": "body",
        "description": "Body region."
      },
      {
        "name": "footer",
        "description": "Footer region."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Escape closes the dialog and focus is restored to the invoking element.",
      "Focus is trapped while the dialog is active.",
      "The dialog panel receives initial focus when opened."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "backdrop",
        "panel",
        "header region",
        "close action",
        "body slot",
        "footer slot"
      ],
      "variants": [
        "default",
        "built-in header",
        "slotted header",
        "quiet backdrop"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "opening",
        "open",
        "closing",
        "dismissed",
        "programmatic close"
      ],
      "interactions": [
        "Entry and exit motion should preserve context without delaying interaction.",
        "Backdrop and panel work together as one modal system.",
        "Header, body, and footer slots support consistent decision layouts.",
        "Built-in headings should make common confirmation flows easy without forcing extra slot markup."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses premium translucent surfaces and calm scaling motion."
        ],
        "material": [
          "Uses shaped modal surfaces and clearer contained elevation."
        ],
        "fluent": [
          "Uses acrylic-inspired panel treatment and crisp stroke definition."
        ]
      },
      "devexpressParity": [
        "Trap focus and restore focus correctly on close.",
        "Support header/body/footer composition patterns seen in mature enterprise dialogs.",
        "Keep action alignment consistent for confirm/dismiss workflows.",
        "Support both lightweight confirmation dialogs and richer task-detail overlays."
      ]
    }
  },
  {
    "name": "progress",
    "tag": "jarvis-progress",
    "category": "feedback",
    "description": "Determinate or indeterminate progress indicator with optional labels and helper text.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "default": "0",
        "description": "Current determinate value from 0 to 100."
      },
      {
        "name": "label",
        "type": "string",
        "description": "Optional visible progress label."
      },
      {
        "name": "helperText",
        "type": "string",
        "description": "Supporting copy shown beneath the bar."
      },
      {
        "name": "tone",
        "type": "\"neutral\" | \"success\" | \"warning\" | \"danger\"",
        "default": "neutral",
        "description": "Visual emphasis tone for the indicator fill."
      },
      {
        "name": "showValueLabel",
        "type": "boolean",
        "default": "false",
        "description": "Shows the numeric progress value beside the label."
      },
      {
        "name": "valueSuffix",
        "type": "string",
        "default": "%",
        "description": "Suffix appended to the visible value label."
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "Uses looping motion instead of a fixed value."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "track",
        "description": "Progress track."
      },
      {
        "name": "indicator",
        "description": "Filled progress indicator."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Labeled progress",
        "code": "<jarvis-progress label=\"Uploading assets\" value=\"65\" show-value-label helper-text=\"3 of 5 files complete.\"></jarvis-progress>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label row",
        "track",
        "indicator",
        "helper text"
      ],
      "variants": [
        "labeled",
        "tone variants",
        "indeterminate"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "idle",
        "determinate",
        "indeterminate"
      ],
      "interactions": [
        "Progress bars should explain what is happening without forcing nearby body copy to carry the whole status.",
        "Indeterminate motion must feel present but never distracting.",
        "Value labels should line up cleanly with longer task names."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer premium fills and calm helper text treatment."
        ],
        "material": [
          "Uses stronger color emphasis and clearer linear motion."
        ],
        "fluent": [
          "Uses pragmatic status treatment with crisp bar geometry."
        ]
      },
      "devexpressParity": [
        "Cover upload, import, processing, and completion states without switching to a different component family.",
        "Match the DevExpress progress-bar pattern for both determinate and indeterminate feedback."
      ]
    }
  },
  {
    "name": "spinner",
    "tag": "jarvis-spinner",
    "category": "feedback",
    "description": "Indeterminate loading indicator.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base spinner ring"
      ],
      "variants": [
        "spinner"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "running",
        "paused",
        "finished"
      ],
      "interactions": [
        "Spinner provides motion feedback for background activity.",
        "Motion must remain accessible and not overpower nearby interactive content.",
        "Label should map to status announcements when embedded in loading regions."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses smooth, low-contrast spin for calm motion.",
          "Avoids excessive blur or jerky timing."
        ],
        "material": [
          "Uses familiar indeterminate loader behavior.",
          "Fits compact controls and content-first layouts."
        ],
        "fluent": [
          "Uses practical rotational feedback with controlled velocity.",
          "Supports deterministic visibility across themes."
        ]
      },
      "devexpressParity": [
        "Use inline for short asynchronous actions.",
        "Use dedicated containers for long-running background tasks."
      ]
    }
  },
  {
    "name": "stack",
    "tag": "jarvis-stack",
    "category": "layout",
    "description": "Responsive one-dimensional layout primitive.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base container"
      ],
      "variants": [
        "single"
      ],
      "sizes": [
        "stretch",
        "start",
        "center",
        "end"
      ],
      "states": [
        "default",
        "wrapped",
        "compact"
      ],
      "interactions": [
        "Controls gap and alignment through CSS variables rather than explicit style props.",
        "Spacing should remain consistent even as children change size.",
        "Vertical rhythm should stay smooth in responsive wraps."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calm spacing model with soft directional rhythm."
        ],
        "material": [
          "Uses practical density and consistent tokenized spacing."
        ],
        "fluent": [
          "Uses pragmatic spacing with predictable alignment controls."
        ]
      },
      "devexpressParity": [
        "Use for forms and action clusters.",
        "Use gap variable for dense and spacious compositions."
      ]
    }
  },
  {
    "name": "grid",
    "tag": "jarvis-grid",
    "category": "layout",
    "description": "Responsive two-dimensional layout primitive.",
    "anatomy": [
      "root"
    ],
    "props": [],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "base grid container"
      ],
      "variants": [
        "single"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "compact",
        "wide"
      ],
      "interactions": [
        "Grid columns should adapt based on available width and `--grid-min` token.",
        "Gaps should remain consistent across breakpoints.",
        "Auto-placement should keep alignment when children vary in intrinsic size."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses generous spacing and calm card rhythm."
        ],
        "material": [
          "Uses practical responsive columns with token-driven min width."
        ],
        "fluent": [
          "Uses consistent grid tracks for dashboard density."
        ]
      },
      "devexpressParity": [
        "Use as foundational shell for cards, list cards, and dashboards.",
        "Use explicit min width and gap tokens for predictable layouts."
      ]
    }
  },
  {
    "name": "surface",
    "tag": "jarvis-surface",
    "category": "layout",
    "description": "Themed surface container.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "elevated",
        "type": "boolean",
        "default": "false",
        "description": "Uses the elevated surface treatment."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Root interactive surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "surface container"
      ],
      "variants": [
        "default",
        "elevated"
      ],
      "sizes": [
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "elevated"
      ],
      "interactions": [
        "Surface acts as a foundational container for nested content and other components.",
        "Elevation should be communicated through contrast and depth, not heavy borders."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calm premium surfaces with soft depth."
        ],
        "material": [
          "Uses flatter, shaped surfaces with contained elevation."
        ],
        "fluent": [
          "Uses layered neutral tones with crisp stroke definition."
        ]
      },
      "devexpressParity": [
        "Provide reusable surface primitives for cards, panels, and dashboard regions.",
        "Keep elevation differences subtle but legible."
      ]
    }
  },
  {
    "name": "section",
    "tag": "jarvis-section",
    "category": "layout",
    "description": "Semantic content section with title and actions.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "heading",
        "type": "string",
        "description": "Section heading text."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Supporting description text."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Section content."
      },
      {
        "name": "actions",
        "description": "Header action region."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Section container."
      },
      {
        "name": "header",
        "description": "Section header region."
      },
      {
        "name": "actions",
        "description": "Header actions region."
      },
      {
        "name": "content",
        "description": "Section content region."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "section container",
        "header",
        "title block",
        "actions",
        "content"
      ],
      "variants": [
        "default"
      ],
      "sizes": [
        "md",
        "lg"
      ],
      "states": [
        "with heading",
        "with description",
        "with actions"
      ],
      "interactions": [
        "Header and content spacing should remain balanced as actions are added.",
        "Section supports semantic grouping without requiring heavyweight card chrome."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses editorial-style spacing and restrained header hierarchy."
        ],
        "material": [
          "Uses clearer grouping and denser section rhythm."
        ],
        "fluent": [
          "Uses practical spacing and crisp information hierarchy."
        ]
      },
      "devexpressParity": [
        "Support grouped settings, forms, and dashboard subsections.",
        "Keep title, description, and actions aligned across responsive widths."
      ]
    }
  },
  {
    "name": "button-group",
    "tag": "jarvis-button-group",
    "category": "actions",
    "description": "Segmented button set for single or multi selection.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Optional field label shown above the group."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated button items. Supports `Label~Description|value|disabled success danger`."
      },
      {
        "name": "selectionMode",
        "type": "\"single\" | \"multiple\"",
        "default": "single",
        "description": "Selection behavior."
      },
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "horizontal",
        "description": "Layout direction."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated selected values."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the current selection visible but blocks changes."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the group as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the group as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown below the control."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error text shown when invalid."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"\"",
        "description": "Accessible label override when no visible label is present."
      },
      {
        "name": "ariaDescription",
        "type": "string",
        "default": "\"\"",
        "description": "Assistive description announced with the group."
      },
      {
        "name": "showSelectionIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Shows the selected-state indicator inside each segment."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits the full selected set."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Button group container."
      },
      {
        "name": "button",
        "description": "Individual segmented button."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Field-style segmented selector",
        "code": "<jarvis-button-group label=\"Align content\" items=\"Left~Primary reading edge; Center~Balanced layouts; Right~Edge anchored notes; Justify~Long-form paragraphs\" value=\"Center\" help-text=\"Choose the default content alignment.\"></jarvis-button-group>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "group container",
        "segment buttons",
        "selected indicator",
        "helper or error text"
      ],
      "variants": [
        "segmented single-select",
        "segmented multi-select",
        "descriptive segment rows"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "selected",
        "focus",
        "disabled",
        "readonly",
        "invalid",
        "vertical"
      ],
      "interactions": [
        "Selection should feel immediate and predictable for both single and multi-select flows.",
        "Pressed and selected states must remain visually distinct in compact layouts.",
        "Arrow keys should move focus across enabled segments and preserve predictable one-of-many selection in single mode."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer segmented surfaces with Apple-like grouped-control restraint."
        ],
        "material": [
          "Uses clearer state-layer emphasis and flatter grouped button treatment."
        ],
        "fluent": [
          "Uses crisp command-bar segmentation and tighter stroke-led separators."
        ]
      },
      "devexpressParity": [
        "Support formatting bars, alignment pickers, and segmented filters.",
        "Maintain equal-height segments and stable label alignment.",
        "Support descriptive secondary text and per-item disabled states without collapsing the rhythm of the group."
      ]
    }
  },
  {
    "name": "menu",
    "tag": "jarvis-menu",
    "category": "navigation",
    "description": "Structured command menu with nested submenus.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated menu paths. Segments support `Label~Description|disabled|danger`, for example `Products/Phones~Mobile catalog; Admin/Delete workspace~Requires owner approval|danger`."
      },
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "horizontal",
        "description": "Top-level orientation."
      },
      {
        "name": "triggerMode",
        "type": "\"click\" | \"hover\"",
        "default": "click",
        "description": "How first-level submenus open."
      },
      {
        "name": "showFirstSubmenuMode",
        "type": "\"click\" | \"hover\"",
        "description": "Optional alias for the first submenu trigger mode."
      },
      {
        "name": "closeOnMouseLeave",
        "type": "boolean",
        "default": "false",
        "description": "Closes open submenus when the pointer leaves the menu."
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "default": "true",
        "description": "Collapses open submenus after a leaf item is selected."
      },
      {
        "name": "value",
        "type": "string",
        "description": "Selected path value."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"Menu\"",
        "description": "Accessible label for the menu root."
      },
      {
        "name": "ariaDescription",
        "type": "string",
        "default": "\"\"",
        "description": "Optional assistive description for the menu root."
      },
      {
        "name": "showDescriptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows supporting copy under each row when descriptions are provided."
      },
      {
        "name": "showSelectionIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Shows a selected-state indicator on matching leaf items."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ value: string }",
        "description": "Emits the full selected path."
      }
    ],
    "methods": [
      {
        "name": "expandAll()",
        "description": "Opens the first nested branch so keyboard users can enter the first submenu quickly."
      },
      {
        "name": "collapseAll()",
        "description": "Closes all open submenu panels."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Menu root container."
      },
      {
        "name": "item",
        "description": "Interactive menu item."
      },
      {
        "name": "submenu",
        "description": "Nested submenu panel."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Uses menu and menuitem semantics for command navigation.",
      "Supports nested submenu discovery through pointer or keyboard focus."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "menu bar",
        "menu item",
        "submenu panel",
        "submenu chevron"
      ],
      "variants": [
        "horizontal catalog",
        "vertical command menu",
        "descriptive rows"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "closed",
        "submenu open",
        "active item",
        "focus",
        "disabled item",
        "destructive item"
      ],
      "interactions": [
        "Nested paths should open as cascading submenus without losing context.",
        "Orientation should only affect the first level; nested panels remain vertical.",
        "Typeahead should move focus to the next matching command within the active branch.",
        "Keyboard and programmatic expansion should both preserve the selected leaf state."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses lighter, quieter navigation surfaces with calmer separators."
        ],
        "material": [
          "Uses stronger hover surfaces and more structured grouping."
        ],
        "fluent": [
          "Uses command-bar inspired spacing and crisp submenu panels."
        ]
      },
      "devexpressParity": [
        "Support category navigation and top-level product menus.",
        "Keep nested submenu behavior stable and readable."
      ]
    }
  },
  {
    "name": "context-menu",
    "tag": "jarvis-context-menu",
    "category": "navigation",
    "description": "Right-click or long-press contextual action menu.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated menu paths. Segments support `Label~Description|disabled|danger` to show richer rows and disabled or destructive actions."
      },
      {
        "name": "showOn",
        "type": "\"contextmenu\" | \"click\"",
        "default": "contextmenu",
        "description": "How the target opens the menu."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Dismisses the menu when interacting outside it."
      },
      {
        "name": "value",
        "type": "string",
        "description": "Selected action path value."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"Context menu\"",
        "description": "Accessible label for the floating menu panel."
      },
      {
        "name": "showDescriptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows supporting copy under each row when descriptions are provided."
      },
      {
        "name": "showSelectionIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Shows a selected-state indicator on matching leaf actions."
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "default": "true",
        "description": "Dismisses the menu after selecting a leaf action."
      },
      {
        "name": "longPressDelay",
        "type": "number",
        "default": "420",
        "description": "Delay in milliseconds before a touch long press opens the menu."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ value: string }",
        "description": "Emits the selected action path."
      }
    ],
    "methods": [
      {
        "name": "showAt(x, y)",
        "description": "Opens the menu at the provided client coordinates."
      },
      {
        "name": "hide()",
        "description": "Dismisses the open context menu."
      },
      {
        "name": "focusFirst()",
        "description": "Moves keyboard focus to the first enabled command row."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "The target area that opens the context menu."
      }
    ],
    "parts": [
      {
        "name": "target",
        "description": "Context target wrapper."
      },
      {
        "name": "panel",
        "description": "Context menu surface."
      },
      {
        "name": "item",
        "description": "Context menu item."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Supports pointer-based context invocation and keyboard-safe command selection."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "target area",
        "floating panel",
        "command row",
        "submenu chevron"
      ],
      "variants": [
        "default",
        "descriptive rows"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "closed",
        "open",
        "submenu open",
        "disabled item",
        "destructive item"
      ],
      "interactions": [
        "Context menu should anchor to the pointer position and dismiss on outside interaction.",
        "Nested actions should open to the side without obscuring the hovered command.",
        "Typeahead should move focus across sibling actions while preserving the current branch.",
        "Leaf selection should be remembered when the same contextual menu reopens."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer floating surfaces and calmer contextual depth."
        ],
        "material": [
          "Uses stronger hover states and more explicit menu separation."
        ],
        "fluent": [
          "Uses crisp, pragmatic menu rows and acrylic-like panel depth."
        ]
      },
      "devexpressParity": [
        "Support single-level and nested context actions similar to desktop UIs.",
        "Preserve quick command access without requiring toolbar real estate."
      ]
    }
  },
  {
    "name": "stepper",
    "tag": "jarvis-stepper",
    "category": "navigation",
    "description": "Multi-step progress and navigation indicator.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Comma- or semicolon-separated step labels. Each item can use `Label|icon|hint|optional disabled invalid` for richer step metadata."
      },
      {
        "name": "current",
        "type": "number",
        "default": "0",
        "description": "Current active step index."
      },
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "horizontal",
        "description": "Stepper orientation."
      },
      {
        "name": "linear",
        "type": "boolean",
        "default": "false",
        "description": "Treats the stepper as linear progress."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction for the whole stepper."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents step changes while preserving current and completion state."
      },
      {
        "name": "completed",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated step indexes or labels that should render as completed."
      },
      {
        "name": "invalidSteps",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated step indexes or labels that should render as invalid."
      },
      {
        "name": "disabledSteps",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated step indexes or labels that should render as disabled."
      },
      {
        "name": "selectOnFocus",
        "type": "boolean",
        "default": "false",
        "description": "Commits the focused step as the active step."
      },
      {
        "name": "showConnectors",
        "type": "boolean",
        "default": "true",
        "description": "Shows the line between adjacent steps."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Controls the size of indicators and labels."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "Stepper",
        "description": "Accessible label applied to the stepper group."
      }
    ],
    "events": [
      {
        "name": "jarvisStepChange",
        "detail": "{ index: number; label: string }",
        "description": "Emits when a step is requested."
      }
    ],
    "methods": [
      {
        "name": "next()",
        "description": "Moves to the next available step."
      },
      {
        "name": "previous()",
        "description": "Moves to the previous available step."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Stepper container."
      },
      {
        "name": "step",
        "description": "Individual step item."
      },
      {
        "name": "indicator",
        "description": "Step circle or marker."
      },
      {
        "name": "label",
        "description": "Step label."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "step list",
        "indicator",
        "connector",
        "label",
        "optional hint"
      ],
      "variants": [
        "horizontal",
        "vertical",
        "linear",
        "compact",
        "focus-select",
        "readonly review"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "upcoming",
        "current",
        "complete",
        "blocked",
        "invalid",
        "externally completed"
      ],
      "interactions": [
        "Completed and active steps must remain distinguishable at a glance.",
        "Orientation changes should preserve label readability and connector alignment.",
        "Externally-driven invalid and disabled states should override implicit progress assumptions."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses lighter progress lines and more editorial spacing."
        ],
        "material": [
          "Uses stronger active/future contrast and shaped step indicators."
        ],
        "fluent": [
          "Uses crisp, process-oriented connectors with pragmatic spacing."
        ]
      },
      "devexpressParity": [
        "Support checkout, onboarding, and setup flows.",
        "Expose active-step changes for external form or view synchronization.",
        "Support review-only states where progress is displayed but interaction is locked."
      ]
    }
  },
  {
    "name": "autocomplete",
    "tag": "jarvis-autocomplete",
    "category": "forms",
    "description": "Freeform text input with inline suggestion popup.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Start typing",
        "description": "Hint text."
      },
      {
        "name": "suggestions",
        "type": "string",
        "description": "Comma-separated suggestion values."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Current input value."
      },
      {
        "name": "clearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear affordance when a value exists."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Alias for clearButton in docs-first usage."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "opened",
        "type": "boolean",
        "default": "false",
        "description": "Current popup state."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "true",
        "description": "Opens suggestions when the field is focused or clicked."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls how suggestions match the current value."
      },
      {
        "name": "minSearchLength",
        "type": "number",
        "default": "0",
        "description": "Minimum characters required before matching suggestions."
      },
      {
        "name": "showDataBeforeSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows suggestions before the minimum length is met."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No matching suggestions\"",
        "description": "Custom empty-state copy when no suggestions match."
      },
      {
        "name": "acceptCustomValue",
        "type": "boolean",
        "default": "false",
        "description": "Allows the current freeform value to be committed as a custom option."
      }
    ],
    "events": [
      {
        "name": "jarvisInput",
        "detail": "{ value: string }",
        "description": "Emits as the user types."
      },
      {
        "name": "jarvisSelect",
        "detail": "{ value: string }",
        "description": "Emits when a suggestion is picked."
      },
      {
        "name": "jarvisOpened",
        "detail": "void",
        "description": "Emits when the suggestion panel opens."
      },
      {
        "name": "jarvisClosed",
        "detail": "void",
        "description": "Emits when the suggestion panel closes."
      },
      {
        "name": "jarvisCustomItemCreate",
        "detail": "{ value: string }",
        "description": "Emits when a custom value is committed."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Text input."
      },
      {
        "name": "clear",
        "description": "Clear button."
      },
      {
        "name": "panel",
        "description": "Suggestion panel."
      },
      {
        "name": "option",
        "description": "Suggestion option."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Supports Arrow Up, Arrow Down, Enter, and Escape keyboard navigation.",
      "Uses input + listbox semantics with active suggestion tracking."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "input field",
        "clear action",
        "suggestion panel",
        "suggestion rows"
      ],
      "variants": [
        "default",
        "with clear button",
        "custom value"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "focused",
        "showing suggestions",
        "disabled",
        "custom value ready"
      ],
      "interactions": [
        "Suggestions filter in real time as the value changes.",
        "Selection fills the field and collapses the suggestion panel.",
        "Optional custom values let the field act as a hybrid autocomplete + freeform input."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calm, search-like field styling with lightweight suggestion depth."
        ],
        "material": [
          "Uses stronger field container presence and clearer state surfaces."
        ],
        "fluent": [
          "Uses practical search-field framing and crisp suggestion rows."
        ]
      },
      "devexpressParity": [
        "Support lightweight typeahead flows without forcing strict selection.",
        "Keep typed text and suggestion selection in sync.",
        "Cover the DevExpress-style autocomplete basics, clear button, and custom-item flows."
      ]
    }
  },
  {
    "name": "radio-group",
    "tag": "jarvis-radio-group",
    "category": "forms",
    "description": "Radio input group with horizontal or vertical layout.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Fieldset legend."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated radio items. Supports `Label~Description|value|disabled danger`."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Selected radio label."
      },
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "vertical",
        "description": "Item arrangement."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the whole group."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents changes while keeping the group focusable."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the group as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the group as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper copy shown below the group."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error copy shown when invalid."
      },
      {
        "name": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Shared native radio group name."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"\"",
        "description": "Accessible label override when no visible legend is shown."
      },
      {
        "name": "ariaDescription",
        "type": "string",
        "default": "\"\"",
        "description": "Assistive description announced with the group."
      },
      {
        "name": "showDescriptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows option descriptions when provided."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits the selected radio value."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Group container."
      },
      {
        "name": "item",
        "description": "Individual radio item."
      },
      {
        "name": "indicator",
        "description": "Custom radio indicator."
      },
      {
        "name": "help",
        "description": "Helper text block."
      },
      {
        "name": "error",
        "description": "Error text block."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "legend",
        "radio row",
        "indicator",
        "label",
        "description",
        "helper or error text"
      ],
      "variants": [
        "vertical",
        "horizontal",
        "required",
        "described rows"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "selected",
        "disabled",
        "invalid",
        "read-only"
      ],
      "interactions": [
        "Selection must switch immediately with clear one-of-many affordance.",
        "Legend, items, and supporting text should feel like one field block.",
        "Arrow keys should move selection across enabled items without trapping focus in disabled rows."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses slightly softer radio outlines and calmer spacing."
        ],
        "material": [
          "Uses fuller selection fill and denser control rhythm."
        ],
        "fluent": [
          "Uses smaller indicators and practical settings-panel spacing."
        ]
      },
      "devexpressParity": [
        "Support option panels, filter drawers, and preference forms.",
        "Keep alignment clean in both compact horizontal and stacked vertical layouts.",
        "Readonly, required, and invalid group states should align with single-radio fields.",
        "Support described and disabled rows for policy choices, escalation selectors, and review states."
      ]
    }
  },
  {
    "name": "select-box",
    "tag": "jarvis-select-box",
    "category": "forms",
    "description": "Searchable dropdown selector with optional grouping.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible field label."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated options or grouped paths."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Selected item value."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Select...",
        "description": "Placeholder when empty."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error text shown when the field is invalid."
      },
      {
        "name": "grouped",
        "type": "boolean",
        "default": "false",
        "description": "Groups options by path prefix."
      },
      {
        "name": "searchEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Shows in-panel search input."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows clear affordance when selected."
      },
      {
        "name": "showDropDownButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the chevron affordance in the trigger."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents opening and changes."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the field."
      },
      {
        "name": "opened",
        "type": "boolean",
        "default": "false",
        "description": "Current popup state."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "true",
        "description": "Opens the dropdown when the field is clicked."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls how search matches items."
      },
      {
        "name": "minSearchLength",
        "type": "number",
        "default": "0",
        "description": "Minimum characters required before filtering."
      },
      {
        "name": "showDataBeforeSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows items before the search minimum is met."
      },
      {
        "name": "searchExpr",
        "type": "string",
        "default": "\"\"",
        "description": "Optional alternate field used for matching."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No matching items\"",
        "description": "Custom empty-state copy when no items match the current search."
      },
      {
        "name": "acceptCustomValue",
        "type": "boolean",
        "default": "false",
        "description": "Allows freeform values to be committed from search."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits the selected value."
      },
      {
        "name": "jarvisOpened",
        "detail": "void",
        "description": "Emits when the dropdown opens."
      },
      {
        "name": "jarvisClosed",
        "detail": "void",
        "description": "Emits when the dropdown closes."
      },
      {
        "name": "jarvisCustomItemCreate",
        "detail": "{ value: string }",
        "description": "Emits when a custom value is committed."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Closed trigger button."
      },
      {
        "name": "panel",
        "description": "Open dropdown surface."
      },
      {
        "name": "search",
        "description": "Search input."
      },
      {
        "name": "option",
        "description": "Item option row."
      },
      {
        "name": "help-text",
        "description": "Helper text beneath the field."
      },
      {
        "name": "error-text",
        "description": "Error text beneath the field."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "field trigger",
        "value",
        "clear icon",
        "dropdown panel",
        "group header",
        "option row"
      ],
      "variants": [
        "default",
        "search",
        "grouped",
        "clear button",
        "custom value"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "open",
        "selected",
        "disabled",
        "readonly",
        "required",
        "invalid",
        "empty",
        "custom value ready"
      ],
      "interactions": [
        "Open state should feel anchored and keep search inside the dropdown surface.",
        "Grouped lists should preserve clear visual hierarchy without overpowering item labels.",
        "Search and selection should support both strict item picking and optional freeform entry.",
        "Helper and error copy should stay visually attached to the field, matching the rest of the Jarvis box editors."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses Apple-like soft field chrome and quiet grouped headings."
        ],
        "material": [
          "Uses more assertive active state and flatter grouped panel treatment."
        ],
        "fluent": [
          "Uses crisp listbox surfaces and clearer border-led grouping."
        ]
      },
      "devexpressParity": [
        "Cover default mode, custom placeholder, readonly, disabled, search, grouping, and event handling.",
        "Cover DevExpress-like search, clear button, and custom item flows.",
        "Support the DevExpress-like select-box pattern used throughout settings and inspector forms.",
        "Keep required, helper, and error states in parity with lookup, number-box, date-box, and date-range-box."
      ]
    }
  },
  {
    "name": "lookup",
    "tag": "jarvis-lookup",
    "category": "forms",
    "description": "Expanded lookup picker with search-focused selection sheet.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible field label."
      },
      {
        "name": "heading",
        "type": "string",
        "default": "Select item",
        "description": "Sheet title."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated options or grouped paths."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Selected value."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Choose...",
        "description": "Placeholder when empty."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error text shown when the field is invalid."
      },
      {
        "name": "grouped",
        "type": "boolean",
        "default": "false",
        "description": "Groups results by path prefix."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the lookup."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents opening and changes."
      },
      {
        "name": "opened",
        "type": "boolean",
        "default": "false",
        "description": "Current sheet state."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "true",
        "description": "Opens the lookup when the trigger is clicked."
      },
      {
        "name": "searchEnabled",
        "type": "boolean",
        "default": "true",
        "description": "Shows the lookup search field."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "Search",
        "description": "Search placeholder text."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear affordance in the trigger."
      },
      {
        "name": "showCancelButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the cancel action in the footer."
      },
      {
        "name": "showDropDownButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the chevron affordance in the trigger."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls search matching behavior."
      },
      {
        "name": "minSearchLength",
        "type": "number",
        "default": "0",
        "description": "Minimum characters required before filtering."
      },
      {
        "name": "showDataBeforeSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows all options before the search threshold is met."
      },
      {
        "name": "searchExpr",
        "type": "string",
        "default": "\"\"",
        "description": "Optional alternate field used for matching."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No matching results\"",
        "description": "Custom empty-state copy when no lookup results match."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits the selected lookup value."
      },
      {
        "name": "jarvisOpened",
        "detail": "void",
        "description": "Emits when the lookup sheet opens."
      },
      {
        "name": "jarvisClosed",
        "detail": "void",
        "description": "Emits when the lookup sheet closes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Closed lookup trigger."
      },
      {
        "name": "panel",
        "description": "Lookup sheet."
      },
      {
        "name": "search",
        "description": "Search input inside the sheet."
      },
      {
        "name": "option",
        "description": "Result row inside the lookup sheet."
      },
      {
        "name": "help-text",
        "description": "Helper text beneath the field."
      },
      {
        "name": "error-text",
        "description": "Error text beneath the field."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "field trigger",
        "sheet header",
        "search input",
        "result row",
        "footer action"
      ],
      "variants": [
        "default",
        "grouped",
        "search",
        "clear button"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "open",
        "selected",
        "empty",
        "disabled",
        "readonly",
        "required",
        "invalid"
      ],
      "interactions": [
        "Search should be the primary action and stay visible within the expanded sheet.",
        "Cancellation should close the sheet without committing changes.",
        "Opening and keyboard navigation should feel like a deliberate picker rather than a basic menu.",
        "Helper and error messaging should read like part of the field, not detached modal content."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer sheet surfaces and a more relaxed dialog feel."
        ],
        "material": [
          "Uses stronger header/action separation and denser search layout."
        ],
        "fluent": [
          "Uses practical command-sheet rhythm with crisp rows."
        ]
      },
      "devexpressParity": [
        "Match the DevExpress-style lookup pattern for compact data pickers.",
        "Support grouped directories, contacts, and owner-picking flows.",
        "Cover open/close, clear, cancel, and search-first selection behavior."
      ]
    }
  },
  {
    "name": "drop-down-box",
    "tag": "jarvis-drop-down-box",
    "category": "forms",
    "description": "Advanced dropdown editor with embedded tree or list content.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible field label."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated options or hierarchical paths."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated selected values."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Select a value...",
        "description": "Placeholder when empty."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the editor as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the editor as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown beneath the editor."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error text shown when the editor is invalid."
      },
      {
        "name": "selectionMode",
        "type": "\"single\" | \"multiple\"",
        "default": "single",
        "description": "Selection behavior."
      },
      {
        "name": "contentType",
        "type": "\"tree\" | \"list\"",
        "default": "tree",
        "description": "Embedded content renderer."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents opening and changes."
      },
      {
        "name": "opened",
        "type": "boolean",
        "default": "false",
        "description": "Current dropdown state."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "true",
        "description": "Opens the picker when the field is clicked."
      },
      {
        "name": "searchEnabled",
        "type": "boolean",
        "default": "true",
        "description": "Shows search input in the panel."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls how search matches items."
      },
      {
        "name": "minSearchLength",
        "type": "number",
        "default": "0",
        "description": "Minimum characters required before filtering."
      },
      {
        "name": "showDataBeforeSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows all items before the search threshold is met."
      },
      {
        "name": "searchExpr",
        "type": "string",
        "default": "\"\"",
        "description": "Optional alternate field used for matching."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "Search",
        "description": "Search placeholder text."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No matching items\"",
        "description": "Custom empty-state copy when the embedded content has no matches."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows clear affordance for selected values."
      },
      {
        "name": "showDropDownButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the chevron affordance in the trigger."
      },
      {
        "name": "showSelectionControls",
        "type": "boolean",
        "default": "true",
        "description": "Shows checkbox-like controls for multi-select."
      },
      {
        "name": "acceptCustomValue",
        "type": "boolean",
        "default": "false",
        "description": "Allows freeform values to be created in list mode."
      },
      {
        "name": "applyValueMode",
        "type": "\"instantly\" | \"useButtons\"",
        "default": "instantly",
        "description": "Controls whether changes apply immediately or after confirmation."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the editor."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits the selected values."
      },
      {
        "name": "jarvisOpened",
        "detail": "void",
        "description": "Emits when the picker opens."
      },
      {
        "name": "jarvisClosed",
        "detail": "void",
        "description": "Emits when the picker closes."
      },
      {
        "name": "jarvisCustomItemCreate",
        "detail": "{ value: string }",
        "description": "Emits when a custom list value is committed."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Closed trigger."
      },
      {
        "name": "panel",
        "description": "Embedded dropdown surface."
      },
      {
        "name": "search",
        "description": "Search field inside the picker."
      },
      {
        "name": "help-text",
        "description": "Helper text beneath the editor."
      },
      {
        "name": "error-text",
        "description": "Error text beneath the editor."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "field trigger",
        "embedded search",
        "tree/list content",
        "selection checkbox",
        "clear icon"
      ],
      "variants": [
        "tree content",
        "list content",
        "single select",
        "multiple select",
        "use buttons"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "open",
        "expanded",
        "selected",
        "filtered",
        "draft selection",
        "required",
        "invalid"
      ],
      "interactions": [
        "Embedded content should feel like a true picker surface rather than a regular menu.",
        "Tree selections must remain legible when multiple values are active.",
        "The list variant should support search, select-all, and optional custom values without losing embedded-picker clarity.",
        "Validation and helper text should remain attached to the trigger even while the embedded panel is open."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer tree/list chrome and quieter expansion affordances."
        ],
        "material": [
          "Uses stronger active-state emphasis and flatter picker framing."
        ],
        "fluent": [
          "Uses practical explorer-like embedded content styling."
        ]
      },
      "devexpressParity": [
        "Cover single-selection tree pickers and multiple-selection embedded explorers.",
        "Match the DevExpress-style drop-down-box pattern for complex selection flows.",
        "Support apply/cancel workflows and list/tree rendering from the same contract."
      ]
    }
  },
  {
    "name": "tag-box",
    "tag": "jarvis-tag-box",
    "category": "forms",
    "description": "Multi-select combobox that renders selected items as dismissible tags.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible field label."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated options or grouped paths."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated selected values."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Select...",
        "description": "Placeholder when empty."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "default": "\"\"",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "default": "\"\"",
        "description": "Error text shown when the field is invalid."
      },
      {
        "name": "grouped",
        "type": "boolean",
        "default": "false",
        "description": "Groups options by path prefix."
      },
      {
        "name": "searchEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Shows search input in the dropdown."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear affordance when values are selected."
      },
      {
        "name": "showDropDownButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the chevron affordance in the trigger."
      },
      {
        "name": "opened",
        "type": "boolean",
        "default": "false",
        "description": "Current popup state."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "true",
        "description": "Opens the popup when the field is clicked."
      },
      {
        "name": "showSelectionControls",
        "type": "boolean",
        "default": "true",
        "description": "Shows checkbox-like selection affordances."
      },
      {
        "name": "showMultiTagOnly",
        "type": "boolean",
        "default": "false",
        "description": "Collapses selections into a single summary tag."
      },
      {
        "name": "hideSelectedItems",
        "type": "boolean",
        "default": "false",
        "description": "Removes already-selected values from the open list."
      },
      {
        "name": "maxDisplayedTags",
        "type": "number",
        "default": "999",
        "description": "Limits rendered tags before collapsing into a multi-tag."
      },
      {
        "name": "acceptCustomValue",
        "type": "boolean",
        "default": "false",
        "description": "Allows freeform tags to be created from search input."
      },
      {
        "name": "applyValueMode",
        "type": "\"instantly\" | \"useButtons\"",
        "default": "instantly",
        "description": "Controls whether changes apply immediately or after confirmation."
      },
      {
        "name": "selectAllMode",
        "type": "\"page\" | \"allPages\"",
        "default": "page",
        "description": "Changes the select-all label treatment for the current result set."
      },
      {
        "name": "selectAllText",
        "type": "string",
        "default": "Select all",
        "description": "Label for the select-all action."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls how search matches items."
      },
      {
        "name": "minSearchLength",
        "type": "number",
        "default": "0",
        "description": "Minimum characters required before filtering."
      },
      {
        "name": "showDataBeforeSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows all items before the search threshold is met."
      },
      {
        "name": "searchExpr",
        "type": "string",
        "default": "\"\"",
        "description": "Optional alternate field used for matching."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "Search",
        "description": "Search placeholder text."
      },
      {
        "name": "noDataText",
        "type": "string",
        "default": "\"No matching items\"",
        "description": "Custom empty-state copy when no tags match the current search."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents adding or removing selections."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the editor."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits the selected value set."
      },
      {
        "name": "jarvisOpened",
        "detail": "void",
        "description": "Emits when the popup opens."
      },
      {
        "name": "jarvisClosed",
        "detail": "void",
        "description": "Emits when the popup closes."
      },
      {
        "name": "jarvisCustomItemCreate",
        "detail": "{ value: string }",
        "description": "Emits when a custom tag is created."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Closed tag field."
      },
      {
        "name": "tag",
        "description": "Selected tag pill."
      },
      {
        "name": "panel",
        "description": "Dropdown selection surface."
      },
      {
        "name": "search",
        "description": "Search field inside the popup."
      },
      {
        "name": "help-text",
        "description": "Helper text beneath the field."
      },
      {
        "name": "error-text",
        "description": "Error text beneath the field."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "tag field",
        "selected tag",
        "remove affordance",
        "dropdown panel",
        "checkbox row"
      ],
      "variants": [
        "default",
        "search",
        "grouped",
        "multi-tag",
        "use buttons",
        "custom values"
      ],
      "sizes": [
        "md"
      ],
      "states": [
        "resting",
        "open",
        "selected",
        "empty",
        "disabled",
        "readonly",
        "draft selection",
        "required",
        "invalid"
      ],
      "interactions": [
        "Tags should remain easy to scan and dismiss without destabilizing the field height too aggressively.",
        "Collapsed multi-tag summaries should still communicate selection scale clearly.",
        "Search, custom tag creation, and select-all should work together without obscuring the current value set.",
        "Helper and error states should remain legible even when multi-tag summaries are active."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer pills and more relaxed selected-tag spacing."
        ],
        "material": [
          "Uses clearer selected-state chips and stronger active rows."
        ],
        "fluent": [
          "Uses compact tags and denser checkbox rows."
        ]
      },
      "devexpressParity": [
        "Support default mode, search mode, grouping, count limitation, and removable tags.",
        "Match the DevExpress-style tag-box for multi-select product, filter, and assignee flows.",
        "Cover hide-selected-items, multi-tag collapse, apply buttons, and custom-item creation."
      ]
    }
  },
  {
    "name": "number-box",
    "tag": "jarvis-number-box",
    "category": "forms",
    "description": "Numeric field with spin controls and clamping.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "value",
        "type": "number | null",
        "default": "0",
        "description": "Current numeric value. Supports clearing to null."
      },
      {
        "name": "min",
        "type": "number",
        "default": "-Infinity",
        "description": "Minimum allowed value."
      },
      {
        "name": "max",
        "type": "number",
        "default": "Infinity",
        "description": "Maximum allowed value."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Increment/decrement step."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Allows viewing without editing."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text shown when invalid."
      },
      {
        "name": "showSpinButtons",
        "type": "boolean",
        "default": "true",
        "description": "Shows increment/decrement buttons."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear button."
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Hint text."
      },
      {
        "name": "format",
        "type": "\"decimal\" | \"integer\" | \"fixed-point\" | \"currency\" | \"accounting\" | \"percent\" | \"unit\"",
        "default": "decimal",
        "description": "Display format for the value when the field is not focused."
      },
      {
        "name": "locale",
        "type": "string",
        "default": "en-US",
        "description": "Locale used for formatted display and parsing."
      },
      {
        "name": "currency",
        "type": "string",
        "default": "USD",
        "description": "Currency code used for currency and accounting formats."
      },
      {
        "name": "unit",
        "type": "string",
        "description": "Unit suffix used for unit formatting."
      },
      {
        "name": "fractionDigits",
        "type": "number",
        "default": "-1",
        "description": "Optional precision override for formatted values."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: number | null }",
        "description": "Emits after value changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Numeric input."
      },
      {
        "name": "spin-down",
        "description": "Decrement control."
      },
      {
        "name": "spin-up",
        "description": "Increment control."
      },
      {
        "name": "clear",
        "description": "Clear button."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "numeric field",
        "spin controls",
        "clear action"
      ],
      "variants": [
        "default",
        "spin buttons",
        "clear button",
        "formatted value modes",
        "helper and error text"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "focused",
        "disabled",
        "readonly",
        "clamped",
        "invalid"
      ],
      "interactions": [
        "Value changes should clamp cleanly to min/max bounds and normalize on blur.",
        "Spin buttons must preserve input alignment and never obscure typed values.",
        "Formatted display should collapse back to an editable numeric string on focus without losing the underlying value."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses an Apple-like numeric field with calm controls and soft chrome."
        ],
        "material": [
          "Uses clearer shaped input surfaces and stronger state layers."
        ],
        "fluent": [
          "Uses pragmatic spin-button framing and crisp strokes."
        ]
      },
      "devexpressParity": [
        "Support keyboard entry plus small-step adjustment controls.",
        "Keep number formatting clean and predictable in dense forms."
      ]
    }
  },
  {
    "name": "slider",
    "tag": "jarvis-slider",
    "category": "forms",
    "description": "Single-value range selector.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "value",
        "type": "number",
        "default": "50",
        "description": "Current value."
      },
      {
        "name": "min",
        "type": "number",
        "default": "0",
        "description": "Minimum value."
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum value."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Increment step."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Allows viewing without dragging the thumb."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required for validation flows."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the slider as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the control."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text shown when invalid."
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "default": "false",
        "description": "Shows min/max labels."
      },
      {
        "name": "showTooltip",
        "type": "boolean",
        "default": "false",
        "description": "Shows the current value bubble."
      },
      {
        "name": "showRangeFill",
        "type": "boolean",
        "default": "true",
        "description": "Shows the active fill on the track."
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "default": "false",
        "description": "Shows tick marks across the track."
      },
      {
        "name": "showTickLabels",
        "type": "boolean",
        "default": "false",
        "description": "Shows formatted labels under each tick."
      },
      {
        "name": "tickInterval",
        "type": "number",
        "default": "0",
        "description": "Tick spacing. Falls back to the step value when unset."
      },
      {
        "name": "valuePrefix",
        "type": "string",
        "description": "Prefix for labels and tooltip values."
      },
      {
        "name": "valueSuffix",
        "type": "string",
        "description": "Suffix for labels and tooltip values."
      },
      {
        "name": "format",
        "type": "\"decimal\" | \"integer\" | \"fixed-point\" | \"currency\" | \"accounting\" | \"percent\" | \"unit\"",
        "default": "decimal",
        "description": "Formats values for labels, ticks, and tooltips."
      },
      {
        "name": "locale",
        "type": "string",
        "default": "en-US",
        "description": "Locale for formatted values."
      },
      {
        "name": "currency",
        "type": "string",
        "default": "USD",
        "description": "Currency code used in currency/accounting modes."
      },
      {
        "name": "unit",
        "type": "string",
        "description": "Unit suffix used in unit mode."
      },
      {
        "name": "fractionDigits",
        "type": "number",
        "default": "-1",
        "description": "Optional formatted fraction precision."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: number }",
        "description": "Emits when the slider changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Slider wrapper."
      },
      {
        "name": "label",
        "description": "Visible field label."
      },
      {
        "name": "track",
        "description": "Slider track."
      },
      {
        "name": "fill",
        "description": "Filled range."
      },
      {
        "name": "control",
        "description": "Native range input."
      },
      {
        "name": "ticks",
        "description": "Tick mark container."
      },
      {
        "name": "tooltip",
        "description": "Current value bubble."
      },
      {
        "name": "labels",
        "description": "Min/max label row."
      },
      {
        "name": "help",
        "description": "Helper text container."
      },
      {
        "name": "error",
        "description": "Error text container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "track",
        "active fill",
        "thumb",
        "tooltip"
      ],
      "variants": [
        "default",
        "labels",
        "tooltip",
        "ticks",
        "formatted values",
        "plain track",
        "helper and error text"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "dragging",
        "disabled",
        "focused",
        "readonly",
        "invalid"
      ],
      "interactions": [
        "Thumb dragging should update value continuously and smoothly while clamping to the allowed range.",
        "Optional tooltip stays visually tied to the thumb without obscuring the track.",
        "Ticks and tick labels should remain aligned to the actual numeric scale even when custom formatting is applied.",
        "Readonly and invalid states should still communicate the current value clearly without looking disabled by default."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses slimmer tracks and quieter thumb styling."
        ],
        "material": [
          "Uses stronger active-color emphasis and clearer filled range."
        ],
        "fluent": [
          "Uses precise thumb geometry and practical label styling."
        ]
      },
      "devexpressParity": [
        "Support settings, filters, and lightweight numeric tuning.",
        "Keep touch/drag interaction clear and responsive."
      ]
    }
  },
  {
    "name": "range-slider",
    "tag": "jarvis-range-slider",
    "category": "forms",
    "description": "Dual-thumb slider for selecting a numeric range.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "start",
        "type": "number",
        "default": "20",
        "description": "Start value."
      },
      {
        "name": "end",
        "type": "number",
        "default": "80",
        "description": "End value."
      },
      {
        "name": "min",
        "type": "number",
        "default": "0",
        "description": "Minimum value."
      },
      {
        "name": "max",
        "type": "number",
        "default": "100",
        "description": "Maximum value."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Increment step."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Allows viewing without dragging either thumb."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the range as required for validation flows."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the range as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the control."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text shown when invalid."
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "default": "false",
        "description": "Shows min/max labels."
      },
      {
        "name": "showTooltips",
        "type": "boolean",
        "default": "false",
        "description": "Shows current value bubbles."
      },
      {
        "name": "showRangeFill",
        "type": "boolean",
        "default": "true",
        "description": "Shows the selected range fill."
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "default": "false",
        "description": "Shows tick marks across the track."
      },
      {
        "name": "showTickLabels",
        "type": "boolean",
        "default": "false",
        "description": "Shows formatted labels under each tick."
      },
      {
        "name": "tickInterval",
        "type": "number",
        "default": "0",
        "description": "Tick spacing. Falls back to the step value when unset."
      },
      {
        "name": "valuePrefix",
        "type": "string",
        "description": "Prefix for labels and tooltip values."
      },
      {
        "name": "valueSuffix",
        "type": "string",
        "description": "Suffix for labels and tooltip values."
      },
      {
        "name": "format",
        "type": "\"decimal\" | \"integer\" | \"fixed-point\" | \"currency\" | \"accounting\" | \"percent\" | \"unit\"",
        "default": "decimal",
        "description": "Formats values for labels, ticks, and tooltips."
      },
      {
        "name": "locale",
        "type": "string",
        "default": "en-US",
        "description": "Locale for formatted values."
      },
      {
        "name": "currency",
        "type": "string",
        "default": "USD",
        "description": "Currency code used in currency/accounting modes."
      },
      {
        "name": "unit",
        "type": "string",
        "description": "Unit suffix used in unit mode."
      },
      {
        "name": "fractionDigits",
        "type": "number",
        "default": "-1",
        "description": "Optional formatted fraction precision."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ start: number; end: number }",
        "description": "Emits when either thumb changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Range slider wrapper."
      },
      {
        "name": "label",
        "description": "Visible field label."
      },
      {
        "name": "track",
        "description": "Slider track."
      },
      {
        "name": "fill",
        "description": "Selected range fill."
      },
      {
        "name": "start",
        "description": "Start range input."
      },
      {
        "name": "end",
        "description": "End range input."
      },
      {
        "name": "ticks",
        "description": "Tick mark container."
      },
      {
        "name": "start-tooltip",
        "description": "Start value bubble."
      },
      {
        "name": "end-tooltip",
        "description": "End value bubble."
      },
      {
        "name": "labels",
        "description": "Min/max label row."
      },
      {
        "name": "help",
        "description": "Helper text container."
      },
      {
        "name": "error",
        "description": "Error text container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "track",
        "selected fill",
        "start thumb",
        "end thumb"
      ],
      "variants": [
        "default",
        "labels",
        "tooltips",
        "ticks",
        "formatted values",
        "plain track",
        "helper and error text"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "dragging",
        "disabled",
        "focused",
        "readonly",
        "invalid"
      ],
      "interactions": [
        "Thumbs should never cross; the component enforces ordered range values and clamps each edge to the allowed range.",
        "Filled range between thumbs remains visually clear while dragging.",
        "Ticks and tick labels should stay aligned to the selected range even when formatted as currency, units, or percent values.",
        "Readonly and invalid states should preserve range legibility while reducing interaction affordance."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calm range highlighting with soft thumb emphasis."
        ],
        "material": [
          "Uses stronger filled-track visibility and bolder active state."
        ],
        "fluent": [
          "Uses precise dual-thumb geometry and crisp active fill."
        ]
      },
      "devexpressParity": [
        "Support numeric range filtering and bounded selection workflows.",
        "Keep ordered values stable even when thumbs move toward each other."
      ]
    }
  },
  {
    "name": "calendar",
    "tag": "jarvis-calendar",
    "category": "forms",
    "description": "Interactive month calendar with single or multiple selection.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated selected ISO dates."
      },
      {
        "name": "selectionMode",
        "type": "\"single\" | \"multiple\"",
        "default": "single",
        "description": "Selection behavior."
      },
      {
        "name": "showWeekNumbers",
        "type": "boolean",
        "default": "false",
        "description": "Shows ISO-style week number rail."
      },
      {
        "name": "showTodayButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a footer action that jumps back to the current month."
      },
      {
        "name": "todayText",
        "type": "string",
        "default": "Today",
        "description": "Footer action label."
      },
      {
        "name": "min",
        "type": "string",
        "description": "Minimum selectable ISO date."
      },
      {
        "name": "max",
        "type": "string",
        "description": "Maximum selectable ISO date."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables navigation and selection."
      },
      {
        "name": "firstDayOfWeek",
        "type": "number",
        "default": "0",
        "description": "Offsets the weekday headers and grid start."
      },
      {
        "name": "selectWeekOnClick",
        "type": "boolean",
        "default": "false",
        "description": "Selecting a date selects the whole week in multiple mode."
      },
      {
        "name": "disabledDates",
        "type": "string",
        "description": "Comma-separated ISO dates that cannot be selected."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits the selected date list."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Calendar surface."
      },
      {
        "name": "header",
        "description": "Month navigation header."
      },
      {
        "name": "day",
        "description": "Day cell button."
      },
      {
        "name": "footer",
        "description": "Footer action row."
      },
      {
        "name": "today",
        "description": "Jump-to-today action."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "month header",
        "weekday row",
        "week number rail",
        "day cells"
      ],
      "variants": [
        "single-select",
        "multi-select",
        "week numbers",
        "constrained dates",
        "week-select",
        "today shortcut"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "selected",
        "today",
        "outside-month",
        "disabled"
      ],
      "interactions": [
        "Month navigation should preserve selection state where possible.",
        "Selected days remain obvious without overpowering the rest of the grid.",
        "Disabled dates and range limits should read as visibly unavailable.",
        "Optional footer actions should help users return to the current month without stealing focus from the grid."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses an airy date grid with softer emphasis and calmer selected states."
        ],
        "material": [
          "Uses clearer selected-day fills and stronger structural rhythm."
        ],
        "fluent": [
          "Uses practical grid lines, structured spacing, and crisp selected states."
        ]
      },
      "devexpressParity": [
        "Support basic scheduling and date selection inside forms or popovers.",
        "Keep the day grid readable at desktop and compact widths."
      ]
    }
  },
  {
    "name": "date-box",
    "tag": "jarvis-date-box",
    "category": "forms",
    "description": "Date, time, or date-time field with Jarvis styling.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "type",
        "type": "\"date\" | \"time\" | \"datetime-local\"",
        "default": "date",
        "description": "Input mode."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Current value."
      },
      {
        "name": "min",
        "type": "string",
        "description": "Minimum allowed value."
      },
      {
        "name": "max",
        "type": "string",
        "description": "Maximum allowed value."
      },
      {
        "name": "placeholder",
        "type": "string",
        "description": "Placeholder text."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Allows viewing without editing."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text shown when invalid."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a clear button."
      },
      {
        "name": "showDropDownButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the native picker affordance button."
      },
      {
        "name": "showTodayButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a shortcut button for the current date or time."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "false",
        "description": "Opens the native picker when the field is clicked."
      },
      {
        "name": "applyValueMode",
        "type": "\"instantly\" | \"useButtons\"",
        "default": "instantly",
        "description": "Either commits changes immediately or stages them until Apply is pressed."
      },
      {
        "name": "clearButtonText",
        "type": "string",
        "default": "Clear",
        "description": "Visible clear action label."
      },
      {
        "name": "openButtonText",
        "type": "string",
        "default": "Open",
        "description": "Visible picker action label."
      },
      {
        "name": "todayButtonText",
        "type": "string",
        "default": "Today",
        "description": "Shortcut button label used for date and datetime modes."
      },
      {
        "name": "nowButtonText",
        "type": "string",
        "default": "Now",
        "description": "Shortcut button label used for time mode."
      },
      {
        "name": "applyButtonText",
        "type": "string",
        "default": "Apply",
        "description": "Visible apply action label used in staged mode."
      },
      {
        "name": "cancelButtonText",
        "type": "string",
        "default": "Cancel",
        "description": "Visible cancel action label used in staged mode."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits after the value changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "control",
        "description": "Native date/time input."
      },
      {
        "name": "clear",
        "description": "Clear button."
      },
      {
        "name": "open",
        "description": "Native picker affordance button."
      },
      {
        "name": "today",
        "description": "Current date/time shortcut button."
      },
      {
        "name": "actions",
        "description": "Staged action row."
      },
      {
        "name": "apply",
        "description": "Staged apply action."
      },
      {
        "name": "cancel",
        "description": "Staged cancel action."
      },
      {
        "name": "help",
        "description": "Helper text container."
      },
      {
        "name": "error",
        "description": "Error text container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "field wrapper",
        "native input",
        "clear action",
        "commit action row",
        "helper or error text"
      ],
      "variants": [
        "date",
        "time",
        "datetime-local",
        "current-value shortcut",
        "helper and error text",
        "staged apply buttons"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "filled",
        "disabled",
        "readonly",
        "required",
        "invalid",
        "min/max constrained",
        "dirty"
      ],
      "interactions": [
        "Different native input modes share one consistent Jarvis shell.",
        "Optional clear button resets the value without altering min/max constraints.",
        "The picker affordance should stay available without crowding the field text.",
        "Shortcut actions like Today or Now should feel secondary but still easy to reach in data-entry flows.",
        "Button-apply mode should let users review a pending value before committing it."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer field treatment and calmer icon chrome."
        ],
        "material": [
          "Uses stronger field container definition and shaped state layers."
        ],
        "fluent": [
          "Uses stroke-led field framing with crisp utility actions."
        ]
      },
      "devexpressParity": [
        "Support date/time entry without introducing a heavy custom picker first.",
        "Keep the shell visually aligned with text fields and selects."
      ]
    }
  },
  {
    "name": "date-range-box",
    "tag": "jarvis-date-range-box",
    "category": "forms",
    "description": "Paired start and end date selection field.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "start",
        "type": "string",
        "default": "\"\"",
        "description": "Start date value."
      },
      {
        "name": "end",
        "type": "string",
        "default": "\"\"",
        "description": "End date value."
      },
      {
        "name": "min",
        "type": "string",
        "description": "Minimum allowed ISO date across the pair."
      },
      {
        "name": "max",
        "type": "string",
        "description": "Maximum allowed ISO date across the pair."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Allows viewing without editing."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the range as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the range as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the control."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text shown when invalid."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows the range reset action."
      },
      {
        "name": "showSummary",
        "type": "boolean",
        "default": "true",
        "description": "Shows the range summary and validation guidance."
      },
      {
        "name": "showPickerButtons",
        "type": "boolean",
        "default": "false",
        "description": "Shows explicit picker buttons beside the start and end inputs."
      },
      {
        "name": "openOnFieldClick",
        "type": "boolean",
        "default": "false",
        "description": "Opens the native picker when either field is clicked."
      },
      {
        "name": "applyValueMode",
        "type": "\"instantly\" | \"useButtons\"",
        "default": "instantly",
        "description": "Either commits changes immediately or stages the range until Apply is pressed."
      },
      {
        "name": "startLabel",
        "type": "string",
        "default": "Start date",
        "description": "Visible label for the first field."
      },
      {
        "name": "endLabel",
        "type": "string",
        "default": "End date",
        "description": "Visible label for the second field."
      },
      {
        "name": "startPlaceholder",
        "type": "string",
        "description": "Placeholder for the start field."
      },
      {
        "name": "endPlaceholder",
        "type": "string",
        "description": "Placeholder for the end field."
      },
      {
        "name": "clearButtonText",
        "type": "string",
        "default": "Clear",
        "description": "Visible range reset label."
      },
      {
        "name": "openButtonText",
        "type": "string",
        "default": "Open",
        "description": "Visible picker action label for each field."
      },
      {
        "name": "applyButtonText",
        "type": "string",
        "default": "Apply",
        "description": "Visible apply action label used in staged mode."
      },
      {
        "name": "cancelButtonText",
        "type": "string",
        "default": "Cancel",
        "description": "Visible cancel action label used in staged mode."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ start: string; end: string }",
        "description": "Emits after either value changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Date-range wrapper."
      },
      {
        "name": "start",
        "description": "Start date field."
      },
      {
        "name": "end",
        "description": "End date field."
      },
      {
        "name": "open-start",
        "description": "Start field picker action."
      },
      {
        "name": "open-end",
        "description": "End field picker action."
      },
      {
        "name": "clear",
        "description": "Range reset action."
      },
      {
        "name": "actions",
        "description": "Staged action row."
      },
      {
        "name": "apply",
        "description": "Staged apply action."
      },
      {
        "name": "cancel",
        "description": "Staged cancel action."
      },
      {
        "name": "help",
        "description": "Helper text container."
      },
      {
        "name": "error",
        "description": "Error text container."
      },
      {
        "name": "summary",
        "description": "Selected range summary."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "group label",
        "start field",
        "separator",
        "end field",
        "summary",
        "commit action row",
        "helper or error text"
      ],
      "variants": [
        "default",
        "with clear buttons",
        "explicit picker actions",
        "helper and error text",
        "staged apply buttons",
        "summary enabled"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "partial",
        "complete",
        "disabled",
        "readonly",
        "required",
        "invalid",
        "dirty"
      ],
      "interactions": [
        "Start and end values should read as one grouped control.",
        "Summary text should reinforce the selected range without replacing the actual fields.",
        "The second field should constrain itself relative to the first, and vice versa.",
        "Optional picker actions should remain aligned with the paired-field rhythm instead of looking bolted on.",
        "Button-apply mode should make staged date changes explicit."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses soft grouped-field treatment and editorial spacing."
        ],
        "material": [
          "Uses clearer grouped-container structure and stronger active field emphasis."
        ],
        "fluent": [
          "Uses pragmatic paired-field framing and crisp group labels."
        ]
      },
      "devexpressParity": [
        "Support travel, reporting, and scheduling flows that need paired dates.",
        "Keep start/end ordering and readability obvious."
      ]
    }
  },
  {
    "name": "file-uploader",
    "tag": "jarvis-file-uploader",
    "category": "forms",
    "description": "File picker with drag-drop, validation, and manual or instant upload states.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "description": "Visible label."
      },
      {
        "name": "accept",
        "type": "string",
        "description": "Accepted MIME types or extensions."
      },
      {
        "name": "multiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows multiple file selection."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text used when invalid is set externally."
      },
      {
        "name": "uploadMode",
        "type": "\"manual\" | \"instant\"",
        "default": "manual",
        "description": "Whether upload is triggered instantly or by button."
      },
      {
        "name": "dropzone",
        "type": "boolean",
        "default": "true",
        "description": "Enables drag-and-drop affordance."
      },
      {
        "name": "maxFiles",
        "type": "number",
        "default": "0",
        "description": "Maximum number of files allowed. Zero removes the limit."
      },
      {
        "name": "maxFileSize",
        "type": "number",
        "default": "0",
        "description": "Maximum file size in bytes. Zero removes the limit."
      },
      {
        "name": "showFileList",
        "type": "boolean",
        "default": "true",
        "description": "Shows or hides the selected file list."
      },
      {
        "name": "browseText",
        "type": "string",
        "default": "Select files",
        "description": "Browse-chip label."
      },
      {
        "name": "dropzoneHint",
        "type": "string",
        "default": "Or drag files here",
        "description": "Supporting dropzone hint text."
      },
      {
        "name": "uploadButtonText",
        "type": "string",
        "default": "Upload selected files",
        "description": "Manual upload button label."
      },
      {
        "name": "clearButtonText",
        "type": "string",
        "default": "Clear all",
        "description": "Clear action label."
      },
      {
        "name": "emptyStateText",
        "type": "string",
        "default": "No files selected yet.",
        "description": "Empty-state helper copy."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ files: string[] }",
        "description": "Emits after file selection changes."
      },
      {
        "name": "jarvisUpload",
        "detail": "{ files: string[] }",
        "description": "Emits when upload completes."
      },
      {
        "name": "jarvisReject",
        "detail": "{ files: string[]; reason: string }",
        "description": "Emits when files are rejected by validation rules."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Uploader container."
      },
      {
        "name": "label",
        "description": "Field label."
      },
      {
        "name": "dropzone",
        "description": "Drag-and-drop target area."
      },
      {
        "name": "list",
        "description": "Selected file list."
      },
      {
        "name": "upload-button",
        "description": "Manual upload action."
      },
      {
        "name": "help",
        "description": "Helper text container."
      },
      {
        "name": "error",
        "description": "Error text container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Validated uploader",
        "code": "<jarvis-file-uploader label=\"Attachments\" accept=\".png,.jpg,.pdf\" multiple max-files=\"3\" max-file-size=\"2000000\" help-text=\"Upload up to 3 files, each under 2 MB.\"></jarvis-file-uploader>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "dropzone",
        "browse action",
        "constraint chips",
        "file list",
        "status row",
        "helper or error text"
      ],
      "variants": [
        "manual upload",
        "instant upload",
        "validated dropzone",
        "list hidden"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "empty",
        "files selected",
        "uploading",
        "uploaded",
        "invalid",
        "disabled"
      ],
      "interactions": [
        "Dropzone should react visibly when files are dragged over it.",
        "Accepted and rejected files should be easy to distinguish without reading console output or hidden status text.",
        "Manual upload mode should not make a selected file look complete before upload begins.",
        "Upload progress feedback should remain readable for one or many files."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer drop surfaces and friendlier progress feedback."
        ],
        "material": [
          "Uses stronger container boundaries and more explicit active states."
        ],
        "fluent": [
          "Uses practical dropzone framing and crisp progress rows."
        ]
      },
      "devexpressParity": [
        "Support form attachments and drag-drop workflows.",
        "Expose selection, rejection, and upload lifecycle events to hosts.",
        "Match the DevExpress uploader expectation for validation, staged upload, and visible file-state rows."
      ]
    }
  },
  {
    "name": "tree-view",
    "tag": "jarvis-tree-view",
    "category": "navigation",
    "description": "Expandable hierarchical navigation and selection tree.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated tree paths."
      },
      {
        "name": "selectionMode",
        "type": "\"single\" | \"multiple\"",
        "default": "single",
        "description": "Selection behavior."
      },
      {
        "name": "searchEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Shows a client-side search field."
      },
      {
        "name": "searchMode",
        "type": "\"contains\" | \"startsWith\" | \"equals\"",
        "default": "contains",
        "description": "Controls whether search matches anywhere, only at the start, or by exact node label."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "Search tree",
        "description": "Placeholder text for the search field."
      },
      {
        "name": "emptyStateText",
        "type": "string",
        "default": "No matching nodes.",
        "description": "Copy shown when filtering produces no visible nodes."
      },
      {
        "name": "showToolbar",
        "type": "boolean",
        "default": "false",
        "description": "Shows expand-all and collapse-all controls above the tree."
      },
      {
        "name": "showSelectAll",
        "type": "boolean",
        "default": "false",
        "description": "Adds visible bulk-select and clear actions for the currently filtered node set."
      },
      {
        "name": "selectAllText",
        "type": "string",
        "default": "Select visible",
        "description": "Label used for the visible-node bulk select action."
      },
      {
        "name": "clearSelectionText",
        "type": "string",
        "default": "Clear",
        "description": "Label used for the clear selection action."
      },
      {
        "name": "showStatus",
        "type": "boolean",
        "default": "false",
        "description": "Shows visible-node and selected-node counts below the search field."
      },
      {
        "name": "selected",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated selected path values."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "Tree view",
        "description": "Accessible label applied to the tree root."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ values: string[] }",
        "description": "Emits selected path values."
      },
      {
        "name": "jarvisToggle",
        "detail": "{ value: string; expanded: boolean }",
        "description": "Emits when a branch expands or collapses."
      }
    ],
    "methods": [
      {
        "name": "expandAll()",
        "description": "Expands all branch nodes."
      },
      {
        "name": "collapseAll()",
        "description": "Collapses all branch nodes."
      },
      {
        "name": "selectAllVisible()",
        "description": "Selects all currently visible nodes when multiple selection is enabled."
      },
      {
        "name": "clearSelection()",
        "description": "Clears the current tree selection."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Tree container."
      },
      {
        "name": "toolbar",
        "description": "Tree action toolbar."
      },
      {
        "name": "expand-all",
        "description": "Expand all control."
      },
      {
        "name": "collapse-all",
        "description": "Collapse all control."
      },
      {
        "name": "search",
        "description": "Search field."
      },
      {
        "name": "status",
        "description": "Visible and selected count summary."
      },
      {
        "name": "node",
        "description": "Tree node row."
      },
      {
        "name": "children",
        "description": "Nested child group."
      },
      {
        "name": "empty",
        "description": "Empty state shown when search returns no matches."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state.",
      "Uses nested button rows to expose expandable hierarchy and selection state.",
      "Supports search filtering for large hierarchies."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "toolbar",
        "search field",
        "status row",
        "node row",
        "expander",
        "label",
        "children group",
        "bulk action row"
      ],
      "variants": [
        "single-select",
        "multi-select",
        "search",
        "status summary",
        "toolbar controls",
        "bulk visible selection"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "collapsed",
        "expanded",
        "selected",
        "filtered",
        "mixed selection",
        "bulk-selected visible set"
      ],
      "interactions": [
        "Tree rows should support expansion without collapsing sibling state unexpectedly.",
        "Search filtering should retain only matching branches and their parents.",
        "Bulk selection should respect the filtered visibility state so users can refine before selecting."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer hierarchy lines and quieter node emphasis."
        ],
        "material": [
          "Uses clearer selected-state treatment and denser row rhythm."
        ],
        "fluent": [
          "Uses practical file-explorer-like hierarchy and crisp expanders."
        ]
      },
      "devexpressParity": [
        "Support file trees, navigation hierarchies, and nested category selection.",
        "Keep expansion, selection, filtering, and visible-node bulk actions coherent together."
      ]
    }
  },
  {
    "name": "drop-down-button",
    "tag": "jarvis-drop-down-button",
    "category": "actions",
    "description": "Button that opens a structured action menu.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "Action",
        "description": "Visible button label."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated action items. Use `Label|value|danger|Description` to add value, tone, and helper text per row."
      },
      {
        "name": "icon",
        "type": "string",
        "description": "Optional leading icon glyph or token."
      },
      {
        "name": "variant",
        "type": "\"solid\" | \"outline\" | \"ghost\"",
        "default": "outline",
        "description": "Button chrome."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\"",
        "default": "md",
        "description": "Button size."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "splitButton",
        "type": "boolean",
        "default": "false",
        "description": "Separates the primary action from the menu toggle button."
      },
      {
        "name": "showDescriptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows supporting copy under action labels inside the menu."
      },
      {
        "name": "showSelectionIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Marks the currently selected action inside the menu."
      },
      {
        "name": "showArrowIcon",
        "type": "boolean",
        "default": "true",
        "description": "Shows the chevron affordance on the trigger or toggle button."
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "default": "true",
        "description": "Closes the menu after selecting an action."
      },
      {
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Currently selected action value."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"Drop-down button\"",
        "description": "Accessible label for the trigger."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ value: string }",
        "description": "Emits the selected action value."
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "Opens the action menu and focuses the first enabled row."
      },
      {
        "name": "hide",
        "description": "Closes the action menu."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Overall shell."
      },
      {
        "name": "trigger",
        "description": "Button trigger."
      },
      {
        "name": "panel",
        "description": "Dropdown menu panel."
      },
      {
        "name": "item",
        "description": "Action row."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Standalone menu trigger",
        "code": "<jarvis-drop-down-button label=\"Download Trial\" items=\"Download||success|Export the latest evaluation build.; Share preview||default|Send the link to reviewers.; Archive draft||warning|Move the current draft out of the active queue.; Delete workspace||danger|Permanently remove the current draft.\"></jarvis-drop-down-button>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "trigger button",
        "leading icon",
        "label",
        "chevron",
        "menu panel",
        "menu item"
      ],
      "variants": [
        "standalone trigger",
        "split button",
        "icon leading",
        "outline trigger",
        "descriptive actions"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "open",
        "selected",
        "disabled",
        "danger action"
      ],
      "interactions": [
        "Trigger and menu should feel like one composed control.",
        "Menu closes after selection or outside interaction.",
        "Button alignment should remain stable whether an icon is present or not.",
        "Split-button mode should preserve a primary action while exposing secondary menu choices."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer menu chrome and softer button framing."
        ],
        "material": [
          "Uses clearer filled or outlined hierarchy with stronger active rows."
        ],
        "fluent": [
          "Uses command-surface styling with crisp menu dividers and practical density."
        ]
      },
      "devexpressParity": [
        "Cover standalone action triggers, toolbar menu buttons, and download or share flows.",
        "Match the DevExpress-style drop-down button pattern for common command menus."
      ]
    }
  },
  {
    "name": "popup",
    "tag": "jarvis-popup",
    "category": "overlays",
    "description": "Modal popup surface for focused detail or confirmation flows.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Shows the popup."
      },
      {
        "name": "heading",
        "type": "string",
        "default": "Popup",
        "description": "Visible title in the header."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Optional supporting copy under the heading."
      },
      {
        "name": "ariaDescription",
        "type": "string",
        "description": "Accessible description announced with the popup."
      },
      {
        "name": "eyebrow",
        "type": "string",
        "description": "Compact editorial label shown above the heading."
      },
      {
        "name": "status",
        "type": "string",
        "description": "Inline status pill text shown beside the heading."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Dismisses on backdrop click."
      },
      {
        "name": "showCloseButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the close icon button."
      },
      {
        "name": "showOverlay",
        "type": "boolean",
        "default": "true",
        "description": "Shows the dimmed backdrop."
      },
      {
        "name": "hideOnEscape",
        "type": "boolean",
        "default": "true",
        "description": "Dismisses with Escape."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "default": "md",
        "description": "Popup width preset."
      },
      {
        "name": "position",
        "type": "\"center\" | \"top\" | \"bottom\"",
        "default": "center",
        "description": "Panel alignment inside the viewport."
      },
      {
        "name": "width",
        "type": "string",
        "description": "Custom width override, for example `32rem` or `80vw`."
      },
      {
        "name": "height",
        "type": "string",
        "description": "Custom height override, for example `28rem`."
      },
      {
        "name": "fullScreen",
        "type": "boolean",
        "default": "false",
        "description": "Expands the popup to the available viewport."
      },
      {
        "name": "tone",
        "type": "\"neutral\" | \"success\" | \"warning\" | \"danger\"",
        "default": "neutral",
        "description": "Accent tone used for the status stripe and pill styling."
      },
      {
        "name": "showHeader",
        "type": "boolean",
        "default": "true",
        "description": "Shows the popup header block."
      },
      {
        "name": "showFooter",
        "type": "boolean",
        "default": "true",
        "description": "Shows the footer when a footer slot is present."
      },
      {
        "name": "stickyFooter",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the footer pinned to the bottom while the body scrolls."
      },
      {
        "name": "showHandle",
        "type": "boolean",
        "default": "false",
        "description": "Shows a drag handle accent for bottom-sheet style popups."
      },
      {
        "name": "closeLabel",
        "type": "string",
        "default": "Close popup",
        "description": "Accessible label for the close button."
      },
      {
        "name": "initialFocus",
        "type": "\"panel\" | \"close\"",
        "default": "panel",
        "description": "Controls whether focus lands on the panel or the close button when opening."
      },
      {
        "name": "bodyPadding",
        "type": "\"comfortable\" | \"none\"",
        "default": "comfortable",
        "description": "Controls the padding around the body slot."
      },
      {
        "name": "maxHeight",
        "type": "string",
        "description": "Custom maximum panel height, for example `36rem` or `90vh`."
      }
    ],
    "events": [
      {
        "name": "jarvisOpen",
        "detail": "void",
        "description": "Emits when the popup opens."
      },
      {
        "name": "jarvisClose",
        "detail": "{ reason: \"dismiss\" | \"programmatic\" }",
        "description": "Emits when the popup closes."
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "Shows the popup and restores focus management."
      },
      {
        "name": "hide",
        "description": "Hides the popup and restores prior focus."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Main body content."
      },
      {
        "name": "subtitle",
        "description": "Optional subtitle under the heading."
      },
      {
        "name": "footer",
        "description": "Footer actions."
      }
    ],
    "parts": [
      {
        "name": "overlay",
        "description": "Backdrop overlay."
      },
      {
        "name": "panel",
        "description": "Popup panel."
      },
      {
        "name": "handle",
        "description": "Bottom-sheet grab handle."
      },
      {
        "name": "header",
        "description": "Header row."
      },
      {
        "name": "subtitle",
        "description": "Subtitle slot wrapper."
      },
      {
        "name": "status",
        "description": "Inline status pill."
      },
      {
        "name": "body",
        "description": "Content area."
      },
      {
        "name": "footer",
        "description": "Footer action row."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Editorial popup",
        "code": "<jarvis-popup open heading=\"Information\" eyebrow=\"Workspace summary\" status=\"Live\" description=\"Use popups for deeper task details and focused content.\" sticky-footer><span slot=\"subtitle\">652 Avonwick Gate</span><p>Keep the popup structured when the content includes both context and actions.</p><div slot=\"footer\"><jarvis-button variant=\"outline\">Send</jarvis-button><jarvis-button>Close</jarvis-button></div></jarvis-popup>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "backdrop",
        "panel",
        "handle",
        "header",
        "eyebrow",
        "title",
        "status pill",
        "body",
        "footer",
        "close button"
      ],
      "variants": [
        "information",
        "detail card",
        "confirmation",
        "media style",
        "fullscreen"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "open",
        "dismissible",
        "focused",
        "body padding none"
      ],
      "interactions": [
        "Popup traps focus while open and closes with Escape.",
        "Backdrop click follows the closeOnOutsideClick contract.",
        "Header and footer regions should remain stable as content length changes.",
        "Opening focus should be explicit so keyboard users land on the close affordance or panel content predictably."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer glass-like modal surfaces and calmer shadow depth."
        ],
        "material": [
          "Uses flatter sheet-like modal framing with stronger state clarity."
        ],
        "fluent": [
          "Uses crisp acrylic-style layering and structured header chrome."
        ]
      },
      "devexpressParity": [
        "Cover information popups, employee details, bottom-sheet variants, and lightweight modal workflows.",
        "Match the DevExpress popup feel for centered modal content with header, status, and footer regions."
      ]
    }
  },
  {
    "name": "action-sheet",
    "tag": "jarvis-action-sheet",
    "category": "overlays",
    "description": "Bottom sheet or contextual action list for task-specific commands.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Shows the action sheet."
      },
      {
        "name": "heading",
        "type": "string",
        "default": "Choose action",
        "description": "Sheet heading."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Optional supporting description text."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated action items. Use grouped labels or `Label|value|danger|Description` metadata to surface helper copy and destructive actions."
      },
      {
        "name": "value",
        "type": "string",
        "description": "Selected action path value."
      },
      {
        "name": "presentation",
        "type": "\"sheet\" | \"popover\"",
        "default": "sheet",
        "description": "How the action list is presented."
      },
      {
        "name": "showCancelButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows the cancel action."
      },
      {
        "name": "cancelText",
        "type": "string",
        "default": "Cancel",
        "description": "Cancel button label."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "true",
        "description": "Dismisses when clicking outside the panel."
      },
      {
        "name": "showHandle",
        "type": "boolean",
        "default": "true",
        "description": "Shows the drag handle in sheet mode."
      },
      {
        "name": "width",
        "type": "string",
        "description": "Custom panel width, primarily for popover mode."
      },
      {
        "name": "showDescriptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows supporting copy under each action when descriptions are provided."
      },
      {
        "name": "showSelectionIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Shows a selected-state indicator on the remembered action."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ value: string }",
        "description": "Emits the chosen action."
      },
      {
        "name": "jarvisCancel",
        "detail": "void",
        "description": "Emits when the sheet is dismissed as a cancel action."
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "Shows the action sheet."
      },
      {
        "name": "hide",
        "description": "Hides the action sheet."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "overlay",
        "description": "Backdrop overlay."
      },
      {
        "name": "panel",
        "description": "Sheet or popover panel."
      },
      {
        "name": "actions",
        "description": "Action list."
      },
      {
        "name": "cancel-button",
        "description": "Cancel button."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Action sheet",
        "code": "<jarvis-action-sheet open heading=\"Choose action\" items=\"Communication/Call||default|Start a voice call.; Communication/Send message||default|Open the threaded composer.; Review/Request approval||success|Notify approvers.; Danger/Delete draft||danger|This cannot be undone.\"></jarvis-action-sheet>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "backdrop",
        "sheet panel",
        "heading",
        "action row",
        "selection indicator",
        "cancel action"
      ],
      "variants": [
        "sheet",
        "popover",
        "descriptive actions"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "open",
        "cancel shown",
        "cancel hidden",
        "danger action",
        "disabled action"
      ],
      "interactions": [
        "Actions should be easy to scan and tap in both sheet and popover presentation.",
        "Cancel dismissal must be clearly separated from destructive actions.",
        "Remembering the last chosen action helps repeated workflows feel faster and more confident.",
        "Selection indicators should stay readable and avoid decorative glyph artifacts in dense command lists."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer mobile-sheet framing and calmer button surfaces."
        ],
        "material": [
          "Uses stronger list hierarchy and clearer destructive separation."
        ],
        "fluent": [
          "Uses practical command-sheet density with crisp edges and rows."
        ]
      },
      "devexpressParity": [
        "Cover mobile bottom sheets and contextual popover action menus.",
        "Match the DevExpress-style action sheet for quick task actions.",
        "Support approval, escalation, archive, and destructive-task workflows without losing scanability."
      ]
    }
  },
  {
    "name": "color-box",
    "tag": "jarvis-color-box",
    "category": "forms",
    "description": "Color picker field with optional alpha-channel editing.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible field label."
      },
      {
        "name": "value",
        "type": "string",
        "default": "#f05b41",
        "description": "Current color value."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents opening the picker."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as required."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Marks the field as invalid."
      },
      {
        "name": "helpText",
        "type": "string",
        "description": "Helper text shown beneath the field."
      },
      {
        "name": "errorText",
        "type": "string",
        "description": "Error text shown when invalid."
      },
      {
        "name": "editAlphaChannel",
        "type": "boolean",
        "default": "false",
        "description": "Shows alpha editing controls."
      },
      {
        "name": "showApplyButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows explicit Apply and Cancel actions."
      },
      {
        "name": "applyButtonText",
        "type": "string",
        "default": "Apply",
        "description": "Custom apply action label."
      },
      {
        "name": "cancelButtonText",
        "type": "string",
        "default": "Cancel",
        "description": "Custom cancel action label."
      },
      {
        "name": "presets",
        "type": "string",
        "description": "Comma- or semicolon-separated preset hex values."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits the selected color value."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Field wrapper."
      },
      {
        "name": "label",
        "description": "Field label."
      },
      {
        "name": "trigger",
        "description": "Closed field trigger."
      },
      {
        "name": "swatch",
        "description": "Current color swatch."
      },
      {
        "name": "value",
        "description": "Closed trigger value text."
      },
      {
        "name": "panel",
        "description": "Picker dropdown surface."
      },
      {
        "name": "color-input",
        "description": "Native color input."
      },
      {
        "name": "presets",
        "description": "Preset swatch row."
      },
      {
        "name": "preset",
        "description": "Individual preset swatch."
      },
      {
        "name": "help",
        "description": "Helper text container."
      },
      {
        "name": "error",
        "description": "Error text container."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Default color picker",
        "code": "<jarvis-color-box label=\"Accent color\" value=\"#f05b41\"></jarvis-color-box>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "label",
        "closed trigger",
        "swatch",
        "text value",
        "picker panel",
        "preset swatches",
        "apply row",
        "helper or error text"
      ],
      "variants": [
        "default",
        "alpha channel",
        "apply button",
        "preset swatches",
        "helper and error text"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "open",
        "read-only",
        "disabled",
        "required",
        "invalid"
      ],
      "interactions": [
        "Closed trigger should preview the active color clearly.",
        "Apply-button mode should allow review before committing a change.",
        "Alpha editing must keep the textual value legible.",
        "Preset swatches should allow quick theme selection without hiding the free-form picker.",
        "Validation and helper text should align with the rest of the Jarvis field family."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer swatches and soft field framing suited to premium theming work."
        ],
        "material": [
          "Uses stronger active borders and more explicit control grouping."
        ],
        "fluent": [
          "Uses practical utility-picker framing and precise field chrome."
        ]
      },
      "devexpressParity": [
        "Support theme picking, brand controls, and settings-style color fields.",
        "Match the DevExpress color-box feel with both simple and alpha-enabled editing."
      ]
    }
  },
  {
    "name": "gallery",
    "tag": "jarvis-gallery",
    "category": "data-display",
    "description": "Media gallery with slideshow, indicators, and navigation buttons.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated slides using `Title~Subtitle~Meta|color1,color2` syntax."
      },
      {
        "name": "loop",
        "type": "boolean",
        "default": "true",
        "description": "Loops the gallery when reaching the end."
      },
      {
        "name": "showNavButtons",
        "type": "boolean",
        "default": "true",
        "description": "Shows previous and next controls."
      },
      {
        "name": "showIndicators",
        "type": "boolean",
        "default": "true",
        "description": "Shows slide indicators."
      },
      {
        "name": "showCaptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows the caption section beneath the viewport."
      },
      {
        "name": "showThumbnails",
        "type": "boolean",
        "default": "false",
        "description": "Shows the thumbnail chooser list."
      },
      {
        "name": "slideShow",
        "type": "boolean",
        "default": "false",
        "description": "Automatically advances slides."
      },
      {
        "name": "slideShowDelay",
        "type": "number",
        "default": "3200",
        "description": "Autoplay interval in milliseconds."
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "default": "false",
        "description": "Pauses autoplay while the pointer hovers the gallery."
      },
      {
        "name": "keyboardNavigation",
        "type": "boolean",
        "default": "true",
        "description": "Enables Left, Right, Home, and End keyboard controls."
      },
      {
        "name": "height",
        "type": "string",
        "description": "Optional custom viewport height, for example `28rem`."
      },
      {
        "name": "startIndex",
        "type": "number",
        "default": "0",
        "description": "Initial slide index."
      },
      {
        "name": "thumbnailPosition",
        "type": "\"bottom\" | \"side\"",
        "default": "bottom",
        "description": "Places thumbnails below the viewport or in a side rail."
      },
      {
        "name": "showCounter",
        "type": "boolean",
        "default": "false",
        "description": "Shows the active slide count in the viewport."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ index: number; title: string }",
        "description": "Emits when the selected slide changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Gallery shell."
      },
      {
        "name": "viewport",
        "description": "Slide viewport."
      },
      {
        "name": "slide",
        "description": "Active slide."
      },
      {
        "name": "caption",
        "description": "Caption block shown beneath the viewport."
      },
      {
        "name": "thumbnails",
        "description": "Thumbnail button list."
      },
      {
        "name": "thumbnail",
        "description": "Individual thumbnail button."
      },
      {
        "name": "counter",
        "description": "Slide count badge rendered inside the viewport."
      },
      {
        "name": "prev-button",
        "description": "Previous navigation button."
      },
      {
        "name": "next-button",
        "description": "Next navigation button."
      },
      {
        "name": "indicator",
        "description": "Slide indicator dot."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Editorial gallery",
        "code": "<jarvis-gallery items=\"Coastal residence~Oceanfront suite with panoramic windows~Featured stay|#dbeafe,#93c5fd; Downtown studio~Creative review room and lounge~Urban workspace|#e0f2fe,#38bdf8; Forest retreat~Calm woodland lodge with spa access~Wellness escape|#dcfce7,#22c55e\" show-thumbnails thumbnail-position=\"side\" show-counter pause-on-hover></jarvis-gallery>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "viewport",
        "slide surface",
        "media grid",
        "caption overlay",
        "caption rail",
        "thumbnail rail",
        "nav buttons",
        "indicator row"
      ],
      "variants": [
        "manual navigation",
        "autoplay",
        "captions",
        "thumbnails",
        "side rail",
        "counter"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "first slide",
        "middle slide",
        "looping",
        "autoplay",
        "hover paused",
        "keyboard focused"
      ],
      "interactions": [
        "Navigation buttons and indicators must stay readable over rich imagery.",
        "Autoplay should pause or feel predictable instead of rushing the user.",
        "Caption and thumbnail metadata should support scanning without turning the gallery into a plain list."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer captions and atmospheric premium media framing."
        ],
        "material": [
          "Uses clearer surface layers and stronger indicator emphasis."
        ],
        "fluent": [
          "Uses practical media viewer controls with crisp navigation affordances."
        ]
      },
      "devexpressParity": [
        "Support gallery hero areas, media previews, and carousel-style showcases.",
        "Match the DevExpress gallery feel for slideshow, navigation, and indicators."
      ]
    }
  },
  {
    "name": "load-indicator",
    "tag": "jarvis-load-indicator",
    "category": "feedback",
    "description": "Lightweight indeterminate loading indicator.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "type",
        "type": "\"ring\" | \"dots\" | \"bars\"",
        "default": "ring",
        "description": "Indicator visual style."
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "default": "md",
        "description": "Indicator size."
      },
      {
        "name": "visible",
        "type": "boolean",
        "default": "true",
        "description": "Shows or hides the indicator."
      },
      {
        "name": "label",
        "type": "string",
        "default": "Loading",
        "description": "Accessible status label."
      },
      {
        "name": "message",
        "type": "string",
        "description": "Visible status copy shown alongside the indicator."
      },
      {
        "name": "showLabel",
        "type": "boolean",
        "default": "false",
        "description": "Shows the visible message text."
      },
      {
        "name": "layout",
        "type": "\"inline\" | \"stacked\"",
        "default": "inline",
        "description": "Places the label beside or beneath the indicator."
      }
    ],
    "events": [],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Indicator root element."
      },
      {
        "name": "message",
        "description": "Visible status label."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Stacked indicator",
        "code": "<jarvis-load-indicator type=\"ring\" size=\"lg\" layout=\"stacked\" show-label message=\"Syncing data\"></jarvis-load-indicator>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "indicator root",
        "animated ring/dots/bars",
        "optional message"
      ],
      "variants": [
        "ring",
        "dots",
        "bars",
        "stacked label"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "visible",
        "hidden"
      ],
      "interactions": [
        "Indicators should stay subtle and never overpower the primary task surface.",
        "Motion must remain readable under reduced-motion settings.",
        "Visible labels should help explain status without forcing surrounding copy to do the entire job."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer premium motion and softer stroke treatment."
        ],
        "material": [
          "Uses stronger geometric motion with clearer active energy."
        ],
        "fluent": [
          "Uses lightweight utility-style motion and crisp geometry."
        ]
      },
      "devexpressParity": [
        "Cover inline loading, blocking overlays, and button or card progress states.",
        "Match the DevExpress load-indicator family with multiple indicator styles and sizes."
      ]
    }
  },
  {
    "name": "load-panel",
    "tag": "jarvis-load-panel",
    "category": "overlays",
    "description": "Blocking or non-blocking loading overlay layered over content.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "visible",
        "type": "boolean",
        "default": "false",
        "description": "Shows the load panel."
      },
      {
        "name": "heading",
        "type": "string",
        "description": "Optional heading shown above the supporting copy."
      },
      {
        "name": "message",
        "type": "string",
        "default": "Loading...",
        "description": "Loading message."
      },
      {
        "name": "description",
        "type": "string",
        "description": "Optional supporting description."
      },
      {
        "name": "indicatorType",
        "type": "\"ring\" | \"dots\" | \"bars\"",
        "default": "ring",
        "description": "Indicator style."
      },
      {
        "name": "indicatorSize",
        "type": "\"sm\" | \"md\" | \"lg\" | \"xl\"",
        "default": "md",
        "description": "Indicator size."
      },
      {
        "name": "showIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Shows the loading indicator."
      },
      {
        "name": "showPane",
        "type": "boolean",
        "default": "true",
        "description": "Shows the centered loading pane."
      },
      {
        "name": "showOverlay",
        "type": "boolean",
        "default": "true",
        "description": "Shows the backdrop overlay."
      },
      {
        "name": "progressValue",
        "type": "number",
        "default": "-1",
        "description": "Optional determinate progress value. Negative values hide the progress bar."
      },
      {
        "name": "showCancelButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a cancel action inside the pane."
      },
      {
        "name": "cancelLabel",
        "type": "string",
        "default": "Cancel",
        "description": "Cancel action label."
      },
      {
        "name": "closeOnOutsideClick",
        "type": "boolean",
        "default": "false",
        "description": "Allows dismissing the panel by clicking outside."
      }
    ],
    "events": [
      {
        "name": "jarvisVisibilityChange",
        "detail": "{ visible: boolean }",
        "description": "Emits when visibility changes."
      },
      {
        "name": "jarvisCancel",
        "detail": "void",
        "description": "Emits when the inline cancel action is invoked."
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "Shows the load panel."
      },
      {
        "name": "hide",
        "description": "Hides the load panel."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Content over which the load panel is layered."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Overall shell."
      },
      {
        "name": "content",
        "description": "Underlying content region."
      },
      {
        "name": "overlay",
        "description": "Overlay surface."
      },
      {
        "name": "panel",
        "description": "Centered loading pane."
      },
      {
        "name": "indicator",
        "description": "Indicator container."
      },
      {
        "name": "heading",
        "description": "Loading heading text."
      },
      {
        "name": "message",
        "description": "Loading message text."
      },
      {
        "name": "description",
        "description": "Supporting description text."
      },
      {
        "name": "progress",
        "description": "Inline determinate progress bar."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Blocking load panel",
        "code": "<jarvis-load-panel visible heading=\"Loading employee profile\" message=\"Fetching records and recent activity\" description=\"This usually takes a few seconds.\" progress-value=\"72\" show-cancel-button></jarvis-load-panel>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "content region",
        "overlay",
        "loading pane",
        "indicator",
        "heading",
        "message",
        "description",
        "progress",
        "cancel action"
      ],
      "variants": [
        "full overlay",
        "indicator hidden",
        "minimal pane",
        "determinate progress",
        "cancel action"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "hidden",
        "visible",
        "dismissible",
        "blocking",
        "non-blocking"
      ],
      "interactions": [
        "Load panel must clearly communicate blocked content without permanently obscuring context.",
        "Indicator and message should remain centered and readable at different content sizes.",
        "Supporting description and progress should help explain whether work is queued, in flight, or nearly complete."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer overlays and calmer panel chrome."
        ],
        "material": [
          "Uses stronger overlay contrast and more explicit busy states."
        ],
        "fluent": [
          "Uses practical translucent overlays and crisp load panes."
        ]
      },
      "devexpressParity": [
        "Cover loading entire cards, detail panes, and blocking data requests.",
        "Match the DevExpress load-panel pattern with overlay, pane, and indicator options."
      ]
    }
  },
  {
    "name": "scroll-view",
    "tag": "jarvis-scroll-view",
    "category": "layout",
    "description": "Scrollable viewport with bottom-reach events and configurable scrollbar treatment.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "height",
        "type": "string",
        "default": "18rem",
        "description": "Viewport height."
      },
      {
        "name": "direction",
        "type": "\"vertical\" | \"horizontal\" | \"both\"",
        "default": "vertical",
        "description": "Scroll direction."
      },
      {
        "name": "showScrollbar",
        "type": "\"always\" | \"on-hover\" | \"on-scroll\" | \"never\"",
        "default": "on-scroll",
        "description": "Scrollbar visibility strategy."
      },
      {
        "name": "scrollByContent",
        "type": "boolean",
        "default": "true",
        "description": "Allows standard content scrolling."
      },
      {
        "name": "scrollByThumb",
        "type": "boolean",
        "default": "true",
        "description": "Allows dragging the thumb."
      },
      {
        "name": "reachOffset",
        "type": "number",
        "default": "32",
        "description": "Distance from the bottom that triggers reach-bottom."
      },
      {
        "name": "showShadows",
        "type": "boolean",
        "default": "true",
        "description": "Shows top and bottom edge shadows while content overflows."
      },
      {
        "name": "topStatusText",
        "type": "string",
        "default": "\"Top reached\"",
        "description": "Status text shown after returning to the start of the content."
      },
      {
        "name": "bottomStatusText",
        "type": "string",
        "default": "\"More content below\"",
        "description": "Status text shown while additional content remains below the viewport."
      },
      {
        "name": "showRefreshButton",
        "type": "boolean",
        "default": "false",
        "description": "Shows a refresh action in the status row."
      },
      {
        "name": "refreshLabel",
        "type": "string",
        "default": "\"Refresh\"",
        "description": "Label used by the refresh action."
      },
      {
        "name": "refreshing",
        "type": "boolean",
        "default": "false",
        "description": "Shows a disabled refreshing state for the action button."
      }
    ],
    "events": [
      {
        "name": "jarvisScroll",
        "detail": "{ top: number; left: number }",
        "description": "Emits scroll position updates."
      },
      {
        "name": "jarvisReachBottom",
        "detail": "void",
        "description": "Emits when the viewport approaches the bottom."
      },
      {
        "name": "jarvisReachTop",
        "detail": "void",
        "description": "Emits when the viewport returns to the top."
      },
      {
        "name": "jarvisRefresh",
        "detail": "void",
        "description": "Emits when the refresh action is invoked."
      }
    ],
    "methods": [
      {
        "name": "scrollToTop",
        "description": "Smooth-scrolls to the top."
      },
      {
        "name": "scrollToBottom",
        "description": "Smooth-scrolls to the bottom."
      },
      {
        "name": "scrollToPosition(top, left)",
        "description": "Scrolls to a specific top and left position."
      },
      {
        "name": "refresh()",
        "description": "Emits the refresh event programmatically."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Scrollable content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Scroll-view frame."
      },
      {
        "name": "viewport",
        "description": "Actual scroll container."
      },
      {
        "name": "content",
        "description": "Scrollable content surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Vertical scroll view",
        "code": "<jarvis-scroll-view height=\"20rem\"><div>Scrollable content</div></jarvis-scroll-view>"
      },
      {
        "title": "Scrollable workspace with refresh",
        "code": "<jarvis-scroll-view height=\"18rem\" show-refresh-button refresh-label=\"Reload feed\"></jarvis-scroll-view>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "frame",
        "viewport",
        "scrollable content"
      ],
      "variants": [
        "vertical",
        "horizontal",
        "both"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "top",
        "middle",
        "reached bottom"
      ],
      "interactions": [
        "Scrollbars should match theme density without dominating the content.",
        "Reach-bottom behavior should be predictable for lazy loading or infinite lists.",
        "Edge shadows and status text should reinforce scroll position without overwhelming the content.",
        "Refresh affordances should sit in the utility row instead of covering the content surface."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses quieter scroll chrome and gentler framing."
        ],
        "material": [
          "Uses clearer container framing and more explicit utility styling."
        ],
        "fluent": [
          "Uses practical pane styling and crisp scrollbar affordances."
        ]
      },
      "devexpressParity": [
        "Cover long-form content panes, kanban boards, and inspector panels.",
        "Match the DevExpress scroll-view concept for structured scrollable regions."
      ]
    }
  },
  {
    "name": "tab-panel",
    "tag": "jarvis-tab-panel",
    "category": "navigation",
    "description": "Tabs plus synchronized panel content for grouped task or workflow views.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Comma-separated tab labels."
      },
      {
        "name": "current",
        "type": "number",
        "default": "0",
        "description": "Selected tab index."
      },
      {
        "name": "tabPosition",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "default": "top",
        "description": "Tab rail position."
      },
      {
        "name": "stylingMode",
        "type": "\"primary\" | \"secondary\"",
        "default": "secondary",
        "description": "Visual styling mode."
      },
      {
        "name": "iconPosition",
        "type": "\"start\" | \"top\"",
        "default": "start",
        "description": "Icon position relative to labels."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables selection changes."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Locks the current tab while keeping the panel readable."
      },
      {
        "name": "disabledTabs",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated tab labels or indexes that should be disabled."
      },
      {
        "name": "badges",
        "type": "string",
        "default": "\"\"",
        "description": "Comma-separated badge values aligned to tab order."
      },
      {
        "name": "showTaskMeta",
        "type": "boolean",
        "default": "true",
        "description": "Shows supporting metadata for the generated panel cards."
      },
      {
        "name": "showNavButtons",
        "type": "boolean",
        "default": "false",
        "description": "Shows previous and next navigation buttons in the panel header."
      },
      {
        "name": "loop",
        "type": "boolean",
        "default": "false",
        "description": "Wraps navigation from the last tab back to the first."
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "default": "false",
        "description": "Stretches tab triggers evenly across the available width."
      },
      {
        "name": "height",
        "type": "string",
        "default": "\"\"",
        "description": "Optional minimum panel height, for example `26rem`."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"Tab panel\"",
        "description": "Accessible label for the tab list."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ index: number; label: string }",
        "description": "Emits when the active tab changes."
      }
    ],
    "methods": [
      {
        "name": "select",
        "description": "Programmatically selects a tab by index."
      },
      {
        "name": "next()",
        "description": "Moves to the next tab, optionally looping."
      },
      {
        "name": "previous()",
        "description": "Moves to the previous tab, optionally looping."
      }
    ],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Overall tab-panel shell."
      },
      {
        "name": "tabs",
        "description": "Tab list region."
      },
      {
        "name": "tab",
        "description": "Individual tab trigger."
      },
      {
        "name": "body",
        "description": "Tab-panel body."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Task tab panel",
        "code": "<jarvis-tab-panel items=\"Not started,Help needed,In progress,Deferred,Completed\" current=\"2\" tab-position=\"left\"></jarvis-tab-panel>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "tab rail",
        "tab icon",
        "tab label",
        "panel body",
        "task cards",
        "header navigation"
      ],
      "variants": [
        "top tabs",
        "left rail",
        "secondary mode",
        "nav buttons",
        "full width"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "active tab",
        "disabled",
        "looping sequence"
      ],
      "interactions": [
        "Selected tab and panel content must stay tightly synchronized.",
        "Vertical and horizontal tab positions should both feel stable and intentional.",
        "Badges and disabled tabs should remain legible without destabilizing the layout."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer task cards and more editorial panel rhythm."
        ],
        "material": [
          "Uses flatter surface layers and stronger active tab emphasis."
        ],
        "fluent": [
          "Uses practical rail styling and crisp task-card structure."
        ]
      },
      "devexpressParity": [
        "Cover task dashboards, multi-step content groups, and left-rail tab panels.",
        "Match the DevExpress tab-panel feel for synchronized tabs and content panes."
      ]
    }
  },
  {
    "name": "splitter",
    "tag": "jarvis-splitter",
    "category": "layout",
    "description": "Resizable split-pane layout with optional collapsible panel.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "horizontal",
        "description": "Pane layout direction."
      },
      {
        "name": "position",
        "type": "number",
        "default": "35",
        "description": "Start pane size as a percentage."
      },
      {
        "name": "min",
        "type": "number",
        "default": "15",
        "description": "Minimum split position."
      },
      {
        "name": "max",
        "type": "number",
        "default": "85",
        "description": "Maximum split position."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Resize increment used while dragging the divider."
      },
      {
        "name": "keyboardResizeStep",
        "type": "number",
        "default": "5",
        "description": "Resize increment used by arrow-key interaction."
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "default": "false",
        "description": "Allows collapsing the start pane."
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "default": "false",
        "description": "Collapses the start pane."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"Splitter\"",
        "description": "Accessible label for the resize separator."
      },
      {
        "name": "startLabel",
        "type": "string",
        "default": "\"Start pane\"",
        "description": "Hidden label announced for the start pane region."
      },
      {
        "name": "endLabel",
        "type": "string",
        "default": "\"End pane\"",
        "description": "Hidden label announced for the end pane region."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ position: number; collapsed: boolean }",
        "description": "Emits after resize or collapse changes."
      }
    ],
    "methods": [
      {
        "name": "toggle",
        "description": "Toggles the collapsed state when collapsible is enabled."
      }
    ],
    "slots": [
      {
        "name": "start",
        "description": "Content in the first pane."
      },
      {
        "name": "end",
        "description": "Content in the second pane."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Splitter frame."
      },
      {
        "name": "start",
        "description": "Start pane."
      },
      {
        "name": "divider",
        "description": "Resize divider."
      },
      {
        "name": "collapse",
        "description": "Collapse toggle button."
      },
      {
        "name": "end",
        "description": "End pane."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Horizontal splitter",
        "code": "<jarvis-splitter position=\"30\"><div slot=\"start\">Navigation</div><div slot=\"end\">Content</div></jarvis-splitter>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "start pane",
        "resize divider",
        "collapse action",
        "end pane"
      ],
      "variants": [
        "horizontal",
        "vertical",
        "collapsible"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "resizing",
        "collapsed"
      ],
      "interactions": [
        "Resize interaction should feel immediate and measurable.",
        "Collapsed state must preserve the surrounding layout without awkward gaps.",
        "Keyboard resizing should respect min, max, and configured resize steps."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer divider styling and softer pane boundaries."
        ],
        "material": [
          "Uses stronger utility framing and clearer divider contrast."
        ],
        "fluent": [
          "Uses practical workstation-like panes and crisp resize affordances."
        ]
      },
      "devexpressParity": [
        "Cover drawers-with-content, inspector panes, and analytics split views.",
        "Match the DevExpress splitter feel for nested or configurable panes."
      ]
    }
  },
  {
    "name": "resizable",
    "tag": "jarvis-resizable",
    "category": "layout",
    "description": "Resize wrapper for dashboards, cards, and embedded surfaces.",
    "anatomy": [
      "root"
    ],
    "props": [
      {
        "name": "width",
        "type": "number",
        "default": "420",
        "description": "Current width."
      },
      {
        "name": "height",
        "type": "number",
        "default": "260",
        "description": "Current height."
      },
      {
        "name": "minWidth",
        "type": "number",
        "default": "240",
        "description": "Minimum width."
      },
      {
        "name": "maxWidth",
        "type": "number",
        "default": "960",
        "description": "Maximum width."
      },
      {
        "name": "minHeight",
        "type": "number",
        "default": "160",
        "description": "Minimum height."
      },
      {
        "name": "maxHeight",
        "type": "number",
        "default": "720",
        "description": "Maximum height."
      },
      {
        "name": "handles",
        "type": "string",
        "default": "right bottom",
        "description": "Enabled resize handles."
      },
      {
        "name": "keepAspectRatio",
        "type": "boolean",
        "default": "false",
        "description": "Maintains the starting aspect ratio while resizing."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables resizing."
      },
      {
        "name": "step",
        "type": "number",
        "default": "8",
        "description": "Resize increment used by pointer and keyboard interactions."
      },
      {
        "name": "resizeAxis",
        "type": "\"both\" | \"horizontal\" | \"vertical\"",
        "default": "both",
        "description": "Limits resizing to a single axis when needed."
      },
      {
        "name": "showSizeLabel",
        "type": "boolean",
        "default": "false",
        "description": "Shows a live width and height badge inside the frame."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "\"Resizable surface\"",
        "description": "Accessible label for the resizable frame."
      }
    ],
    "events": [
      {
        "name": "jarvisResize",
        "detail": "{ width: number; height: number }",
        "description": "Emits while the wrapper is resized."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Resizable content surface."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Resizable frame."
      },
      {
        "name": "content",
        "description": "Inner content region."
      },
      {
        "name": "handle",
        "description": "Resize handle."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Resizable surface",
        "code": "<jarvis-resizable width=\"420\" height=\"260\"><jarvis-surface>Resizable content</jarvis-surface></jarvis-resizable>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "frame",
        "content surface",
        "edge handle",
        "corner handle"
      ],
      "variants": [
        "edge handles",
        "corner handles",
        "aspect lock"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "resizing",
        "disabled"
      ],
      "interactions": [
        "Resize handles must remain discoverable without visually overwhelming the content.",
        "Aspect-lock mode should feel predictable for media or chart surfaces.",
        "Keyboard resizing should work on the enabled handles without violating axis limits."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer handle styling and softer frame chrome."
        ],
        "material": [
          "Uses clearer resize affordances and stronger structural framing."
        ],
        "fluent": [
          "Uses pragmatic utility handles and crisp frame edges."
        ]
      },
      "devexpressParity": [
        "Cover resizable charts, dashboards, and inspector cards.",
        "Match the DevExpress resizable utility feel for constrained live resizing."
      ]
    }
  },
  {
    "name": "floating-action-button",
    "tag": "jarvis-floating-action-button",
    "category": "actions",
    "description": "Floating primary action button with optional speed-dial actions.",
    "anatomy": [
      "fab shell",
      "primary action",
      "icon",
      "label",
      "speed-dial list",
      "secondary action"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Shows or hides the related actions."
      },
      {
        "name": "label",
        "type": "string",
        "default": "Add",
        "description": "Primary button label."
      },
      {
        "name": "icon",
        "type": "string",
        "default": "+",
        "description": "Primary action icon label."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated related actions. Use `Label~Description|value|disabled success warning danger` for richer speed-dial rows."
      },
      {
        "name": "position",
        "type": "\"bottom-right\" | \"bottom-left\" | \"inline\"",
        "default": "bottom-right",
        "description": "Placement of the floating action control."
      },
      {
        "name": "direction",
        "type": "\"up\" | \"left\" | \"right\"",
        "default": "up",
        "description": "Expansion direction for related actions."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the primary action."
      },
      {
        "name": "extended",
        "type": "boolean",
        "default": "false",
        "description": "Shows the label alongside the primary button."
      },
      {
        "name": "ariaDescription",
        "type": "string",
        "default": "",
        "description": "Additional assistive description for the launcher and related actions."
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "default": "true",
        "description": "Closes the speed dial after a secondary action is chosen."
      },
      {
        "name": "showDescriptions",
        "type": "boolean",
        "default": "true",
        "description": "Shows secondary action descriptions when provided in `items`."
      }
    ],
    "events": [
      {
        "name": "jarvisAction",
        "detail": "{ value: string; label: string; index: number }",
        "description": "Emits when a related action is selected."
      },
      {
        "name": "jarvisToggle",
        "detail": "{ open: boolean }",
        "description": "Emits when the speed-dial is opened or closed."
      }
    ],
    "methods": [
      {
        "name": "show",
        "description": "Opens the related actions."
      },
      {
        "name": "hide",
        "description": "Closes the related actions."
      },
      {
        "name": "toggle",
        "description": "Toggles the related actions."
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall floating action shell."
      },
      {
        "name": "trigger",
        "description": "Primary floating action button."
      },
      {
        "name": "actions",
        "description": "Container for related actions."
      },
      {
        "name": "action",
        "description": "Individual related action button."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Extended speed dial",
        "code": "<jarvis-floating-action-button position=\"inline\" extended label=\"Add row\" aria-description=\"Inline launcher with described follow-up actions.\" items=\"New row~Insert a row beneath the active one.|row|success; Invite teammate~Send an access invite to a collaborator.|invite; Duplicate report~Clone the active workspace card.|duplicate\"></jarvis-floating-action-button>"
      },
      {
        "title": "Persistent launcher",
        "code": "<jarvis-floating-action-button label=\"Compose\" direction=\"right\" close-on-select=\"false\" items=\"Email~Open the email composer.|email; Message~Send a quick chat ping.|message; Delete draft~Remove the current draft.|delete|danger\"></jarvis-floating-action-button>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "primary action",
        "icon",
        "extended label",
        "speed-dial list",
        "secondary action pills",
        "secondary descriptions"
      ],
      "variants": [
        "floating button",
        "extended button",
        "speed dial",
        "described actions",
        "persistent launcher"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "closed",
        "open",
        "disabled",
        "described actions hidden"
      ],
      "interactions": [
        "Primary tap should remain a single obvious action, with secondary actions only revealed intentionally.",
        "Speed-dial expansion should be directional, short, and easy to dismiss.",
        "Arrow keys should move focus across enabled actions when the speed dial is open.",
        "Destructive actions should stay clearly separated and remain visibly disabled when unavailable."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer depth and calmer spacing to feel like a premium system shortcut."
        ],
        "material": [
          "Uses stronger elevation and a more explicit action-cluster treatment."
        ],
        "fluent": [
          "Uses practical utility chrome and lighter button mass for workspace layouts."
        ]
      },
      "devexpressParity": [
        "Cover floating action button and speed-dial patterns similar to DevExpress FAB demos.",
        "Support inline demos as well as fixed-corner production placement.",
        "Handle described rows, disabled actions, and remember-open command palettes without custom wrappers."
      ]
    }
  },
  {
    "name": "chat",
    "tag": "jarvis-chat",
    "category": "feedback",
    "description": "Conversation surface with message bubbles, attachments, and a composer.",
    "anatomy": [
      "header",
      "day divider",
      "message bubble",
      "avatar",
      "attachment chip",
      "composer"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "Support conversation",
        "description": "Chat transcript heading."
      },
      {
        "name": "user",
        "type": "string",
        "default": "John Doe",
        "description": "Local user display name."
      },
      {
        "name": "status",
        "type": "string",
        "default": "Online now",
        "description": "Status pill shown in the header."
      },
      {
        "name": "statusTone",
        "type": "\"neutral\" | \"success\" | \"warning\" | \"danger\"",
        "default": "neutral",
        "description": "Tone variant for the header status pill."
      },
      {
        "name": "showStatus",
        "type": "boolean",
        "default": "true",
        "description": "Shows the status pill in the header."
      },
      {
        "name": "messages",
        "type": "string",
        "description": "Serialized message list."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Type a message",
        "description": "Composer placeholder text."
      },
      {
        "name": "emptyStateText",
        "type": "string",
        "default": "No messages yet.",
        "description": "Empty-thread placeholder text."
      },
      {
        "name": "composerHelpText",
        "type": "string",
        "default": "Press Ctrl+Enter to send quickly.",
        "description": "Helper text shown beneath the composer shell."
      },
      {
        "name": "sendLabel",
        "type": "string",
        "default": "Send",
        "description": "Primary composer action label."
      },
      {
        "name": "attachButtonText",
        "type": "string",
        "default": "Attach sample files",
        "description": "Attachment action label while no files are staged."
      },
      {
        "name": "removeAttachmentsLabel",
        "type": "string",
        "default": "Remove files",
        "description": "Attachment action label once files are staged."
      },
      {
        "name": "attachmentPreset",
        "type": "string",
        "default": "Screenshot.png~10 KB,Instructions.pdf~10 KB",
        "description": "Serialized attachments staged by the attachment action."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables composer actions."
      },
      {
        "name": "showComposer",
        "type": "boolean",
        "default": "true",
        "description": "Shows or hides the message composer."
      },
      {
        "name": "attachmentsEnabled",
        "type": "boolean",
        "default": "false",
        "description": "Enables sample file attachments in the composer."
      },
      {
        "name": "showAvatars",
        "type": "boolean",
        "default": "true",
        "description": "Shows avatars beside non-system messages."
      },
      {
        "name": "composerRows",
        "type": "number",
        "default": "3",
        "description": "Base row count for the composer textarea."
      },
      {
        "name": "maxAttachments",
        "type": "number",
        "default": "4",
        "description": "Maximum number of preset attachments that can be staged at once."
      },
      {
        "name": "showAttachmentSizes",
        "type": "boolean",
        "default": "true",
        "description": "Shows attachment sizes in thread bubbles and chips."
      }
    ],
    "events": [
      {
        "name": "jarvisSend",
        "detail": "{ message: string; attachments: { name: string; size: string }[] }",
        "description": "Emits when the user sends a message."
      },
      {
        "name": "jarvisTypingStart",
        "detail": "void",
        "description": "Emits when the user starts typing."
      },
      {
        "name": "jarvisTypingEnd",
        "detail": "void",
        "description": "Emits after typing settles."
      },
      {
        "name": "jarvisAttachmentToggle",
        "detail": "{ attachments: { name: string; size: string }[] }",
        "description": "Emits when staged attachments change."
      },
      {
        "name": "jarvisAttachmentRemove",
        "detail": "{ name: string; attachments: { name: string; size: string }[] }",
        "description": "Emits when a staged attachment is removed."
      }
    ],
    "methods": [
      {
        "name": "focusComposer",
        "description": "Moves focus into the message composer."
      },
      {
        "name": "clearDraft",
        "description": "Clears draft text and staged attachments."
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall chat shell."
      },
      {
        "name": "header",
        "description": "Top chat summary."
      },
      {
        "name": "thread",
        "description": "Scrollable message thread."
      },
      {
        "name": "status",
        "description": "Header status pill."
      },
      {
        "name": "day-divider",
        "description": "Date separator within the thread."
      },
      {
        "name": "message",
        "description": "Message row container."
      },
      {
        "name": "avatar",
        "description": "Avatar circle for the message author."
      },
      {
        "name": "bubble",
        "description": "Message bubble content."
      },
      {
        "name": "attachments",
        "description": "Attachment list within a message."
      },
      {
        "name": "composer",
        "description": "Composer region."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Support chat with attachments",
        "code": "<jarvis-chat label=\"Account recovery\" user=\"John Doe\" status=\"Agent online\" status-tone=\"success\" attachments-enabled composer-help-text=\"Press Ctrl+Enter to send quickly.\" max-attachments=\"2\"></jarvis-chat>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "thread header",
        "status pill",
        "date divider",
        "bubble",
        "avatar",
        "attachment pill",
        "composer footer",
        "composer helper"
      ],
      "variants": [
        "support thread",
        "attachments enabled",
        "composer hidden",
        "system messages",
        "status tones"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "idle",
        "typing",
        "disabled",
        "empty thread",
        "attachment limit"
      ],
      "interactions": [
        "Message rhythm should make scanning authorship and timestamps effortless.",
        "Composer should support fast send while keeping staged files obvious.",
        "System messages should stay visually distinct without competing with authored replies."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer bubbles and gentler dividers for editorial conversation threads."
        ],
        "material": [
          "Uses clearer surface separation and stronger action emphasis in the composer."
        ],
        "fluent": [
          "Uses practical chat chrome and crisp avatar + metadata presentation."
        ]
      },
      "devexpressParity": [
        "Cover the DevExpress chat overview and file-attachment style demos.",
        "Support mirrored conversations, staged attachments, attachment removal, and composer ergonomics."
      ]
    }
  },
  {
    "name": "sortable",
    "tag": "jarvis-sortable",
    "category": "layout",
    "description": "Drag-and-drop board for reordering cards across columns.",
    "anatomy": [
      "board",
      "column",
      "column header",
      "card",
      "accent rail",
      "drag grip"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Serialized columns and cards."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables drag-and-drop reordering."
      },
      {
        "name": "columns",
        "type": "string",
        "default": "",
        "description": "Comma-separated column list used to keep empty columns visible."
      },
      {
        "name": "emptyColumnText",
        "type": "string",
        "default": "Drop cards here",
        "description": "Empty-state copy for columns with no cards."
      },
      {
        "name": "showMeta",
        "type": "boolean",
        "default": "true",
        "description": "Shows or hides the secondary card meta row."
      },
      {
        "name": "showCounts",
        "type": "boolean",
        "default": "true",
        "description": "Shows or hides the card count chip in each column header."
      },
      {
        "name": "compact",
        "type": "boolean",
        "default": "false",
        "description": "Uses tighter spacing for denser kanban layouts."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "Sortable board",
        "description": "Accessible label for the board container."
      }
    ],
    "events": [
      {
        "name": "jarvisReorder",
        "detail": "{ value: string; fromColumn: string; toColumn: string; index: number }",
        "description": "Emits after a card is moved."
      }
    ],
    "methods": [],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall kanban board."
      },
      {
        "name": "column",
        "description": "Individual sortable column."
      },
      {
        "name": "column-header",
        "description": "Column title row."
      },
      {
        "name": "card",
        "description": "Draggable task card."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Kanban board",
        "code": "<jarvis-sortable items=\"Not Started/Report on the State of Engineering Dept|Bart Armaz|success; Need Assistance/Update Employee Files with New NDA|Greta Sims|success; In Progress/Health Insurance|Samantha Bright|warning; Deferred/Refund Request|Ed Holmes|danger\"></jarvis-sortable>"
      },
      {
        "title": "Compact board with empty column",
        "code": "<jarvis-sortable compact columns=\"Backlog,Ready,Review,Done\" empty-column-text=\"Queue is clear\" items=\"Backlog/Write launch brief|Olivia Peyton|success; Ready/Prep stakeholder deck|Victor Norris|warning; Review/Confirm launch date|Maya Chen|danger\"></jarvis-sortable>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "board canvas",
        "column title",
        "count chip",
        "card stack",
        "accent rail",
        "drag grip",
        "empty-state drop zone"
      ],
      "variants": [
        "single board",
        "cross-column drag",
        "disabled",
        "compact board",
        "empty columns"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "dragging",
        "disabled",
        "empty column"
      ],
      "interactions": [
        "Cards must remain easy to pick up, track, and drop without losing context.",
        "Columns should preserve hierarchy while reflecting live counts and status color.",
        "Empty columns should stay visibly available so teams can drag cards into new stages without guessing the drop target."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer cards and softer rails for premium task boards."
        ],
        "material": [
          "Uses stronger state color and more explicit card elevation during drag."
        ],
        "fluent": [
          "Uses practical board scaffolding with crisp card utilities."
        ]
      },
      "devexpressParity": [
        "Cover DevExpress sortable kanban and list drag-and-drop patterns.",
        "Support intra-column reorder and inter-column transfer with a serialized result.",
        "Show empty stages, compact boards, and optional metadata without forcing consumers to build custom wrappers."
      ]
    }
  },
  {
    "name": "speech-to-text",
    "tag": "jarvis-speech-to-text",
    "category": "forms",
    "description": "Speech recognition trigger with transcript preview and browser support messaging.",
    "anatomy": [
      "header",
      "trigger",
      "status line",
      "transcript surface",
      "clear action"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "default": "Use voice recognition",
        "description": "Component heading."
      },
      {
        "name": "startText",
        "type": "string",
        "default": "Start listening",
        "description": "Trigger label while idle."
      },
      {
        "name": "stopText",
        "type": "string",
        "default": "Stop listening",
        "description": "Trigger label while listening."
      },
      {
        "name": "hint",
        "type": "string",
        "default": "Recognized text will appear here...",
        "description": "Hint shown before recognition starts."
      },
      {
        "name": "language",
        "type": "string",
        "default": "en-US",
        "description": "Recognition language."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables voice capture."
      },
      {
        "name": "interimResults",
        "type": "boolean",
        "default": "true",
        "description": "Streams interim recognition results."
      },
      {
        "name": "continuous",
        "type": "boolean",
        "default": "false",
        "description": "Keeps listening after a final result."
      },
      {
        "name": "animation",
        "type": "boolean",
        "default": "true",
        "description": "Animates the transcript while listening."
      },
      {
        "name": "displayMode",
        "type": "\"icon\" | \"button\" | \"extended\"",
        "default": "icon",
        "description": "Trigger display style."
      },
      {
        "name": "value",
        "type": "string",
        "default": "",
        "description": "Current recognized value."
      },
      {
        "name": "showTranscript",
        "type": "boolean",
        "default": "true",
        "description": "Shows the transcript surface below the trigger."
      },
      {
        "name": "showClearButton",
        "type": "boolean",
        "default": "true",
        "description": "Shows a clear action after speech is captured."
      },
      {
        "name": "showOptions",
        "type": "boolean",
        "default": "false",
        "description": "Shows the inline options panel for display mode, language, and transcript behavior."
      },
      {
        "name": "availableLanguages",
        "type": "string",
        "default": "\"en-US,fr-FR,de-DE,hi-IN\"",
        "description": "Comma-separated language options shown in the inline options panel."
      },
      {
        "name": "clearOnStart",
        "type": "boolean",
        "default": "false",
        "description": "Clears the previous transcript when listening starts."
      },
      {
        "name": "autoStopAfterFinal",
        "type": "boolean",
        "default": "false",
        "description": "Stops listening after the first final result."
      },
      {
        "name": "maxLength",
        "type": "number",
        "default": "0",
        "description": "Maximum number of characters kept in the transcript. `0` disables truncation."
      }
    ],
    "events": [
      {
        "name": "jarvisResult",
        "detail": "{ value: string; final: boolean }",
        "description": "Emits recognition results."
      },
      {
        "name": "jarvisStart",
        "detail": "void",
        "description": "Emits when recognition starts."
      },
      {
        "name": "jarvisEnd",
        "detail": "{ value: string }",
        "description": "Emits when recognition stops."
      },
      {
        "name": "jarvisError",
        "detail": "{ message: string }",
        "description": "Emits browser or recognition errors."
      },
      {
        "name": "jarvisUnsupported",
        "detail": "void",
        "description": "Emits when recognition is unavailable in the browser."
      }
    ],
    "methods": [
      {
        "name": "start",
        "description": "Starts recognition when supported."
      },
      {
        "name": "stop",
        "description": "Stops recognition."
      },
      {
        "name": "clear",
        "description": "Clears the transcript preview."
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall control shell."
      },
      {
        "name": "trigger",
        "description": "Start/stop trigger."
      },
      {
        "name": "transcript",
        "description": "Transcript preview surface."
      },
      {
        "name": "clear-button",
        "description": "Clear action."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Speech recognition trigger",
        "code": "<jarvis-speech-to-text label=\"Use voice recognition\" display-mode=\"button\"></jarvis-speech-to-text>"
      },
      {
        "title": "Options panel and transcript controls",
        "code": "<jarvis-speech-to-text label=\"Interview capture\" display-mode=\"button\" show-options clear-on-start auto-stop-after-final available-languages=\"en-US,fr-FR,de-DE,hi-IN\"></jarvis-speech-to-text>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "title block",
        "voice trigger",
        "transcript region",
        "status text",
        "clear button"
      ],
      "variants": [
        "icon trigger",
        "button trigger",
        "extended transcript shell"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "idle",
        "listening",
        "unsupported",
        "disabled"
      ],
      "interactions": [
        "Listening state must be unmistakable without becoming visually noisy.",
        "Transcript preview should remain readable for interim and final results.",
        "Clear-on-start and transcript visibility options should make capture flows predictable in forms and assistants.",
        "The optional inline controls should expose language, display, and transcript preferences without forcing consumers to build a separate settings panel."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer listening feedback and softer transcript framing."
        ],
        "material": [
          "Uses stronger active-state emphasis and clearer action affordances."
        ],
        "fluent": [
          "Uses practical utility framing and crisp transcript blocks."
        ]
      },
      "devexpressParity": [
        "Cover the DevExpress speech-to-text demo with browser-side options and transcript preview.",
        "Support icon-only, contained, and extended display modes."
      ]
    }
  },
  {
    "name": "tile-view",
    "tag": "jarvis-tile-view",
    "category": "data-display",
    "description": "Tiled content layout for media, property cards, and directional browsing.",
    "anatomy": [
      "tile grid",
      "tile surface",
      "gradient image field",
      "title",
      "subtitle"
    ],
    "props": [
      {
        "name": "items",
        "type": "string",
        "description": "Serialized tile entries. Use `Title|Subtitle|start,end colors|widthxheight|badge|disabled` for richer tiles."
      },
      {
        "name": "direction",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "horizontal",
        "description": "Primary flow direction."
      },
      {
        "name": "baseItemWidth",
        "type": "string",
        "default": "9rem",
        "description": "Base tile width."
      },
      {
        "name": "baseItemHeight",
        "type": "string",
        "default": "7rem",
        "description": "Base tile height."
      },
      {
        "name": "gap",
        "type": "string",
        "default": "0.9rem",
        "description": "Gap between tiles."
      },
      {
        "name": "value",
        "type": "string",
        "default": "",
        "description": "Currently selected tile value."
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "default": "Tile view",
        "description": "Accessible label for the tile collection."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Preserves selection visuals but prevents choosing another tile."
      },
      {
        "name": "showSelectionIndicator",
        "type": "boolean",
        "default": "true",
        "description": "Shows the selected-state pill on the active tile."
      },
      {
        "name": "showSubtitles",
        "type": "boolean",
        "default": "true",
        "description": "Shows or hides the secondary tile caption."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ value: string; title: string; index: number }",
        "description": "Emits when a tile is selected."
      }
    ],
    "methods": [],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Tile-view grid shell."
      },
      {
        "name": "tile",
        "description": "Individual tile surface."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Property tiles",
        "code": "<jarvis-tile-view items=\"Hamburg Suites|$299 per night|#dbeafe,#60a5fa|2x2; Forest Retreat|Boardroom and wellness wing|#dcfce7,#22c55e|1x2; City Loft|Skyline meeting room|#ede9fe,#8b5cf6|1x1\"></jarvis-tile-view>"
      },
      {
        "title": "Badged and readonly tiles",
        "code": "<jarvis-tile-view read-only items=\"Launch prep|Campaign command room|#dbeafe,#60a5fa|2x1|Featured; North Campus|Innovation lab|#e0f2fe,#38bdf8|1x1|Live; Legacy archive|Read-only records|#e2e8f0,#94a3b8|1x1|Archived|disabled\"></jarvis-tile-view>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "mosaic grid",
        "tile gradient",
        "title",
        "subtitle",
        "badge",
        "selection pill"
      ],
      "variants": [
        "horizontal mosaic",
        "vertical mosaic",
        "mixed tile spans",
        "badged tiles",
        "readonly"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "resting",
        "selected",
        "disabled",
        "readonly"
      ],
      "interactions": [
        "Tile proportions should feel intentional and create visual rhythm without collapsing content.",
        "Selection should be obvious while preserving the media-first feel.",
        "Arrow keys should move focus across enabled tiles so dense layouts still work as navigable collections."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer gradients and more atmospheric tile depth."
        ],
        "material": [
          "Uses clearer surface contrasts and stronger selected-state framing."
        ],
        "fluent": [
          "Uses practical card geometry and more restrained decorative treatment."
        ]
      },
      "devexpressParity": [
        "Cover DevExpress tile-view style browsing and directional tile layouts.",
        "Support mixed spans, horizontal flow, and value-based selection.",
        "Handle badges, disabled tiles, and readonly browse states without custom markup."
      ]
    }
  },
  {
    "name": "file-manager",
    "tag": "jarvis-file-manager",
    "category": "data-display",
    "description": "File-browser surface with tree navigation, breadcrumbs, and details/grid views.",
    "anatomy": [
      "toolbar",
      "tree navigation",
      "breadcrumbs",
      "file table",
      "preview cards"
    ],
    "props": [
      {
        "name": "heading",
        "type": "string",
        "default": "Files",
        "description": "Sidebar heading."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Serialized file and folder data."
      },
      {
        "name": "currentPath",
        "type": "string",
        "default": "Files/Widescreen",
        "description": "Currently open folder path."
      },
      {
        "name": "allowCreate",
        "type": "boolean",
        "default": "true",
        "description": "Shows the create-directory action."
      },
      {
        "name": "allowUpload",
        "type": "boolean",
        "default": "true",
        "description": "Shows upload actions in the toolbar."
      },
      {
        "name": "allowDownload",
        "type": "boolean",
        "default": "true",
        "description": "Shows download actions for selected files."
      },
      {
        "name": "showSearch",
        "type": "boolean",
        "default": "true",
        "description": "Shows a search field in the toolbar."
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "default": "\"Search files\"",
        "description": "Placeholder for the toolbar search input."
      },
      {
        "name": "showPreview",
        "type": "boolean",
        "default": "true",
        "description": "Shows the side preview and metadata panel for selected items."
      },
      {
        "name": "selectionMode",
        "type": "\"single\" | \"multiple\"",
        "default": "single",
        "description": "Controls whether one or many items can be selected."
      },
      {
        "name": "allowRename",
        "type": "boolean",
        "default": "true",
        "description": "Shows the rename action when files are selected."
      },
      {
        "name": "allowDelete",
        "type": "boolean",
        "default": "true",
        "description": "Shows the delete action when files are selected."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ path: string; kind: string }",
        "description": "Emits when a file row or card is selected."
      },
      {
        "name": "jarvisPathChange",
        "detail": "{ path: string }",
        "description": "Emits when the active folder path changes."
      },
      {
        "name": "jarvisAction",
        "detail": "{ action: string; path?: string; paths?: string[]; query?: string }",
        "description": "Emits toolbar and row-level actions such as create, upload, rename, delete, confirm, or search."
      }
    ],
    "methods": [
      {
        "name": "openPath",
        "description": "Opens a folder path programmatically."
      },
      {
        "name": "refresh",
        "description": "Refreshes the visible selection state."
      },
      {
        "name": "clearSelection",
        "description": "Clears the current file selection."
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall file-manager shell."
      },
      {
        "name": "toolbar",
        "description": "Top action bar."
      },
      {
        "name": "sidebar",
        "description": "Tree navigation column."
      },
      {
        "name": "content",
        "description": "Main file listing pane."
      },
      {
        "name": "table",
        "description": "Details view table."
      },
      {
        "name": "cards",
        "description": "Grid view cards."
      },
      {
        "name": "action-panel",
        "description": "Inline action panel for create, upload, rename, and delete flows."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Widescreen asset browser",
        "code": "<jarvis-file-manager current-path=\"Files/Widescreen\"></jarvis-file-manager>"
      },
      {
        "title": "Inline action workflow",
        "code": "<jarvis-file-manager current-path=\"Files/Widescreen\" show-search show-preview selection-mode=\"multiple\"></jarvis-file-manager>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "toolbar actions",
        "folder tree",
        "breadcrumb trail",
        "listing surface",
        "preview pane",
        "file card"
      ],
      "variants": [
        "details view",
        "grid view",
        "toolbar actions"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "folder open",
        "row selected",
        "grid card selected"
      ],
      "interactions": [
        "Users can open folders from the sidebar tree, breadcrumbs, or the listing itself.",
        "Details and grid modes should preserve current selection and folder context.",
        "Search, preview, and bulk actions should work together without losing the current folder.",
        "Create, rename, upload, and delete should expose lightweight inline confirmation instead of forcing context loss."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer spacing and softer chrome to feel like a premium workspace browser."
        ],
        "material": [
          "Uses clearer table framing and stronger action density in utility regions."
        ],
        "fluent": [
          "Uses practical workstation styling with crisp hierarchy between navigation and content panes."
        ]
      },
      "devexpressParity": [
        "Covers the DevExpress file-manager style demos with tree navigation, breadcrumbs, and toolbar actions.",
        "Supports folder navigation and content switching without losing context."
      ]
    }
  },
  {
    "name": "html-editor",
    "tag": "jarvis-html-editor",
    "category": "forms",
    "description": "Rich text editor with formatting toolbar, block controls, and embedded media actions.",
    "anatomy": [
      "toolbar",
      "editable document",
      "footer metadata"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "description": "Current HTML value."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "Start writing...",
        "description": "Placeholder shown when the editor is empty."
      },
      {
        "name": "height",
        "type": "string",
        "default": "30rem",
        "description": "Minimum editor height."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables editing and toolbar commands."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the editor visible but prevents editing."
      },
      {
        "name": "showToolbar",
        "type": "boolean",
        "default": "true",
        "description": "Shows the formatting toolbar."
      },
      {
        "name": "showWordCount",
        "type": "boolean",
        "default": "false",
        "description": "Shows a word-count summary in the footer."
      },
      {
        "name": "showSourceToggle",
        "type": "boolean",
        "default": "true",
        "description": "Shows the toggle for switching between rich text and HTML source mode."
      },
      {
        "name": "toolbarPreset",
        "type": "\"full\" | \"minimal\"",
        "default": "full",
        "description": "Chooses between the full toolbar and a reduced authoring toolbar."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ value: string }",
        "description": "Emits the latest HTML after edits."
      }
    ],
    "methods": [
      {
        "name": "focusEditor",
        "description": "Moves focus into the editable surface."
      },
      {
        "name": "clear",
        "description": "Clears the document contents."
      },
      {
        "name": "toggleSourceView",
        "description": "Toggles between rich text and HTML source mode."
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall editor shell."
      },
      {
        "name": "toolbar",
        "description": "Formatting toolbar."
      },
      {
        "name": "editor",
        "description": "Editable rich-text surface."
      },
      {
        "name": "footer",
        "description": "Document metadata footer."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Formatted text editor",
        "code": "<jarvis-html-editor></jarvis-html-editor>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "toolbar group",
        "block style selector",
        "editable document canvas",
        "footer meta"
      ],
      "variants": [
        "default toolbar",
        "media insertion",
        "read-only"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "idle",
        "focused",
        "disabled"
      ],
      "interactions": [
        "Formatting commands apply inline and block-level changes to the current selection.",
        "Toolbar actions should not cause layout jumps in the editable surface.",
        "Source mode should round-trip cleanly with the visual editor for lightweight authoring flows."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses an editorial document feel with restrained chrome and generous writing space."
        ],
        "material": [
          "Uses clearer utility framing and stronger toolbar grouping."
        ],
        "fluent": [
          "Uses crisp control bars and practical authoring surfaces suited to business tools."
        ]
      },
      "devexpressParity": [
        "Covers the DevExpress HTML editor overview use case with toolbar-driven formatting.",
        "Supports headings, lists, quotes, links, tables, callouts, alignment, and lightweight image insertion."
      ]
    }
  },
  {
    "name": "range-selector",
    "tag": "jarvis-range-selector",
    "category": "forms",
    "description": "Dual-handle range selector with scale ticks and formatted value labels.",
    "anatomy": [
      "heading",
      "selected range summary",
      "track",
      "selection bar",
      "handles",
      "ticks"
    ],
    "props": [
      {
        "name": "heading",
        "type": "string",
        "default": "Select range",
        "description": "Range-selector heading."
      },
      {
        "name": "start",
        "type": "number",
        "default": "40000",
        "description": "Selected start value."
      },
      {
        "name": "end",
        "type": "number",
        "default": "80000",
        "description": "Selected end value."
      },
      {
        "name": "min",
        "type": "number",
        "default": "15000",
        "description": "Minimum scale value."
      },
      {
        "name": "max",
        "type": "number",
        "default": "150000",
        "description": "Maximum scale value."
      },
      {
        "name": "ticks",
        "type": "string",
        "description": "Semicolon-separated scale ticks."
      },
      {
        "name": "format",
        "type": "\"number\" | \"currency\" | \"label\"",
        "default": "currency",
        "description": "Display format for values and ticks."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Step used when dragging handles or nudging with the keyboard."
      },
      {
        "name": "minRange",
        "type": "number",
        "default": "0",
        "description": "Minimum allowed distance between the start and end handles."
      },
      {
        "name": "maxRange",
        "type": "number",
        "default": "0",
        "description": "Maximum allowed distance between the start and end handles. `0` disables the constraint."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables pointer and keyboard range interaction."
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "default": "false",
        "description": "Prevents editing while keeping the current range visible."
      },
      {
        "name": "showTicks",
        "type": "boolean",
        "default": "true",
        "description": "Shows the scale tick row."
      },
      {
        "name": "showValueLabels",
        "type": "boolean",
        "default": "true",
        "description": "Shows value labels above the handles."
      }
    ],
    "events": [
      {
        "name": "jarvisChange",
        "detail": "{ start: number; end: number }",
        "description": "Emits after either range handle changes."
      }
    ],
    "methods": [],
    "slots": [
      {
        "name": "default",
        "description": "Primary slotted content."
      }
    ],
    "parts": [
      {
        "name": "base",
        "description": "Overall selector shell."
      },
      {
        "name": "header",
        "description": "Title and summary row."
      },
      {
        "name": "track",
        "description": "Track containing rail, selection, and handles."
      },
      {
        "name": "ticks",
        "description": "Scale ticks row."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "House price range",
        "code": "<jarvis-range-selector heading=\"Select house price range\"></jarvis-range-selector>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "summary header",
        "rail",
        "selected segment",
        "start handle",
        "end handle",
        "scale ticks"
      ],
      "variants": [
        "numeric scale",
        "currency scale",
        "custom tick labels"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "idle",
        "dragging handles"
      ],
      "interactions": [
        "Dragging either handle updates the selected segment and formatted labels immediately.",
        "Handles may not cross, preserving a valid start/end relationship.",
        "Keyboard nudging and range constraints should make planning-oriented ranges feel controlled and precise."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses calmer handles and subtler scale treatment for premium analytic controls."
        ],
        "material": [
          "Uses clearer selected-track contrast and stronger control emphasis."
        ],
        "fluent": [
          "Uses practical utility styling with crisp ticks and compact labels."
        ]
      },
      "devexpressParity": [
        "Covers the DevExpress range-selector style demos for numeric and date-like range picking.",
        "Supports formatted tick labels and dual-handle range interaction."
      ]
    }
  },
  {
    "name": "vector-map",
    "tag": "jarvis-vector-map",
    "category": "data-display",
    "description": "Lightweight vector map with region coloring, zoom controls, and legend.",
    "anatomy": [
      "heading block",
      "map viewport",
      "legend",
      "hover summary"
    ],
    "props": [
      {
        "name": "heading",
        "type": "string",
        "default": "Nominal GDP",
        "description": "Primary map title."
      },
      {
        "name": "subtitle",
        "type": "string",
        "default": "in millions of US dollars",
        "description": "Supporting subtitle."
      },
      {
        "name": "items",
        "type": "string",
        "description": "Semicolon-separated region/value pairs."
      },
      {
        "name": "markers",
        "type": "string",
        "description": "Semicolon-separated marker positions using `label|x|y`."
      },
      {
        "name": "routes",
        "type": "string",
        "description": "Semicolon-separated route curves using `label|fromX|fromY|toX|toY`."
      },
      {
        "name": "showLegend",
        "type": "boolean",
        "default": "true",
        "description": "Shows the legend and value buckets."
      },
      {
        "name": "legendTitle",
        "type": "string",
        "default": "\"Legend\"",
        "description": "Heading shown above the legend rows."
      },
      {
        "name": "showControls",
        "type": "boolean",
        "default": "true",
        "description": "Shows zoom and reset controls in the header."
      },
      {
        "name": "allowZoom",
        "type": "boolean",
        "default": "true",
        "description": "Allows zoom adjustments from the control buttons."
      },
      {
        "name": "showLabels",
        "type": "boolean",
        "default": "true",
        "description": "Shows region labels inside the map viewport."
      },
      {
        "name": "showMarkers",
        "type": "boolean",
        "default": "true",
        "description": "Shows overlay markers."
      },
      {
        "name": "showRoutes",
        "type": "boolean",
        "default": "true",
        "description": "Shows route overlays between regions."
      },
      {
        "name": "legendMode",
        "type": "\"buckets\" | \"top-regions\"",
        "default": "buckets",
        "description": "Switches between value buckets and a ranked top-regions legend."
      },
      {
        "name": "valueFormat",
        "type": "\"number\" | \"compact\" | \"currency\"",
        "default": "number",
        "description": "Display format used for legend rows and the active-region card."
      }
    ],
    "events": [
      {
        "name": "jarvisSelect",
        "detail": "{ name: string; value: number }",
        "description": "Emits when a region is selected."
      }
    ],
    "methods": [],
    "slots": [],
    "parts": [
      {
        "name": "base",
        "description": "Overall vector-map shell."
      },
      {
        "name": "header",
        "description": "Map title and controls."
      },
      {
        "name": "panel",
        "description": "Main viewport and legend wrapper."
      },
      {
        "name": "legend",
        "description": "Legend with color buckets."
      },
      {
        "name": "tooltip",
        "description": "Pinned active-region summary card."
      }
    ],
    "cssVariables": [
      {
        "name": "--jarvis-component-radius",
        "description": "Component radius token."
      }
    ],
    "accessibility": [
      "Supports keyboard interaction and visible focus treatment.",
      "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
      "Color is never the only means of conveying state."
    ],
    "responsive": [
      "Adapts to its container width and avoids fixed pixel assumptions.",
      "Supports density and token-driven spacing changes."
    ],
    "examples": [
      {
        "title": "Nominal GDP map",
        "code": "<jarvis-vector-map></jarvis-vector-map>"
      },
      {
        "title": "Map with route and marker overlays",
        "code": "<jarvis-vector-map legend-mode=\"top-regions\" value-format=\"compact\"></jarvis-vector-map>"
      }
    ],
    "antiPatterns": [
      "Do not override internal semantics with conflicting roles."
    ],
    "related": [],
    "compositionRules": [
      "Compose with Jarvis layout primitives for consistent spacing."
    ],
    "spec": {
      "visualAnatomy": [
        "heading block",
        "map viewport",
        "region shapes",
        "marker overlays",
        "route overlays",
        "active-region card",
        "legend buckets"
      ],
      "variants": [
        "legend shown",
        "legend hidden",
        "marker overlays",
        "route overlays",
        "top regions legend"
      ],
      "sizes": [
        "sm",
        "md",
        "lg"
      ],
      "states": [
        "default",
        "zoomed",
        "region active"
      ],
      "interactions": [
        "Hovering or clicking a region updates the active-region summary card.",
        "Zoom controls should preserve overall map legibility and not distort labels.",
        "Legend formatting and region labels should stay coherent as the display mode changes.",
        "Markers and routes should layer cleanly over the base map without obscuring the regions."
      ],
      "accessibilityNotes": [
        "Supports keyboard interaction and visible focus treatment.",
        "Uses semantic roles and ARIA attributes where native semantics are insufficient.",
        "Color is never the only means of conveying state."
      ],
      "responsiveNotes": [
        "Adapts to its container width and avoids fixed pixel assumptions.",
        "Supports density and token-driven spacing changes."
      ],
      "themeBehavior": {
        "generic": [
          "Uses softer region fills and quieter surrounding chrome for an editorial analytics feel."
        ],
        "material": [
          "Uses clearer legend framing and more explicit interaction affordances."
        ],
        "fluent": [
          "Uses pragmatic data-tool styling with crisp labels and control bars."
        ]
      },
      "devexpressParity": [
        "Covers the DevExpress vector-map overview pattern with colored regions, legend, and viewport controls.",
        "Supports lightweight thematic maps, route overlays, and point markers without requiring a full GIS renderer."
      ]
    }
  }
];
